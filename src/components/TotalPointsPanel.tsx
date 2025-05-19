
import React from "react";
import { motion } from "framer-motion";
import { useGame } from "@/context/GameContext";
import { Star } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const TotalPointsPanel: React.FC = () => {
  const { totalPoints } = useGame();
  const { t } = useLanguage();
  
  return (
    <motion.div 
      className="mt-6 mb-4 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-lg p-4 shadow-lg text-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-center gap-2 mb-2">
        <Star className="text-white h-6 w-6 fill-white" />
        <h3 className="text-xl font-bold text-white">{t('points_total')}</h3>
        <Star className="text-white h-6 w-6 fill-white" />
      </div>
      <div className="text-3xl font-bold text-white kids-text">
        {totalPoints}
      </div>
    </motion.div>
  );
};

export default TotalPointsPanel;
