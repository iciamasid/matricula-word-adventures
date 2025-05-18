
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGame } from "@/context/GameContext";
import { CarColor } from "./games/utils/carUtils";
import { Lock, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import LockedCarPopup from "./LockedCarPopup";

// Available car colors
const carColors: CarColor[] = [
  {
    id: "2",
    name: "Azul",
    image: "cocheazul.png",
    color: "bg-blue-500",
    unlockedAtLevel: 0 // Always unlocked
  },
  {
    id: "3",
    name: "Amarillo",
    image: "cocheamarillo.png",
    color: "bg-yellow-500",
    unlockedAtLevel: 2
  },
  {
    id: "1",
    name: "Rojo",
    image: "cocherojo.png",
    color: "bg-red-500",
    unlockedAtLevel: 3
  },
  {
    id: "5",
    name: "Verde",
    image: "cocheverde.png",
    color: "bg-green-500",
    unlockedAtLevel: 5
  },
  {
    id: "4",
    name: "Morado con Llamas",
    image: "cochecolores.png",
    color: "bg-purple-500",
    unlockedAtLevel: 7
  },
  {
    id: "6",
    name: "Negro",
    image: "cochenegro.png",
    color: "bg-gray-900",
    unlockedAtLevel: 4
  },
  {
    id: "7",
    name: "Blanco",
    image: "cocheblanco.png",
    color: "bg-gray-100",
    unlockedAtLevel: 6
  },
  {
    id: "8",
    name: "Azul Racing",
    image: "cocheformulauno.png",
    color: "bg-sky-400",
    unlockedAtLevel: 8
  },
  {
    id: "9",
    name: "Dorado",
    image: "cocheoro.png",
    color: "bg-amber-300",
    unlockedAtLevel: 9
  }
];

const CarCustomization: React.FC = () => {
  const {
    selectedCarColor,
    setSelectedCarColor,
    level
  } = useGame();
  
  // State to control panel visibility
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  // State to control locked car popup
  const [showLockedCarPopup, setShowLockedCarPopup] = useState(false);
  // State to store the selected locked car for popup
  const [selectedLockedCar, setSelectedLockedCar] = useState<CarColor | null>(null);

  // Handle car selection
  const handleCarSelect = (car: CarColor) => {
    // Check if car is unlocked based on level
    if (level < car.unlockedAtLevel) {
      // Show popup for locked car
      setSelectedLockedCar(car);
      setShowLockedCarPopup(true);
      return;
    }
    
    // Set the selected car
    setSelectedCarColor(car);
    
    // Close the panel after selection
    setIsPanelOpen(false);

    // Play a selection sound
    try {
      const audio = new Audio('/lovable-uploads/level-up.mp3');
      audio.volume = 0.3;
      audio.play();
    } catch (e) {
      console.error("Could not play car selection sound", e);
    }
  };

  // Toggle panel visibility
  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  // Find the currently selected car
  const currentCar = selectedCarColor || carColors[0];

  return (
    <div className="w-full flex flex-col items-center">
      {/* Car selection instruction */}
      <h3 className="text-purple-800 text-center kids-text mb-4 text-lg font-semibold">
        ¡Selecciona el coche que conducirás!
      </h3>
      
      {/* Currently selected car (clickable to open panel) */}
      <motion.div 
        className="flex flex-col items-center p-3 bg-white/80 rounded-lg shadow-md cursor-pointer hover:bg-purple-50 mb-2"
        onClick={togglePanel}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="relative">
          <img 
            src={`/lovable-uploads/${currentCar.image}`} 
            alt={currentCar.name} 
            className="w-20 h-20 object-contain"
          />
          
          {/* Selected indicator */}
          <motion.div 
            className="absolute -right-2 -top-2 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring" }}
          >
            <span className="text-white text-sm">✓</span>
          </motion.div>
        </div>
        
        {/* Toggle indicator */}
        <div className="flex items-center mt-1 text-purple-700">
          <span className="mr-1 text-sm font-medium">
            {isPanelOpen ? "Cerrar" : "Cambiar coche"}
          </span>
          {isPanelOpen ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </div>
      </motion.div>
      
      {/* Car selection panel */}
      <AnimatePresence>
        {isPanelOpen && (
          <motion.div 
            className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4 bg-white/80 rounded-lg shadow-md w-full max-w-xl"
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {carColors.map(car => {
              const isLocked = level < car.unlockedAtLevel;
              const isSelected = selectedCarColor?.id === car.id;
              
              return (
                <motion.div 
                  key={car.id}
                  className={`relative flex flex-col items-center p-2 rounded-lg cursor-pointer transition-all duration-200
                    ${isSelected ? 'bg-purple-100 ring-2 ring-purple-500' : 'hover:bg-purple-50'}
                  `}
                  onClick={() => handleCarSelect(car)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="relative">
                    {/* Car image - always in color */}
                    <img 
                      src={`/lovable-uploads/${car.image}`} 
                      alt={car.name} 
                      className="w-16 h-16 object-contain"
                    />
                    
                    {/* Lock overlay for locked cars */}
                    {isLocked && (
                      <div className="absolute -right-2 -top-2 w-6 h-6 bg-pink-500/90 rounded-full flex items-center justify-center">
                        <Lock className="w-3 h-3 text-white" />
                      </div>
                    )}
                    
                    {/* Selected indicator */}
                    {isSelected && (
                      <motion.div 
                        className="absolute -right-2 -top-2 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring" }}
                      >
                        <span className="text-white text-sm">✓</span>
                      </motion.div>
                    )}
                  </div>
                  
                  {/* Car name (without "Coche" word) */}
                  <p className="text-xs text-center mt-1 text-purple-800 font-medium truncate w-full">
                    {car.name}
                    {isLocked && (
                      <span className="block text-gray-500">
                        (Nivel {car.unlockedAtLevel})
                      </span>
                    )}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Locked Car Popup */}
      {showLockedCarPopup && selectedLockedCar && (
        <LockedCarPopup
          carName={selectedLockedCar.name}
          level={selectedLockedCar.unlockedAtLevel}
          onClose={() => setShowLockedCarPopup(false)}
        />
      )}
    </div>
  );
};

export default CarCustomization;
