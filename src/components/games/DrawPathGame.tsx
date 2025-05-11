
import React, { useEffect, useRef, useState } from 'react';
import { Canvas as FabricCanvas, Circle, Image, Path } from 'fabric';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Trash2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Point {
  x: number;
  y: number;
}

const DrawPathGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [path, setPath] = useState<Point[]>([]);
  const [carPosition, setCarPosition] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [pathExists, setPathExists] = useState<boolean>(false);
  
  // Initialize canvas on component mount
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;
    
    const containerWidth = containerRef.current.clientWidth;
    const containerHeight = 300; // Fixed height for consistency
    
    // Create Fabric Canvas
    const canvas = new FabricCanvas(canvasRef.current, {
      width: containerWidth,
      height: containerHeight,
      backgroundColor: '#f9f2ff', // Light purple background matching the app's theme
      isDrawingMode: true
    });
    
    // Configure drawing brush
    if (canvas.freeDrawingBrush) {
      canvas.freeDrawingBrush.color = '#9B59B6'; // Purple color matching theme
      canvas.freeDrawingBrush.width = 8;
    }
    
    // Add car starting point
    const startPoint = new Circle({
      left: 50,
      top: 50,
      radius: 10,
      fill: '#9B59B6',
      selectable: false
    });
    
    canvas.add(startPoint);
    
    // Add car image - Fix the Image.fromURL usage to match Fabric.js v6 API
    Image.fromURL('/lovable-uploads/coche_animado.gif', {
      scaleX: 40/512, // Assuming original width is 512px, scale to 40px
      scaleY: 40/512, // Assuming original height is 512px, scale to 40px
      left: 30,
      top: 30,
      selectable: false,
      originX: 'center',
      originY: 'center',
      onError: () => {
        console.error('Error loading car image');
      }
    }).then((img) => {
      canvas.add(img);
    }).catch(err => {
      console.error('Error loading image:', err);
    });
    
    // Set initial car position
    setCarPosition({ x: 50, y: 50 });
    
    // Store the canvas
    setFabricCanvas(canvas);
    
    // Path drawing events
    canvas.on('path:created', (e: any) => {
      if (!e.path) return;
      
      // Convert fabric path to simple points array for animation
      const pathObject = e.path;
      const rawPath = pathObject.path as Array<any>;
      
      const points: Point[] = [];
      rawPath.forEach(cmd => {
        if (cmd[0] === 'M' || cmd[0] === 'L') {
          points.push({ x: cmd[1], y: cmd[2] });
        }
      });
      
      // Remove all paths except the last one
      const objects = canvas.getObjects();
      for (let i = 0; i < objects.length; i++) {
        if (objects[i] !== e.path && objects[i] instanceof Path) {
          canvas.remove(objects[i]);
        }
      }
      
      // Set the path for animation
      setPath(points);
      setPathExists(points.length > 0);
      toast({
        title: "¡Camino dibujado!",
        description: "Pulsa JUGAR para que el coche siga tu camino.",
      });
    });
    
    return () => {
      canvas.dispose();
    };
  }, []);
  
  // Effect to handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (!fabricCanvas || !containerRef.current) return;
      
      const containerWidth = containerRef.current.clientWidth;
      fabricCanvas.setWidth(containerWidth);
      fabricCanvas.renderAll();
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
    
    setIsPlaying(true);
    setIsDrawing(false);
    if (fabricCanvas) {
      fabricCanvas.isDrawingMode = false;
    }
    
    // Remove previous car image
    if (fabricCanvas) {
      const objects = fabricCanvas.getObjects();
      for (let i = 0; i < objects.length; i++) {
        if (objects[i] instanceof Image) {
          fabricCanvas.remove(objects[i]);
        }
      }
    }
    
    // Wait for animation to complete
    setTimeout(() => {
      setIsPlaying(false);
      // Show success message
      toast({
        title: "¡Muy bien!",
        description: "¡El coche ha llegado a su destino!",
      });
    }, path.length * 20); // Animation duration based on path length
  };
  
  // Clear canvas and reset
  const handleClear = () => {
    if (!fabricCanvas) return;
    
    // Keep only the starting point
    const objects = fabricCanvas.getObjects();
    for (let i = 0; i < objects.length; i++) {
      if (!(objects[i] instanceof Circle)) {
        fabricCanvas.remove(objects[i]);
      }
    }
    
    // Add car back to start - Fix the Image.fromURL usage to match Fabric.js v6 API
    Image.fromURL('/lovable-uploads/coche_animado.gif', {
      scaleX: 40/512, // Assuming original width is 512px, scale to 40px
      scaleY: 40/512, // Assuming original height is 512px, scale to 40px
      left: 30,
      top: 30,
      selectable: false,
      originX: 'center',
      originY: 'center',
      onError: () => {
        console.error('Error loading car image');
      }
    }).then((img) => {
      fabricCanvas.add(img);
    }).catch(err => {
      console.error('Error loading image:', err);
    });
    
    // Reset states
    setPath([]);
    setPathExists(false);
    setIsPlaying(false);
    setIsDrawing(true);
    setCarPosition({ x: 50, y: 50 });
    fabricCanvas.isDrawingMode = true;
    toast({
      title: "¡Tablero limpio!",
      description: "Dibuja un nuevo camino para el coche.",
    });
  };
  
  return (
    <div className="flex flex-col w-full gap-4">
      <Card className="border-4 border-purple-300 shadow-lg overflow-hidden">
        <CardContent className="p-4">
          <div ref={containerRef} className="w-full relative">
            <canvas ref={canvasRef} />
            
            {/* Animated car that follows the path */}
            {isPlaying && path.length > 0 && (
              <motion.img
                src="/lovable-uploads/coche_animado.gif"
                className="absolute z-10 pointer-events-none"
                style={{
                  width: 40,
                  height: 40,
                  x: carPosition.x - 20,
                  y: carPosition.y - 20
                }}
                animate={{
                  x: path.map(p => p.x - 20),
                  y: path.map(p => p.y - 20),
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
              />
            )}
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-between gap-4">
        <Button
          onClick={() => {
            if (fabricCanvas) {
              setIsDrawing(true);
              fabricCanvas.isDrawingMode = true;
              toast({
                title: "Modo dibujo activado",
                description: "Dibuja un camino para el coche.",
              });
            }
          }}
          variant="outline"
          className={`flex-1 kids-text ${isDrawing ? 'bg-purple-200 border-purple-500' : ''}`}
          disabled={isPlaying}
        >
          Dibujar Camino
        </Button>
        
        <Button
          onClick={handlePlay}
          className="flex-1 bg-purple-600 hover:bg-purple-700 text-white kids-text"
          disabled={isPlaying || !pathExists}
        >
          <ArrowRight className="mr-2 h-5 w-5" /> Jugar
        </Button>
        
        <Button
          onClick={handleClear}
          variant="outline"
          className="flex-1 border-red-300 hover:bg-red-100 text-red-500 kids-text"
          disabled={isPlaying}
        >
          <Trash2 className="mr-2 h-5 w-5" /> Borrar
        </Button>
      </div>
    </div>
  );
};

export default DrawPathGame;
