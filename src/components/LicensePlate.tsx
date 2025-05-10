
import React from "react";
import { motion } from "framer-motion";
import { useGame } from "@/context/GameContext";

const LicensePlate: React.FC = () => {
  const { licensePlate } = useGame();
  
  const numbers = licensePlate.substring(0, 4);
  const letters = licensePlate.substring(4);

  return (
    <motion.div
      className="license-plate py-6 px-8 rounded-md shadow-md w-full max-w-xs mb-6"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <div className="flex justify-center items-center">
        <div className="bg-blue-600 px-2 py-1 rounded-sm text-white text-sm font-bold">
          E
        </div>
        <div className="text-center text-6xl font-bold tracking-widest flex-1 flex justify-center">
          <span className="text-gray-800">{numbers}</span>
          <span className="text-game-blue ml-3">{letters}</span>
        </div>
        {/* EU icon removed */}
      </div>
    </motion.div>
  );
};

export default LicensePlate;
