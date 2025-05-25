
import React from 'react';
import { Button } from "@/components/ui/button";
import { Trash2, PlayCircle, PencilIcon } from "lucide-react";

interface DrawControlsProps {
  isPlaying: boolean;
  isDrawing: boolean;
  pathExists: boolean;
  canvasReady: boolean;
  isInitializing: boolean;
  onDraw: () => void;
  onPlay: () => void;
  onClear: () => void;
  onHelp?: () => void;
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
    <div className="w-full grid grid-cols-3 gap-4">
      {/* Draw button */}
      <Button 
        onClick={onDraw} 
        disabled={isPlaying || isInitializing || !canvasReady || isDrawing} 
        className={`kids-text text-white ${isDrawing ? "bg-green-700 hover:bg-green-800" : "bg-green-600 hover:bg-green-700"} text-lg font-normal py-6 flex flex-col items-center gap-1`}
      >
        <PencilIcon className="w-8 h-8 stroke-2" />
        <span className="text-base">Dibujar</span>
      </Button>
      
      {/* Play button - "Conducir" */}
      <Button 
        onClick={onPlay} 
        disabled={isPlaying || !pathExists || isInitializing || !canvasReady} 
        className="text-white kids-text text-lg font-normal py-6 bg-amber-500 hover:bg-amber-400 flex flex-col items-center gap-1"
      >
        <PlayCircle className="w-8 h-8 stroke-2" />
        <span className="text-base">Conducir</span>
      </Button>
      
      {/* Clear button */}
      <Button 
        onClick={onClear} 
        disabled={isInitializing || !canvasReady} 
        className="bg-red-600 hover:bg-red-700 text-white kids-text text-lg font-normal py-6 flex flex-col items-center gap-1"
      >
        <Trash2 className="w-8 h-8 stroke-2" />
        <span className="text-base">Borrar</span>
      </Button>
    </div>
  );
};

export default DrawControls;
