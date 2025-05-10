
import React from 'react';
import { ZoomIn, ZoomOut } from 'lucide-react';

interface ZoomControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
}

const ZoomControls: React.FC<ZoomControlsProps> = ({ onZoomIn, onZoomOut }) => {
  return (
    <div className="absolute top-2 right-2 z-10 flex gap-1">
      <button 
        onClick={onZoomIn}
        className="bg-white/80 hover:bg-white p-1 rounded-md shadow-sm"
        aria-label="Zoom in"
      >
        <ZoomIn className="w-5 h-5 text-purple-800" />
      </button>
      <button 
        onClick={onZoomOut}
        className="bg-white/80 hover:bg-white p-1 rounded-md shadow-sm"
        aria-label="Zoom out"
      >
        <ZoomOut className="w-5 h-5 text-purple-800" />
      </button>
    </div>
  );
};

export default ZoomControls;
