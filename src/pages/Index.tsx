
import React, { useState, useEffect, useRef } from "react";
import { GameProvider, useGame } from "@/context/GameContext";
import LicensePlate from "@/components/LicensePlate";
import WordInput from "@/components/WordInput";
import ErrorAlert from "@/components/ErrorAlert";
import SuccessAlert from "@/components/SuccessAlert";
import LevelUpAlert from "@/components/LevelUpAlert";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Globe, RefreshCw } from "lucide-react";
import GameInstructions from "@/components/GameInstructions";
import { useIsMobile } from "@/hooks/use-mobile";
import { Toaster } from "@/components/ui/toaster";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import ScorePanel from "@/components/ScorePanel";
import PlayerRegistration from "@/components/PlayerRegistration";
import WorldTourProgress from "@/components/WorldTourProgress";
import CarCustomization from "@/components/CarCustomization";

const Index = () => {
  return (
    <GameProvider>
      <GameContent />
    </GameProvider>
  );
};

// Component to handle the game content
const GameContent = () => {
  const [showInstructions, setShowInstructions] = useState(false);
  const isMobile = useIsMobile();
  const {
    totalPoints,
    destinationInfo,
    originInfo,
    level,
    resetGame,
    plateConsonants,
    selectedCarColor,
    updateDestinations,
    playerName
  } = useGame();

  // Ref to the license plate section
  const licensePlateRef = useRef<HTMLDivElement>(null);

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
    if (isNavigatingBack) {
      // Clear the navigation flag
      sessionStorage.removeItem('navigatingBack');
      // Restore proper destinations based on current level
      updateDestinations(level);

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
  }, []);

  // Determine the color theme (always using Spanish/Purple since we removed English)
  const bgColor = "bg-bba7ca";
  const panelBgColor = "bg-purple-200";
  const panelGradientBg = "bg-gradient-to-r from-purple-300 to-purple-200";
  const buttonBgColor = "bg-purple-600 hover:bg-purple-700";
  const textColor = "text-purple-800";
  const textColorLight = "text-purple-700";
  const borderColor = "border-purple-300";
  const hoverBgColor = "hover:bg-purple-100";

  // Using sessionStorage to mark when we're navigating between pages
  const handleNavigation = () => {
    sessionStorage.setItem('navigatingBack', 'true');
  };

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
    if (level >= 6) countries.push("Australia");
    if (level >= 7) countries.push("Estados Unidos");
    if (level >= 8) countries.push("Méjico");
    if (level >= 9) countries.push("Argentina");
    if (level >= 10) countries.push("España (vuelta completa)");
    
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

  return (
    <div className={`min-h-screen flex flex-col items-center relative overflow-hidden ${bgColor}`} style={{
      backgroundSize: "cover",
      backgroundAttachment: "fixed"
    }}>
      {/* Special background effect when the world tour is completed */}
      {level >= 10 && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-300/50 to-purple-400/50"></div>
          {[...Array(20)].map((_, i) => <motion.div key={i} className="absolute rounded-full bg-yellow-300 opacity-30" style={{
            width: Math.random() * 10 + 5,
            height: Math.random() * 10 + 5,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }} animate={{
            y: [0, -100],
            opacity: [0.3, 0]
          }} transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            repeatType: "loop",
            delay: Math.random() * 5
          }} />)}
        </div>
      )}
      
      <div className="relative w-full">
        {/* Eliminada la imagen inicial como se solicitó */}
        
        {/* Instructions button positioned at bottom right of the image area */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowInstructions(true)}
          className={`absolute bottom-4 right-4 ${'bg-purple-100/90 hover:bg-purple-200 text-purple-900 border-purple-300'} kids-text text-base font-normal`}
        >
          <Globe className="w-4 h-4 mr-1" /> {"Ayuda"}
        </Button>
      </div>

      <div className="w-full max-w-md flex flex-col items-center justify-center px-4">
        {/* Player Registration Form */}
        <PlayerRegistration />
        
        {/* Car selection and CONDUCE button in a unified design */}
        <div className="w-full flex justify-center mb-4">
          <CarCustomization />
        </div>
        
        {/* Show moving car BELOW the buttons */}
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
              src={`/lovable-uploads/${selectedCarColor.image}`} 
              alt={selectedCarColor.name}
              className="w-full h-full object-contain"
            />
          </motion.div>
        )}
        
        {/* This div will be the reference for scrolling */}
        <div ref={licensePlateRef} className="w-full"></div>
        
        <div className="w-full max-w-md flex flex-col items-center space-y-4">
          <LicensePlate />
          <WordInput />
          
          {/* Score components in a single row */}
          <ScorePanel />
          
          {/* Add World Tour Progress component */}
          <WorldTourProgress />
          
          {/* Reset Game Button */}
          <motion.div className="w-full max-w-xs mt-8" whileHover={{
          scale: 1.03
        }} transition={{
          type: "spring",
          stiffness: 400
        }}>
            <Button onClick={handleResetGame} size="lg" className={`w-full text-white kids-text text-xl font-normal ${"bg-purple-700 hover:bg-purple-600"} px-[10px] mx-0 my-0 py-[20px]`}>
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
        
        {showInstructions && <GameInstructions onClose={() => setShowInstructions(false)} />}
      </div>
      <Toaster />
    </div>
  );
};

export default Index;
