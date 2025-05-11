
export interface Point {
  x: number;
  y: number;
}

// Enhanced interpolation function for smoother curves
export const interpolatePoints = (point1: Point, point2: Point, steps: number): Point[] => {
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

// Helper function to extract points from all path commands
export const extractPointsFromPath = (pathObj: any): Point[] => {
  if (!pathObj || !pathObj.path || !Array.isArray(pathObj.path)) {
    console.error("Invalid path object:", pathObj);
    return [];
  }

  const rawPath = pathObj.path;
  const points: Point[] = [];
  let lastControl: Point | null = null;
  
  try {
    for (let i = 0; i < rawPath.length; i++) {
      const cmd = rawPath[i];
      
      if (!cmd || !Array.isArray(cmd)) {
        console.log("Skipping invalid command:", cmd);
        continue;
      }
      
      console.log("Processing command:", cmd[0]);
      
      // Handle different path commands
      switch (cmd[0]) {
        case 'M': // Move to
        case 'L': // Line to
          points.push({ x: cmd[1], y: cmd[2] });
          break;
          
        case 'Q': // Quadratic curve
          // Add the control point
          points.push({ x: cmd[1], y: cmd[2] });
          // Add several points along the curve for smoother interpolation
          for (let t = 0.2; t <= 0.8; t += 0.2) {
            const x = (1-t)*(1-t)*points[points.length-2].x + 2*(1-t)*t*cmd[1] + t*t*cmd[3];
            const y = (1-t)*(1-t)*points[points.length-2].y + 2*(1-t)*t*cmd[2] + t*t*cmd[4];
            points.push({ x, y });
          }
          // Add the end point
          points.push({ x: cmd[3], y: cmd[4] });
          break;
          
        case 'C': // Cubic curve
          // Add both control points and several points along the curve
          points.push({ x: cmd[1], y: cmd[2] }); // First control point
          lastControl = { x: cmd[3], y: cmd[4] }; // Second control point
          
          // Add several points along the curve for smoother interpolation
          for (let t = 0.2; t <= 0.8; t += 0.2) {
            const mt = 1-t;
            const x = mt*mt*mt*points[points.length-2].x + 
                    3*mt*mt*t*cmd[1] + 
                    3*mt*t*t*cmd[3] + 
                    t*t*t*cmd[5];
            const y = mt*mt*mt*points[points.length-2].y + 
                    3*mt*mt*t*cmd[2] + 
                    3*mt*t*t*cmd[4] + 
                    t*t*t*cmd[6];
            points.push({ x, y });
          }
          
          // Add the end point
          points.push({ x: cmd[5], y: cmd[6] });
          break;
          
        case 'Z': // Close path
          // If we have points and the first point is different from the last, close the path
          if (points.length > 1 && 
            (points[0].x !== points[points.length-1].x || points[0].y !== points[points.length-1].y)) {
            points.push({ ...points[0] });
          }
          break;
      }
    }
    
    console.log(`Extracted ${points.length} points from path`);
    return points;
  } catch (error) {
    console.error("Error extracting points from path:", error);
    return points;
  }
};
