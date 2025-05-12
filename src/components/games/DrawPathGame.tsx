
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/context/LanguageContext';
import { useDrawPathCanvas } from './hooks/useDrawPathCanvas';
import { usePathAnimation } from './hooks/usePathAnimation';
import { Point } from './utils/pathUtils';
import { Play, PenLine, RotateCcw } from "lucide-react";
import GameStatusIndicators from './GameStatusIndicators';

interface DrawPathGameProps {
  onError: (message: string) => void;
  onHelp?: () => void;
}

const DrawPathGame: React.FC<DrawPathGameProps> = ({ onError, onHelp }) => {
  const { t, isEnglish } = useLanguage();
  
  // Refs for canvas elements
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Game state
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [path, setPath] = useState<Point[]>([]);
  const [isPlayDisabled, setIsPlayDisabled] = useState<boolean>(true);
  
  // Canvas hook
  const {
    fabricCanvas,
    startPointObj,
    endPointObj,
    isInitializing,
    canvasReady,
    carObjectsRef
  } = useDrawPathCanvas({
    canvasRef,
    containerRef,
    onPathCreated: (points) => {
      console.log("Path created with", points.length, "points");
      setPath(points);
      setIsDrawing(false);
      setIsPlayDisabled(false);
    },
    onError
  });
  
  // Animation hook
  const {
    isPlaying,
    setIsPlaying,
    animationCompleted,
    animationProgress,
    interpolatedPath,
    updatePath,
    moveCar,
    cancelAnimation,
    setAnimationSpeed
  } = usePathAnimation({
    fabricCanvas,
    path: path,
    startPointObj,
    endPointObj,
  });
  
  // Process path points when path changes
  useEffect(() => {
    if (path.length > 0) {
      console.log("Processing path with", path.length, "points");
      updatePath(path);
    }
  }, [path, updatePath]);
  
  // Handle play/pause button click
  const handlePlayClick = () => {
    if (path.length === 0 || !fabricCanvas) {
      onError(t('no_path_error'));
      return;
    }
    
    setIsPlaying(true);
    setIsPlayDisabled(true);
    
    // Small delay to allow UI updates before animation starts
    setTimeout(() => {
      // Start animation at index 0
      moveCar(0);
    }, 100);
  };
  
  // Handle draw button click
  const handleDrawClick = () => {
    if (!fabricCanvas) return;
    
    // Reset game state
    setIsDrawing(true);
    setPath([]);
    setIsPlaying(false);
    setIsPlayDisabled(true);
    
    // Cancel any ongoing animations
    cancelAnimation();
    
    // Enable drawing mode
    fabricCanvas.isDrawingMode = true;
  };
  
  // Handle clear button click
  const handleClearClick = () => {
    if (!fabricCanvas) return;
    
    // Cancel animation and reset state
    cancelAnimation();
    setIsDrawing(false);
    setIsPlaying(false);
    setPath([]);
    setIsPlayDisabled(true);
    
    // Clear canvas and disable drawing mode
    fabricCanvas.isDrawingMode = false;
    fabricCanvas.clear();
    
    // Re-add car and starting point
    if (startPointObj && carObjectsRef.current) {
      const car = carObjectsRef.current;
      fabricCanvas.add(startPointObj);
      fabricCanvas.add(car.body, car.roof, car.wheel1, car.wheel2, car.wheel3, car.headlight);
      fabricCanvas.renderAll();
    }
  };
  
  // Handle animation speed change
  const handleSpeedChange = (value: number[]) => {
    if (value.length > 0) {
      // Convert slider value to animation speed
      const speedValue = value[0];
      setAnimationSpeed(speedValue);
    }
  };
  
  return (
    <div className="flex flex-col gap-3 w-full">
      <GameStatusIndicators 
        isInitializing={isInitializing}
        canvasReady={canvasReady}
        isDrawing={isDrawing}
        isPlaying={isPlaying}
        animationProgress={animationProgress}
        interpolatedPathLength={interpolatedPath.length}
        animationCompleted={animationCompleted}
        onSpeedChange={handleSpeedChange}
        isPlayDisabled={isPlayDisabled}
      />
      
      <div 
        ref={containerRef} 
        className="relative bg-white rounded-lg shadow-lg overflow-hidden w-full"
        style={{ minHeight: '300px' }}
      >
        <canvas ref={canvasRef} className="w-full" style={{ touchAction: 'none' }} />
      </div>
      
      <div className="flex flex-wrap gap-3 justify-center mt-2">
        <Button 
          onClick={handleDrawClick}
          className={`${isDrawing ? 'bg-purple-700 hover:bg-purple-800' : 'bg-purple-600 hover:bg-purple-700'} text-white px-6 py-6`}
          disabled={isInitializing || isPlaying}
        >
          <PenLine className="mr-2 h-5 w-5" />
          <span className="text-xl kids-text">{t('draw')}</span>
        </Button>
        
        <Button 
          onClick={handlePlayClick}
          className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-6"
          disabled={isInitializing || isDrawing || path.length === 0 || isPlaying || isPlayDisabled}
        >
          <Play className="mr-2 h-5 w-5" />
          <span className="text-xl kids-text">{t('drive')}</span>
        </Button>
        
        <Button 
          onClick={handleClearClick}
          className="bg-rose-600 hover:bg-rose-700 text-white px-6 py-6"
          disabled={isInitializing}
        >
          <RotateCcw className="mr-2 h-5 w-5" />
          <span className="text-xl kids-text">{t('clear')}</span>
        </Button>
      </div>
    </div>
  );
};

export default DrawPathGame;
