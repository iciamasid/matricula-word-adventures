
import React from "react";
import { motion } from "framer-motion";
import { useGame } from "@/context/GameContext";
import { Globe } from "lucide-react";

const TotalPointsPanel: React.FC = () => {
  const { totalPoints } = useGame();
  
  return (
    <motion.div 
      className="w-full rounded-lg p-4 bg-white/90 shadow-lg text-center mb-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-center justify-center gap-2">
        <motion.div
          animate={{ 
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1]
          }} 
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Globe className="w-8 h-8 text-game-green" />
        </motion.div>
        <h3 className="text-2xl font-bold text-purple-800 kids-text">Puntos Totales</h3>
      </div>
      <motion.p 
        className="text-3xl font-bold text-purple-900 kids-text mt-1"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {totalPoints}
      </motion.p>
      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
        <motion.div 
          className="bg-game-green h-2 rounded-full" 
          initial={{ width: "0%" }}
          animate={{ width: `${(totalPoints % 500) / 5}%` }}
          transition={{ duration: 1 }}
        />
      </div>
    </motion.div>
  );
};

export default TotalPointsPanel;
