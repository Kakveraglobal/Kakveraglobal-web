import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import * as store from '../data/localStore';
import type { AppUser, BankDetails, VerificationStatus } from '../types';

interface AuthContextValue {
  user: AppUser | null;
  loading: boolean;
  refresh: () => Promise<void>;
  login: (phone: string, password: string) => Promise<AppUser>;
  signupRider: (input: { fullName: string; phone: string; password: string }) => Promise<AppUser>;
  logout: () => Promise<void>;
  submitVerification: (input: {
    idDocName: string;
    idDocDataUrl: string;
    selfieName: string;
    selfieDataUrl: string;
  }) => Promise<void>;
  saveBankDetails: (details: BankDetails) => Promise<void>;
  setVerificationStatus: (
    riderId: string,
    status: Extract<VerificationStatus, 'approved' | 'rejected'>,
    note?: string
  ) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const current = await store.getCurrentUser();
    setUser(current);
  }, []);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const current = await store.getCurrentUser();
        if (alive) setUser(current);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      refresh,
      login: async (phone, password) => {
        const next = await store.login(phone, password);
        setUser(next);
        return next;
      },
      signupRider: async (input) => {
        const next = await store.signupRider(input);
        setUser(next);
        return next;
      },
      logout: async () => {
        await store.logout();
        setUser(null);
      },
      submitVerification: async (input) => {
        if (!user) throw new Error('Not signed in.');
        const next = await store.submitVerification({ userId: user.id, ...input });
        setUser(next);
      },
      saveBankDetails: async (details) => {
        if (!user) throw new Error('Not signed in.');
        const next = await store.saveBankDetails(user.id, details);
        setUser(next);
      },
      setVerificationStatus: async (riderId, status, note) => {
        await store.setVerificationStatus({ riderId, status, note });
        await refresh();
      },
    }),
    [user, loading, refresh]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
