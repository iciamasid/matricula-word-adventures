import React from 'react';
import { Slider } from '@/components/ui/slider';
import { ArrowLeft, ArrowRight } from 'lucide-react';
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
  return <div className={`bg-white/90 rounded-lg p-4 shadow-sm border border-purple-200 ${disabled ? 'opacity-60' : ''}`}>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <h3 className="text-purple-800 kids-text font-normal text-base">Velocidad de Animación</h3>
        </div>
        
        <div className="flex items-center gap-3 pt-1">
          <div className="flex items-center gap-1 text-purple-700">
            <ArrowLeft className="h-4 w-4" />
            <span className="text-xs">Lento</span>
          </div>
          
          <Slider disabled={disabled} onValueChange={onValueChange} defaultValue={defaultValue} max={100} step={1} className="flex-1" />
          
          <div className="flex items-center gap-1 text-purple-700">
            <span className="text-xs">Rápido</span>
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </div>;
};
export default SpeedControl;