
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
import CompletionConfetti from "./components/CompletionConfetti";
import { useState, useEffect } from "react";
import LoadingScreen from "./components/LoadingScreen";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false
    },
  },
});

// Create a wrapper component to use game context hooks
const GameApp = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { 
    showBonusPopup, 
    setShowBonusPopup, 
    bonusPoints,
    showAgeBonusPopup,
    playerAge,
    showCompletionBanner
  } = useGame();
  
  const handleLoadComplete = () => {
    setIsLoading(false);
  };
  
  return (
    <>
      {isLoading && (
        <LoadingScreen onLoadComplete={handleLoadComplete} />
      )}
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/country/:country" element={<CountryPage />} />
          <Route path="/draw-game" element={<DrawGamePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      
      {/* Bonus popup for 6666 license plate - increased z-index to make sure it's visible */}
      <BonusPopup
        open={showBonusPopup}
        onClose={() => setShowBonusPopup(false)}
        points={bonusPoints || 500}
      />
      
      {/* Age bonus popup when license plate matches player age */}
      {playerAge && (
        <AgeBonusPopup
          open={showAgeBonusPopup}
          onClose={() => {}}
          points={20}
          age={playerAge}
        />
      )}
      
      {/* Completion confetti when reaching level 10 */}
      {showCompletionBanner && (
        <CompletionConfetti onClose={() => {}} />
      )}
    </>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          <GameProvider>
            <Toaster />
            <Sonner />
            <GameApp />
          </GameProvider>
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
