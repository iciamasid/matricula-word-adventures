import React from 'react';
import { Button } from "@/components/ui/button";
import { PencilIcon, PlayIcon, Eraser, HelpCircle } from "lucide-react";
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
  return <div className="w-full flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-3">
        <Button onClick={onDraw} disabled={isPlaying || isInitializing || !canvasReady} className={`text-white px-6 py-6 text-xl kids-text ${isDrawing ? "bg-green-700 hover:bg-green-600" : "bg-green-600 hover:bg-green-500"}`}>
          <PencilIcon className="mr-2 h-6 w-6" /> 
          Dibujar
        </Button>
        
        <Button onClick={onPlay} disabled={isPlaying || !pathExists || isInitializing || !canvasReady} className="text-white px-6 py-6 text-xl kids-text bg-game-yellow">
          <PlayIcon className="mr-2 h-6 w-6" /> 
          Conducir
        </Button>
      </div>
      
      <Button onClick={onClear} disabled={isPlaying || isInitializing || !canvasReady || !pathExists && !isDrawing} className="text-white px-6 py-4 text-lg kids-text bg-red-600 hover:bg-red-500">
        <Eraser className="mr-2 h-5 w-5" /> 
        Borrar
      </Button>
    </div>;
};
export default DrawControls;