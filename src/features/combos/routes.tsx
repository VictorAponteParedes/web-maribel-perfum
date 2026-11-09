import { WebRoutes } from '@/navigation/routes';
import type { RouteConfig } from '@/navigation/types';
import { CombosScreen, ComboDetailScreen } from './screens';

export const COMBOS_ROUTES: RouteConfig[] = [
  {
    path: WebRoutes.COMBOS,
    element: <CombosScreen />,
  },
  {
    path: WebRoutes.COMBO_DETAIL,
    element: <ComboDetailScreen />,
  },
];

export default COMBOS_ROUTES;
