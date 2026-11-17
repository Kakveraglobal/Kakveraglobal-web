import React from 'react';
import type { OrderStatus, VerificationStatus } from '../types';

const orderStyles: Record<OrderStatus, string> = {
  unassigned: 'bg-gray-100 text-gray-700',
  assigned: 'bg-blue-50 text-blue-800',
  picked_up: 'bg-amber-50 text-amber-800',
  delivered: 'bg-green-50 text-green-800',
  cancelled: 'bg-red-50 text-red-700',
};

const verifyStyles: Record<VerificationStatus, string> = {
  unsubmitted: 'bg-gray-100 text-gray-700',
  pending: 'bg-amber-50 text-amber-800',
  approved: 'bg-green-50 text-green-800',
  rejected: 'bg-red-50 text-red-700',
};

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const label = status.replace('_', ' ');
  return (
    <span className={`inline-flex rounded-md px-2 py-0.5 text-xs font-semibold capitalize ${orderStyles[status]}`}>
      {label}
    </span>
  );
}

export function VerificationBadge({ status }: { status: VerificationStatus }) {
  return (
    <span className={`inline-flex rounded-md px-2 py-0.5 text-xs font-semibold capitalize ${verifyStyles[status]}`}>
      {status}
    </span>
  );
}
