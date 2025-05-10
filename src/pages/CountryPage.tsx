
import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { GameProvider } from "@/context/GameContext";
import CountryPageIcons from "@/components/CountryPageIcons";
import WorldMap from "@/components/WorldMap";

// Simplified CountryPage without MusicPlayer
const CountryPageWrapper = () => {
  return (
    <GameProvider>
      <CountryPageContent />
    </GameProvider>
  );
};

// Main country page content
const CountryPageContent = () => {
  const { country } = useParams();
  
  // Country data with updated images for iconic buildings
  const getCountryData = () => {
    switch(country?.toLowerCase()) {
      case "españa":
        return {
          name: "España",
          flag: "🇪🇸",
          capital: "Madrid",
          language: "Español",
          famousFor: "La Sagrada Familia, flamenco y paella",
          fact: "España tiene 47 lugares declarados Patrimonio de la Humanidad por la UNESCO, ¡el tercer país con más lugares protegidos!",
          image: "/lovable-uploads/310987b9-7b6d-48c9-8dec-f37f4487ca8c.png", // Image of La Giralda
          imageAlt: "La Giralda, Sevilla"
        };
      case "francia":
        return {
          name: "Francia",
          flag: "🇫🇷",
          capital: "París",
          language: "Francés",
          famousFor: "La Torre Eiffel, el queso y los cruasanes",
          fact: "¡En Francia hay más de 1.500 tipos diferentes de queso!",
          image: "/lovable-uploads/82ed4a47-c090-4db2-b49e-6041114c97b7.png", // Image of the Eiffel Tower
          imageAlt: "Torre Eiffel, París"
        };
      case "rusia":
        return {
          name: "Rusia",
          flag: "🇷🇺",
          capital: "Moscú",
          language: "Ruso",
          famousFor: "El Kremlin, la Plaza Roja y las matrioshkas",
          fact: "¡Rusia es tan grande que tiene 11 zonas horarias diferentes!",
          image: "/lovable-uploads/501f7c44-46fc-44ae-8a9f-94b1215f5544.png", // Image of the Kremlin
          imageAlt: "El Kremlin, Moscú"
        };
      // Add more cases for other countries
      default:
        return {
          name: "País desconocido",
          flag: "🌍",
          capital: "Desconocida",
          language: "Desconocido",
          famousFor: "Desconocido",
          fact: "¡Este país es un misterio por descubrir!",
          image: "/lovable-uploads/775e117d-bc61-4576-a77e-acba4f134785.png",
          imageAlt: "País desconocido"
        };
    }
  };

  const countryData = getCountryData();
  
  // Create a single-country array for highlighting in the map
  const unlockedCountries = [countryData.name];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-blue-100 p-4">
      <div className="max-w-md mx-auto">
        <Link to="/">
          <Button variant="outline" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Volver al juego
          </Button>
        </Link>
        
        <motion.div 
          className="bg-white rounded-lg shadow-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.img 
            src={countryData.image} 
            alt={countryData.imageAlt}
            className="w-full h-48 object-cover"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1 }}
          />
          
          {/* Add map to highlight the country */}
          <div className="h-[150px] w-full relative overflow-hidden border-t-2 border-b-2 border-purple-100">
            <WorldMap 
              highlightCountry={countryData.name} 
              unlockedCountries={unlockedCountries}
            />
          </div>
          
          <div className="p-6">
            <h1 className="text-3xl font-bold kids-text flex items-center">
              {countryData.name} {countryData.flag}
            </h1>
            <p className="text-gray-600 mb-6 kids-text">Capital: {countryData.capital}</p>
            
            <CountryPageIcons type="fact">
              {countryData.fact}
            </CountryPageIcons>
            
            <CountryPageIcons type="language">
              En {countryData.name} se habla {countryData.language}.
            </CountryPageIcons>
            
            <CountryPageIcons type="famousFor">
              {countryData.name} es famoso por {countryData.famousFor}.
            </CountryPageIcons>
            
            <Link to="/">
              <Button className="w-full mt-4 bg-game-purple hover:bg-game-purple/90 kids-text">
                Volver a jugar
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CountryPageWrapper;
