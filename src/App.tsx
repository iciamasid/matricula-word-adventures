
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
import BonusPopup from "./components/BonusPopup";
import AgeBonusPopup from "./components/AgeBonusPopup";
import TripleNumbersPopup from "./components/TripleNumbersPopup";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          <GameProvider>
            {({ showBonusPopup, setShowBonusPopup, bonusPoints }) => (
              <>
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
                
                {/* Different types of bonus popups */}
                <BonusPopup
                  open={showBonusPopup}
                  onClose={() => setShowBonusPopup(false)}
                  points={bonusPoints || 500}
                />
                
                <AgeBonusPopup />
                <TripleNumbersPopup />
              </>
            )}
          </GameProvider>
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
