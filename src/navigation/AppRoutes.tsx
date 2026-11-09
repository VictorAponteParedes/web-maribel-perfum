import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { WebLayout } from './WebLayout';
import { WebRoutes } from './routes';
import type { RouteConfig } from './types';
import { HOME_ROUTES } from '@/features/home/routes';
import { COMBOS_ROUTES } from '@/features/combos/routes';
import { CATALOG_ROUTES } from '@/features/catalog/routes';
import { CHECKOUT_ROUTES } from '@/features/checkout/routes';

export const ALL_APP_ROUTES: RouteConfig[] = [
  ...HOME_ROUTES,
  ...COMBOS_ROUTES,
  ...CATALOG_ROUTES,
  ...CHECKOUT_ROUTES,
];

export const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route element={<WebLayout />}>
          {ALL_APP_ROUTES.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
          <Route path="*" element={<Navigate to={WebRoutes.HOME} replace />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
