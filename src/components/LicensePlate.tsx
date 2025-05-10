
import React from "react";
import { motion } from "framer-motion";
import { useGame } from "@/context/GameContext";

const LicensePlate: React.FC = () => {
  const { licensePlate } = useGame();
  
  const numbers = licensePlate.substring(0, 4);
  const letters = licensePlate.substring(4);

  return (
    <motion.div
      className="license-plate py-4 px-6 rounded-md shadow-md w-full max-w-xs mb-4"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <div className="flex justify-between items-center">
        <div className="bg-blue-600 px-2 rounded-sm text-white text-xs font-bold">
          E
        </div>
        <div className="text-center text-3xl font-bold tracking-widest flex-1">
          <span className="text-gray-800">{numbers}</span>
          <span className="text-game-blue ml-2">{letters}</span>
        </div>
        <div className="bg-blue-600 rounded-full w-6 h-6 flex items-center justify-center">
          <span className="text-white text-xs">EU</span>
        </div>
      </div>
    </motion.div>
  );
};

export default LicensePlate;
