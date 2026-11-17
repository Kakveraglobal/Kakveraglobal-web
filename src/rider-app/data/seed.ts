import type { RiderAppState } from '../types';

/** Demo seed — replace with Supabase when going multi-device production. */
export const DEMO_ADMIN_PHONE = '08011111111';
export const DEMO_ADMIN_PASSWORD = 'Admin1234';
export const DEMO_RIDER_PHONE = '08022222222';
export const DEMO_RIDER_PASSWORD = 'Rider1234';

export const STORAGE_KEY = 'kakvera-rider-app-v1';

export function emptyState(): RiderAppState {
  return {
    users: [],
    orders: [],
    session: { userId: null },
  };
}
