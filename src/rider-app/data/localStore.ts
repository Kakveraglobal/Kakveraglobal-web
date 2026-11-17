import { hashPassword } from '../lib/crypto';
import { createId, createOrderReference } from '../lib/ids';
import { normalizeNgPhone } from '../lib/phone';
import type {
  AppUser,
  BankDetails,
  DeliveryOrder,
  OrderStatus,
  RiderAppState,
  VerificationStatus,
} from '../types';
import {
  DEMO_ADMIN_PASSWORD,
  DEMO_ADMIN_PHONE,
  DEMO_RIDER_PASSWORD,
  DEMO_RIDER_PHONE,
  STORAGE_KEY,
  emptyState,
} from './seed';

function loadRaw(): RiderAppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyState();
    return JSON.parse(raw) as RiderAppState;
  } catch {
    return emptyState();
  }
}

function save(state: RiderAppState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

async function ensureSeed(state: RiderAppState): Promise<RiderAppState> {
  if (state.users.length > 0) return state;

  const adminHash = await hashPassword(DEMO_ADMIN_PASSWORD, DEMO_ADMIN_PHONE);
  const riderHash = await hashPassword(DEMO_RIDER_PASSWORD, DEMO_RIDER_PHONE);
  const now = new Date().toISOString();

  const admin: AppUser = {
    id: createId('USR'),
    role: 'admin',
    phone: DEMO_ADMIN_PHONE,
    fullName: 'Kakvera Ops Admin',
    passwordHash: adminHash,
    createdAt: now,
  };

  const rider: AppUser = {
    id: createId('USR'),
    role: 'rider',
    phone: DEMO_RIDER_PHONE,
    fullName: 'Demo Rider',
    passwordHash: riderHash,
    createdAt: now,
    verificationStatus: 'approved',
    bankDetails: {
      bankName: 'GTBank',
      accountName: 'Demo Rider',
      accountNumber: '0123456789',
    },
  };

  const order: DeliveryOrder = {
    id: createId('ORD'),
    reference: createOrderReference(),
    pickupAddress: 'Airport Road, Ikeja, Lagos',
    dropoffAddress: 'Lekki Phase 1, Lagos',
    customerName: 'Ada Okeke',
    customerPhone: '08033334444',
    itemDescription: 'Carton — phone accessories',
    notes: 'Call customer on arrival',
    status: 'assigned',
    riderId: rider.id,
    createdByAdminId: admin.id,
    createdAt: now,
    updatedAt: now,
    payoutAmountNgn: 3500,
  };

  const seeded: RiderAppState = {
    users: [admin, rider],
    orders: [order],
    session: { userId: null },
  };
  save(seeded);
  return seeded;
}

export async function getState(): Promise<RiderAppState> {
  return ensureSeed(loadRaw());
}

export async function getCurrentUser(): Promise<AppUser | null> {
  const state = await getState();
  if (!state.session.userId) return null;
  return state.users.find((u) => u.id === state.session.userId) ?? null;
}

export async function login(phoneInput: string, password: string): Promise<AppUser> {
  const state = await getState();
  const phone = normalizeNgPhone(phoneInput);
  const user = state.users.find((u) => u.phone === phone);
  if (!user) throw new Error('No account found for that phone number.');
  const hash = await hashPassword(password, phone);
  if (hash !== user.passwordHash) throw new Error('Incorrect password.');
  state.session.userId = user.id;
  save(state);
  return user;
}

export async function logout(): Promise<void> {
  const state = await getState();
  state.session.userId = null;
  save(state);
}

export async function signupRider(input: {
  fullName: string;
  phone: string;
  password: string;
}): Promise<AppUser> {
  const state = await getState();
  const phone = normalizeNgPhone(input.phone);
  if (state.users.some((u) => u.phone === phone)) {
    throw new Error('An account already exists for that phone number.');
  }
  const user: AppUser = {
    id: createId('USR'),
    role: 'rider',
    phone,
    fullName: input.fullName.trim(),
    passwordHash: await hashPassword(input.password, phone),
    createdAt: new Date().toISOString(),
    verificationStatus: 'unsubmitted',
  };
  state.users.push(user);
  state.session.userId = user.id;
  save(state);
  return user;
}

export async function submitVerification(input: {
  userId: string;
  idDocName: string;
  idDocDataUrl: string;
  selfieName: string;
  selfieDataUrl: string;
}): Promise<AppUser> {
  const state = await getState();
  const user = state.users.find((u) => u.id === input.userId);
  if (!user || user.role !== 'rider') throw new Error('Rider not found.');
  user.idDocName = input.idDocName;
  user.idDocDataUrl = input.idDocDataUrl;
  user.selfieName = input.selfieName;
  user.selfieDataUrl = input.selfieDataUrl;
  user.verificationStatus = 'pending';
  user.verificationNote = undefined;
  save(state);
  return user;
}

export async function setVerificationStatus(input: {
  riderId: string;
  status: Extract<VerificationStatus, 'approved' | 'rejected'>;
  note?: string;
}): Promise<AppUser> {
  const state = await getState();
  const user = state.users.find((u) => u.id === input.riderId);
  if (!user || user.role !== 'rider') throw new Error('Rider not found.');
  user.verificationStatus = input.status;
  user.verificationNote = input.note?.trim() || undefined;
  save(state);
  return user;
}

export async function saveBankDetails(userId: string, details: BankDetails): Promise<AppUser> {
  const state = await getState();
  const user = state.users.find((u) => u.id === userId);
  if (!user || user.role !== 'rider') throw new Error('Rider not found.');
  user.bankDetails = {
    bankName: details.bankName.trim(),
    accountName: details.accountName.trim(),
    accountNumber: details.accountNumber.replace(/\D/g, ''),
  };
  save(state);
  return user;
}

export async function listRiders(): Promise<AppUser[]> {
  const state = await getState();
  return state.users
    .filter((u) => u.role === 'rider')
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function listOrders(): Promise<DeliveryOrder[]> {
  const state = await getState();
  return [...state.orders].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export async function listOrdersForRider(riderId: string): Promise<DeliveryOrder[]> {
  const orders = await listOrders();
  return orders.filter((o) => o.riderId === riderId);
}

export async function getOrder(orderId: string): Promise<DeliveryOrder | null> {
  const state = await getState();
  return state.orders.find((o) => o.id === orderId) ?? null;
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
  const state = await getState();
  const now = new Date().toISOString();
  const order: DeliveryOrder = {
    id: createId('ORD'),
    reference: createOrderReference(),
    pickupAddress: input.pickupAddress.trim(),
    dropoffAddress: input.dropoffAddress.trim(),
    customerName: input.customerName.trim(),
    customerPhone: normalizeNgPhone(input.customerPhone),
    itemDescription: input.itemDescription.trim(),
    notes: input.notes?.trim() || undefined,
    status: input.riderId ? 'assigned' : 'unassigned',
    riderId: input.riderId,
    createdByAdminId: input.adminId,
    createdAt: now,
    updatedAt: now,
    payoutAmountNgn: input.payoutAmountNgn,
  };
  state.orders.unshift(order);
  save(state);
  return order;
}

export async function assignOrder(orderId: string, riderId: string): Promise<DeliveryOrder> {
  const state = await getState();
  const order = state.orders.find((o) => o.id === orderId);
  const rider = state.users.find((u) => u.id === riderId && u.role === 'rider');
  if (!order) throw new Error('Order not found.');
  if (!rider) throw new Error('Rider not found.');
  if (rider.verificationStatus !== 'approved') {
    throw new Error('Only approved riders can be assigned.');
  }
  order.riderId = riderId;
  if (order.status === 'unassigned' || order.status === 'cancelled') {
    order.status = 'assigned';
  }
  order.updatedAt = new Date().toISOString();
  save(state);
  return order;
}

export async function updateOrderStatus(
  orderId: string,
  status: Extract<OrderStatus, 'picked_up' | 'delivered' | 'cancelled'>,
  actorUserId: string
): Promise<DeliveryOrder> {
  const state = await getState();
  const order = state.orders.find((o) => o.id === orderId);
  const actor = state.users.find((u) => u.id === actorUserId);
  if (!order) throw new Error('Order not found.');
  if (!actor) throw new Error('User not found.');

  if (actor.role === 'rider' && order.riderId !== actor.id) {
    throw new Error('This order is not assigned to you.');
  }

  const now = new Date().toISOString();
  if (status === 'picked_up') {
    if (order.status !== 'assigned') throw new Error('Order must be assigned before pickup.');
    order.status = 'picked_up';
    order.pickedUpAt = now;
  } else if (status === 'delivered') {
    if (order.status !== 'picked_up') throw new Error('Mark picked up before delivered.');
    order.status = 'delivered';
    order.deliveredAt = now;
  } else {
    order.status = 'cancelled';
  }
  order.updatedAt = now;
  save(state);
  return order;
}

export async function markPayoutPaid(orderId: string, paid: boolean): Promise<DeliveryOrder> {
  const state = await getState();
  const order = state.orders.find((o) => o.id === orderId);
  if (!order) throw new Error('Order not found.');
  order.payoutMarkedPaid = paid;
  order.payoutPaidAt = paid ? new Date().toISOString() : undefined;
  order.updatedAt = new Date().toISOString();
  save(state);
  return order;
}

export async function resetDemoData(): Promise<void> {
  localStorage.removeItem(STORAGE_KEY);
  await getState();
}
