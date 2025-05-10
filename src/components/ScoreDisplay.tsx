
import React from "react";
import { useGame } from "@/context/GameContext";
import { Progress } from "@/components/ui/progress";
import { Trophy, Level } from "lucide-react";

const ScoreDisplay: React.FC = () => {
  const { score, totalPoints, level, highScore } = useGame();
  
  // Calculate progress to next level
  const levelPoints = level * 500;
  const previousLevelPoints = (level - 1) * 500;
  const pointsInThisLevel = totalPoints - previousLevelPoints;
  const progress = (pointsInThisLevel / (levelPoints - previousLevelPoints)) * 100;
  
  return (
    <div className="w-full max-w-xs space-y-3">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Trophy className="w-5 h-5 text-game-yellow mr-2" />
          <span className="font-medium">Puntuación: {score}</span>
        </div>
        <div className="flex items-center">
          <Level className="w-5 h-5 text-game-blue mr-2" />
          <span className="font-medium">Nivel: {level}</span>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-gray-500">
          <span>Progreso del nivel</span>
          <span>{Math.floor(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
        <div className="flex justify-between text-xs">
          <span>Total: {totalPoints} puntos</span>
          <span>Récord: {highScore}</span>
        </div>
      </div>
    </div>
  );
};

export default ScoreDisplay;
