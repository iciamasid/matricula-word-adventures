
import React, { useState, useEffect } from "react";
import { useGame } from "@/context/GameContext";
import PlayerNameInput from "@/components/PlayerNameInput";
import PlayerAgeInput from "@/components/PlayerAgeInput";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

const PlayerRegistration: React.FC = () => {
  const { playerName, playerAge, setPlayerName, setPlayerAge } = useGame();
  const [showForm, setShowForm] = useState(!playerName || !playerAge);
  
  useEffect(() => {
    // If we have both name and age, hide the form
    if (playerName && playerAge) {
      setShowForm(false);
    }
  }, [playerName, playerAge]);
  
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
          <p className="text-purple-700 kids-text mb-4 text-center">
            Por favor, dinos tu nombre y edad para comenzar a jugar.
          </p>
          <div className="space-y-4">
            <PlayerNameInput onSave={setPlayerName} initialName={playerName} />
            <PlayerAgeInput onSave={setPlayerAge} initialAge={playerAge} />
          </div>
        </motion.div>
      ) : (
        <motion.div
          className="w-full max-w-md flex justify-between items-center bg-white/90 rounded-lg p-3 shadow-md mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center">
            <User className="w-5 h-5 text-purple-600 mr-2" />
            <span className="text-lg font-medium text-purple-800 kids-text">
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
      )}
    </>
  );
};

export default PlayerRegistration;
