import React, { useState, useEffect } from "react";
import { GameProvider, useGame } from "@/context/GameContext";
import LicensePlate from "@/components/LicensePlate";
import WordInput from "@/components/WordInput";
import ErrorAlert from "@/components/ErrorAlert";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Globe, RefreshCw, Car, ArrowRight } from "lucide-react";
import GameInstructions from "@/components/GameInstructions";
import { useIsMobile } from "@/hooks/use-mobile";
import { Toaster } from "@/components/ui/toaster";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import GamePopup from "@/components/GamePopup";
import ScorePanel from "@/components/ScorePanel";
import PlayerRegistration from "@/components/PlayerRegistration";
import NewGameButton from "@/components/NewGameButton";
import WorldTourProgress from "@/components/WorldTourProgress";
import CarCustomization from "@/components/CarCustomization";

// Define custom consonant colors array for use in the page
const CONSONANT_COLORS = ["bg-game-purple", "bg-game-blue", "bg-game-yellow"];

const Index = () => {
  return (
    <GameProvider>
      <GameContent />
    </GameProvider>
  );
};

// Componente para manejar el contenido del juego
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
    score,
    previousScore,
    showCompletionBanner
  } = useGame();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [prevLevel, setPrevLevel] = useState(level);
  const [showLevelUpFromNavigation, setShowLevelUpFromNavigation] = useState(false);

  // Show success popup when score changes
  useEffect(() => {
    if (score > 0) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  }, [score]);

  // Show level up popup ONLY when level changes and not from navigation
  useEffect(() => {
    // Only show the popup when the level increases (not when loading the page or returning from navigation)
    if (level > prevLevel && prevLevel !== 0 && !showLevelUpFromNavigation) {
      setShowLevelUp(true);
    }
    // Always update the previous level
    setPrevLevel(level);

    // Reset navigation flag
    setShowLevelUpFromNavigation(false);
  }, [level]);

  // Detection of navigation return
  useEffect(() => {
    // Check if this is a page return/navigation
    const isNavigatingBack = sessionStorage.getItem('navigatingBack');
    if (isNavigatingBack === 'true') {
      // Set flag to prevent level up popup when returning
      setShowLevelUpFromNavigation(true);
      sessionStorage.removeItem('navigatingBack');
    }
  }, []);

  // Set navigation flag when leaving
  const handleNavigation = () => {
    sessionStorage.setItem('navigatingBack', 'true');
  };

  // Simular países desbloqueados basados en nivel actual
  const unlockedCountries = React.useMemo(() => {
    const countries = [];
    if (level >= 0) countries.push("España");
    if (level >= 1) countries.push("Francia");
    if (level >= 2) countries.push("Italia");
    if (level >= 3) countries.push("Rusia");
    if (level >= 4) countries.push("Japón");
    if (level >= 5) countries.push("Australia");
    if (level >= 6) countries.push("Estados Unidos");
    if (level >= 7) countries.push("Méjico");
    if (level >= 8) countries.push("Perú");
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
    <div className="min-h-screen flex flex-col items-center relative overflow-hidden" style={{
      backgroundColor: "#bba7ca",
      backgroundSize: "cover",
      backgroundAttachment: "fixed"
    }}>
      {/* Special background effect when the world tour is completed */}
      {level >= 10 && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-300/50 to-purple-400/50"></div>
          {[...Array(20)].map((_, i) => (
            <motion.div 
              key={i} 
              className="absolute rounded-full bg-yellow-300 opacity-30" 
              style={{
                width: Math.random() * 10 + 5,
                height: Math.random() * 10 + 5,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }} 
              animate={{
                y: [0, -100],
                opacity: [0.3, 0]
              }} 
              transition={{
                duration: Math.random() * 5 + 5,
                repeat: Infinity,
                repeatType: "loop",
                delay: Math.random() * 5
              }} 
            />
          ))}
        </div>
      )}
      
      <div className="relative w-full">
        <motion.img 
          src="/lovable-uploads/9e7f018b-48ce-4158-acf0-ddcc7e2b4804.png" 
          alt="Matriculabra Cadabra" 
          className="w-full object-contain mb-4 px-0" 
          style={{
            maxHeight: isMobile ? "28vh" : "30vh",
            width: "100%"
          }} 
          initial={{
            opacity: 0,
            y: -20
          }} 
          animate={{
            opacity: 1,
            y: 0
          }} 
          transition={{
            duration: 0.5
          }} 
        />
        
        {/* Instructions button positioned at bottom right of the image */}
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setShowInstructions(true)} 
          className="absolute bottom-6 right-4 bg-purple-100/90 hover:bg-purple-200 text-purple-900 border-purple-300 kids-text text-base font-normal"
        >
          <Globe className="w-4 h-4 mr-1" /> Ayuda
        </Button>
      </div>
    
      <div className="w-full max-w-md flex flex-col items-center justify-center px-4">
        {/* Player Registration Form */}
        <PlayerRegistration />
        
        <div className="w-full max-w-md flex flex-col items-center space-y-4">
          <LicensePlate />
          <WordInput />
          
          {/* Add New Game Button with slot machine style */}
          <NewGameButton />
          
          {/* Car Customization Component */}
          <CarCustomization />
          
          {/* Score components in a single row */}
          <ScorePanel />
          
          {/* "Has llegado hasta" panel */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.3 }} 
            className={`w-full rounded-lg p-5 shadow-lg py-[20px] ${level >= 10 ? 'bg-gradient-to-r from-purple-300 to-purple-200' : 'bg-purple-200'}`}
          >
            <div className="text-center mb-4">
              <h2 className="text-2xl font-normal text-purple-800 kids-text flex items-center justify-center">
                <motion.span 
                  className="inline-block" 
                  animate={{
                    rotate: [0, 360],
                    transition: {
                      repeat: Infinity,
                      duration: 8,
                      ease: "linear"
                    }
                  }}
                >
                  <Globe className="h-7 w-7 text-blue-600" />
                </motion.span>
                <span className="mx-2 font-normal text-xl">Este nivel te permite conducir desde:</span>
                <motion.span 
                  className="inline-block" 
                  animate={{
                    rotate: [0, 360],
                    transition: {
                      repeat: Infinity,
                      duration: 8,
                      ease: "linear"
                    }
                  }}
                >
                  <Globe className="h-7 w-7 text-blue-600" />
                </motion.span>
              </h2>
              
              {/* Origin and Destination with arrows */}
              <div className="grid grid-cols-3 items-center gap-2 my-4">
                {/* Origin */}
                <div className="flex flex-col items-center">
                  <motion.span 
                    className="text-4xl mb-2" 
                    animate={{
                      rotate: [0, 10, -10, 0]
                    }} 
                    transition={{
                      duration: 2,
                      repeat: Infinity
                    }}
                  >
                    {originInfo.flag}
                  </motion.span>
                  <motion.p 
                    className="text-xl font-normal text-purple-900 kids-text" 
                    animate={{
                      scale: [1, 1.05, 1]
                    }} 
                    transition={{
                      duration: 2,
                      repeat: Infinity
                    }}
                  >
                    {originInfo.city}, {originInfo.country}
                  </motion.p>
                  <p className="text-sm text-purple-700 kids-text">Origen</p>
                  <Link to={`/country/${originInfo.country}`} onClick={handleNavigation}>
                    <Button className="mt-2 bg-purple-600 hover:bg-purple-700 text-white text-sm px-3 py-1 kids-text font-normal">
                      Conoce {originInfo.country}
                    </Button>
                  </Link>
                </div>
                
                {/* Arrow */}
                <div className="flex justify-center">
                  <motion.div 
                    animate={{
                      x: [0, 10, 0]
                    }} 
                    transition={{
                      duration: 1.5,
                      repeat: Infinity
                    }}
                  >
                    <ArrowRight className="h-10 w-10 text-purple-700" />
                  </motion.div>
                </div>
                
                {/* Destination */}
                <div className="flex flex-col items-center">
                  <motion.span 
                    className="text-4xl mb-2" 
                    animate={{
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1]
                    }} 
                    transition={{
                      duration: 2,
                      repeat: Infinity
                    }}
                  >
                    {destinationInfo.flag}
                  </motion.span>
                  <motion.p 
                    className="text-xl font-normal text-purple-900 kids-text" 
                    animate={{
                      scale: [1, 1.05, 1]
                    }} 
                    transition={{
                      duration: 2,
                      repeat: Infinity
                    }}
                  >
                    {destinationInfo.city}, {destinationInfo.country}
                  </motion.p>
                  <p className="text-sm text-purple-700 kids-text">Destino</p>
                  <Link to={`/country/${destinationInfo.country}`} onClick={handleNavigation}>
                    <Button className="mt-2 bg-purple-600 hover:bg-purple-700 text-white text-sm px-3 py-1 kids-text font-normal">
                      Conoce {destinationInfo.country}
                    </Button>
                  </Link>
                </div>
              </div>
              
              {/* Special badge for world tour completion */}
              {level >= 10 && (
                <motion.div 
                  className="mt-4 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full px-6 py-2 inline-block shadow-lg" 
                  animate={{
                    scale: [1, 1.05, 1]
                  }} 
                  transition={{
                    repeat: Infinity,
                    duration: 2
                  }}
                >
                  <span className="text-lg font-bold text-amber-900 kids-text">
                    ¡VUELTA AL MUNDO COMPLETADA! 🏆
                  </span>
                </motion.div>
              )}
            </div>
          </motion.div>
          
          {/* Add World Tour Progress component */}
          <WorldTourProgress />
          
          {/* Drawing Game Button - After the world tour progress */}
          <motion.div 
            className={`w-full rounded-lg p-4 shadow-lg ${level >= 10 ? 'bg-gradient-to-r from-purple-200 to-purple-300/90' : 'bg-purple-200/90'}`} 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.4 }} 
            whileHover={{ scale: 1.02 }}
          >
            <div className="text-center">
              <h2 className="text-2xl text-purple-800 kids-text mb-3 font-normal">Conduce tu coche al destino</h2>
              <p className="text-purple-700 kids-text mb-4 font-normal text-xl">Dibuja un camino y conduce hasta tu país destino</p>
              
              <Link to="/draw-game" onClick={handleNavigation}>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white text-xl kids-text px-6 py-3 font-normal relative">
                  <div className="flex items-center">
                    <motion.div 
                      animate={{
                        x: [-5, 5, -5],
                        y: [-3, 3, -3],
                        rotate: [0, 5, -5, 0]
                      }} 
                      transition={{
                        duration: 2,
                        repeat: Infinity
                      }} 
                      className="mr-3 text-4xl"
                    >
                      🚗
                    </motion.div>
                    <span>Conducir</span>
                  </div>
                </Button>
              </Link>
            </div>
          </motion.div>
          
          {/* Reset Game Button - in purple */}
          <motion.div 
            className="w-full max-w-xs mt-8" 
            whileHover={{ scale: 1.03 }} 
            transition={{ type: "spring", stiffness: 400 }}
          >
            <Button 
              onClick={handleResetGame} 
              size="lg" 
              className="w-full text-white kids-text text-xl font-normal bg-purple-700 hover:bg-purple-600 px-[10px] mx-0 my-0 py-[20px]"
            >
              <RefreshCw className="mr-2 h-5 w-5" /> Iniciar nueva partida
            </Button>
          </motion.div>
        </div>
        
        {/* Error Alert using GamePopup */}
        <ErrorAlert />
        
        {/* Success Popup */}
        <GamePopup 
          open={showSuccess} 
          onClose={() => setShowSuccess(false)} 
          type="success" 
          message="¡MUY BIEN!" 
          points={score} 
        />
        
        {/* Level Up Popup */}
        <GamePopup 
          open={showLevelUp} 
          onClose={() => setShowLevelUp(false)} 
          type="levelUp" 
          message="¡NIVEL DESBLOQUEADO!" 
          level={level} 
        />
        
        {showInstructions && <GameInstructions onClose={() => setShowInstructions(false)} />}
      </div>
      <Toaster />
    </div>
  );
};

export default Index;
