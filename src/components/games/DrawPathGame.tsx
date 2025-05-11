
import React, { useEffect, useRef, useState } from 'react';
import { Canvas as FabricCanvas, Circle, Path, Rect, PencilBrush, Image as FabricImage } from 'fabric';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button"; 
import { toast } from '@/hooks/use-toast';
import { useDrawPathCanvas } from './hooks/useDrawPathCanvas';
import { usePathAnimation } from './hooks/usePathAnimation';
import { Point } from './utils/pathUtils';
import { createCar, createEndPoint, createStartPoint, createCarFromImage, CarImage } from './utils/carUtils';
import DrawControls from './DrawControls';
import GameStatusIndicators from './GameStatusIndicators';
import SpeedControl from './SpeedControl';

interface DrawPathGameProps {
  onError?: (message: string) => void;
  onHelp?: () => void;
}

const DrawPathGame: React.FC<DrawPathGameProps> = ({ onError, onHelp }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [path, setPath] = useState<Point[]>([]);
  const [pathExists, setPathExists] = useState<boolean>(false);
  const [endPosition, setEndPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [animationSpeed, setAnimationSpeed] = useState<number>(180); // Default animation speed
  const [carImage, setCarImage] = useState<FabricImage | null>(null);

  // Handle errors
  const handleError = (message: string) => {
    console.error(message);
    if (onError) {
      onError(message);
    }
  };

  // Initialize canvas
  const {
    fabricCanvas,
    startPointObj,
    endPointObj,
    setEndPointObj,
    isInitializing,
    canvasReady,
    carObjectsRef
  } = useDrawPathCanvas({
    canvasRef,
    containerRef,
    onPathCreated: (points: Point[]) => {
      if (points.length > 0) {
        // Add end point at the last position of the path
        const lastPoint = points[points.length - 1];
        
        // Remove existing end point if any
        if (endPointObj && fabricCanvas) {
          fabricCanvas.remove(endPointObj);
        }
        
        const endPoint = createEndPoint(lastPoint.x, lastPoint.y);
        fabricCanvas?.add(endPoint);
        setEndPointObj(endPoint);
        setEndPosition({
          x: lastPoint.x,
          y: lastPoint.y
        });
        
        console.log("End point added at:", lastPoint);
      }

      // Set the path for animation
      setPath(points);
      setPathExists(points.length > 0);
      setIsDrawing(false); // Deactivate drawing mode after creating a path
      if (fabricCanvas) {
        fabricCanvas.isDrawingMode = false;
      }
    },
    onError: handleError
  });

  // Path animation
  const {
    interpolatedPath,
    isPlaying,
    setIsPlaying,
    animationCompleted,
    setAnimationCompleted,
    currentPathIndex,
    setCurrentPathIndex,
    animationProgress,
    updatePath,
    moveCar,
    cancelAnimation,
    toggleDebugMode,
    setAnimationSpeed: setPathAnimationSpeed,
    clearPathTrace,
    setCarImageRef
  } = usePathAnimation({
    fabricCanvas,
    path,
    startPointObj,
    endPointObj,
    animationSpeed
  });

  // Update interpolated path when original path changes
  useEffect(() => {
    if (path.length) {
      updatePath(path);
    }
  }, [path, updatePath]);

  // Update animation speed when slider changes
  useEffect(() => {
    setPathAnimationSpeed(animationSpeed);
  }, [animationSpeed]);

  // Load car image when canvas is ready
  useEffect(() => {
    const loadCarImage = async () => {
      if (fabricCanvas && canvasReady && !isInitializing) {
        try {
          // Remove previous car image if exists
          if (carImage) {
            fabricCanvas.remove(carImage);
          }
          
          // Create new car image at start position
          const newCarImage = await createCarFromImage(fabricCanvas, 50, 50);
          fabricCanvas.add(newCarImage);
          fabricCanvas.renderAll();
          
          // Store car image reference
          setCarImage(newCarImage);
          setCarImageRef(newCarImage);
          
          console.log('Car image initialized');
        } catch (error) {
          console.error('Failed to load car image:', error);
          handleError('No se pudo cargar la imagen del coche. Usando coche predeterminado.');
          
          // Fall back to default car if image loading fails
          const defaultCar = createCar(50, 50);
          fabricCanvas.add(defaultCar.body, defaultCar.roof, defaultCar.wheel1, defaultCar.wheel2, defaultCar.wheel3, defaultCar.headlight);
          fabricCanvas.renderAll();
          carObjectsRef.current = defaultCar;
        }
      }
    };
    
    loadCarImage();
  }, [fabricCanvas, canvasReady, isInitializing]);

  // Start animation along the path
  const handlePlay = () => {
    if (path.length === 0) {
      toast({
        title: "¡No hay camino!",
        description: "Dibuja un camino primero.",
        variant: "destructive"
      });
      return;
    }
    
    console.log("Starting animation with path points:", path.length);
    console.log("Interpolated path points:", interpolatedPath.length);
    
    // Reset animation state
    setIsPlaying(true);
    setIsDrawing(false);
    setAnimationCompleted(false);
    setCurrentPathIndex(0);
    
    if (fabricCanvas) {
      fabricCanvas.isDrawingMode = false;
      
      // Remove previous car shapes but NOT the path trace
      const objects = fabricCanvas.getObjects();
      for (let i = objects.length - 1; i >= 0; i--) {
        const obj = objects[i];
        if ((obj instanceof Rect) || 
            (obj instanceof Circle && obj !== startPointObj && obj !== endPointObj && obj.radius !== 10)) {
          fabricCanvas.remove(obj);
        }
      }
      
      // Position the car image at the start of the path
      const loadNewCarAtStart = async () => {
        try {
          // Remove old car image if exists
          if (carImage) {
            fabricCanvas.remove(carImage);
          }
          
          // Create new car at starting position
          const newCarImage = await createCarFromImage(fabricCanvas, path[0].x, path[0].y);
          fabricCanvas.add(newCarImage);
          setCarImage(newCarImage);
          setCarImageRef(newCarImage);
          
          fabricCanvas.renderAll();
          
          // Cancel any existing animation
          cancelAnimation();
          
          // Start the animation with a slight delay
          console.log("Starting car animation sequence");
          setTimeout(() => {
            requestAnimationFrame(() => moveCar(0));
          }, 500);
        } catch (error) {
          console.error('Failed to load car image for animation:', error);
          handleError('Error al cargar la imagen del coche para la animación');
        }
      };
      
      loadNewCarAtStart();
    }
  };

  // Clear canvas and reset
  const handleClear = () => {
    if (!fabricCanvas) return;
    
    console.log("Clearing canvas");

    try {
      // Cancel any ongoing animation
      cancelAnimation();
      
      // Clear the path trace
      clearPathTrace();
      
      // Remove all objects
      fabricCanvas.clear();
      
      // Reset the canvas background
      fabricCanvas.backgroundColor = '#f9f2ff';
      
      // Add start point back
      const startPoint = createStartPoint(50, 50);
      fabricCanvas.add(startPoint);
      
      // Add car image back to start
      const loadNewCar = async () => {
        try {
          const newCarImage = await createCarFromImage(fabricCanvas, 50, 50);
          fabricCanvas.add(newCarImage);
          setCarImage(newCarImage);
          setCarImageRef(newCarImage);
          fabricCanvas.renderAll();
        } catch (error) {
          console.error('Failed to reload car image after clearing:', error);
          handleError('Error al reiniciar el coche');
        }
      };
      
      loadNewCar();

      // Reset states
      setPath([]);
      setPathExists(false);
      setIsPlaying(false);
      setIsDrawing(false);
      setEndPosition({ x: 0, y: 0 });
      setEndPointObj(null);
      setAnimationCompleted(false);
      setCurrentPathIndex(0);
      fabricCanvas.isDrawingMode = false;
      
      toast({
        title: "¡Tablero limpio!",
        description: "Dibuja un nuevo camino para el coche."
      });
    } catch (error) {
      console.error("Error clearing canvas:", error);
      toast({
        title: "Error",
        description: "No se pudo limpiar el tablero. Inténtalo de nuevo.",
        variant: "destructive"
      });
    }
  };

  // Enable drawing mode with better feedback
  const handleDrawMode = () => {
    if (!fabricCanvas) {
      console.log("Canvas not initialized yet");
      toast({
        title: "Error",
        description: "El juego no está listo aún. Por favor, espera un momento.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      console.log("Activating drawing mode");
      setIsDrawing(true);
      
      // Ensure the brush is set correctly
      if (!fabricCanvas.freeDrawingBrush) {
        console.log("Creating new brush");
        const pencilBrush = new PencilBrush(fabricCanvas);
        pencilBrush.color = '#9B59B6';
        pencilBrush.width = 8;
        fabricCanvas.freeDrawingBrush = pencilBrush;
      } else {
        console.log("Configuring existing brush");
        fabricCanvas.freeDrawingBrush.color = '#9B59B6';
        fabricCanvas.freeDrawingBrush.width = 8;
      }
      
      fabricCanvas.isDrawingMode = true;
      fabricCanvas.renderAll();
      
      toast({
        title: "Modo dibujo activado",
        description: "Dibuja un camino para el coche con tu dedo o ratón."
      });
    } catch (error) {
      console.error("Error activating drawing mode:", error);
      toast({
        title: "Error",
        description: "No se pudo activar el modo dibujo. Inténtalo de nuevo.",
        variant: "destructive"
      });
    }
  };

  // Handle animation speed change
  const handleSpeedChange = (value: number[]) => {
    // Convert slider value (0-100) to animation speed (300-50)
    // Higher value = slower animation, so we invert the relationship
    const speed = 300 - (value[0] * 2.5);
    setAnimationSpeed(speed);
    
    console.log(`Animation speed set to: ${speed}`);
  };

  // Handle help button click
  const handleHelp = () => {
    if (onHelp) {
      onHelp();
    }
  };

  return (
    <div className="flex flex-col w-full gap-4">
      <Card className="border-4 border-purple-300 shadow-lg overflow-hidden">
        <CardContent className="p-4">
          <div ref={containerRef} className="w-full relative">
            <canvas ref={canvasRef} />
            
            {/* Drawing mode indicator */}
            {isDrawing && (
              <div className="absolute top-0 left-0 right-0 bg-green-500 text-white text-center py-1 z-20 rounded-t-md kids-text">
                ¡Dibuja ahora el camino!
              </div>
            )}
            
            {/* Improved Progress indicator for animation */}
            {isPlaying && interpolatedPath.length > 0 && (
              <div className="absolute bottom-0 left-0 right-0 bg-blue-500/80 backdrop-blur-sm text-white py-2 z-20 rounded-b-md">
                <div className="flex flex-col items-center gap-1 px-4">
                  <span className="text-xs font-medium kids-text">Animación en progreso</span>
                  <Progress value={animationProgress} className="h-3 w-full" />
                  <span className="text-xs kids-text">{animationProgress}%</span>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      {/* Game status indicators */}
      <GameStatusIndicators
        isInitializing={isInitializing}
        canvasReady={canvasReady}
        isDrawing={isDrawing}
        isPlaying={isPlaying}
        animationProgress={animationProgress}
        interpolatedPathLength={interpolatedPath.length}
        animationCompleted={animationCompleted}
      />
      
      {/* Speed control slider */}
      <SpeedControl 
        disabled={isPlaying || isInitializing || !canvasReady}
        onValueChange={handleSpeedChange}
      />
      
      {/* Game controls */}
      <DrawControls
        isPlaying={isPlaying}
        isDrawing={isDrawing}
        pathExists={pathExists}
        canvasReady={canvasReady}
        isInitializing={isInitializing}
        onDraw={handleDrawMode}
        onPlay={handlePlay}
        onClear={handleClear}
        onHelp={handleHelp}
      />
      
      {/* Debug button (only visible during development) */}
      {process.env.NODE_ENV !== 'production' && (
        <div className="flex justify-end">
          <Button 
            onClick={toggleDebugMode} 
            variant="ghost" 
            size="sm" 
            className="text-xs"
          >
            Toggle Debug Mode
          </Button>
        </div>
      )}
    </div>
  );
};

export default DrawPathGame;
