import React, { useState } from 'react';
import { HomeScreen } from './features/home';
import { CheckoutScreen } from './features/checkout';
import { CombosScreen } from './features/combos';
import { CatalogScreen } from './features/catalog';

type ViewMode = 'home' | 'combos' | 'catalog' | 'checkout';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewMode>('home');
  const [catalogInitialCategory, setCatalogInitialCategory] = useState<string>('Todos');

  const handleNavigateToCatalog = (category: string = 'Todos') => {
    setCatalogInitialCategory(category);
    setCurrentView('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToCombos = () => {
    setCurrentView('combos');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToCheckout = () => {
    setCurrentView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (currentView === 'checkout') {
    return <CheckoutScreen onBack={handleBackToHome} />;
  }

  if (currentView === 'combos') {
    return (
      <CombosScreen
        onBack={handleBackToHome}
        onNavigateToCheckout={handleNavigateToCheckout}
        onNavigateToCatalog={() => handleNavigateToCatalog('Todos')}
      />
    );
  }

  if (currentView === 'catalog') {
    return (
      <CatalogScreen
        initialCategory={catalogInitialCategory}
        onBack={handleBackToHome}
        onNavigateToCheckout={handleNavigateToCheckout}
        onNavigateToCombos={handleNavigateToCombos}
      />
    );
  }

  return (
    <HomeScreen
      onNavigateToCheckout={handleNavigateToCheckout}
      onNavigateToCombos={handleNavigateToCombos}
      onNavigateToCatalog={handleNavigateToCatalog}
    />
  );
};

export default App;
