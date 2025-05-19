
import React, { useEffect, useState } from "react";
import { useGame } from "@/context/GameContext";
import { useLanguage } from "@/context/LanguageContext";
import LicensePlate from "@/components/LicensePlate";
import WordInput from "@/components/WordInput";
import ScoreDisplay from "@/components/ScoreDisplay";
import SuccessAlert from "@/components/SuccessAlert";
import ErrorAlert from "@/components/ErrorAlert";
import PlayerRegistration from "@/components/PlayerRegistration";
import WorldMap from "@/components/WorldMap";
import { motion } from "framer-motion";
import CarCustomization from "@/components/CarCustomization";
import LanguageSelector from "@/components/LanguageSelector";
import ScorePanel from "@/components/ScorePanel";
import GameInstructions from "@/components/GameInstructions";
import WorldTourProgress from "@/components/WorldTourProgress";
import TotalPointsPanel from "@/components/TotalPointsPanel";
import NewGameButton from "@/components/NewGameButton";
import { CircleHelp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface IndexProps {
  hideInitialImage?: boolean;
}

const Index: React.FC<IndexProps> = ({ hideInitialImage = false }) => {
  const [showInstructions, setShowInstructions] = useState(false);
  const { playerName, totalPoints, level, destinationInfo } = useGame();
  const { isEnglish } = useLanguage();

  // Determine theme colors based on language
  const bgGradient = isEnglish
    ? "from-orange-300 to-yellow-100"
    : "from-purple-300 to-blue-100";

  const handleInstructionsClose = () => {
    setShowInstructions(false);
  };

  return (
    <div className={`min-h-screen bg-gradient-to-b ${bgGradient} px-4 py-8 overflow-x-hidden`}>
      <div className="max-w-4xl mx-auto">
        {/* Language selector in top right */}
        <LanguageSelector />

        {/* Main container */}
        <div className="flex flex-col items-center justify-center">
          {/* Game title with car - only show if not hiding initial image */}
          {!hideInitialImage && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 text-center"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-purple-900 kids-text mb-2">
                MATRICULABRA CADABRA
              </h1>
              <img
                src="/lovable-uploads/coche_portada.gif"
                alt="Game logo"
                className="h-40 object-contain"
              />
            </motion.div>
          )}

          {/* 1. Nombre y años, con icono de ayuda arriba a la derecha */}
          <div className="w-full relative mb-6">
            <PlayerRegistration />
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute top-0 right-0" 
              onClick={() => setShowInstructions(true)}
            >
              <CircleHelp className="h-6 w-6" />
            </Button>
          </div>

          {/* 2. "ELIGE COCHE" y "CONDUCE" */}
          <CarCustomization />
          
          {/* Score Panel - Always visible */}
          <ScorePanel />

          {/* 3. El coche seleccionado desplazándose de izquierda a derecha */}
          <div className="w-full my-4">
            <WorldTourProgress />
          </div>

          {/* 4. Matrícula y campo para introducir la palabra */}
          <div className="w-full">
            <LicensePlate />
            <WordInput />
          </div>

          {/* World map */}
          <WorldMap 
            highlightCountry={destinationInfo?.country || "España"} 
            unlockedCountries={Array.from({ length: level }, (_, i) => i + 1).map(
              lvl => {
                switch(lvl) {
                  case 1: return "España";
                  case 2: return "Francia";
                  case 3: return "Italia";
                  case 4: return "Rusia";
                  case 5: return "Japón";
                  case 6: return "Australia";
                  case 7: return "Estados Unidos";
                  case 8: return "México";
                  case 9: return "Argentina";
                  case 10: return "España";
                  default: return "";
                }
              }
            ).filter(Boolean)}
          />

          {/* Total points panel */}
          <TotalPointsPanel />

          {/* 5. Botón de iniciar partida */}
          <NewGameButton />

          {/* Show instructions when button is clicked */}
          {showInstructions && (
            <GameInstructions onClose={handleInstructionsClose} />
          )}

          {/* Success and Error Alert modals */}
          <SuccessAlert />
          <ErrorAlert />
        </div>
      </div>
    </div>
  );
};

export default Index;
