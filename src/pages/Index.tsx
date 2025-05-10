
import React, { useState } from "react";
import { GameProvider } from "@/context/GameContext";
import LicensePlate from "@/components/LicensePlate";
import WordInput from "@/components/WordInput";
import ScoreDisplay from "@/components/ScoreDisplay";
import LevelRewards from "@/components/LevelRewards";
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
        className="min-h-screen flex flex-col items-center px-4 py-6 relative overflow-hidden"
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
          className="w-full mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        />
        
        <div className="w-full max-w-md flex flex-col items-center justify-center mt-16 sm:mt-8">
          <div className="absolute top-4 right-4">
            <Button 
              variant="outline" 
              size="sm" 
              className="bg-white/80 hover:bg-white"
              onClick={() => setShowInstructions(true)}
            >
              <Info className="w-4 h-4 mr-1" /> Instrucciones
            </Button>
          </div>

          <div className="w-full max-w-md flex flex-col items-center space-y-4">
            <LicensePlate />
            
            <NewGameButton />
            
            <motion.div
              className="bg-white/90 py-3 px-4 rounded-lg shadow-lg text-center font-medium text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Forma una palabra usando estas consonantes:
            </motion.div>

            <WordInput />
            
            <ScoreDisplay />
            
            <LevelRewards />
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
