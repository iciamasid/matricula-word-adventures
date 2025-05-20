import React from "react";
import { motion } from "framer-motion";
import { useGame } from "@/context/GameContext";
import { useLanguage } from "@/context/LanguageContext";
import { Globe, Flag } from "lucide-react";
import { Link } from "react-router-dom";

const getCountryFlag = (country: string) => {
  switch (country) {
    case "España":
      return <img src="/lovable-uploads/flags/spain.png" alt="España Flag" className="w-8 h-5 rounded-sm object-cover" />;
    case "Francia":
      return <img src="/lovable-uploads/flags/france.png" alt="Francia Flag" className="w-8 h-5 rounded-sm object-cover" />;
    case "Italia":
      return <img src="/lovable-uploads/flags/italy.png" alt="Italia Flag" className="w-8 h-5 rounded-sm object-cover" />;
    case "Rusia":
      return <img src="/lovable-uploads/flags/russia.png" alt="Rusia Flag" className="w-8 h-5 rounded-sm object-cover" />;
    case "Japón":
      return <img src="/lovable-uploads/flags/japan.png" alt="Japón Flag" className="w-8 h-5 rounded-sm object-cover" />;
    case "Australia":
      return <img src="/lovable-uploads/flags/australia.png" alt="Australia Flag" className="w-8 h-5 rounded-sm object-cover" />;
    case "Estados Unidos":
      return <img src="/lovable-uploads/flags/usa.png" alt="USA Flag" className="w-8 h-5 rounded-sm object-cover" />;
    case "Méjico":
      return <img src="/lovable-uploads/flags/mexico.png" alt="Méjico Flag" className="w-8 h-5 rounded-sm object-cover" />;
    case "Argentina":
      return <img src="/lovable-uploads/flags/argentina.png" alt="Argentina Flag" className="w-8 h-5 rounded-sm object-cover" />;
    case "España (vuelta completa)":
      return <img src="/lovable-uploads/flags/spain.png" alt="España Flag" className="w-8 h-5 rounded-sm object-cover" />;
    default:
      return <Globe className="w-5 h-5" />;
  }
};

const distances = [
  0, 1071, 1458, 4000, 9643, 13794, 4494, 2777, 9000, 0
];

const WorldTourProgress: React.FC = () => {
  const { level } = useGame();
  const { isEnglish } = useLanguage();
  
  const unlockedCountries = React.useMemo(() => {
    const countries = ["España"];
    
    if (level >= 2) countries.push("Francia");
    if (level >= 3) countries.push("Italia");
    if (level >= 4) countries.push("Rusia");
    if (level >= 5) countries.push("Japón");
    if (level >= 6) countries.push("Australia");
    if (level >= 7) countries.push("Estados Unidos");
    if (level >= 8) countries.push("Méjico");
    if (level >= 9) countries.push("Argentina");
    if (level >= 10) countries.push("España (vuelta completa)");
    
    return countries;
  }, [level]);
  
  return (
    <div className="w-full max-w-2xl border-2 border-purple-300 rounded-lg bg-purple-100 overflow-hidden mb-8">
      {/* Header */}
      <div className="bg-purple-500 p-4 flex justify-center items-center">
        <Globe className="text-white mr-2" />
        <h2 className="text-xl font-bold text-white kids-text">
          {"TU VUELTA AL MUNDO"}
        </h2>
      </div>
      
      {/* Tip about clicking flags - ADDED NEW */}
      <div className="bg-yellow-100 border-b-2 border-yellow-300 p-3 text-center">
        <p className="text-purple-800 kids-text text-lg">
          <Flag className="inline-block mr-1 mb-1" size={18} />
          ¡Pincha sobre las banderas y explora ese país!
        </p>
      </div>
      
      {/* Progress list */}
      <div className="p-4">
        {unlockedCountries.map((country, index) => (
          <div key={country} className={`rounded-lg transition-all mb-2 ${
            index + 1 <= level ? "opacity-100" : "opacity-50"
          }`}>
            <Link 
              to={`/country/${country}`}
              className="block"
              onClick={() => {
                // Set navigatingBack to true so when returning, the level up message is cleared
                sessionStorage.setItem('navigatingBack', 'true');
              }}
            >
              <motion.div 
                className={`flex items-center p-3 rounded-md ${
                  index + 1 <= level 
                    ? "bg-purple-200 text-purple-800 hover:bg-purple-300" 
                    : "bg-gray-200 text-gray-600 cursor-not-allowed"
                }`}
                whileHover={index + 1 <= level ? { scale: 1.02 } : {}}
                whileTap={index + 1 <= level ? { scale: 0.98 } : {}}
              >
                <div className="flex-shrink-0 mr-3 relative">
                  {getCountryFlag(country)}
                  {index + 1 <= level && (
                    <motion.div 
                      className="absolute -right-1 -bottom-1 bg-green-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs"
                      animate={{ 
                        scale: [1, 1.2, 1],
                        backgroundColor: ["#22c55e", "#4ade80", "#22c55e"]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "loop"
                      }}
                    >
                      ✓
                    </motion.div>
                  )}
                </div>
                <div className="flex-grow">
                  <div className="font-medium kids-text text-lg">
                    {country === "Estados Unidos" ? "USA" : country}
                  </div>
                  <div className="text-sm opacity-75">
                    {index === 0 ? "Origen" : 
                     index === unlockedCountries.length - 1 && index > 0 ? "Final del viaje" : 
                     `Nivel ${index}`}
                  </div>
                </div>
                <div className="flex-shrink-0 kids-text text-lg font-bold">
                  {distances[index] || "?"} km
                </div>
              </motion.div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorldTourProgress;
