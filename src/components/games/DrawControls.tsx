
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Trash2, Route, Gamepad } from 'lucide-react';
import { motion } from 'framer-motion';

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
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button 
          onClick={onDraw} 
          variant="outline" 
          disabled={isPlaying || isDrawing || !canvasReady || isInitializing} 
          className={`rounded-xl bg-green-500 hover:bg-green-400 text-white border-green-600 border-2 font-bold kids-text text-xl ${isDrawing ? 'ring-4 ring-green-300 animate-pulse' : ''}`}
        >
          <Route className="mr-2 h-6 w-6" /> 
          {isDrawing ? '¡Dibujando!' : 'Dibujar Camino'}
        </Button>
      </motion.div>
      
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button 
          onClick={onPlay} 
          disabled={isPlaying || !pathExists || !canvasReady || isInitializing} 
          className="rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white border-cyan-600 border-2 font-bold kids-text text-3xl py-6"
        >
          <Gamepad className="mr-2 h-7 w-7" /> ¡Jugar!
        </Button>
      </motion.div>
      
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button 
          onClick={onClear} 
          variant="outline" 
          disabled={isPlaying || !canvasReady || isInitializing} 
          className="rounded-xl bg-red-400 hover:bg-red-300 text-white border-red-500 border-2 font-bold kids-text text-base"
        >
          <Trash2 className="mr-2 h-5 w-5" /> Borrar
        </Button>
      </motion.div>
    </div>
  );
};

export default DrawControls;
