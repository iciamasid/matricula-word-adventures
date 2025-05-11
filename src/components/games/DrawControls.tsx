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
  return <div className="flex flex-col sm:flex-row justify-between gap-4">
      <Button onClick={onDraw} variant="outline" disabled={isPlaying || isDrawing || !canvasReady || isInitializing} className="text-slate-50 text-2xl text-center bg-violet-600 hover:bg-violet-500 px-[10px] font-normal">
        <Route className="mr-2 h-6 w-6" /> 
        {isDrawing ? 'Dibujando...' : 'Dibujar'}
      </Button>
      
      <Button onClick={onPlay} disabled={isPlaying || !pathExists || !canvasReady || isInitializing} className="kids-text px-6 py-3 rounded-xl text-slate-50 bg-fuchsia-600 hover:bg-fuchsia-500 text-2xl font-normal">
        <ArrowRight className="mr-2 h-6 w-6" /> Jugar
      </Button>
      
      <Button onClick={onHelp} className="kids-text px-4 py-3 rounded-xl bg-green-600 hover:bg-green-500 text-slate-50 text-2xl font-normal">
        <HelpCircle className="mr-2 h-5 w-5" /> Ayuda
      </Button>
      
      <Button onClick={onClear} variant="outline" disabled={isPlaying || !canvasReady || isInitializing} className="border-red-300 kids-text px-4 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-slate-50 font-normal text-2xl">
        <Trash2 className="mr-2 h-5 w-5" /> Borrar
      </Button>
    </div>;
};
export default DrawControls;