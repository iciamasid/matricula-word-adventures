
import React from "react";
import { motion } from "framer-motion";
import { useGame } from "@/context/GameContext";
import { Award, Star } from "lucide-react";

const ScorePanel: React.FC = () => {
  const { previousScore, level } = useGame();
  
  return (
    <div className="w-full grid grid-cols-2 gap-4 mb-4">
      {/* Score Panel - Changed to Previous Score */}
      <motion.div 
        className="rounded-lg p-4 bg-white/90 shadow-lg text-center"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        whileHover={{ scale: 1.02 }}
      >
        <div className="flex items-center justify-center gap-2">
          <motion.div
            animate={{ 
              rotate: previousScore > 0 ? [0, 15, -15, 0] : 0,
              scale: previousScore > 0 ? [1, 1.2, 1] : 1
            }} 
            transition={{ duration: 1, repeat: previousScore > 0 ? 1 : 0 }}
          >
            <Star className="w-7 h-7 text-game-yellow" />
          </motion.div>
          <h3 className="text-xl text-purple-800 kids-text font-normal">Puntos</h3>
        </div>
        <motion.p 
          className="text-3xl text-purple-900 kids-text mt-1 font-normal"
          animate={previousScore > 0 ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 0.5 }}
        >
          {previousScore}
        </motion.p>
        <p className="text-sm text-purple-600 kids-text font-normal">ronda anterior</p>
      </motion.div>
      
      {/* Level Panel - Updated to be transparent */}
      <motion.div 
        className="rounded-lg p-4 bg-transparent shadow-lg text-center"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        whileHover={{ scale: 1.02 }}
      >
        <div className="flex items-center justify-center gap-2">
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 0],
            }} 
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Award className="w-7 h-7 text-game-purple" />
          </motion.div>
          <h3 className="text-xl text-purple-800 kids-text font-normal">Nivel</h3>
        </div>
        <motion.p 
          className="text-3xl text-purple-900 kids-text mt-1 font-normal"
          animate={level > 1 ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 0.5 }}
        >
          {level}
        </motion.p>
        {level === 1 ? (
          <p className="opacity-0">·</p>
        ) : (
          <p className="text-sm text-purple-600 kids-text font-normal">
            ¡Nivel desbloqueado!
          </p>
        )}
      </motion.div>
    </div>
  );
};

export default ScorePanel;
