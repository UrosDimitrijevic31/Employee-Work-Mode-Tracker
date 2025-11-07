import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import CalendarPage from './pages/Calendar';
import ProtectedRoute from './routes/ProtectedRoute';
import './styles/globals.css';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Login /> },
      { path: 'login', element: <Login /> },
      { path: 'dashboard', element: (
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      ) },
      { path: 'employees', element: (
        <ProtectedRoute>
          <Employees />
        </ProtectedRoute>
      ) }
      ,
      { path: 'calendar', element: (
        <ProtectedRoute>
          <CalendarPage />
        </ProtectedRoute>
      ) }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
