
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useGame } from "@/context/GameContext";
import { Plus, Star } from "lucide-react";
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
        className={`px-4 py-4 bg-game-blue hover:bg-game-blue/90 w-full ${isAnimating ? "animate-bounce" : ""}`}
      >
        <Plus className="mr-2 h-4 w-4" /> Nueva matrícula
      </Button>
      
      <div className="flex items-center justify-center text-xs text-gray-500">
        <Star className="w-3 h-3 mr-1 text-game-yellow" />
        <span>{gamesPlayed} partidas jugadas</span>
      </div>
    </motion.div>
  );
};

export default NewGameButton;
