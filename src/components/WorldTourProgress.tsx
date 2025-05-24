
import React, { useState, useEffect } from 'react';
import { useGame } from '@/context/GameContext';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import WorldTourProgressMini from './WorldTourProgressMini';

const WorldTourProgress = () => {
  const { level, markCountryAsVisited, requiredCountryToVisit, clearLevelUpMessage } = useGame();
  const { isEnglish } = useLanguage?.() || { language: 'es' };

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
            <p className={`text-lg font-medium ${textColorLight} kids-text`}>
              {isEnglish ? "Click on the flags and explore that country!" : "¡Pincha sobre las banderas y explora ese país!"}
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
