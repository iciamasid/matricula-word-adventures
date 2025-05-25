
import React from 'react';
import { Slider } from '@/components/ui/slider';
import { Rabbit, Turtle } from 'lucide-react';

interface SpeedControlProps {
  disabled?: boolean;
  onValueChange: (value: number[]) => void;
  defaultValue?: number[];
}

const SpeedControl: React.FC<SpeedControlProps> = ({
  disabled = false,
  onValueChange,
  defaultValue = [50] // Default to middle of slider
}) => {
  return (
    <div className={`bg-white/90 rounded-lg p-4 shadow-sm border border-purple-200 ${disabled ? 'opacity-60' : ''}`}>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <h3 className="text-purple-800 kids-text font-normal text-base">Velocidad de conducción</h3>
        </div>
        
        <div className="flex items-center gap-4 pt-1">
          <div className="flex flex-col items-center gap-1 text-purple-700 min-w-[80px]">
            <Rabbit className="h-8 w-8 stroke-2" />
            <span className="text-xs font-bold text-center">MÁS RÁPIDO</span>
          </div>
          
          <Slider 
            disabled={disabled} 
            onValueChange={onValueChange} 
            defaultValue={defaultValue} 
            max={100} 
            step={1} 
            className="flex-1" 
          />
          
          <div className="flex flex-col items-center gap-1 text-purple-700 min-w-[80px]">
            <Turtle className="h-8 w-8 stroke-2" />
            <span className="text-xs font-bold text-center">MÁS DESPACIO</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeedControl;
