
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "@/context/LanguageContext";
import Index from "./pages/Index";
import MotorcycleGamePage from "./pages/MotorcycleGamePage";
import DrawGamePage from "./pages/DrawGamePage";
import NotFound from "./pages/NotFound";
import CountryPage from "./pages/CountryPage";

// Import motorcycle game country pages (only the ones that exist)
import Reino_Unido from "./pages/CountryPage/Reino_Unido";
import Grecia from "./pages/CountryPage/Grecia";
import Noruega from "./pages/CountryPage/Noruega";
import China from "./pages/CountryPage/China";
import Canada from "./pages/CountryPage/Canada";
import Costa_Rica from "./pages/CountryPage/CostaRica";
import Brasil from "./pages/CountryPage/Brasil";
import Peru from "./pages/CountryPage/Peru";

// Import car game country pages
import Espana from "./pages/CountryPage/Espana";
import Francia from "./pages/CountryPage/Francia";
import Italia from "./pages/CountryPage/Italia";
import Rusia from "./pages/CountryPage/Rusia";
import Japon from "./pages/CountryPage/Japon";
import EstadosUnidos from "./pages/CountryPage/EstadosUnidos";
import Mexico from "./pages/CountryPage/Mexico";
import Australia from "./pages/CountryPage/Australia";
import Argentina from "./pages/CountryPage/Argentina";

const queryClient = new QueryClient();

const App = () => {
  // Set the correct game type in sessionStorage when navigating to country pages
  const setMotorcycleGame = () => {
    sessionStorage.setItem('navigatingBack', 'motorcycle-game');
    return null;
  };
  
  const setCarGame = () => {
    sessionStorage.setItem('navigatingBack', 'car-game');
    return null;
  };
  
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/motorcycle-game" element={<MotorcycleGamePage />} />
              <Route path="/draw-game" element={<DrawGamePage />} />
              
              {/* Set game type when navigating to countries */}
              <Route path="/motorcycle-game/set-game" element={<Navigate to="/motorcycle-game" replace />} action={setMotorcycleGame} />
              <Route path="/draw-game/set-game" element={<Navigate to="/draw-game" replace />} action={setCarGame} />
              
              {/* Motorcycle game countries (existing pages) */}
              <Route path="/country/Reino_Unido" element={<Reino_Unido />} />
              <Route path="/country/Grecia" element={<Grecia />} />
              <Route path="/country/Noruega" element={<Noruega />} />
              <Route path="/country/China" element={<China />} />
              <Route path="/country/Canada" element={<Canada />} />
              <Route path="/country/Costa_Rica" element={<Costa_Rica />} />
              <Route path="/country/Brasil" element={<Brasil />} />
              <Route path="/country/Peru" element={<Peru />} />
              
              {/* Car game countries */}
              <Route path="/country/España" element={<Espana />} />
              <Route path="/country/Francia" element={<Francia />} />
              <Route path="/country/Italia" element={<Italia />} />
              <Route path="/country/Rusia" element={<Rusia />} />
              <Route path="/country/Japón" element={<Japon />} />
              <Route path="/country/Estados Unidos" element={<EstadosUnidos />} />
              <Route path="/country/México" element={<Mexico />} />
              <Route path="/country/Australia" element={<Australia />} />
              <Route path="/country/Argentina" element={<Argentina />} />
              
              {/* Generic country page for countries without specific pages */}
              <Route path="/country/:country" element={<CountryPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
};

export default App;
