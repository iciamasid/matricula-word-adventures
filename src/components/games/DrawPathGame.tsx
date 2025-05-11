
import React, { useEffect, useRef, useState } from 'react';
import { Canvas as FabricCanvas, Circle, Path, Rect, PencilBrush } from 'fabric';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Trash2, Route } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Point {
  x: number;
  y: number;
}

interface DrawPathGameProps {
  onError?: (message: string) => void;
}

// Create a simple car object using Fabric.js shapes
const createCar = (left: number, top: number, color = '#9B59B6', scale = 1) => {
  // Car body
  const body = new Rect({
    left: left,
    top: top,
    width: 60 * scale,
    height: 30 * scale,
    fill: color,
    rx: 10 * scale,
    ry: 10 * scale,
    originX: 'center',
    originY: 'center',
    selectable: false
  });

  // Car roof
  const roof = new Rect({
    left: left,
    top: top - 15 * scale,
    width: 40 * scale,
    height: 20 * scale,
    fill: '#7D3C98',
    rx: 8 * scale,
    ry: 8 * scale,
    originX: 'center',
    originY: 'center',
    selectable: false
  });

  // Car wheels
  const wheel1 = new Circle({
    left: left - 20 * scale,
    top: top + 15 * scale,
    radius: 8 * scale,
    fill: '#34495E',
    originX: 'center',
    originY: 'center',
    selectable: false
  });
  const wheel2 = new Circle({
    left: left + 20 * scale,
    top: top + 15 * scale,
    radius: 8 * scale,
    fill: '#34495E',
    originX: 'center',
    originY: 'center',
    selectable: false
  });

  // Headlight
  const headlight = new Circle({
    left: left + 30 * scale,
    top: top + 5 * scale,
    radius: 4 * scale,
    fill: '#F1C40F',
    originX: 'center',
    originY: 'center',
    selectable: false
  });
  return {
    body,
    roof,
    wheel1,
    wheel2,
    headlight
  };
};

// Create start and end points for the path
const createStartPoint = (left: number, top: number) => {
  return new Circle({
    left,
    top,
    radius: 10,
    fill: '#2ECC71', // Green color
    stroke: '#27AE60',
    strokeWidth: 2,
    selectable: false
  });
};

const createEndPoint = (left: number, top: number) => {
  return new Circle({
    left,
    top,
    radius: 10,
    fill: '#E74C3C', // Red color
    stroke: '#C0392B',
    strokeWidth: 2,
    selectable: false
  });
};

// New helper function to interpolate between two points
const interpolatePoints = (point1: Point, point2: Point, steps: number): Point[] => {
  const points: Point[] = [];
  
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    points.push({
      x: point1.x + (point2.x - point1.x) * t,
      y: point1.y + (point2.y - point1.y) * t
    });
  }
  
  return points;
};

const DrawPathGame: React.FC<DrawPathGameProps> = ({ onError }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [path, setPath] = useState<Point[]>([]);
  const [interpolatedPath, setInterpolatedPath] = useState<Point[]>([]);
  const [carPosition, setCarPosition] = useState<{
    x: number;
    y: number;
  }>({
    x: 50,
    y: 50
  });
  const [endPosition, setEndPosition] = useState<{
    x: number;
    y: number;
  }>({
    x: 0,
    y: 0
  });
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [pathExists, setPathExists] = useState<boolean>(false);
  const [startPointObj, setStartPointObj] = useState<Circle | null>(null);
  const [endPointObj, setEndPointObj] = useState<Circle | null>(null);
  const [canvasReady, setCanvasReady] = useState<boolean>(false);
  const [isInitializing, setIsInitializing] = useState<boolean>(true);
  const [currentPathIndex, setCurrentPathIndex] = useState<number>(0);
  const [animationCompleted, setAnimationCompleted] = useState<boolean>(false);
  const animationRef = useRef<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const carObjectsRef = useRef<{
    body: Rect;
    roof: Rect;
    wheel1: Circle;
    wheel2: Circle;
    headlight: Circle;
  } | null>(null);
  const [animationSpeed, setAnimationSpeed] = useState<number>(150); // Higher value = slower animation
  const [showPath, setShowPath] = useState<boolean>(true);
  const pathTraceRef = useRef<Path | null>(null);

  // Initialize canvas on component mount
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;
    
    try {
      setIsInitializing(true);
      console.log("Starting canvas initialization");
      
      const containerWidth = containerRef.current.clientWidth;
      const containerHeight = 300; // Fixed height for consistency

      console.log("Canvas dimensions:", containerWidth, containerHeight);

      // Create Fabric Canvas with explicit dimensions
      const canvas = new FabricCanvas(canvasRef.current, {
        width: containerWidth,
        height: containerHeight,
        backgroundColor: '#f9f2ff',
        isDrawingMode: false // Start with drawing mode off until user clicks "Draw Path"
      });
      
      console.log("Canvas created successfully");

      // Create a pencil brush - IMPORTANT: In Fabric.js v6, we need to explicitly create a brush
      const pencilBrush = new PencilBrush(canvas);
      pencilBrush.color = '#9B59B6'; // Purple color matching theme
      pencilBrush.width = 8;
      
      // Set the brush to the canvas
      canvas.freeDrawingBrush = pencilBrush;
      
      console.log("Drawing brush configured");
      
      // Add car starting point
      const startPoint = createStartPoint(50, 50);
      canvas.add(startPoint);
      setStartPointObj(startPoint);

      // Create and add car to canvas
      const car = createCar(50, 50);
      canvas.add(car.body, car.roof, car.wheel1, car.wheel2, car.headlight);
      carObjectsRef.current = car;
      canvas.renderAll();

      // Set initial car position
      setCarPosition({
        x: 50,
        y: 50
      });

      // Store the canvas
      setFabricCanvas(canvas);
      setCanvasReady(true);
      setIsInitializing(false);
      console.log("Canvas setup complete");

      // Path drawing events
      canvas.on('path:created', (e: any) => {
        if (!e.path) {
          console.log("Path creation event triggered but no path object found");
          return;
        }

        console.log("Path created event triggered", e.path);

        try {
          // Convert fabric path to simple points array for animation
          const pathObject = e.path;
          const rawPath = pathObject.path as Array<any>;
          
          if (!rawPath || !Array.isArray(rawPath)) {
            console.log("Invalid path data:", rawPath);
            return;
          }
          
          const points: Point[] = [];
          rawPath.forEach(cmd => {
            if (cmd[0] === 'M' || cmd[0] === 'L') {
              points.push({
                x: cmd[1],
                y: cmd[2]
              });
            }
          });

          console.log("Path points extracted:", points.length);

          if (points.length > 0) {
            // Add end point at the last position of the path
            const lastPoint = points[points.length - 1];
            
            // Remove existing end point if any
            if (endPointObj && canvas) {
              canvas.remove(endPointObj);
            }
            
            const endPoint = createEndPoint(lastPoint.x, lastPoint.y);
            canvas.add(endPoint);
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
          canvas.isDrawingMode = false;
          
          toast({
            title: "¡Camino dibujado!",
            description: "Pulsa JUGAR para que el coche siga tu camino."
          });
        } catch (error) {
          console.error("Error processing path:", error);
          toast({
            title: "Error",
            description: "Hubo un problema al procesar tu dibujo. Inténtalo de nuevo.",
            variant: "destructive"
          });
        }
      });
      
      // Clean up on unmount
      return () => {
        console.log("Cleaning up canvas");
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
        canvas.dispose();
      };
    } catch (error) {
      console.error("Error initializing canvas:", error);
      setIsInitializing(false);
      setCanvasReady(false);
      toast({
        title: "Error",
        description: "No se pudo inicializar el juego. Inténtalo de nuevo.",
        variant: "destructive"
      });
    }
  }, []);

  // Effect to handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (!fabricCanvas || !containerRef.current) return;
      try {
        const containerWidth = containerRef.current.clientWidth;
        fabricCanvas.setWidth(containerWidth);
        fabricCanvas.renderAll();
      } catch (error) {
        console.error("Error resizing canvas:", error);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [fabricCanvas]);

  // Create interpolated path from original path
  useEffect(() => {
    if (!path.length) return;
    
    const interpolated: Point[] = [];
    
    // Add the first point
    interpolated.push(path[0]);
    
    // Interpolate between each pair of consecutive points
    for (let i = 0; i < path.length - 1; i++) {
      const point1 = path[i];
      const point2 = path[i + 1];
      
      // Calculate distance between points to determine number of interpolation steps
      const distance = Math.sqrt(
        Math.pow(point2.x - point1.x, 2) + 
        Math.pow(point2.y - point1.y, 2)
      );
      
      // More steps for longer distances - provides consistent movement speed
      // Use a smaller divisor to create more points and smoother animation
      const steps = Math.max(5, Math.ceil(distance / 3));
      
      // Skip the first point as it's already added
      const betweenPoints = interpolatePoints(point1, point2, steps).slice(1);
      interpolated.push(...betweenPoints);
    }
    
    console.log(`Original path: ${path.length} points, Interpolated: ${interpolated.length} points`);
    setInterpolatedPath(interpolated);
    
  }, [path]);

  // Draw a trace of the path that the car has traveled
  const updatePathTrace = (currentIndex: number) => {
    if (!fabricCanvas || interpolatedPath.length === 0) return;
    
    // Remove existing trace if any
    if (pathTraceRef.current) {
      fabricCanvas.remove(pathTraceRef.current);
    }
    
    // Only draw if we have enough points
    if (currentIndex > 1) {
      // Create a subset of the path up to the current index
      const pathSoFar = interpolatedPath.slice(0, currentIndex + 1);
      
      // Create a new path trace
      const pathData = pathSoFar.map((point, idx) => 
        idx === 0 ? `M ${point.x} ${point.y}` : `L ${point.x} ${point.y}`
      ).join(' ');
      
      const trace = new Path(pathData, {
        fill: '',
        stroke: '#4CAF50',
        strokeWidth: 5,
        strokeLineCap: 'round',
        strokeLineJoin: 'round',
        selectable: false,
        evented: false,
      });
      
      // Add the trace to the canvas
      fabricCanvas.add(trace);
      
      // Move the trace to the back of the stack using the canvas method
      fabricCanvas.sendObjectToBack(trace);
      
      pathTraceRef.current = trace;
    }
  };

  // Move car to the next point in the interpolated path
  const moveCar = (currentIndex: number) => {
    if (!fabricCanvas || !interpolatedPath.length || !carObjectsRef.current) {
      console.log("Missing required objects for animation", {
        canvas: !!fabricCanvas,
        pathLength: interpolatedPath.length,
        car: !!carObjectsRef.current
      });
      return;
    }
    
    const car = carObjectsRef.current;
    
    // Check if animation is complete
    if (currentIndex >= interpolatedPath.length) {
      // Animation is complete
      setIsPlaying(false);
      setAnimationCompleted(true);
      toast({
        title: "¡Muy bien!",
        description: "¡El coche ha llegado a su destino!"
      });
      return;
    }
    
    // Safety check for valid currentIndex
    if (currentIndex < 0 || !interpolatedPath[currentIndex]) {
      console.log("Invalid current index:", currentIndex);
      return;
    }
    
    const currentPoint = interpolatedPath[currentIndex];
    const newX = currentPoint.x;
    const newY = currentPoint.y;
    
    // Calculate rotation angle if we have previous points
    if (currentIndex > 0) {
      const prevPoint = interpolatedPath[currentIndex - 1];
      const angle = Math.atan2(newY - prevPoint.y, newX - prevPoint.x) * 180 / Math.PI;
      
      car.body.set({ left: newX, top: newY, angle: angle });
      car.roof.set({ left: newX, top: newY - 15, angle: angle });
      car.wheel1.set({ left: newX - 20, top: newY + 15, angle: angle });
      car.wheel2.set({ left: newX + 20, top: newY + 15, angle: angle });
      car.headlight.set({ left: newX + 30, top: newY + 5, angle: angle });
    } else {
      car.body.set({ left: newX, top: newY });
      car.roof.set({ left: newX, top: newY - 15 });
      car.wheel1.set({ left: newX - 20, top: newY + 15 });
      car.wheel2.set({ left: newX + 20, top: newY + 15 });
      car.headlight.set({ left: newX + 30, top: newY + 5 });
    }
    
    // Update car position state for any UI that needs it
    setCarPosition({ x: newX, y: newY });
    
    // Update the path trace to show progress
    if (showPath) {
      updatePathTrace(currentIndex);
    }
    
    // Update progress state
    const progress = Math.round((currentIndex / interpolatedPath.length) * 100);
    console.log(`Animation progress: ${progress}%, point: ${currentIndex} of ${interpolatedPath.length}`);
    
    // Update the canvas
    fabricCanvas.renderAll();
    
    // Use a shorter animation speed for smoother animation
    // Using requestAnimationFrame with a small delay for controlled speed
    const nextIndex = currentIndex + 1;
    setCurrentPathIndex(nextIndex);
    
    // Use a lower value for animationSpeed to make animation faster
    const speedFactor = 50; // Lower value = faster animation
    
    timeoutRef.current = setTimeout(() => {
      // Use requestAnimationFrame to optimize animation
      animationRef.current = requestAnimationFrame(() => moveCar(nextIndex));
    }, speedFactor);
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
    
    if (fabricCanvas) {
      fabricCanvas.isDrawingMode = false;
      
      // Remove previous car shapes and path trace
      const objects = fabricCanvas.getObjects();
      for (let i = objects.length - 1; i >= 0; i--) {
        const obj = objects[i];
        if (obj instanceof Rect || 
            (obj instanceof Circle && obj !== startPointObj && obj !== endPointObj && obj.radius !== 10) ||
            (obj instanceof Path && obj !== pathTraceRef.current)
           ) {
          fabricCanvas.remove(obj);
        }
      }
      
      // Remove existing path trace
      if (pathTraceRef.current) {
        fabricCanvas.remove(pathTraceRef.current);
        pathTraceRef.current = null;
      }
      
      // Re-add the car at the starting position
      const car = createCar(50, 50);
      fabricCanvas.add(car.body, car.roof, car.wheel1, car.wheel2, car.headlight);
      carObjectsRef.current = car;
      fabricCanvas.renderAll();
      
      // Cancel any existing animation
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      
      // Start the animation with a slight delay
      console.log("Starting car animation sequence");
      timeoutRef.current = setTimeout(() => {
        animationRef.current = requestAnimationFrame(() => moveCar(0));
      }, 500);
    }
  };

  // Clear canvas and reset
  const handleClear = () => {
    if (!fabricCanvas) return;
    
    console.log("Clearing canvas");

    try {
      // Cancel any ongoing animation
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      // Remove all objects except the starting point
      const objects = fabricCanvas.getObjects();
      for (let i = objects.length - 1; i >= 0; i--) {
        fabricCanvas.remove(objects[i]);
      }

      // Add start point back
      const startPoint = createStartPoint(50, 50);
      fabricCanvas.add(startPoint);
      setStartPointObj(startPoint);

      // Add car back to start
      const car = createCar(50, 50);
      fabricCanvas.add(car.body, car.roof, car.wheel1, car.wheel2, car.headlight);
      carObjectsRef.current = car;
      fabricCanvas.renderAll();

      // Reset states
      setPath([]);
      setPathExists(false);
      setIsPlaying(false);
      setIsDrawing(false);
      setCarPosition({
        x: 50,
        y: 50
      });
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

  // Update error handling in the component to use the handleError function
  const handleError = (message: string) => {
    console.error(message);
    if (onError) {
      onError(message);
    }
  };

  return <div className="flex flex-col w-full gap-4">
      <Card className="border-4 border-purple-300 shadow-lg overflow-hidden">
        <CardContent className="p-4">
          <div ref={containerRef} className="w-full relative">
            <canvas ref={canvasRef} />
            
            {/* Drawing mode indicator */}
            {isDrawing && (
              <div className="absolute top-0 left-0 right-0 bg-green-500 text-white text-center py-1 z-20 rounded-t-md">
                ¡Dibuja ahora el camino!
              </div>
            )}
            
            {/* Progress indicator for animation */}
            {isPlaying && interpolatedPath.length > 0 && (
              <div className="absolute bottom-0 left-0 right-0 bg-blue-500 text-white text-center py-1 z-20 rounded-b-md">
                Animación en progreso: {Math.round((currentPathIndex / interpolatedPath.length) * 100)}%
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      {/* Loading indicator */}
      {isInitializing && (
        <div className="text-center p-4 bg-purple-100 rounded-lg animate-pulse">
          <p className="font-bold text-purple-800">Inicializando el juego...</p>
          <p className="text-purple-600">Preparando el tablero, por favor espera.</p>
        </div>
      )}
      
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <Button 
          onClick={handleDrawMode} 
          variant="outline" 
          disabled={isPlaying || isDrawing || !canvasReady || isInitializing} 
          className={`bg-green-400 hover:bg-green-300 text-black rounded-xl font-medium text-xl px-[10px] ${isDrawing ? 'ring-4 ring-green-300 animate-pulse' : ''}`}
        >
          <Route className="mr-2 h-5 w-5" /> 
          {isDrawing ? 'Dibujando...' : 'Dibujar Camino'}
        </Button>
        
        <Button 
          onClick={handlePlay} 
          disabled={isPlaying || !pathExists || !canvasReady || isInitializing} 
          className="kids-text bg-cyan-500 hover:bg-cyan-400 text-gray-950 text-3xl font-normal px-[5px]"
        >
          <ArrowRight className="mr-2 h-5 w-5" /> Jugar
        </Button>
        
        <Button 
          onClick={handleClear} 
          variant="outline" 
          disabled={isPlaying || !canvasReady || isInitializing} 
          className="border-red-300 hover:bg-red-100 text-red-500 kids-text font-medium text-base px-[10px]"
        >
          <Trash2 className="mr-2 h-5 w-5" /> Borrar
        </Button>
      </div>
      
      {/* Canvas state indicator */}
      {!canvasReady && !isInitializing && (
        <div className="text-center p-4 bg-red-100 rounded-lg border border-red-300">
          <p className="font-bold text-red-800">No se pudo cargar el juego</p>
          <p className="text-red-600">Por favor, recarga la página e intenta de nuevo.</p>
        </div>
      )}
      
      {/* Active drawing instructions */}
      {isDrawing && canvasReady && (
        <div className="text-center p-4 bg-green-100 rounded-lg border-2 border-green-300 animate-pulse">
          <p className="font-bold text-green-800">¡Modo dibujo activo!</p>
          <p className="text-green-600">Dibuja un camino para el coche directamente en el tablero.</p>
        </div>
      )}
      
      {/* Animation completion message */}
      {animationCompleted && (
        <div className="text-center p-4 bg-yellow-100 rounded-lg border-2 border-yellow-300">
          <p className="font-bold text-yellow-800">¡Felicidades!</p>
          <p className="text-yellow-600">El coche ha llegado a su destino. Puedes dibujar un nuevo camino.</p>
        </div>
      )}
    </div>;
};

export default DrawPathGame;
