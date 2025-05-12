
import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { GameProvider } from "@/context/GameContext";
import CountryPageIcons from "@/components/CountryPageIcons";
import WorldMap from "@/components/WorldMap";
import { useLanguage } from "@/context/LanguageContext";

// Simplified CountryPage without MusicPlayer
const CountryPageWrapper = () => {
  return <GameProvider>
      <CountryPageContent />
    </GameProvider>;
};

// Main country page content
const CountryPageContent = () => {
  const { country } = useParams();
  const { t, language, isEnglish } = useLanguage();
  
  // Button classes based on language
  const buttonClasses = isEnglish
    ? "bg-orange-600 hover:bg-orange-700 text-white kids-text"
    : "bg-game-purple hover:bg-game-purple/90 kids-text";
  
  // Panel classes based on language
  const panelClasses = isEnglish
    ? "bg-orange-50 border border-orange-200"
    : "bg-purple-50 border border-purple-200";
  
  // Country data with updated images for iconic buildings and detailed descriptions
  const getCountryData = () => {
    const isSpanish = language === 'es';
    
    switch (country?.toLowerCase()) {
      case "españa":
      case "spain":
        return {
          name: isSpanish ? "España" : "Spain",
          flag: "🇪🇸",
          capital: isSpanish ? "Madrid" : "Madrid",
          language: isSpanish ? "Español" : "Spanish",
          famousFor: isSpanish ? "La Sagrada Familia, flamenco y paella" : "The Sagrada Familia, flamenco and paella",
          description: isSpanish 
            ? "España es un país con una rica historia y cultura. Tiene hermosas playas, montañas y ciudades históricas. Es famoso por su gastronomía, fiestas populares y su pasión por el fútbol."
            : "Spain is a country with a rich history and culture. It has beautiful beaches, mountains, and historic cities. It is famous for its cuisine, popular festivals, and passion for football.",
          fact: isSpanish 
            ? "España tiene 47 lugares declarados Patrimonio de la Humanidad por la UNESCO, ¡el tercer país con más lugares protegidos!"
            : "Spain has 47 UNESCO World Heritage Sites, making it the country with the third-most protected sites!",
          image: "/lovable-uploads/madrid.jpg",
          imageAlt: isSpanish ? "El oso y el madroño, Madrid" : "The bear and the strawberry tree, Madrid"
        };
      case "francia":
      case "france":
        return {
          name: isSpanish ? "Francia" : "France",
          flag: "🇫🇷",
          capital: isSpanish ? "París" : "Paris",
          language: isSpanish ? "Francés" : "French",
          famousFor: isSpanish ? "La Torre Eiffel, el queso y los cruasanes" : "The Eiffel Tower, cheese, and croissants",
          description: isSpanish
            ? "Francia es conocida por su cultura, arte y gastronomía. París, su capital, es famosa por la Torre Eiffel, el Museo del Louvre y la Catedral de Notre Dame. Francia también tiene hermosos pueblos en el campo y playas en la costa mediterránea."
            : "France is known for its culture, art, and gastronomy. Paris, its capital, is famous for the Eiffel Tower, the Louvre Museum, and Notre Dame Cathedral. France also has beautiful villages in the countryside and beaches on the Mediterranean coast.",
          fact: isSpanish
            ? "¡En Francia hay más de 1.500 tipos diferentes de queso!"
            : "France has more than 1,500 different types of cheese!",
          image: "/lovable-uploads/82ed4a47-c090-4db2-b49e-6041114c97b7.png",
          imageAlt: isSpanish ? "Torre Eiffel, París" : "Eiffel Tower, Paris"
        };
      case "italia":
      case "italy":
        return {
          name: isSpanish ? "Italia" : "Italy",
          flag: "🇮🇹",
          capital: isSpanish ? "Roma" : "Rome",
          language: isSpanish ? "Italiano" : "Italian",
          famousFor: isSpanish ? "El Coliseo, la pizza y el gelato" : "The Colosseum, pizza, and gelato",
          description: isSpanish
            ? "Italia es la cuna del Imperio Romano y el Renacimiento. Es conocida por su increíble arte, arquitectura, y por supuesto, su deliciosa comida como la pizza y la pasta. Ciudades como Roma, Venecia y Florencia atraen a millones de turistas cada año."
            : "Italy is the cradle of the Roman Empire and the Renaissance. It is known for its incredible art, architecture, and of course, its delicious food like pizza and pasta. Cities like Rome, Venice, and Florence attract millions of tourists each year.",
          fact: isSpanish
            ? "¡Italia tiene más sitios del Patrimonio Mundial de la UNESCO que cualquier otro país del mundo!"
            : "Italy has more UNESCO World Heritage Sites than any other country in the world!",
          image: "/lovable-uploads/775e117d-bc61-4576-a77e-acba4f134785.png",
          imageAlt: isSpanish ? "Coliseo Romano, Roma" : "Roman Colosseum, Rome"
        };
      case "rusia":
      case "russia":
        return {
          name: isSpanish ? "Rusia" : "Russia",
          flag: "🇷🇺",
          capital: isSpanish ? "Moscú" : "Moscow",
          language: isSpanish ? "Ruso" : "Russian",
          famousFor: isSpanish ? "El Kremlin, la Plaza Roja y las matrioshkas" : "The Kremlin, Red Square, and matryoshka dolls",
          description: isSpanish
            ? "Rusia es el país más grande del mundo, que abarca once zonas horarias y tiene una enorme diversidad geográfica y cultural. Desde las cúpulas doradas de Moscú hasta los vastos paisajes de Siberia, Rusia ofrece contrastes fascinantes y una historia rica."
            : "Russia is the largest country in the world, spanning eleven time zones and having enormous geographic and cultural diversity. From the golden domes of Moscow to the vast landscapes of Siberia, Russia offers fascinating contrasts and a rich history.",
          fact: isSpanish
            ? "¡Rusia es tan grande que tiene 11 zonas horarias diferentes!"
            : "Russia is so large that it has 11 different time zones!",
          image: "/lovable-uploads/501f7c44-46fc-44ae-8a9f-94b1215f5544.png",
          imageAlt: isSpanish ? "El Kremlin, Moscú" : "The Kremlin, Moscow"
        };
      // Add more cases for other countries
      default:
        return {
          name: t('unknown_country'),
          flag: "🌍",
          capital: t('unknown_capital'),
          language: t('unknown_language'),
          famousFor: "?",
          description: t('unknown_description'),
          fact: t('unknown_fact'),
          image: "/lovable-uploads/775e117d-bc61-4576-a77e-acba4f134785.png",
          imageAlt: t('unknown_country')
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
            <ArrowLeft className="mr-2 h-4 w-4" /> {t('back_to_game')}
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
            <p className="text-gray-600 mb-4 kids-text">{t('capital')} {countryData.capital}</p>
            
            {/* Added country description - moved from main page */}
            <div className={`${panelClasses} rounded-lg p-4 mb-4`}>
              <h3 className="text-xl font-bold text-purple-800 kids-text mb-2 flex items-center">
                <motion.span className="mr-2" animate={{
                rotate: [0, 10, -10, 0]
              }} transition={{
                duration: 2,
                repeat: Infinity
              }}>
                  🌍
                </motion.span>
                {t('about')} {countryData.name}
              </h3>
              <p className="kids-text text-fuchsia-600 text-lg font-normal">{countryData.description}</p>
            </div>
            
            <CountryPageIcons type="fact">
              {countryData.fact}
            </CountryPageIcons>
            
            <CountryPageIcons type="language">
              {isEnglish 
                ? `In ${countryData.name}, they speak ${countryData.language}.`
                : `En ${countryData.name} se habla ${countryData.language}.`
              }
            </CountryPageIcons>
            
            <CountryPageIcons type="famousFor">
              {isEnglish
                ? `${countryData.name} is famous for ${countryData.famousFor}.`
                : `${countryData.name} es famoso por ${countryData.famousFor}.`
              }
            </CountryPageIcons>
            
            <Link to="/">
              <Button className={`w-full mt-4 ${buttonClasses}`}>
                {t('return_to_game')}
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>;
};

export default CountryPageWrapper;
