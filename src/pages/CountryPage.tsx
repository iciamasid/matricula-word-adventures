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
  return <GameProvider>
      <CountryPageContent />
    </GameProvider>;
};

// Main country page content
const CountryPageContent = () => {
  const {
    country
  } = useParams();

  // Country data with updated images for iconic buildings and detailed descriptions
  const getCountryData = () => {
    switch (country?.toLowerCase()) {
      case "españa":
        return {
          name: "España",
          flag: "🇪🇸",
          capital: "Madrid",
          language: "Español",
          famousFor: "La Sagrada Familia, flamenco y paella",
          description: "España es un país con una rica historia y cultura. Tiene hermosas playas, montañas y ciudades históricas. Es famoso por su gastronomía, fiestas populares y su pasión por el fútbol.",
          fact: "España tiene 47 lugares declarados Patrimonio de la Humanidad por la UNESCO, ¡el tercer país con más lugares protegidos!",
          image: "/lovable-uploads/madrid.jpg",
          // Image of La Giralda
          imageAlt: "El oso y el madroño, Madrid"
        };
      case "francia":
        return {
          name: "Francia",
          flag: "🇫🇷",
          capital: "París",
          language: "Francés",
          famousFor: "La Torre Eiffel, el queso y los cruasanes",
          description: "Francia es conocida por su cultura, arte y gastronomía. París, su capital, es famosa por la Torre Eiffel, el Museo del Louvre y la Catedral de Notre Dame. Francia también tiene hermosos pueblos en el campo y playas en la costa mediterránea.",
          fact: "¡En Francia hay más de 1.500 tipos diferentes de queso!",
          image: "/lovable-uploads/82ed4a47-c090-4db2-b49e-6041114c97b7.png",
          // Image of the Eiffel Tower
          imageAlt: "Torre Eiffel, París"
        };
      case "italia":
        return {
          name: "Italia",
          flag: "🇮🇹",
          capital: "Roma",
          language: "Italiano",
          famousFor: "El Coliseo, la pizza y el gelato",
          description: "Italia es la cuna del Imperio Romano y el Renacimiento. Es conocida por su increíble arte, arquitectura, y por supuesto, su deliciosa comida como la pizza y la pasta. Ciudades como Roma, Venecia y Florencia atraen a millones de turistas cada año.",
          fact: "¡Italia tiene más sitios del Patrimonio Mundial de la UNESCO que cualquier otro país del mundo!",
          image: "/lovable-uploads/775e117d-bc61-4576-a77e-acba4f134785.png",
          imageAlt: "Coliseo Romano, Roma"
        };
      case "rusia":
        return {
          name: "Rusia",
          flag: "🇷🇺",
          capital: "Moscú",
          language: "Ruso",
          famousFor: "El Kremlin, la Plaza Roja y las matrioshkas",
          description: "Rusia es el país más grande del mundo, que abarca once zonas horarias y tiene una enorme diversidad geográfica y cultural. Desde las cúpulas doradas de Moscú hasta los vastos paisajes de Siberia, Rusia ofrece contrastes fascinantes y una historia rica.",
          fact: "¡Rusia es tan grande que tiene 11 zonas horarias diferentes!",
          image: "/lovable-uploads/501f7c44-46fc-44ae-8a9f-94b1215f5544.png",
          // Image of the Kremlin
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
          description: "Este país aún está por descubrir. ¡Sigue jugando para desbloquear más información!",
          fact: "¡Este país es un misterio por descubrir!",
          image: "/lovable-uploads/775e117d-bc61-4576-a77e-acba4f134785.png",
          imageAlt: "País desconocido"
        };
    }
  };
  const countryData = getCountryData();

  // Create a single-country array for highlighting in the map
  const unlockedCountries = [countryData.name];
  return <div className="min-h-screen bg-gradient-to-b from-purple-100 to-blue-100 p-4">
      <div className="max-w-md mx-auto">
        <Link to="/">
          <Button variant="outline" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Volver al juego
          </Button>
        </Link>
        
        <motion.div className="bg-white rounded-lg shadow-lg overflow-hidden" initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.5
      }}>
          <motion.img src={countryData.image} alt={countryData.imageAlt} className="w-full h-48 object-cover" initial={{
          scale: 1.1
        }} animate={{
          scale: 1
        }} transition={{
          duration: 1
        }} />
          
          {/* Add map to highlight the country */}
          <div className="h-[150px] w-full relative overflow-hidden border-t-2 border-b-2 border-purple-100">
            <WorldMap highlightCountry={countryData.name} unlockedCountries={unlockedCountries} />
          </div>
          
          <div className="p-6">
            <h1 className="text-3xl font-bold kids-text flex items-center mb-2">
              {countryData.name} {countryData.flag}
            </h1>
            <p className="text-gray-600 mb-4 kids-text">Capital: {countryData.capital}</p>
            
            {/* Added country description - moved from main page */}
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
              <h3 className="text-xl font-bold text-purple-800 kids-text mb-2 flex items-center">
                <motion.span className="mr-2" animate={{
                rotate: [0, 10, -10, 0]
              }} transition={{
                duration: 2,
                repeat: Infinity
              }}>
                  🌍
                </motion.span>
                Sobre {countryData.name}
              </h3>
              <p className="kids-text font-medium text-fuchsia-600">{countryData.description}</p>
            </div>
            
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
    </div>;
};
export default CountryPageWrapper;