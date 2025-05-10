
import React, { useState, useEffect } from "react";
import { GameProvider, useGame } from "@/context/GameContext";
import LicensePlate from "@/components/LicensePlate";
import WordInput from "@/components/WordInput";
import ScoreDisplay from "@/components/ScoreDisplay";
import NewGameButton from "@/components/NewGameButton";
import ErrorAlert from "@/components/ErrorAlert";
import LevelRewards from "@/components/LevelRewards";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import GameInstructions from "@/components/GameInstructions";
import { useIsMobile } from "@/hooks/use-mobile";
import { Toaster } from "@/components/ui/toaster";
import WorldMap from "@/components/WorldMap";

// Componente para manejar el contenido del juego
const GameContent = () => {
  const [showInstructions, setShowInstructions] = useState(false);
  const isMobile = useIsMobile();
  const { totalPoints, destinationInfo } = useGame();
  
  // Simular países desbloqueados basados en puntos totales
  const unlockedCountries = React.useMemo(() => {
    const countries = [];
    if (totalPoints >= 100) countries.push("España");
    if (totalPoints >= 200) countries.push("Francia");
    if (totalPoints >= 300) countries.push("Italia");
    if (totalPoints >= 400) countries.push("Rusia");
    if (totalPoints >= 500) countries.push("Japón");
    if (totalPoints >= 600) countries.push("Estados Unidos");
    if (totalPoints >= 700) countries.push("Argentina");
    if (totalPoints >= 800) countries.push("Méjico");
    if (totalPoints >= 900) countries.push("Australia");
    if (totalPoints >= 1000) countries.push("Antártida");
    return countries;
  }, [totalPoints]);
  
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
        className="w-full object-cover mb-4 header-image"
        style={{
          maxHeight: isMobile ? "22vh" : "auto",
          objectFit: "cover",
          objectPosition: "center"
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
          
          <WordInput />
          
          <ScoreDisplay />
          
          <NewGameButton />
          
          {/* Mapa Mundi con países desbloqueados */}
          <motion.div 
            className="w-full h-[180px] rounded-lg overflow-hidden mb-2"
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
