import { isSupabaseConfigured } from '../lib/supabase';
import * as localStore from './localStore';
import * as supabaseStore from './supabaseStore';

const api = () => (isSupabaseConfigured() ? supabaseStore : localStore);

export function getDataMode(): 'supabase' | 'demo' {
  return isSupabaseConfigured() ? 'supabase' : 'demo';
}

export const getCurrentUser = (...args: Parameters<typeof localStore.getCurrentUser>) =>
  api().getCurrentUser(...args);

export const login = (...args: Parameters<typeof localStore.login>) => api().login(...args);

export const logout = (...args: Parameters<typeof localStore.logout>) => api().logout(...args);

export const signupRider = (...args: Parameters<typeof localStore.signupRider>) =>
  api().signupRider(...args);

export const submitVerification = (...args: Parameters<typeof localStore.submitVerification>) =>
  api().submitVerification(...args);

export const setVerificationStatus = (...args: Parameters<typeof localStore.setVerificationStatus>) =>
  api().setVerificationStatus(...args);

export const saveBankDetails = (...args: Parameters<typeof localStore.saveBankDetails>) =>
  api().saveBankDetails(...args);

export const listRiders = (...args: Parameters<typeof localStore.listRiders>) =>
  api().listRiders(...args);

export const listOrders = (...args: Parameters<typeof localStore.listOrders>) =>
  api().listOrders(...args);

export const listOrdersForRider = (...args: Parameters<typeof localStore.listOrdersForRider>) =>
  api().listOrdersForRider(...args);

export const getOrder = (...args: Parameters<typeof localStore.getOrder>) => api().getOrder(...args);

export const createOrder = (...args: Parameters<typeof localStore.createOrder>) =>
  api().createOrder(...args);

export const assignOrder = (...args: Parameters<typeof localStore.assignOrder>) =>
  api().assignOrder(...args);

export const updateOrderStatus = (...args: Parameters<typeof localStore.updateOrderStatus>) =>
  api().updateOrderStatus(...args);

export const markPayoutPaid = (...args: Parameters<typeof localStore.markPayoutPaid>) =>
  api().markPayoutPaid(...args);

export const resetDemoData = (...args: Parameters<typeof localStore.resetDemoData>) =>
  api().resetDemoData(...args);
