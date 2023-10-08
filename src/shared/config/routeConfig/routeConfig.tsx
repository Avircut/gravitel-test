import AuthPage from 'pages/AuthPage/ui/AuthPage/AuthPage';
import { DashboardPage } from 'pages/DashboardPage';
import { NotFoundPage } from 'pages/NotFoundPage';
import { RouteProps } from 'react-router-dom';

export type AppRoutesProps = RouteProps & {
  restriction?: 'auth' | 'anon';
}

export enum AppRoutes {
  DASHBOARD = 'dashboard',
  LOGIN = 'login',
  NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.DASHBOARD]: '/dashboard',
  [AppRoutes.LOGIN]: '/login',
  [AppRoutes.NOT_FOUND]: '*',
};

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
  [AppRoutes.DASHBOARD]: {
    path: RoutePath.dashboard,
    element: <DashboardPage />,
    restriction: 'auth',
  },
  [AppRoutes.LOGIN]: {
    path: RoutePath.login,
    element: <AuthPage />,
    restriction: 'anon',
  },
  [AppRoutes.NOT_FOUND]: {
    path: RoutePath.not_found,
    element: <DashboardPage />,
    restriction: 'auth',
  },
};
