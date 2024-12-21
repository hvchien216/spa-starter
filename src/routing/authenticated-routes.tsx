import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';

import Loader from './lazy-loader';
import { AuthLayout } from '~/layouts';
import { locations } from './locations';

// ==============================|| IMPORT PAGES ||============================== //

const DashboardPage = Loader(lazy(() => import('~/pages/dashboard')));
const DashboardOverviewPage = Loader(lazy(() => import('~/pages/dashboard/_components/overview')));
const DashboardBreakDownPage = Loader(lazy(() => import('~/pages/dashboard/_components/breakdown')));
const SubstationsListPage = Loader(lazy(() => import('~/pages/substations/substations-list')));
const ReportsPage = Loader(lazy(() => import('~/pages/reports')));

type MainRoutes = (isAuthenticated: boolean) => RouteObject[];

const AUTHENTICATED_ROUTES: MainRoutes = (isAuthenticated) => {
  const layoutControl = () => (isAuthenticated ? <AuthLayout /> : <Navigate to='/' />);

  return [
    {
      path: locations.callback, // used for AD login callback route
      element: <p>Loading...</p>,
    },
    {
      path: locations.root,
      element: layoutControl(),
      children: [
        {
          path: locations.dashboard,
          element: <DashboardPage />,
          children: [
            {
              index: true, // Automatically matches the root path of this parent
              element: <Navigate to={locations.dashboardOverview} replace />,
            },
            {
              path: locations.dashboardOverview,
              element: <DashboardOverviewPage />,
            },
            {
              path: locations.dashboardBreakdown,
              element: <DashboardBreakDownPage />,
            },
          ],
        },
        {
          path: locations.substations,
          element: <SubstationsListPage />,
        },
        {
          path: locations.reports,
          element: <ReportsPage />,
        },
      ],
    },
    {
      path: '*',
      element: <Navigate to='/' />,
    },
  ];
};

export default AUTHENTICATED_ROUTES;
