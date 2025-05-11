
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Trash2, Route, HelpCircle } from 'lucide-react';

interface DrawControlsProps {
  isPlaying: boolean;
  isDrawing: boolean;
  pathExists: boolean;
  canvasReady: boolean;
  isInitializing: boolean;
  onDraw: () => void;
  onPlay: () => void;
  onClear: () => void;
  onHelp: () => void;
}

const DrawControls: React.FC<DrawControlsProps> = ({
  isPlaying,
  isDrawing,
  pathExists,
  canvasReady,
  isInitializing,
  onDraw,
  onPlay,
  onClear,
  onHelp
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4">
      <Button 
        onClick={onDraw} 
        variant="outline" 
        disabled={isPlaying || isDrawing || !canvasReady || isInitializing} 
        className={`bg-green-400 hover:bg-green-300 text-black rounded-xl font-medium text-2xl px-6 py-3 kids-text ${isDrawing ? 'ring-4 ring-green-300 animate-pulse' : ''}`}
      >
        <Route className="mr-2 h-6 w-6" /> 
        {isDrawing ? 'Dibujando...' : 'Dibujar'}
      </Button>
      
      <Button 
        onClick={onPlay} 
        disabled={isPlaying || !pathExists || !canvasReady || isInitializing} 
        className="kids-text bg-cyan-500 hover:bg-cyan-400 text-gray-950 text-3xl font-bold px-6 py-3 rounded-xl"
      >
        <ArrowRight className="mr-2 h-6 w-6" /> Jugar
      </Button>
      
      <Button 
        onClick={onHelp} 
        className="kids-text bg-yellow-400 hover:bg-yellow-300 text-gray-800 text-xl font-bold px-4 py-3 rounded-xl"
      >
        <HelpCircle className="mr-2 h-5 w-5" /> Ayuda
      </Button>
      
      <Button 
        onClick={onClear} 
        variant="outline" 
        disabled={isPlaying || !canvasReady || isInitializing} 
        className="border-red-300 hover:bg-red-100 text-red-500 kids-text font-medium text-xl px-4 py-3 rounded-xl"
      >
        <Trash2 className="mr-2 h-5 w-5" /> Borrar
      </Button>
    </div>
  );
};

export default DrawControls;
