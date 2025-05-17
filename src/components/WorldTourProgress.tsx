
import React from 'react';
import { useGame } from '@/context/GameContext';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

const WorldTourProgress: React.FC = () => {
  const { originInfo, destinationInfo, level } = useGame();
  const { t, isEnglish } = useLanguage();
  
  // Determine styling based on language
  const bgGradient = isEnglish ? 'bg-gradient-to-r from-orange-200 to-orange-100' : 'bg-gradient-to-r from-purple-200 to-purple-100';
  const textColor = isEnglish ? 'text-orange-800' : 'text-purple-800';
  const borderColor = isEnglish ? 'border-orange-300' : 'border-purple-300';
  const iconBg = isEnglish ? 'bg-orange-400' : 'bg-purple-400';
  
  return (
    <motion.div 
      className={`w-full rounded-lg p-4 ${bgGradient} shadow-md border ${borderColor}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      {/* Current location information */}
      <div className="mb-3">
        <h3 className={`text-sm font-semibold uppercase ${textColor} mb-1`}>
          {isEnglish ? "You are in" : "Estás en"}
        </h3>
        <div className="flex items-center">
          <span className="text-2xl mr-2">{originInfo.flag}</span>
          <span className="text-lg font-bold kids-text">{originInfo.country}</span>
        </div>
      </div>

      {/* Next destination */}
      <div>
        <h3 className={`text-sm font-semibold uppercase ${textColor} mb-1`}>
          {t("next_destination")}:
        </h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-2xl mr-2">{destinationInfo.flag}</span>
            <span className="text-lg font-bold kids-text">{destinationInfo.country}</span>
          </div>
          
          <div className={`${iconBg} text-white text-xs py-1 px-2 rounded-full flex items-center`}>
            <span className="mr-1">🌍</span>
            <span className="font-bold">{t("level")} {level}</span>
          </div>
        </div>
        
        {/* Fun fact about destination */}
        {destinationInfo.fact && (
          <motion.div 
            className="mt-2 italic text-sm opacity-80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {destinationInfo.fact}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default WorldTourProgress;
