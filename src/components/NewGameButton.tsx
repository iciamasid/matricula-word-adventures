
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useGame } from "@/context/GameContext";
import { Plus, Star } from "lucide-react";

const NewGameButton: React.FC = () => {
  const { generateNewPlate, gamesPlayed } = useGame();
  const [isAnimating, setIsAnimating] = useState(false);
  
  const handleClick = () => {
    setIsAnimating(true);
    generateNewPlate();
    setTimeout(() => setIsAnimating(false), 600);
  };
  
  return (
    <div className="text-center space-y-2 bg-white p-4 rounded-lg shadow">
      <Button
        onClick={handleClick}
        className={`px-6 py-6 bg-game-blue hover:bg-game-blue/90 ${isAnimating ? "animate-bounce" : ""}`}
      >
        <Plus className="mr-2 h-4 w-4" /> Nueva matrícula
      </Button>
      
      <div className="flex items-center justify-center text-xs text-gray-500">
        <Star className="w-3 h-3 mr-1 text-game-yellow" />
        <span>{gamesPlayed} partidas jugadas</span>
      </div>
    </div>
  );
};

export default NewGameButton;
