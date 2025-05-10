
import React from "react";
import { GameProvider } from "@/context/GameContext";
import LicensePlate from "@/components/LicensePlate";
import WordInput from "@/components/WordInput";
import ScoreDisplay from "@/components/ScoreDisplay";
import LevelRewards from "@/components/LevelRewards";
import NewGameButton from "@/components/NewGameButton";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <GameProvider>
      <div 
        className="min-h-screen flex flex-col items-center px-4 py-8 relative"
        style={{
          backgroundImage: "url('/lovable-uploads/501f7c44-46fc-44ae-8a9f-94b1215f5544.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      >
        {/* Eliminamos el overlay translúcido */}
        
        <div className="relative z-10 w-full max-w-md flex flex-col items-center">
          <motion.h1
            className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-game-blue to-game-purple"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Matriculabra Cadabra
          </motion.h1>
          
          <motion.p 
            className="text-gray-600 mb-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            ¡Forma palabras con las consonantes de la matrícula!
          </motion.p>
          
          <div className="w-full max-w-md flex flex-col items-center space-y-6">
            <LicensePlate />
            
            <WordInput />
            
            <ScoreDisplay />
            
            <LevelRewards />
            
            <NewGameButton />
          </div>
        </div>
      </div>
    </GameProvider>
  );
};

export default Index;
