
import React from "react";
import { useGame } from "@/context/GameContext";
import { Progress } from "@/components/ui/progress";
import { Trophy, BarChart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ScoreDisplay: React.FC = () => {
  const { score, totalPoints, level, highScore } = useGame();
  
  // Calculate progress to next level
  const levelPoints = level * 500;
  const previousLevelPoints = (level - 1) * 500;
  const pointsInThisLevel = totalPoints - previousLevelPoints;
  const progress = (pointsInThisLevel / (levelPoints - previousLevelPoints)) * 100;
  
  return (
    <div className="w-full max-w-xs space-y-3 bg-white p-6 rounded-lg shadow-lg">
      <AnimatePresence mode="wait">
        <motion.div 
          key={score}
          className="flex justify-between items-center"
          initial={{ scale: 1 }}
          animate={{ 
            scale: [1, 1.2, 1],
            transition: { duration: 0.5 }
          }}
        >
          <div className="flex items-center">
            <Trophy className="w-6 h-6 text-game-yellow mr-2" />
            <motion.span 
              className="font-bold text-2xl"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              {score}
            </motion.span>
          </div>
          <div className="flex items-center">
            <BarChart className="w-6 h-6 text-game-blue mr-2" />
            <span className="font-medium text-xl">Nivel: {level}</span>
          </div>
        </motion.div>
      </AnimatePresence>
      
      <div className="space-y-3">
        <div className="flex justify-between text-sm text-gray-700">
          <span>Progreso del nivel</span>
          <span className="font-medium">{Math.floor(progress)}%</span>
        </div>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 0.5 }}
        >
          <Progress value={progress} className="h-3" />
        </motion.div>
        <div className="flex justify-between text-sm">
          <motion.span
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Total: {totalPoints} puntos
          </motion.span>
          <motion.span
            whileHover={{ scale: 1.1, color: '#FFD700' }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="font-bold"
          >
            Récord: {highScore}
          </motion.span>
        </div>
      </div>
    </div>
  );
};

export default ScoreDisplay;
