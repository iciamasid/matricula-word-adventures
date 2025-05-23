
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Trophy, RotateCcw } from 'lucide-react';

interface MotorcycleGameOverPopupProps {
  open: boolean;
  onClose: () => void;
  onStartNewGame: () => void;
}

const MotorcycleGameOverPopup: React.FC<MotorcycleGameOverPopupProps> = ({ 
  open, 
  onClose, 
  onStartNewGame 
}) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Popup Content */}
          <motion.div
            className="relative bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 text-center"
            initial={{ scale: 0.8, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
          >
            {/* Celebration Effect */}
            <motion.div
              className="absolute -top-4 left-1/2 transform -translate-x-1/2"
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity
              }}
            >
              <Trophy className="w-16 h-16 text-teal-500" />
            </motion.div>

            <div className="mt-8 mb-6">
              <h2 className="text-3xl font-bold text-teal-800 kids-text mb-3">
                ¡Game Over!
              </h2>
              <p className="text-lg text-teal-700 kids-text mb-4">
                ¡Has completado el tour mundial con motos!
              </p>
              <p className="text-md text-teal-600 kids-text">
                Has llegado al final del juego. ¡Felicidades por tu aventura!
              </p>
            </div>

            <div className="space-y-3">
              <Button
                onClick={onStartNewGame}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 text-lg kids-text"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                Iniciar nueva partida
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MotorcycleGameOverPopup;
