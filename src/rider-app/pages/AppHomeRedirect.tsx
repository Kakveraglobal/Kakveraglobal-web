import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export default function AppHomeRedirect() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f5f7fb] text-sm text-gray-600">
        Loading…
      </div>
    );
  }

  if (!user) return <Navigate to="/app/login" replace />;
  return <Navigate to={user.role === 'admin' ? '/app/admin' : '/app/rider'} replace />;
}
