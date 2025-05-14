import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Canvas as FabricCanvas, Circle } from 'fabric';
import { Point, calculateAngle, generateSmoothPath } from '../utils/pathUtils';

interface PathAnimationProps {
  fabricCanvas: FabricCanvas | null;
  path: Point[];
  startPointObj: Circle | null;
  endPointObj: Circle | null;
  animationSpeed?: number;
  onCarRotationUpdate?: (angle: number) => void;
}

export const usePathAnimation = ({
  fabricCanvas,
  path,
  startPointObj,
  endPointObj,
  animationSpeed = 180, // Default animation speed (higher = slower)
  onCarRotationUpdate
}: PathAnimationProps) => {
  const [interpolatedPath, setInterpolatedPath] = useState<Point[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [animationCompleted, setAnimationCompleted] = useState(false);
  const [currentPathIndex, setCurrentPathIndex] = useState(0);
  const [debugMode, setDebugMode] = useState(false);
  const [animationProgress, setAnimationProgress] = useState(0);
  const requestRef = useRef<number | null>(null);
  const prevTimeRef = useRef<number | null>(null);
  const carObjectsRef = useRef<any>(null);
  const [animationSpeed_, setAnimationSpeed] = useState(animationSpeed);
  const [lastUpdateTime, setLastUpdateTime] = useState(0);
  const [carPosition, setCarPosition] = useState({ x: 50, y: 50 });
  
  // Additional state for smoother car movement
  const [smoothedPosition, setSmoothedPosition] = useState({ x: 50, y: 50 });
  const positionHistoryRef = useRef<Array<{x: number, y: number}>>([]);
  const averagePositionWindow = 3; // Number of positions to average for smoothing
  
  // Add car path trace
  const clearPathTrace = useCallback(() => {
    if (!fabricCanvas) return;
    
    // Remove only the path trace objects (those with the "path-trace" property)
    const objects = fabricCanvas.getObjects();
    for (let i = objects.length - 1; i >= 0; i--) {
      const obj = objects[i];
      if (obj.data && obj.data.isPathTrace) {
        fabricCanvas.remove(obj);
      }
    }
    
    fabricCanvas.renderAll();
  }, [fabricCanvas]);

  // Generate interpolated path from original path
  const updatePath = useCallback((newPath: Point[]) => {
    if (newPath && newPath.length > 0) {
      console.log("Generating smoothed path from", newPath.length, "points");
      const smoothedPath = generateSmoothPath(newPath);
      setInterpolatedPath(smoothedPath);
      console.log("Generated interpolated path with", smoothedPath.length, "points");
      
      // Reset animation state
      setCurrentPathIndex(0);
      setAnimationProgress(0);
      setAnimationCompleted(false);
    }
  }, []);
  
  // Calculate smoothed position from history
  const updateSmoothedPosition = useCallback((newPosition: {x: number, y: number}) => {
    // Add new position to history
    positionHistoryRef.current.push(newPosition);
    
    // Keep only the most recent positions for averaging
    if (positionHistoryRef.current.length > averagePositionWindow) {
      positionHistoryRef.current.shift();
    }
    
    // Calculate average position if we have enough points
    if (positionHistoryRef.current.length > 0) {
      const avgX = positionHistoryRef.current.reduce((sum, pos) => sum + pos.x, 0) / positionHistoryRef.current.length;
      const avgY = positionHistoryRef.current.reduce((sum, pos) => sum + pos.y, 0) / positionHistoryRef.current.length;
      
      setSmoothedPosition({ x: avgX, y: avgY });
      setCarPosition({ x: avgX, y: avgY }); // Update the car position with smoothed value
    }
  }, []);
  
  // Cancel any ongoing animation
  const cancelAnimation = useCallback(() => {
    if (requestRef.current !== null) {
      cancelAnimationFrame(requestRef.current);
      requestRef.current = null;
      prevTimeRef.current = null;
    }
    setIsPlaying(false);
  }, []);

  // Toggle debug mode (visualize path)
  const toggleDebugMode = useCallback(() => {
    setDebugMode(!debugMode);
  }, [debugMode]);
  
  // Move the car along the path
  const moveCar = useCallback((timestamp: number) => {
    if (!isPlaying || !fabricCanvas || !interpolatedPath.length || !carObjectsRef.current) {
      return;
    }
    
    // Throttle updates to reduce jerkiness
    if (timestamp - lastUpdateTime < 16) { // Limit to roughly 60fps
      requestRef.current = requestAnimationFrame(moveCar);
      return;
    }
    
    setLastUpdateTime(timestamp);
    
    // Initialize prevTimeRef on first frame
    if (prevTimeRef.current === null) {
      prevTimeRef.current = timestamp;
      requestRef.current = requestAnimationFrame(moveCar);
      return;
    }
    
    const deltaTime = timestamp - prevTimeRef.current;
    const stepSize = Math.max(1, Math.floor(deltaTime / animationSpeed_));
    
    // Only update if we have a reasonable step size
    if (stepSize >= 1) {
      // Update previous time
      prevTimeRef.current = timestamp;
      
      let nextIndex = currentPathIndex + stepSize;
      
      // Check if we've reached the end of the path
      if (nextIndex >= interpolatedPath.length) {
        nextIndex = interpolatedPath.length - 1;
        
        // Animation completed
        if (currentPathIndex === nextIndex) {
          setAnimationCompleted(true);
          setIsPlaying(false);
          console.log("Animation completed");
          return;
        }
      }
      
      // Get next position
      const nextPoint = interpolatedPath[nextIndex];
      
      if (nextPoint) {
        // Calculate progress percentage
        const progress = Math.floor((nextIndex / (interpolatedPath.length - 1)) * 100);
        setAnimationProgress(progress);
        
        // Calculate rotation angle using a window of points for smoother rotation
        const lookAheadIndex = Math.min(nextIndex + 3, interpolatedPath.length - 1);
        const currentPoint = interpolatedPath[nextIndex];
        const lookAheadPoint = interpolatedPath[lookAheadIndex];
        
        let rotationAngle = 0;
        
        if (lookAheadPoint && currentPoint) {
          rotationAngle = calculateAngle(
            currentPoint.x, 
            currentPoint.y, 
            lookAheadPoint.x, 
            lookAheadPoint.y
          );
          
          // Notify parent about rotation update
          if (onCarRotationUpdate) {
            onCarRotationUpdate(rotationAngle);
          }
        }
        
        // Update the car position smoothly
        updateSmoothedPosition({ x: nextPoint.x, y: nextPoint.y });
        
        // Draw path trace if in debug mode
        if (debugMode && fabricCanvas) {
          const traceCircle = new Circle({
            left: nextPoint.x - 2,
            top: nextPoint.y - 2,
            radius: 2,
            fill: 'rgba(255, 0, 0, 0.5)',
            selectable: false,
            evented: false,
            data: { isPathTrace: true }
          });
          
          fabricCanvas.add(traceCircle);
        }
        
        // Update current index
        setCurrentPathIndex(nextIndex);
      }
    }
    
    // Continue animation
    requestRef.current = requestAnimationFrame(moveCar);
  }, [isPlaying, fabricCanvas, interpolatedPath, currentPathIndex, animationSpeed_, debugMode, onCarRotationUpdate, updateSmoothedPosition, lastUpdateTime]);

  // Clean up animation frame on unmount
  useEffect(() => {
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);
  
  // Stop animation when reaching the end point
  useEffect(() => {
    if (animationCompleted && isPlaying) {
      setIsPlaying(false);
    }
  }, [animationCompleted, isPlaying]);

  // Reset animation state when path changes
  useEffect(() => {
    // Initialize position history with starting position
    if (path.length > 0) {
      positionHistoryRef.current = Array(averagePositionWindow).fill({ x: path[0].x, y: path[0].y });
      setSmoothedPosition({ x: path[0].x, y: path[0].y });
      setCarPosition({ x: path[0].x, y: path[0].y });
    }
  }, [path]);

  return {
    interpolatedPath,
    isPlaying,
    setIsPlaying,
    animationCompleted,
    setAnimationCompleted,
    currentPathIndex,
    setCurrentPathIndex,
    animationProgress,
    carObjectsRef,
    updatePath,
    moveCar,
    cancelAnimation,
    toggleDebugMode,
    setAnimationSpeed,
    clearPathTrace,
    carPosition,
    setCarPosition
  };
};
