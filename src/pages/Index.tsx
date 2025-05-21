
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import LanguageSelector from "@/components/LanguageSelector";
import { useLanguage } from "@/context/LanguageContext";
import { useGame } from "@/context/GameContext";
import PlayerNameInput from "@/components/PlayerNameInput";
import PlayerRegistration from "@/components/PlayerRegistration";
import TotalPointsPanel from "@/components/TotalPointsPanel";
import LicensePlate from "@/components/LicensePlate";
import WorldMap from "@/components/WorldMap";
import WorldTourProgress from "@/components/WorldTourProgress";
import SuccessAlert from "@/components/SuccessAlert";
import ErrorAlert from "@/components/ErrorAlert";
import LevelUpAlert from "@/components/LevelUpAlert";
import GameInstructions from "@/components/GameInstructions";
import CarCustomization from "@/components/CarCustomization";
import MotorcycleCustomization from "@/components/MotorcycleCustomization";
import ScorePanel from "@/components/ScorePanel";

// Main Index component
const Index: React.FC = () => {
  const { playerName } = useGame();
  const [isMounted, setIsMounted] = useState(false);

  // Wait for animation to complete before showing content
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Conditional rendering based on player registration
  return (
    <div className="min-h-screen flex flex-col p-4 bg-gradient-to-br from-indigo-200/30 to-purple-100/30 relative">
      {/* Language selector */}
      <div className="absolute top-4 right-4 z-50">
        <LanguageSelector />
      </div>
      
      {/* Main content */}
      <motion.div
        className="flex-1 flex flex-col gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Show registration or game interface based on player name */}
        {!playerName ? (
          <PlayerRegistration />
        ) : (
          <GameInterface />
        )}
      </motion.div>
    </div>
  );
};

// Game interface component shown after registration
const GameInterface: React.FC = () => {
  const { isEnglish } = useLanguage();
  const { 
    playerName,
    level,
    originInfo,
    destinationInfo,
    isMotorcycleMode,
    setPlayerName
  } = useGame();
  
  // Determine welcome text based on mode
  const welcomeTitle = isEnglish 
    ? `Welcome, ${playerName}!` 
    : `¡Bienvenido/a, ${playerName}!`;
  
  const tourType = isMotorcycleMode
    ? (isEnglish ? "Motorcycle Tour" : "Tour en Moto")
    : (isEnglish ? "World Tour" : "Vuelta al Mundo");

  return (
    <div className="flex flex-col w-full max-w-6xl mx-auto gap-6">
      {/* Top section */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Left panel */}
        <div className="flex-1 bg-white rounded-lg shadow-md p-6">
          <motion.div
            className="flex flex-col gap-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* Welcome message */}
            <div className="mb-2">
              <h1 className="text-2xl md:text-3xl font-bold kids-text text-center">
                {welcomeTitle}
              </h1>
              <h2 className={`text-xl md:text-2xl font-semibold kids-text text-center ${isMotorcycleMode ? 'text-cyan-600' : 'text-purple-600'}`}>
                {tourType} - {isEnglish ? `Level ${level}` : `Nivel ${level}`}
              </h2>
            </div>
            
            {/* Origin and destination info */}
            <div className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-lg p-4 my-2">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{originInfo.flag}</span>
                <h3 className="text-lg font-medium">{originInfo.city}, {originInfo.country}</h3>
              </div>
              <div className="w-full border-t border-gray-300 my-2"></div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">{destinationInfo.flag}</span>
                <h3 className="text-lg font-medium">{destinationInfo.city}, {destinationInfo.country}</h3>
              </div>
            </div>
            
            {/* Vehicle customization */}
            <CarCustomization />
            <MotorcycleCustomization />
            
            {/* License plate generator */}
            <LicensePlate />
            
            {/* Score panel */}
            <ScorePanel />
            
            {/* World tour progress */}
            <WorldTourProgress />
          </motion.div>
        </div>
        
        {/* Right panel with world map */}
        <div className="flex-1">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <WorldMap 
              highlightCountry={destinationInfo.country}
              unlockedCountries={[]}
            />
          </motion.div>
        </div>
      </div>
      
      {/* Bottom section - Instructions and Points */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <GameInstructions onClose={() => {}} />
          </motion.div>
        </div>
        
        <div className="flex-1 md:max-w-xs">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <TotalPointsPanel />
            <div className="flex flex-wrap gap-2 mt-4">
              <PlayerNameInput 
                onSave={setPlayerName} 
                initialName={playerName} 
              />
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Alert components */}
      <SuccessAlert />
      <ErrorAlert />
      <LevelUpAlert />
    </div>
  );
};

export default Index;
