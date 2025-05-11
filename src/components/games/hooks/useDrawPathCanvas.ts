
import { useState, useEffect, useRef, RefObject } from 'react';
import { Canvas as FabricCanvas, Circle, Path, PencilBrush } from 'fabric';
import { toast } from '@/hooks/use-toast';
import { createStartPoint, createCar, CarObject } from '../utils/carUtils';
import { Point, extractPointsFromPath } from '../utils/pathUtils';

interface UseDrawPathCanvasProps {
  canvasRef: RefObject<HTMLCanvasElement>;
  containerRef: RefObject<HTMLDivElement>;
  onPathCreated: (points: Point[]) => void;
  onError: (message: string) => void;
}

export const useDrawPathCanvas = ({
  canvasRef,
  containerRef,
  onPathCreated,
  onError
}: UseDrawPathCanvasProps) => {
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);
  const [startPointObj, setStartPointObj] = useState<Circle | null>(null);
  const [endPointObj, setEndPointObj] = useState<Circle | null>(null);
  const [isInitializing, setIsInitializing] = useState<boolean>(true);
  const [canvasReady, setCanvasReady] = useState<boolean>(false);
  const carObjectsRef = useRef<CarObject | null>(null);
  const [lastPathObject, setLastPathObject] = useState<any>(null);

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
      canvas.add(car.body, car.roof, car.wheel1, car.wheel2, car.wheel3, car.headlight);
      carObjectsRef.current = car;
      canvas.renderAll();

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
        // Store the entire path object for debugging
        setLastPathObject(e.path);

        try {
          // Use the new extraction function for better point detection
          const points = extractPointsFromPath(e.path);
          
          console.log("Extracted points:", points.length);
          console.log("First few points:", points.slice(0, 5));
          console.log("Last few points:", points.slice(-5));

          // Call the onPathCreated callback with the extracted points
          onPathCreated(points);
          
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
          onError("Error processing path: " + (error instanceof Error ? error.message : String(error)));
        }
      });
      
      // Clean up on unmount
      return () => {
        console.log("Cleaning up canvas");
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
      onError("Error initializing canvas: " + (error instanceof Error ? error.message : String(error)));
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

  return {
    fabricCanvas,
    startPointObj,
    setStartPointObj, // Make sure this is exported from the hook
    endPointObj,
    setEndPointObj,
    isInitializing,
    canvasReady,
    carObjectsRef,
    lastPathObject
  };
};
