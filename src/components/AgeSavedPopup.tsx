
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Check, Calendar } from 'lucide-react';

interface AgeSavedPopupProps {
  open: boolean;
  onClose: () => void;
  age: number;
}

const AgeSavedPopup: React.FC<AgeSavedPopupProps> = ({ 
  open, 
  onClose, 
  age 
}) => {
  // Detect current game type for theming
  const isMotorcycleGame = window.location.pathname.includes('motorcycle');
  
  const bgGradient = isMotorcycleGame 
    ? "bg-gradient-to-br from-teal-400 to-teal-600" 
    : "bg-gradient-to-br from-purple-400 to-purple-600";

  const getAgeMessage = () => {
    if (age >= 3 && age <= 6) {
      return "¡Eres muy pequeñito! Me encanta jugar contigo.";
    } else if (age >= 7 && age <= 10) {
      return "¡Qué edad tan divertida! Vamos a pasarlo genial.";
    } else if (age >= 11 && age <= 15) {
      return "¡Ya eres mayor! Seguro que eres muy inteligente.";
    } else {
      return "¡Perfecto! Ya tienes tu edad guardada.";
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
              <div className="bg-white/20 rounded-full p-4 mb-4">
                <Calendar className="w-12 h-12 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-white kids-text mb-2">
                ¡{age} años!
              </h3>
              
              <p className="text-white/90 kids-text text-lg mb-6">
                {getAgeMessage()}
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

export default AgeSavedPopup;
