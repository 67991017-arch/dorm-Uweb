import { createBrowserRouter } from 'react-router';
import { LoginPage } from './pages/LoginPage';
import { DashboardLayout } from './pages/DashboardLayout';
import { MainDashboard } from './pages/MainDashboard';
import { MaintenancePage } from './pages/MaintenancePage';
import { FilesPage } from './pages/FilesPage';
import { MessagesPage } from './pages/MessagesPage';
import { RootRedirect } from './pages/RootRedirect';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootRedirect />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      { index: true, element: <MainDashboard /> },
      { path: 'maintenance', element: <MaintenancePage /> },
      { path: 'files', element: <FilesPage /> },
      { path: 'messages', element: <MessagesPage /> },
    ],
  },
]);
