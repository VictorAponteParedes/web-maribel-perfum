import { WebRoutes } from '@/navigation/routes';
import type { RouteConfig } from '@/navigation/types';
import { CatalogScreen, ProductDetailScreen } from './screens';

export const CATALOG_ROUTES: RouteConfig[] = [
  {
    path: WebRoutes.CATALOG,
    element: <CatalogScreen />,
  },
  {
    path: WebRoutes.PRODUCT_DETAIL,
    element: <ProductDetailScreen />,
  },
];

export default CATALOG_ROUTES;
