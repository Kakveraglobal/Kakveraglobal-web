import React from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

function navClass({ isActive }: { isActive: boolean }) {
  return `px-3 py-2 text-sm font-medium rounded-md ${
    isActive ? 'bg-blue-700 text-white' : 'text-gray-700 hover:bg-blue-50 hover:text-blue-800'
  }`;
}

export default function AppShell() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const onLogout = async () => {
    await logout();
    navigate('/app/login');
  };

  const riderLinks = [
    { to: '/app/rider', label: 'Jobs', end: true },
    { to: '/app/rider/verification', label: 'Verification', end: false },
    { to: '/app/rider/payout', label: 'Payout', end: false },
  ];

  const adminLinks = [
    { to: '/app/admin', label: 'Orders', end: true },
    { to: '/app/admin/riders', label: 'Riders', end: false },
    { to: '/app/admin/orders/new', label: 'New order', end: false },
  ];

  const links = user?.role === 'admin' ? adminLinks : riderLinks;

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-gray-900">
      <header className="border-b border-blue-100 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3">
          <Link to="/app" className="flex items-center gap-2">
            <img src="/logo.png" alt="" className="h-8 w-8 rounded-sm object-cover object-left" />
            <div>
              <div className="text-sm font-bold leading-tight">KAKVERA Rider</div>
              <div className="text-[11px] font-medium text-blue-700">
                {user?.role === 'admin' ? 'Admin' : 'Rider'} · Nigeria
              </div>
            </div>
          </Link>
          <div className="flex items-center gap-2 text-sm">
            <span className="hidden text-gray-600 sm:inline">{user?.fullName}</span>
            <button
              type="button"
              onClick={onLogout}
              className="rounded-md border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Log out
            </button>
          </div>
        </div>
        <nav className="mx-auto flex max-w-5xl gap-1 overflow-x-auto px-4 pb-3">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.end} className={navClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}
