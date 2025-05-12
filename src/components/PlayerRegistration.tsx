
import React, { useState, useEffect } from "react";
import { useGame } from "@/context/GameContext";
import PlayerNameInput from "@/components/PlayerNameInput";
import PlayerAgeInput from "@/components/PlayerAgeInput";
import CarCustomization from "@/components/CarCustomization";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { User, UserRound, Car, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "@/hooks/use-toast";

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
  const [showForm, setShowForm] = useState(!playerName || !playerAge);
  const [showCarCustomization, setShowCarCustomization] = useState(false);

  // Auto-detect gender based on common Spanish name endings
  useEffect(() => {
    if (playerName && !playerGender) {
      // Simple Spanish name gender detection (not comprehensive)
      const nameToCheck = playerName.trim().toLowerCase();
      if (nameToCheck.endsWith('a') || 
          nameToCheck === 'mercedes' || 
          nameToCheck === 'dolores' || 
          nameToCheck === 'ines' || 
          nameToCheck === 'inés' ||
          nameToCheck === 'beatriz' ||
          nameToCheck === 'elena') {
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

  const toggleCarCustomization = () => {
    setShowCarCustomization(!showCarCustomization);
  };

  // Auto-hide car customization when a car is selected
  useEffect(() => {
    if (selectedCarColor) {
      // Add a small delay before closing to let the user see the selection
      const timer = setTimeout(() => {
        setShowCarCustomization(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [selectedCarColor]);

  return (
    <>
      {showForm ? (
        <motion.div
          className="w-full max-w-md bg-purple-100/90 rounded-lg p-5 shadow-lg mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl text-purple-800 kids-text mb-4 text-center font-normal">
            ¡Bienvenido a Matriculabra Cadabra!
          </h2>
          <p className="text-purple-700 kids-text mb-4 text-center font-normal text-lg">
            Por favor, dinos tu nombre y edad para comenzar a jugar.
          </p>
          <div className="space-y-4">
            <PlayerNameInput onSave={setPlayerName} initialName={playerName} />
            <PlayerAgeInput onSave={setPlayerAge} initialAge={playerAge} />
            
            {/* Replace gender selection with car selection */}
            <motion.div
              className="bg-white/90 rounded-lg p-4 shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-lg font-medium text-purple-800 kids-text mb-2">Selecciona tu coche</p>
              <CarCustomization 
                isOpen={true} 
                onToggle={() => {}} 
                embedded={true}
              />
            </motion.div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md flex flex-col gap-3 mb-4"
        >
          {/* Player info display */}
          <motion.div className="flex justify-between items-center rounded-lg p-3 shadow-md bg-violet-200">
            <div className="flex items-center">
              {playerGender === "niño" ? <span className="text-xl mr-2">👦</span> : <span className="text-xl mr-2">👧</span>}
              <span className="font-medium text-purple-800 kids-text text-3xl">
                {playerName}, {playerAge} años
              </span>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="border-purple-400 text-purple-700 hover:bg-purple-100"
              onClick={() => setShowForm(true)}
            >
              Editar
            </Button>
          </motion.div>
          
          {/* Car selection button */}
          <motion.div 
            className="flex justify-between items-center rounded-lg p-3 shadow-md bg-violet-200 cursor-pointer"
            onClick={toggleCarCustomization}
          >
            <div className="flex items-center">
              <Car className="h-5 w-5 mr-2 text-purple-700" />
              <span className="font-medium text-purple-800 kids-text text-xl">
                {selectedCarColor ? "Tu coche seleccionado" : "Selecciona tu coche"}
              </span>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="border-purple-400 text-purple-700 hover:bg-purple-100"
              onClick={toggleCarCustomization}
            >
              {showCarCustomization ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </motion.div>
          
          {/* Car customization panel */}
          <CarCustomization isOpen={showCarCustomization} onToggle={toggleCarCustomization} />
        </motion.div>
      )}
    </>
  );
};

export default PlayerRegistration;
