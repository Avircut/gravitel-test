import { useReactiveVar } from '@apollo/client';
import { isAuthVar } from 'entities/User';
import { Navigate, useLocation } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';

export function RequireAnon({ children }: { children: JSX.Element }) {
  const location = useLocation();
  const isAuth = useReactiveVar(isAuthVar);

  if (isAuth) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to={RoutePath.dashboard} state={{ from: location }} replace />;
  }

  return children;
}
