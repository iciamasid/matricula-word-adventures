import React from "react";
import { motion } from "framer-motion";
import { useGame } from "@/context/GameContext";
import { CarColor } from "./games/utils/carUtils";
import { Lock } from "lucide-react";
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

  // Handle car selection
  const handleCarSelect = (car: CarColor) => {
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
  return <div className="w-full flex flex-col items-center">
      {/* Car selection instruction */}
      <h3 className="text-purple-800 text-center kids-text mb-4 text-lg font-semibold">
        ¡Selecciona el coche que conducirás!
      </h3>
      
      {/* Visual car grid */}
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4 bg-white/80 rounded-lg shadow-md w-full max-w-xl">
        {/* Unlocked cars */}
        {carColors.map(car => {
        const isLocked = level < car.unlockedAtLevel;
        const isSelected = selectedCarColor?.id === car.id;
        return <motion.div key={car.id} className={`relative flex flex-col items-center p-2 rounded-lg cursor-pointer transition-all duration-200
                ${isSelected ? 'bg-purple-100 ring-2 ring-purple-500' : 'hover:bg-purple-50'}
                ${isLocked ? 'opacity-70' : ''}
              `} onClick={() => handleCarSelect(car)} whileHover={{
          scale: 1.05
        }} whileTap={{
          scale: 0.95
        }}>
              <div className="relative">
                {/* Car image */}
                <img src={`/lovable-uploads/${car.image}`} alt={car.name} className={`w-16 h-16 object-contain ${isLocked ? 'grayscale opacity-70' : ''}`} />
                
                {/* Lock overlay for locked cars */}
                {isLocked && <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-black/30 rounded-full p-1">
                      <Lock className="w-6 h-6 text-white" />
                    </div>
                  </div>}
                
                {/* Selected indicator */}
                {isSelected && <motion.div className="absolute -right-2 -top-2 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center" initial={{
              scale: 0
            }} animate={{
              scale: 1
            }} transition={{
              type: "spring"
            }}>
                    <span className="text-white text-sm">✓</span>
                  </motion.div>}
              </div>
              
              {/* Car name (small) */}
              <p className="text-xs text-center mt-1 text-purple-800 font-medium truncate w-full">
                {car.name.split(" ")[0]}
                {isLocked && <span className="block text-gray-500">(Nivel {car.unlockedAtLevel})</span>}
              </p>
            </motion.div>;
      })}
      </div>
      
      {/* Display selected car larger */}
      {selectedCarColor && <motion.div className="mt-4 mb-2" initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.3
    }}>
          <p className="text-center text-sm text-purple-700 mb-1">Coche seleccionado:</p>
          
          
        </motion.div>}
    </div>;
};
export default CarCustomization;