
import { Canvas, Circle, FabricImage, Rect, Text } from 'fabric';

// Create a more realistic car object using Fabric.js shapes
export const createCar = (left: number, top: number, color = '#E74C3C', scale = 1) => {
  // Car body
  const body = new Rect({
    left: left,
    top: top,
    width: 70 * scale,
    height: 35 * scale,
    fill: color,
    rx: 12 * scale,
    ry: 12 * scale,
    originX: 'center',
    originY: 'center',
    selectable: false,
    strokeWidth: 1,
    stroke: '#000000',
  });
  
  // Add shadow manually
  body.shadow = new fabric.Shadow({
    color: 'rgba(0,0,0,0.3)',
    offsetX: 0,
    offsetY: 3,
    blur: 5
  });

  // Car roof
  const roof = new Rect({
    left: left,
    top: top - 15 * scale,
    width: 40 * scale,
    height: 22 * scale,
    fill: shadeColor(color, -20), // Darker shade for the roof
    rx: 10 * scale,
    ry: 10 * scale,
    originX: 'center',
    originY: 'center',
    selectable: false
  });

  // Car windows
  const frontWindow = new Rect({
    left: left - 2 * scale,
    top: top - 15 * scale,
    width: 18 * scale,
    height: 12 * scale,
    fill: '#A2D9FF',
    opacity: 0.7,
    originX: 'center',
    originY: 'center',
    selectable: false
  });

  const backWindow = new Rect({
    left: left + 22 * scale,
    top: top - 15 * scale,
    width: 12 * scale,
    height: 12 * scale,
    fill: '#A2D9FF',
    opacity: 0.7,
    originX: 'center',
    originY: 'center',
    selectable: false
  });

  // Car wheels - less wheels for more realistic look
  const wheel1 = new Circle({
    left: left - 22 * scale,
    top: top + 18 * scale,
    radius: 8 * scale,
    fill: '#2D3436',
    stroke: '#7F8C8D',
    strokeWidth: 2,
    originX: 'center',
    originY: 'center',
    selectable: false
  });
  
  const wheel2 = new Circle({
    left: left + 22 * scale,
    top: top + 18 * scale,
    radius: 8 * scale,
    fill: '#2D3436',
    stroke: '#7F8C8D',
    strokeWidth: 2,
    originX: 'center',
    originY: 'center',
    selectable: false
  });

  // Headlights
  const headlight1 = new Circle({
    left: left - 32 * scale,
    top: top + 5 * scale,
    radius: 4 * scale,
    fill: '#F9E79F',
    originX: 'center',
    originY: 'center',
    selectable: false
  });
  
  const headlight2 = new Circle({
    left: left - 32 * scale,
    top: top - 5 * scale,
    radius: 4 * scale,
    fill: '#F9E79F',
    originX: 'center',
    originY: 'center',
    selectable: false
  });

  // Taillights
  const taillight = new Rect({
    left: left + 34 * scale,
    top: top,
    width: 4 * scale,
    height: 10 * scale,
    fill: '#E74C3C',
    originX: 'center',
    originY: 'center',
    selectable: false
  });
  
  return {
    body,
    roof,
    frontWindow,
    backWindow,
    wheel1,
    wheel2,
    headlight1,
    headlight2,
    taillight
  };
};

// Función para oscurecer o aclarar un color
function shadeColor(color: string, percent: number) {
  let R = parseInt(color.substring(1,3),16);
  let G = parseInt(color.substring(3,5),16);
  let B = parseInt(color.substring(5,7),16);

  R = Math.floor(R * (100 + percent) / 100);
  G = Math.floor(G * (100 + percent) / 100);
  B = Math.floor(B * (100 + percent) / 100);

  R = (R<255) ? R : 255;  
  G = (G<255) ? G : 255;  
  B = (B<255) ? B : 255;  

  R = (R<0) ? 0 : R;
  G = (G<0) ? 0 : G;
  B = (B<0) ? 0 : B;

  const RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
  const GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
  const BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));

  return "#"+RR+GG+BB;
}

// Crear iconos de origen y destino en lugar de puntos de colores
export const createStartPoint = (left: number, top: number, canvas?: Canvas) => {
  // Si tenemos acceso al canvas, podemos crear un icono de Madrid
  if (canvas) {
    // Usar un círculo como marcador temporal mientras se carga la imagen
    const startMarker = new Circle({
      left,
      top,
      radius: 20,
      fill: '#FFFFFF',
      stroke: '#2ECC71',
      strokeWidth: 3,
      selectable: false,
      originX: 'center',
      originY: 'center'
    });
    
    // Añadir texto "Madrid"
    const text = new Text('Madrid', {
      left: left,
      top: top + 25,
      fontSize: 14,
      fill: '#2ECC71',
      fontFamily: 'Fredoka',
      originX: 'center',
      originY: 'center',
      fontWeight: 'bold',
      selectable: false
    });

    // Añadir un ícono de ubicación sobre el círculo
    const pinIcon = new Text('📍', {
      left: left,
      top: top - 5,
      fontSize: 24,
      originX: 'center',
      originY: 'center',
      selectable: false
    });
    
    canvas.add(startMarker, text, pinIcon);
    return { startMarker, text, pinIcon };
  }

  // Si no tenemos canvas, retornamos un círculo simple como antes
  return new Circle({
    left,
    top,
    radius: 15,
    fill: '#FFFFFF',
    stroke: '#2ECC71',
    strokeWidth: 2,
    selectable: false,
    originX: 'center',
    originY: 'center'
  });
};

export const createEndPoint = (left: number, top: number, canvas?: Canvas, destinationName: string = 'Destino') => {
  // Si tenemos acceso al canvas, podemos crear un icono de destino personalizado
  if (canvas) {
    // Usar un círculo como marcador
    const endMarker = new Circle({
      left,
      top,
      radius: 20,
      fill: '#FFFFFF',
      stroke: '#E74C3C',
      strokeWidth: 3,
      selectable: false,
      originX: 'center',
      originY: 'center'
    });
    
    // Añadir texto con el nombre del destino
    const text = new Text(destinationName, {
      left: left,
      top: top + 25,
      fontSize: 14,
      fill: '#E74C3C',
      fontFamily: 'Fredoka',
      originX: 'center',
      originY: 'center',
      fontWeight: 'bold',
      selectable: false
    });

    // Añadir un ícono de bandera
    const flagIcon = new Text('🏁', {
      left: left,
      top: top - 5,
      fontSize: 24,
      originX: 'center',
      originY: 'center',
      selectable: false
    });
    
    canvas.add(endMarker, text, flagIcon);
    return { endMarker, text, flagIcon };
  }

  // Si no tenemos canvas, retornamos un círculo simple como antes
  return new Circle({
    left,
    top,
    radius: 15,
    fill: '#FFFFFF',
    stroke: '#E74C3C',
    strokeWidth: 2,
    selectable: false,
    originX: 'center',
    originY: 'center'
  });
};

export interface CarObject {
  body: Rect;
  roof: Rect;
  frontWindow: Rect;
  backWindow: Rect;
  wheel1: Circle;
  wheel2: Circle;
  headlight1: Circle;
  headlight2: Circle;
  taillight: Rect;
}

// Add fabric namespace for the Shadow object
declare namespace fabric {
  interface ShadowOptions {
    color: string;
    blur?: number;
    offsetX?: number;
    offsetY?: number;
  }

  class Shadow {
    constructor(options: ShadowOptions);
  }
}
