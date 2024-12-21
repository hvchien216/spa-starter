import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';

import { locations } from './locations';
import { PublicLayout } from '~/layouts';
import { sessionClientStorage } from '~/utils';

const LoginPage = lazy(() => import('~/pages/login'));

type MainRoutes = (isAuthenticated: boolean) => RouteObject[];

const PUBLIC_ROUTES: MainRoutes = (isAuthenticated) => {
  const prevPath = JSON.parse(sessionClientStorage.get('redirectTo') as string);

  const layoutControl = () => {
    return !isAuthenticated ? <PublicLayout /> : <Navigate to={prevPath ?? locations.dashboard} replace={!!prevPath} />;
  };

  return [
    {
      path: locations.root,
      element: layoutControl(),
      children: [
        {
          path: '',
          element: <LoginPage />,
        },
      ],
    },
  ];
};

export default PUBLIC_ROUTES;
