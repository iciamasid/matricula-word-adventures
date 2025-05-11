
import { Canvas, Circle, Rect, Image as FabricImage } from 'fabric';

// Create a simple car object using Fabric.js shapes
export const createCar = (left: number, top: number, color = '#E74C3C', scale = 1) => {
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
    fill: '#C0392B', // Darker shade of red for the roof
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

// Create a car from a provided image
export const createCarFromImage = (
  canvas: Canvas | null,
  left: number, 
  top: number, 
  scale = 0.5
): Promise<FabricImage> => {
  return new Promise((resolve, reject) => {
    if (!canvas) {
      reject(new Error('Canvas is not initialized'));
      return;
    }
    
    FabricImage.fromURL('/lovable-uploads/coche animado.gif', (img) => {
      if (!img) {
        console.error('Failed to load car image');
        reject(new Error('Failed to load car image'));
        return;
      }
      
      // Configure the image
      img.set({
        left,
        top,
        originX: 'center',
        originY: 'center',
        scaleX: scale,
        scaleY: scale,
        selectable: false,
        evented: false,
        zIndex: 100
      });
      
      console.log('Car image loaded successfully');
      resolve(img);
    }, { crossOrigin: 'anonymous' });
  });
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

export type CarImage = FabricImage;
