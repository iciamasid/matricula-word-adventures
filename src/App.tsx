
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import { GameProvider, useGame } from "./context/GameContext";
import Index from "./pages/Index";
import CountryPage from "./pages/CountryPage";
import NotFound from "./pages/NotFound";
import DrawGamePage from "./pages/DrawGamePage";
import BonusPopup from "./components/BonusPopup";
import AgeBonusPopup from "./components/AgeBonusPopup";
import WorldCompletionBanner from "./components/WorldCompletionBanner";

const queryClient = new QueryClient();

const App = () => {
  // Scroll to top when app loads
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          <GameProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/country/:country" element={<CountryPage />} />
                <Route path="/draw-game" element={<DrawGamePage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
            
            {/* Game popups */}
            <GamePopups />
          </GameProvider>
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

// Separate component for all popups to make the code more readable
const GamePopups = () => {
  const { 
    showBonusPopup, 
    setShowBonusPopup, 
    bonusPoints,
    showAgeBonusPopup,
    setShowAgeBonusPopup,
    playerAge,
    showCompletionBanner,
    setShowCompletionBanner
  } = useGame();
  
  return (
    <>
      {/* 6666 license plate bonus popup */}
      <BonusPopup
        open={showBonusPopup}
        onClose={() => setShowBonusPopup(false)}
        points={bonusPoints}
      />
      
      {/* Age matching bonus popup */}
      <AgeBonusPopup
        open={showAgeBonusPopup}
        onClose={() => setShowAgeBonusPopup(false)}
        age={playerAge}
        points={20}
      />
      
      {/* World tour completion banner */}
      <WorldCompletionBanner
        open={showCompletionBanner}
        onClose={() => setShowCompletionBanner(false)}
      />
    </>
  );
};

export default App;
