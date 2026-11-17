import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import { OrderStatusBadge, VerificationBadge } from '../../components/StatusBadge';
import * as store from '../../data/store';
import type { DeliveryOrder } from '../../types';

export default function RiderJobsPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<DeliveryOrder[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) return;
    store
      .listOrdersForRider(user.id)
      .then(setOrders)
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load jobs.'));
  }, [user]);

  const status = user?.verificationStatus ?? 'unsubmitted';

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-gray-900">My jobs</h1>
        <p className="text-sm text-gray-600">Update pickup and delivery status for assigned orders.</p>
      </div>

      {status !== 'approved' ? (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold">Verification:</span>
            <VerificationBadge status={status} />
          </div>
          <p className="mt-2">
            {status === 'pending'
              ? 'Your documents are waiting for admin approval. You can view jobs after approval.'
              : status === 'rejected'
                ? `Rejected${user?.verificationNote ? `: ${user.verificationNote}` : ''}. Please resubmit.`
                : 'Submit your ID and selfie to get approved before taking jobs.'}
          </p>
          <Link to="/app/rider/verification" className="mt-2 inline-block font-semibold text-blue-800 underline">
            Go to verification
          </Link>
        </div>
      ) : null}

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      {orders.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 bg-white p-6 text-sm text-gray-600">
          No jobs assigned yet. Once admin assigns an order, it will show here.
        </div>
      ) : (
        <ul className="space-y-3">
          {orders.map((order) => (
            <li key={order.id}>
              <Link
                to={`/app/rider/jobs/${order.id}`}
                className="block rounded-xl border border-blue-100 bg-white p-4 shadow-sm transition hover:border-blue-300"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-semibold text-gray-900">{order.reference}</div>
                    <div className="mt-1 text-sm text-gray-600">{order.itemDescription}</div>
                  </div>
                  <OrderStatusBadge status={order.status} />
                </div>
                <div className="mt-3 grid gap-1 text-sm text-gray-700">
                  <div>
                    <span className="font-medium">Pickup:</span> {order.pickupAddress}
                  </div>
                  <div>
                    <span className="font-medium">Drop-off:</span> {order.dropoffAddress}
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
