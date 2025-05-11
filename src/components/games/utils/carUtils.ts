
import { Circle, Rect } from 'fabric';

// Create a simple car object using Fabric.js shapes
export const createCar = (left: number, top: number, color = '#9B59B6', scale = 1) => {
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
  headlight: Circle;
}
