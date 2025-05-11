
import { useRef, useState, useCallback } from 'react';
import { Canvas as FabricCanvas, Circle, Path } from 'fabric';
import { toast } from '@/hooks/use-toast';
import { Point, interpolatePoints } from '../utils/pathUtils';
import { CarObject } from '../utils/carUtils';

interface UsePathAnimationProps {
  fabricCanvas: FabricCanvas | null;
  path: Point[];
  startPointObj: Circle | null;
  endPointObj: Circle | null;
  animationSpeed?: number;
  offsetY?: number; // Nuevo parámetro para ajustar la posición vertical del coche
}

export const usePathAnimation = ({
  fabricCanvas,
  path,
  startPointObj,
  endPointObj,
  animationSpeed = 180,
  offsetY = 0 // Default a 0 si no se proporciona
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
      
      // Reduce the number of interpolation points for faster animation
      // Adjusting the divisor to create fewer interpolation points
      const steps = Math.max(10, Math.ceil(distance / 2)); // Less dense interpolation for faster movement
      
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
        strokeWidth: 6, // Thicker line
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
      // Set higher z-index for all car components
      Object.values(car).forEach((part, index) => {
        part.set('zIndex', 5 + index);
      });
    }
      
    // Re-render the canvas to apply the z-index changes
    fabricCanvas.requestRenderAll();
  }, [fabricCanvas, interpolatedPath, startPointObj, endPointObj]);

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
    // Aplicar el offsetY para que el coche vaya por encima de la línea
    const newY = currentPoint.y + offsetY;
    
    // Calculate rotation angle if we have previous points
    // Look ahead a few points for smoother rotation
    if (currentIndex > 0) {
      // Look ahead for smoother rotation (if possible)
      const lookAheadIndex = Math.min(currentIndex + 3, interpolatedPath.length - 1);
      const lookAheadPoint = interpolatedPath[lookAheadIndex];
      const prevPoint = interpolatedPath[Math.max(0, currentIndex - 1)];
      
      // Use the look ahead point for rotation calculation if available
      const targetX = lookAheadPoint.x;
      const targetY = lookAheadPoint.y;
      
      const angle = Math.atan2(targetY - prevPoint.y, targetX - prevPoint.x) * 180 / Math.PI;
      
      // Set positions with calculated angle for all car parts
      Object.values(car).forEach(part => {
        // Conservar posiciones relativas originales
        const originalLeft = part.left || 0;
        const originalTop = part.top || 0;
        const relativeX = originalLeft - carPosition.x;
        const relativeY = originalTop - carPosition.y;
        
        part.set({
          left: newX + relativeX,
          top: newY + relativeY,
          angle: angle
        });
      });
    } else {
      // Posicionar todas las partes del coche
      Object.values(car).forEach(part => {
        // Conservar posiciones relativas originales
        const originalLeft = part.left || 0;
        const originalTop = part.top || 0;
        const relativeX = originalLeft - carPosition.x;
        const relativeY = originalTop - carPosition.y;
        
        part.set({
          left: newX + relativeX,
          top: newY + relativeY
        });
      });
    }
    
    // Update car position state for any UI that needs it
    setCarPosition({ x: newX, y: newY });
    
    // Always update the path trace to show progress
    updatePathTrace(currentIndex);
    
    // Update progress state
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
    
    // Calculate the step size to complete animation in about 10 seconds
    // For a typical path of around 300-500 points, we want to move every 20-30ms
    const stepSize = Math.max(1, Math.floor(interpolatedPath.length / 500)); // Adjust step size based on path length
    
    // Ajustar la velocidad para completar en aproximadamente 10 segundos
    const baseSpeed = 20; 
    const adjustedSpeed = Math.max(5, Math.min(50, currentAnimationSpeed / 10));
    
    timeoutRef.current = setTimeout(() => {
      // Use requestAnimationFrame to optimize animation
      animationRef.current = requestAnimationFrame(() => moveCar(currentIndex + stepSize));
    }, adjustedSpeed);
    
  }, [fabricCanvas, interpolatedPath, updatePathTrace, debugMode, currentAnimationSpeed, carPosition, offsetY]);

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

  // Añadir una función para limpiar el path trace
  const clearPathTrace = useCallback(() => {
    if (pathTraceRef.current && fabricCanvas) {
      fabricCanvas.remove(pathTraceRef.current);
      pathTraceRef.current = null;
    }
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
