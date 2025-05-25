import React, { useState, useEffect } from "react";
import { useGame } from "@/context/GameContext";
import PlayerNameInput from "@/components/PlayerNameInput";
import PlayerAgeInput from "@/components/PlayerAgeInput";
import CarCustomization from "@/components/CarCustomization";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { User, UserRound, Car, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useLanguage } from "@/context/LanguageContext";

const PlayerRegistration: React.FC = () => {
  const {
    playerName,
    playerAge,
    playerGender,
    selectedCarColor,
    setPlayerName,
    setPlayerAge,
    setPlayerGender
  } = useGame();
  const {
    t,
    isEnglish
  } = useLanguage();

  // Always show the form when first loading if either name or age is not set
  const [showForm, setShowForm] = useState(true);

  // Check if we're on motorcycle game page
  const isMotorcycleGame = sessionStorage.getItem('currentGameType') === 'motorcycle-game';

  // Set color theme based on game type
  const bgColor = isMotorcycleGame ? "bg-teal-100/70 backdrop-blur-sm" : (isEnglish ? "bg-orange-100/70 backdrop-blur-sm" : "bg-purple-100/70 backdrop-blur-sm");
  const btnColor = isMotorcycleGame ? "text-teal-800 bg-teal-400 hover:bg-teal-300" : (isEnglish ? "border-orange-400 text-orange-700 hover:bg-orange-100" : "border-purple-400 text-purple-700 hover:bg-purple-100");
  const panelBg = isMotorcycleGame ? "bg-teal-200/80 backdrop-blur-sm" : (isEnglish ? "bg-orange-200/80 backdrop-blur-sm" : "bg-violet-200/80 backdrop-blur-sm");
  const textColor = isMotorcycleGame ? "text-teal-800" : (isEnglish ? "text-orange-800" : "text-purple-800");

  // Auto-detect gender based on common Spanish name endings
  useEffect(() => {
    if (playerName && !playerGender) {
      // Simple Spanish name gender detection (not comprehensive)
      const nameToCheck = playerName.trim().toLowerCase();
      if (nameToCheck.endsWith('a') || nameToCheck === 'mercedes' || nameToCheck === 'dolores' || nameToCheck === 'ines' || nameToCheck === 'inés' || nameToCheck === 'beatriz' || nameToCheck === 'elena') {
        setPlayerGender('niña');
      } else {
        setPlayerGender('niño');
      }
    }
  }, [playerName, playerGender, setPlayerGender]);

  // Check if both name and age are set on initial load
  useEffect(() => {
    if (playerName && playerAge) {
      setShowForm(false);
    } else {
      setShowForm(true);
    }
  }, [playerName, playerAge]);
  return <>
      {showForm ? <motion.div className={`w-full max-w-md ${bgColor} rounded-lg p-5 shadow-lg mb-4`} initial={{
      opacity: 0,
      y: -20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.5
    }}>
          <h2 className={`text-xl ${textColor} kids-text mb-4 text-center font-normal`}>
            {t('welcome_game')}
          </h2>
          <p className={`${isMotorcycleGame ? 'text-teal-700' : (isEnglish ? 'text-orange-700' : 'text-purple-700')} kids-text mb-4 text-center font-normal text-lg`}>
            {t('please_enter_info')}
          </p>
          <div className="space-y-4">
            <PlayerNameInput onSave={setPlayerName} initialName={playerName} />
            <PlayerAgeInput onSave={setPlayerAge} initialAge={playerAge} />
          </div>
        </motion.div> : <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} className="w-full max-w-md flex flex-col gap-3 mb-4">
          {/* Player info display - Updated to show name in uppercase with age below */}
          <motion.div className="flex flex-col items-center justify-center mb-2">
            <div className="flex flex-col items-center justify-center">
              <span className={`text-4xl font-bold ${isMotorcycleGame ? 'text-teal-900' : 'text-purple-900'} uppercase`}>
                {playerName}
              </span>
              <div className="flex items-center justify-center mt-1">
                {playerGender === 'niño' ? <span className="text-xl mr-2">👦</span> : <span className="text-xl mr-2">👧</span>}
                <span className={`text-3xl font-medium ${isMotorcycleGame ? 'text-teal-800' : 'text-purple-800'}`}>
                  {playerAge} {t('years')}
                </span>
              </div>
            </div>
            <Button size="sm" variant="outline" onClick={() => setShowForm(true)} className={`text-base rounded-xl mt-2 ${btnColor}`}>
              {t('edit')}
            </Button>
          </motion.div>
        </motion.div>}
    </>;
};

export default PlayerRegistration;
