import { Navigate, Outlet } from 'react-router-dom';
import { useIsLoggedIn } from '~/hooks/user';

export function ProtectedRoute() {
  const isLoggedIn = useIsLoggedIn();

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}
