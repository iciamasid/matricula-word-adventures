
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger,
  SheetDescription,
  SheetFooter
} from '@/components/ui/sheet';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CarFront, Palette, Settings } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

interface CarCustomizerProps {
  onColorChange: (color: string) => void;
  onScaleChange: (scale: number) => void;
  onAddAccessory?: (accessory: string) => void;
}

const CAR_COLORS = [
  { value: '#E74C3C', label: 'Rojo', bg: 'bg-red-500' },
  { value: '#3498DB', label: 'Azul', bg: 'bg-blue-500' },
  { value: '#2ECC71', label: 'Verde', bg: 'bg-green-500' },
  { value: '#F39C12', label: 'Naranja', bg: 'bg-orange-400' },
  { value: '#9B59B6', label: 'Morado', bg: 'bg-purple-500' },
  { value: '#34495E', label: 'Azul Oscuro', bg: 'bg-slate-700' }
];

const CarCustomizer: React.FC<CarCustomizerProps> = ({ 
  onColorChange, 
  onScaleChange,
  onAddAccessory 
}) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="bg-white hover:bg-gray-100 text-purple-700 border border-purple-300 font-medium">
          <Settings className="mr-2 h-5 w-5" /> Personalizar coche
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[350px]">
        <SheetHeader>
          <SheetTitle className="flex items-center kids-text text-2xl text-purple-700">
            <CarFront className="mr-2 h-6 w-6" /> Personaliza tu coche
          </SheetTitle>
          <SheetDescription>
            Modifica el color, tamaño y otros aspectos de tu coche.
          </SheetDescription>
        </SheetHeader>
        
        <div className="py-6 space-y-6">
          {/* Color selector */}
          <div className="space-y-4">
            <h3 className="font-medium text-lg kids-text flex items-center">
              <Palette className="mr-2 h-5 w-5 text-purple-500" /> Color del coche
            </h3>
            
            <RadioGroup 
              defaultValue="#E74C3C" 
              onValueChange={onColorChange}
              className="grid grid-cols-3 gap-2"
            >
              {CAR_COLORS.map((color) => (
                <div key={color.value} className="flex items-center space-x-2">
                  <RadioGroupItem 
                    value={color.value} 
                    id={`color-${color.value}`} 
                    className="sr-only"
                  />
                  <Label 
                    htmlFor={`color-${color.value}`}
                    className={`w-full flex flex-col items-center p-2 border-2 rounded-lg cursor-pointer hover:bg-gray-50 ${color.bg} text-white`}
                  >
                    <span className="text-sm font-medium">{color.label}</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Size slider */}
          <div className="space-y-4">
            <h3 className="font-medium text-lg kids-text">Tamaño del coche</h3>
            <Slider
              defaultValue={[1]}
              max={1.5}
              min={0.5}
              step={0.1}
              onValueChange={(value) => onScaleChange(value[0])}
              className="py-4"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Pequeño</span>
              <span>Normal</span>
              <span>Grande</span>
            </div>
          </div>
        </div>

        <SheetFooter>
          <SheetTrigger asChild>
            <Button className="w-full bg-purple-600 hover:bg-purple-700 kids-text">
              ¡Listo!
            </Button>
          </SheetTrigger>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default CarCustomizer;
