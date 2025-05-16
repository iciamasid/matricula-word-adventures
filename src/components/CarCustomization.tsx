
import React from "react";
import { motion } from "framer-motion";
import { useGame } from "@/context/GameContext";
import { CarColor } from "./games/utils/carUtils";
import { useLanguage } from "@/context/LanguageContext";

// Available car colors
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

const CarCustomization: React.FC = () => {
  const { selectedCarColor, setSelectedCarColor } = useGame();
  const { isEnglish } = useLanguage();
  
  // Get current car index
  const currentIndex = selectedCarColor ? carColors.findIndex(car => car.id === selectedCarColor.id) : 0;
  
  // Handle clicking the car to cycle through options
  const handleCycleCar = () => {
    const nextIndex = (currentIndex + 1) % carColors.length;
    setSelectedCarColor(carColors[nextIndex]);
  };
  
  return (
    <div className="w-full flex justify-center">
      <motion.div 
        whileHover={{ scale: 1.1 }} 
        whileTap={{ scale: 0.95 }} 
        className="cursor-pointer flex justify-center"
        onClick={handleCycleCar}
      >
        <div className="relative">
          <img 
            src={`/lovable-uploads/${selectedCarColor?.image || carColors[0].image}`} 
            alt="Car" 
            className="h-16 w-auto" 
          />
          <motion.div 
            className="absolute inset-0" 
            animate={{ 
              y: [0, -3, 0, -2, 0],
              x: [0, 2, 0, -2, 0] 
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              repeatType: "mirror" 
            }}
          >
            <img 
              src={`/lovable-uploads/${selectedCarColor?.image || carColors[0].image}`} 
              alt="Car Animation" 
              className="h-16 w-auto opacity-0"
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default CarCustomization;
