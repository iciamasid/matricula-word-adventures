
import React from "react";
import { useGame } from "@/context/GameContext";
import { Progress } from "@/components/ui/progress";
import { Trophy, BarChart, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ScoreDisplay: React.FC = () => {
  const { score, totalPoints, level, highScore } = useGame();
  
  // Calculate progress to next level
  const levelPoints = level * 500;
  const previousLevelPoints = (level - 1) * 500;
  const pointsInThisLevel = totalPoints - previousLevelPoints;
  const progress = (pointsInThisLevel / (levelPoints - previousLevelPoints)) * 100;
  
  return (
    <motion.div 
      className="w-full max-w-xs space-y-3 bg-white p-6 rounded-lg shadow-lg"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
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
            <motion.div 
              animate={{ 
                rotate: score > 0 ? [0, 15, -15, 15, 0] : 0,
                scale: score > 0 ? [1, 1.2, 1] : 1
              }} 
              transition={{ duration: 1.5, repeat: score > 0 ? 2 : 0 }}
              className="relative"
            >
              <Trophy className="w-10 h-10 text-game-yellow" />
              {score > 50 && (
                <motion.div 
                  className="absolute -top-2 -right-2"
                  animate={{ scale: [0.5, 1.2, 1] }}
                  transition={{ duration: 0.5, repeat: 3, repeatType: "reverse" }}
                >
                  <Star className="w-5 h-5 text-game-orange fill-game-orange" />
                </motion.div>
              )}
            </motion.div>
            <motion.div
              className="ml-2"
            >
              <motion.span 
                className="font-bold text-4xl"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                {score}
              </motion.span>
              <motion.div 
                className="text-sm text-gray-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                puntos esta ronda
              </motion.div>
            </motion.div>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center">
              <BarChart className="w-7 h-7 text-game-blue mr-2" />
              <motion.span 
                className="font-medium text-2xl"
                animate={level > 1 ? { 
                  scale: [1, 1.2, 1],
                  color: ['#33C3F0', '#9B59B6', '#33C3F0']
                } : {}}
                transition={{ duration: 2, repeat: level > 1 ? 1 : 0 }}
              >
                Nivel: {level}
              </motion.span>
            </div>
            <motion.span 
              className="text-sm text-game-green font-medium"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {level > 1 ? '¡Nivel desbloqueado!' : 'Primer nivel'}
            </motion.span>
          </div>
        </motion.div>
      </AnimatePresence>
      
      <div className="space-y-3">
        <div className="flex justify-between text-lg font-medium">
          <div className="flex items-center">
            <Trophy className="w-6 h-6 text-game-blue mr-2" />
            <motion.span 
              className="text-xl font-bold"
              animate={{ 
                scale: [1, 1.05, 1],
                transition: { duration: 2, repeat: Infinity }
              }}
            >
              TOTAL: {totalPoints} PUNTOS
            </motion.span>
          </div>
          <span className="font-medium">{Math.floor(progress)}%</span>
        </div>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <Progress value={progress} className="h-5" />
          <motion.div 
            className="absolute top-0 right-0 h-full w-2 bg-game-green rounded-full"
            animate={{ 
              x: [0, 5, 0],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{
              display: progress > 95 ? 'block' : 'none'
            }}
          />
        </motion.div>
        <div className="flex justify-between items-center">
          <motion.div
            className="flex items-center gap-1"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {level > 1 && (
              <motion.span 
                className="text-sm bg-game-green text-white px-2 py-1 rounded-full"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ¡Progresando!
              </motion.span>
            )}
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="flex items-center"
          >
            <Star className="w-5 h-5 text-game-yellow fill-game-yellow mr-1" />
            <span className="font-bold text-lg">
              Récord: {highScore}
            </span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ScoreDisplay;
