import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { api, setAuthToken } from '@/lib/api';

type User = { id: number; name: string; role: 'employee' | 'manager' };

type AuthContextType = {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('auth');
    if (stored) {
      const parsed = JSON.parse(stored) as { token: string; user: User };
      setUser(parsed.user);
      setToken(parsed.token);
      setAuthToken(parsed.token);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const res = await api.post('/auth/login', { email, password });
    const { token: t, user: u } = res.data;
    setUser(u);
    setToken(t);
    setAuthToken(t);
    localStorage.setItem('auth', JSON.stringify({ token: t, user: u }));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setAuthToken(undefined);
    localStorage.removeItem('auth');
  };

  const value = useMemo(() => ({ user, token, login, logout }), [user, token]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
