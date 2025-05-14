import React from 'react';
import { Button } from "@/components/ui/button";
import { Trash2, PlayCircle, PencilIcon, HelpCircle, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
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
  // Set navigation flag when leaving
  const handleNavigation = () => {
    sessionStorage.setItem('navigatingBack', 'true');
  };
  return <div className="w-full grid grid-cols-2 gap-4 md:grid-cols-4">
      {/* Draw button */}
      <Button onClick={onDraw} disabled={isPlaying || isInitializing || !canvasReady || isDrawing} className={`kids-text text-white ${isDrawing ? "bg-green-700 hover:bg-green-800" : "bg-green-600 hover:bg-green-700"} text-lg font-normal py-6`}>
        <PencilIcon className="w-5 h-5 mr-2" />
        Dibujar
      </Button>
      
      {/* Play button - "Conducir" */}
      <Button onClick={onPlay} disabled={isPlaying || !pathExists || isInitializing || !canvasReady} className="bg-cyan-600 hover:bg-cyan-700 text-white kids-text text-lg font-normal py-6">
        <PlayCircle className="w-5 h-5 mr-2" />
        Conducir
      </Button>
      
      {/* Clear button */}
      <Button onClick={onClear} disabled={isInitializing || !canvasReady} className="bg-red-600 hover:bg-red-700 text-white kids-text text-lg font-normal py-6">
        <Trash2 className="w-5 h-5 mr-2" />
        Borrar
      </Button>
      
      {/* Back button - Changed from "Matrículas" to "Volver" */}
      <Link to="/" className="w-full" onClick={handleNavigation}>
        <Button className="bg-purple-600 hover:bg-purple-700 text-white kids-text text-lg font-normal py-6 w-full">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Volver
        </Button>
      </Link>
    </div>;
};
export default DrawControls;