
import React from 'react';
import { Progress } from "@/components/ui/progress";

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
        <div className="text-center p-4 bg-purple-100 rounded-lg animate-pulse">
          <p className="font-bold text-purple-800">Inicializando el juego...</p>
          <p className="text-purple-600">Preparando el tablero, por favor espera.</p>
        </div>
      )}
      
      {/* Canvas state indicator */}
      {!canvasReady && !isInitializing && (
        <div className="text-center p-4 bg-red-100 rounded-lg border border-red-300">
          <p className="font-bold text-red-800">No se pudo cargar el juego</p>
          <p className="text-red-600">Por favor, recarga la página e intenta de nuevo.</p>
        </div>
      )}
      
      {/* Active drawing instructions */}
      {isDrawing && canvasReady && (
        <div className="text-center p-4 bg-green-100 rounded-lg border-2 border-green-300 animate-pulse">
          <p className="font-bold text-green-800">¡Modo dibujo activo!</p>
          <p className="text-green-600">Dibuja un camino para el coche directamente en el tablero.</p>
        </div>
      )}
      
      {/* Animation completion message */}
      {animationCompleted && (
        <div className="text-center p-4 bg-yellow-100 rounded-lg border-2 border-yellow-300">
          <p className="font-bold text-yellow-800">¡Felicidades!</p>
          <p className="text-yellow-600">El coche ha llegado a su destino. Puedes dibujar un nuevo camino.</p>
        </div>
      )}
    </>
  );
};

export default GameStatusIndicators;
