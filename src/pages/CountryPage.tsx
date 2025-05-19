
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGame } from "@/context/GameContext";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Globe, Flag, Check } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { WORLD_DESTINATIONS } from "@/utils/mapData";
import { toast } from "@/hooks/use-toast";

const CountryPage = () => {
  const { country } = useParams();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { isEnglish } = useLanguage?.() || { isEnglish: false };
  const {
    level,
    setCountryVisitRequired,
    countryVisitRequired,
    updateDestinations
  } = useGame();
  const [loaded, setLoaded] = useState(false);
  const [countryInfo, setCountryInfo] = useState<any>(null);
  const [missionCompleted, setMissionCompleted] = useState(false);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Find country info in WORLD_DESTINATIONS
  useEffect(() => {
    // Mark as navigating between pages
    sessionStorage.setItem('navigatingBack', 'true');
    
    // Find the selected country in the destinations list
    const foundCountry = WORLD_DESTINATIONS.find(
      (dest) => dest.country.toLowerCase() === country?.toLowerCase()
    );
    
    if (foundCountry) {
      setCountryInfo(foundCountry);
      
      // If this country visit was required, mark it as done
      const unlockedCountry = getCountryForLevel(level);
      if (countryVisitRequired && foundCountry.country.toLowerCase() === unlockedCountry.toLowerCase()) {
        // Mark as visited
        setCountryVisitRequired(false);
        console.log(`Country ${foundCountry.country} visited - requirement cleared`);
        setMissionCompleted(true);
        
        // Show success toast
        toast({
          title: isEnglish ? "Mission accomplished!" : "¡Misión cumplida!",
          description: isEnglish 
            ? `You've successfully visited ${foundCountry.country}!` 
            : `¡Has visitado ${foundCountry.country} con éxito!`,
          variant: "default"
        });
        
        // Make sure destinations are updated to the current level
        updateDestinations(level);
      }
    }
  }, [country, countryVisitRequired, level, setCountryVisitRequired, updateDestinations, isEnglish]);
  
  // Helper function to get country for current level
  const getCountryForLevel = (level: number): string => {
    switch (level) {
      case 1: return "Francia";
      case 2: return "Italia";
      case 3: return "Rusia";
      case 4: return "Japón";
      case 5: return "Australia";
      case 6: return "Estados Unidos";
      case 7: return "México";
      case 8: return "Argentina";
      case 9: return "España";
      default: return "España";
    }
  };

  if (!countryInfo) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <Globe className="mx-auto h-12 w-12 text-gray-500 mb-4 animate-spin" />
          <p className="text-gray-600 kids-text text-xl">
            {isEnglish ? "Loading country info..." : "Cargando información del país..."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-300 to-purple-200 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative bg-white shadow-lg sm:rounded-3xl p-6">
          {missionCompleted && (
            <motion.div 
              className="absolute -top-12 left-0 right-0 bg-green-100 border-2 border-green-400 rounded-lg p-3 flex items-center justify-center gap-2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Check className="w-5 h-5 text-green-600" />
              <p className="text-green-800 kids-text font-bold">
                {isEnglish ? "Mission completed!" : "¡Misión completada!"}
              </p>
              <Flag className="w-5 h-5 text-green-600" />
            </motion.div>
          )}
          
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800 kids-text mb-4">
              {countryInfo.country}
            </h1>
            <p className="text-md text-gray-600 kids-text">
              {isEnglish ? `Welcome to ${countryInfo.country}!` : `¡Bienvenido a ${countryInfo.country}!`}
            </p>
          </div>
          <div className="mt-4">
            <div className="text-center">
              <p className="text-gray-700 kids-text text-lg">
                {isEnglish ? "Fun Fact:" : "Dato Curioso:"}
              </p>
              <p className="text-purple-700 kids-text text-xl font-bold">
                {countryInfo.fact}
              </p>
            </div>
            <div className="mt-6 flex justify-center">
              <Button onClick={() => navigate(-1)} className="bg-purple-600 hover:bg-purple-700 text-white kids-text text-lg px-6 py-3 rounded-full">
                {isEnglish ? "Go Back" : "Volver"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryPage;
