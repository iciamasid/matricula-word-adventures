import React, { useEffect, useRef, useState } from 'react';
import { Canvas as FabricCanvas, Circle, Path, Rect, PencilBrush, Polygon, Object as FabricObject } from 'fabric';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { toast } from '@/hooks/use-toast';
import { useDrawPathCanvas } from './hooks/useDrawPathCanvas';
import { usePathAnimation } from './hooks/usePathAnimation';
import { Point } from './utils/pathUtils';
import { createCar, createEndPoint, createStartPoint, CarColor } from './utils/carUtils';
import DrawControls from './DrawControls';
import GameStatusIndicators from './GameStatusIndicators';
import SpeedControl from './SpeedControl';
import { useGame } from '@/context/GameContext';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useLanguage } from '@/context/LanguageContext';
interface DrawPathGameProps {
  onError?: (message: string) => void;
  onHelp?: () => void;
}
const DrawPathGame: React.FC<DrawPathGameProps> = ({
  onError,
  onHelp
}) => {
  const {
    selectedCarColor,
    setSelectedCarColor
  } = useGame();
  const {
    t,
    isEnglish
  } = useLanguage();
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
  const [showCarSelector, setShowCarSelector] = useState<boolean>(false);
  const [carPosition, setCarPosition] = useState<{
    x: number;
    y: number;
  }>({
    x: 50,
    y: 50
  }); // Initial car position

  // Available car colors
  const carColors: CarColor[] = [{
    id: "1",
    name: "Coche Rojo",
    image: "cocherojo.png",
    color: "bg-red-500"
  }, {
    id: "2",
    name: "Coche Azul",
    image: "cocheazul.png",
    color: "bg-blue-500"
  }, {
    id: "3",
    name: "Coche Amarillo",
    image: "cocheamarillo.png",
    color: "bg-yellow-500"
  }];

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

  // Toggle car selector
  const toggleCarSelector = () => {
    setShowCarSelector(!showCarSelector);
  };

  // Handle car selection
  const handleSelectCar = (car: CarColor) => {
    setSelectedCarColor(car);
    setShowCarSelector(false);
    toast({
      title: "¡Coche seleccionado!",
      description: `Has seleccionado el ${car.name}.`
    });
  };

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

  // Prevent touch events from causing scrolling when interacting with canvas
  useEffect(() => {
    // Add event handlers to prevent default touch behaviors on the canvas
    const canvasElement = canvasRef.current;
    if (!canvasElement) return;
    const preventScroll = (e: TouchEvent) => {
      // Prevent scrolling only when in drawing mode
      if (isDrawing) {
        e.preventDefault();
      }
    };

    // Add touch event listeners with passive: false to allow preventDefault
    canvasElement.addEventListener('touchmove', preventScroll, {
      passive: false
    });
    canvasElement.addEventListener('touchstart', preventScroll, {
      passive: false
    });
    return () => {
      // Clean up event listeners
      canvasElement.removeEventListener('touchmove', preventScroll);
      canvasElement.removeEventListener('touchstart', preventScroll);
    };
  }, [isDrawing, canvasRef.current]);

  // Get the selected car image URL
  const getSelectedCarImage = () => {
    if (!selectedCarColor) return "";
    return `/lovable-uploads/${selectedCarColor.image}`;
  };

  // Get destination text based on language
  const getDestinationText = () => {
    return isEnglish ? "Arriving at destination..." : "Llegando a tu destino...";
  };
  return <div className="flex flex-col w-full gap-4">
      {/* Car selector button */}
      <div className="flex justify-center mb-2">
        
      </div>
      
      {/* Car selector popup */}
      {showCarSelector && <Card className="border-2 border-purple-300 shadow-lg overflow-hidden mb-4">
          <CardContent className="p-4">
            <h3 className="text-lg font-bold mb-2 text-center kids-text">Elige tu coche</h3>
            <div className="flex justify-center space-x-4">
              {carColors.map(car => <div key={car.id} className={`p-2 rounded-lg cursor-pointer transition-all hover:scale-105 ${selectedCarColor?.id === car.id ? "border-4 border-green-500" : "border border-gray-300"}`} onClick={() => handleSelectCar(car)}>
                  <img src={`/lovable-uploads/${car.image}`} alt={car.name} className="w-24 h-20 object-contain" />
                  <p className="text-center font-medium text-sm mt-1 kids-text">{car.name}</p>
                </div>)}
            </div>
          </CardContent>
        </Card>}
      
      {/* Speed control slider - MOVED UP */}
      <SpeedControl disabled={isPlaying || isInitializing || !canvasReady} onValueChange={handleSpeedChange} />
      
      {/* Game controls - MOVED UP */}
      <DrawControls isPlaying={isPlaying} isDrawing={isDrawing} pathExists={pathExists} canvasReady={canvasReady} isInitializing={isInitializing} onDraw={handleDrawMode} onPlay={handlePlay} onClear={handleClear} onHelp={handleHelp} />
      
      {/* Game canvas with much thicker purple border - 8px border (approx 3mm) */}
      <Card className="border-8 border-purple-300 shadow-lg overflow-hidden" style={{
      borderStyle: 'solid'
    }}>
        <CardContent className="p-0 touch-none">
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
            
            {/* Improved Progress indicator for animation - Updated text */}
            {isPlaying && interpolatedPath.length > 0 && <div className="absolute bottom-0 left-0 right-0 bg-blue-500/80 backdrop-blur-sm text-white py-2 z-20 rounded-b-md">
                <div className="flex flex-col items-center gap-1 px-4">
                  <span className="text-xs font-medium kids-text">{getDestinationText()}</span>
                  <Progress value={animationProgress} className="h-3 w-full" />
                  <span className="text-xs kids-text">{animationProgress}%</span>
                </div>
              </div>}
          </div>
        </CardContent>
      </Card>
      
      {/* Game status indicators */}
      <GameStatusIndicators isInitializing={isInitializing} canvasReady={canvasReady} isDrawing={isDrawing} isPlaying={isPlaying} animationProgress={animationProgress} interpolatedPathLength={interpolatedPath.length} animationCompleted={animationCompleted} />
      
      {/* Debug button (only visible during development) */}
      {process.env.NODE_ENV !== 'production' && <div className="flex justify-end">
          
        </div>}
    </div>;
};
export default DrawPathGame;