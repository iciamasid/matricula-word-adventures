
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useGame } from "@/context/GameContext";
import { CarColor } from "./games/utils/carUtils";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Car, Lock } from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Available car colors - reordered and added new cars
const carColors: CarColor[] = [{
  id: "2",
  name: "Coche Azul",
  image: "cocheazul.png",
  color: "bg-blue-500",
  unlockedAtLevel: 0 // Always unlocked
}, {
  id: "3",
  name: "Coche Amarillo",
  image: "cocheamarillo.png",
  color: "bg-yellow-500",
  unlockedAtLevel: 2
}, {
  id: "1",
  name: "Coche Rojo",
  image: "cocherojo.png",
  color: "bg-red-500",
  unlockedAtLevel: 3
}, {
  id: "5",
  name: "Coche Verde",
  image: "cocheverde.png",
  color: "bg-green-500",
  unlockedAtLevel: 5
}, {
  id: "4",
  name: "Coche Morado con Llamas",
  image: "cochecolores.png",
  color: "bg-purple-500",
  unlockedAtLevel: 7
}, {
  id: "6",
  name: "Coche Negro",
  image: "cochenegro.png",
  color: "bg-gray-900",
  unlockedAtLevel: 4
}, {
  id: "7",
  name: "Coche Blanco",
  image: "cocheblanco.png",
  color: "bg-gray-100",
  unlockedAtLevel: 6
}, {
  id: "8",
  name: "Coche Azul Racing",
  image: "cocheformulauno.png",
  color: "bg-sky-400",
  unlockedAtLevel: 8
}, {
  id: "9",
  name: "Coche Dorado",
  image: "cocheoro.png",
  color: "bg-amber-300",
  unlockedAtLevel: 9
}];

const CarCustomization: React.FC = () => {
  const {
    selectedCarColor,
    setSelectedCarColor,
    level
  } = useGame();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Handle car selection
  const handleCarSelect = (carId: string) => {
    const car = carColors.find(car => car.id === carId);
    
    if (!car) return;
    
    // Check if car is unlocked based on level
    if (level < car.unlockedAtLevel) {
      // Show toast for locked car
      toast({
        title: "¡Coche bloqueado!",
        description: "Tienes que subir de nivel para desbloquear este coche. Continúa formando palabras con las letras de las matrículas.",
        variant: "destructive"
      });
      return;
    }

    setSelectedCarColor(car);
    
    // Play a selection sound
    try {
      const audio = new Audio('/lovable-uploads/level-up.mp3');
      audio.volume = 0.3;
      audio.play();
    } catch (e) {
      console.error("Could not play car selection sound", e);
    }
  };
  
  // Filter cars to get unlocked and locked ones
  const unlockedCars = carColors.filter(car => level >= car.unlockedAtLevel);
  const lockedCars = carColors.filter(car => level < car.unlockedAtLevel);
  
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-sm mb-4">
        <Select onValueChange={handleCarSelect} value={selectedCarColor?.id}>
          <SelectTrigger className="w-full bg-white/90 border-purple-300">
            <div className="flex items-center gap-2">
              {selectedCarColor && (
                <img 
                  src={`/lovable-uploads/${selectedCarColor.image}`} 
                  alt={selectedCarColor.name} 
                  className="w-8 h-8 object-contain"
                />
              )}
              <SelectValue placeholder="Selecciona un coche" />
            </div>
          </SelectTrigger>
          <SelectContent className="max-h-[300px] overflow-y-auto">
            {/* Unlocked cars first */}
            {unlockedCars.map((car) => (
              <SelectItem key={car.id} value={car.id} className="cursor-pointer">
                <div className="flex items-center gap-2">
                  <img 
                    src={`/lovable-uploads/${car.image}`}
                    alt={car.name}
                    className="w-8 h-8 object-contain"
                  />
                  <span>{car.name}</span>
                  {car.unlockedAtLevel === 0 && (
                    <span className="ml-auto text-xs text-purple-500">(Siempre desbloqueado)</span>
                  )}
                </div>
              </SelectItem>
            ))}
            
            {/* Show locked cars with a lock icon */}
            {lockedCars.length > 0 && (
              <>
                <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground">
                  Coches bloqueados
                </div>
                {lockedCars.map((car) => (
                  <SelectItem key={car.id} value={car.id} className="cursor-pointer opacity-60">
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <img 
                          src={`/lovable-uploads/${car.image}`}
                          alt={car.name}
                          className="w-8 h-8 object-contain grayscale"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded">
                          <Lock className="w-4 h-4 text-white" />
                        </div>
                      </div>
                      <span>{car.name}</span>
                      <span className="ml-auto text-xs text-muted-foreground">
                        (Nivel {car.unlockedAtLevel})
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </>
            )}
          </SelectContent>
        </Select>
      </div>
      
      {/* Display selected car larger */}
      {selectedCarColor && (
        <motion.div 
          className="mt-2 mb-4" 
          initial={{
            opacity: 0,
            y: 20
          }} 
          animate={{
            opacity: 1,
            y: 0
          }} 
          transition={{
            duration: 0.3
          }}
        >
          <img 
            src={`/lovable-uploads/${selectedCarColor.image}`}
            alt={selectedCarColor.name}
            className="w-32 h-32 object-contain"
          />
        </motion.div>
      )}
    </div>
  );
};

export default CarCustomization;
