import React from "react";
import { motion } from "framer-motion";
import { useGame } from "@/context/GameContext";
import { Star, Globe } from "lucide-react";
import { Progress } from "@/components/ui/progress";
const ScorePanel: React.FC = () => {
  const {
    totalPoints,
    level,
    originInfo
  } = useGame();

  // Calculate progress percentage to next level (each level is 500 points)
  const levelProgress = totalPoints % 500 / 500 * 100;

  // World tour progress (0 to 10 levels)
  const worldTourProgress = Math.min(level / 10 * 100, 100);
  return <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      {/* Score Panel - Changed to Total Score */}
      <motion.div initial={{
      opacity: 0,
      x: -20
    }} animate={{
      opacity: 1,
      x: 0
    }} transition={{
      delay: 0.1
    }} whileHover={{
      scale: 1.02
    }} className="rounded-lg p-4 shadow-lg text-center bg-transparent">
        <div className="flex items-center justify-center gap-2">
          <motion.div animate={{
          rotate: totalPoints > 0 ? [0, 15, -15, 0] : 0,
          scale: totalPoints > 0 ? [1, 1.2, 1] : 1
        }} transition={{
          duration: 1,
          repeat: totalPoints > 0 ? 1 : 0
        }}>
            <div className="text-4xl">🏅</div>
          </motion.div>
          <h3 className="text-xl text-purple-800 kids-text font-normal">Puntos</h3>
        </div>
        <motion.p className="text-3xl text-purple-900 kids-text mt-1 font-normal" animate={totalPoints > 0 ? {
        scale: [1, 1.2, 1]
      } : {}} transition={{
        duration: 0.5
      }}>
          {totalPoints}
        </motion.p>
        
        {/* Added Level Progress Bar */}
        <div className="mt-2">
          <div className="flex justify-between text-xs text-purple-700 mb-1">
            <span>Nivel {level}</span>
            <span>Nivel {level + 1}</span>
          </div>
          <Progress value={levelProgress} className="h-2" />
          <p className="text-purple-600 mt-1 text-lg">
            {500 - totalPoints % 500} puntos para el siguiente nivel
          </p>
        </div>
      </motion.div>
      
      {/* Level Panel - Updated to show "Estás en [país]" with larger flag */}
      <motion.div className="rounded-lg p-4 bg-transparent shadow-lg text-center" initial={{
      opacity: 0,
      x: 20
    }} animate={{
      opacity: 1,
      x: 0
    }} transition={{
      delay: 0.1
    }} whileHover={{
      scale: 1.02
    }}>
        <div className="flex items-center justify-center gap-2">
          <motion.div animate={{
          rotate: [0, 10, -10, 0]
        }} transition={{
          duration: 2,
          repeat: Infinity
        }}>
            <div className="text-4xl">🌍</div>
          </motion.div>
          <h3 className="text-xl text-purple-800 kids-text font-normal">Nivel</h3>
        </div>
        <motion.p className="text-3xl text-purple-900 kids-text mt-1 font-normal" animate={level > 0 ? {
        scale: [1, 1.2, 1]
      } : {}} transition={{
        duration: 0.5
      }}>
          {level}
        </motion.p>
        <div className="flex items-center justify-center gap-1 mt-1">
          <motion.span className="text-5xl" animate={{
          scale: [1, 1.2, 1]
        }} transition={{
          duration: 2,
          repeat: Infinity
        }}>
            {originInfo.flag}
          </motion.span>
          <p className="text-purple-600 kids-text font-normal ml-2 text-base">
            Estás en {originInfo.city}, {originInfo.country}
          </p>
        </div>
        
        {/* World Tour Progress Bar with all flags */}
        <div className="mt-2">
          <div className="flex justify-between text-xs text-purple-700 mb-1">
            <span>Inicio</span>
            <span className="text-sm">¡Vuelta al mundo!</span>
          </div>
          <div className="relative">
            <Progress value={worldTourProgress} className="h-3" />
            <div className="absolute top-0 left-0 w-full flex justify-between px-1 pt-3">
              {[...Array(11)].map((_, i) => <div key={i} className="relative">
                  <div className={`w-2 h-2 rounded-full ${level >= i ? 'bg-green-500' : 'bg-gray-300'}`} />
                  {i === level && <motion.div className="absolute -top-1 -left-1 w-4 h-4 bg-purple-400 rounded-full opacity-50" animate={{
                scale: [1, 1.5, 1]
              }} transition={{
                duration: 1.5,
                repeat: Infinity
              }} />}
                  <div className="absolute -bottom-6 -left-2 text-xs">
                    {getLevelFlag(i)}
                  </div>
                </div>)}
            </div>
          </div>
        </div>
      </motion.div>
    </div>;
};

// Function to get flag emoji based on level
const getLevelFlag = (level: number) => {
  switch (level) {
    case 0:
      return "🇪🇸";
    case 1:
      return "🇫🇷";
    case 2:
      return "🇮🇹";
    case 3:
      return "🇷🇺";
    case 4:
      return "🇯🇵";
    case 5:
      return "🇦🇺";
    case 6:
      return "🇺🇸";
    case 7:
      return "🇲🇽";
    case 8:
      return "🇵🇪";
    case 9:
      return "🇦🇷";
    case 10:
      return "🇪🇸";
    default:
      return "🇪🇸";
  }
};
export default ScorePanel;