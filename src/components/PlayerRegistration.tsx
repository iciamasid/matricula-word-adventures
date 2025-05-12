import React, { useState, useEffect } from "react";
import { useGame } from "@/context/GameContext";
import PlayerNameInput from "@/components/PlayerNameInput";
import PlayerAgeInput from "@/components/PlayerAgeInput";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { User, UserRound } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
const PlayerRegistration: React.FC = () => {
  const {
    playerName,
    playerAge,
    playerGender,
    setPlayerName,
    setPlayerAge,
    setPlayerGender
  } = useGame();
  const [showForm, setShowForm] = useState(!playerName || !playerAge || !playerGender);
  useEffect(() => {
    // If we have both name, age and gender, hide the form
    if (playerName && playerAge && playerGender) {
      setShowForm(false);
    }
  }, [playerName, playerAge, playerGender]);
  return <>
      {showForm ? <motion.div className="w-full max-w-md bg-purple-100/90 rounded-lg p-5 shadow-lg mb-4" initial={{
      opacity: 0,
      y: -20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.5
    }}>
          <h2 className="text-xl text-purple-800 kids-text mb-4 text-center font-normal">
            ¡Bienvenido a Matriculabra Cadabra!
          </h2>
          <p className="text-purple-700 kids-text mb-4 text-center font-normal text-lg">
            Por favor, dinos tu nombre y edad para comenzar a jugar.
          </p>
          <div className="space-y-4">
            <PlayerNameInput onSave={setPlayerName} initialName={playerName} />
            <PlayerAgeInput onSave={setPlayerAge} initialAge={playerAge} />
            
            {/* Gender Selection */}
            <motion.div className="bg-white/90 rounded-lg p-4 shadow-md" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.3
        }}>
              <p className="text-lg font-medium text-purple-800 kids-text mb-2">¿Eres niño o niña?</p>
              <RadioGroup value={playerGender || ''} onValueChange={value => {
            setPlayerGender(value as "niño" | "niña");
            localStorage.setItem("matriculabraCadabra_playerGender", value);
          }} className="flex gap-6">
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="niño" id="radio-niño" />
                  <Label htmlFor="radio-niño" className="text-purple-700 kids-text flex items-center">
                    <span className="mr-1">Niño</span> 
                    <span className="text-xl">👦</span>
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="niña" id="radio-niña" />
                  <Label htmlFor="radio-niña" className="text-purple-700 kids-text flex items-center">
                    <span className="mr-1">Niña</span> 
                    <span className="text-xl">👧</span>
                  </Label>
                </div>
              </RadioGroup>
            </motion.div>
          </div>
        </motion.div> : <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} className="w-full max-w-md flex justify-between items-center rounded-lg p-3 shadow-md mb-4 bg-violet-200">
          <div className="flex items-center">
            {playerGender === "niño" ? <span className="text-xl mr-2">👦</span> : <span className="text-xl mr-2">👧</span>}
            <span className="font-medium text-purple-800 kids-text text-3xl">
              {playerName}, {playerAge} años
            </span>
          </div>
          <Button size="sm" variant="outline" className="border-purple-400 text-purple-700 hover:bg-purple-100" onClick={() => setShowForm(true)}>
            Editar
          </Button>
        </motion.div>}
    </>;
};
export default PlayerRegistration;