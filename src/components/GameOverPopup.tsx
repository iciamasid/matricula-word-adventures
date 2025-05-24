
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Car, Trophy, Star, RefreshCw } from 'lucide-react';

interface GameOverPopupProps {
  open: boolean;
  onRestart: () => void;
}

const GameOverPopup: React.FC<GameOverPopupProps> = ({
  open,
  onRestart
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <motion.div
        className="bg-white rounded-xl p-8 max-w-lg w-full shadow-2xl border-4 border-green-400"
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
              <Trophy size={48} className="text-green-500" />
            </motion.div>
            <motion.div
              animate={{ rotate: [0, -15, 15, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 2.2, repeat: Infinity }}
            >
              <Star size={40} className="text-green-400" />
            </motion.div>
            <motion.div
              animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.3, 1] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            >
              <Trophy size={48} className="text-green-600" />
            </motion.div>
          </div>
          
          {/* Main game over text */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-green-800 kids-text">
              ¡GAME OVER!
            </h2>
            <div className="space-y-3">
              <p className="text-xl text-green-700 kids-text font-semibold">
                ¡Has completado todos los niveles del juego!
              </p>
              <div className="bg-gradient-to-r from-blue-100 to-blue-50 p-4 rounded-lg border-2 border-blue-300">
                <p className="text-lg text-blue-800 kids-text font-medium">
                  Se ha acabado el juego. ¡Enhorabuena por tu increíble aventura!
                </p>
              </div>
            </div>
          </div>
          
          {/* Car animation */}
          <motion.div
            className="flex justify-center py-4"
            animate={{ x: [0, 20, -20, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="bg-blue-100 rounded-full p-4">
              <Car size={64} className="text-blue-600" />
            </div>
          </motion.div>
          
          {/* Restart button - SHORTENED BUTTON TEXT */}
          <div className="pt-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={onRestart}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white kids-text text-xl py-4 h-auto"
                size="lg"
              >
                <RefreshCw className="w-6 h-6 mr-3" />
                Iniciar nueva partida
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default GameOverPopup;
