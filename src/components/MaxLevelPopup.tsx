
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Bike, Trophy, Star, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

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
  const [confettiLaunched, setConfettiLaunched] = useState(false);

  // Create confetti effect when popup opens
  useEffect(() => {
    if (open && !confettiLaunched) {
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };
      
      const randomInRange = (min: number, max: number) => {
        return Math.random() * (max - min) + min;
      };
      
      const interval: any = setInterval(() => {
        const timeLeft = animationEnd - Date.now();
        
        if (timeLeft <= 0) {
          return clearInterval(interval);
        }
        
        const particleCount = 50 * (timeLeft / duration);
        
        // Launch particles from both sides
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        });
      }, 250);
      
      setConfettiLaunched(true);
      
      return () => clearInterval(interval);
    }
  }, [open, confettiLaunched]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        className="relative max-w-lg w-full"
        initial={{ scale: 0.5, opacity: 0, y: -100 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.5, opacity: 0, y: -100 }}
        transition={{ type: "spring", duration: 0.6 }}
      >
        {/* Background with gradient and animated elements */}
        <div className="bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 p-8 rounded-2xl border-8 border-yellow-300 shadow-[0_0_50px_rgba(234,179,8,0.7)] relative overflow-hidden">
          {/* Animated background sparkles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  rotate: [0, 180, 360],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: Math.random() * 2
                }}
              >
                <Star className="w-6 h-6 text-yellow-300" />
              </motion.div>
            ))}
          </div>

          <div className="relative z-10 text-center space-y-6">
            {/* Trophy icon with animation */}
            <motion.div
              className="flex justify-center"
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Trophy size={80} className="text-yellow-300 drop-shadow-lg" />
            </motion.div>
            
            {/* Congratulations text */}
            <div className="space-y-3">
              <motion.h2 
                className="text-4xl font-bold text-white kids-text drop-shadow-lg"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ¡Felicidades!
              </motion.h2>
              <p className="text-2xl text-yellow-100 kids-text drop-shadow-md">
                ¡Has completado todos los niveles con coches!
              </p>
              <div className="flex items-center justify-center gap-2">
                <Sparkles className="w-6 h-6 text-yellow-300" />
                <p className="text-xl text-white kids-text">
                  ¡Qué bien, ya puedes viajar en moto!
                </p>
                <Sparkles className="w-6 h-6 text-yellow-300" />
              </div>
            </div>
            
            {/* Motorcycle icon with movement animation */}
            <motion.div
              className="flex justify-center py-4"
              animate={{ 
                x: [0, 20, -20, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Bike size={64} className="text-teal-400 drop-shadow-lg" />
            </motion.div>
            
            {/* Action buttons */}
            <div className="space-y-4 pt-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={onGoToMotorcycle}
                  className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white kids-text text-xl py-4 shadow-lg border-2 border-teal-300"
                >
                  <Bike className="w-6 h-6 mr-3" />
                  ¡Ir a jugar con motos!
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={onClose}
                  variant="outline"
                  className="w-full bg-white/90 border-3 border-yellow-300 text-orange-600 hover:bg-yellow-50 kids-text text-lg py-3 shadow-lg"
                >
                  Continuar con coches
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MaxLevelPopup;
