import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StoreLocationModalProps } from './types';
import { useStoreLeafletMap } from './useStoreLeafletMap';
import { StoreLocationHeader } from './StoreLocationHeader';
import { StoreLocationMapViewer } from './StoreLocationMapViewer';
import { StoreLocationFooter } from './StoreLocationFooter';

export const StoreLocationModal: React.FC<StoreLocationModalProps> = ({
  isOpen,
  onClose,
  settings,
}) => {
  const { mapContainerRef, lat, lng, loadError, googleMapsUrl } =
    useStoreLeafletMap(isOpen, settings);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop con desenfoque suave */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-stone-950/70 backdrop-blur-xs"
            onClick={onClose}
          />

          {/* Tarjeta del Modal con animación fluida */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full border border-stone-200 overflow-hidden z-10 flex flex-col"
          >
            <StoreLocationHeader settings={settings} onClose={onClose} />

            <StoreLocationMapViewer
              mapContainerRef={mapContainerRef}
              loadError={loadError}
              lat={lat}
              lng={lng}
              googleMapsUrl={googleMapsUrl}
            />

            <StoreLocationFooter
              settings={settings}
              googleMapsUrl={googleMapsUrl}
            />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default StoreLocationModal;
export * from './types';
