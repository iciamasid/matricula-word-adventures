import React, { useEffect, useRef, useState } from 'react';
import { Canvas as FabricCanvas, Circle, Path, Rect, PencilBrush, Polygon, Object as FabricObject } from 'fabric';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { toast } from '@/hooks/use-toast';
import { useDrawPathCanvas } from './hooks/useDrawPathCanvas';
import { usePathAnimation } from './hooks/usePathAnimation';
import { Point } from './utils/pathUtils';
import { createCar, createEndPoint, createStartPoint } from './utils/carUtils';
import DrawControls from './DrawControls';
import GameStatusIndicators from './GameStatusIndicators';
import SpeedControl from './SpeedControl';
import { useGame } from '@/context/GameContext';
interface DrawPathGameProps {
  onError?: (message: string) => void;
  onHelp?: () => void;
}
const DrawPathGame: React.FC<DrawPathGameProps> = ({
  onError,
  onHelp
}) => {
  const {
    selectedCarColor
  } = useGame();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [path, setPath] = useState<Point[]>([]);
  const [pathExists, setPathExists] = useState<boolean>(false);
  const [endPosition, setEndPosition] = useState<{
    x: number;
    y: number;
  }>({
    x: 0,
    y: 0
  });
  const [animationSpeed, setAnimationSpeed] = useState<number>(180); // Default animation speed
  const [carRotation, setCarRotation] = useState<number>(0); // Track car rotation angle
  const [showCarImage, setShowCarImage] = useState<boolean>(true); // Show car image by default
  const [carPosition, setCarPosition] = useState<{
    x: number;
    y: number;
  }>({
    x: 50,
    y: 50
  }); // Initial car position

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

        // Create end point with WHITE color instead of red
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
    onError: handleError,
    backgroundColor: '#FFFFFF',
    // WHITE background color
    showCarImage: showCarImage // Pass the flag to show car image from the beginning
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
    carObjectsRef: animationCarRef,
    updatePath,
    moveCar,
    cancelAnimation,
    toggleDebugMode,
    setAnimationSpeed: setPathAnimationSpeed,
    clearPathTrace,
    setCarPosition: updateCarPosition
  } = usePathAnimation({
    fabricCanvas,
    path,
    startPointObj,
    endPointObj,
    animationSpeed,
    onCarRotationUpdate: angle => setCarRotation(angle),
    onCarPositionUpdate: position => {
      setCarPosition(position);
    }
  });

  // Update interpolated path when original path changes
  useEffect(() => {
    if (path.length) {
      updatePath(path);
    }
  }, [path, updatePath]);

  // Share the car ref between hooks
  useEffect(() => {
    if (carObjectsRef.current) {
      animationCarRef.current = carObjectsRef.current;
    }
  }, [carObjectsRef.current]);

  // Update animation speed when slider changes
  useEffect(() => {
    // Update the animation speed, making 120km/h faster
    setPathAnimationSpeed(animationSpeed);
  }, [animationSpeed]);

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

      // Reset the canvas background to WHITE
      fabricCanvas.backgroundColor = '#FFFFFF';

      // Add start point back - make it WHITE
      const startPoint = createStartPoint(50, 50);
      fabricCanvas.add(startPoint);

      // Use WHITE color for the drawn car (invisible)
      const carColorValue = '#FFFFFF';

      // Add car back to start with white color (invisible)
      const car = createCar(50, 50, carColorValue);
      fabricCanvas.add(car.body, car.roof, car.wheel1, car.wheel2, car.wheel3, car.headlight, car.rim1, car.rim2, car.rim3, car.frontWindshield, car.sideWindow, car.bumper, car.taillight, car.doorHandle);
      carObjectsRef.current = car;
      animationCarRef.current = car;
      fabricCanvas.renderAll();

      // Reset states
      setPath([]);
      setPathExists(false);
      setIsPlaying(false);
      setIsDrawing(false);
      setEndPosition({
        x: 0,
        y: 0
      });
      setEndPointObj(null);
      setAnimationCompleted(false);
      setCurrentPathIndex(0);
      setCarRotation(0); // Reset rotation
      setCarPosition({
        x: 50,
        y: 50
      }); // Reset car position
      setShowCarImage(true); // Always show car image overlay
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
    setCarRotation(0); // Reset rotation
    setShowCarImage(true); // Always show car image overlay

    if (fabricCanvas) {
      fabricCanvas.isDrawingMode = false;

      // Remove previous car shapes but NOT the path trace
      const objects = fabricCanvas.getObjects();
      for (let i = objects.length - 1; i >= 0; i--) {
        const obj = objects[i];
        // Fix type comparison by checking object type properly using instanceof
        if (obj instanceof Rect || obj instanceof Circle && obj !== startPointObj && obj !== endPointObj && obj.radius !== 10 || obj instanceof Polygon) {
          // Additional check to ensure we don't remove start/end points
          const isStartOrEndPoint = startPointObj && obj === startPointObj || endPointObj && obj === endPointObj;
          if (!isStartOrEndPoint) {
            fabricCanvas.remove(obj);
          }
        }
      }

      // Use WHITE color for the drawn car (making it invisible)
      const carColorValue = '#FFFFFF';

      // Re-add the car at the starting position with white color (making it invisible)
      const car = createCar(path[0].x, path[0].y, carColorValue);
      fabricCanvas.add(car.body, car.roof, car.wheel1, car.wheel2, car.wheel3, car.headlight, car.rim1, car.rim2, car.rim3, car.frontWindshield, car.sideWindow, car.bumper, car.taillight, car.doorHandle);
      animationCarRef.current = car;
      fabricCanvas.renderAll();

      // Cancel any existing animation
      cancelAnimation();

      // Start the animation with a slight delay
      console.log("Starting car animation sequence");
      setTimeout(() => {
        requestAnimationFrame(() => moveCar(0));
      }, 500);
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
      // CHANGED: Keep car image overlay visible even during drawing
      setShowCarImage(true);

      // Ensure the brush is set correctly - draw with a light purple color on white background
      if (!fabricCanvas.freeDrawingBrush) {
        console.log("Creating new brush");
        const pencilBrush = new PencilBrush(fabricCanvas);
        pencilBrush.color = '#9B59B6'; // Keep purple brush color
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

  // Handle animation speed change - modified to make 120km/h faster
  const handleSpeedChange = (value: number[]) => {
    // Convert slider value (0-100) to animation speed (300-30)
    // Higher value = slower animation, so we invert the relationship
    // Reduced minimum time to 30ms for faster top speed
    const speed = 300 - value[0] * 2.7;
    setAnimationSpeed(speed);
    console.log(`Animation speed set to: ${speed}`);
  };

  // Handle help button click
  const handleHelp = () => {
    if (onHelp) {
      onHelp();
    }
  };

  // Get the selected car image URL
  const getSelectedCarImage = () => {
    if (!selectedCarColor) return "";
    return `/lovable-uploads/${selectedCarColor.image}`;
  };
  return <div className="flex flex-col w-full gap-4">
      <Card className="border-4 border-purple-300 shadow-lg overflow-hidden">
        <CardContent className="p-4">
          <div ref={containerRef} className="w-full relative">
            <canvas ref={canvasRef} />
            
            {/* Overlay car image on top of the drawn car - Made bigger and smoother transitions */}
            {selectedCarColor && showCarImage && <div className="absolute pointer-events-none" style={{
            width: '140px',
            // Increased size for better visibility
            height: '110px',
            // Increased height proportionally
            left: `${carPosition.x - 70}px`,
            // Centered horizontally (half of width)
            top: `${carPosition.y - 55}px`,
            // Centered vertically with adjustment
            transform: `rotate(${carRotation}deg)`,
            transition: 'transform 0.3s ease-out, left 0.2s linear, top 0.2s linear',
            // Smoother transitions
            zIndex: 100
          }}>
                <img src={getSelectedCarImage()} alt="Selected car" className="w-full h-full object-contain" />
              </div>}
            
            {/* Drawing mode indicator */}
            {isDrawing && <div className="absolute top-0 left-0 right-0 bg-green-500 text-white text-center py-1 z-20 rounded-t-md kids-text">
                ¡Dibuja ahora el camino!
              </div>}
            
            {/* Improved Progress indicator for animation */}
            {isPlaying && interpolatedPath.length > 0 && <div className="absolute bottom-0 left-0 right-0 bg-blue-500/80 backdrop-blur-sm text-white py-2 z-20 rounded-b-md">
                <div className="flex flex-col items-center gap-1 px-4">
                  <span className="text-xs font-medium kids-text">Animación en progreso</span>
                  <Progress value={animationProgress} className="h-3 w-full" />
                  <span className="text-xs kids-text">{animationProgress}%</span>
                </div>
              </div>}
          </div>
        </CardContent>
      </Card>
      
      {/* Game status indicators */}
      <GameStatusIndicators isInitializing={isInitializing} canvasReady={canvasReady} isDrawing={isDrawing} isPlaying={isPlaying} animationProgress={animationProgress} interpolatedPathLength={interpolatedPath.length} animationCompleted={animationCompleted} />
      
      {/* Speed control slider */}
      <SpeedControl disabled={isPlaying || isInitializing || !canvasReady} onValueChange={handleSpeedChange} />
      
      {/* Game controls */}
      <DrawControls isPlaying={isPlaying} isDrawing={isDrawing} pathExists={pathExists} canvasReady={canvasReady} isInitializing={isInitializing} onDraw={handleDrawMode} onPlay={handlePlay} onClear={handleClear} onHelp={handleHelp} />
      
      {/* Debug button (only visible during development) */}
      {process.env.NODE_ENV !== 'production' && <div className="flex justify-end">
          
        </div>}
    </div>;
};
export default DrawPathGame;