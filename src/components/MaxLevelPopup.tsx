
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Bike, Trophy, Star } from 'lucide-react';

interface MaxLevelPopupProps {
  open: boolean;
  onClose: () => void;
  onGoToMotorcycle: () => void;
}

const MaxLevelPopup: React.FC<MaxLevelPopupProps> = ({
  open,
  onClose,
  onGoToMotorcycle
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <motion.div
        className="bg-white rounded-xl p-8 max-w-lg w-full shadow-2xl border-4 border-yellow-400"
        initial={{ scale: 0.5, opacity: 0, y: -50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", duration: 0.6, bounce: 0.3 }}
      >
        <div className="text-center space-y-6">
          {/* Celebration elements */}
          <div className="flex justify-center space-x-4">
            <motion.div
              animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Trophy size={48} className="text-yellow-500" />
            </motion.div>
            <motion.div
              animate={{ rotate: [0, -15, 15, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 2.2, repeat: Infinity }}
            >
              <Star size={40} className="text-yellow-400" />
            </motion.div>
            <motion.div
              animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.3, 1] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            >
              <Trophy size={48} className="text-yellow-600" />
            </motion.div>
          </div>
          
          {/* Main congratulations text - ENHORABUENA word removed */}
          <div className="space-y-4">
            <div className="space-y-3">
              <p className="text-xl text-purple-700 kids-text font-semibold">
                ¡Has completado todos los niveles con coches!
              </p>
              <div className="bg-gradient-to-r from-teal-100 to-teal-50 p-4 rounded-lg border-2 border-teal-300">
                <p className="text-lg text-teal-800 kids-text font-medium">
                  Puedes pasar a la siguiente pantalla en la que conducirás motos
                </p>
              </div>
            </div>
          </div>
          
          {/* Motorcycle animation */}
          <motion.div
            className="flex justify-center py-4"
            animate={{ x: [0, 20, -20, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="bg-teal-100 rounded-full p-4">
              <Bike size={64} className="text-teal-600" />
            </div>
          </motion.div>
          
          {/* Single action button */}
          <div className="pt-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={onGoToMotorcycle}
                className="w-full bg-teal-600 hover:bg-teal-700 text-white kids-text text-xl py-4 h-auto"
                size="lg"
              >
                <Bike className="w-6 h-6 mr-3" />
                ¡Ir al juego de motos!
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MaxLevelPopup;
