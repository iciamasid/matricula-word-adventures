
import React from 'react';
import { motion } from 'framer-motion';
import { ZoomIn, ZoomOut } from 'lucide-react';

interface ZoomControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
}

const ZoomControls: React.FC<ZoomControlsProps> = ({ onZoomIn, onZoomOut }) => {
  return (
    <div className="absolute top-2 right-2 z-40 flex flex-col gap-1">
      <motion.button 
        onClick={onZoomIn}
        className="bg-white/90 hover:bg-white p-1.5 rounded-md shadow-md"
        aria-label="Zoom in"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <ZoomIn className="w-5 h-5 text-purple-800" />
      </motion.button>
      <motion.button 
        onClick={onZoomOut}
        className="bg-white/90 hover:bg-white p-1.5 rounded-md shadow-md"
        aria-label="Zoom out"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <ZoomOut className="w-5 h-5 text-purple-800" />
      </motion.button>
    </div>
  );
};

export default ZoomControls;
