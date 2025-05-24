import React, { useState, useEffect } from 'react';
import { useGame } from '@/context/GameContext';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import WorldTourProgressMini from './WorldTourProgressMini';
import { useLocation } from 'react-router-dom';
const WorldTourProgress = () => {
  const {
    level,
    markCountryAsVisited,
    requiredCountryToVisit,
    clearLevelUpMessage
  } = useGame();
  const {
    isEnglish
  } = useLanguage?.() || {
    language: 'es'
  };
  const location = useLocation();

  // Determine if we're in motorcycle game
  const isMotorcycleGame = location.pathname === '/motorcycle-game';

  // Function to get the latest unlocked country name with level 1 special case
  const getLatestUnlockedCountry = () => {
    if (level === 1) {
      return isEnglish ? "You are in Spain" : "Estás en España";
    }
    if (isMotorcycleGame) {
      // Motorcycle game countries
      if (level >= 10) return isEnglish ? "You have reached: Spain (complete tour)" : "Has llegado hasta: España (vuelta completa)";
      if (level >= 9) return isEnglish ? "You have reached: Peru" : "Has llegado hasta: Perú";
      if (level >= 8) return isEnglish ? "You have reached: Brazil" : "Has llegado hasta: Brasil";
      if (level >= 7) return isEnglish ? "You have reached: Costa Rica" : "Has llegado hasta: Costa Rica";
      if (level >= 6) return isEnglish ? "You have reached: Canada" : "Has llegado hasta: Canadá";
      if (level >= 5) return isEnglish ? "You have reached: China" : "Has llegado hasta: China";
      if (level >= 4) return isEnglish ? "You have reached: Norway" : "Has llegado hasta: Noruega";
      if (level >= 3) return isEnglish ? "You have reached: Greece" : "Has llegado hasta: Grecia";
      if (level >= 2) return isEnglish ? "You have reached: United Kingdom" : "Has llegado hasta: Reino Unido";
    } else {
      // Car game countries
      if (level >= 10) return isEnglish ? "You have reached: Spain (complete tour)" : "Has llegado hasta: España (vuelta completa)";
      if (level >= 9) return isEnglish ? "You have reached: Argentina" : "Has llegado hasta: Argentina";
      if (level >= 8) return isEnglish ? "You have reached: Australia" : "Has llegado hasta: Australia";
      if (level >= 7) return isEnglish ? "You have reached: Mexico" : "Has llegado hasta: México";
      if (level >= 6) return isEnglish ? "You have reached: United States" : "Has llegado hasta: Estados Unidos";
      if (level >= 5) return isEnglish ? "You have reached: Japan" : "Has llegado hasta: Japón";
      if (level >= 4) return isEnglish ? "You have reached: Russia" : "Has llegado hasta: Rusia";
      if (level >= 3) return isEnglish ? "You have reached: Italy" : "Has llegado hasta: Italia";
      if (level >= 2) return isEnglish ? "You have reached: France" : "Has llegado hasta: Francia";
    }
    return isEnglish ? "You are in Spain" : "Estás en España";
  };
  const handleCountryVisit = (countryCode: string) => {
    // This function will be called when a country modal is closed
    console.log(`Country visited: ${countryCode}`);
  };

  // Use different colors based on game type
  const panelBgColor = isMotorcycleGame ? "bg-teal-200" : "bg-purple-200";
  const textColor = isMotorcycleGame ? "text-teal-800" : "text-purple-800";
  const textColorLight = isMotorcycleGame ? "text-teal-700" : "text-purple-700";
  const borderColor = isMotorcycleGame ? "border-teal-300" : "border-purple-300";
  return <motion.div className="w-full max-w-md mx-auto" whileHover={{
    scale: 1.02
  }} transition={{
    type: "spring",
    stiffness: 400
  }}>
      <Card className={`w-full ${panelBgColor} ${borderColor} shadow-lg`}>
        <CardContent className="p-6">
          <div className="text-center mb-4">
            <h3 className={`text-2xl font-bold mb-3 ${textColor} kids-text`}>
              🌍 {isEnglish ? "YOUR WORLD TOUR" : "TU VUELTA AL MUNDO"}
            </h3>
            <p className="text-lg my-0 text-purple-800">
              {isEnglish ? "Click on the flags and explore that country!" : "¡Pincha sobre las banderas y explora ese país!"}
            </p>
            <p className={`text-lg font-medium ${textColor} kids-text`}>
              {getLatestUnlockedCountry()}
            </p>
          </div>
          
          {/* Mini world tour component with more space below */}
          <div className="w-full h-[400px] mb-6">
            <WorldTourProgressMini onCountryVisit={handleCountryVisit} />
          </div>
        </CardContent>
      </Card>
    </motion.div>;
};
export default WorldTourProgress;