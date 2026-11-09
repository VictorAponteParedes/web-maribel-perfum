import { WebRoutes } from '@/navigation/routes';
import type { RouteConfig } from '@/navigation/types';
import { HomeScreen } from './screens/HomeScreen';

export const HOME_ROUTES: RouteConfig[] = [
  {
    path: WebRoutes.HOME,
    element: <HomeScreen />,
  },
];

export default HOME_ROUTES;
