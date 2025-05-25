
import { useRef, useState, useCallback } from 'react';
import { Canvas as FabricCanvas, Circle, Path, Rect, Polygon } from 'fabric';
import { toast } from '@/hooks/use-toast';
import { Point, interpolatePoints } from '../utils/pathUtils';
import { CarObject } from '../utils/carUtils';

interface UsePathAnimationProps {
  fabricCanvas: FabricCanvas | null;
  path: Point[];
  startPointObj: Circle | null;
  endPointObj: Circle | null;
  animationSpeed?: number;
  onCarRotationUpdate?: (angle: number) => void; // Callback for rotation updates
  onCarPositionUpdate?: (position: {x: number, y: number}) => void; // Added callback for position updates
}

export const usePathAnimation = ({
  fabricCanvas,
  path,
  startPointObj,
  endPointObj,
  animationSpeed = 180,
  onCarRotationUpdate,
  onCarPositionUpdate
}: UsePathAnimationProps) => {
  const [interpolatedPath, setInterpolatedPath] = useState<Point[]>([]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [animationCompleted, setAnimationCompleted] = useState<boolean>(false);
  const [currentPathIndex, setCurrentPathIndex] = useState<number>(0);
  const [animationProgress, setAnimationProgress] = useState<number>(0);
  const [carPosition, setCarPosition] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
  const [showPath, setShowPath] = useState<boolean>(true);
  
  const animationRef = useRef<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pathTraceRef = useRef<Path | null>(null);
  const carObjectsRef = useRef<CarObject | null>(null);
  const [debugMode, setDebugMode] = useState<boolean>(false);
  const [currentAnimationSpeed, setCurrentAnimationSpeed] = useState<number>(animationSpeed);
  
  // Add previous point reference for smoother angle calculations
  const previousPointRef = useRef<Point | null>(null);

  // Create interpolated path when original path changes
  const createInterpolatedPath = useCallback((originalPath: Point[]) => {
    if (!originalPath.length) return [];
    
    const interpolated: Point[] = [];
    
    // Add the first point
    interpolated.push(originalPath[0]);
    
    // Interpolate between each pair of consecutive points with higher density
    for (let i = 0; i < originalPath.length - 1; i++) {
      const point1 = originalPath[i];
      const point2 = originalPath[i + 1];
      
      // Calculate distance between points to determine number of interpolation steps
      const distance = Math.sqrt(
        Math.pow(point2.x - point1.x, 2) + 
        Math.pow(point2.y - point1.y, 2)
      );
      
      // Create more interpolation points for smoother movement
      const steps = Math.max(15, Math.ceil(distance / 3)); // Increased density for smoother movement
      
      // Skip the first point as it's already added
      const betweenPoints = interpolatePoints(point1, point2, steps).slice(1);
      interpolated.push(...betweenPoints);
    }
    
    console.log(`Original path: ${originalPath.length} points, Interpolated: ${interpolated.length} points`);
    return interpolated;
  }, []);

  // Update path with interpolation when the original path changes
  const updatePath = useCallback((newPath: Point[]) => {
    const interpolated = createInterpolatedPath(newPath);
    setInterpolatedPath(interpolated);
  }, [createInterpolatedPath]);

  // Path trace visualization - Modificado para asegurar que el trazo permanezca visible
  const updatePathTrace = useCallback((currentIndex: number) => {
    if (!fabricCanvas || interpolatedPath.length === 0) return;
    
    // Crear la traza del camino si no existe
    if (!pathTraceRef.current) {
      // Create the full path trace at once
      const pathData = interpolatedPath.map((point, idx) => 
        idx === 0 ? `M ${point.x} ${point.y}` : `L ${point.x} ${point.y}`
      ).join(' ');
      
      const trace = new Path(pathData, {
        fill: '',
        stroke: '#9B59B6', // Purple color matching the car
        strokeWidth: 4, // Reduced thickness
        strokeLineCap: 'round',
        strokeLineJoin: 'round',
        selectable: false,
        evented: false,
        opacity: 0.8, // Slightly transparent
      });
      
      // Add the trace to the canvas
      fabricCanvas.add(trace);
      
      // Update z-index directly
      trace.set('zIndex', 0);
      
      // Store the path trace reference
      pathTraceRef.current = trace;
      
      // Make sure the start point is on top of the path trace
      if (startPointObj) {
        startPointObj.set('zIndex', 1);
      }
      
      if (endPointObj) {
        endPointObj.set('zIndex', 1);
      }
    }
    
    // Ensure car is on top
    if (carObjectsRef.current) {
      const car = carObjectsRef.current;
      // Set higher z-index for car components
      car.body.set('zIndex', 5);
      car.roof.set('zIndex', 6);
      car.wheel1.set('zIndex', 5);
      car.wheel2.set('zIndex', 5);
      car.wheel3.set('zIndex', 5);
      car.headlight.set('zIndex', 6);
    }
      
    // Re-render the canvas to apply the z-index changes
    fabricCanvas.requestRenderAll();
  }, [fabricCanvas, interpolatedPath, startPointObj, endPointObj]);

  // Calculate angle between two points - Smoother rotation
  const calculateAngle = (prevPoint: Point, nextPoint: Point): number => {
    return Math.atan2(nextPoint.y - prevPoint.y, nextPoint.x - prevPoint.x) * 180 / Math.PI;
  };
  
  // Move car along the path
  const moveCar = useCallback((currentIndex: number) => {
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
      setAnimationProgress(100); // Set progress to 100% when complete
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
    
    // Update position state for car image overlay
    setCarPosition({ x: newX, y: newY });
    
    // Notify parent component through callback
    if (onCarPositionUpdate) {
      onCarPositionUpdate({ x: newX, y: newY });
    }
    
    // Calculate rotation angle with look-ahead and smoothing
    if (currentIndex > 0) {
      // Look further ahead for smoother rotation (if possible)
      const lookAheadIndex = Math.min(currentIndex + 10, interpolatedPath.length - 1); 
      const lookAheadPoint = interpolatedPath[lookAheadIndex];
      
      // Get previous point for angle calculation
      // Use stored previous point for smoother transitions
      const prevPoint = previousPointRef.current || interpolatedPath[Math.max(0, currentIndex - 1)];
      
      // Calculate angle to the look ahead point
      const angle = calculateAngle(prevPoint, lookAheadPoint);
      
      // Store current point for next iteration
      previousPointRef.current = currentPoint;
      
      // Update rotation callback if provided
      if (onCarRotationUpdate) {
        onCarRotationUpdate(angle);
      }
      
      // Set positions with calculated angle for all car parts
      car.body.set({ left: newX, top: newY, angle: angle });
      car.roof.set({ left: newX, top: newY - 15, angle: angle });
      car.wheel1.set({ left: newX - 20, top: newY + 15, angle: angle });
      car.wheel2.set({ left: newX + 0, top: newY + 15, angle: angle }); 
      car.wheel3.set({ left: newX + 20, top: newY + 15, angle: angle });
      car.headlight.set({ left: newX + 30, top: newY + 5, angle: angle });
      
      // New car parts
      car.rim1.set({ left: newX - 20, top: newY + 15, angle: angle });
      car.rim2.set({ left: newX + 0, top: newY + 15, angle: angle });
      car.rim3.set({ left: newX + 20, top: newY + 15, angle: angle });
      car.frontWindshield.set({ left: newX, top: newY - 11, angle: angle });
      car.sideWindow.set({ left: newX - 15, top: newY - 10, angle: angle });
      car.bumper.set({ left: newX + 28, top: newY + 2, angle: angle });
      car.taillight.set({ left: newX - 30, top: newY + 4, angle: angle });
      car.doorHandle.set({ left: newX - 8, top: newY - 1, angle: angle });
    } else {
      // Initial position
      if (onCarRotationUpdate) {
        onCarRotationUpdate(0); // Default angle for starting position
      }
      
      previousPointRef.current = currentPoint;
      
      car.body.set({ left: newX, top: newY });
      car.roof.set({ left: newX, top: newY - 15 });
      car.wheel1.set({ left: newX - 20, top: newY + 15 });
      car.wheel2.set({ left: newX + 0, top: newY + 15 });
      car.wheel3.set({ left: newX + 20, top: newY + 15 });
      car.headlight.set({ left: newX + 30, top: newY + 5 });
      
      // New car parts
      car.rim1.set({ left: newX - 20, top: newY + 15 });
      car.rim2.set({ left: newX + 0, top: newY + 15 });
      car.rim3.set({ left: newX + 20, top: newY + 15 });
      car.frontWindshield.set({ left: newX, top: newY - 11 });
      car.sideWindow.set({ left: newX - 15, top: newY - 10 });
      car.bumper.set({ left: newX + 28, top: newY + 2 });
      car.taillight.set({ left: newX - 30, top: newY + 4 });
      car.doorHandle.set({ left: newX - 8, top: newY - 1 });
    }
    
    // Always update the path trace to show progress
    updatePathTrace(currentIndex);
    
    // Calculate progress state
    const progress = Math.round((currentIndex / interpolatedPath.length) * 100);
    setAnimationProgress(progress);
    
    // Debug info for every 100th point
    if (debugMode && currentIndex % 100 === 0) {
      console.log(`Animation at point: ${currentIndex} of ${interpolatedPath.length}, progress: ${progress}%, position: ${newX},${newY}`);
    }
    
    // Update the canvas
    fabricCanvas.renderAll();
    
    // Update progress in the interface
    setCurrentPathIndex(currentIndex);
    
    // Adaptive speed based on path length - faster for shorter distances
    const pathLength = interpolatedPath.length;
    let baseStepSize = 2;
    let baseSpeed = 15;
    
    // If it's a short path (early levels), make it faster
    if (pathLength < 500) {
      baseStepSize = 4; // Double step size for short paths
      baseSpeed = 8;   // Much faster speed
    } else if (pathLength < 1000) {
      baseStepSize = 3; // 1.5x step size for medium paths
      baseSpeed = 12;
    }
    
    // Use step size for movement
    const stepSize = Math.max(baseStepSize, Math.floor(pathLength / 750));
    
    // Speed calculation with adaptive base speed
    const invertedSpeed = 100 - currentAnimationSpeed;
    const calculatedSpeed = Math.max(5, Math.min(25, baseSpeed + (invertedSpeed / 100) * 15));
    
    timeoutRef.current = setTimeout(() => {
      // Use requestAnimationFrame to optimize animation
      animationRef.current = requestAnimationFrame(() => moveCar(nextIndex));
    }, calculatedSpeed);
    
    // Skip points for smoother animation
    const nextIndex = currentIndex + stepSize;
  }, [fabricCanvas, interpolatedPath, updatePathTrace, debugMode, currentAnimationSpeed, onCarRotationUpdate, onCarPositionUpdate]);

  // Cancel any ongoing animation
  const cancelAnimation = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    // Clear previous point reference
    previousPointRef.current = null;
  }, []);

  // Toggle debug mode
  const toggleDebugMode = useCallback(() => {
    setDebugMode((prev) => !prev);
    toast({
      title: debugMode ? "Modo depuración desactivado" : "Modo depuración activado",
      description: debugMode ? "Los mensajes de depuración ya no se mostrarán" : "Se mostrarán mensajes detallados de depuración"
    });
  }, [debugMode]);

  // Set animation speed
  const setAnimationSpeed = useCallback((speed: number) => {
    setCurrentAnimationSpeed(speed);
    if (debugMode) {
      console.log(`Animation speed updated to: ${speed}ms`);
    }
  }, [debugMode]);

  // Clean up path trace
  const clearPathTrace = useCallback(() => {
    if (pathTraceRef.current && fabricCanvas) {
      fabricCanvas.remove(pathTraceRef.current);
      pathTraceRef.current = null;
    }
    // Also clear the previous point reference
    previousPointRef.current = null;
  }, [fabricCanvas]);

  return {
    interpolatedPath,
    isPlaying,
    setIsPlaying,
    animationCompleted,
    setAnimationCompleted,
    currentPathIndex,
    setCurrentPathIndex,
    animationProgress,
    carPosition,
    setCarPosition,
    showPath,
    carObjectsRef,
    pathTraceRef,
    debugMode,
    updatePath,
    moveCar,
    cancelAnimation,
    toggleDebugMode,
    setAnimationSpeed,
    currentAnimationSpeed,
    clearPathTrace
  };
};
