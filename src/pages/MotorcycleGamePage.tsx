
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
import GameInstructions from "@/components/GameInstructions";
import { useIsMobile } from "@/hooks/use-mobile";
import { Toaster } from "@/components/ui/toaster";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import ScorePanel from "@/components/ScorePanel";
import PlayerRegistration from "@/components/PlayerRegistration";
import WorldTourProgress from "@/components/WorldTourProgress";
import MotorcycleCustomization from "@/components/MotorcycleCustomization";
import BirthdayBonusPopup from "@/components/BirthdayBonusPopup";
import AgeBonusPopup from "@/components/AgeBonusPopup";

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
  const isMobile = useIsMobile();
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
    setTotalPoints
  } = useGame();

  // Ref to the license plate section
  const licensePlateRef = useRef<HTMLDivElement>(null);

  // Asegura que la página comience desde la parte superior al cargar
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Set motorcycle-specific countries
  useEffect(() => {
    // This ensures Portugal is always unlocked when the game starts
    if (level === 0) {
      // Apply motorcycle-specific destinations
      updateMotorcycleDestinations(level);
    }
  }, []);

  // Check if we're navigating back from another page and restore proper destinations
  useEffect(() => {
    const isNavigatingBack = sessionStorage.getItem('navigatingBack');
    if (isNavigatingBack) {
      // Clear the navigation flag
      sessionStorage.removeItem('navigatingBack');
      // Restore proper destinations based on current level
      updateMotorcycleDestinations(level);

      // If motorcycle is already selected, scroll to license plate section
      if (selectedCarColor && licensePlateRef.current) {
        // Slight delay to ensure DOM is ready
        setTimeout(() => {
          licensePlateRef.current?.scrollIntoView({
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  }, []);

  // Function to update destinations specifically for motorcycle game
  const updateMotorcycleDestinations = (currentLevel: number) => {
    // Different countries for motorcycle game
    if (currentLevel <= 1) {
      updateDestinations(0); // Start with Portugal instead of Spain
    } else if (currentLevel === 2) {
      updateDestinations(1); // Grecia
    } else if (currentLevel === 3) {
      updateDestinations(2); // Alemania
    } else if (currentLevel === 4) {
      updateDestinations(3); // Reino Unido
    } else if (currentLevel === 5) {
      updateDestinations(4); // China
    } else if (currentLevel === 6) {
      updateDestinations(5); // India
    } else if (currentLevel === 7) {
      updateDestinations(6); // Brasil
    } else if (currentLevel === 8) {
      updateDestinations(7); // Canadá
    } else if (currentLevel === 9) {
      updateDestinations(8); // Sudáfrica
    } else if (currentLevel >= 10) {
      updateDestinations(0); // Back to Portugal
    }
  };

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

  // Simular países desbloqueados basados en nivel actual - MOTORCYCLE SPECIFIC
  const unlockedCountries = React.useMemo(() => {
    // IMPORTANT: Always include Portugal regardless of level for motorcycle game
    const countries = ["Portugal"];
    if (level >= 2) countries.push("Grecia");
    if (level >= 3) countries.push("Alemania");
    if (level >= 4) countries.push("Reino Unido");
    if (level >= 5) countries.push("China");
    if (level >= 6) countries.push("India");
    if (level >= 7) countries.push("Brasil");
    if (level >= 8) countries.push("Canadá");
    if (level >= 9) countries.push("Sudáfrica");
    if (level >= 10) countries.push("Portugal (vuelta completa)");
    return countries;
  }, [level]);

  const handleResetGame = () => {
    if (confirm("¿Estás seguro de que quieres reiniciar el juego? Perderás todo tu progreso.")) {
      resetGame();
      // After reset, update to motorcycle destinations
      setTimeout(() => updateMotorcycleDestinations(0), 100);
      
      toast({
        title: "¡Juego reiniciado!",
        description: "Has vuelto al nivel 0 y todos tus puntos se han reiniciado."
      });
    }
  };

  // Handler for jump to level 9 button
  const handleJumpToLevel9 = () => {
    // Set level to 9
    setLevel(9);
    // Set points to a reasonable amount for level 9
    setTotalPoints(4000);
    // Update destinations based on new level with motorcycle countries
    updateMotorcycleDestinations(9);
    // Show success toast
    toast({
      title: "¡Nivel actualizado!",
      description: "Has saltado al nivel 9. ¡Preparado para llegar al nivel 10!"
    });
  };

  return (
    <div 
      className={`min-h-screen flex flex-col items-center relative overflow-hidden bg-teal-100`}
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
        
        {/* Show moving motorcycle BELOW the buttons */}
        {playerName && selectedCarColor && (
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
              src="/lovable-uploads/motorcycle.png"
              alt="Motorcycle" 
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
        
        {showInstructions && <GameInstructions onClose={() => setShowInstructions(false)} />}
      </div>
      <Toaster />
    </div>
  );
};

export default MotorcycleGamePage;
