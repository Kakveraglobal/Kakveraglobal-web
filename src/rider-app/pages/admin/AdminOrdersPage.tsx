import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { OrderStatusBadge } from '../../components/StatusBadge';
import * as store from '../../data/store';
import type { AppUser, DeliveryOrder } from '../../types';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<DeliveryOrder[]>([]);
  const [riders, setRiders] = useState<AppUser[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([store.listOrders(), store.listRiders()])
      .then(([o, r]) => {
        setOrders(o);
        setRiders(r);
      })
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load.'));
  }, []);

  const riderName = (id?: string) => riders.find((r) => r.id === id)?.fullName ?? 'Unassigned';

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Orders</h1>
          <p className="text-sm text-gray-600">Track pickup, drop-off, and delivery status by order.</p>
        </div>
        <Link
          to="/app/admin/orders/new"
          className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800"
        >
          New order
        </Link>
      </div>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      {orders.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 bg-white p-6 text-sm text-gray-600">
          No orders yet. Create one to assign a rider.
        </div>
      ) : (
        <ul className="space-y-3">
          {orders.map((order) => (
            <li key={order.id}>
              <Link
                to={`/app/admin/orders/${order.id}`}
                className="block rounded-xl border border-blue-100 bg-white p-4 shadow-sm hover:border-blue-300"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-semibold text-gray-900">{order.reference}</div>
                    <div className="mt-1 text-sm text-gray-600">{order.itemDescription}</div>
                    <div className="mt-2 text-sm text-gray-700">Rider: {riderName(order.riderId)}</div>
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
