
import React from 'react';
import { useGame } from '@/context/GameContext';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

const ScorePanel: React.FC = () => {
  const {
    totalPoints,
    level
  } = useGame();
  const {
    t,
    isEnglish
  } = useLanguage();

  // Determine styling based on language
  const bgGradient = isEnglish ? 'bg-gradient-to-r from-orange-400 to-orange-300' : 'bg-gradient-to-r from-purple-400 to-purple-300';
  const textColor = isEnglish ? 'text-orange-800' : 'text-purple-800';
  const iconBg = isEnglish ? 'bg-orange-500' : 'bg-purple-500';
  const levelUpColor = isEnglish ? 'from-amber-300 to-orange-400' : 'from-violet-300 to-purple-400';
  
  return <div className="w-full grid grid-cols-2 gap-3 my-2">
      {/* KMS Panel - Gamer Style - Now displaying totalPoints instead of score */}
      <motion.div className={`${bgGradient} rounded-lg shadow-md overflow-hidden border border-white/20`} initial={{
      opacity: 0,
      x: -20
    }} animate={{
      opacity: 1,
      x: 0
    }} transition={{
      delay: 0.2
    }} whileHover={{
      scale: 1.03
    }}>
        <div className="flex items-center p-3">
          <div className={`${iconBg} flex items-center justify-center p-2 rounded-full w-8 h-8 mr-2`}>
            <span className="text-white text-3xl">🚗</span>
          </div>
          <div className="flex flex-col">
            <p className="text-violet-900 text-3xl font-semibold">{t("kms")}</p>
            <h2 className="kids-text font-bold flex items-baseline text-violet-900 text-4xl mx-[20px]">
              {totalPoints} 
              <span className="text-xs ml-1">km</span>
            </h2>
          </div>
        </div>
      </motion.div>
      
      {/* Level Panel - Gamer Style */}
      <motion.div className={`rounded-lg shadow-md overflow-hidden border border-white/20 bg-gradient-to-r ${levelUpColor}`} initial={{
      opacity: 0,
      x: 20
    }} animate={{
      opacity: 1,
      x: 0
    }} transition={{
      delay: 0.3
    }} whileHover={{
      scale: 1.03
    }}>
        <div className="flex items-center p-3">
          <div className="bg-yellow-500 flex items-center justify-center p-2 rounded-full w-8 h-8 mr-2">
            <span className="text-white text-3xl">⭐</span>
          </div>
          <div className="flex flex-col">
            <p className="uppercase font-bold text-purple-900 text-2xl">{t("level")}</p>
            <h2 className="kids-text font-bold text-purple-900 text-4xl mx-[20px]">
              {level}
            </h2>
          </div>
        </div>
      </motion.div>
    </div>;
};

export default ScorePanel;
