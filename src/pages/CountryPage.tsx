
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCountryFacts, getCountryImage, WORLD_DESTINATIONS } from '@/utils/mapData';
import { useLanguage } from "@/context/LanguageContext";
import { ArrowLeftCircle } from 'lucide-react';
import { useGame } from '@/context/GameContext';
import CountryPageIcons from '@/components/CountryPageIcons'; 
import { motion } from 'framer-motion';

const CountryPage = () => {
  const { country } = useParams<{ country: string }>();
  const { isEnglish } = useLanguage();
  const { updateDestinations, level, totalPoints } = useGame();
  
  // Marca el país como visitado cuando se carga la página
  useEffect(() => {
    if (country) {
      console.log(`Visiting country: ${country}`);
      // Guardar país visitado en session storage para procesarlo al volver
      sessionStorage.setItem('visitedCountry', decodeURIComponent(country));
    }
  }, [country]);
  
  // Get country data based on countryId from URL
  const getCountryData = () => {
    if (!country) return null;
    
    // Decode URI component to handle encoded characters
    const decodedCountry = decodeURIComponent(country);
    
    // Find matching country with case-insensitive comparison
    return WORLD_DESTINATIONS.find(destination => 
      destination.country.toLowerCase() === decodedCountry.toLowerCase()
    );
  };
  
  // Use country parameter for country data
  const countryData = getCountryData();
  
  // Generate facts for country
  const facts = countryData ? getCountryFacts(countryData.country) : [];
  
  // Add navigation state when going back
  const handleBackClick = () => {
    sessionStorage.setItem('navigatingBack', 'true');
  };
  
  // Determine language-specific styles
  const primaryColor = isEnglish ? "bg-orange-500" : "bg-purple-500";
  const secondaryColor = isEnglish ? "text-orange-600" : "text-purple-600";
  const buttonColor = isEnglish ? "bg-orange-500 hover:bg-orange-600" : "bg-purple-500 hover:bg-purple-600";
  const borderColor = isEnglish ? "border-orange-200" : "border-purple-200";
  
  if (!countryData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
        <h1 className="text-3xl font-bold mb-4 kids-text">
          {isEnglish ? "Country not found" : "País no encontrado"}
        </h1>
        <p className="mb-8 text-xl">
          {isEnglish 
            ? "Sorry, we couldn't find information about this country." 
            : "Lo sentimos, no pudimos encontrar información sobre este país."}
        </p>
        <Link 
          to="/" 
          onClick={handleBackClick}
          className={`${buttonColor} text-white px-6 py-3 rounded-full shadow-lg flex items-center space-x-2 kids-text text-xl`}
        >
          <ArrowLeftCircle />
          <span>{isEnglish ? "Back to Game" : "Volver al Juego"}</span>
        </Link>
      </div>
    );
  }

  // Get the correct image URL for this country
  const imageUrl = getCountryImage(countryData.country);
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero section with country image */}
      <div className="relative w-full h-56 md:h-72 bg-gray-300 overflow-hidden">
        {/* Country image */}
        <img 
          src={imageUrl} 
          alt={countryData.country} 
          className="w-full h-full object-cover"
        />
        
        {/* Overlay with country name */}
        <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center">
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", duration: 0.7 }}
            className="text-center"
          >
            <span className="text-5xl md:text-7xl mb-2">{countryData.flag}</span>
            <h1 className="text-3xl md:text-4xl font-bold text-white kids-text drop-shadow-lg">
              {countryData.country}
            </h1>
            <h2 className="text-xl md:text-2xl text-white kids-text drop-shadow-md mt-2">
              {countryData.city}
            </h2>
          </motion.div>
        </div>
        
        {/* Back button */}
        <Link 
          to="/" 
          onClick={handleBackClick}
          className="absolute top-4 left-4 p-2 bg-white/80 rounded-full shadow-md hover:bg-white"
        >
          <ArrowLeftCircle className={secondaryColor} size={32} />
        </Link>
      </div>
      
      {/* Content section */}
      <div className="container mx-auto p-4 md:p-6 max-w-4xl">
        {/* Major facts section */}
        <div className="mb-6">
          <motion.h2 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className={`text-2xl font-bold mb-4 ${secondaryColor} kids-text`}
          >
            {isEnglish ? "Amazing Facts about" : "Datos curiosos sobre"} {countryData.country}
          </motion.h2>
          
          <div className="grid gap-4 md:grid-cols-2">
            {facts.map((fact, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-lg shadow-md border ${borderColor} bg-white`}
              >
                <p className="kids-text text-lg leading-relaxed">{fact}</p>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Capital city info */}
        <div className="mb-6">
          <motion.h3 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className={`text-xl font-bold mb-3 ${secondaryColor} kids-text`}
          >
            {isEnglish ? "About" : "Sobre"} {countryData.city}
          </motion.h3>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="kids-text text-lg leading-relaxed p-4 bg-white rounded-lg shadow-sm"
          >
            {countryData.fact || 
              (isEnglish 
                ? `${countryData.city} is the capital of ${countryData.country}.` 
                : `${countryData.city} es la capital de ${countryData.country}.`)}
          </motion.p>
        </div>
        
        {/* Top places to visit */}
        <div className="mb-8">
          <motion.h3 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className={`text-xl font-bold mb-3 ${secondaryColor} kids-text`}
          >
            {isEnglish ? "Top Places to Visit" : "Lugares que visitar"}
          </motion.h3>
          
          <CountryPageIcons country={countryData.country} />
        </div>
        
        {/* Back to game button */}
        <div className="text-center mt-8 mb-12">
          <Link 
            to="/" 
            onClick={handleBackClick}
            className={`${buttonColor} text-white px-8 py-3 rounded-full shadow-lg inline-flex items-center space-x-2 kids-text text-xl transition transform hover:scale-105`}
          >
            <ArrowLeftCircle className="mr-2" />
            <span>{isEnglish ? "Back to Game" : "Volver al Juego"}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CountryPage;
