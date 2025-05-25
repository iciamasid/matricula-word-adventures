
import React from 'react';
import { Progress } from "@/components/ui/progress";

interface AnimationProgressProps {
  isPlaying: boolean;
  interpolatedPathLength: number;
  animationProgress: number;
  isMotorcycle: boolean;
}

const AnimationProgress: React.FC<AnimationProgressProps> = ({
  isPlaying,
  interpolatedPathLength,
  animationProgress,
  isMotorcycle
}) => {
  if (!isPlaying || interpolatedPathLength === 0) return null;

  return (
    <div className={`absolute bottom-0 left-0 right-0 backdrop-blur-sm text-white py-2 z-20 rounded-b-md ${isMotorcycle ? 'bg-teal-500/80' : 'bg-blue-500/80'}`}>
      <div className="flex flex-col items-center gap-1 px-4">
        <span className="text-xs font-medium kids-text">Llegando a tu destino...</span>
        <Progress value={animationProgress} className="h-3 w-full" />
        <span className="text-xs kids-text">{animationProgress}%</span>
      </div>
    </div>
  );
};

export default AnimationProgress;
