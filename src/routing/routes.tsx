import { useRoutes } from 'react-router-dom';
import AUTHENTICATED_ROUTES from './authenticated-routes';
import PUBLIC_ROUTES from './public-routes';

// routes

// ==============================|| ROUTING RENDER ||============================== //
interface RoutesProps {
  isAuthenticated: boolean;
}
const AppRoutes: React.FC<RoutesProps> = ({ isAuthenticated }) => {
  return useRoutes([...PUBLIC_ROUTES(isAuthenticated), ...AUTHENTICATED_ROUTES(isAuthenticated)]);
};

export default AppRoutes;
