

import React, { useState, useEffect, useRef } from "react";
import { GameProvider, useGame } from "@/context/GameContext";
import LicensePlate from "@/components/LicensePlate";
import WordInput from "@/components/WordInput";
import ErrorAlert from "@/components/ErrorAlert";
import SuccessAlert from "@/components/SuccessAlert";
import LevelUpAlert from "@/components/LevelUpAlert";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { RefreshCw, HelpCircle, Car } from "lucide-react";
import MotorcycleGameInstructions from "@/components/MotorcycleGameInstructions";
import { useIsMobile } from "@/hooks/use-mobile";
import { Toaster } from "@/components/ui/toaster";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import ScorePanel from "@/components/ScorePanel";
import PlayerRegistration from "@/components/PlayerRegistration";
import WorldTourProgressMini from "@/components/WorldTourProgressMini";
import MotorcycleCustomization from "@/components/MotorcycleCustomization";
import BirthdayBonusPopup from "@/components/BirthdayBonusPopup";
import AgeBonusPopup from "@/components/AgeBonusPopup";
import MaxLevelPopup from "@/components/MaxLevelPopup";
import CountryModal from "@/components/CountryModal";
import { getCountryInfo } from "@/data/countryData";

const MotorcycleGamePage = () => {
  return (
    <GameProvider>
      <MotorcycleGameContent />
    </GameProvider>
  );
};

// Component to handle the motorcycle game content
const MotorcycleGameContent = () => {
  const [showInstructions, setShowInstructions] = useState(false);
  const [showMaxLevelPopup, setShowMaxLevelPopup] = useState(false);
  const [countryModalOpen, setCountryModalOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
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
    console.log('MotorcycleGamePage - countryVisitRequired:', countryVisitRequired);
    console.log('MotorcycleGamePage - requiredCountryToVisit:', requiredCountryToVisit);
    console.log('MotorcycleGamePage - level:', level);
  }, [countryVisitRequired, requiredCountryToVisit, level]);

  // Set current game type when component mounts
  useEffect(() => {
    sessionStorage.setItem('currentGameType', 'motorcycle-game');
    console.log('MotorcycleGamePage: Set current game type to motorcycle-game');
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
    if (level === 1) {
      updateDestinations(level);
    }
  }, []);

  // Check if we're navigating back from another page and restore proper destinations
  useEffect(() => {
    const isNavigatingBack = sessionStorage.getItem('navigatingBack');
    console.log('MotorcycleGamePage - navigatingBack sessionStorage:', isNavigatingBack);
    
    if (isNavigatingBack === 'motorcycle-game') {
      console.log('MotorcycleGamePage: Detected navigation back from country, restoring motorcycle game state');
      // Clear the navigation flag
      sessionStorage.removeItem('navigatingBack');
      // Restore proper destinations based on current level
      updateDestinations(level);
      console.log(`MotorcycleGamePage: Restored destinations for level ${level}`);

      // If motorcycle is already selected, scroll to license plate section
      if (licensePlateRef.current) {
        // Slight delay to ensure DOM is ready
        setTimeout(() => {
          licensePlateRef.current?.scrollIntoView({
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  }, [level, updateDestinations]);

  // Function to scroll to world tour section
  const scrollToWorldTour = () => {
    if (worldTourRef.current) {
      worldTourRef.current.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  // Handle navigation to car game - Reset progress to start fresh
  const handleGoToMotorcycle = () => {
    // Reset to level 1 and 0 points for car game
    setLevel(1);
    setTotalPoints(0);
    
    // Close the popup
    setShowMaxLevelPopup(false);
    
    // Save the reset state to sessionStorage to ensure it persists during navigation
    sessionStorage.setItem('carGameReset', 'true');
    sessionStorage.setItem('carStartLevel', '1');
    sessionStorage.setItem('carStartPoints', '0');
    
    // Navigate to car game
    navigate('/');
    
    // Show toast confirming the reset
    toast({
      title: "¡Nuevo juego de coches!",
      description: "Empezando desde el nivel 1 con los coches. ¡Buena suerte!"
    });
  };

  // Handle closing the max level popup
  const handleCloseMaxLevelPopup = () => {
    setShowMaxLevelPopup(false);
  };

  // Determine the color theme for motorcycle page (teal)
  const bgColor = "bg-teal-100";
  const panelBgColor = "bg-teal-200";
  const panelGradientBg = "bg-gradient-to-r from-teal-300 to-teal-200";
  const buttonBgColor = "bg-teal-600 hover:bg-teal-700";
  const textColor = "text-teal-800";
  const textColorLight = "text-teal-700";
  const borderColor = "border-teal-300";
  const hoverBgColor = "hover:bg-teal-100";

  // Helper function to get localized country names (now only Spanish)
  const getLocalizedCountry = (country: string) => country;

  // Simular países desbloqueados basados en nivel actual
  const unlockedCountries = React.useMemo(() => {
    // IMPORTANT: Always include Spain regardless of level
    const countries = ["España"];
    if (level >= 2) countries.push("Reino Unido");
    if (level >= 3) countries.push("Grecia");
    if (level >= 4) countries.push("Noruega");
    if (level >= 5) countries.push("China");
    if (level >= 6) countries.push("Canada");
    if (level >= 7) countries.push("Costa Rica");
    if (level >= 8) countries.push("Brasil");
    if (level >= 9) countries.push("Peru");
    if (level >= 10) countries.push("España (vuelta completa)");
    return countries;
  }, [level]);

  const handleResetGame = () => {
    if (confirm("¿Estás seguro de que quieres reiniciar el juego? Perderás todo tu progreso.")) {
      resetGame();
      setShowMaxLevelPopup(false);
      toast({
        title: "¡Juego reiniciado!",
        description: "Has vuelto al nivel 1 y todos tus puntos se han reiniciado."
      });
    }
  };

  // Handler for jump to level 9 button - Updated to use 4490 points
  const handleJumpToLevel9 = () => {
    // Set level to 9
    setLevel(9);
    // Set points to 4490 as requested
    setTotalPoints(4490);
    // Update destinations based on new level
    updateDestinations(9);
    // Show success toast
    toast({
      title: "¡Nivel actualizado!",
      description: "Has saltado al nivel 9 con 4490 puntos. ¡Preparado para llegar al nivel 10!"
    });
  };

  // Handle navigation to car game from button - with reset
  const handleNavigateToCarGame = () => {
    // Always reset to level 1 and 0 points when switching to car game
    setLevel(1);
    setTotalPoints(0);
    
    // Set navigation flags to ensure car game starts fresh
    sessionStorage.setItem('carGameReset', 'true');
    sessionStorage.setItem('carStartLevel', '1');
    sessionStorage.setItem('carStartPoints', '0');
    
    // Navigate to car game
    navigate('/');
    
    // Show toast confirming the reset
    toast({
      title: "¡Cambiando a coches!",
      description: "Empezando desde el nivel 1 con 0 puntos en el juego de coches."
    });
  };

  const handleOpenCountryModal = (countryCode: string) => {
    console.log('MotorcycleGamePage - Opening country modal for:', countryCode);
    setSelectedCountry(countryCode);
    setCountryModalOpen(true);
  };

  const handleCloseCountryModal = () => {
    console.log('MotorcycleGamePage - Closing country modal');
    setCountryModalOpen(false);
    setSelectedCountry(null);
  };

  return (
    <div 
      className={`min-h-screen flex flex-col items-center relative overflow-hidden bg-teal-100`}
      style={{
        backgroundSize: "cover",
        backgroundAttachment: "fixed"
      }}
    >
      {/* Car game button */}
      <div className="w-full pt-12 px-4">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleNavigateToCarGame}
          className="absolute top-2 left-4 bg-purple-700/90 hover:bg-purple-800 text-white border-purple-600 kids-text text-base font-normal"
        >
          <Car className="w-4 h-4 mr-1" /> Jugar con coches
        </Button>
        
        {/* Instructions button positioned at top right of the screen */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowInstructions(true)}
          className={`absolute top-2 right-4 bg-teal-100/90 hover:bg-teal-200 text-teal-900 border-teal-300 kids-text text-base font-normal`}
        >
          <HelpCircle className="w-4 h-4 mr-1" /> {"Ayuda"}
        </Button>
        
        {/* Debug button positioned at center top of the screen */}
        <Button
          variant="outline"
          size="sm"
          onClick={handleJumpToLevel9}
          className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-teal-700/90 hover:bg-teal-800 text-white border-teal-600 kids-text text-base font-normal"
        >
          Saltar a Nivel 9
        </Button>
      </div>

      <div className="w-full max-w-md flex flex-col items-center justify-center px-4">
        {/* Player Registration Form with additional top margin */}
        <div className="mt-4">
          <PlayerRegistration />
        </div>
        
        {/* Motorcycle selection and CONDUCE button in a unified design */}
        <div className="w-full flex justify-center mb-4">
          <MotorcycleCustomization />
        </div>
        
        {/* Show moving motorcycle BELOW the buttons - showing the default motorcycle */}
        {playerName && (
          <motion.div
            className="w-32 h-24 my-2"
            animate={{
              x: ["-100%", "100%"]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <img 
              src="/lovable-uploads/Motoblanca.png"
              alt="Default Motorcycle" 
              className="w-full h-full object-contain" 
            />
          </motion.div>
        )}
        
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
          
          {/* World Tour Progress - Fixed to ensure proper configuration */}
          <div ref={worldTourRef} className="mt-1 w-full">
            <WorldTourProgressMini 
              onOpenCountryModal={handleOpenCountryModal}
            />
          </div>
          
          {/* Reset Game Button - Added more bottom margin */}
          <motion.div
            className="w-full max-w-xs mt-8 mb-16"
            whileHover={{
              scale: 1.03
            }}
            transition={{
              type: "spring",
              stiffness: 400
            }}
          >
            <Button
              onClick={handleResetGame}
              size="lg"
              className={`w-full text-white kids-text text-xl font-normal bg-teal-700 hover:bg-teal-600 px-[10px] mx-0 my-0 py-[20px]`}
            >
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
        <MaxLevelPopup 
          open={showMaxLevelPopup}
          onClose={handleCloseMaxLevelPopup}
          onGoToMotorcycle={handleGoToMotorcycle}
        />
        
        {/* Birthday Bonus Popup */}
        {playerAge && (
          <BirthdayBonusPopup 
            open={showBirthdayBonusPopup} 
            onClose={() => setShowBirthdayBonusPopup(false)} 
            birthYear={new Date().getFullYear() - (playerAge || 0)} 
            points={50} 
          />
        )}

        {/* Age Bonus Alert */}
        <AgeBonusPopup 
          open={showAgeBonusPopup} 
          onClose={() => {}} 
          points={20} 
          age={playerAge || 0} 
        />
        
        {showInstructions && <MotorcycleGameInstructions onClose={() => setShowInstructions(false)} />}
      </div>
      
      <Toaster />
      <CountryModal 
        open={countryModalOpen}
        onClose={handleCloseCountryModal}
        country={selectedCountry ? getCountryInfo(selectedCountry) : null}
      />
    </div>
  );
};

export default MotorcycleGamePage;
