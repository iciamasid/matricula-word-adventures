
import { Circle, Rect } from 'fabric';

// Create a simple car object using Fabric.js shapes
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
  
  // Car body
  const body = new Rect({
    left: left,
    top: top,
    width: 60 * scale,
    height: 30 * scale,
    fill: actualColor,
    rx: 10 * scale,
    ry: 10 * scale,
    originX: 'center',
    originY: 'center',
    selectable: false
  });

  // Car roof - darker shade of the selected color
  let roofColor;
  switch (actualColor) {
    case '#F1C40F': // Yellow
      roofColor = '#D4AC0D';
      break;
    case '#33C3F0': // Blue
      roofColor = '#2980B9';
      break;
    case '#E74C3C': // Red
      roofColor = '#C0392B';
      break;
    default:
      roofColor = '#C0392B';
  }
  
  const roof = new Rect({
    left: left,
    top: top - 15 * scale,
    width: 40 * scale,
    height: 20 * scale,
    fill: roofColor,
    rx: 8 * scale,
    ry: 8 * scale,
    originX: 'center',
    originY: 'center',
    selectable: false
  });

  // Car wheels - three wheels for better stability
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
    left: left + 0 * scale, // Middle wheel
    top: top + 15 * scale,
    radius: 8 * scale,
    fill: '#34495E',
    originX: 'center',
    originY: 'center',
    selectable: false
  });
  
  const wheel3 = new Circle({
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
    wheel3,
    headlight
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
}

export interface CarColor {
  id: string;
  name: string;
  image: string;
  color: string;
}
