
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useGame } from "@/context/GameContext";
import { Joystick, Star } from "lucide-react";
import { motion } from "framer-motion";

const NewGameButton: React.FC = () => {
  const { generateNewPlate, gamesPlayed } = useGame();
  const [isAnimating, setIsAnimating] = useState(false);
  
  const handleClick = () => {
    setIsAnimating(true);
    generateNewPlate();
    setTimeout(() => setIsAnimating(false), 600);
  };
  
  return (
    <motion.div 
      className="text-center space-y-2 bg-white p-3 rounded-lg shadow-lg w-full max-w-xs mb-2"
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Button
        onClick={handleClick}
        className={`px-4 py-6 w-full ${isAnimating ? "animate-bounce" : ""}`}
        style={{
          background: "linear-gradient(to bottom, #8B5CF6 0%, #6E59A5 100%)",
          boxShadow: "0 4px 0 #4C1D95",
          borderRadius: "12px",
          border: "2px solid #9b87f5"
        }}
      >
        <div className="flex items-center justify-center space-x-2">
          <motion.div
            animate={{
              rotate: isAnimating ? [0, 15, -15, 0] : 0,
            }}
            transition={{ duration: 0.5, repeat: isAnimating ? 2 : 0 }}
          >
            <Joystick className="mr-2 h-6 w-6 text-yellow-300" />
          </motion.div>
          <span className="text-xl font-bold kids-text">Nueva Matrícula</span>
        </div>
      </Button>

      <motion.div 
        className="flex items-center justify-center text-sm text-gray-500"
        initial={{ opacity: 0.6 }}
        whileHover={{ opacity: 1, scale: 1.05 }}
      >
        <Star className="w-4 h-4 mr-1 text-game-yellow" fill="gold" />
        <span className="kids-text">{gamesPlayed} partidas jugadas</span>
      </motion.div>
    </motion.div>
  );
};

export default NewGameButton;
