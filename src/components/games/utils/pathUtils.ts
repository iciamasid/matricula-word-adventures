
import { Path } from 'fabric';

interface Point {
  x: number;
  y: number;
}

/**
 * Extracts points from a Fabric.js path object
 * @param pathObj The Fabric.js path object
 * @returns Array of points (x,y coordinates)
 */
const extractPointsFromPath = (pathObj: Path): Point[] => {
  if (!pathObj || !pathObj.path) {
    return [];
  }

  const points: Point[] = [];
  const path = pathObj.path;

  // Handle different path data formats
  path.forEach((item: any) => {
    // Each item has format [command, x, y, x2, y2, ...]
    // M = move to, L = line to, Q = quadratic curve to
    const command = item[0];
    
    if (command === 'M' || command === 'L') {
      // Move to or Line to commands have format [command, x, y]
      points.push({ x: item[1], y: item[2] });
    } 
    else if (command === 'Q') {
      // Quadratic curves have control point and end point
      // Format: [command, control_x, control_y, end_x, end_y]
      points.push({ x: item[3], y: item[4] }); // Add end point
    }
    else if (command === 'C') {
      // Cubic curves have two control points and end point
      // Format: [command, control1_x, control1_y, control2_x, control2_y, end_x, end_y]
      points.push({ x: item[5], y: item[6] }); // Add end point
    }
  });

  return points;
};

/**
 * Interpolate between two points
 * @param point1 Starting point
 * @param point2 Ending point
 * @param steps Number of points to generate
 * @returns Array of interpolated points
 */
const interpolatePoints = (point1: Point, point2: Point, steps: number): Point[] => {
  const points: Point[] = [];

  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    points.push({
      x: point1.x + (point2.x - point1.x) * t,
      y: point1.y + (point2.y - point1.y) * t
    });
  }

  return points;
};

/**
 * Calculate angle between two points
 * @param prevPoint Previous point
 * @param nextPoint Next point
 * @returns Angle in degrees
 */
const calculateAngle = (prevPoint: Point, nextPoint: Point): number => {
  return Math.atan2(nextPoint.y - prevPoint.y, nextPoint.x - prevPoint.x) * 180 / Math.PI;
};

/**
 * Generate a smoother path from original path points
 * @param originalPath Original path points
 * @param smoothFactor How much smoothing to apply (higher = smoother)
 * @returns Smoothed path points
 */
const generateSmoothPath = (originalPath: Point[], smoothFactor: number = 3): Point[] => {
  if (originalPath.length <= 2) return originalPath;
  
  const smoothedPath: Point[] = [];
  
  // Add first point
  smoothedPath.push(originalPath[0]);
  
  // Apply smoothing to middle points
  for (let i = 1; i < originalPath.length - 1; i++) {
    const prevPoint = originalPath[i - 1];
    const currentPoint = originalPath[i];
    const nextPoint = originalPath[i + 1];
    
    // Average the positions for smoothing
    const smoothedX = (prevPoint.x + currentPoint.x * smoothFactor + nextPoint.x) / (smoothFactor + 2);
    const smoothedY = (prevPoint.y + currentPoint.y * smoothFactor + nextPoint.y) / (smoothFactor + 2);
    
    smoothedPath.push({ x: smoothedX, y: smoothedY });
  }
  
  // Add last point
  smoothedPath.push(originalPath[originalPath.length - 1]);
  
  return smoothedPath;
};

// Here's the fixed export - changing "export { Point }" to "export type { Point }"
export { 
  extractPointsFromPath, 
  interpolatePoints,
  calculateAngle,
  generateSmoothPath
};

export type { Point };
