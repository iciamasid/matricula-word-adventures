import React, { useState, useEffect, useRef } from "react";
import { GameProvider, useGame } from "@/context/GameContext";
import LicensePlate from "@/components/LicensePlate";
import WordInput from "@/components/WordInput";
import ErrorAlert from "@/components/ErrorAlert";
import SuccessAlert from "@/components/SuccessAlert";
import LevelUpAlert from "@/components/LevelUpAlert";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { RefreshCw, HelpCircle, Bike } from "lucide-react";
import GameInstructions from "@/components/GameInstructions";
import CarGameInstructions from "@/components/CarGameInstructions";
import { useIsMobile } from "@/hooks/use-mobile";
import { Toaster } from "@/components/ui/toaster";
import { Link, useNavigate } from "react-router-dom";
import ScorePanel from "@/components/ScorePanel";
import PlayerRegistration from "@/components/PlayerRegistration";
import WorldTourProgress from "@/components/WorldTourProgress";
import CarCustomization from "@/components/CarCustomization";
import BirthdayBonusPopup from "@/components/BirthdayBonusPopup";
import AgeBonusPopup from "@/components/AgeBonusPopup";
import MaxLevelPopup from "@/components/MaxLevelPopup";
import CountryModal from "@/components/CountryModal";
import FriendlyConfirmDialog from "@/components/FriendlyConfirmDialog";
import LockedMotorcyclePopup from "@/components/LockedMotorcyclePopup";
import { getCountryInfo } from "@/data/countryData";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  return <GameProvider>
      <GameContent />
    </GameProvider>;
};

// Component to handle the game content
const GameContent = () => {
  const [showInstructions, setShowInstructions] = useState(false);
  const [showMaxLevelPopup, setShowMaxLevelPopup] = useState(false);
  const [countryModalOpen, setCountryModalOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showLockedMotorcyclePopup, setShowLockedMotorcyclePopup] = useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const worldTourRef = useRef<HTMLDivElement>(null);
  const {
    totalPoints,
    destinationInfo,
    originInfo,
    level,
    resetGame,
    plateConsonants,
    selectedCarColor,
    updateDestinations,
    playerName,
    playerAge,
    licensePlate,
    showBirthdayBonusPopup,
    setShowBirthdayBonusPopup,
    birthYearBonus,
    showAgeBonusPopup,
    setLevel,
    setTotalPoints,
    countryVisitRequired,
    requiredCountryToVisit
  } = useGame();

  // Debug logging for main game state
  useEffect(() => {
    console.log('Index - countryVisitRequired:', countryVisitRequired);
    console.log('Index - requiredCountryToVisit:', requiredCountryToVisit);
    console.log('Index - level:', level);
  }, [countryVisitRequired, requiredCountryToVisit, level]);

  // Set current game type when component mounts
  useEffect(() => {
    sessionStorage.setItem('currentGameType', 'car-game');
    console.log('Index: Set current game type to car-game');
  }, []);

  // Ref to the license plate section
  const licensePlateRef = useRef<HTMLDivElement>(null);

  // Check if max level (level 10) is reached and show popup
  useEffect(() => {
    if (level >= 10) {
      setShowMaxLevelPopup(true);
    }
  }, [level]);

  // Asegura que la página comience desde la parte superior al cargar
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // IMPORTANT: Always make sure Spain is unlocked regardless of level
  useEffect(() => {
    // This ensures Spain is always unlocked when the game starts
    if (level === 0) {
      updateDestinations(level);
    }
  }, []);

  // Check if we're navigating back from another page and restore proper destinations
  useEffect(() => {
    const isNavigatingBack = sessionStorage.getItem('navigatingBack');
    console.log('Index - navigatingBack sessionStorage:', isNavigatingBack);
    if (isNavigatingBack === 'car-game') {
      console.log('Index: Detected navigation back from country, restoring car game state');
      // Clear the navigation flag
      sessionStorage.removeItem('navigatingBack');
      // Restore proper destinations based on current level
      updateDestinations(level);
      console.log(`Index: Restored destinations for level ${level}`);

      // If car is already selected, scroll to license plate section
      if (selectedCarColor && licensePlateRef.current) {
        // Slight delay to ensure DOM is ready
        setTimeout(() => {
          licensePlateRef.current?.scrollIntoView({
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  }, [level, updateDestinations, selectedCarColor]);

  // Function to scroll to world tour section
  const scrollToWorldTour = () => {
    if (worldTourRef.current) {
      worldTourRef.current.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  // Handle reset game with friendly dialog
  const handleResetGame = () => {
    setShowResetConfirm(true);
  };
  const handleConfirmReset = () => {
    resetGame();
    setShowMaxLevelPopup(false);
    setShowResetConfirm(false);
    // Removed toast notification
  };
  const handleCancelReset = () => {
    setShowResetConfirm(false);
  };

  // Handler for jump to level 9 button - Updated to use 4490 points
  const handleJumpToLevel9 = () => {
    // Set level to 9
    setLevel(9);
    // Set points to 4490 as requested
    setTotalPoints(4490);
    // Update destinations based on new level
    updateDestinations(9);
    // Removed toast notification
  };

  // Handle navigation to motorcycle game with level check
  const handleNavigateToMotorcycleGame = () => {
    // Check if player has completed all car levels (level 10)
    if (level < 10) {
      setShowLockedMotorcyclePopup(true);
      return;
    }

    // If level 10 is reached, allow navigation
    setLevel(1);
    setTotalPoints(0);
    sessionStorage.setItem('motorcycleGameReset', 'true');
    sessionStorage.setItem('motorcycleStartLevel', '1');
    sessionStorage.setItem('motorcycleStartPoints', '0');
    navigate('/motorcycle-game');
  };

  // Handle navigation to motorcycle game - Reset progress to start fresh
  const handleGoToMotorcycle = () => {
    // Reset to level 1 and 0 points for motorcycle game
    setLevel(1);
    setTotalPoints(0);

    // Close the popup
    setShowMaxLevelPopup(false);

    // Save the reset state to sessionStorage to ensure it persists during navigation
    sessionStorage.setItem('motorcycleGameReset', 'true');
    sessionStorage.setItem('motorcycleStartLevel', '1');
    sessionStorage.setItem('motorcycleStartPoints', '0');

    // Navigate to motorcycle game
    navigate('/motorcycle-game');

    // Removed toast notification
  };

  // Handle closing the max level popup
  const handleCloseMaxLevelPopup = () => {
    setShowMaxLevelPopup(false);
  };

  // Determine the color theme for car page (purple)
  const bgColor = "bg-purple-100";
  const panelBgColor = "bg-purple-200";
  const panelGradientBg = "bg-gradient-to-r from-purple-300 to-purple-200";
  const buttonBgColor = "bg-purple-600 hover:bg-purple-700";
  const textColor = "text-purple-800";
  const textColorLight = "text-purple-700";
  const borderColor = "border-purple-300";
  const hoverBgColor = "hover:bg-purple-100";

  // Helper function to get localized country names (now only Spanish)
  const getLocalizedCountry = (country: string) => country;

  // Simular países desbloqueados basados en nivel actual
  const unlockedCountries = React.useMemo(() => {
    // IMPORTANT: Always include Spain regardless of level
    const countries = ["España"];
    if (level >= 2) countries.push("Francia");
    if (level >= 3) countries.push("Italia");
    if (level >= 4) countries.push("Rusia");
    if (level >= 5) countries.push("Japón");
    if (level >= 6) countries.push("Estados Unidos");
    if (level >= 7) countries.push("México");
    if (level >= 8) countries.push("Australia");
    if (level >= 9) countries.push("Argentina");
    if (level >= 10) countries.push("España (vuelta completa)");
    return countries;
  }, [level]);
  const handleOpenCountryModal = (countryCode: string) => {
    console.log('Index - Opening country modal for:', countryCode);
    setSelectedCountry(countryCode);
    setCountryModalOpen(true);
  };
  const handleCloseCountryModal = () => {
    console.log('Index - Closing country modal');
    setCountryModalOpen(false);
    setSelectedCountry(null);
  };
  return <div className={`min-h-screen flex flex-col items-center relative overflow-hidden ${bgColor}`} style={{
    backgroundSize: "cover",
    backgroundAttachment: "fixed"
  }}>
      {/* Animated Motorcycle game button */}
      <div className="w-full pt-12 px-4">
        <motion.div
          className="absolute top-2 left-4"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{ 
            y: [0, -5, 0],
            boxShadow: [
              "0 4px 6px rgba(0, 0, 0, 0.1)",
              "0 8px 12px rgba(0, 0, 0, 0.15)",
              "0 4px 6px rgba(0, 0, 0, 0.1)"
            ]
          }}
          transition={{ 
            y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
            boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleNavigateToMotorcycleGame} 
            className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white border-teal-500 kids-text text-base font-normal shadow-lg"
          >
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Bike className="w-4 h-4 mr-1" />
            </motion.div>
            Jugar con motos
          </Button>
        </motion.div>
        
        {/* Instructions button positioned at top right of the screen */}
        <Button variant="outline" size="sm" onClick={() => setShowInstructions(true)} className={`absolute top-2 right-4 bg-purple-100/90 hover:bg-purple-200 text-purple-900 border-purple-300 kids-text text-base font-normal`}>
          <HelpCircle className="w-4 h-4 mr-1" /> {"Ayuda"}
        </Button>
        
        {/* Debug button positioned at center top of the screen */}
        
      </div>

      <div className="w-full max-w-md flex flex-col items-center justify-center px-4">
        {/* Player Registration Form with additional top margin */}
        <div className="mt-4">
          <PlayerRegistration />
        </div>
        
        {/* Car selection and CONDUCE button in a unified design */}
        <div className="w-full flex justify-center mb-4">
          <CarCustomization />
        </div>
        
        {/* Show moving car BELOW the buttons - showing the selected car */}
        {playerName && selectedCarColor && <motion.div className="w-32 h-24 my-2" animate={{
        x: ["-100%", "100%"]
      }} transition={{
        duration: 6,
        repeat: Infinity,
        ease: "linear"
      }}>
            <img src={`/lovable-uploads/${selectedCarColor.image}`} alt="Selected Car" className="w-full h-full object-contain" />
          </motion.div>}
        
        {/* This div will be the reference for scrolling */}
        <div ref={licensePlateRef} className="w-full"></div>
        
        <div className="w-full max-w-md flex flex-col items-center">
          <LicensePlate />
          
          {/* Add more space between license plate and word input */}
          <div className="mb-8"></div>
          
          <WordInput />
          
          {/* Score components */}
          <div className="w-full mt-2">
            <ScorePanel />
          </div>
          
          {/* World Tour Progress */}
          <div ref={worldTourRef} className="mt-1 w-full">
            <WorldTourProgress />
          </div>
          
          {/* Reset Game Button - Added more bottom margin */}
          <motion.div className="w-full max-w-xs mt-8 mb-16" whileHover={{
          scale: 1.03
        }} transition={{
          type: "spring",
          stiffness: 400
        }}>
            <Button onClick={handleResetGame} size="lg" className={`w-full text-white kids-text text-xl font-normal bg-purple-700 hover:bg-purple-600 px-[10px] mx-0 my-0 py-[20px]`}>
              <RefreshCw className="mr-2 h-5 w-5" /> {"Iniciar nueva partida"}
            </Button>
          </motion.div>
        </div>
        
        {/* Error Alert using GamePopup */}
        <ErrorAlert />
        
        {/* Success Alert using GamePopup */}
        <SuccessAlert />
        
        {/* Level Up Alert using GamePopup */}
        <LevelUpAlert />
        
        {/* Max Level Popup */}
        <MaxLevelPopup open={showMaxLevelPopup} onClose={handleCloseMaxLevelPopup} onGoToMotorcycle={handleGoToMotorcycle} />
        
        {/* Birthday Bonus Popup */}
        {playerAge && <BirthdayBonusPopup open={showBirthdayBonusPopup} onClose={() => setShowBirthdayBonusPopup(false)} birthYear={new Date().getFullYear() - (playerAge || 0)} points={50} />}

        {/* Age Bonus Alert */}
        <AgeBonusPopup open={showAgeBonusPopup} onClose={() => {}} points={20} age={playerAge || 0} />
        
        {/* Friendly Reset Confirmation Dialog */}
        <FriendlyConfirmDialog open={showResetConfirm} onConfirm={handleConfirmReset} onCancel={handleCancelReset} title="🎮 ¿Empezar de nuevo?" message="¿Estás seguro de que quieres empezar una nueva aventura? Perderás todo tu progreso actual, pero podrás vivir la diversión otra vez desde el principio. 🚗✨" confirmText="¡Sí, nueva aventura!" cancelText="No, seguir jugando" />
        
        {/* Locked Motorcycle Popup */}
        <LockedMotorcyclePopup 
          open={showLockedMotorcyclePopup} 
          onClose={() => setShowLockedMotorcyclePopup(false)}
          currentLevel={level}
        />
        
        {showInstructions && <CarGameInstructions onClose={() => setShowInstructions(false)} />}
      </div>
      <Toaster />
      <CountryModal open={countryModalOpen} onClose={handleCloseCountryModal} country={selectedCountry ? getCountryInfo(selectedCountry) : null} />
    </div>;
};

export default Index;
