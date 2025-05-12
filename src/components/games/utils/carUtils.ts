import { Circle, Rect, Polygon, Shadow } from 'fabric';

// Create a more detailed car object using Fabric.js shapes
export const createCar = (left: number, top: number, color = '#E74C3C', scale = 1) => {
  // Determine car color based on game selection
  const carColor = () => {
    switch (color.toLowerCase()) {
      case 'bg-yellow-500':
      case '#f1c40f': 
        return '#F1C40F'; // Yellow
      case 'bg-blue-500':
      case '#33c3f0': 
        return '#33C3F0'; // Blue
      case 'bg-red-500':
      case '#e74c3c': 
        return '#E74C3C'; // Red
      default:
        return color;
    }
  };
  
  const actualColor = carColor();
  
  // Calculate darker shade for roof and details
  let roofColor;
  let detailColor;
  let lighterColor;
  
  switch (actualColor) {
    case '#F1C40F': // Yellow
      roofColor = '#D4AC0D';
      detailColor = '#B7950B';
      lighterColor = '#F3D34A';
      break;
    case '#33C3F0': // Blue
      roofColor = '#2980B9';
      detailColor = '#2471A3';
      lighterColor = '#5DADE2';
      break;
    case '#E74C3C': // Red
      roofColor = '#C0392B';
      detailColor = '#A93226';
      lighterColor = '#EC7063';
      break;
    default:
      roofColor = '#C0392B';
      detailColor = '#A93226';
      lighterColor = '#EC7063';
  }

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
      color: 'rgba(0,0,0,0.3)',
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
    fill: roofColor,
    rx: 10 * scale,
    ry: 10 * scale,
    originX: 'center',
    originY: 'center',
    selectable: false
  });
  
  // Front windshield
  const frontWindshield = new Polygon([
    { x: left - 10 * scale, y: top - 7 * scale },
    { x: left + 8 * scale, y: top - 7 * scale },
    { x: left + 10 * scale, y: top - 15 * scale },
    { x: left - 8 * scale, y: top - 15 * scale }
  ], {
    fill: '#a4d0ff',
    selectable: false,
    originX: 'center',
    originY: 'center'
  });
  
  // Car bumper/grill
  const bumper = new Rect({
    left: left + 28 * scale,
    top: top + 2 * scale,
    width: 10 * scale,
    height: 16 * scale,
    fill: detailColor,
    rx: 2 * scale,
    ry: 2 * scale,
    originX: 'center',
    originY: 'center',
    selectable: false
  });
  
  // Side window 
  const sideWindow = new Rect({
    left: left - 15 * scale,
    top: top - 10 * scale,
    width: 15 * scale,
    height: 10 * scale,
    fill: '#a4d0ff',
    rx: 3 * scale,
    ry: 3 * scale,
    originX: 'center',
    originY: 'center',
    selectable: false
  });
  
  // Improved car wheels with rims
  const wheelConfig = [
    { x: left - 20 * scale, y: top + 15 * scale }, // rear wheel
    { x: left + 0 * scale, y: top + 16 * scale },  // middle wheel
    { x: left + 20 * scale, y: top + 15 * scale }  // front wheel
  ];
  
  // Tire outer parts
  const wheel1 = new Circle({
    left: wheelConfig[0].x,
    top: wheelConfig[0].y,
    radius: 8 * scale,
    fill: '#333333',
    originX: 'center',
    originY: 'center',
    selectable: false
  });
  
  const wheel2 = new Circle({
    left: wheelConfig[1].x,
    top: wheelConfig[1].y,
    radius: 8 * scale,
    fill: '#333333',
    originX: 'center',
    originY: 'center',
    selectable: false
  });
  
  const wheel3 = new Circle({
    left: wheelConfig[2].x,
    top: wheelConfig[2].y,
    radius: 8 * scale,
    fill: '#333333',
    originX: 'center',
    originY: 'center',
    selectable: false
  });
  
  // Wheel rims
  const rim1 = new Circle({
    left: wheelConfig[0].x,
    top: wheelConfig[0].y,
    radius: 4 * scale,
    fill: '#DDDDDD',
    originX: 'center',
    originY: 'center',
    selectable: false
  });
  
  const rim2 = new Circle({
    left: wheelConfig[1].x,
    top: wheelConfig[1].y,
    radius: 4 * scale,
    fill: '#DDDDDD',
    originX: 'center',
    originY: 'center',
    selectable: false
  });
  
  const rim3 = new Circle({
    left: wheelConfig[2].x,
    top: wheelConfig[2].y,
    radius: 4 * scale,
    fill: '#DDDDDD',
    originX: 'center',
    originY: 'center',
    selectable: false
  });

  // Improved headlight
  const headlight = new Circle({
    left: left + 30 * scale,
    top: top + 4 * scale,
    radius: 4 * scale,
    fill: '#F9E79F', // Brighter yellow
    stroke: '#F8C471',
    strokeWidth: 1,
    originX: 'center',
    originY: 'center',
    selectable: false,
    shadow: new Shadow({
      color: 'rgba(255,236,107,0.7)',
      blur: 3 * scale,
      offsetX: 0,
      offsetY: 0
    })
  });
  
  // Taillight
  const taillight = new Circle({
    left: left - 30 * scale,
    top: top + 4 * scale,
    radius: 3 * scale,
    fill: '#E74C3C', // Red light
    stroke: '#C0392B',
    strokeWidth: 1,
    originX: 'center',
    originY: 'center',
    selectable: false
  });
  
  // Door handle
  const doorHandle = new Rect({
    left: left - 8 * scale,
    top: top - 1 * scale,
    width: 6 * scale,
    height: 2 * scale,
    fill: lighterColor,
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

// Create start and end points for the path
export const createStartPoint = (left: number, top: number) => {
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

export const createEndPoint = (left: number, top: number) => {
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
}
