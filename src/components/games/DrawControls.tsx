
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Trash2, Route } from 'lucide-react';

interface DrawControlsProps {
  isPlaying: boolean;
  isDrawing: boolean;
  pathExists: boolean;
  canvasReady: boolean;
  isInitializing: boolean;
  onDraw: () => void;
  onPlay: () => void;
  onClear: () => void;
}

const DrawControls: React.FC<DrawControlsProps> = ({
  isPlaying,
  isDrawing,
  pathExists,
  canvasReady,
  isInitializing,
  onDraw,
  onPlay,
  onClear
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4">
      <Button 
        onClick={onDraw} 
        variant="outline" 
        disabled={isPlaying || isDrawing || !canvasReady || isInitializing} 
        className={`bg-green-400 hover:bg-green-300 text-black rounded-xl font-medium text-xl px-[10px] ${isDrawing ? 'ring-4 ring-green-300 animate-pulse' : ''}`}
      >
        <Route className="mr-2 h-5 w-5" /> 
        {isDrawing ? 'Dibujando...' : 'Dibujar Camino'}
      </Button>
      
      <Button 
        onClick={onPlay} 
        disabled={isPlaying || !pathExists || !canvasReady || isInitializing} 
        className="kids-text bg-cyan-500 hover:bg-cyan-400 text-gray-950 text-3xl font-normal px-[5px]"
      >
        <ArrowRight className="mr-2 h-5 w-5" /> Jugar
      </Button>
      
      <Button 
        onClick={onClear} 
        variant="outline" 
        disabled={isPlaying || !canvasReady || isInitializing} 
        className="border-red-300 hover:bg-red-100 text-red-500 kids-text font-medium text-base px-[10px]"
      >
        <Trash2 className="mr-2 h-5 w-5" /> Borrar
      </Button>
    </div>
  );
};

export default DrawControls;
