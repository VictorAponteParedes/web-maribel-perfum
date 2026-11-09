import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from '../navigation/AppRoutes';
import { useWebSettingsStore } from '@/features/web-settings';

export const App: React.FC = () => {
  const fetchWebSettings = useWebSettingsStore((state) => state.fetchWebSettings);

  useEffect(() => {
    fetchWebSettings();
  }, [fetchWebSettings]);

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
