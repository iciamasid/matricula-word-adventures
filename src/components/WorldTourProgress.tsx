
import React, { useState, useEffect } from 'react';
import { useGame } from '@/context/GameContext';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import WorldTourProgressMini from './WorldTourProgressMini';

const WorldTourProgress = () => {
  const { level, markCountryAsVisited, requiredCountryToVisit, clearLevelUpMessage } = useGame();
  const { isEnglish } = useLanguage?.() || { language: 'es' };

  // Function to get the latest unlocked country name
  const getLatestUnlockedCountry = () => {
    if (level >= 10) return isEnglish ? "Argentina (complete tour)" : "Argentina (vuelta completa)";
    if (level >= 9) return isEnglish ? "Argentina" : "Argentina";
    if (level >= 8) return isEnglish ? "Australia" : "Australia";
    if (level >= 7) return isEnglish ? "Mexico" : "México";
    if (level >= 6) return isEnglish ? "United States" : "Estados Unidos";
    if (level >= 5) return isEnglish ? "Japan" : "Japón";
    if (level >= 4) return isEnglish ? "Russia" : "Rusia";
    if (level >= 3) return isEnglish ? "Italy" : "Italia";
    if (level >= 2) return isEnglish ? "France" : "Francia";
    return isEnglish ? "Spain" : "España";
  };

  const handleCountryVisit = (countryCode: string) => {
    // This function will be called when a country modal is closed
    console.log(`Country visited: ${countryCode}`);
  };

  const panelBgColor = "bg-purple-200";
  const textColor = "text-purple-800";
  const textColorLight = "text-purple-700";

  return (
    <motion.div
      className="w-full max-w-md mx-auto"
      whileHover={{
        scale: 1.02
      }}
      transition={{
        type: "spring",
        stiffness: 400
      }}
    >
      <Card className={`w-full ${panelBgColor} border-purple-300 shadow-lg`}>
        <CardContent className="p-6">
          <div className="text-center mb-4">
            <h3 className={`text-2xl font-bold mb-2 ${textColor} kids-text`}>
              🌍 {isEnglish ? "YOUR WORLD TOUR" : "TU VUELTA AL MUNDO"}
            </h3>
            <p className={`text-lg font-medium ${textColorLight} kids-text mb-2`}>
              {isEnglish ? "Click on the flags and explore that country!" : "¡Pincha sobre las banderas y explora ese país!"}
            </p>
            <p className={`text-base font-medium ${textColor} kids-text`}>
              {isEnglish ? `You have reached: ${getLatestUnlockedCountry()}` : `Has llegado hasta: ${getLatestUnlockedCountry()}`}
            </p>
          </div>
          
          {/* Mini world tour component */}
          <div className="w-full h-[300px] mb-4">
            <WorldTourProgressMini onCountryVisit={handleCountryVisit} />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default WorldTourProgress;
