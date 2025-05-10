
import React, { useState } from "react";
import { GameProvider } from "@/context/GameContext";
import LicensePlate from "@/components/LicensePlate";
import WordInput from "@/components/WordInput";
import ScoreDisplay from "@/components/ScoreDisplay";
import NewGameButton from "@/components/NewGameButton";
import ErrorAlert from "@/components/ErrorAlert";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import GameInstructions from "@/components/GameInstructions";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const [showInstructions, setShowInstructions] = useState(false);
  const isMobile = useIsMobile();

  return (
    <GameProvider>
      <div 
        className="min-h-screen flex flex-col items-center relative overflow-hidden"
        style={{
          backgroundImage: "url('/lovable-uploads/276d9054-061e-45b9-9517-d7f0d8218579.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed"
        }}
      >
        <motion.img 
          src="/lovable-uploads/aa16d3eb-100f-4916-ba38-871f34a715da.png"
          alt="Matriculabra Cadabra"
          className="w-full object-cover mb-4"
          style={{
            maxHeight: isMobile ? "25vh" : "auto"
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
              className="bg-white/90 hover:bg-white"
              onClick={() => setShowInstructions(true)}
            >
              <Info className="w-4 h-4 mr-1" /> Instrucciones
            </Button>
          </div>

          <div className="w-full max-w-md flex flex-col items-center space-y-4">
            <LicensePlate />
            
            <NewGameButton />
            
            <WordInput />
            
            <ScoreDisplay />
          </div>
          
          <ErrorAlert />
          
          {showInstructions && (
            <GameInstructions onClose={() => setShowInstructions(false)} />
          )}
        </div>
      </div>
    </GameProvider>
  );
};

export default Index;
