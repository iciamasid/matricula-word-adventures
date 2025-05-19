
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

          {/* Player info and registration section */}
          <PlayerRegistration />

          {/* Score Panel - Always visible */}
          <ScorePanel />

          {/* License Plate and Input Section */}
          <div className="w-full">
            {/* World Tour Progress */}
            <WorldTourProgress />

            {/* License Plate Component - removed className prop */}
            <LicensePlate />

            {/* Word Input Component */}
            <WordInput />

            {/* Car Customization */}
            <CarCustomization />

            {/* Map component - added required props */}
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

            {/* New Game Button */}
            <NewGameButton />

            {/* Game instructions button - add handler to show instructions */}
            <button 
              onClick={() => setShowInstructions(true)}
              className="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md kids-text text-lg"
            >
              Ver instrucciones
            </button>
            
            {/* Show instructions when button is clicked */}
            {showInstructions && (
              <GameInstructions onClose={handleInstructionsClose} />
            )}
          </div>

          {/* Success and Error Alert modals */}
          <SuccessAlert />
          <ErrorAlert />
        </div>
      </div>
    </div>
  );
};

export default Index;
