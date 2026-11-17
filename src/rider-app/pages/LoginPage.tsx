import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import {
  DEMO_ADMIN_PASSWORD,
  DEMO_ADMIN_PHONE,
  DEMO_RIDER_PASSWORD,
  DEMO_RIDER_PHONE,
} from '../data/seed';
import { isValidNgPhone } from '../lib/phone';

export default function LoginPage() {
  const { user, loading, login } = useAuth();
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  if (!loading && user) {
    return <Navigate to={user.role === 'admin' ? '/app/admin' : '/app/rider'} replace />;
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!isValidNgPhone(phone)) {
      setError('Enter a valid Nigerian phone number.');
      return;
    }
    setBusy(true);
    try {
      const next = await login(phone, password);
      navigate(next.role === 'admin' ? '/app/admin' : '/app/rider');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-4 py-10">
      <div className="mb-8 text-center">
        <img src="/logo.png" alt="Kakvera" className="mx-auto mb-3 h-12 w-12 rounded-sm object-cover object-left" />
        <h1 className="text-2xl font-bold text-gray-900">KAKVERA Rider</h1>
        <p className="mt-1 text-sm text-gray-600">Sign in to manage deliveries (Nigeria)</p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4 rounded-xl border border-blue-100 bg-white p-5 shadow-sm">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-gray-700">Phone number</span>
          <input
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="0801 234 5678"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            required
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-gray-700">Password</span>
          <input
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            required
          />
        </label>
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <button
          type="submit"
          disabled={busy}
          className="w-full rounded-lg bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-800 disabled:opacity-60"
        >
          {busy ? 'Signing in…' : 'Sign in'}
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-600">
        New rider?{' '}
        <Link to="/app/signup" className="font-semibold text-blue-700 hover:underline">
          Create account
        </Link>
      </p>

      <div className="mt-6 rounded-lg border border-dashed border-gray-300 bg-white/70 p-3 text-xs text-gray-600">
        <p className="font-semibold text-gray-800">Demo accounts (this browser only)</p>
        <p className="mt-1">
          Admin: {DEMO_ADMIN_PHONE} / {DEMO_ADMIN_PASSWORD}
        </p>
        <p>
          Rider: {DEMO_RIDER_PHONE} / {DEMO_RIDER_PASSWORD}
        </p>
        <p className="mt-2 text-gray-500">
          Demo mode stores data in this device’s browser. Production will use a shared database.
        </p>
      </div>

      <p className="mt-6 text-center text-sm">
        <Link to="/" className="text-gray-500 hover:text-blue-700">
          ← Back to website
        </Link>
      </p>
    </div>
  );
}
