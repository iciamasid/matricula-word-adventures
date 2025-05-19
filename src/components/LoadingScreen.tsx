
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { useGame } from "@/context/GameContext";

interface LoadingScreenProps {
  onLoadComplete: () => void;
  loadingTime?: number; // Time in milliseconds
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  onLoadComplete, 
  loadingTime = 2000 
}) => {
  const [progress, setProgress] = useState(0);
  const { level } = useGame();
  
  // Simulate loading progress
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onLoadComplete(), 200); // Small delay after 100%
          return 100;
        }
        return prev + 5; // Increment by 5% each time
      });
    }, loadingTime / 20); // Update 20 times over the loading period

    return () => clearInterval(interval);
  }, [loadingTime, onLoadComplete]);

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full max-w-md p-6 flex flex-col items-center">
          {/* Game title animated */}
          <motion.div 
            className="mb-8 text-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold text-white kids-text mb-2 text-shadow-lg">
              MATRICULABRA CADABRA
            </h1>
            <div className="flex justify-center">
              <motion.img 
                src="/lovable-uploads/coche_portada.gif" 
                alt="Game logo" 
                className="h-40 object-contain"
                animate={{ 
                  y: [0, -10, 0],
                  rotateZ: [0, 2, -2, 0]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 2 
                }}
              />
            </div>
          </motion.div>
          
          {/* Level indicator */}
          <div className="w-full text-center mb-2">
            <span className="text-white text-xl kids-text">
              Nivel {level}
            </span>
          </div>
          
          {/* Progress bar with animation */}
          <div className="w-full space-y-2">
            <Progress value={progress} className="h-3 bg-white/30">
              <motion.div 
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </Progress>
            <p className="text-center text-white kids-text">
              Cargando... {progress}%
            </p>
          </div>

          {/* Random game tips */}
          <motion.div 
            className="mt-6 bg-white/20 p-3 rounded-lg text-white text-center"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <p className="kids-text text-sm">
              {getTip()}
            </p>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

// Helper function to get random tips
const getTip = () => {
  const tips = [
    "¡Encuentra matrículas con tu edad para conseguir bonus!",
    "¡Completa todos los niveles para dar la vuelta al mundo!",
    "¡Cada matrícula correcta te da puntos para avanzar!",
    "¡Mira con atención las letras de las matrículas!",
    "¡La matrícula 6666 contiene un bonus especial!",
    "¡Puedes cambiar el color de tu coche!"
  ];
  
  return tips[Math.floor(Math.random() * tips.length)];
};

export default LoadingScreen;
