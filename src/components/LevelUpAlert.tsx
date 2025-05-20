
import React, { useEffect } from 'react';
import { Award } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import GamePopup from './GamePopup';
import { useGame } from '@/context/GameContext';
import { motion } from 'framer-motion';

const LevelUpAlert = () => {
  const { showLevelUp, level, clearLevelUpMessage, pendingCountryVisit } = useGame();
  const { isEnglish } = useLanguage();
  
  useEffect(() => {
    if (showLevelUp) {
      // Auto-close after 8 seconds unless there's a pending country
      if (!pendingCountryVisit) {
        const timer = setTimeout(() => {
          clearLevelUpMessage();
        }, 8000);
        
        // Play level up sound
        try {
          const audio = new Audio('/lovable-uploads/level-up.mp3');
          audio.volume = 0.4;
          audio.play();
        } catch (e) {
          console.error("Could not play level up sound", e);
        }
        
        return () => clearTimeout(timer);
      }
    }
  }, [showLevelUp, clearLevelUpMessage, pendingCountryVisit]);
  
  const handleClose = () => {
    clearLevelUpMessage();
  };
  
  // Create message based on level
  const getLevelMessage = () => {
    if (level >= 10) {
      return isEnglish
        ? `Congratulations! You've completed the world tour!`
        : `¡Felicidades! ¡Has completado la vuelta al mundo!`;
    }
    return isEnglish
      ? `You've reached level ${level}!`
      : `¡Has alcanzado el nivel ${level}!`;
  };
  
  // Generate explanation based on whether there's a pending country to visit
  const getExplanation = () => {
    if (pendingCountryVisit) {
      return isEnglish
        ? `You need to visit ${pendingCountryVisit} before you can continue playing. Click on the flag on the map to visit.`
        : `Necesitas visitar ${pendingCountryVisit} antes de continuar jugando. Haz clic en la bandera en el mapa para visitar.`;
    } else if (level >= 10) {
      return isEnglish
        ? `You've mastered the game! Keep playing to improve your score.`
        : `¡Has dominado el juego! Sigue jugando para mejorar tu puntuación.`;
    }
    return isEnglish
      ? `You've unlocked new destinations on your world tour!`
      : `¡Has desbloqueado nuevos destinos en tu vuelta al mundo!`;
  };
  
  // Create award icon element
  const awardIcon = (
    <motion.div
      animate={{ 
        scale: [1, 1.2, 1],
        rotate: [0, 5, -5, 0] 
      }}
      transition={{ 
        duration: 2, 
        repeat: Infinity,
        repeatType: "reverse" 
      }}
    >
      <Award className="h-16 w-16 text-yellow-500" />
    </motion.div>
  );

  return (
    <GamePopup
      open={showLevelUp}
      onClose={handleClose}
      type="levelUp"
      message={getLevelMessage()}
      level={level}
      explanation={getExplanation()}
      icon={awardIcon}
    />
  );
};

export default LevelUpAlert;
