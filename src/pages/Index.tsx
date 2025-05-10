
import React from "react";
import { GameProvider } from "@/context/GameContext";
import LicensePlate from "@/components/LicensePlate";
import WordInput from "@/components/WordInput";
import ScoreDisplay from "@/components/ScoreDisplay";
import LevelRewards from "@/components/LevelRewards";
import NewGameButton from "@/components/NewGameButton";
import ErrorAlert from "@/components/ErrorAlert";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <GameProvider>
      <div 
        className="min-h-screen flex flex-col items-center px-4 py-8 relative overflow-hidden"
        style={{
          backgroundImage: "url('/lovable-uploads/82ed4a47-c090-4db2-b49e-6041114c97b7.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      >
        <motion.img 
          src="/lovable-uploads/aa16d3eb-100f-4916-ba38-871f34a715da.png"
          alt="Matriculabra Cadabra"
          className="w-full max-w-xs mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        />
        
        <div className="relative z-10 w-full max-w-md flex flex-col items-center mt-24">
          <div className="w-full max-w-md flex flex-col items-center space-y-6">
            <LicensePlate />
            
            <NewGameButton />
            
            <WordInput />
            
            <ScoreDisplay />
            
            <LevelRewards />
          </div>
          
          <ErrorAlert />
        </div>
      </div>
    </GameProvider>
  );
};

export default Index;
