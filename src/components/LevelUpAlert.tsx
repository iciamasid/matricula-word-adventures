
import React, { useEffect } from "react";
import { useGame } from "@/context/GameContext";
import GamePopup from "@/components/GamePopup";
import CountryModal from "@/components/CountryModal";
import { useLanguage } from "@/context/LanguageContext";
import { useLocation } from "react-router-dom";
import { getCountryInfo } from "@/data/countryData";

const LevelUpAlert: React.FC = () => {
  const { 
    level, 
    showLevelUp, 
    clearLevelUpMessage, 
    resetGame,
    requiredCountryToVisit,
    markCountryAsVisited,
    countryVisitRequired
  } = useGame();
  const { isEnglish } = useLanguage();
  const location = useLocation();
  
  // Debug logging for level up state
  useEffect(() => {
    console.log('LevelUpAlert - showLevelUp:', showLevelUp);
    console.log('LevelUpAlert - level:', level);
    console.log('LevelUpAlert - requiredCountryToVisit:', requiredCountryToVisit);
    console.log('LevelUpAlert - countryVisitRequired:', countryVisitRequired);
  }, [showLevelUp, level, requiredCountryToVisit, countryVisitRequired]);
  
  // Determine if we're in motorcycle game
  const isMotorcycleGame = location.pathname === '/motorcycle-game';
  
  // Check for navigation back from countries - only clear if not coming from a level up
  useEffect(() => {
    const navigatingBack = sessionStorage.getItem('navigatingBack');
    console.log('LevelUpAlert - navigatingBack sessionStorage:', navigatingBack);
    
    if (navigatingBack && navigatingBack !== 'motorcycle-game' && navigatingBack !== 'car-game') {
      if (navigatingBack === 'true') {
        console.log('LevelUpAlert - clearing level up message due to navigation back');
        clearLevelUpMessage();
      }
      sessionStorage.removeItem('navigatingBack');
    }
  }, [clearLevelUpMessage]);
  
  // Special handling for level 10 completion - reset the game
  useEffect(() => {
    if (showLevelUp && level >= 10) {
      console.log('LevelUpAlert - Level 10 reached, setting auto-reset timer');
      const timer = setTimeout(() => {
        resetGame();
        clearLevelUpMessage();
      }, 8000);
      
      return () => clearTimeout(timer);
    }
  }, [showLevelUp, level, resetGame, clearLevelUpMessage]);
  
  return (
    <>
      <GamePopup
        open={showLevelUp}
        onClose={() => {
          console.log('LevelUpAlert - GamePopup onClose called, level:', level);
          // Only allow closing if level 10 completion
          if (level >= 10) {
            clearLevelUpMessage();
          }
        }}
        type="levelUp"
        message={isEnglish ? "LEVEL UP!" : "¡SUBIDA DE NIVEL!"}
        level={level}
        points={0}
        requireCountryVisit={false}
        preventAutoClose={false}
        countryToVisit={requiredCountryToVisit || undefined}
        showWorldTour={false}
      />
    </>
  );
};

export default LevelUpAlert;
