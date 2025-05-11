
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { AlertCircle, Loader2, Pencil, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

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
    <>
      {/* Loading indicator */}
      {isInitializing && (
        <motion.div 
          className="text-center p-3 bg-purple-100 rounded-lg border-2 border-purple-300 flex items-center justify-center gap-3"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <Loader2 className="h-5 w-5 text-purple-600 animate-spin" />
          <p className="font-bold text-purple-800 kids-text">Preparando el juego...</p>
        </motion.div>
      )}
      
      {/* Canvas state indicator */}
      {!canvasReady && !isInitializing && (
        <div className="text-center p-3 bg-red-100 rounded-lg border border-red-300 flex items-center justify-center gap-3">
          <AlertCircle className="h-5 w-5 text-red-600" />
          <p className="font-bold text-red-800 kids-text">¡Ups! Algo falló. Recarga la página.</p>
        </div>
      )}
      
      {/* Active drawing instructions */}
      {isDrawing && canvasReady && (
        <motion.div 
          className="text-center p-3 bg-green-100 rounded-lg border-2 border-green-300 flex items-center justify-center gap-3"
          animate={{ 
            backgroundColor: ["rgb(220,252,231)", "rgb(187,247,208)", "rgb(220,252,231)"],
            borderColor: ["rgb(134,239,172)", "rgb(74,222,128)", "rgb(134,239,172)"]
          }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <Pencil className="h-5 w-5 text-green-600" />
          <p className="font-bold text-green-800 kids-text">¡Dibuja ahora tu camino!</p>
        </motion.div>
      )}
      
      {/* Animation completion message */}
      {animationCompleted && (
        <motion.div 
          className="text-center p-3 bg-yellow-100 rounded-lg border-2 border-yellow-300 flex items-center justify-center gap-3"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0, scale: [1, 1.05, 1] }}
          transition={{ duration: 0.5, scale: { repeat: 2 } }}
        >
          <CheckCircle className="h-5 w-5 text-yellow-600" />
          <p className="font-bold text-yellow-800 kids-text">¡Genial! El coche ha llegado. Puedes dibujar otro camino.</p>
        </motion.div>
      )}
    </>
  );
};

export default GameStatusIndicators;
