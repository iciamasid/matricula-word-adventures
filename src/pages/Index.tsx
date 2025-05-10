
import React, { useState, useEffect } from "react";
import { GameProvider, useGame } from "@/context/GameContext";
import LicensePlate from "@/components/LicensePlate";
import WordInput from "@/components/WordInput";
import ErrorAlert from "@/components/ErrorAlert";
import LevelRewards from "@/components/LevelRewards";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Flag, Info, RefreshCw } from "lucide-react";
import GameInstructions from "@/components/GameInstructions";
import { useIsMobile } from "@/hooks/use-mobile";
import { Toaster } from "@/components/ui/toaster";
import WorldMap from "@/components/WorldMap";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

// Función para obtener la bandera según el nivel
const getLevelFlag = (level: number) => {
  switch(level) {
    case 1: return "🇪🇸"; // España
    case 2: return "🇫🇷"; // Francia
    case 3: return "🇮🇹"; // Italia
    case 4: return "🇷🇺"; // Rusia
    case 5: return "🇯🇵"; // Japón
    case 6: return "🇺🇸"; // Estados Unidos
    case 7: return "🇦🇷"; // Argentina
    case 8: return "🇲🇽"; // México
    case 9: return "🇦🇺"; // Australia
    case 10: return "🇦🇶"; // Antártida
    default: return "🇪🇸";
  }
};

// Componente para manejar el contenido del juego
const GameContent = () => {
  const [showInstructions, setShowInstructions] = useState(false);
  const isMobile = useIsMobile();
  const { totalPoints, destinationInfo, level, resetGame } = useGame();
  
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
  
  return (
    <div 
      className="min-h-screen flex flex-col items-center relative overflow-hidden"
      style={{
        backgroundColor: "rgb(154, 131, 185)",
        backgroundSize: "cover",
        backgroundAttachment: "fixed"
      }}
    >
      <motion.img 
        src="/lovable-uploads/aa16d3eb-100f-4916-ba38-871f34a715da.png"
        alt="Matriculabra Cadabra"
        className="w-full object-contain mb-4 px-0"
        style={{
          maxHeight: isMobile ? "28vh" : "30vh",
          width: "100%",
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      />
      
      <div className="w-full max-w-md flex flex-col items-center justify-center px-4">
        <div className="absolute top-4 right-4">
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-purple-100/90 hover:bg-purple-200 text-purple-900 border-purple-300 kids-text"
            onClick={() => setShowInstructions(true)}
          >
            <Info className="w-4 h-4 mr-1" /> Instrucciones
          </Button>
        </div>

        <div className="w-full max-w-md flex flex-col items-center space-y-4">
          <LicensePlate />
          
          <p className="text-white text-lg font-bold mb-2 kids-text">
            Forma una palabra con estas consonantes
          </p>
          
          <WordInput />
          
          {/* Separate score and level panels */}
          <div className="w-full grid grid-cols-2 gap-4">
            <motion.div 
              className="rounded-lg p-3 bg-white/90 shadow-lg text-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-xl font-bold text-purple-800 kids-text">Puntos</h3>
              <p className="text-2xl font-bold text-purple-900 kids-text">{totalPoints}</p>
            </motion.div>
            
            <motion.div 
              className="rounded-lg p-3 bg-white/90 shadow-lg text-center"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-xl font-bold text-purple-800 kids-text">Nivel {getLevelFlag(level)}</h3>
              <p className="text-2xl font-bold text-purple-900 kids-text">{level}</p>
            </motion.div>
          </div>
          
          {/* Title for the map */}
          <motion.h2 
            className="text-xl font-bold text-white mt-4 mb-2 text-center kids-text reward-text"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            ¿A qué países has viajado ya con tus matrículas acertadas?
          </motion.h2>
          
          {/* Mapa Mundi con países desbloqueados */}
          <motion.div 
            className="w-full h-[200px] rounded-lg overflow-hidden mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <WorldMap 
              highlightCountry={destinationInfo.country} 
              unlockedCountries={unlockedCountries}
            />
          </motion.div>
          
          <LevelRewards />
          
          {/* Reset Game Button */}
          <motion.div
            className="w-full max-w-xs mt-8"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <Button
              onClick={handleResetGame}
              className="w-full bg-red-600 hover:bg-red-700 text-white kids-text py-6"
              size="lg"
            >
              <RefreshCw className="mr-2 h-5 w-5" /> Iniciar nueva partida
            </Button>
          </motion.div>
        </div>
        
        <ErrorAlert />
        
        {showInstructions && (
          <GameInstructions onClose={() => setShowInstructions(false)} />
        )}
      </div>
      <Toaster />
    </div>
  );
};

const Index = () => {
  return (
    <GameProvider>
      <GameContent />
    </GameProvider>
  );
};

export default Index;
