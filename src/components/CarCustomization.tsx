
import React from "react";
import { motion } from "framer-motion";
import { useGame } from "@/context/GameContext";
import { CarColor } from "./games/utils/carUtils";
import { useLanguage } from "@/context/LanguageContext";

interface CarCustomizationProps {
  isOpen?: boolean;
  onToggle?: () => void;
  embedded?: boolean;
}

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

const CarCustomization: React.FC<CarCustomizationProps> = () => {
  const { selectedCarColor, setSelectedCarColor } = useGame();
  const { isEnglish } = useLanguage();
  
  // Set background and border colors based on language
  const borderColorSelected = isEnglish ? "border-orange-500" : "border-purple-500";
  const bgColorSelected = isEnglish ? "bg-orange-100/50" : "bg-purple-100/50";
  
  const handleSelectCar = (car: CarColor) => {
    setSelectedCarColor(car);
  };
  
  return (
    <div className="w-full">
      <div className="grid grid-cols-3 gap-2">
        {carColors.map(car => (
          <motion.div 
            key={car.id} 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }} 
            className={`
              cursor-pointer rounded-md p-2 flex flex-col items-center justify-center
              border-2 transition-all duration-200
              ${selectedCarColor?.id === car.id 
                ? `${borderColorSelected} ${bgColorSelected}` 
                : 'border-transparent hover:border-gray-200'}
            `} 
            onClick={() => handleSelectCar(car)}
          >
            <img 
              src={`/lovable-uploads/${car.image}`} 
              alt={car.name} 
              className="h-14 w-auto" 
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CarCustomization;
