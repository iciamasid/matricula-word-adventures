import React, { useState, useEffect } from "react";
import { GameProvider, useGame } from "@/context/GameContext";
import LicensePlate from "@/components/LicensePlate";
import WordInput from "@/components/WordInput";
import ErrorAlert from "@/components/ErrorAlert";
import LevelRewards from "@/components/LevelRewards";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Flag, Info, RefreshCw, Car, Trophy } from "lucide-react";
import GameInstructions from "@/components/GameInstructions";
import { useIsMobile } from "@/hooks/use-mobile";
import { Toaster } from "@/components/ui/toaster";
import WorldMap from "@/components/WorldMap";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import GamePopup from "@/components/GamePopup";
import ScorePanel from "@/components/ScorePanel";
import TotalPointsPanel from "@/components/TotalPointsPanel";

// Función para obtener la bandera según el nivel
const getLevelFlag = (level: number) => {
  switch (level) {
    case 1:
      return "🇪🇸";
    // España
    case 2:
      return "🇫🇷";
    // Francia
    case 3:
      return "🇮🇹";
    // Italia
    case 4:
      return "🇷🇺";
    // Rusia
    case 5:
      return "🇯🇵";
    // Japón
    case 6:
      return "🇺🇸";
    // Estados Unidos
    case 7:
      return "🇦🇷";
    // Argentina
    case 8:
      return "🇲🇽";
    // México
    case 9:
      return "🇦🇺";
    // Australia
    case 10:
      return "🇦🇶";
    // Antártida
    default:
      return "🇪🇸";
  }
};

// Define custom consonant colors array for use in the page
const CONSONANT_COLORS = ["bg-game-purple", "bg-game-blue", "bg-game-yellow"];
const Index = () => {
  return <GameProvider>
      <GameContent />
    </GameProvider>;
};

// Componente para manejar el contenido del juego
const GameContent = () => {
  const [showInstructions, setShowInstructions] = useState(false);
  const isMobile = useIsMobile();
  const {
    totalPoints,
    destinationInfo,
    level,
    resetGame,
    plateConsonants,
    score,
    previousScore
  } = useGame();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [prevLevel, setPrevLevel] = useState(level);

  // Show success popup when score changes
  useEffect(() => {
    if (score > 0) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  }, [score]);

  // Show level up popup when level changes
  useEffect(() => {
    if (level > prevLevel) {
      setShowLevelUp(true);
      setPrevLevel(level);
    }
  }, [level, prevLevel]);

  // Simular países desbloqueados basados en nivel actual
  const unlockedCountries = React.useMemo(() => {
    const countries = [];
    if (level >= 1) countries.push("España");
    if (level >= 2) countries.push("Francia");
    if (level >= 3) countries.push("Italia");
    if (level >= 4) countries.push("Rusia");
    if (level >= 5) countries.push("Japón");
    if (level >= 6) countries.push("Estados Unidos");
    if (level >= 7) countries.push("Argentina");
    if (level >= 8) countries.push("Méjico");
    if (level >= 9) countries.push("Australia");
    if (level >= 10) countries.push("Antártida");
    return countries;
  }, [level]);
  const handleResetGame = () => {
    if (confirm("¿Estás seguro de que quieres reiniciar el juego? Perderás todo tu progreso.")) {
      resetGame();
      toast({
        title: "¡Juego reiniciado!",
        description: "Has vuelto al nivel 1 y todos tus puntos se han reiniciado."
      });
    }
  };
  return <div className="min-h-screen flex flex-col items-center relative overflow-hidden" style={{
    backgroundColor: "#bba7ca",
    // Updated background color
    backgroundSize: "cover",
    backgroundAttachment: "fixed"
  }}>
      <div className="relative w-full">
        <motion.img src="/lovable-uploads/9e7f018b-48ce-4158-acf0-ddcc7e2b4804.png" alt="Matriculabra Cadabra" className="w-full object-contain mb-4 px-0" style={{
        maxHeight: isMobile ? "28vh" : "30vh",
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
        <Button variant="outline" size="sm" onClick={() => setShowInstructions(true)} className="absolute bottom-6 right-4 bg-purple-100/90 hover:bg-purple-200 text-purple-900 border-purple-300 kids-text text-base font-normal">
          <Info className="w-4 h-4 mr-1" /> Ayuda
        </Button>
      </div>
    
      <div className="w-full max-w-md flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-md flex flex-col items-center space-y-4">
          <LicensePlate />
          <WordInput />
          
          {/* Score components in a single row */}
          <div className="w-full grid grid-cols-2 gap-4 mb-4">
            {/* Total Points Panel - with updated icon */}
            <motion.div initial={{
            opacity: 0,
            x: -20
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            delay: 0.1
          }} whileHover={{
            scale: 1.02
          }} className="rounded-lg p-4 shadow-lg text-center py-[6px] bg-transparent">
              <div className="flex items-center justify-center gap-2">
                <motion.div animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }} transition={{
                duration: 3,
                repeat: Infinity
              }}>
                  <motion.div className="w-14 h-14 text-3xl text-game-green">🏅</motion.div>
                </motion.div>
                <h3 className="text-purple-800 kids-text font-normal text-xl">Puntos</h3>
              </div>
              <motion.p className="text-3xl text-purple-900 kids-text mt-1 font-normal" animate={{
              scale: [1, 1.05, 1]
            }} transition={{
              duration: 2,
              repeat: Infinity
            }}>
                {totalPoints}
              </motion.p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <motion.div className="bg-game-green h-2 rounded-full" initial={{
                width: "0%"
              }} animate={{
                width: `${totalPoints % 500 / 5}%`
              }} transition={{
                duration: 1
              }} />
              </div>
            </motion.div>
            
            {/* Level Panel - Updated to be transparent and without border */}
            <motion.div initial={{
            opacity: 0,
            x: 20
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            delay: 0.1
          }} whileHover={{
            scale: 1.02
          }} className="rounded-lg p-4 bg-transparent shadow-lg text-center py-[5px]">
              <div className="flex items-center justify-center gap-2">
                <motion.div animate={{
                rotate: [0, 10, -10, 0]
              }} transition={{
                duration: 2,
                repeat: Infinity
              }}>
                  <motion.div className="w-14 h-14 text-3xl text-game-purple">🏆</motion.div>
                </motion.div>
                <h3 className="text-xl text-purple-800 kids-text font-normal">Nivel</h3>
              </div>
              <motion.p className="text-3xl text-purple-900 kids-text mt-1 font-normal" animate={level > 1 ? {
              scale: [1, 1.2, 1]
            } : {}} transition={{
              duration: 0.5
            }}>
                {level}
              </motion.p>
              {/* Removed "¡Nivel desbloqueado!" text and replaced with empty spacing */}
              <p className="opacity-0">·</p>
            </motion.div>
          </div>
          
          {/* "Has llegado hasta" panel - Moved before the map */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.3
        }} className="w-full rounded-lg p-5 shadow-lg bg-purple-200">
            <div className="text-center mb-4">
              <h2 className="text-2xl font-normal text-purple-800 kids-text flex items-center justify-center">
                <motion.span animate={{
                scale: [1, 1.1, 1]
              }} transition={{
                duration: 2,
                repeat: Infinity
              }}>
                  ✨
                </motion.span>
                <span className="mx-2 font-normal text-2xl">Este nivel te permite conducir hasta:</span>
                <motion.span animate={{
                scale: [1, 1.1, 1]
              }} transition={{
                duration: 2,
                repeat: Infinity,
                delay: 1
              }}>
                  ✨
                </motion.span>
              </h2>
              
              <div className="flex items-center justify-center gap-2 my-4">
                <motion.p className="text-4xl font-normal text-purple-900 kids-text" animate={{
                scale: [1, 1.05, 1]
              }} transition={{
                duration: 2,
                repeat: Infinity
              }}>
                  {destinationInfo.city}
                </motion.p>
                <motion.span className="text-5xl" animate={{
                rotate: [0, 10, -10, 0]
              }} transition={{
                duration: 2,
                repeat: Infinity
              }}>
                  {destinationInfo.flag}
                </motion.span>
              </div>
              
              <p className="text-purple-700 mb-4 kids-text font-normal text-4xl">
                {destinationInfo.country}
              </p>
              
              <Link to={`/country/${destinationInfo.country}`}>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white text-xl px-6 py-3 kids-text font-normal">
                  Conoce {destinationInfo.country} {destinationInfo.flag}
                </Button>
              </Link>
            </div>
          </motion.div>
          
          {/* Mapa Mundi con países desbloqueados - Now after "Has llegado hasta" panel */}
          <motion.div className="w-full h-[200px] rounded-lg overflow-hidden mb-2 border-4 border-white/50 shadow-lg relative" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.2
        }}>
            
          </motion.div>
          
          {/* Drawing Game Button */}
          <motion.div className="w-full bg-purple-200/90 rounded-lg p-4 shadow-lg" initial={{
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
              <h2 className="text-2xl text-purple-800 kids-text mb-3 font-normal">Conduce tu coche al destino</h2>
              <p className="text-purple-700 kids-text mb-4 font-normal text-xl">Dibuja un camino y conduce hasta tu país destino</p>
              <Link to="/draw-game">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white text-xl kids-text px-6 py-3 font-normal">
                  <Car className="mr-2 h-6 w-6" /> Jugar
                </Button>
              </Link>
            </div>
          </motion.div>
          
          {/* Reset Game Button - in purple */}
          <motion.div className="w-full max-w-xs mt-8" whileHover={{
          scale: 1.03
        }} transition={{
          type: "spring",
          stiffness: 400
        }}>
            <Button onClick={handleResetGame} size="lg" className="w-full text-white kids-text py-6 bg-gray-600 hover:bg-gray-500 text-xl font-normal">
              <RefreshCw className="mr-2 h-5 w-5" /> Iniciar nueva partida
            </Button>
          </motion.div>
        </div>
        
        {/* Error Alert using GamePopup */}
        <ErrorAlert />
        
        {/* Success Popup */}
        <GamePopup open={showSuccess} onClose={() => setShowSuccess(false)} type="success" message="¡MUY BIEN!" points={score} />
        
        {/* Level Up Popup */}
        <GamePopup open={showLevelUp} onClose={() => setShowLevelUp(false)} type="levelUp" message="¡NIVEL DESBLOQUEADO!" level={level} />
        
        {showInstructions && <GameInstructions onClose={() => setShowInstructions(false)} />}
      </div>
      <Toaster />
    </div>;
};
export default Index;