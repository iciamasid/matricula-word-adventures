import React, { useState, useEffect } from "react";
import { GameProvider, useGame } from "@/context/GameContext";
import LicensePlate from "@/components/LicensePlate";
import WordInput from "@/components/WordInput";
import ErrorAlert from "@/components/ErrorAlert";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Globe, RefreshCw, ArrowRight } from "lucide-react";
import GameInstructions from "@/components/GameInstructions";
import { useIsMobile } from "@/hooks/use-mobile";
import { Toaster } from "@/components/ui/toaster";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import ScorePanel from "@/components/ScorePanel";
import PlayerRegistration from "@/components/PlayerRegistration";
import NewGameButton from "@/components/NewGameButton";
import WorldTourProgress from "@/components/WorldTourProgress";
import LanguageSelector from "@/components/LanguageSelector";
import { useLanguage } from "@/context/LanguageContext";

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
  const { language, t, isEnglish } = useLanguage();
  
  const {
    totalPoints,
    destinationInfo,
    originInfo,
    level,
    resetGame,
    plateConsonants,
    score,
    previousScore,
  } = useGame();

  // Determine the color theme based on language
  const bgColor = isEnglish ? "bg-orange-100" : "bg-bba7ca";
  const panelBgColor = isEnglish ? "bg-orange-200" : "bg-purple-200";
  const panelGradientBg = isEnglish 
    ? "bg-gradient-to-r from-orange-300 to-orange-200" 
    : "bg-gradient-to-r from-purple-300 to-purple-200";
  const buttonBgColor = isEnglish ? "bg-orange-600 hover:bg-orange-700" : "bg-purple-600 hover:bg-purple-700";
  const textColor = isEnglish ? "text-orange-800" : "text-purple-800";
  const textColorLight = isEnglish ? "text-orange-700" : "text-purple-700";
  const borderColor = isEnglish ? "border-orange-300" : "border-purple-300";
  const hoverBgColor = isEnglish ? "hover:bg-orange-100" : "hover:bg-purple-100";

  // Usamos sessionStorage para marcar cuando estamos navegando entre páginas
  const handleNavigation = () => {
    sessionStorage.setItem('navigatingBack', 'true');
  };

  // Simular países desbloqueados basados en nivel actual
  const unlockedCountries = React.useMemo(() => {
    const countries = [];
    if (level >= 0) countries.push(language === 'es' ? "España" : "Spain");
    if (level >= 1) countries.push(language === 'es' ? "Francia" : "France");
    if (level >= 2) countries.push(language === 'es' ? "Italia" : "Italy");
    if (level >= 3) countries.push(language === 'es' ? "Rusia" : "Russia");
    if (level >= 4) countries.push(language === 'es' ? "Japón" : "Japan");
    if (level >= 5) countries.push(language === 'es' ? "Australia" : "Australia");
    if (level >= 6) countries.push(language === 'es' ? "Estados Unidos" : "United States");
    if (level >= 7) countries.push(language === 'es' ? "Méjico" : "Mexico");
    if (level >= 8) countries.push(language === 'es' ? "Perú" : "Peru");
    if (level >= 9) countries.push(language === 'es' ? "Argentina" : "Argentina");
    if (level >= 10) countries.push(language === 'es' ? "España (vuelta completa)" : "Spain (full tour)");
    return countries;
  }, [level, language]);
  
  const handleResetGame = () => {
    if (confirm(t("reset_confirm"))) {
      resetGame();
      toast({
        title: t("game_reset"),
        description: t("reset_points")
      });
    }
  };
  
  return <div className={`min-h-screen flex flex-col items-center relative overflow-hidden ${bgColor}`} style={{
    backgroundSize: "cover",
    backgroundAttachment: "fixed"
  }}>
      {/* Special background effect when the world tour is completed */}
      {level >= 10 && <div className="absolute inset-0 pointer-events-none">
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
        </div>}
      
      <div className="relative w-full">
        <motion.img src="/lovable-uploads/9e7f018b-48ce-4158-acf0-ddcc7e2b4804.png" alt="Matriculabra Cadabra" className="w-full object-contain mb-2 px-0" style={{
        maxHeight: isMobile ? "28vh" : "25vh",
        width: "100%"
      }} initial={{
        opacity: 0,
        y: -20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.5
      }} />
        
        {/* Instructions button positioned at bottom right of the image */}
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setShowInstructions(true)} 
          className={`absolute bottom-4 right-4 ${isEnglish ? 'bg-orange-100/90 hover:bg-orange-200 text-orange-900 border-orange-300' : 'bg-purple-100/90 hover:bg-purple-200 text-purple-900 border-purple-300'} kids-text text-base font-normal`}
        >
          <Globe className="w-4 h-4 mr-1" /> {t("help")}
        </Button>
      </div>

      {/* Language Selector below the image */}
      <div className="w-full flex justify-center mb-4">
        <LanguageSelector />
      </div>
    
      <div className="w-full max-w-md flex flex-col items-center justify-center px-4">
        {/* Player Registration Form and Car Customization */}
        <PlayerRegistration />
        
        <div className="w-full max-w-md flex flex-col items-center space-y-4">
          <LicensePlate />
          <WordInput />
          
          {/* Add New Game Button with slot machine style */}
          <NewGameButton />
          
          {/* Score components in a single row */}
          <ScorePanel />
          
          {/* "Has llegado hasta" panel */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.3
        }} className={`w-full rounded-lg p-5 shadow-lg py-[20px] ${level >= 10 ? panelGradientBg : panelBgColor}`}>
            <div className="text-center mb-4">
              <h2 className={`text-2xl font-normal ${textColor} kids-text flex items-center justify-center`}>
                <motion.span className="inline-block" animate={{
                rotate: [0, 360],
                transition: {
                  repeat: Infinity,
                  duration: 8,
                  ease: "linear"
                }
              }}>
                  <Globe className={`h-7 w-7 ${isEnglish ? "text-orange-600" : "text-blue-600"}`} />
                </motion.span>
                <span className="mx-2 font-normal text-xl">{t("level_allows_driving_from")}</span>
                <motion.span className="inline-block" animate={{
                rotate: [0, 360],
                transition: {
                  repeat: Infinity,
                  duration: 8,
                  ease: "linear"
                }
              }}>
                  <Globe className={`h-7 w-7 ${isEnglish ? "text-orange-600" : "text-blue-600"}`} />
                </motion.span>
              </h2>
              
              {/* Origin and Destination with arrows */}
              <div className="grid grid-cols-3 items-center gap-2 my-4">
                {/* Origin */}
                <div className="flex flex-col items-center">
                  <motion.span className="text-4xl mb-2" animate={{
                  rotate: [0, 10, -10, 0]
                }} transition={{
                  duration: 2,
                  repeat: Infinity
                }}>
                    {originInfo.flag}
                  </motion.span>
                  <motion.p className={`text-xl font-normal ${textColor} kids-text`} animate={{
                  scale: [1, 1.05, 1]
                }} transition={{
                  duration: 2,
                  repeat: Infinity
                }}>
                    {originInfo.city}, {originInfo.country}
                  </motion.p>
                  <p className={`text-sm ${textColorLight} kids-text`}>{t("origin")}</p>
                  <Link to={`/country/${originInfo.country}`} onClick={handleNavigation}>
                    <Button className={`mt-2 ${buttonBgColor} text-white text-sm px-3 py-1 kids-text font-normal`}>
                      {t("learn_about")} {originInfo.country}
                    </Button>
                  </Link>
                </div>
                
                {/* Arrow */}
                <div className="flex justify-center">
                  <motion.div animate={{
                  x: [0, 10, 0]
                }} transition={{
                  duration: 1.5,
                  repeat: Infinity
                }}>
                    <ArrowRight className={`h-10 w-10 ${isEnglish ? "text-orange-700" : "text-purple-700"}`} />
                  </motion.div>
                </div>
                
                {/* Destination */}
                <div className="flex flex-col items-center">
                  <motion.span className="text-4xl mb-2" animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }} transition={{
                  duration: 2,
                  repeat: Infinity
                }}>
                    {destinationInfo.flag}
                  </motion.span>
                  <motion.p className={`text-xl font-normal ${textColor} kids-text`} animate={{
                  scale: [1, 1.05, 1]
                }} transition={{
                  duration: 2,
                  repeat: Infinity
                }}>
                    {destinationInfo.city}, {destinationInfo.country}
                  </motion.p>
                  <p className={`text-sm ${textColorLight} kids-text`}>{t("destination")}</p>
                  <Link to={`/country/${destinationInfo.country}`} onClick={handleNavigation}>
                    <Button className={`mt-2 ${buttonBgColor} text-white text-sm px-3 py-1 kids-text font-normal`}>
                      {t("learn_about")} {destinationInfo.country}
                    </Button>
                  </Link>
                </div>
              </div>
              
              {/* Special badge for world tour completion */}
              {level >= 10 && <motion.div className="mt-4 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full px-6 py-2 inline-block shadow-lg" animate={{
              scale: [1, 1.05, 1]
            }} transition={{
              repeat: Infinity,
              duration: 2
            }}>
                  <span className="text-lg font-bold text-amber-900 kids-text">
                    {t("world_tour_completed")} 🏆
                  </span>
                </motion.div>}
            </div>
          </motion.div>
          
          {/* Add World Tour Progress component */}
          <WorldTourProgress />
          
          {/* Drawing Game Button - After the world tour progress */}
          <motion.div className={`w-full rounded-lg p-4 shadow-lg ${level >= 10 ? (isEnglish ? 'bg-gradient-to-r from-orange-200 to-orange-300/90' : 'bg-gradient-to-r from-purple-200 to-purple-300/90') : isEnglish ? 'bg-orange-200/90' : 'bg-purple-200/90'}`} initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.4
        }} whileHover={{
          scale: 1.02
        }}>
            <div className="text-center">
              <h2 className={`text-2xl ${textColor} kids-text mb-3 font-normal`}>{t("drive_car")}</h2>
              <p className={`${textColorLight} kids-text mb-4 text-xl font-normal`}>{t("draw_path")}</p>
              
              <Link to="/draw-game" onClick={handleNavigation}>
                <Button className={`${buttonBgColor} text-white text-xl kids-text px-6 py-3 font-normal relative`}>
                  <div className="flex items-center">
                    <motion.div animate={{
                    x: [-5, 5, -5],
                    y: [-3, 3, -3],
                    rotate: [0, 5, -5, 0]
                  }} transition={{
                    duration: 2,
                    repeat: Infinity
                  }} className="mr-3 text-4xl">
                      🚗
                    </motion.div>
                    <span>{t("drive")}</span>
                  </div>
                </Button>
              </Link>
            </div>
          </motion.div>
          
          {/* Reset Game Button - in theme color */}
          <motion.div className="w-full max-w-xs mt-8" whileHover={{
          scale: 1.03
        }} transition={{
          type: "spring",
          stiffness: 400
        }}>
            <Button 
              onClick={handleResetGame} 
              size="lg" 
              className={`w-full text-white kids-text text-xl font-normal ${isEnglish ? "bg-orange-700 hover:bg-orange-600" : "bg-purple-700 hover:bg-purple-600"} px-[10px] mx-0 my-0 py-[20px]`}
            >
              <RefreshCw className="mr-2 h-5 w-5" /> {t("reset_game")}
            </Button>
          </motion.div>
        </div>
        
        {/* Error Alert using GamePopup - Mantén esto porque maneja los errores */}
        <ErrorAlert />
        
        {showInstructions && <GameInstructions onClose={() => setShowInstructions(false)} />}
      </div>
      <Toaster />
    </div>;
};
export default Index;
