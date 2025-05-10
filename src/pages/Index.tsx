
import React, { useState } from "react";
import { GameProvider } from "@/context/GameContext";
import LicensePlate from "@/components/LicensePlate";
import WordInput from "@/components/WordInput";
import ScoreDisplay from "@/components/ScoreDisplay";
import NewGameButton from "@/components/NewGameButton";
import ErrorAlert from "@/components/ErrorAlert";
import LevelRewards from "@/components/LevelRewards";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import GameInstructions from "@/components/GameInstructions";
import { useIsMobile } from "@/hooks/use-mobile";
import { Toaster } from "@/components/ui/toaster";

const Index = () => {
  const [showInstructions, setShowInstructions] = useState(false);
  const isMobile = useIsMobile();

  return (
    <GameProvider>
      <div 
        className="min-h-screen flex flex-col items-center relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)",
          backgroundSize: "cover",
          backgroundAttachment: "fixed"
        }}
      >
        <motion.img 
          src="/lovable-uploads/aa16d3eb-100f-4916-ba38-871f34a715da.png"
          alt="Matriculabra Cadabra"
          className="w-full object-cover mb-4"
          style={{
            maxHeight: isMobile ? "25vh" : "auto",
            objectFit: "cover",
            objectPosition: "center"
          }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        />
        
        <div className="w-full max-w-md flex flex-col items-center justify-center mt-8 sm:mt-4 px-4">
          <div className="absolute top-4 right-4">
            <Button 
              variant="outline" 
              size="sm" 
              className="bg-purple-100/90 hover:bg-purple-200 text-purple-900 border-purple-300"
              onClick={() => setShowInstructions(true)}
            >
              <Info className="w-4 h-4 mr-1" /> Instrucciones
            </Button>
          </div>

          <div className="w-full max-w-md flex flex-col items-center space-y-4">
            <LicensePlate />
            
            <WordInput />
            
            <NewGameButton />
            
            <ScoreDisplay />
            
            <LevelRewards />
          </div>
          
          <ErrorAlert />
          
          {showInstructions && (
            <GameInstructions onClose={() => setShowInstructions(false)} />
          )}
        </div>
        <Toaster />
      </div>
    </GameProvider>
  );
};

export default Index;
