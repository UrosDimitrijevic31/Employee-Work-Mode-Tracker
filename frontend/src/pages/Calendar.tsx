import React from 'react';
import WorkStatusCalendar from '@/components/WorkStatusCalendar';
import { useAuth } from '@/context/AuthContext';

export default function CalendarPage() {
  const { user } = useAuth();

  if (user?.role !== 'manager') {
    return (
      <div className="mx-auto max-w-md px-4 py-10">
        <div className="rounded-xl border border-dashed border-gray-300 bg-white/90 backdrop-blur-sm p-6 text-center shadow-sm dark:border-gray-700 dark:bg-gray-900/70">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Only managers can view the team calendar.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-6">
      <header className="rounded-2xl bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 p-6 shadow-sm text-white">
        <h1 className="text-2xl font-semibold tracking-tight">Team Calendar</h1>
        <p className="mt-1 text-sm opacity-90">Overview of team work modes and availability.</p>
      </header>
      <section
        className="rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-sm shadow-sm dark:border-gray-800 dark:bg-gray-900/60 transition-colors"
        aria-label="Work status calendar container"
      >
        <WorkStatusCalendar userId={user.id} />
      </section>
    </div>
  );
}
