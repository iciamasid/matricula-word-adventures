
import React from 'react';

interface VehicleOverlayProps {
  currentVehicle: any;
  showCarImage: boolean;
  carPosition: { x: number; y: number };
  carRotation: number;
  isMotorcycle: boolean;
}

const VehicleOverlay: React.FC<VehicleOverlayProps> = ({
  currentVehicle,
  showCarImage,
  carPosition,
  carRotation,
  isMotorcycle
}) => {
  const getSelectedVehicleImage = () => {
    if (!currentVehicle) return "";
    return `/lovable-uploads/${currentVehicle.image}`;
  };

  if (!currentVehicle || !showCarImage) return null;

  return (
    <div 
      className="absolute pointer-events-none" 
      style={{
        width: isMotorcycle ? '120px' : '140px',
        height: isMotorcycle ? '90px' : '110px',
        left: `${carPosition.x - (isMotorcycle ? 60 : 70)}px`,
        top: `${carPosition.y - (isMotorcycle ? 45 : 55)}px`,
        transform: `rotate(${carRotation}deg)`,
        transition: 'transform 0.3s ease-out, left 0.2s linear, top 0.2s linear',
        zIndex: 50 
      }}
    >
      <img 
        src={getSelectedVehicleImage()} 
        alt={`Selected ${isMotorcycle ? 'motorcycle' : 'car'}`} 
        className="w-full h-full object-contain" 
      />
    </div>
  );
};

export default VehicleOverlay;
