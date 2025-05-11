
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

const DrawPathGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [path, setPath] = useState<Point[]>([]);
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
    
    setIsPlaying(true);
    setIsDrawing(false);
    
    if (fabricCanvas) {
      fabricCanvas.isDrawingMode = false;
      
      // Remove previous car shapes
      const objects = fabricCanvas.getObjects();
      for (let i = objects.length - 1; i >= 0; i--) {
        const obj = objects[i];
        if (obj instanceof Rect || (obj instanceof Circle && obj !== startPointObj && obj !== endPointObj && obj.radius !== 10)) {
          fabricCanvas.remove(obj);
        }
      }
      
      // Re-add the car at the starting position for the SVG animation
      const car = createCar(50, 50);
      fabricCanvas.add(car.body, car.roof, car.wheel1, car.wheel2, car.headlight);
      fabricCanvas.renderAll();
    }

    // Wait for animation to complete
    setTimeout(() => {
      setIsPlaying(false);
      // Show success message
      toast({
        title: "¡Muy bien!",
        description: "¡El coche ha llegado a su destino!"
      });
    }, path.length * 20); // Animation duration based on path length
  };

  // Clear canvas and reset
  const handleClear = () => {
    if (!fabricCanvas) return;
    
    console.log("Clearing canvas");

    try {
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
            
            {/* Animated car that follows the path */}
            {isPlaying && path.length > 0 && (
              <motion.div 
                className="absolute z-10 pointer-events-none" 
                style={{
                  width: 60,
                  height: 30,
                  x: carPosition.x - 30,
                  y: carPosition.y - 15
                }} 
                animate={{
                  x: path.map(p => p.x - 30),
                  y: path.map(p => p.y - 15),
                  rotate: path.map((p, i) => {
                    if (i === 0 || i >= path.length - 1) return 0;
                    const prev = path[i - 1];
                    const angle = Math.atan2(p.y - prev.y, p.x - prev.x) * 180 / Math.PI;
                    return angle;
                  })
                }} 
                transition={{
                  duration: path.length * 0.02,
                  times: path.map((_, i) => i / (path.length - 1)),
                  ease: "linear"
                }}
              >
                {/* Simple car SVG for animation */}
                <svg width="100%" height="100%" viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg">
                  <rect x="0" y="10" width="60" height="30" fill="#9B59B6" rx="10" ry="10" />
                  <rect x="10" y="0" width="40" height="20" fill="#7D3C98" rx="8" ry="8" />
                  <circle cx="15" cy="30" r="8" fill="#34495E" />
                  <circle cx="45" cy="30" r="8" fill="#34495E" />
                  <circle cx="55" cy="15" r="4" fill="#F1C40F" />
                </svg>
              </motion.div>
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
    </div>;
};

export default DrawPathGame;
