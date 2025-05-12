
import React from "react";
import { motion } from "framer-motion";
import { useGame } from "@/context/GameContext";
import { Navigation, Star } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const TotalPointsPanel: React.FC = () => {
  const { totalPoints } = useGame();
  const { t } = useLanguage();
  
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
          {/* Changed to Navigation icon */}
          <div className="w-8 h-8 text-3xl text-game-green relative">
            <Navigation className="absolute inset-0 text-3xl animate-pulse opacity-70 text-blue-500" style={{ filter: 'blur(4px)' }} />
            <Navigation className="relative z-10 text-blue-600" />
          </div>
        </motion.div>
      </div>
      <motion.p 
        className="text-3xl text-purple-900 kids-text mt-1 font-normal"
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
