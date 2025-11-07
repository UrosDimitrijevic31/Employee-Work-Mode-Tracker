import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const dismissError = () => setError(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (e: any) {
      setError(e.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen overflow-hidden flex items-center justify-center px-6">
      <div className="w-full max-w-xl space-y-8">
        <div className="rounded-2xl bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 p-1 shadow-xl">
          <div className="rounded-2xl bg-white/90 dark:bg-gray-900/80 backdrop-blur-sm p-10 md:p-12 shadow-inner">
            <div className="mb-8">
              <h1 className="text-3xl font-semibold tracking-tight bg-gradient-to-r from-indigo-600 to-fuchsia-600 bg-clip-text text-transparent">
                Dobrodošli
              </h1>
              <p className="text-base text-gray-600 dark:text-gray-400 mt-2">
                Prijavite se da nastavite.
              </p>
            </div>
            <form onSubmit={onSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white/80 dark:bg-gray-800/70 px-4 py-3.5 text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Lozinka
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white/80 dark:bg-gray-800/70 px-4 py-3.5 pr-12 text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute inset-y-0 right-2 flex items-center px-2 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    aria-label={showPassword ? 'Sakrij lozinku' : 'Prikaži lozinku'}
                  >
                    {showPassword ? 'Sakrij' : 'Prikaži'}
                  </button>
                </div>
              </div>
              {error && (
                <div className="flex items-start gap-3 rounded-lg border border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-950/40 px-4 py-3">
                  <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
                  <button
                    type="button"
                    onClick={dismissError}
                    className="ml-auto text-[11px] uppercase tracking-wide text-red-600 dark:text-red-400 hover:underline"
                  >
                    Zatvori
                  </button>
                </div>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white text-base font-medium px-5 py-3.5 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-900"
              >
                {loading && (
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/60 border-t-transparent" />
                )}
                {loading ? 'Prijava...' : 'Prijavi se'}
              </button>
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                Unesite kredencijale koje vam je dostavio administrator.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
