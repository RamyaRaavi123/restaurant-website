import { Navigate, Outlet } from 'react-router-dom';
import { isLoggedIn } from '../../api/admin';

export default function ProtectedAdminRoute() {
  if (!isLoggedIn()) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}
