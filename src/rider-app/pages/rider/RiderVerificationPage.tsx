import React, { useState } from 'react';
import { useAuth } from '../../auth/AuthContext';
import { VerificationBadge } from '../../components/StatusBadge';
import { readFileAsDataUrl } from '../../lib/files';

export default function RiderVerificationPage() {
  const { user, submitVerification } = useAuth();
  const [idFile, setIdFile] = useState<File | null>(null);
  const [selfieFile, setSelfieFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [ok, setOk] = useState('');
  const [busy, setBusy] = useState(false);

  const status = user?.verificationStatus ?? 'unsubmitted';

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setOk('');
    if (!idFile || !selfieFile) {
      setError('Upload both ID and selfie photos.');
      return;
    }
    setBusy(true);
    try {
      const id = await readFileAsDataUrl(idFile);
      const selfie = await readFileAsDataUrl(selfieFile);
      await submitVerification({
        idDocName: id.name,
        idDocDataUrl: id.dataUrl,
        selfieName: selfie.name,
        selfieDataUrl: selfie.dataUrl,
      });
      setOk('Submitted. Admin will review and approve.');
      setIdFile(null);
      setSelfieFile(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Submit failed.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Verification</h1>
        <p className="text-sm text-gray-600">Upload a clear photo of your ID and a selfie for admin approval.</p>
      </div>

      <div className="rounded-xl border border-blue-100 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="font-medium text-gray-700">Status:</span>
          <VerificationBadge status={status} />
        </div>
        {user?.verificationNote ? (
          <p className="mt-2 text-sm text-red-700">Note: {user.verificationNote}</p>
        ) : null}

        {status === 'approved' ? (
          <p className="mt-4 text-sm text-green-700">You’re approved and can receive delivery jobs.</p>
        ) : (
          <form onSubmit={onSubmit} className="mt-4 space-y-4">
            <label className="block text-sm">
              <span className="mb-1 block font-medium text-gray-700">Government ID photo</span>
              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={(e) => setIdFile(e.target.files?.[0] ?? null)}
                className="block w-full text-sm"
              />
            </label>
            <label className="block text-sm">
              <span className="mb-1 block font-medium text-gray-700">Selfie</span>
              <input
                type="file"
                accept="image/*"
                capture="user"
                onChange={(e) => setSelfieFile(e.target.files?.[0] ?? null)}
                className="block w-full text-sm"
              />
            </label>
            {error ? <p className="text-sm text-red-600">{error}</p> : null}
            {ok ? <p className="text-sm text-green-700">{ok}</p> : null}
            <button
              type="submit"
              disabled={busy || status === 'pending'}
              className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800 disabled:opacity-60"
            >
              {status === 'pending' ? 'Waiting for review…' : busy ? 'Submitting…' : 'Submit for approval'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
