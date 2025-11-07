import { useAuth } from '@/context/AuthContext';
import WorkStatusCalendar from '@/components/WorkStatusCalendar';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 space-y-8">
      <header className="rounded-2xl bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 p-6 shadow-sm text-white">
        <h1 className="text-2xl font-semibold tracking-tight">
          Dobrodošao{user?.name ? `, ${user.name}` : ''}
        </h1>
        <p className="mt-1 text-sm opacity-90">Pregled tvog statusa rada i dostupnosti.</p>
      </header>

      <section
        aria-label="Kalendar statusa rada"
        className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/60 backdrop-blur-sm shadow-sm p-4 md:p-6 transition-colors"
      >
        {user?.id && <WorkStatusCalendar userId={user.id} />}
      </section>
      {/* Future widgets area */}
      {/* <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        // Add cards for metrics, quick actions, etc.
      </div> */}
    </div>
  );
}
