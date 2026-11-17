import React, { useEffect, useState } from 'react';
import { useAuth } from '../../auth/AuthContext';
import { VerificationBadge } from '../../components/StatusBadge';
import * as store from '../../data/store';
import { formatNgPhoneDisplay } from '../../lib/phone';
import type { AppUser } from '../../types';

export default function AdminRidersPage() {
  const { setVerificationStatus } = useAuth();
  const [riders, setRiders] = useState<AppUser[]>([]);
  const [error, setError] = useState('');
  const [busyId, setBusyId] = useState<string | null>(null);
  const [rejectNotes, setRejectNotes] = useState<Record<string, string>>({});

  const load = async () => {
    const list = await store.listRiders();
    setRiders(list);
  };

  useEffect(() => {
    load().catch((err) => setError(err instanceof Error ? err.message : 'Failed to load riders.'));
  }, []);

  const act = async (riderId: string, status: 'approved' | 'rejected') => {
    setBusyId(riderId);
    setError('');
    try {
      await setVerificationStatus(riderId, status, status === 'rejected' ? rejectNotes[riderId] : undefined);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Update failed.');
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Riders</h1>
        <p className="text-sm text-gray-600">Review ID/selfie submissions and approve riders.</p>
      </div>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      {riders.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 bg-white p-6 text-sm text-gray-600">
          No riders yet.
        </div>
      ) : (
        <ul className="space-y-4">
          {riders.map((rider) => {
            const status = rider.verificationStatus ?? 'unsubmitted';
            return (
              <li key={rider.id} className="rounded-xl border border-blue-100 bg-white p-4 shadow-sm">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="font-semibold text-gray-900">{rider.fullName}</div>
                    <div className="text-sm text-gray-600">{formatNgPhoneDisplay(rider.phone)}</div>
                  </div>
                  <VerificationBadge status={status} />
                </div>

                {rider.bankDetails ? (
                  <p className="mt-2 text-sm text-gray-700">
                    Bank: {rider.bankDetails.bankName} · {rider.bankDetails.accountNumber} ·{' '}
                    {rider.bankDetails.accountName}
                  </p>
                ) : (
                  <p className="mt-2 text-sm text-gray-500">No payout account saved yet.</p>
                )}

                {(rider.idDocDataUrl || rider.selfieDataUrl) && (
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    {rider.idDocDataUrl ? (
                      <div>
                        <div className="mb-1 text-xs font-medium text-gray-500">ID</div>
                        <img
                          src={rider.idDocDataUrl}
                          alt="Rider ID"
                          className="max-h-40 w-full rounded-md border object-contain"
                        />
                      </div>
                    ) : null}
                    {rider.selfieDataUrl ? (
                      <div>
                        <div className="mb-1 text-xs font-medium text-gray-500">Selfie</div>
                        <img
                          src={rider.selfieDataUrl}
                          alt="Rider selfie"
                          className="max-h-40 w-full rounded-md border object-contain"
                        />
                      </div>
                    ) : null}
                  </div>
                )}

                {status === 'pending' || status === 'rejected' || status === 'unsubmitted' ? (
                  <div className="mt-4 space-y-2 border-t border-gray-100 pt-3">
                    <input
                      value={rejectNotes[rider.id] ?? ''}
                      onChange={(e) =>
                        setRejectNotes((prev) => ({ ...prev, [rider.id]: e.target.value }))
                      }
                      placeholder="Reject reason (optional)"
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                    />
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        disabled={busyId === rider.id || status === 'unsubmitted'}
                        onClick={() => act(rider.id, 'approved')}
                        className="rounded-lg bg-green-700 px-3 py-1.5 text-sm font-semibold text-white hover:bg-green-800 disabled:opacity-60"
                      >
                        Approve
                      </button>
                      <button
                        type="button"
                        disabled={busyId === rider.id || status === 'unsubmitted'}
                        onClick={() => act(rider.id, 'rejected')}
                        className="rounded-lg border border-red-200 px-3 py-1.5 text-sm font-semibold text-red-700 hover:bg-red-50 disabled:opacity-60"
                      >
                        Reject
                      </button>
                    </div>
                    {status === 'unsubmitted' ? (
                      <p className="text-xs text-gray-500">Waiting for rider to upload documents.</p>
                    ) : null}
                  </div>
                ) : null}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
