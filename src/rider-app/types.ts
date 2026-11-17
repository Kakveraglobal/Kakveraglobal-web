export type UserRole = 'rider' | 'admin';

export type VerificationStatus = 'unsubmitted' | 'pending' | 'approved' | 'rejected';

export type OrderStatus = 'unassigned' | 'assigned' | 'picked_up' | 'delivered' | 'cancelled';

export interface BankDetails {
  bankName: string;
  accountName: string;
  accountNumber: string;
}

export interface AppUser {
  id: string;
  role: UserRole;
  phone: string;
  fullName: string;
  passwordHash: string;
  createdAt: string;
  /** Rider-only fields */
  verificationStatus?: VerificationStatus;
  verificationNote?: string;
  idDocName?: string;
  idDocDataUrl?: string;
  selfieName?: string;
  selfieDataUrl?: string;
  bankDetails?: BankDetails;
}

export interface DeliveryOrder {
  id: string;
  reference: string;
  pickupAddress: string;
  dropoffAddress: string;
  customerName: string;
  customerPhone: string;
  itemDescription: string;
  notes?: string;
  status: OrderStatus;
  riderId?: string;
  createdByAdminId: string;
  createdAt: string;
  updatedAt: string;
  pickedUpAt?: string;
  deliveredAt?: string;
  payoutAmountNgn?: number;
  payoutMarkedPaid?: boolean;
  payoutPaidAt?: string;
}

export interface SessionState {
  userId: string | null;
}

export interface RiderAppState {
  users: AppUser[];
  orders: DeliveryOrder[];
  session: SessionState;
}
