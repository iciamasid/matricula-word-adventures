
import React from 'react';

interface DrawingIndicatorProps {
  isDrawing: boolean;
  isMotorcycle: boolean;
}

const DrawingIndicator: React.FC<DrawingIndicatorProps> = ({
  isDrawing,
  isMotorcycle
}) => {
  if (!isDrawing) return null;

  return (
    <div className={`absolute top-0 left-0 right-0 text-white text-center py-1 z-20 rounded-t-md kids-text ${isMotorcycle ? 'bg-teal-500' : 'bg-green-500'}`}>
      ¡Dibuja ahora el camino!
    </div>
  );
};

export default DrawingIndicator;
