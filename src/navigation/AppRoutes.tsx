import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { PageTransition } from '@/components/layout/PageTransition';
import { HomeScreen } from '@/features/home';
import { CombosScreen } from '@/features/combos';
import { CatalogScreen } from '@/features/catalog';
import { CheckoutScreen } from '@/features/checkout';
import { WebRoutes } from './routes';

export const AppRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path={WebRoutes.HOME}
          element={
            <PageTransition key="home">
              <HomeScreen />
            </PageTransition>
          }
        />
        <Route
          path={WebRoutes.COMBOS}
          element={
            <PageTransition key="combos">
              <CombosScreen />
            </PageTransition>
          }
        />
        <Route
          path={WebRoutes.CATALOG}
          element={
            <PageTransition key="catalogo">
              <CatalogScreen />
            </PageTransition>
          }
        />
        <Route
          path={WebRoutes.CHECKOUT}
          element={
            <PageTransition key="checkout">
              <CheckoutScreen />
            </PageTransition>
          }
        />
        <Route path="*" element={<Navigate to={WebRoutes.HOME} replace />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AppRoutes;
