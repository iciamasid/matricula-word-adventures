
import React from "react";
import { motion } from "framer-motion";
import { useGame } from "@/context/GameContext";
import { CarColor } from "./games/utils/carUtils";

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
  const { selectedCarColor } = useGame();
  
  return (
    <div className="w-full flex flex-col items-center">
      {/* Added instruction text above the car */}
      <p className="text-purple-800 text-center text-lg kids-text font-semibold mb-2 animate-pulse">
        ¡Pincha sobre el coche para elegir otro!
      </p>
      
      <motion.div 
        whileHover={{ scale: 1.1 }} 
        className="flex justify-center"
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
