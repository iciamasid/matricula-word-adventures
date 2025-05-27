
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Gift, Star, Sparkles, X } from 'lucide-react';

interface AdRewardPopupProps {
  open: boolean;
  onClose: () => void;
  pointsEarned: number;
  bonusType?: string;
}

const AdRewardPopup: React.FC<AdRewardPopupProps> = ({
  open,
  onClose,
  pointsEarned,
  bonusType = "Anuncio"
}) => {
  if (!open) return null;

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <motion.div
            className="bg-white rounded-xl p-8 max-w-sm w-full shadow-2xl border-4 border-yellow-400"
            initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.5, opacity: 0, rotate: 10 }}
            transition={{ type: "spring", duration: 0.6, bounce: 0.3 }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>

            <div className="text-center space-y-6">
              {/* Celebration animation */}
              <div className="flex justify-center space-x-3">
                <motion.div
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                    scale: { duration: 1, repeat: Infinity }
                  }}
                >
                  <Gift size={48} className="text-yellow-500" />
                </motion.div>
                <motion.div
                  animate={{ 
                    y: [0, -10, 0],
                    opacity: [1, 0.7, 1]
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Star size={40} className="text-yellow-400" />
                </motion.div>
                <motion.div
                  animate={{ 
                    rotate: [0, -360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                    scale: { duration: 1.2, repeat: Infinity }
                  }}
                >
                  <Sparkles size={44} className="text-orange-500" />
                </motion.div>
              </div>
              
              {/* Reward text */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-yellow-600 kids-text">
                  ¡RECOMPENSA GANADA!
                </h2>
                
                <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-6 rounded-lg border-2 border-yellow-300">
                  <motion.div
                    className="text-4xl font-bold text-orange-600 kids-text"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 0.6, repeat: 3 }}
                  >
                    +{pointsEarned} PUNTOS
                  </motion.div>
                  <p className="text-lg text-yellow-700 kids-text font-medium mt-2">
                    ¡Gracias por ver el anuncio!
                  </p>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
                  <p className="text-blue-800 kids-text font-medium">
                    🎯 ¡Úsalos para desbloquear más vehículos!
                  </p>
                </div>
              </div>
              
              {/* Continue button */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={onClose}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-white kids-text text-xl py-4 h-auto"
                  size="lg"
                >
                  ¡Continuar jugando!
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AdRewardPopup;
