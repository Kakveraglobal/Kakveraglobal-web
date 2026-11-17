import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import { OrderStatusBadge } from '../../components/StatusBadge';
import * as store from '../../data/store';
import { formatNgPhoneDisplay } from '../../lib/phone';
import type { AppUser, DeliveryOrder } from '../../types';

export default function AdminOrderDetailPage() {
  const { orderId } = useParams();
  const { user } = useAuth();
  const [order, setOrder] = useState<DeliveryOrder | null>(null);
  const [riders, setRiders] = useState<AppUser[]>([]);
  const [riderId, setRiderId] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let alive = true;
    (async () => {
      if (!orderId) return;
      try {
        const [next, riderList] = await Promise.all([store.getOrder(orderId), store.listRiders()]);
        if (!alive) return;
        setOrder(next);
        setRiders(riderList.filter((r) => r.verificationStatus === 'approved'));
        setRiderId(next?.riderId ?? '');
      } catch (err) {
        if (alive) setError(err instanceof Error ? err.message : 'Failed to load.');
      }
    })();
    return () => {
      alive = false;
    };
  }, [orderId]);

  const assignedRider = riders.find((r) => r.id === order?.riderId) ?? null;

  const onAssign = async () => {
    if (!order || !riderId) return;
    setBusy(true);
    setError('');
    try {
      const next = await store.assignOrder(order.id, riderId);
      setOrder(next);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Assign failed.');
    } finally {
      setBusy(false);
    }
  };

  const onMarkPaid = async (paid: boolean) => {
    if (!order) return;
    setBusy(true);
    setError('');
    try {
      const next = await store.markPayoutPaid(order.id, paid);
      setOrder(next);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Update failed.');
    } finally {
      setBusy(false);
    }
  };

  const onCancel = async () => {
    if (!order || !user) return;
    setBusy(true);
    setError('');
    try {
      const next = await store.updateOrderStatus(order.id, 'cancelled', user.id);
      setOrder(next);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Cancel failed.');
    } finally {
      setBusy(false);
    }
  };

  if (!order) {
    return (
      <div className="space-y-3">
        <Link to="/app/admin" className="text-sm text-blue-700 hover:underline">
          ← Back to orders
        </Link>
        <p className="text-sm text-gray-600">{error || 'Loading…'}</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <Link to="/app/admin" className="text-sm text-blue-700 hover:underline">
        ← Back to orders
      </Link>

      <div className="rounded-xl border border-blue-100 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold text-gray-900">{order.reference}</h1>
            <p className="mt-1 text-sm text-gray-600">{order.itemDescription}</p>
          </div>
          <OrderStatusBadge status={order.status} />
        </div>

        <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
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
          <div>
            <dt className="font-medium text-gray-500">Rider</dt>
            <dd className="text-gray-900">
              {assignedRider ? `${assignedRider.fullName} (${assignedRider.phone})` : 'Unassigned'}
            </dd>
          </div>
          {order.notes ? (
            <div className="sm:col-span-2">
              <dt className="font-medium text-gray-500">Notes</dt>
              <dd className="text-gray-900">{order.notes}</dd>
            </div>
          ) : null}
          <div>
            <dt className="font-medium text-gray-500">Picked up</dt>
            <dd className="text-gray-900">
              {order.pickedUpAt ? new Date(order.pickedUpAt).toLocaleString() : '—'}
            </dd>
          </div>
          <div>
            <dt className="font-medium text-gray-500">Delivered</dt>
            <dd className="text-gray-900">
              {order.deliveredAt ? new Date(order.deliveredAt).toLocaleString() : '—'}
            </dd>
          </div>
        </dl>

        {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}

        {order.status !== 'delivered' && order.status !== 'cancelled' ? (
          <div className="mt-5 flex flex-wrap items-end gap-2 border-t border-gray-100 pt-4">
            <label className="block text-sm">
              <span className="mb-1 block font-medium text-gray-700">Assign / reassign rider</span>
              <select
                value={riderId}
                onChange={(e) => setRiderId(e.target.value)}
                className="min-w-[220px] rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              >
                <option value="">Select rider</option>
                {riders.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.fullName} ({r.phone})
                  </option>
                ))}
              </select>
            </label>
            <button
              type="button"
              disabled={busy || !riderId}
              onClick={onAssign}
              className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800 disabled:opacity-60"
            >
              Save assignment
            </button>
            <button
              type="button"
              disabled={busy}
              onClick={onCancel}
              className="rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-50 disabled:opacity-60"
            >
              Cancel order
            </button>
          </div>
        ) : null}

        {typeof order.payoutAmountNgn === 'number' ? (
          <div className="mt-5 rounded-lg bg-[#f5f7fb] p-4 text-sm">
            <div className="font-semibold text-gray-900">
              Rider payout: ₦{order.payoutAmountNgn.toLocaleString('en-NG')}
            </div>
            {assignedRider?.bankDetails ? (
              <div className="mt-2 text-gray-700">
                <div>
                  {assignedRider.bankDetails.bankName} · {assignedRider.bankDetails.accountNumber}
                </div>
                <div>{assignedRider.bankDetails.accountName}</div>
              </div>
            ) : (
              <p className="mt-2 text-gray-600">Rider has not saved bank details yet.</p>
            )}
            <div className="mt-3 flex flex-wrap gap-2">
              {order.payoutMarkedPaid ? (
                <>
                  <span className="rounded-md bg-green-50 px-2 py-1 text-xs font-semibold text-green-800">
                    Marked paid
                    {order.payoutPaidAt ? ` · ${new Date(order.payoutPaidAt).toLocaleString()}` : ''}
                  </span>
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => onMarkPaid(false)}
                    className="text-xs font-semibold text-gray-600 underline"
                  >
                    Undo
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  disabled={busy || order.status !== 'delivered'}
                  onClick={() => onMarkPaid(true)}
                  className="rounded-lg bg-green-700 px-3 py-1.5 text-xs font-semibold text-white hover:bg-green-800 disabled:opacity-60"
                >
                  Mark paid
                </button>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
