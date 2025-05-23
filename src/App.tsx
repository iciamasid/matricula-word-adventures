
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

// Importar las páginas específicas de cada país
import ReinoUnidoPage from "./pages/CountryPage/Reino_Unido";
import GreciaPage from "./pages/CountryPage/Grecia";
import NoruegaPage from "./pages/CountryPage/Noruega";
import ChinaPage from "./pages/CountryPage/China";
import CanadaPage from "./pages/CountryPage/Canada";
import CostaRicaPage from "./pages/CountryPage/CostaRica";
import BrasilPage from "./pages/CountryPage/Brasil";
import PeruPage from "./pages/CountryPage/Peru";

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
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/country/:country" element={<CountryPage />} />
        <Route path="/draw-game" element={<DrawGamePage />} />
        <Route path="/motorcycle-game" element={<MotorcycleGamePage />} />
        
        {/* Rutas específicas para cada país */}
        <Route path="/country/Reino Unido" element={<ReinoUnidoPage />} />
        <Route path="/country/Grecia" element={<GreciaPage />} />
        <Route path="/country/Noruega" element={<NoruegaPage />} />
        <Route path="/country/China" element={<ChinaPage />} />
        <Route path="/country/Canadá" element={<CanadaPage />} />
        <Route path="/country/Costa Rica" element={<CostaRicaPage />} />
        <Route path="/country/Brasil" element={<BrasilPage />} />
        <Route path="/country/Perú" element={<PeruPage />} />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
      
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
  
  const handleLoadComplete = () => {
    setIsLoading(false);
  };
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          <GameProvider>
            <BrowserRouter>
              <Toaster />
              <Sonner />
              
              {/* Render GameRoutes first so it's visible underneath the loading screen */}
              <GameRoutes />
              
              {/* Loading screen on top with transparent background */}
              {isLoading && (
                <LoadingScreen onLoadComplete={handleLoadComplete} />
              )}
            </BrowserRouter>
          </GameProvider>
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
