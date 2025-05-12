
import React, { useEffect, useState } from "react";
import { useGame } from "@/context/GameContext";
import { motion } from "framer-motion";

const LicensePlate: React.FC = () => {
  const {
    licensePlate,
    plateConsonants,
    isGeneratingLicensePlate,
    selectedCarColor,
    submitSuccess
  } = useGame();
  
  // Add state to track if we're generating from auto-submit
  const [isAutoGenerating, setIsAutoGenerating] = useState(false);
  
  // Monitor submitSuccess to trigger auto-generation animations
  useEffect(() => {
    if (submitSuccess) {
      setIsAutoGenerating(true);
      // Reset after animation completes
      const timer = setTimeout(() => {
        setIsAutoGenerating(false);
      }, 4000); // Slightly longer than the 3s delay for generateNewPlate
      
      return () => clearTimeout(timer);
    }
  }, [submitSuccess]);
  
  const CONSONANT_COLORS = ["bg-game-purple", "bg-game-blue", "bg-game-yellow"];

  // Get the numbers part (first 4 characters) from the license plate
  const numbers = licensePlate.substring(0, 4);

  // Ensure plateConsonants is treated as a string and safely convert to array
  const consonantsArray = typeof plateConsonants === 'string' ? plateConsonants.split('') : [];
  
  // Determine if any plate generation animation should be shown
  const showGenerationAnimation = isGeneratingLicensePlate || isAutoGenerating;
  
  // Slot machine animation for numbers and letters
  const slotMachineChars = ["7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "X", "Y", "Z"];
  
  return (
    <motion.div 
      className="w-full" 
      initial={{ scale: 0.9, opacity: 0 }} 
      animate={{ scale: 1, opacity: 1 }} 
      transition={{ duration: 0.5 }}
    >
      {/* Car image centered above the license plate with horizontal loop animation */}
      <div className="flex justify-center w-full mb-3 relative h-16 overflow-hidden">
        {selectedCarColor && (
          <motion.img 
            src={`/lovable-uploads/${selectedCarColor.image}`} 
            alt="Coche personalizado" 
            initial={{ x: -200 }}
            animate={{ 
              x: ["-100%", "100%"] 
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity,
              ease: "linear"
            }}
            className="h-16 w-auto absolute"
          />
        )}
        
        {!selectedCarColor && (
          <motion.img 
            src="/lovable-uploads/coche_portada.gif" 
            alt="Coche predeterminado" 
            initial={{ x: -200 }}
            animate={{ 
              x: ["-100%", "100%"] 
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity,
              ease: "linear"
            }}
            className="h-16 w-auto absolute"
          />
        )}
      </div>
      
      {/* Vintage license plate with EU flag */}
      <div 
        className="relative bg-gray-100 p-3 rounded-md border-2 border-gray-400 w-full flex items-center justify-center shadow-md" 
        style={{ background: 'linear-gradient(to bottom, #F1F0FB 0%, #aaadb0 100%)' }}
      >
        {/* License plate content - numbers and letters with space for the EU flag */}
        <div className="flex items-center justify-center space-x-2">
          {/* Numbers part with enhanced slot machine effect */}
          {numbers.split('').map((number, index) => (
            <motion.div 
              key={`number-${index}`} 
              className="bg-gray-200 w-9 h-12 rounded-sm flex items-center justify-center shadow-inner overflow-hidden"
              initial={{ rotateX: 180, opacity: 0 }}
              animate={{ 
                rotateX: showGenerationAnimation ? [0, 180] : 0, 
                opacity: 1 
              }}
              transition={{ 
                delay: showGenerationAnimation ? index * 0.2 : index * 0.4, 
                duration: showGenerationAnimation ? 2.5 : 0.8,
                repeat: showGenerationAnimation ? 1 : 0,
                type: "spring",
                stiffness: 80
              }}
            >
              {showGenerationAnimation ? (
                <motion.div
                  className="flex flex-col"
                  animate={{
                    y: [-400, 0],
                    transition: {
                      duration: 2.8,
                      delay: index * 0.15,
                      ease: [0.8, 0.2, 0.2, 1]
                    }
                  }}
                >
                  {/* Show rapid changing characters for slot machine effect */}
                  {slotMachineChars.map((char, charIndex) => (
                    <span 
                      key={charIndex} 
                      className="text-black text-3xl kids-text font-normal h-12 flex items-center justify-center"
                    >
                      {char}
                    </span>
                  ))}
                  <span className="text-black text-3xl kids-text font-normal h-12 flex items-center justify-center">
                    {number}
                  </span>
                </motion.div>
              ) : (
                <span className="text-black text-3xl kids-text font-normal">
                  {number}
                </span>
              )}
            </motion.div>
          ))}
          
          {/* Separator */}
          <div className="h-12 flex items-center">
            <span className="text-gray-700 text-2xl kids-text font-normal">-</span>
          </div>
          
          {/* Consonants with enhanced slot machine effect */}
          {consonantsArray.map((consonant, index) => (
            <motion.div 
              key={`consonant-${index}`} 
              className={`${CONSONANT_COLORS[index]} w-9 h-12 rounded-sm flex items-center justify-center shadow-inner overflow-hidden`}
              initial={{ rotateY: 180, opacity: 0 }}
              animate={{ 
                rotateY: showGenerationAnimation ? [0, 180] : 0, 
                opacity: 1 
              }}
              transition={{ 
                delay: showGenerationAnimation ? 2 + index * 0.3 : 1.6 + index * 0.5,
                duration: showGenerationAnimation ? 1 : 0.7,
                repeat: showGenerationAnimation ? 2 : 0,
                type: "spring",
                stiffness: 70
              }}
              whileHover={{ scale: 1.1 }}
            >
              {showGenerationAnimation ? (
                <motion.div
                  className="flex flex-col"
                  animate={{
                    y: [-400, 0],
                    transition: {
                      duration: 2.5,
                      delay: 2 + index * 0.2,
                      ease: [0.8, 0.2, 0.2, 1]
                    }
                  }}
                >
                  {/* Show changing letters for slot machine effect */}
                  {["B", "C", "D", "F", "G", "H", "J", "K", "L", "M", "N", "P"].map((char, charIndex) => (
                    <span 
                      key={charIndex} 
                      className="text-white text-3xl kids-text font-normal h-12 flex items-center justify-center"
                    >
                      {char}
                    </span>
                  ))}
                  <span className="text-white text-3xl kids-text font-normal h-12 flex items-center justify-center">
                    {consonant}
                  </span>
                </motion.div>
              ) : (
                <span className="text-white text-3xl kids-text font-normal">
                  {consonant}
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default LicensePlate;
