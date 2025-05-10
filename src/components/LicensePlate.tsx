
import React from "react";
import { motion } from "framer-motion";
import { useGame } from "@/context/GameContext";
import { useIsMobile } from "@/hooks/use-mobile";

const LicensePlate: React.FC = () => {
  const { licensePlate } = useGame();
  const isMobile = useIsMobile();
  
  const numbers = licensePlate.substring(0, 4);
  const letters = licensePlate.substring(4);

  return (
    <motion.div
      className="license-plate py-4 px-6 rounded-md shadow-md w-full max-w-xs mb-2"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <div className="flex justify-center items-center">
        <div className="text-center flex justify-center">
          <span className={`text-gray-800 ${isMobile ? "text-3xl" : "text-4xl"} font-bold tracking-widest`}>
            {numbers}
          </span>
          <span className={`text-game-blue ml-2 ${isMobile ? "text-3xl" : "text-4xl"} font-bold tracking-widest`}>
            {letters}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default LicensePlate;
