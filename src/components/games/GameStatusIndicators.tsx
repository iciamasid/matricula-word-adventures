
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { Trophy, AlertCircle, Globe } from "lucide-react";
import { motion } from "framer-motion";

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
              {"Cargando..."}
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
              {"¡Ups! No se pudo cargar el juego 🙁"}
            </p>
          </div>
        </div>
      )}
      
      {/* Animation completion message - Using floating notification instead of banner */}
      {animationCompleted && (
        <motion.div 
          className="text-center p-4 bg-yellow-100 rounded-lg border-2 border-yellow-300 shadow-md mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0, scale: [1, 1.05, 1] }}
          transition={{ type: "spring", stiffness: 400, damping: 10, scale: { repeat: Infinity, duration: 2 } }}
        >
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="flex items-center gap-3">
              <Trophy className="w-7 h-7 text-yellow-600" />
              <p className="font-bold text-yellow-700 kids-text text-2xl">
                {"¡Has llegado a la meta! 🎉"}
              </p>
              <Trophy className="w-7 h-7 text-yellow-600" />
            </div>
            <button 
              className="mt-2 bg-purple-600 text-white kids-text py-2 px-4 rounded-md hover:bg-purple-700"
              onClick={() => window.history.back()}
            >
              Volver al juego
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default GameStatusIndicators;
