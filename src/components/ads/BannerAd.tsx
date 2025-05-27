
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';
import { adService } from '@/services/AdService';

interface BannerAdProps {
  position?: 'top' | 'bottom';
  visible?: boolean;
  onClose?: () => void;
  className?: string;
}

const BannerAd: React.FC<BannerAdProps> = ({
  position = 'bottom',
  visible = true,
  onClose,
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [adContent, setAdContent] = useState<string>('');

  useEffect(() => {
    if (visible) {
      initializeBanner();
    }
  }, [visible]);

  const initializeBanner = async () => {
    try {
      const success = await adService.showBanner(position);
      if (success) {
        // Simular contenido de anuncio apropiado para niños
        const kidsFriendlyAds = [
          '🎮 ¡Nuevos juegos educativos disponibles!',
          '📚 Aprende matemáticas de forma divertida',
          '🌟 Descubre aventuras educativas increíbles',
          '🚀 Explora el mundo de la ciencia',
          '🎨 Creatividad sin límites para niños'
        ];
        
        const randomAd = kidsFriendlyAds[Math.floor(Math.random() * kidsFriendlyAds.length)];
        setAdContent(randomAd);
        setIsVisible(true);
      }
    } catch (error) {
      console.error('BannerAd: Failed to initialize banner:', error);
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    adService.hideBanner();
    onClose?.();
  };

  const handleAdClick = () => {
    console.log('BannerAd: Ad clicked');
    // En producción, aquí se manejaría el click del anuncio
  };

  if (!visible || !isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`fixed ${position === 'top' ? 'top-0' : 'bottom-0'} left-0 right-0 z-40 ${className}`}
          initial={{ y: position === 'top' ? -100 : 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: position === 'top' ? -100 : 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg">
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center space-x-3 flex-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <button
                  onClick={handleAdClick}
                  className="flex items-center space-x-2 hover:bg-white/10 rounded px-2 py-1 transition-colors"
                >
                  <span className="text-sm font-medium kids-text">{adContent}</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
              
              {onClose && (
                <button
                  onClick={handleClose}
                  className="p-1 hover:bg-white/20 rounded-full transition-colors"
                  aria-label="Cerrar anuncio"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            
            {/* Indicador de anuncio */}
            <div className="text-xs text-center text-white/70 pb-1">
              Anuncio
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BannerAd;
