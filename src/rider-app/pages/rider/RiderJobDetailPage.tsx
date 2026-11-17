import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import { OrderStatusBadge } from '../../components/StatusBadge';
import * as store from '../../data/store';
import { formatNgPhoneDisplay } from '../../lib/phone';
import type { DeliveryOrder } from '../../types';

export default function RiderJobDetailPage() {
  const { orderId } = useParams();
  const { user } = useAuth();
  const [order, setOrder] = useState<DeliveryOrder | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let alive = true;
    (async () => {
      if (!orderId) return;
      try {
        const next = await store.getOrder(orderId);
        if (alive) setOrder(next);
      } catch (err) {
        if (alive) setError(err instanceof Error ? err.message : 'Failed to load order.');
      }
    })();
    return () => {
      alive = false;
    };
  }, [orderId]);

  const updateStatus = async (status: 'picked_up' | 'delivered') => {
    if (!order || !user) return;
    setBusy(true);
    setError('');
    try {
      const next = await store.updateOrderStatus(order.id, status, user.id);
      setOrder(next);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Update failed.');
    } finally {
      setBusy(false);
    }
  };

  if (!order) {
    return (
      <div className="space-y-3">
        <Link to="/app/rider" className="text-sm text-blue-700 hover:underline">
          ← Back to jobs
        </Link>
        <p className="text-sm text-gray-600">{error || 'Loading…'}</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <Link to="/app/rider" className="text-sm text-blue-700 hover:underline">
        ← Back to jobs
      </Link>

      <div className="rounded-xl border border-blue-100 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold text-gray-900">{order.reference}</h1>
            <p className="mt-1 text-sm text-gray-600">{order.itemDescription}</p>
          </div>
          <OrderStatusBadge status={order.status} />
        </div>

        <dl className="mt-5 grid gap-3 text-sm">
          <div>
            <dt className="font-medium text-gray-500">Pickup</dt>
            <dd className="text-gray-900">{order.pickupAddress}</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-500">Drop-off</dt>
            <dd className="text-gray-900">{order.dropoffAddress}</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-500">Customer</dt>
            <dd className="text-gray-900">
              {order.customerName} · {formatNgPhoneDisplay(order.customerPhone)}
            </dd>
          </div>
          {order.notes ? (
            <div>
              <dt className="font-medium text-gray-500">Notes</dt>
              <dd className="text-gray-900">{order.notes}</dd>
            </div>
          ) : null}
          {typeof order.payoutAmountNgn === 'number' ? (
            <div>
              <dt className="font-medium text-gray-500">Payout</dt>
              <dd className="text-gray-900">₦{order.payoutAmountNgn.toLocaleString('en-NG')}</dd>
            </div>
          ) : null}
        </dl>

        {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}

        <div className="mt-5 flex flex-wrap gap-2">
          {order.status === 'assigned' ? (
            <button
              type="button"
              disabled={busy}
              onClick={() => updateStatus('picked_up')}
              className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800 disabled:opacity-60"
            >
              Mark picked up
            </button>
          ) : null}
          {order.status === 'picked_up' ? (
            <button
              type="button"
              disabled={busy}
              onClick={() => updateStatus('delivered')}
              className="rounded-lg bg-green-700 px-4 py-2 text-sm font-semibold text-white hover:bg-green-800 disabled:opacity-60"
            >
              Mark delivered
            </button>
          ) : null}
          {order.status === 'delivered' ? (
            <p className="text-sm font-medium text-green-700">This delivery is complete.</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
