
import React from "react";
import { motion } from "framer-motion";
import { useGame } from "@/context/GameContext";
import { Route, Trophy } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const ScorePanel: React.FC = () => {
  const { totalPoints, level } = useGame();
  const { t, isEnglish } = useLanguage();

  // Change theme colors based on language
  const bgGradient = isEnglish 
    ? "bg-gradient-to-r from-orange-500/80 to-amber-400/80" 
    : "bg-gradient-to-r from-purple-500/80 to-violet-400/80";
  const textColor = "text-white";
  const shimmerColor = "bg-white/20";

  return (
    <div className="w-full grid grid-cols-2 gap-3 mb-4">
      {/* KMS Panel - Gamer Style */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        whileHover={{ scale: 1.03 }}
        className={`rounded-lg p-3 shadow-lg ${bgGradient} relative overflow-hidden`}
      >
        {/* Shimmer effect */}
        <motion.div 
          className={`absolute top-0 left-0 w-20 h-full ${shimmerColor} skew-x-12 opacity-50`}
          animate={{ 
            x: [-150, 250]
          }}
          transition={{ 
            repeat: Infinity,
            duration: 2,
            repeatDelay: 3
          }}
        />
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center">
            <Route className="h-6 w-6 text-white mr-2" strokeWidth={2} />
            <h3 className="text-base font-bold kids-text uppercase tracking-wider text-white">
              {t('points_total')}
            </h3>
          </div>
          <motion.div 
            animate={totalPoints > 0 ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.5 }}
          >
            <p className="text-2xl font-bold kids-text text-white">
              {totalPoints}
            </p>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Level Panel - Gamer Style */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        whileHover={{ scale: 1.03 }}
        className={`rounded-lg p-3 shadow-lg ${bgGradient} relative overflow-hidden`}
      >
        {/* Shimmer effect */}
        <motion.div 
          className={`absolute top-0 left-0 w-20 h-full ${shimmerColor} skew-x-12 opacity-50`}
          animate={{ 
            x: [-150, 250]
          }}
          transition={{ 
            repeat: Infinity,
            duration: 2,
            repeatDelay: 4,
            delay: 1
          }}
        />
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center">
            <Trophy className="h-6 w-6 text-yellow-300 mr-2" fill="rgba(253, 224, 71, 0.3)" />
            <h3 className="text-base font-bold kids-text uppercase tracking-wider text-white">
              {t('level')}
            </h3>
          </div>
          <motion.div
            animate={level > 0 ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.5 }}
          >
            <p className="text-2xl font-bold kids-text text-white">
              {level}
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ScorePanel;
