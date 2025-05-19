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
  const [showForm, setShowForm] = useState(!playerName || !playerAge);

  // Set color theme based on language
  const bgColor = isEnglish ? "bg-orange-100/70 backdrop-blur-sm" : "bg-purple-100/70 backdrop-blur-sm";
  const btnColor = isEnglish ? "border-orange-400 text-orange-700 hover:bg-orange-100" : "border-purple-400 text-purple-700 hover:bg-purple-100";
  const panelBg = isEnglish ? "bg-orange-200/80 backdrop-blur-sm" : "bg-violet-200/80 backdrop-blur-sm";
  const textColor = isEnglish ? "text-orange-800" : "text-purple-800";

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
  useEffect(() => {
    // If we have both name and age, hide the form
    if (playerName && playerAge) {
      setShowForm(false);
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
          <p className={`${isEnglish ? 'text-orange-700' : 'text-purple-700'} kids-text mb-4 text-center font-normal text-lg`}>
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
          {/* Player info display */}
          <motion.div className="flex items-center justify-center mb-2">
            <div className="flex items-center justify-center">
              {playerGender === 'niño' ? <span className="text-xl mr-2">👦</span> : <span className="text-xl mr-2">👧</span>}
              <span className="text-4xl font-medium text-purple-900">
                {playerName} {playerAge} {t('years')}
              </span>
            </div>
            <Button size="sm" variant="outline" className={`${btnColor} ml-2`} onClick={() => setShowForm(true)}>
              {t('edit')}
            </Button>
          </motion.div>
        </motion.div>}
    </>;
};
export default PlayerRegistration;