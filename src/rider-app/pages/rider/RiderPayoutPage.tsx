import React, { useState } from 'react';
import { useAuth } from '../../auth/AuthContext';

export default function RiderPayoutPage() {
  const { user, saveBankDetails } = useAuth();
  const [bankName, setBankName] = useState(user?.bankDetails?.bankName ?? '');
  const [accountName, setAccountName] = useState(user?.bankDetails?.accountName ?? '');
  const [accountNumber, setAccountNumber] = useState(user?.bankDetails?.accountNumber ?? '');
  const [error, setError] = useState('');
  const [ok, setOk] = useState('');
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setOk('');
    if (!bankName.trim() || !accountName.trim()) {
      setError('Bank name and account name are required.');
      return;
    }
    if (!/^\d{10}$/.test(accountNumber.replace(/\D/g, ''))) {
      setError('Enter a 10-digit NUBAN account number.');
      return;
    }
    setBusy(true);
    try {
      await saveBankDetails({ bankName, accountName, accountNumber });
      setOk('Payout account saved. Admin can use this to pay you.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Payout account</h1>
        <p className="text-sm text-gray-600">
          Save your Nigerian bank details so ops can pay you. Auto-payout comes later.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4 rounded-xl border border-blue-100 bg-white p-5 shadow-sm">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-gray-700">Bank name</span>
          <input
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
            placeholder="e.g. GTBank"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            required
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-gray-700">Account name</span>
          <input
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            required
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-gray-700">Account number</span>
          <input
            inputMode="numeric"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            required
          />
        </label>
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        {ok ? <p className="text-sm text-green-700">{ok}</p> : null}
        <button
          type="submit"
          disabled={busy}
          className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800 disabled:opacity-60"
        >
          {busy ? 'Saving…' : 'Save account'}
        </button>
      </form>
    </div>
  );
}
