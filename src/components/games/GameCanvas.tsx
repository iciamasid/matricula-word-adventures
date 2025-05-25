
import React, { RefObject } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import VehicleOverlay from './VehicleOverlay';
import DrawingIndicator from './DrawingIndicator';
import AnimationProgress from './AnimationProgress';

interface GameCanvasProps {
  containerRef: RefObject<HTMLDivElement>;
  canvasRef: RefObject<HTMLCanvasElement>;
  isMotorcycle: boolean;
  currentVehicle: any;
  showCarImage: boolean;
  carPosition: { x: number; y: number };
  carRotation: number;
  isDrawing: boolean;
  isPlaying: boolean;
  interpolatedPathLength: number;
  animationProgress: number;
}

const GameCanvas: React.FC<GameCanvasProps> = ({
  containerRef,
  canvasRef,
  isMotorcycle,
  currentVehicle,
  showCarImage,
  carPosition,
  carRotation,
  isDrawing,
  isPlaying,
  interpolatedPathLength,
  animationProgress
}) => {
  return (
    <Card className={`border-8 shadow-lg overflow-hidden ${isMotorcycle ? 'border-teal-300' : 'border-purple-300'}`} style={{
      borderStyle: 'solid'
    }}>
      <CardContent className="p-0 touch-none">
        <div ref={containerRef} className="w-full relative">
          <canvas ref={canvasRef} />
          
          <VehicleOverlay
            currentVehicle={currentVehicle}
            showCarImage={showCarImage}
            carPosition={carPosition}
            carRotation={carRotation}
            isMotorcycle={isMotorcycle}
          />
          
          <DrawingIndicator
            isDrawing={isDrawing}
            isMotorcycle={isMotorcycle}
          />
          
          <AnimationProgress
            isPlaying={isPlaying}
            interpolatedPathLength={interpolatedPathLength}
            animationProgress={animationProgress}
            isMotorcycle={isMotorcycle}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default GameCanvas;
