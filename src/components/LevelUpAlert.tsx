
import React, { useEffect, useState } from "react";
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
    markCountryAsVisited
  } = useGame();
  const { isEnglish } = useLanguage();
  const location = useLocation();
  const [showCountryModal, setShowCountryModal] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<any>(null);
  
  // Determine if we're in motorcycle game
  const isMotorcycleGame = location.pathname === '/motorcycle-game';
  
  // Check for navigation back from countries - only clear if not coming from a level up
  useEffect(() => {
    const navigatingBack = sessionStorage.getItem('navigatingBack');
    if (navigatingBack && navigatingBack !== 'motorcycle-game' && navigatingBack !== 'car-game') {
      if (navigatingBack === 'true') {
        clearLevelUpMessage();
      }
      sessionStorage.removeItem('navigatingBack');
    }
  }, [clearLevelUpMessage]);
  
  // Special handling for level 10 completion - reset the game
  useEffect(() => {
    if (showLevelUp && level >= 10) {
      const timer = setTimeout(() => {
        resetGame();
        clearLevelUpMessage();
      }, 8000);
      
      return () => clearTimeout(timer);
    }
  }, [showLevelUp, level, resetGame, clearLevelUpMessage]);

  // Handle opening country modal from the popup button
  const handleOpenCountryModal = (countryCode: string) => {
    const countryInfo = getCountryInfo(countryCode);
    setSelectedCountry(countryInfo);
    setShowCountryModal(true);
  };

  // Handle closing the country modal - Mark country as visited and clear level up
  const handleCloseCountryModal = () => {
    if (selectedCountry && requiredCountryToVisit) {
      markCountryAsVisited(requiredCountryToVisit);
      console.log(`Country ${requiredCountryToVisit} marked as visited`);
    }
    setShowCountryModal(false);
    setSelectedCountry(null);
    clearLevelUpMessage();
  };
  
  return (
    <>
      <GamePopup
        open={showLevelUp}
        onClose={() => {}} // Prevent manual closing
        type="levelUp"
        message={isEnglish ? "LEVEL UP!" : "¡SUBIDA DE NIVEL!"}
        level={level}
        points={0}
        requireCountryVisit={level < 10}
        preventAutoClose={true}
        countryToVisit={requiredCountryToVisit || undefined}
        onOpenCountryModal={handleOpenCountryModal}
        showWorldTour={level < 10} // Show world tour for level ups (not completion)
      />

      <CountryModal
        open={showCountryModal}
        onClose={handleCloseCountryModal}
        country={selectedCountry}
      />
    </>
  );
};

export default LevelUpAlert;
