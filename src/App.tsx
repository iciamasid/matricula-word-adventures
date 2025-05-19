
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import { GameProvider, useGame } from "./context/GameContext";
import { useState, useEffect } from "react";
import Index from "./pages/Index";
import CountryPage from "./pages/CountryPage";
import NotFound from "./pages/NotFound";
import DrawGamePage from "./pages/DrawGamePage";
import BonusPopup from "./components/BonusPopup";
import AgeBonusPopup from "./components/AgeBonusPopup";
import CompletionBanner from "./components/CompletionBanner";
import LevelUpAlert from "./components/LevelUpAlert";
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
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);
  const { 
    showBonusPopup, 
    setShowBonusPopup, 
    bonusPoints,
    showAgeBonusPopup,
    playerAge,
    showCompletionBanner,
    showLevelUp,
    level
  } = useGame();
  
  // Check if user has already seen the loading screen this session
  useEffect(() => {
    const hasSeenLoading = sessionStorage.getItem('hasSeenLoadingScreen');
    if (hasSeenLoading === 'true') {
      setShowLoadingScreen(false);
    } else {
      // Set a flag in sessionStorage
      setTimeout(() => {
        sessionStorage.setItem('hasSeenLoadingScreen', 'true');
      }, 500);
    }
  }, []);
  
  const handleLoadComplete = () => {
    setShowLoadingScreen(false);
  };
  
  return (
    <>
      {/* Loading screen */}
      {showLoadingScreen && (
        <LoadingScreen onLoadComplete={handleLoadComplete} loadingTime={2000} />
      )}
    
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index hideInitialImage={!showLoadingScreen} />} />
          <Route path="/country/:country" element={<CountryPage />} />
          <Route path="/draw-game" element={<DrawGamePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      
      {/* Level Up Alert (already contains completion confetti for level 10) */}
      <LevelUpAlert />
      
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
      
      {/* Completion banner when reaching level 10 */}
      {showCompletionBanner && (
        <CompletionBanner
          open={showCompletionBanner}
          onClose={() => {}}
        />
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
