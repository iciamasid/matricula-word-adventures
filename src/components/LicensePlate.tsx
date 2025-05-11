
import React from "react";
import { useGame } from "@/context/GameContext";
import { motion } from "framer-motion";

const LicensePlate: React.FC = () => {
  const { plateConsonants } = useGame();
  const CONSONANT_COLORS = ["bg-game-purple", "bg-game-blue", "bg-game-yellow"];

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
        {/* Car image - New addition */}
        <div className="absolute -left-16 -top-12 z-10">
          <motion.img 
            src="/lovable-uploads/45cc822d-687a-44d0-ad45-9078d02c48c9.png" 
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

        {/* License plate content */}
        <div className="flex items-center justify-center space-x-2 ml-10">
          {consonantsArray.map((consonant, index) => (
            <motion.div
              key={index}
              className={`${CONSONANT_COLORS[index]} w-12 h-12 rounded-lg flex items-center justify-center shadow-md`}
              initial={{ rotateY: 180, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.1 }}
            >
              <span className="text-white text-3xl kids-text">{consonant}</span>
            </motion.div>
          ))}
          <motion.div
            className="bg-purple-400 w-12 h-12 rounded-lg flex items-center justify-center shadow-md"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6 }}
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
