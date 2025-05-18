import { Circle, Rect, Polygon, Shadow } from 'fabric';

// Create a more detailed car object using Fabric.js shapes
export const createCar = (left: number, top: number, color = '#E74C3C', scale = 1) => {
  // Determine car color based on game selection - using WHITE for all parts
  const carColor = () => {
    return '#FFFFFF'; // Always WHITE for the drawn car
  };
  
  const actualColor = carColor();

  // Enhanced car body - smoother edges
  const body = new Rect({
    left: left,
    top: top,
    width: 64 * scale,
    height: 30 * scale,
    fill: actualColor,
    rx: 12 * scale,
    ry: 12 * scale,
    originX: 'center',
    originY: 'center',
    selectable: false,
    shadow: new Shadow({
      color: 'rgba(0,0,0,0.1)',
      blur: 4 * scale,
      offsetX: 0,
      offsetY: 1 * scale
    })
  });

  // Improved car roof with more car-like shape
  const roof = new Rect({
    left: left - 2 * scale,
    top: top - 15 * scale,
    width: 42 * scale,
    height: 20 * scale,
    fill: actualColor,
    rx: 10 * scale,
    ry: 10 * scale,
    originX: 'center',
    originY: 'center',
    selectable: false
  });
  
  // Front windshield - simplified to WHITE
  const frontWindshield = new Polygon([
    { x: left - 10 * scale, y: top - 7 * scale },
    { x: left + 8 * scale, y: top - 7 * scale },
    { x: left + 10 * scale, y: top - 15 * scale },
    { x: left - 8 * scale, y: top - 15 * scale }
  ], {
    fill: actualColor,
    selectable: false,
    originX: 'center',
    originY: 'center'
  });
  
  // Car bumper/grill - simplified to WHITE
  const bumper = new Rect({
    left: left + 28 * scale,
    top: top + 2 * scale,
    width: 10 * scale,
    height: 16 * scale,
    fill: actualColor,
    rx: 2 * scale,
    ry: 2 * scale,
    originX: 'center',
    originY: 'center',
    selectable: false
  });
  
  // Side window - simplified to WHITE
  const sideWindow = new Rect({
    left: left - 15 * scale,
    top: top - 10 * scale,
    width: 15 * scale,
    height: 10 * scale,
    fill: actualColor,
    rx: 3 * scale,
    ry: 3 * scale,
    originX: 'center',
    originY: 'center',
    selectable: false
  });
  
  // Wheel positions - removed wheels as requested
  const wheelConfig = [
    { x: left - 20 * scale, y: top + 15 * scale }, // rear wheel
    { x: left + 0 * scale, y: top + 16 * scale },  // middle wheel
    { x: left + 20 * scale, y: top + 15 * scale }  // front wheel
  ];
  
  // Use empty circles with white fill for wheels
  const wheel1 = new Circle({
    left: wheelConfig[0].x,
    top: wheelConfig[0].y,
    radius: 8 * scale,
    fill: actualColor,
    originX: 'center',
    originY: 'center',
    selectable: false
  });
  
  const wheel2 = new Circle({
    left: wheelConfig[1].x,
    top: wheelConfig[1].y,
    radius: 8 * scale,
    fill: actualColor,
    originX: 'center',
    originY: 'center',
    selectable: false
  });
  
  const wheel3 = new Circle({
    left: wheelConfig[2].x,
    top: wheelConfig[2].y,
    radius: 8 * scale,
    fill: actualColor,
    originX: 'center',
    originY: 'center',
    selectable: false
  });
  
  // Wheel rims - simplified to WHITE
  const rim1 = new Circle({
    left: wheelConfig[0].x,
    top: wheelConfig[0].y,
    radius: 4 * scale,
    fill: actualColor,
    originX: 'center',
    originY: 'center',
    selectable: false
  });
  
  const rim2 = new Circle({
    left: wheelConfig[1].x,
    top: wheelConfig[1].y,
    radius: 4 * scale,
    fill: actualColor,
    originX: 'center',
    originY: 'center',
    selectable: false
  });
  
  const rim3 = new Circle({
    left: wheelConfig[2].x,
    top: wheelConfig[2].y,
    radius: 4 * scale,
    fill: actualColor,
    originX: 'center',
    originY: 'center',
    selectable: false
  });

  // Headlight - simplified to WHITE
  const headlight = new Circle({
    left: left + 30 * scale,
    top: top + 4 * scale,
    radius: 4 * scale,
    fill: actualColor,
    stroke: actualColor,
    strokeWidth: 1,
    originX: 'center',
    originY: 'center',
    selectable: false
  });
  
  // Taillight - simplified to WHITE
  const taillight = new Circle({
    left: left - 30 * scale,
    top: top + 4 * scale,
    radius: 3 * scale,
    fill: actualColor,
    stroke: actualColor,
    strokeWidth: 1,
    originX: 'center',
    originY: 'center',
    selectable: false
  });
  
  // Door handle - simplified to WHITE
  const doorHandle = new Rect({
    left: left - 8 * scale,
    top: top - 1 * scale,
    width: 6 * scale,
    height: 2 * scale,
    fill: actualColor,
    rx: 1 * scale,
    ry: 1 * scale,
    originX: 'center',
    originY: 'center',
    selectable: false
  });
  
  return {
    body,
    roof,
    wheel1,
    wheel2,
    wheel3,
    headlight,
    rim1,
    rim2, 
    rim3,
    frontWindshield,
    sideWindow,
    bumper,
    taillight,
    doorHandle
  };
};

// Create start point - WHITE color
export const createStartPoint = (left: number, top: number) => {
  return new Circle({
    left,
    top,
    radius: 10,
    fill: '#FFFFFF', // WHITE color
    stroke: '#FFFFFF',
    strokeWidth: 2,
    selectable: false
  });
};

// Create end point - WHITE color
export const createEndPoint = (left: number, top: number) => {
  return new Circle({
    left,
    top,
    radius: 10,
    fill: '#FFFFFF', // WHITE color
    stroke: '#FFFFFF',
    strokeWidth: 2,
    selectable: false
  });
};

export interface CarObject {
  body: Rect;
  roof: Rect;
  wheel1: Circle;
  wheel2: Circle;
  wheel3: Circle;
  headlight: Circle;
  rim1: Circle;
  rim2: Circle;
  rim3: Circle;
  frontWindshield: Polygon;
  sideWindow: Rect;
  bumper: Rect;
  taillight: Circle;
  doorHandle: Rect;
}

export interface CarColor {
  id: string;
  name: string;
  image: string;
  color: string;
  unlockedAtLevel?: number; // Add this property for tracking when car unlocks
}
