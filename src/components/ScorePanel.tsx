import React from "react";
import { motion } from "framer-motion";
import { useGame } from "@/context/GameContext";
import { Navigation, Route, MapPin, Trophy } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/context/LanguageContext";

const ScorePanel: React.FC = () => {
  const {
    totalPoints,
    level,
    originInfo
  } = useGame();
  
  const { t, isEnglish } = useLanguage();

  // Calculate progress percentage to next level (each level is 500 points)
  const levelProgress = totalPoints % 500 / 500 * 100;
  
  // Change text and icon colors based on language
  const textColor = isEnglish ? "text-orange-800" : "text-purple-800";
  const textColorDark = isEnglish ? "text-orange-900" : "text-purple-900";
  const textColorLight = isEnglish ? "text-orange-600" : "text-purple-600";
  
  return <div className="w-full grid grid-cols-2 gap-4 mb-4">
      {/* Score Panel - Changed to Total Kilometers */}
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
            {/* Changed to Route icon (road/path icon) */}
            <div className="h-14 w-14 flex items-center justify-center relative">
              <Route className="h-12 w-12 text-blue-500 absolute" strokeWidth={1.5} />
              <motion.div className="absolute inset-0" animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7]
            }} transition={{
              repeat: Infinity,
              duration: 2
            }}>
                <Route className="h-12 w-12 text-blue-400" strokeWidth={1} />
              </motion.div>
              <Navigation className="h-5 w-5 text-blue-600" />
            </div>
          </motion.div>
          <h3 className={`text-xl ${textColor} kids-text font-normal`}>{isEnglish ? 'total_kilometers' : 'kilómetros_total'}</h3>
        </div>
        
        <motion.p className={`text-3xl ${textColorDark} kids-text mt-1 font-normal`} animate={totalPoints > 0 ? {
        scale: [1, 1.2, 1]
      } : {}} transition={{
        duration: 0.5
      }}>
          {totalPoints}
        </motion.p>
        
        {/* Added Level Progress Bar */}
        <div className="mt-2">
          <div className="flex justify-between text-xs text-purple-700 mb-1">
            <span>{t('level')} {level}</span>
            <span>{t('level')} {level + 1}</span>
          </div>
          <Progress value={levelProgress} className="h-2" />
          <p className={`${textColorLight} mt-1 text-lg`}>
            {500 - totalPoints % 500} {isEnglish ? 'kilometers_for_next_level' : 'kilómetros_para_subir'}
          </p>
        </div>
      </motion.div>
      
      {/* Level Panel */}
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
          <motion.div className="relative" animate={{
          rotate: [0, 10, -10, 0]
        }} transition={{
          duration: 2,
          repeat: Infinity
        }}>
            {/* Colorful trophy icon with animation */}
            <div className="h-14 w-14 flex items-center justify-center relative">
              <Trophy className="h-12 w-12 text-amber-500" fill="rgba(245, 158, 11, 0.4)" strokeWidth={1.5} />
              <motion.div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center" animate={{
              scale: [1, 1.15, 1],
              opacity: [0.7, 1, 0.7]
            }} transition={{
              repeat: Infinity,
              duration: 3,
              repeatType: "reverse"
            }}>
                <Star className="h-4 w-4 text-yellow-300" fill="gold" stroke="orange" />
              </motion.div>
            </div>
          </motion.div>
          <h3 className={`text-xl ${textColor} kids-text font-normal`}>{t('level')}</h3>
        </div>
        
        <motion.p className={`text-3xl ${textColorDark} kids-text mt-1 font-normal`} animate={level > 0 ? {
        scale: [1, 1.2, 1]
      } : {}} transition={{
        duration: 0.5
      }}>
          {level}
        </motion.p>
        
        <div className="flex items-center justify-center gap-1 mt-1">
          <motion.span className="text-6xl" animate={{
          scale: [1, 1.2, 1]
        }} transition={{
          duration: 2,
          repeat: Infinity
        }}>
            {originInfo.flag}
          </motion.span>
          <p className={`${textColorLight} kids-text ml-2 text-base font-normal`}>
            {t('you_are_in')} {originInfo.city}, {originInfo.country}
          </p>
        </div>
      </motion.div>
    </div>;
};

export default ScorePanel;
