import React from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { PageTransition } from '@/components/layout/PageTransition';
import { BottomNav } from '@/components/layout/BottomNav';
import { FloatingCartBar } from '@/components/layout/FloatingCartBar';
import { CartDrawer } from '@/features/cart/components/CartDrawer';

export interface WebLayoutProps {
  children?: React.ReactNode;
}

export const WebLayout: React.FC<WebLayoutProps> = ({ children }) => {
  const location = useLocation();

  return (
    <div className="relative min-h-screen flex flex-col">
      <AnimatePresence mode="wait" initial={true}>
        <PageTransition key={location.pathname}>
          {children || <Outlet />}
        </PageTransition>
      </AnimatePresence>

      {/* Componentes persistentes en todas las vistas */}
      <FloatingCartBar />
      <BottomNav />
      <CartDrawer />
    </div>
  );
};

export default WebLayout;
