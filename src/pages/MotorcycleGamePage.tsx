import React, { useState, useEffect, useRef } from "react";
import { GameProvider, useGame } from "@/context/GameContext";
import LicensePlate from "@/components/LicensePlate";
import WordInput from "@/components/WordInput";
import ErrorAlert from "@/components/ErrorAlert";
import SuccessAlert from "@/components/SuccessAlert";
import LevelUpAlert from "@/components/LevelUpAlert";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { RefreshCw, HelpCircle, ArrowLeft } from "lucide-react";
import MotorcycleGameInstructions from "@/components/MotorcycleGameInstructions";
import { useIsMobile } from "@/hooks/use-mobile";
import { Toaster } from "@/components/ui/toaster";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import ScorePanel from "@/components/ScorePanel";
import PlayerRegistration from "@/components/PlayerRegistration";
import WorldTourProgress from "@/components/WorldTourProgress";
import MotorcycleCustomization from "@/components/MotorcycleCustomization";
import BirthdayBonusPopup from "@/components/BirthdayBonusPopup";
import AgeBonusPopup from "@/components/AgeBonusPopup";
import GameOverPopup from "@/components/GameOverPopup";
import CountryModal from "@/components/CountryModal";

const MotorcycleGamePage = () => {
  return (
    <GameProvider>
      <MotorcycleGameContent />
    </GameProvider>
  );
};

// Component to handle the game content
const MotorcycleGameContent = () => {
  const [showInstructions, setShowInstructions] = useState(false);
  const [showGameOver, setShowGameOver] = useState(false);
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
    selectedMotorcycle,
    updateDestinations,
    playerName,
    playerAge,
    licensePlate,
    showBirthdayBonusPopup,
    setShowBirthdayBonusPopup,
    birthYearBonus,
    showAgeBonusPopup,
    setLevel,
    setTotalPoints
  } = useGame();

  // Set current game type when component mounts
  useEffect(() => {
    sessionStorage.setItem('currentGameType', 'motorcycle-game');
    console.log('MotorcycleGame: Set current game type to motorcycle-game');
  }, []);

  // Ref to the license plate section
  const licensePlateRef = useRef<HTMLDivElement>(null);

  // Check for level 10 and show game over popup
  useEffect(() => {
    if (level >= 10 && !showGameOver) {
      setShowGameOver(true);
    }
  }, [level, showGameOver]);

  // Asegura que la página comience desde la parte superior al cargar
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // IMPORTANT: Always make sure Portugal is unlocked regardless of level
  useEffect(() => {
    // This ensures Portugal is always unlocked when the game starts
    if (level === 0) {
      updateDestinations(level);
    }
  }, []);

  // Check if we're navigating back from another page and restore proper destinations
  useEffect(() => {
    const isNavigatingBack = sessionStorage.getItem('navigatingBack');
    if (isNavigatingBack === 'motorcycle-game') {
      console.log('MotorcycleGame: Detected navigation back from country, restoring motorcycle game state');
      // Clear the navigation flag
      sessionStorage.removeItem('navigatingBack');
      // Restore proper destinations based on current level
      updateDestinations(level);
      console.log(`MotorcycleGame: Restored destinations for level ${level}`);

      // If motorcycle is already selected, scroll to license plate section
      if (selectedMotorcycle && licensePlateRef.current) {
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

  // Determine the color theme for motorcycle page (turquoise)
  const bgColor = "bg-teal-100";
  const panelBgColor = "bg-teal-200";
  const panelGradientBg = "bg-gradient-to-r from-teal-300 to-teal-200";
  const buttonBgColor = "bg-teal-600 hover:bg-teal-700";
  const textColor = "text-teal-800";
  const textColorLight = "text-teal-700";
  const borderColor = "border-teal-300";
  const hoverBgColor = "hover:bg-teal-100";

  // Using sessionStorage to mark when we're navigating between pages
  const handleNavigation = () => {
    sessionStorage.setItem('navigatingBack', 'true');
  };

  // Helper function to get localized country names (now only Spanish)
  const getLocalizedCountry = (country: string) => country;

  // Simular países desbloqueados basados en nivel actual
  const unlockedCountries = React.useMemo(() => {
    // IMPORTANT: Always include Portugal regardless of level
    const countries = ["Portugal"];
    if (level >= 2) countries.push("Reino Unido");
    if (level >= 3) countries.push("Grecia");
    if (level >= 4) countries.push("Noruega");
    if (level >= 5) countries.push("China");
    if (level >= 6) countries.push("Canadá");
    if (level >= 7) countries.push("Costa Rica");
    if (level >= 8) countries.push("Brasil");
    if (level >= 9) countries.push("Perú");
    if (level >= 10) countries.push("Portugal (vuelta completa)");
    return countries;
  }, [level]);

  const handleResetGame = () => {
    if (confirm("¿Estás seguro de que quieres reiniciar el juego? Perderás todo tu progreso.")) {
      resetGame();
      toast({
        title: "¡Juego reiniciado!",
        description: "Has vuelto al nivel 0 y todos tus puntos se han reiniciado."
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

  // Handle game over restart - Reset completely to level 1 and 0 points
  const handleGameOverRestart = () => {
    // Close the popup first
    setShowGameOver(false);
    
    // Reset the game completely to initial state
    resetGame();
    
    // Set session storage flags to ensure the car game starts fresh
    sessionStorage.setItem('carGameReset', 'true');
    sessionStorage.setItem('carStartLevel', '1');
    sessionStorage.setItem('carStartPoints', '0');
    
    // Navigate back to car game
    navigate('/');
    
    // Show toast confirming the complete reset
    toast({
      title: "¡Nueva partida iniciada!",
      description: "Has empezado una nueva partida con coches desde 0km y nivel 1."
    });
  };

  const handleOpenCountryModal = (countryCode: string) => {
    setSelectedCountry(countryCode);
    setCountryModalOpen(true);
  };

  const handleCloseCountryModal = () => {
    setCountryModalOpen(false);
    setSelectedCountry(null);
  };

  return (
    <div 
      className={`min-h-screen flex flex-col items-center relative overflow-hidden ${bgColor}`}
      style={{
        backgroundSize: "cover",
        backgroundAttachment: "fixed"
      }}
    >
      {/* Return button to car game */}
      <div className="w-full pt-12 px-4">
        <Link to="/">
          <Button 
            variant="outline" 
            size="sm" 
            className="absolute top-2 left-4 bg-teal-700/90 hover:bg-teal-800 text-white border-teal-600 kids-text text-base font-normal"
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> Volver a coches
          </Button>
        </Link>
        
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
        
        {/* Show moving motorcycle BELOW the buttons - showing the selected motorcycle */}
        {playerName && selectedMotorcycle && (
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
              src={`/lovable-uploads/${selectedMotorcycle.image}`}
              alt="Selected Motorcycle" 
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
          
          {/* World Tour Progress */}
          <div ref={worldTourRef} className="mt-1 w-full">
            <WorldTourProgress />
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
        
        {/* Game Over Popup */}
        <GameOverPopup 
          open={showGameOver}
          onRestart={handleGameOverRestart}
        />
        
        {/* Instructions modal - Updated to use MotorcycleGameInstructions */}
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
