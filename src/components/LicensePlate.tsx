
import React from "react";
import { useGame } from "@/context/GameContext";
import { motion } from "framer-motion";

const LicensePlate: React.FC = () => {
  const { licensePlate, plateConsonants } = useGame();
  const CONSONANT_COLORS = ["bg-game-purple", "bg-game-blue", "bg-game-yellow"];

  // Get the numbers part (first 4 characters) from the license plate
  const numbers = licensePlate.substring(0, 4);
  
  // Ensure plateConsonants is treated as a string and safely convert to array
  const consonantsArray = typeof plateConsonants === 'string' ? plateConsonants.split('') : [];

  return (
    <motion.div
      className="w-full"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative bg-white p-3 rounded-lg border-4 border-purple-600 w-full flex items-center justify-center space-x-2">
        {/* Car image */}
        <div className="absolute -left-16 -top-12 z-10">
          <motion.img 
            src="/lovable-uploads/coche_portada.gif" 
            alt="Coche rojo" 
            className="h-24 w-auto"
            animate={{
              y: [0, -3, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* License plate content - numbers and letters */}
        <div className="flex items-center justify-center space-x-2 ml-10">
          {/* Numbers part with slot machine effect */}
          {numbers.split('').map((number, index) => (
            <motion.div
              key={`number-${index}`}
              className="bg-gray-200 w-9 h-12 rounded-lg flex items-center justify-center shadow-md"
              initial={{ rotateX: 180, opacity: 0 }}
              animate={{ rotateX: 0, opacity: 1 }}
              transition={{ 
                delay: index * 0.1,
                type: "spring"
              }}
            >
              <span className="text-black text-3xl kids-text">{number}</span>
            </motion.div>
          ))}
          
          {/* Separator */}
          <div className="h-12 flex items-center">
            <span className="text-purple-800 text-2xl kids-text">-</span>
          </div>
          
          {/* Consonants with slot machine effect */}
          {consonantsArray.map((consonant, index) => (
            <motion.div
              key={`consonant-${index}`}
              className={`${CONSONANT_COLORS[index]} w-9 h-12 rounded-lg flex items-center justify-center shadow-md`}
              initial={{ rotateY: 180, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              transition={{ delay: 0.4 + (index * 0.2) }}
              whileHover={{ scale: 1.1 }}
            >
              <span className="text-white text-3xl kids-text">{consonant}</span>
            </motion.div>
          ))}
          <motion.div
            className="bg-purple-400 w-9 h-12 rounded-lg flex items-center justify-center shadow-md"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.8 }}
            whileHover={{ scale: 1.1 }}
          >
            <span className="text-white text-3xl kids-text">?</span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default LicensePlate;
