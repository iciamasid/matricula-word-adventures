
import { Circle, Rect, Polygon, Shadow, Image as FabricImage } from 'fabric';

// Create a car using an image instead of drawn shapes
export const createCar = (left: number, top: number, color = '#E74C3C', scale = 1) => {
  // Determine which car image to use based on color
  const getCarImagePath = () => {
    switch (color.toLowerCase()) {
      case 'bg-yellow-500':
      case '#f1c40f': 
        return '/lovable-uploads/cocheamarillo.png'; // Yellow car
      case 'bg-blue-500':
      case '#33c3f0': 
        return '/lovable-uploads/cocheazul.png'; // Blue car
      case 'bg-red-500':
      case '#e74c3c': 
        return '/lovable-uploads/cocherojo.png'; // Red car
      default:
        return '/lovable-uploads/cocherojo.png'; // Default to red car
    }
  };
  
  // Create a placeholder object to return while the image loads
  const placeholder = {
    left,
    top,
    width: 64 * scale,
    height: 30 * scale,
    angle: 0
  };

  // Helper function to create the image object with proper sizing and positioning
  const createCarImage = (fabricCanvas: any) => {
    const imagePath = getCarImagePath();
    
    return new Promise<any>((resolve) => {
      // Load car image from path
      FabricImage.fromURL(imagePath, {
        // This fixes TS2559: Using object with callback instead of direct callback
        onLoad: (img) => {
          if (!img) {
            console.error("Failed to load car image");
            resolve(null);
            return;
          }
          
          // Scale and position the car image
          const scaleFactor = 0.15 * scale; // Adjust this based on the actual image size
          img.scale(scaleFactor);
          
          // Position at the center point
          img.set({
            left,
            top,
            originX: 'center',
            originY: 'center',
            selectable: false,
            // Apply a shadow for a nicer look
            shadow: new Shadow({
              color: 'rgba(0,0,0,0.3)',
              blur: 4 * scale,
              offsetX: 0,
              offsetY: 1 * scale
            })
          });
          
          if (fabricCanvas) {
            fabricCanvas.add(img);
            fabricCanvas.renderAll();
          }
          
          resolve(img);
        }
      });
    });
  };
  
  // Fix for error TS2304: Define carImage variable
  let carImage: any = null;
  
  // Return an object that matches the CarObject interface structure
  // but uses a single image instead of multiple shapes
  return {
    // The image will serve as the main body
    body: {
      ...placeholder,
      set: (props: any) => {
        if (carImage) {
          carImage.set(props);
        }
      }
    } as any,
    
    // These are placeholder objects to maintain compatibility with the existing code
    // They won't be rendered but will update the main image position/rotation
    roof: { ...placeholder, set: () => {} } as any,
    wheel1: { ...placeholder, set: () => {} } as any,
    wheel2: { ...placeholder, set: () => {} } as any,
    wheel3: { ...placeholder, set: () => {} } as any,
    headlight: { ...placeholder, set: () => {} } as any,
    rim1: { ...placeholder, set: () => {} } as any,
    rim2: { ...placeholder, set: () => {} } as any,
    rim3: { ...placeholder, set: () => {} } as any,
    frontWindshield: { ...placeholder, set: () => {} } as any,
    sideWindow: { ...placeholder, set: () => {} } as any,
    bumper: { ...placeholder, set: () => {} } as any,
    taillight: { ...placeholder, set: () => {} } as any,
    doorHandle: { ...placeholder, set: () => {} } as any,
    
    // Add the image property that will actually be used
    image: carImage,
    
    // Method to initialize the car image
    initImage: async (fabricCanvas: any) => {
      carImage = await createCarImage(fabricCanvas);
      return carImage;
    }
  };
};

// Modified end point (removing start point since we don't want it anymore)
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
  body: any;
  roof: any;
  wheel1: any;
  wheel2: any;
  wheel3: any;
  headlight: any;
  rim1: any;
  rim2: any;
  rim3: any;
  frontWindshield: any;
  sideWindow: any;
  bumper: any;
  taillight: any;
  doorHandle: any;
  image?: any;
  initImage?: (fabricCanvas: any) => Promise<any>;
}

export interface CarColor {
  id: string;
  name: string;
  image: string;
  color: string;
}
