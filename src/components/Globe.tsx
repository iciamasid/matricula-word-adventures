
import React, { useEffect, useRef } from "react";
import { Canvas, Circle, Text } from "fabric";

interface GlobeProps {
  country: string;
  width?: number;
  height?: number;
}

const countryPositions: Record<string, { angle: number }> = {
  "España": { angle: 210 },
  "Spain": { angle: 210 },
  "Francia": { angle: 200 },
  "France": { angle: 200 },
  "Italia": { angle: 220 },
  "Italy": { angle: 220 },
  "Rusia": { angle: 260 },
  "Russia": { angle: 260 },
  "Japón": { angle: 310 },
  "Japan": { angle: 310 },
  "Estados Unidos": { angle: 140 },
  "United States": { angle: 140 },
  "México": { angle: 150 },
  "Mexico": { angle: 150 },
  "Argentina": { angle: 180 },
  "Australia": { angle: 330 },
  "Perú": { angle: 170 },
  "Peru": { angle: 170 },
};

const Globe: React.FC<GlobeProps> = ({ country, width = 150, height = 150 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<Canvas | null>(null);
  const animationRef = useRef<number | null>(null);
  const targetAngleRef = useRef<number>(countryPositions[country]?.angle || 0);
  const currentAngleRef = useRef<number>(0);
  
  // Cleanup function for animation and canvas
  const cleanupCanvas = () => {
    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    
    if (fabricCanvasRef.current) {
      fabricCanvasRef.current.dispose();
      fabricCanvasRef.current = null;
    }
  };

  useEffect(() => {
    if (!canvasRef.current) return;
    
    // Initialize canvas
    const canvas = new Canvas(canvasRef.current, {
      width,
      height,
      backgroundColor: '#c7deff',
    });
    
    fabricCanvasRef.current = canvas;
    
    // Draw the globe
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) * 0.4;
    
    // Create globe background
    const globe = new Circle({
      radius,
      left: centerX,
      top: centerY,
      fill: '#4fc1e9',
      originX: 'center',
      originY: 'center',
      selectable: false,
    });
    
    // Create simple continents
    const continents = [
      { color: '#a0d468', left: -radius * 0.5, top: -radius * 0.3, width: radius * 0.6, height: radius * 0.5 },
      { color: '#a0d468', left: -radius * 0.1, top: radius * 0.3, width: radius * 0.5, height: radius * 0.4 },
      { color: '#a0d468', left: radius * 0.3, top: -radius * 0.2, width: radius * 0.4, height: radius * 0.2 },
      { color: '#a0d468', left: radius * 0.2, top: 0, width: radius * 0.3, height: radius * 0.5 },
    ];
    
    canvas.add(globe);
    
    // Add continents to the globe
    continents.forEach((continent) => {
      const shape = new Circle({
        radius: radius * 0.2,
        left: centerX + continent.left,
        top: centerY + continent.top,
        fill: continent.color,
        width: continent.width,
        height: continent.height,
        originX: 'center',
        originY: 'center',
        selectable: false,
      });
      canvas.add(shape);
    });
    
    // Create marker for the current country
    const marker = new Circle({
      radius: radius * 0.15,
      left: centerX,
      top: centerY - radius,
      fill: '#fc6e51',
      originX: 'center',
      originY: 'center',
      selectable: false,
    });
    
    const label = new Text(country, {
      left: centerX,
      top: centerY + radius * 1.2,
      fontFamily: 'Fredoka, Comic Neue, cursive',
      fontSize: 18,
      fill: '#9b59b6',
      fontWeight: 'bold',
      originX: 'center',
      originY: 'center',
      selectable: false,
    });
    
    canvas.add(marker);
    canvas.add(label);
    
    // Animation function for rotating the globe
    const animate = () => {
      // Get target angle for this country
      const targetAngle = targetAngleRef.current;
      const currentAngle = currentAngleRef.current;
      
      // Determine direction and speed of rotation
      const angleDiff = targetAngle - currentAngle;
      const step = angleDiff * 0.02; // Smooth rotation
      
      // Update angle
      currentAngleRef.current += step;
      
      // Apply rotation to marker
      const markerAngle = (currentAngleRef.current * Math.PI) / 180;
      marker.set({
        left: centerX + Math.sin(markerAngle) * radius,
        top: centerY - Math.cos(markerAngle) * radius,
      });
      
      // Render the canvas
      canvas.renderAll();
      
      // Continue animation
      animationRef.current = requestAnimationFrame(animate);
    };
    
    // Start animation
    animationRef.current = requestAnimationFrame(animate);
    
    // Cleanup function
    return cleanupCanvas;
  }, [country, width, height]);
  
  return (
    <div className="globe-container relative overflow-hidden rounded-full border-4 border-purple-300 shadow-lg">
      <canvas ref={canvasRef} width={width} height={height} />
    </div>
  );
};

export default Globe;
