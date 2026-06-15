import { createBrowserRouter } from 'react-router-dom';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Merchants from './pages/Merchants';
import SidebarLayout from './layout/SidebarLayout';
import NotFound from './not-found';

const router = createBrowserRouter([
  {
    path: '/',
    element: <div>Home</div>,
  },

  {
    path: '/auth',
    element: <Auth />,
  },

  {
    path: '/',
    element: <SidebarLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'merchants', element: <Merchants /> },
    ],
  },

  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
