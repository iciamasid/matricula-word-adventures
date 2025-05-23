
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import { GameProvider } from "./context/GameContext";
import Index from "./pages/Index";
import CountryPage from "./pages/CountryPage";
import NotFound from "./pages/NotFound";
import DrawGamePage from "./pages/DrawGamePage";
import MotorcycleGamePage from "./pages/MotorcycleGamePage";
import BonusPopup from "./components/BonusPopup";
import AgeBonusPopup from "./components/AgeBonusPopup";
import CompletionConfetti from "./components/CompletionConfetti";
import CompletionBanner from "./components/CompletionBanner";
import { useState, useEffect } from "react";
import LoadingScreen from "./components/LoadingScreen";
import { useGame } from "./context/GameContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false
    },
  },
});

// Inner component that uses the game context
const GameRoutes = () => {
  const { 
    showBonusPopup, 
    setShowBonusPopup, 
    bonusPoints,
    showAgeBonusPopup,
    playerAge,
    showCompletionBanner,
    resetGame
  } = useGame();
  
  // State for completion banner
  const [showCompletionPopup, setShowCompletionPopup] = useState(false);

  // Watch for level 10 completion banner
  useEffect(() => {
    if (showCompletionBanner) {
      setShowCompletionPopup(true);
    }
  }, [showCompletionBanner]);

  // Handle closing the completion banner
  const handleCloseCompletionBanner = () => {
    setShowCompletionPopup(false);
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/country/:country" element={<CountryPage />} />
          <Route path="/draw-game" element={<DrawGamePage />} />
          <Route path="/motorcycle-game" element={<MotorcycleGamePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      
      {/* Bonus popup for 6666 license plate */}
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
      
      {/* Add the CompletionBanner component for level 10 completion */}
      <CompletionBanner
        open={showCompletionPopup}
        onClose={handleCloseCompletionBanner}
      />
    </>
  );
};

// Main app component with loading screen
const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isRestarting, setIsRestarting] = useState(false);
  const [loadingBgColor, setLoadingBgColor] = useState("bg-gray-900/50"); // Default background
  
  // Check if we're on the motorcycle page for theme color
  useEffect(() => {
    // Check if we're on the motorcycle route
    const isMotorcyclePage = window.location.pathname.includes('motorcycle');
    // Set appropriate background for the loading screen
    setLoadingBgColor(isMotorcyclePage ? "bg-teal-900/50" : "bg-gray-900/50");
  }, []);
  
  const handleLoadComplete = () => {
    setIsLoading(false);
    setIsRestarting(false);
  };
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          <GameProvider>
            <Toaster />
            <Sonner />
            
            {/* Render GameRoutes first so it's visible underneath the loading screen */}
            <GameRoutes />
            
            {/* Loading screen on top with transparent background */}
            {(isLoading || isRestarting) && (
              <LoadingScreen 
                onLoadComplete={handleLoadComplete}
                isRestarting={isRestarting}
                bgColor={loadingBgColor}
              />
            )}
          </GameProvider>
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
