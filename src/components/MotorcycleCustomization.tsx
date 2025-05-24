import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGame } from "@/context/GameContext";
import { CarColor } from "./games/utils/carUtils";
import { Lock, Route, Bike } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import LockedCarPopup from "./LockedCarPopup";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

// Available motorcycle colors with unlock levels using new motorcycle images
const motorcycleColors: CarColor[] = [{
  id: "m1",
  name: "Blanca",
  image: "Motoblanca.png",
  color: "bg-white",
  unlockedAtLevel: 0 // Always unlocked
}, {
  id: "m2",
  name: "Roja Pequeña",
  image: "Motorojapequena.png",
  color: "bg-red-400",
  unlockedAtLevel: 2
}, {
  id: "m3",
  name: "Verde",
  image: "Motoverde.png",
  color: "bg-green-500",
  unlockedAtLevel: 3
}, {
  id: "m4",
  name: "Roja",
  image: "Motoroja.png",
  color: "bg-red-500",
  unlockedAtLevel: 4
}, {
  id: "m5",
  name: "Amarilla",
  image: "Motoamarilla.png",
  color: "bg-yellow-500",
  unlockedAtLevel: 5
}, {
  id: "m6",
  name: "Negra",
  image: "Motonegra.png",
  color: "bg-gray-900",
  unlockedAtLevel: 6
}, {
  id: "m7",
  name: "Azul",
  image: "Motoazul.png",
  color: "bg-blue-500",
  unlockedAtLevel: 7
}, {
  id: "m8",
  name: "Naranja",
  image: "Motonaranjaguay.png",
  color: "bg-orange-400",
  unlockedAtLevel: 8
}, {
  id: "m9",
  name: "Harley",
  image: "Motoharley.png",
  color: "bg-orange-500",
  unlockedAtLevel: 9
}];

const MotorcycleCustomization: React.FC = () => {
  const {
    selectedMotorcycle,
    setSelectedMotorcycle,
    level
  } = useGame();

  // State to control panel visibility
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  // State to control locked motorcycle popup
  const [showLockedCarPopup, setShowLockedCarPopup] = useState(false);
  // State to store the selected locked motorcycle for popup
  const [selectedLockedCar, setSelectedLockedCar] = useState<CarColor | null>(null);

  // Helper function to mark when we're navigating between pages
  const handleNavigation = () => {
    sessionStorage.setItem('navigatingBack', 'motorcycle-game');
  };

  // Handle motorcycle selection
  const handleCarSelect = (car: CarColor) => {
    // Check if motorcycle is unlocked based on level
    if (level < car.unlockedAtLevel) {
      // Show popup for locked motorcycle
      setSelectedLockedCar(car);
      setShowLockedCarPopup(true);
      return;
    }

    // Set the selected motorcycle
    setSelectedMotorcycle(car);

    // Close the panel after selection
    setIsPanelOpen(false);

    // Play a selection sound
    try {
      const audio = new Audio('/lovable-uploads/level-up.mp3');
      audio.volume = 0.3;
      audio.play();
    } catch (e) {
      console.error("Could not play motorcycle selection sound", e);
    }
  };

  // Toggle panel visibility
  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  // Find the currently selected motorcycle
  const currentCar = selectedMotorcycle || motorcycleColors[0];

  return (
    <div className="w-full flex flex-col items-center">
      {/* Design for motorcycle selection and CONDUCE buttons */}
      <div className="w-full flex flex-row items-center justify-center gap-4">
        {/* Motorcycle selection button */}
        <motion.div 
          className="flex-1 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-lg shadow-lg overflow-hidden border-2 border-teal-400"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <button
            onClick={togglePanel}
            className="w-full py-2 px-3 flex flex-col items-center justify-center relative text-xl bg-transparent text-white rounded-none"
          >
            {/* Motorcycle icon */}
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-2xl mb-1"
            >
              <Bike size={28} className="text-yellow-300" />
            </motion.div>
            
            {/* Text */}
            <div className="flex items-center mt-1 text-white kids-text">
              <span className="tracking-wide uppercase font-bold text-lg whitespace-normal">
                ELIGE MOTO
              </span>
            </div>
            
            {/* Decorative elements */}
            <motion.div
              className="absolute -right-1 -top-1 w-8 h-8 rounded-full bg-yellow-300 opacity-70 z-0"
              animate={{ scale: [1, 1.2, 1], opacity: [0.6, 0.8, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="absolute -left-1 -bottom-1 w-6 h-6 rounded-full bg-pink-400 opacity-60 z-0"
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.7, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
            />
          </button>
        </motion.div>
        
        {/* CONDUCE button */}
        <motion.div
          className="flex-1 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-lg shadow-lg overflow-hidden border-2 border-teal-400"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link 
            to="/motorcycle-drive-game" 
            onClick={handleNavigation} 
            className="block w-full py-2 px-3 text-white relative"
          >
            <div className="flex flex-col items-center justify-center">
              {/* Route icon */}
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-2xl mb-1"
              >
                <Route size={28} className="text-yellow-300" />
              </motion.div>
              <span className="tracking-wide uppercase kids-text font-bold text-lg whitespace-normal">
                ¡CONDUCE!
              </span>
            </div>
            
            {/* Add decorative elements */}
            <motion.div
              className="absolute -right-1 -top-1 w-8 h-8 rounded-full bg-yellow-300 opacity-70 z-0"
              animate={{ scale: [1, 1.2, 1], opacity: [0.7, 0.9, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="absolute -left-1 -bottom-1 w-6 h-6 rounded-full bg-pink-400 opacity-60 z-0"
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.7, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
            />
          </Link>
        </motion.div>
      </div>
      
      {/* Motorcycle selection panel */}
      <AnimatePresence>
        {isPanelOpen && (
          <motion.div
            className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4 bg-white/80 rounded-lg shadow-md w-full max-w-xl mt-3"
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {motorcycleColors.map(motorcycle => {
              const isLocked = level < motorcycle.unlockedAtLevel;
              const isSelected = selectedMotorcycle?.id === motorcycle.id;
              
              return (
                <motion.div
                  key={motorcycle.id}
                  className={`relative flex flex-col items-center p-2 rounded-lg cursor-pointer transition-all duration-200
                    ${isSelected ? 'bg-teal-100 ring-2 ring-teal-500' : 'hover:bg-teal-50'}
                  `}
                  onClick={() => handleCarSelect(motorcycle)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="relative">
                    {/* Motorcycle image */}
                    <img 
                      src={`/lovable-uploads/${motorcycle.image}`} 
                      alt={motorcycle.name} 
                      className="w-16 h-16 object-contain" 
                    />
                    
                    {/* Lock overlay for locked motorcycles */}
                    {isLocked && (
                      <div className="absolute -right-2 -top-2 w-6 h-6 bg-pink-500/90 rounded-full flex items-center justify-center">
                        <Lock className="w-3 h-3 text-white" />
                      </div>
                    )}
                    
                    {/* Selected indicator */}
                    {isSelected && (
                      <motion.div
                        className="absolute -right-2 -top-2 w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring" }}
                      >
                        <span className="text-white text-sm">✓</span>
                      </motion.div>
                    )}
                  </div>
                  
                  {/* Motorcycle name */}
                  <p className="text-xs text-center mt-1 text-teal-800 font-medium truncate w-full">
                    {motorcycle.name}
                    {isLocked && (
                      <span className="block text-gray-500">
                        (Nivel {motorcycle.unlockedAtLevel})
                      </span>
                    )}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Locked Motorcycle Popup */}
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

export default MotorcycleCustomization;
