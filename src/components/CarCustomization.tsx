
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
  },
  {
    id: "4",
    name: "Coche Morado con Llamas",
    image: "cochecolores.png",
    color: "bg-purple-500"
  },
  {
    id: "5",
    name: "Coche Verde",
    image: "cocheverde.png",
    color: "bg-green-500"
  }
];

const CarCustomization: React.FC = () => {
  const { selectedCarColor, setSelectedCarColor } = useGame();

  // Handle car selection
  const handleCarSelect = (car: CarColor) => {
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

  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex flex-wrap justify-center gap-4 mb-4 w-full">
        {carColors.map((car) => (
          <motion.div
            key={car.id}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`relative cursor-pointer p-2 rounded-lg ${
              selectedCarColor?.id === car.id ? 'ring-4 ring-purple-500 bg-purple-100' : ''
            }`}
            onClick={() => handleCarSelect(car)}
          >
            <img 
              src={`/lovable-uploads/${car.image}`}
              alt={car.name}
              className="w-16 h-16 object-contain"
            />
            {selectedCarColor?.id === car.id && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center"
              >
                ✓
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
      
      {/* Display selected car larger */}
      {selectedCarColor && (
        <motion.div 
          className="mt-2 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src={`/lovable-uploads/${selectedCarColor.image}`}
            alt={selectedCarColor.name}
            className="w-48 h-32 object-contain"
          />
          <p className={`text-center mt-2 font-semibold ${selectedCarColor.id === "4" ? "text-purple-600" : selectedCarColor.id === "5" ? "text-green-600" : `text-${selectedCarColor.color.split('-')[1]}-600`}`}>
            {selectedCarColor.name}
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default CarCustomization;
