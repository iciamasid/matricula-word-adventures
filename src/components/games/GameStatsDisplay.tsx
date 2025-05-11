
import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star } from 'lucide-react';
import { useGame } from '@/context/GameContext';

interface GameStatsDisplayProps {
  className?: string;
}

const GameStatsDisplay: React.FC<GameStatsDisplayProps> = ({ className = '' }) => {
  const { totalPoints, level } = useGame();
  
  return (
    <motion.div 
      className={`flex items-center gap-4 ${className}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Level indicator */}
      <motion.div 
        className="flex items-center bg-purple-600/80 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg border-2 border-purple-400"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Star className="h-5 w-5 text-yellow-300 fill-yellow-300 mr-1" />
        </motion.div>
        <span className="text-xl font-bold text-white kids-text">Nivel {level}</span>
      </motion.div>
      
      {/* Points indicator */}
      <motion.div 
        className="flex items-center bg-green-600/80 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg border-2 border-green-400"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        <motion.div
          animate={{ rotate: [0, 15, -15, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Trophy className="h-5 w-5 text-yellow-300 mr-1" />
        </motion.div>
        <span className="text-xl font-bold text-white kids-text">{totalPoints} puntos</span>
      </motion.div>
    </motion.div>
  );
};

export default GameStatsDisplay;
