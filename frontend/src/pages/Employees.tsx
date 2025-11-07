import React, { useState } from 'react';
import { useEmployees } from '@/hooks/useEmployees';
import EmployeeCard from '@/components/EmployeeCard';

export default function Employees() {
  const { employees, createEmployee } = useEmployees();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'employee' | 'manager'>('employee');
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await createEmployee({ name, email, password, role });
      setName('');
      setEmail('');
      setPassword('');
      setRole('employee');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 space-y-8">
      <header className="rounded-2xl bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 p-6 shadow-sm text-white">
        <h1 className="text-2xl font-semibold tracking-tight">Zaposleni</h1>
        <p className="mt-1 text-sm opacity-90">Upravljanje članovima tima i kreiranje naloga.</p>
      </header>

      <div className="grid gap-8 md:grid-cols-[1fr_400px]">
        {/* Employees list */}
        <section className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/60 backdrop-blur-sm shadow-sm p-4 md:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium tracking-tight text-gray-800 dark:text-gray-100">
              Lista zaposlenih
            </h2>
            <span className="text-xs px-2 py-1 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300">
              {employees?.length ?? 0}
            </span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {employees?.map((e) => (
              <EmployeeCard key={e.id} employee={e} />
            ))}
            {!employees?.length && (
              <div className="col-span-full text-sm text-gray-500 dark:text-gray-400 italic">
                Još nema zaposlenih.
              </div>
            )}
          </div>
        </section>

        {/* Create employee form */}
        <div className="rounded-2xl bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 p-[1px] shadow-sm">
          <form
            onSubmit={onSubmit}
            className="rounded-2xl bg-white/90 dark:bg-gray-900/80 backdrop-blur-sm p-6 md:p-7 space-y-5"
          >
            <div>
              <h2 className="text-lg font-semibold tracking-tight bg-gradient-to-r from-indigo-600 to-fuchsia-600 bg-clip-text text-transparent">
                Novi nalog
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Popunite podatke i kreirajte korisnika.
              </p>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Ime i prezime
              </label>
              <input
                className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                placeholder="Ime"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Email
              </label>
              <input
                type="email"
                className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                placeholder="email@firma.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Lozinka
              </label>
              <input
                type="password"
                className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Uloga
              </label>
              <select
                className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                value={role}
                onChange={(e) => setRole(e.target.value as any)}
              >
                <option value="employee">Employee</option>
                <option value="manager">Manager</option>
              </select>
            </div>
            <button
              disabled={submitting}
              className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white text-sm font-medium px-4 py-2.5 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-900"
            >
              {submitting && (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/60 border-t-transparent" />
              )}
              {submitting ? 'Kreiranje...' : 'Kreiraj zaposlenog'}
            </button>
            <p className="text-[11px] text-gray-500 dark:text-gray-500 text-center">
              Lozinku prosledite korisniku preko sigurnog kanala.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
