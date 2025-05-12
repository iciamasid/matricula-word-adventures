
import React from "react";
import { useGame } from "@/context/GameContext";
import { motion } from "framer-motion";
import { Route, Milestone } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface ScoreDisplayProps {
  score: number;
  animateChange?: boolean;
  showLabel?: boolean;
  small?: boolean;
  largerScore?: boolean;
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({
  score,
  animateChange = true,
  showLabel = true,
  small = false,
  largerScore = false
}) => {
  const { isEnglish } = useLanguage();
  
  // Determine text color based on language
  const textColor = isEnglish ? "text-orange-800" : "text-purple-800";
  const iconColor = isEnglish ? "text-orange-600" : "text-purple-600";

  return (
    <div className={`flex items-center ${small ? 'gap-1' : 'gap-2'}`}>
      <motion.span
        key={score}
        initial={animateChange ? { scale: 1.5, opacity: 0.7 } : { scale: 1 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`${textColor} kids-text font-bold ${largerScore ? 'text-6xl' : small ? 'text-lg' : 'text-3xl'}`}
      >
        {score}
      </motion.span>
      
      {showLabel && (
        <div className="flex items-center">
          <Milestone className={`${iconColor} ${small ? 'h-4 w-4' : 'h-5 w-5'}`} />
          <span className={`${textColor} kids-text ${small ? 'text-sm' : 'text-lg'} ml-1`}>
            {isEnglish ? "Kilometers" : "Kilómetros"}
          </span>
        </div>
      )}
    </div>
  );
};

export default ScoreDisplay;
