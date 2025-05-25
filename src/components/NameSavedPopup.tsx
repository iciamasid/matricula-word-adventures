
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

interface NameSavedPopupProps {
  open: boolean;
  onClose: () => void;
  playerName: string;
  gender: 'boy' | 'girl';
}

const NameSavedPopup: React.FC<NameSavedPopupProps> = ({ 
  open, 
  onClose, 
  playerName, 
  gender 
}) => {
  // Detect current game type for theming
  const isMotorcycleGame = window.location.pathname.includes('motorcycle');
  
  const bgColor = isMotorcycleGame ? "bg-teal-500" : "bg-purple-500";
  const bgGradient = isMotorcycleGame 
    ? "bg-gradient-to-br from-teal-400 to-teal-600" 
    : "bg-gradient-to-br from-purple-400 to-purple-600";

  const getGenderIcon = () => {
    if (gender === 'girl') {
      return (
        <svg className="w-12 h-12 text-white mb-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm-1.5 7h3c1.1 0 2 .9 2 2v5c0 1.1-.9 2-2 2h-.5v4c0 .55-.45 1-1 1s-1-.45-1-1v-4h-.5c-1.1 0-2-.9-2-2v-5c0-1.1.9-2 2-2z"/>
          <circle cx="7" cy="7" r="2" fill="currentColor" opacity="0.7"/>
          <circle cx="17" cy="7" r="2" fill="currentColor" opacity="0.7"/>
          <path d="M8 4c.5-.5 1-1 1.5-1s1 .5 1.5 1" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.8"/>
          <path d="M14 4c.5-.5 1-1 1.5-1s1 .5 1.5 1" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.8"/>
        </svg>
      );
    } else {
      return (
        <svg className="w-12 h-12 text-white mb-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm-1.5 7h3c1.1 0 2 .9 2 2v5c0 1.1-.9 2-2 2h-.5v4c0 .55-.45 1-1 1s-1-.45-1-1v-4h-.5c-1.1 0-2-.9-2-2v-5c0-1.1.9-2 2-2z"/>
          <rect x="9.5" y="16" width="1.5" height="6" fill="currentColor"/>
          <rect x="13" y="16" width="1.5" height="6" fill="currentColor"/>
          <path d="M9 5h6" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.8"/>
        </svg>
      );
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className={`${bgGradient} rounded-2xl p-8 text-center shadow-2xl max-w-sm w-full`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col items-center">
              {getGenderIcon()}
              
              <h3 className="text-2xl font-bold text-white kids-text mb-2">
                ¡Perfecto, {playerName}!
              </h3>
              
              <p className="text-white/90 kids-text text-lg mb-6">
                He guardado tu nombre para que no se olvide. ¡Ahora puedes jugar!
              </p>
              
              <Button
                onClick={onClose}
                className="bg-white/20 hover:bg-white/30 text-white border-white/30 kids-text text-lg px-8 py-3"
                variant="outline"
              >
                <Check className="w-5 h-5 mr-2" />
                ¡Genial!
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NameSavedPopup;
