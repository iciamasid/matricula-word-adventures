
import React, { useEffect, useRef, useState } from 'react';
import { Canvas as FabricCanvas, Rect, Circle, Polygon, PencilBrush } from 'fabric';
import { useDrawPathCanvas } from './hooks/useDrawPathCanvas';
import { usePathAnimation } from './hooks/usePathAnimation';
import { Point } from './utils/pathUtils';
import { createCar, createEndPoint, createStartPoint } from './utils/carUtils';
import DrawControls from './DrawControls';
import GameStatusIndicators from './GameStatusIndicators';
import SpeedControl from './SpeedControl';
import GameCanvas from './GameCanvas';
import LoadingScreen from '@/components/LoadingScreen';
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
    selectedCarColor,
    selectedMotorcycle
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
  const [animationSpeed, setAnimationSpeed] = useState<number>(180);
  const [carRotation, setCarRotation] = useState<number>(0);
  const [showCarImage, setShowCarImage] = useState<boolean>(true);
  const [carPosition, setCarPosition] = useState<{
    x: number;
    y: number;
  }>({
    x: 50,
    y: 50
  });
  const [showLoadingScreen, setShowLoadingScreen] = useState<boolean>(true);

  // Determine if we're in motorcycle mode based on current page
  const isMotorcycleMode = window.location.pathname.includes('motorcycle');
  
  // Get the current selected vehicle (car or motorcycle)
  const currentVehicle = isMotorcycleMode ? selectedMotorcycle : selectedCarColor;

  // Check if we're using a motorcycle based on the image name
  const isMotorcycle = currentVehicle?.image?.toLowerCase().includes('moto') || isMotorcycleMode;

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

      // Set the path for animation and enable the "Conducir" button
      setPath(points);
      setPathExists(points.length > 0);
      setIsDrawing(false); // Deactivate drawing mode after creating a path
      if (fabricCanvas) {
        fabricCanvas.isDrawingMode = false;
      }
    },
    onError: handleError,
    backgroundColor: '#FFFFFF',
    showCarImage: showCarImage
  });

  // Show loading screen for exactly 3 seconds regardless of canvas state
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoadingScreen(false);
    }, 3000); // Exactly 3 seconds

    return () => clearTimeout(timer);
  }, []);

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
      setCarRotation(0);
      setCarPosition({
        x: 50,
        y: 50
      });
      setShowCarImage(true);
      fabricCanvas.isDrawingMode = false;
    } catch (error) {
      console.error("Error clearing canvas:", error);
    }
  };

  // Start animation along the path
  const handlePlay = () => {
    if (path.length === 0) {
      return;
    }
    console.log("Starting animation with path points:", path.length);
    console.log("Interpolated path points:", interpolatedPath.length);

    // Reset animation state
    setIsPlaying(true);
    setIsDrawing(false);
    setAnimationCompleted(false);
    setCurrentPathIndex(0);
    setCarRotation(0);
    setShowCarImage(true);

    if (fabricCanvas) {
      fabricCanvas.isDrawingMode = false;

      // Remove previous car shapes but NOT the path trace
      const objects = fabricCanvas.getObjects();
      for (let i = objects.length - 1; i >= 0; i--) {
        const obj = objects[i];
        // Fix type comparison - check object type properly using type property
        if (obj.type === 'rect' || (obj.type === 'circle' && obj !== startPointObj && obj !== endPointObj) || obj.type === 'polygon') {
          // Additional check to ensure we don't remove start/end points
          const isStartOrEndPoint = (startPointObj && obj === startPointObj) || (endPointObj && obj === endPointObj);
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
      return;
    }
    try {
      console.log("Activating drawing mode");
      setIsDrawing(true);
      setShowCarImage(true);

      // Ensure the brush is set correctly - draw with a light purple color on white background
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
    } catch (error) {
      console.error("Error activating drawing mode:", error);
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

  return (
    <>
      {/* Loading screen - show for 3 seconds */}
      {showLoadingScreen && (
        <LoadingScreen 
          onLoadComplete={() => setShowLoadingScreen(false)}
          bgColor="bg-black/70"
        />
      )}

      <div className="flex flex-col w-full gap-4">
        {/* Speed control slider */}
        <SpeedControl disabled={isPlaying || isInitializing || !canvasReady} onValueChange={handleSpeedChange} />
        
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
        
        {/* Game canvas */}
        <GameCanvas
          containerRef={containerRef}
          canvasRef={canvasRef}
          isMotorcycle={isMotorcycle}
          currentVehicle={currentVehicle}
          showCarImage={showCarImage}
          carPosition={carPosition}
          carRotation={carRotation}
          isDrawing={isDrawing}
          isPlaying={isPlaying}
          interpolatedPathLength={interpolatedPath.length}
          animationProgress={animationProgress}
        />
        
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
      </div>
    </>
  );
};

export default DrawPathGame;
