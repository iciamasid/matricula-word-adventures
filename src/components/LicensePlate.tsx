
import React, { useEffect, useState } from "react";
import { useGame } from "@/context/GameContext";
import { motion } from "framer-motion";
import { toast } from "@/hooks/use-toast";
import { useLanguage } from "@/context/LanguageContext";
import { CarColor } from "./games/utils/carUtils";

const LicensePlate: React.FC = () => {
  const {
    licensePlate,
    plateConsonants,
    isGeneratingLicensePlate,
    selectedCarColor,
    submitSuccess,
    generateNewPlate,
    setSelectedCarColor
  } = useGame();
  
  const { t, isEnglish } = useLanguage();
  const [showTooltip, setShowTooltip] = useState(false);
  
  // Available car colors for cycling
  const carColors: CarColor[] = [
    {
      id: "1",
      name: "Coche Rojo",
      image: "cocherojo.png",
      color: "bg-red-500"
    }, 
    {
      id: "2",
      name: "Coche Azul",
      image: "cocheazul.png",
      color: "bg-blue-500"
    }, 
    {
      id: "3",
      name: "Coche Amarillo",
      image: "cocheamarillo.png",
      color: "bg-yellow-500"
    }
  ];

  // Car colors for the license plate letters - map to exact car colors
  const CONSONANT_COLORS = ["bg-red-500", "bg-blue-600", "bg-yellow-500"];

  // Get the numbers part (first 4 characters) from the license plate
  const numbers = licensePlate.substring(0, 4);

  // Ensure plateConsonants is treated as a string and safely convert to array
  const consonantsArray = typeof plateConsonants === 'string' ? plateConsonants.split('') : [];
  
  // Automatically generate new plate when a word is submitted successfully
  useEffect(() => {
    if (submitSuccess) {
      // Wait a bit to show success message, then generate new plate
      const timer = setTimeout(() => {
        generateNewPlate();
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [submitSuccess, generateNewPlate]);
  
  // Create arrays of random numbers and letters for the slot machine effect
  const getRandomDigits = () => {
    return Array(10).fill(0).map(() => Math.floor(Math.random() * 10));
  };
  
  const getRandomConsonants = () => {
    const consonants = "BCDFGHJKLMNPQRSTVWXYZ";
    return Array(10).fill('').map(() => consonants[Math.floor(Math.random() * consonants.length)]);
  };

  // Function to cycle through available cars
  const handleCycleCar = () => {
    // Get current car index
    const currentIndex = selectedCarColor ? carColors.findIndex(car => car.id === selectedCarColor.id) : 0;
    
    // Calculate next index (cycle through the array)
    const nextIndex = (currentIndex + 1) % carColors.length;
    
    // Update selected car
    setSelectedCarColor(carColors[nextIndex]);
    
    // Show toast with car name
    toast({
      title: isEnglish ? "Car changed!" : "¡Coche cambiado!",
      description: carColors[nextIndex].name
    });
  };

  // Show tooltip and hide after 5 seconds on initial render
  useEffect(() => {
    setShowTooltip(true);
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <motion.div 
      className="w-full" 
      initial={{ scale: 0.9, opacity: 0 }} 
      animate={{ scale: 1, opacity: 1 }} 
      transition={{ duration: 0.5 }}
    >
      {/* Car image centered above the license plate with horizontal loop animation */}
      <div className="flex justify-center w-full mb-3 relative h-16 overflow-hidden">
        {/* Tooltip message */}
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute -top-8 bg-purple-100 text-purple-800 px-3 py-1 rounded-full shadow-md text-sm kids-text"
          >
            {isEnglish ? "Click the car to change model!" : "¡Pincha en el coche para cambiar de modelo!"}
          </motion.div>
        )}
      
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
            className="h-16 w-auto absolute cursor-pointer"
            onClick={handleCycleCar}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
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
            className="h-16 w-auto absolute cursor-pointer"
            onClick={handleCycleCar}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
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
                rotateX: isGeneratingLicensePlate ? [0, 180, 0] : 0, 
                opacity: 1 
              }}
              transition={{ 
                delay: isGeneratingLicensePlate ? index * 0.2 : index * 0.4, 
                duration: isGeneratingLicensePlate ? 1.5 : 0.8,
                repeat: isGeneratingLicensePlate ? 2 : 0,
                type: "spring",
                stiffness: 80
              }}
            >
              {isGeneratingLicensePlate ? (
                <motion.div 
                  className="flex flex-col items-center"
                  animate={{ 
                    y: [0, -300],
                  }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: 4, 
                    ease: [0.45, 0.05, 0.55, 0.95],
                    repeatType: "loop"
                  }}
                >
                  {getRandomDigits().map((digit, i) => (
                    <span key={i} className="text-black text-3xl kids-text font-normal h-12 flex items-center">
                      {digit}
                    </span>
                  ))}
                  <span className="text-black text-3xl kids-text font-normal h-12 flex items-center">
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
          
          {/* Consonants with enhanced slot machine effect - WITH MATCHING CAR COLORS */}
          {consonantsArray.map((consonant, index) => (
            <motion.div 
              key={`consonant-${index}`} 
              className={`${CONSONANT_COLORS[index]} w-9 h-12 rounded-sm flex items-center justify-center shadow-inner overflow-hidden`}
              initial={{ rotateY: 180, opacity: 0 }}
              animate={{ 
                rotateY: isGeneratingLicensePlate ? [0, 180, 0] : 0, 
                opacity: 1 
              }}
              transition={{ 
                delay: isGeneratingLicensePlate ? 1 + index * 0.3 : 1.6 + index * 0.5,
                duration: isGeneratingLicensePlate ? 1 : 0.7,
                repeat: isGeneratingLicensePlate ? 2 : 0,
                type: "spring",
                stiffness: 70
              }}
              whileHover={{ scale: 1.1 }}
            >
              {isGeneratingLicensePlate ? (
                <motion.div 
                  className="flex flex-col items-center"
                  animate={{ 
                    y: [0, -300],
                  }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: 4, 
                    ease: [0.45, 0.05, 0.55, 0.95],
                    repeatType: "loop",
                    delay: index * 0.2
                  }}
                >
                  {getRandomConsonants().map((letter, i) => (
                    <span key={i} className="text-white text-3xl kids-text font-normal h-12 flex items-center">
                      {letter}
                    </span>
                  ))}
                  <span className="text-white text-3xl kids-text font-normal h-12 flex items-center">
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
