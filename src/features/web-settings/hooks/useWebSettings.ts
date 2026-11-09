import { useEffect } from 'react';
import { useWebSettingsStore } from '../store/useWebSettingsStore';

export const useWebSettings = () => {
  const settings = useWebSettingsStore((state) => state.settings);
  const campaigns = useWebSettingsStore((state) => state.campaigns);
  const isLoading = useWebSettingsStore((state) => state.isLoading);
  const error = useWebSettingsStore((state) => state.error);
  const fetchWebSettings = useWebSettingsStore(
    (state) => state.fetchWebSettings
  );
  const getCleanWhatsAppNumber = useWebSettingsStore(
    (state) => state.getCleanWhatsAppNumber
  );

  useEffect(() => {
    fetchWebSettings();
  }, [fetchWebSettings]);

  return {
    settings,
    campaigns,
    isLoading,
    error,
    whatsappNumberClean: getCleanWhatsAppNumber(),
    refetch: () => fetchWebSettings(true),
  };
};
