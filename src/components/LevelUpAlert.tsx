
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
      // If it's just 'true', clear the level up message
      if (navigatingBack === 'true') {
        clearLevelUpMessage();
      }
      // Remove the flag
      sessionStorage.removeItem('navigatingBack');
    }
  }, [clearLevelUpMessage]);
  
  // Special handling for level 10 completion - reset the game
  useEffect(() => {
    if (showLevelUp && level >= 10) {
      // Reset game after the popup is shown and closed (8 seconds)
      const timer = setTimeout(() => {
        resetGame();
        clearLevelUpMessage();
      }, 8000);
      
      return () => clearTimeout(timer);
    }
  }, [showLevelUp, level, resetGame, clearLevelUpMessage]);

  // Get the current country code based on level and game type
  const getCurrentCountryCode = () => {
    if (isMotorcycleGame) {
      // Motorcycle game countries
      switch (level) {
        case 1: return "España";
        case 2: return "Reino_Unido";
        case 3: return "Grecia";
        case 4: return "Noruega";
        case 5: return "China";
        case 6: return "Canada";
        case 7: return "Costa_Rica";
        case 8: return "Brasil";
        case 9: return "Peru";
        case 10: return "España";
        default: return "España";
      }
    } else {
      // Car game countries
      switch (level) {
        case 1: return "España";
        case 2: return "Francia";
        case 3: return "Italia";
        case 4: return "Rusia";
        case 5: return "Japón";
        case 6: return "Estados_Unidos";
        case 7: return "México";
        case 8: return "Australia";
        case 9: return "Argentina";
        case 10: return "España";
        default: return "España";
      }
    }
  };

  // Handle opening country modal from the popup button
  const handleOpenCountryModal = (countryCode: string) => {
    const countryInfo = getCountryInfo(countryCode);
    setSelectedCountry(countryInfo);
    setShowCountryModal(true);
  };

  // Handle closing the country modal - Mark country as visited and clear level up
  const handleCloseCountryModal = () => {
    // Mark the country as visited when the modal is closed
    if (selectedCountry && requiredCountryToVisit) {
      markCountryAsVisited(requiredCountryToVisit);
      console.log(`Country ${requiredCountryToVisit} marked as visited`);
    }
    setShowCountryModal(false);
    setSelectedCountry(null);
    // Clear the level up message after visiting the country
    clearLevelUpMessage();
  };
  
  // Simple and clear explanation text as requested
  const explanation = isEnglish 
    ? `Level ${level}!\nVisit ${requiredCountryToVisit || 'the new country'} to continue!\nYou can now choose a new car.`
    : `¡Nivel ${level}!\n¡Visita ${requiredCountryToVisit || 'el nuevo país'} para continuar!\nYa puedes elegir un nuevo ${isMotorcycleGame ? 'moto' : 'coche'}.`;
  
  return (
    <>
      <GamePopup
        open={showLevelUp}
        onClose={() => {}} // Prevent manual closing
        type="levelUp"
        message={isEnglish ? "LEVEL UP!" : "¡SUBIDA DE NIVEL!"}
        level={level}
        explanation={explanation}
        points={0}
        requireCountryVisit={level < 10}
        preventAutoClose={true} // Always prevent auto close
        countryToVisit={requiredCountryToVisit || undefined}
        onOpenCountryModal={handleOpenCountryModal}
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
