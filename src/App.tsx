
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/context/LanguageContext";
import { useState, useEffect } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import Index from "./pages/Index";
import MotorcycleGamePage from "./pages/MotorcycleGamePage";
import DrawGamePage from "./pages/DrawGamePage";
import MotorcycleDriveGamePage from "./pages/MotorcycleDriveGamePage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [showLoadingScreen, setShowLoadingScreen] = useState<boolean>(true);

  // Show loading screen for exactly 3 seconds when app first loads
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoadingScreen(false);
    }, 3000); // Exactly 3 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          {/* Loading screen - show for 3 seconds when app first loads */}
          {showLoadingScreen && (
            <LoadingScreen 
              onLoadComplete={() => setShowLoadingScreen(false)}
              bgColor="bg-black/70"
            />
          )}
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/motorcycle-game" element={<MotorcycleGamePage />} />
              <Route path="/draw-game" element={<DrawGamePage />} />
              <Route path="/motorcycle-drive-game" element={<MotorcycleDriveGamePage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
};

export default App;
