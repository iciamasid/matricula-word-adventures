
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Smartphone, Globe } from 'lucide-react';
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
  const [isNativeApp, setIsNativeApp] = useState(false);

  useEffect(() => {
    if (visible) {
      initializeBanner();
    }
  }, [visible]);

  const initializeBanner = async () => {
    try {
      const isNative = adService.isRunningNatively();
      setIsNativeApp(isNative);
      
      const success = await adService.showBanner(position);
      if (success) {
        if (isNative) {
          // En app nativa, el banner real se muestra automáticamente
          setAdContent('📱 Anuncio real de AdMob');
        } else {
          // En web, mostramos contenido simulado
          const kidsFriendlyAds = [
            '🎮 ¡Nuevos juegos educativos disponibles!',
            '📚 Aprende matemáticas de forma divertida',
            '🌟 Descubre aventuras educativas increíbles',
            '🚀 Explora el mundo de la ciencia',
            '🎨 Creatividad sin límites para niños'
          ];
          
          const randomAd = kidsFriendlyAds[Math.floor(Math.random() * kidsFriendlyAds.length)];
          setAdContent(randomAd);
        }
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
    // En app nativa, AdMob maneja los clicks automáticamente
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
          <div className={`${isNativeApp ? 'bg-gradient-to-r from-green-500 to-blue-600' : 'bg-gradient-to-r from-blue-500 to-purple-600'} text-white shadow-lg`}>
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center space-x-3 flex-1">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  {isNativeApp ? (
                    <Smartphone className="w-4 h-4 text-yellow-300" />
                  ) : (
                    <Globe className="w-4 h-4 text-yellow-300" />
                  )}
                </div>
                <button
                  onClick={handleAdClick}
                  className="flex items-center space-x-2 hover:bg-white/10 rounded px-2 py-1 transition-colors"
                >
                  <span className="text-sm font-medium kids-text">{adContent}</span>
                  {!isNativeApp && <ExternalLink className="w-3 h-3" />}
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
              {isNativeApp ? 'Anuncio Real - AdMob' : 'Anuncio Simulado - Web'}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BannerAd;
