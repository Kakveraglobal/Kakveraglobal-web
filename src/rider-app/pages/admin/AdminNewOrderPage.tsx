import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import * as store from '../../data/store';
import { isValidNgPhone } from '../../lib/phone';
import type { AppUser } from '../../types';

export default function AdminNewOrderPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [riders, setRiders] = useState<AppUser[]>([]);
  const [pickupAddress, setPickupAddress] = useState('');
  const [dropoffAddress, setDropoffAddress] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [notes, setNotes] = useState('');
  const [riderId, setRiderId] = useState('');
  const [payoutAmountNgn, setPayoutAmountNgn] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    store.listRiders().then((list) => {
      setRiders(list.filter((r) => r.verificationStatus === 'approved'));
    });
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setError('');
    if (!isValidNgPhone(customerPhone)) {
      setError('Enter a valid customer phone number.');
      return;
    }
    setBusy(true);
    try {
      const order = await store.createOrder({
        adminId: user.id,
        pickupAddress,
        dropoffAddress,
        customerName,
        customerPhone,
        itemDescription,
        notes,
        riderId: riderId || undefined,
        payoutAmountNgn: payoutAmountNgn ? Number(payoutAmountNgn) : undefined,
      });
      navigate(`/app/admin/orders/${order.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not create order.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-5">
      <Link to="/app/admin" className="text-sm text-blue-700 hover:underline">
        ← Back to orders
      </Link>
      <div>
        <h1 className="text-xl font-bold text-gray-900">New order</h1>
        <p className="text-sm text-gray-600">Create a delivery and optionally assign an approved rider.</p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4 rounded-xl border border-blue-100 bg-white p-5 shadow-sm">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-gray-700">Pickup address</span>
          <input
            value={pickupAddress}
            onChange={(e) => setPickupAddress(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            required
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-gray-700">Drop-off address</span>
          <input
            value={dropoffAddress}
            onChange={(e) => setDropoffAddress(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            required
          />
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm">
            <span className="mb-1 block font-medium text-gray-700">Customer name</span>
            <input
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              required
            />
          </label>
          <label className="block text-sm">
            <span className="mb-1 block font-medium text-gray-700">Customer phone</span>
            <input
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              required
            />
          </label>
        </div>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-gray-700">Item description</span>
          <input
            value={itemDescription}
            onChange={(e) => setItemDescription(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            required
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-gray-700">Notes (optional)</span>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
          />
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm">
            <span className="mb-1 block font-medium text-gray-700">Assign rider (optional)</span>
            <select
              value={riderId}
              onChange={(e) => setRiderId(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            >
              <option value="">Unassigned</option>
              {riders.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.fullName} ({r.phone})
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm">
            <span className="mb-1 block font-medium text-gray-700">Rider payout ₦ (optional)</span>
            <input
              type="number"
              min={0}
              value={payoutAmountNgn}
              onChange={(e) => setPayoutAmountNgn(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            />
          </label>
        </div>
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <button
          type="submit"
          disabled={busy}
          className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800 disabled:opacity-60"
        >
          {busy ? 'Creating…' : 'Create order'}
        </button>
      </form>
    </div>
  );
}
