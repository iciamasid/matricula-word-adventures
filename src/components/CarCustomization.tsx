import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGame } from "@/context/GameContext";
import { CarColor } from "./games/utils/carUtils";
import { Lock, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import LockedCarPopup from "./LockedCarPopup";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

// Available car colors with updated unlock levels
const carColors: CarColor[] = [{
  id: "2",
  name: "Azul",
  image: "cocheazul.png",
  color: "bg-blue-500",
  unlockedAtLevel: 0 // Always unlocked
}, {
  id: "3",
  name: "Amarillo",
  image: "cocheamarillo.png",
  color: "bg-yellow-500",
  unlockedAtLevel: 2
}, {
  id: "1",
  name: "Rojo",
  image: "cocherojo.png",
  color: "bg-red-500",
  unlockedAtLevel: 3
}, {
  id: "5",
  name: "Verde",
  image: "cocheverde.png",
  color: "bg-green-500",
  unlockedAtLevel: 4
}, {
  id: "4",
  name: "Morado con Llamas",
  image: "cochecolores.png",
  color: "bg-purple-500",
  unlockedAtLevel: 5
}, {
  id: "6",
  name: "Negro",
  image: "cochenegro.png",
  color: "bg-gray-900",
  unlockedAtLevel: 6
}, {
  id: "7",
  name: "Blanco",
  image: "cocheblanco.png",
  color: "bg-gray-100",
  unlockedAtLevel: 7
}, {
  id: "8",
  name: "Azul Racing",
  image: "cocheformulauno.png",
  color: "bg-sky-400",
  unlockedAtLevel: 8
}, {
  id: "9",
  name: "Dorado",
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

  // State to control panel visibility
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  // State to control locked car popup
  const [showLockedCarPopup, setShowLockedCarPopup] = useState(false);
  // State to store the selected locked car for popup
  const [selectedLockedCar, setSelectedLockedCar] = useState<CarColor | null>(null);

  // Helper function to mark when we're navigating between pages
  const handleNavigation = () => {
    sessionStorage.setItem('navigatingBack', 'true');
  };

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
  return <div className="w-full flex flex-col items-center">
      {/* Homogeneous design for car selection and CONDUCE buttons */}
      <div className="w-full flex flex-row items-center justify-center gap-4">
        {/* Car selection button with same styling as CONDUCE */}
        <motion.div className="flex-1 bg-gradient-to-r from-purple-500 to-violet-600 rounded-lg shadow-lg overflow-hidden border-2 border-purple-400" whileHover={{
        scale: 1.02
      }} whileTap={{
        scale: 0.98
      }} initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.2
      }}>
          <button onClick={togglePanel} className="w-full p-4 flex items-center justify-center relative bg-teal-500 hover:bg-teal-400 text-violet-900 text-3xl rounded-3xl">
            <div className="flex flex-col items-center">
              {/* Car image */}
              <div className="relative w-16 h-16 mb-1">
                <img src={`/lovable-uploads/${currentCar.image}`} alt={currentCar.name} className="w-full h-full object-contain" />
                
                {/* Selected indicator */}
                <motion.div className="absolute -right-2 -top-2 w-5 h-5 bg-yellow-300 rounded-full flex items-center justify-center" initial={{
                scale: 0
              }} animate={{
                scale: 1
              }} transition={{
                type: "spring"
              }}>
                  <span className="text-purple-800 text-xs">✓</span>
                </motion.div>
              </div>
              
              {/* Toggle indicator */}
              <div className="flex items-center mt-1 text-white kids-text">
                <span className="mr-1 tracking-wide text-violet-900 text-xl font-semibold">
                  {isPanelOpen ? "Cerrar" : "Selecciona coche"}
                </span>
                {isPanelOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </div>
            
            {/* Decorative elements to match game-style buttons */}
            <motion.div className="absolute -right-1 -top-1 w-8 h-8 rounded-full bg-yellow-300 opacity-70 z-0" animate={{
            scale: [1, 1.2, 1],
            opacity: [0.6, 0.8, 0.6]
          }} transition={{
            duration: 2,
            repeat: Infinity
          }} />
            <motion.div className="absolute -left-1 -bottom-1 w-6 h-6 rounded-full bg-pink-400 opacity-60 z-0" animate={{
            scale: [1, 1.3, 1],
            opacity: [0.5, 0.7, 0.5]
          }} transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: 0.5
          }} />
          </button>
        </motion.div>
        
        {/* CONDUCE button with matching style */}
        <motion.div className="flex-1 bg-gradient-to-r from-purple-500 to-violet-600 rounded-lg shadow-lg overflow-hidden border-2 border-purple-400" initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.4
      }} whileHover={{
        scale: 1.02
      }} whileTap={{
        scale: 0.98
      }}>
          <Link to="/draw-game" onClick={handleNavigation} className="block w-full p-4 text-white relative">
            <div className="flex items-center justify-center">
              {/* Car icon */}
              <motion.div animate={{
              x: [-3, 3, -3],
              y: [-2, 2, -2],
              rotate: [0, 2, -2, 0]
            }} transition={{
              duration: 2,
              repeat: Infinity
            }} className="mr-3 text-2xl">
                🚗
              </motion.div>
              <span className="tracking-wide uppercase kids-text font-bold text-xl whitespace-normal">
                ¡CONDUCE!
              </span>
            </div>
            
            {/* Add decorative elements */}
            <motion.div className="absolute -right-1 -top-1 w-8 h-8 rounded-full bg-yellow-300 opacity-70 z-0" animate={{
            scale: [1, 1.2, 1],
            opacity: [0.7, 0.9, 0.7]
          }} transition={{
            duration: 2,
            repeat: Infinity
          }} />
            <motion.div className="absolute -left-1 -bottom-1 w-6 h-6 rounded-full bg-pink-400 opacity-60 z-0" animate={{
            scale: [1, 1.3, 1],
            opacity: [0.5, 0.7, 0.5]
          }} transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: 0.5
          }} />
          </Link>
        </motion.div>
      </div>
      
      {/* Car selection panel */}
      <AnimatePresence>
        {isPanelOpen && <motion.div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4 bg-white/80 rounded-lg shadow-md w-full max-w-xl mt-3" initial={{
        opacity: 0,
        height: 0,
        y: -10
      }} animate={{
        opacity: 1,
        height: 'auto',
        y: 0
      }} exit={{
        opacity: 0,
        height: 0,
        y: -10
      }} transition={{
        duration: 0.3
      }}>
            {carColors.map(car => {
          const isLocked = level < car.unlockedAtLevel;
          const isSelected = selectedCarColor?.id === car.id;
          return <motion.div key={car.id} className={`relative flex flex-col items-center p-2 rounded-lg cursor-pointer transition-all duration-200
                    ${isSelected ? 'bg-purple-100 ring-2 ring-purple-500' : 'hover:bg-purple-50'}
                  `} onClick={() => handleCarSelect(car)} whileHover={{
            scale: 1.05
          }} whileTap={{
            scale: 0.95
          }}>
                  <div className="relative">
                    {/* Car image - always in color */}
                    <img src={`/lovable-uploads/${car.image}`} alt={car.name} className="w-16 h-16 object-contain" />
                    
                    {/* Lock overlay for locked cars */}
                    {isLocked && <div className="absolute -right-2 -top-2 w-6 h-6 bg-pink-500/90 rounded-full flex items-center justify-center">
                        <Lock className="w-3 h-3 text-white" />
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
                  
                  {/* Car name without "Coche" word */}
                  <p className="text-xs text-center mt-1 text-purple-800 font-medium truncate w-full">
                    {car.name}
                    {isLocked && <span className="block text-gray-500">
                        (Nivel {car.unlockedAtLevel})
                      </span>}
                  </p>
                </motion.div>;
        })}
          </motion.div>}
      </AnimatePresence>
      
      {/* Locked Car Popup */}
      {showLockedCarPopup && selectedLockedCar && <LockedCarPopup carName={selectedLockedCar.name} level={selectedLockedCar.unlockedAtLevel} onClose={() => setShowLockedCarPopup(false)} />}
    </div>;
};
export default CarCustomization;