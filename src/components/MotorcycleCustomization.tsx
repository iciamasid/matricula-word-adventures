
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGame } from "@/context/GameContext";
import { MotorcycleType } from "../utils/motorcycleData";
import { Lock, Route } from "lucide-react";
import LockedMotorcyclePopup from "./LockedMotorcyclePopup";
import { Link } from "react-router-dom";
import { motorcycles } from "../utils/motorcycleData";

const MotorcycleCustomization: React.FC = () => {
  const {
    selectedMotorcycle,
    setSelectedMotorcycle,
    level,
    isMotorcycleMode
  } = useGame();

  // State to control panel visibility
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  // State to control locked motorcycle popup
  const [showLockedMotorcyclePopup, setShowLockedMotorcyclePopup] = useState(false);
  // State to store the selected locked motorcycle for popup
  const [selectedLockedMotorcycle, setSelectedLockedMotorcycle] = useState<MotorcycleType | null>(null);

  // Helper function to mark when we're navigating between pages
  const handleNavigation = () => {
    sessionStorage.setItem('navigatingBack', 'true');
  };

  // Handle motorcycle selection
  const handleMotorcycleSelect = (motorcycle: MotorcycleType) => {
    // Check if motorcycle is unlocked based on level
    if (level < motorcycle.unlockedAtLevel) {
      // Show popup for locked motorcycle
      setSelectedLockedMotorcycle(motorcycle);
      setShowLockedMotorcyclePopup(true);
      return;
    }

    // Set the selected motorcycle
    setSelectedMotorcycle(motorcycle);

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
  const currentMotorcycle = selectedMotorcycle || motorcycles[0];

  // If not in motorcycle mode, don't render anything
  if (!isMotorcycleMode) {
    return null;
  }

  return (
    <div className="w-full flex flex-col items-center">
      {/* Homogeneous design for motorcycle selection and CONDUCE buttons */}
      <div className="w-full flex flex-row items-center justify-center gap-4">
        {/* Motorcycle selection button with turquoise theme */}
        <motion.div 
          className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg shadow-lg overflow-hidden border-2 border-cyan-400" 
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
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-300">
                <circle cx="5.5" cy="17.5" r="3.5"/>
                <circle cx="18.5" cy="17.5" r="3.5"/>
                <path d="M15 5.5a1.5 1.5 0 1 0 3 0 1.5 1.5 0 1 0-3 0"/>
                <path d="M12 17.5V14l-3-3 4-6.5 3 3 3 6.5"/>
              </svg>
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
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.6, 0.8, 0.6]
              }}
              transition={{
                duration: 2,
                repeat: Infinity
              }}
            />
            <motion.div 
              className="absolute -left-1 -bottom-1 w-6 h-6 rounded-full bg-cyan-300 opacity-60 z-0"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.5, 0.7, 0.5]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: 0.5
              }}
            />
          </button>
        </motion.div>
        
        {/* CONDUCE button with turquoise theme */}
        <motion.div 
          className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg shadow-lg overflow-hidden border-2 border-cyan-400"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link 
            to="/draw-game" 
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
            
            {/* Decorative elements */}
            <motion.div 
              className="absolute -right-1 -top-1 w-8 h-8 rounded-full bg-yellow-300 opacity-70 z-0"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.7, 0.9, 0.7]
              }}
              transition={{
                duration: 2,
                repeat: Infinity
              }}
            />
            <motion.div 
              className="absolute -left-1 -bottom-1 w-6 h-6 rounded-full bg-cyan-300 opacity-60 z-0"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.5, 0.7, 0.5]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: 0.5
              }}
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
            {motorcycles.map(motorcycle => {
              const isLocked = level < motorcycle.unlockedAtLevel;
              const isSelected = selectedMotorcycle?.id === motorcycle.id;
              
              return (
                <motion.div
                  key={motorcycle.id}
                  className={`relative flex flex-col items-center p-2 rounded-lg cursor-pointer transition-all duration-200
                    ${isSelected ? 'bg-cyan-100 ring-2 ring-cyan-500' : 'hover:bg-cyan-50'}
                  `}
                  onClick={() => handleMotorcycleSelect(motorcycle)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="relative">
                    {/* Motorcycle image - placeholder until user provides actual images */}
                    <div className={`w-16 h-16 ${motorcycle.color} flex items-center justify-center rounded-lg`}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="5.5" cy="17.5" r="3.5"/>
                        <circle cx="18.5" cy="17.5" r="3.5"/>
                        <path d="M15 5.5a1.5 1.5 0 1 0 3 0 1.5 1.5 0 1 0-3 0"/>
                        <path d="M12 17.5V14l-3-3 4-6.5 3 3 3 6.5"/>
                      </svg>
                    </div>
                    
                    {/* Lock overlay for locked motorcycles */}
                    {isLocked && (
                      <div className="absolute -right-2 -top-2 w-6 h-6 bg-cyan-500/90 rounded-full flex items-center justify-center">
                        <Lock className="w-3 h-3 text-white" />
                      </div>
                    )}
                    
                    {/* Selected indicator */}
                    {isSelected && (
                      <motion.div 
                        className="absolute -right-2 -top-2 w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring" }}
                      >
                        <span className="text-white text-sm">✓</span>
                      </motion.div>
                    )}
                  </div>
                  
                  {/* Motorcycle name */}
                  <p className="text-xs text-center mt-1 text-cyan-800 font-medium truncate w-full">
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
    </div>
  );
};

export default MotorcycleCustomization;
