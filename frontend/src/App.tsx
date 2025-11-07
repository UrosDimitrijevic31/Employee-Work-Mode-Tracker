import { Link, Outlet, NavLink } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/context/AuthContext';

function Shell() {
  const { user, logout } = useAuth();
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <header className="sticky top-0 z-40 border-b border-gray-200/70 dark:border-gray-800/70 bg-white/70 dark:bg-gray-900/60 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <Link
            to="/"
            className="font-semibold text-lg tracking-tight bg-gradient-to-r from-indigo-600 to-fuchsia-600 bg-clip-text text-transparent"
          >
            Employee Work Mode Tracker
          </Link>
          <nav className="flex items-center gap-1 text-sm">
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg font-medium transition-colors ${
                  isActive
                    ? 'text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/40'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800'
                }`
              }
            >
              Prijava
            </NavLink>
            {user && (
              <>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-lg font-medium transition-colors ${
                      isActive
                        ? 'text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/40'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800'
                    }`
                  }
                >
                  Dashboard
                </NavLink>
                <NavLink
                  to="/employees"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-lg font-medium transition-colors ${
                      isActive
                        ? 'text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/40'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800'
                    }`
                  }
                >
                  Zaposleni
                </NavLink>
                <button
                  onClick={logout}
                  className="ml-2 inline-flex items-center rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Logout
                </button>
              </>
            )}
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Shell />
    </AuthProvider>
  );
}

export default App;
