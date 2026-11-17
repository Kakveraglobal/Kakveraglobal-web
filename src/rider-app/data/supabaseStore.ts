import { createOrderReference } from '../lib/ids';
import { dataUrlToBlob, extensionFromDataUrl } from '../lib/dataUrl';
import { normalizeNgPhone } from '../lib/phone';
import { getSupabase, phoneToAuthEmail } from '../lib/supabase';
import type {
  AppUser,
  BankDetails,
  DeliveryOrder,
  OrderStatus,
  UserRole,
  VerificationStatus,
} from '../types';

type ProfileRow = {
  id: string;
  phone: string;
  full_name: string;
  role: UserRole;
  verification_status: VerificationStatus;
  verification_note: string | null;
  id_doc_path: string | null;
  selfie_path: string | null;
  bank_name: string | null;
  account_name: string | null;
  account_number: string | null;
  created_at: string;
};

type OrderRow = {
  id: string;
  reference: string;
  pickup_address: string;
  dropoff_address: string;
  customer_name: string;
  customer_phone: string;
  item_description: string;
  notes: string | null;
  status: OrderStatus;
  rider_id: string | null;
  created_by_admin_id: string;
  payout_amount_ngn: number | string | null;
  payout_marked_paid: boolean;
  payout_paid_at: string | null;
  picked_up_at: string | null;
  delivered_at: string | null;
  created_at: string;
  updated_at: string;
};

async function signedUrl(path: string | null | undefined): Promise<string | undefined> {
  if (!path) return undefined;
  const supabase = getSupabase();
  const { data, error } = await supabase.storage
    .from('verification-docs')
    .createSignedUrl(path, 60 * 60);
  if (error) return undefined;
  return data.signedUrl;
}

async function mapProfile(row: ProfileRow): Promise<AppUser> {
  const [idDocDataUrl, selfieDataUrl] = await Promise.all([
    signedUrl(row.id_doc_path),
    signedUrl(row.selfie_path),
  ]);

  return {
    id: row.id,
    role: row.role,
    phone: row.phone,
    fullName: row.full_name,
    createdAt: row.created_at,
    verificationStatus: row.verification_status,
    verificationNote: row.verification_note || undefined,
    idDocName: row.id_doc_path?.split('/').pop(),
    idDocDataUrl,
    selfieName: row.selfie_path?.split('/').pop(),
    selfieDataUrl,
    bankDetails:
      row.bank_name && row.account_name && row.account_number
        ? {
            bankName: row.bank_name,
            accountName: row.account_name,
            accountNumber: row.account_number,
          }
        : undefined,
  };
}

function mapOrder(row: OrderRow): DeliveryOrder {
  return {
    id: row.id,
    reference: row.reference,
    pickupAddress: row.pickup_address,
    dropoffAddress: row.dropoff_address,
    customerName: row.customer_name,
    customerPhone: row.customer_phone,
    itemDescription: row.item_description,
    notes: row.notes || undefined,
    status: row.status,
    riderId: row.rider_id || undefined,
    createdByAdminId: row.created_by_admin_id,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    pickedUpAt: row.picked_up_at || undefined,
    deliveredAt: row.delivered_at || undefined,
    payoutAmountNgn:
      row.payout_amount_ngn === null || row.payout_amount_ngn === undefined
        ? undefined
        : Number(row.payout_amount_ngn),
    payoutMarkedPaid: row.payout_marked_paid,
    payoutPaidAt: row.payout_paid_at || undefined,
  };
}

async function fetchProfile(userId: string): Promise<AppUser> {
  const supabase = getSupabase();
  const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single();
  if (error || !data) throw new Error(error?.message || 'Profile not found.');
  return mapProfile(data as ProfileRow);
}

export async function getCurrentUser(): Promise<AppUser | null> {
  const supabase = getSupabase();
  const { data } = await supabase.auth.getUser();
  if (!data.user) return null;
  return fetchProfile(data.user.id);
}

export async function login(phoneInput: string, password: string): Promise<AppUser> {
  const phone = normalizeNgPhone(phoneInput);
  const supabase = getSupabase();
  const { data, error } = await supabase.auth.signInWithPassword({
    email: phoneToAuthEmail(phone),
    password,
  });
  if (error || !data.user) throw new Error(error?.message || 'Login failed.');
  return fetchProfile(data.user.id);
}

export async function logout(): Promise<void> {
  const supabase = getSupabase();
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function signupRider(input: {
  fullName: string;
  phone: string;
  password: string;
}): Promise<AppUser> {
  const phone = normalizeNgPhone(input.phone);
  const supabase = getSupabase();

  const { data, error } = await supabase.auth.signUp({
    email: phoneToAuthEmail(phone),
    password: input.password,
    options: {
      data: {
        phone,
        full_name: input.fullName.trim(),
        role: 'rider',
      },
    },
  });
  if (error || !data.user) {
    const message = error?.message || 'Signup failed.';
    if (/already/i.test(message)) {
      throw new Error('An account already exists for that phone number.');
    }
    throw new Error(message);
  }

  // Profile trigger should create the row; wait briefly then fetch / upsert if needed
  let profile: AppUser | null = null;
  for (let i = 0; i < 5; i += 1) {
    try {
      profile = await fetchProfile(data.user.id);
      break;
    } catch {
      await new Promise((r) => setTimeout(r, 200));
    }
  }

  if (!profile) {
    const { error: upsertError } = await supabase.from('profiles').upsert({
      id: data.user.id,
      phone,
      full_name: input.fullName.trim(),
      role: 'rider',
      verification_status: 'unsubmitted',
    });
    if (upsertError) throw new Error(upsertError.message);
    profile = await fetchProfile(data.user.id);
  }

  return profile;
}

export async function submitVerification(input: {
  userId: string;
  idDocName: string;
  idDocDataUrl: string;
  selfieName: string;
  selfieDataUrl: string;
}): Promise<AppUser> {
  const supabase = getSupabase();
  const idExt = extensionFromDataUrl(input.idDocDataUrl);
  const selfieExt = extensionFromDataUrl(input.selfieDataUrl);
  const idPath = `${input.userId}/id-${Date.now()}.${idExt}`;
  const selfiePath = `${input.userId}/selfie-${Date.now()}.${selfieExt}`;

  const idBlob = dataUrlToBlob(input.idDocDataUrl);
  const selfieBlob = dataUrlToBlob(input.selfieDataUrl);

  const [idUpload, selfieUpload] = await Promise.all([
    supabase.storage.from('verification-docs').upload(idPath, idBlob, {
      contentType: idBlob.type,
      upsert: true,
    }),
    supabase.storage.from('verification-docs').upload(selfiePath, selfieBlob, {
      contentType: selfieBlob.type,
      upsert: true,
    }),
  ]);

  if (idUpload.error) throw new Error(idUpload.error.message);
  if (selfieUpload.error) throw new Error(selfieUpload.error.message);

  const { error } = await supabase
    .from('profiles')
    .update({
      id_doc_path: idPath,
      selfie_path: selfiePath,
      verification_status: 'pending',
      verification_note: null,
    })
    .eq('id', input.userId);

  if (error) throw new Error(error.message);
  return fetchProfile(input.userId);
}

export async function setVerificationStatus(input: {
  riderId: string;
  status: Extract<VerificationStatus, 'approved' | 'rejected'>;
  note?: string;
}): Promise<AppUser> {
  const supabase = getSupabase();
  const { error } = await supabase
    .from('profiles')
    .update({
      verification_status: input.status,
      verification_note: input.note?.trim() || null,
    })
    .eq('id', input.riderId)
    .eq('role', 'rider');

  if (error) throw new Error(error.message);
  return fetchProfile(input.riderId);
}

export async function saveBankDetails(userId: string, details: BankDetails): Promise<AppUser> {
  const supabase = getSupabase();
  const { error } = await supabase
    .from('profiles')
    .update({
      bank_name: details.bankName.trim(),
      account_name: details.accountName.trim(),
      account_number: details.accountNumber.replace(/\D/g, ''),
    })
    .eq('id', userId);

  if (error) throw new Error(error.message);
  return fetchProfile(userId);
}

export async function listRiders(): Promise<AppUser[]> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('role', 'rider')
    .order('created_at', { ascending: false });
  if (error) throw new Error(error.message);
  return Promise.all((data as ProfileRow[]).map(mapProfile));
}

export async function listOrders(): Promise<DeliveryOrder[]> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .order('updated_at', { ascending: false });
  if (error) throw new Error(error.message);
  return (data as OrderRow[]).map(mapOrder);
}

export async function listOrdersForRider(riderId: string): Promise<DeliveryOrder[]> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('rider_id', riderId)
    .order('updated_at', { ascending: false });
  if (error) throw new Error(error.message);
  return (data as OrderRow[]).map(mapOrder);
}

export async function getOrder(orderId: string): Promise<DeliveryOrder | null> {
  const supabase = getSupabase();
  const { data, error } = await supabase.from('orders').select('*').eq('id', orderId).maybeSingle();
  if (error) throw new Error(error.message);
  return data ? mapOrder(data as OrderRow) : null;
}

export async function createOrder(input: {
  adminId: string;
  pickupAddress: string;
  dropoffAddress: string;
  customerName: string;
  customerPhone: string;
  itemDescription: string;
  notes?: string;
  riderId?: string;
  payoutAmountNgn?: number;
}): Promise<DeliveryOrder> {
  const supabase = getSupabase();
  const payload = {
    reference: createOrderReference(),
    pickup_address: input.pickupAddress.trim(),
    dropoff_address: input.dropoffAddress.trim(),
    customer_name: input.customerName.trim(),
    customer_phone: normalizeNgPhone(input.customerPhone),
    item_description: input.itemDescription.trim(),
    notes: input.notes?.trim() || null,
    status: input.riderId ? 'assigned' : 'unassigned',
    rider_id: input.riderId || null,
    created_by_admin_id: input.adminId,
    payout_amount_ngn: input.payoutAmountNgn ?? null,
  };

  const { data, error } = await supabase.from('orders').insert(payload).select('*').single();
  if (error || !data) throw new Error(error?.message || 'Could not create order.');
  return mapOrder(data as OrderRow);
}

export async function assignOrder(orderId: string, riderId: string): Promise<DeliveryOrder> {
  const supabase = getSupabase();
  const rider = await fetchProfile(riderId);
  if (rider.role !== 'rider') throw new Error('Rider not found.');
  if (rider.verificationStatus !== 'approved') {
    throw new Error('Only approved riders can be assigned.');
  }

  const existing = await getOrder(orderId);
  if (!existing) throw new Error('Order not found.');

  const nextStatus =
    existing.status === 'unassigned' || existing.status === 'cancelled' ? 'assigned' : existing.status;

  const { data, error } = await supabase
    .from('orders')
    .update({
      rider_id: riderId,
      status: nextStatus,
    })
    .eq('id', orderId)
    .select('*')
    .single();

  if (error || !data) throw new Error(error?.message || 'Assign failed.');
  return mapOrder(data as OrderRow);
}

export async function updateOrderStatus(
  orderId: string,
  status: Extract<OrderStatus, 'picked_up' | 'delivered' | 'cancelled'>,
  actorUserId: string
): Promise<DeliveryOrder> {
  void actorUserId;
  const existing = await getOrder(orderId);
  if (!existing) throw new Error('Order not found.');

  const now = new Date().toISOString();
  const patch: Record<string, unknown> = { status };

  if (status === 'picked_up') {
    if (existing.status !== 'assigned') throw new Error('Order must be assigned before pickup.');
    patch.picked_up_at = now;
  } else if (status === 'delivered') {
    if (existing.status !== 'picked_up') throw new Error('Mark picked up before delivered.');
    patch.delivered_at = now;
  }

  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('orders')
    .update(patch)
    .eq('id', orderId)
    .select('*')
    .single();

  if (error || !data) throw new Error(error?.message || 'Update failed.');
  return mapOrder(data as OrderRow);
}

export async function markPayoutPaid(orderId: string, paid: boolean): Promise<DeliveryOrder> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('orders')
    .update({
      payout_marked_paid: paid,
      payout_paid_at: paid ? new Date().toISOString() : null,
    })
    .eq('id', orderId)
    .select('*')
    .single();

  if (error || !data) throw new Error(error?.message || 'Update failed.');
  return mapOrder(data as OrderRow);
}

export async function resetDemoData(): Promise<void> {
  throw new Error('Demo reset is only available in local demo mode.');
}
