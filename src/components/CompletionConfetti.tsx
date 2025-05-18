import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from '@/hooks/use-toast';
import confetti from 'canvas-confetti';

interface CompletionConfettiProps {
  onClose: () => void;
}

const CompletionConfetti: React.FC<CompletionConfettiProps> = ({ onClose }) => {
  useEffect(() => {
    // Fire confetti when the component mounts
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    
    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };
    
    const launchConfetti = () => {
      const timeLeft = animationEnd - Date.now();
      const particleCount = 50 * (timeLeft / duration);
      
      // Launch a few confetti from the left edge
      confetti({
        particleCount: Math.floor(randomInRange(10, 30)),
        angle: randomInRange(60, 120),
        spread: randomInRange(50, 70),
        origin: { x: 0, y: 0.5 },
        colors: ['#ffcc00', '#ff44aa', '#9c27b0', '#42a5f5', '#8bc34a']
      });
      
      // Launch a few confetti from the right edge
      confetti({
        particleCount: Math.floor(randomInRange(10, 30)),
        angle: randomInRange(60, 120),
        spread: randomInRange(50, 70),
        origin: { x: 1, y: 0.5 },
        colors: ['#ffcc00', '#ff44aa', '#9c27b0', '#42a5f5', '#8bc34a']
      });
      
      // Keep launching while time is left
      if (timeLeft > 0) {
        requestAnimationFrame(launchConfetti);
      }
    };
    
    launchConfetti();
    
    // Show celebratory toast message
    toast({
      title: "¡Felicidades!",
      description: "¡Has completado la vuelta al mundo! El juego vuelve a empezar desde el nivel 1.",
      duration: 5000
    });
    
    // Close after the duration
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/20 pointer-events-none">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-gradient-to-r from-yellow-300 to-amber-400 rounded-xl p-8 max-w-md w-11/12 shadow-2xl border-4 border-yellow-500 text-center"
      >
        <motion.div
          animate={{ 
            y: [0, -10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity
          }}
          className="text-6xl mb-4"
        >
          🏆
        </motion.div>
        
        <h2 className="text-3xl font-bold kids-text text-amber-900 mb-4">
          ¡Nivel 10 completado!
        </h2>
        
        <p className="text-xl text-amber-800 mb-6 kids-text">
          ¡Felicidades! ¡Has completado la vuelta al mundo!
        </p>
        
        <p className="text-amber-700 kids-text">
          El juego volverá a empezar en el nivel 1. ¡Sigue jugando para superar tu récord!
        </p>
      </motion.div>
    </div>
  );
};

export default CompletionConfetti;
