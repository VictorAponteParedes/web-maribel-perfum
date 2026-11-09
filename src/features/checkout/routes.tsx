import { WebRoutes } from '@/navigation/routes';
import type { RouteConfig } from '@/navigation/types';
import { CheckoutScreen } from './screens';

export const CHECKOUT_ROUTES: RouteConfig[] = [
  {
    path: WebRoutes.CHECKOUT,
    element: <CheckoutScreen />,
  },
];

export default CHECKOUT_ROUTES;
