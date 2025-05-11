
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
  return <div className="flex flex-col sm:flex-row justify-between gap-4">
      <Button onClick={onDraw} variant="outline" disabled={isPlaying || isDrawing || !canvasReady || isInitializing} className="text-slate-50 font-medium text-2xl text-center bg-violet-600 hover:bg-violet-500 px-[10px]">
        <Route className="mr-2 h-6 w-6" /> 
        {isDrawing ? 'Dibujando...' : 'Dibujar'}
      </Button>
      
      <Button onClick={onPlay} disabled={isPlaying || !pathExists || !canvasReady || isInitializing} className="kids-text px-6 py-3 rounded-xl text-slate-50 bg-violet-600 hover:bg-violet-500 font-medium text-2xl">
        <ArrowRight className="mr-2 h-6 w-6" /> Jugar
      </Button>
      
      <Button onClick={onClear} variant="outline" disabled={isPlaying || !canvasReady || isInitializing} className="border-red-300 hover:bg-red-100 text-red-500 kids-text font-medium text-xl px-4 py-3 rounded-xl">
        <Trash2 className="mr-2 h-5 w-5" /> Borrar
      </Button>
    </div>;
};

export default DrawControls;
