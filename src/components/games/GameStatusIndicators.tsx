
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { Trophy, AlertCircle, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from '@/context/LanguageContext';

interface GameStatusIndicatorsProps {
  isInitializing: boolean;
  canvasReady: boolean;
  isDrawing: boolean;
  isPlaying: boolean;
  animationProgress: number;
  interpolatedPathLength: number;
  animationCompleted: boolean;
}

const GameStatusIndicators: React.FC<GameStatusIndicatorsProps> = ({
  isInitializing,
  canvasReady,
  isDrawing,
  isPlaying,
  animationProgress,
  interpolatedPathLength,
  animationCompleted
}) => {
  const { isEnglish, t } = useLanguage();
  
  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4">
      {/* Loading indicator */}
      {isInitializing && (
        <motion.div 
          className="text-center p-3 bg-purple-100 rounded-lg shadow-md animate-pulse mb-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="flex items-center justify-center gap-2">
            <div className="w-8 h-8 border-4 border-purple-800 border-t-transparent rounded-full animate-spin"></div>
            <p className="font-bold text-purple-800 kids-text text-xl">
              {isEnglish ? "Loading..." : "Cargando..."}
            </p>
          </div>
        </motion.div>
      )}
      
      {/* Canvas state indicator */}
      {!canvasReady && !isInitializing && (
        <div className="text-center p-3 bg-red-100 rounded-lg border-2 border-red-300 shadow-md mb-4">
          <div className="flex items-center justify-center gap-2">
            <AlertCircle className="w-7 h-7 text-red-600" />
            <p className="font-bold text-red-600 kids-text text-lg">
              {isEnglish ? "Oops! The game couldn't load 🙁" : "¡Ups! No se pudo cargar el juego 🙁"}
            </p>
          </div>
        </div>
      )}
      
      {/* Active drawing instructions */}
      {isDrawing && canvasReady && (
        <motion.div 
          className="text-center p-3 bg-green-100 rounded-lg border-2 border-green-300 shadow-md mb-4"
          animate={{ 
            scale: [1, 1.03, 1],
            transition: { repeat: Infinity, duration: 1.5 }
          }}
        >
          <div className="flex items-center justify-center gap-2">
            <span role="img" aria-label="pencil" className="text-2xl">✏️</span>
            <p className="font-bold text-green-700 kids-text text-xl">
              {isEnglish ? "Draw a path for the car!" : "¡Dibuja un camino para el coche!"}
            </p>
          </div>
        </motion.div>
      )}
      
      {/* Animation completion message */}
      {animationCompleted && (
        <motion.div 
          className="text-center p-3 bg-yellow-100 rounded-lg border-2 border-yellow-300 shadow-md mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <div className="flex items-center justify-center gap-2">
            <motion.div
              animate={{
                rotate: [0, 360],
                transition: { repeat: Infinity, duration: 8, ease: "linear" }
              }}
              className="inline-block"
            >
              <Globe className="w-7 h-7 text-blue-600" />
            </motion.div>
            <p className="font-bold text-yellow-700 kids-text text-xl">
              {isEnglish ? "You've reached the destination! 🎉" : "¡Has llegado a la meta! 🎉"}
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default GameStatusIndicators;
