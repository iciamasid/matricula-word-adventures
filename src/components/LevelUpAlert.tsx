
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

  // Auto-open country modal 3 seconds after level up popup appears (for levels 1-9)
  useEffect(() => {
    if (showLevelUp && level < 10 && requiredCountryToVisit) {
      const timer = setTimeout(() => {
        const countryCode = getCurrentCountryCode();
        const countryInfo = getCountryInfo(countryCode);
        setSelectedCountry(countryInfo);
        setShowCountryModal(true);
        clearLevelUpMessage();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showLevelUp, level, clearLevelUpMessage, requiredCountryToVisit]);

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

  // Handle closing the country modal
  const handleCloseCountryModal = () => {
    // Mark the country as visited when the modal is closed
    if (selectedCountry && requiredCountryToVisit) {
      markCountryAsVisited(requiredCountryToVisit);
      console.log(`Country ${requiredCountryToVisit} marked as visited`);
    }
    setShowCountryModal(false);
    setSelectedCountry(null);
  };
  
  // Add text about choosing another vehicle
  const vehicleText = isMotorcycleGame
    ? (isEnglish ? "You can now choose a new motorcycle!" : "¡Ahora puedes elegir una nueva moto!")
    : (isEnglish ? "You can now choose a new car!" : "¡Ahora puedes elegir un nuevo coche!");
  
  // Simplified explanation
  const baseExplanation = isEnglish 
    ? `Level ${level}` 
    : `Nivel ${level}`;
  
  // Message for country visit requirement
  const countryMessage = requiredCountryToVisit 
    ? (isEnglish 
        ? `Visit ${requiredCountryToVisit} to continue!` 
        : `¡Visita ${requiredCountryToVisit} para continuar!`) 
    : "";
  
  // Add the vehicle text to the explanation
  const explanation = `${baseExplanation}${countryMessage ? "\n" + countryMessage : ""}\n${vehicleText}`;
  
  return (
    <>
      <GamePopup
        open={showLevelUp}
        onClose={clearLevelUpMessage}
        type="levelUp"
        message={isEnglish ? "LEVEL UP!" : "¡SUBIDA DE NIVEL!"}
        level={level}
        explanation={explanation}
        points={0}
        requireCountryVisit={level < 10}
        preventAutoClose={level >= 10}
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
