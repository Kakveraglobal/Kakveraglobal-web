import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import AppShell from './components/AppShell';
import { RequireAuth } from './components/RequireAuth';
import AdminNewOrderPage from './pages/admin/AdminNewOrderPage';
import AdminOrderDetailPage from './pages/admin/AdminOrderDetailPage';
import AdminOrdersPage from './pages/admin/AdminOrdersPage';
import AdminRidersPage from './pages/admin/AdminRidersPage';
import AppHomeRedirect from './pages/AppHomeRedirect';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import RiderJobDetailPage from './pages/rider/RiderJobDetailPage';
import RiderJobsPage from './pages/rider/RiderJobsPage';
import RiderPayoutPage from './pages/rider/RiderPayoutPage';
import RiderVerificationPage from './pages/rider/RiderVerificationPage';

export default function RiderAppRoutes() {
  return (
    <AuthProvider>
      <Routes>
        <Route index element={<AppHomeRedirect />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />

        <Route
          element={
            <RequireAuth role="rider">
              <AppShell />
            </RequireAuth>
          }
        >
          <Route path="rider" element={<RiderJobsPage />} />
          <Route path="rider/jobs/:orderId" element={<RiderJobDetailPage />} />
          <Route path="rider/verification" element={<RiderVerificationPage />} />
          <Route path="rider/payout" element={<RiderPayoutPage />} />
        </Route>

        <Route
          element={
            <RequireAuth role="admin">
              <AppShell />
            </RequireAuth>
          }
        >
          <Route path="admin" element={<AdminOrdersPage />} />
          <Route path="admin/orders/new" element={<AdminNewOrderPage />} />
          <Route path="admin/orders/:orderId" element={<AdminOrderDetailPage />} />
          <Route path="admin/riders" element={<AdminRidersPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/app" replace />} />
      </Routes>
    </AuthProvider>
  );
}
