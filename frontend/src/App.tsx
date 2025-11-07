import { Link, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/context/AuthContext';

function Shell() {
  const { user, logout } = useAuth();
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b p-4 flex items-center justify-between">
        <span className="font-semibold">Employee Work Mode Tracker</span>
        <nav className="flex gap-3 text-sm">
          <Link to="/login">Prijava</Link>
          {user && (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/employees">Zaposleni</Link>
              <button onClick={logout} className="border px-2 py-1 rounded">
                Logout
              </button>
            </>
          )}
        </nav>
      </header>
      <main className="flex-1 p-4">
        <Outlet />
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
