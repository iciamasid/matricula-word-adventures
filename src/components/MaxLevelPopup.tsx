
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Bike, Trophy } from 'lucide-react';

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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        className="bg-white rounded-xl p-6 max-w-sm w-full shadow-2xl border-4 border-purple-300"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", duration: 0.5 }}
      >
        <div className="text-center space-y-4">
          {/* Trophy icon */}
          <motion.div
            className="flex justify-center"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Trophy size={64} className="text-yellow-500" />
          </motion.div>
          
          {/* Congratulations text */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-purple-800 kids-text">
              ¡Felicidades!
            </h2>
            <p className="text-lg text-purple-700 kids-text">
              ¡Has completado todos los niveles con coches!
            </p>
            <p className="text-base text-purple-600 kids-text">
              ¡Qué bien, ya puedes viajar en moto!
            </p>
          </div>
          
          {/* Motorcycle icon */}
          <motion.div
            className="flex justify-center"
            animate={{ x: [0, 10, -10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Bike size={48} className="text-teal-600" />
          </motion.div>
          
          {/* Action buttons - removed the "Continue with cars" button */}
          <div className="space-y-3 pt-2">
            <Button
              onClick={onGoToMotorcycle}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white kids-text text-lg py-3"
            >
              <Bike className="w-5 h-5 mr-2" />
              ¡Ir a jugar con motos!
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MaxLevelPopup;
