import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { GameProvider } from "@/context/GameContext";
import CountryPageIcons from "@/components/CountryPageIcons";
import MapDisplay from "@/components/map/MapDisplay";
import ZoomControls from "@/components/map/ZoomControls";
import { useLanguage } from "@/context/LanguageContext";

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
  const {
    t,
    language,
    isEnglish
  } = useLanguage();

  // Add zoom state for the map
  const [mapZoom, setMapZoom] = useState(1);
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  // Button classes based on language
  const buttonClasses = isEnglish ? "bg-orange-600 hover:bg-orange-700 text-white kids-text" : "bg-game-purple hover:bg-game-purple/90 kids-text";

  // Panel classes based on language
  const panelClasses = isEnglish ? "bg-orange-50 border border-orange-200" : "bg-purple-50 border border-purple-200";

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
          description: isSpanish ? "España es un país con una rica historia y cultura. Tiene hermosas playas, montañas y ciudades históricas. Es famoso por su gastronomía, fiestas populares y su pasión por el fútbol." : "Spain is a country with a rich history and culture. It has beautiful beaches, mountains, and historic cities. It is famous for its cuisine, popular festivals, and passion for football.",
          fact: isSpanish ? "España tiene 47 lugares declarados Patrimonio de la Humanidad por la UNESCO, ¡el tercer país con más lugares protegidos!" : "Spain has 47 UNESCO World Heritage Sites, making it the country with the third-most protected sites!",
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
          description: isSpanish ? "Francia es conocida por su cultura, arte y gastronomía. París, su capital, es famosa por la Torre Eiffel, el Museo del Louvre y la Catedral de Notre Dame. Francia también tiene hermosos pueblos en el campo y playas en la costa mediterránea." : "France is known for its culture, art, and gastronomy. Paris, its capital, is famous for the Eiffel Tower, the Louvre Museum, and Notre Dame Cathedral. France also has beautiful villages in the countryside and beaches on the Mediterranean coast.",
          fact: isSpanish ? "¡En Francia hay más de 1.500 tipos diferentes de queso!" : "France has more than 1,500 different types of cheese!",
          image: "/lovable-uploads/638a48e4-c52f-4687-a1e1-5db85caa1793.png",
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
          description: isSpanish ? "Italia es la cuna del Imperio Romano y el Renacimiento. Es conocida por su increíble arte, arquitectura, y por supuesto, su deliciosa comida como la pizza y la pasta. Ciudades como Roma, Venecia y Florencia atraen a millones de turistas cada año." : "Italy is the cradle of the Roman Empire and the Renaissance. It is known for its incredible art, architecture, and of course, its delicious food like pizza and pasta. Cities like Rome, Venice, and Florence attract millions of tourists each year.",
          fact: isSpanish ? "¡Italia tiene más sitios del Patrimonio Mundial de la UNESCO que cualquier otro país del mundo!" : "Italy has more UNESCO World Heritage Sites than any other country in the world!",
          image: "/lovable-uploads/6eb44f09-3864-48b2-8a08-b682e3a1ada3.png",
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
          description: isSpanish ? "Rusia es el país más grande del mundo, que abarca once zonas horarias y tiene una enorme diversidad geográfica y cultural. Desde las cúpulas doradas de Moscú hasta los vastos paisajes de Siberia, Rusia ofrece contrastes fascinantes y una historia rica." : "Russia is the largest country in the world, spanning eleven time zones and having enormous geographic and cultural diversity. From the golden domes of Moscow to the vast landscapes of Siberia, Russia offers fascinating contrasts and a rich history.",
          fact: isSpanish ? "¡Rusia es tan grande que tiene 11 zonas horarias diferentes!" : "Russia is so large that it has 11 different time zones!",
          image: "/lovable-uploads/3eeeb432-83e7-40d5-839a-f72b03d08da9.png",
          imageAlt: isSpanish ? "Catedral de San Basilio, Moscú" : "Saint Basil's Cathedral, Moscow"
        };
      case "japón":
      case "japon":
      case "japan":
        return {
          name: isSpanish ? "Japón" : "Japan",
          flag: "🇯🇵",
          capital: isSpanish ? "Tokio" : "Tokyo",
          language: isSpanish ? "Japonés" : "Japanese",
          famousFor: isSpanish ? "El Monte Fuji, el sushi y los cerezos en flor" : "Mount Fuji, sushi, and cherry blossoms",
          description: isSpanish ? "Japón es un país de contrastes, donde la tradición milenaria convive con la tecnología más avanzada. Sus jardines zen, templos antiguos y la cultura del anime atraen a millones de visitantes. La gastronomía japonesa es considerada Patrimonio de la Humanidad." : "Japan is a country of contrasts, where thousand-year-old tradition coexists with the most advanced technology. Its zen gardens, ancient temples, and anime culture attract millions of visitors. Japanese cuisine is considered a World Heritage.",
          fact: isSpanish ? "¡Japón tiene más de 6,800 islas!" : "Japan has more than 6,800 islands!",
          image: "/lovable-uploads/54b230f6-8a76-4e9a-ae4c-5fa2f7087600.png",
          imageAlt: isSpanish ? "Cruce de Shibuya, Tokio" : "Shibuya Crossing, Tokyo"
        };
      case "estados unidos":
      case "eeuu":
      case "usa":
      case "united states":
        return {
          name: isSpanish ? "Estados Unidos" : "United States",
          flag: "🇺🇸",
          capital: isSpanish ? "Washington D.C." : "Washington D.C.",
          language: isSpanish ? "Inglés" : "English",
          famousFor: isSpanish ? "Hollywood, los rascacielos y la Estatua de la Libertad" : "Hollywood, skyscrapers, and the Statue of Liberty",
          description: isSpanish ? "Estados Unidos es el tercer país más grande del mundo y uno de los más diversos culturalmente. Desde los rascacielos de Nueva York hasta las playas de California, ofrece paisajes variados y algunas de las ciudades más famosas del mundo." : "The United States is the third-largest country in the world and one of the most culturally diverse. From the skyscrapers of New York to the beaches of California, it offers varied landscapes and some of the world's most famous cities.",
          fact: isSpanish ? "¡Estados Unidos tiene 63 parques nacionales que protegen paisajes increíbles!" : "The United States has 63 national parks protecting incredible landscapes!",
          image: "/lovable-uploads/21e71de1-c8e4-4bbb-95d6-67ce7ae41316.png",
          imageAlt: isSpanish ? "Empire State Building, Nueva York" : "Empire State Building, New York"
        };
      case "méjico":
      case "méxico":
      case "mexico":
        return {
          name: isSpanish ? "México" : "Mexico",
          flag: "🇲🇽",
          capital: isSpanish ? "Ciudad de México" : "Mexico City",
          language: isSpanish ? "Español" : "Spanish",
          famousFor: isSpanish ? "Las pirámides mayas, la comida picante y el Día de los Muertos" : "Mayan pyramids, spicy food, and the Day of the Dead",
          description: isSpanish ? "México es un país lleno de color, tradiciones y una historia fascinante. Sus ruinas arqueológicas, como Chichén Itzá, muestran la grandeza de sus antiguas civilizaciones. Su gastronomía y festividades son reconocidas mundialmente." : "Mexico is a country full of color, traditions, and a fascinating history. Its archaeological ruins, like Chichen Itza, show the greatness of its ancient civilizations. Its gastronomy and festivities are recognized worldwide.",
          fact: isSpanish ? "¡México es el país con mayor número de hablantes de español en el mundo!" : "Mexico is the country with the largest number of Spanish speakers in the world!",
          image: "/lovable-uploads/2957a4f7-6a54-4e2f-bda1-2177609abc5f.png",
          imageAlt: isSpanish ? "Pirámide de Chichén Itzá" : "Chichen Itza Pyramid"
        };
      case "australia":
      case "australia":
        return {
          name: isSpanish ? "Australia" : "Australia",
          flag: "🇦🇺",
          capital: isSpanish ? "Canberra" : "Canberra",
          language: isSpanish ? "Inglés" : "English",
          famousFor: isSpanish ? "La Ópera de Sídney, los canguros y la Gran Barrera de Coral" : "Sydney Opera House, kangaroos, and the Great Barrier Reef",
          description: isSpanish ? "Australia es el sexto país más grande del mundo y el único que ocupa todo un continente. Es famoso por su fauna única, incluidos los canguros y koalas, así como por sus paisajes impresionantes como la Gran Barrera de Coral." : "Australia is the sixth-largest country in the world and the only one that occupies an entire continent. It is famous for its unique fauna, including kangaroos and koalas, as well as for impressive landscapes like the Great Barrier Reef.",
          fact: isSpanish ? "¡Australia tiene más de 10.000 playas! Si visitaras una cada día, tardarías más de 27 años en verlas todas." : "Australia has over 10,000 beaches! If you visited one each day, it would take over 27 years to see them all.",
          image: "/lovable-uploads/e27d86a7-9c73-425d-806e-1e86fd6c6e99.png",
          imageAlt: isSpanish ? "Canguro australiano" : "Australian kangaroo"
        };
      case "perú":
      case "peru":
        return {
          name: isSpanish ? "Perú" : "Peru",
          flag: "🇵🇪",
          capital: isSpanish ? "Lima" : "Lima",
          language: isSpanish ? "Español" : "Spanish",
          famousFor: isSpanish ? "Machu Picchu, la gastronomía y las líneas de Nazca" : "Machu Picchu, gastronomy, and the Nazca Lines",
          description: isSpanish ? "Perú es un país con una rica herencia inca y una geografía diversa, desde los Andes hasta la Amazonía. Machu Picchu, la antigua ciudad inca, es una de las maravillas del mundo. Su cocina es considerada una de las mejores del planeta." : "Peru is a country with a rich Inca heritage and diverse geography, from the Andes to the Amazon. Machu Picchu, the ancient Inca city, is one of the wonders of the world. Its cuisine is considered one of the best on the planet.",
          fact: isSpanish ? "¡Perú tiene más de 3,000 variedades diferentes de patatas (papas)!" : "Peru has more than 3,000 different varieties of potatoes!",
          image: "/lovable-uploads/24de870a-769c-4544-8001-8554fe29e7f0.png",
          imageAlt: isSpanish ? "Machu Picchu" : "Machu Picchu"
        };
      case "argentina":
        return {
          name: isSpanish ? "Argentina" : "Argentina",
          flag: "🇦🇷",
          capital: isSpanish ? "Buenos Aires" : "Buenos Aires",
          language: isSpanish ? "Español" : "Spanish",
          famousFor: isSpanish ? "El tango, el fútbol y las Cataratas del Iguazú" : "Tango, football, and Iguazu Falls",
          description: isSpanish ? "Argentina es el octavo país más grande del mundo y ofrece paisajes muy diversos, desde los glaciares de la Patagonia hasta las cataratas del Iguazú. Su capital, Buenos Aires, es conocida como la 'París de Sudamérica' por su arquitectura y cultura." : "Argentina is the eighth-largest country in the world and offers very diverse landscapes, from the glaciers of Patagonia to Iguazu Falls. Its capital, Buenos Aires, is known as the 'Paris of South America' for its architecture and culture.",
          fact: isSpanish ? "¡Argentina tiene el punto más alto y más bajo de toda Sudamérica!" : "Argentina has both the highest and lowest points in all of South America!",
          image: "/lovable-uploads/6060d896-a127-404e-987c-3cd8814f558a.png",
          imageAlt: isSpanish ? "Obelisco de Buenos Aires" : "Obelisk of Buenos Aires"
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

  // Handle zoom controls
  const handleZoomIn = () => {
    setMapZoom(prev => Math.min(prev + 0.2, 2));
  };
  const handleZoomOut = () => {
    setMapZoom(prev => Math.max(prev - 0.2, 0.8));
  };
  return <div className="min-h-screen bg-gradient-to-b from-purple-100 to-blue-100 p-4 pt-0">
      <div className="max-w-md mx-auto">
        {/* Back button and title at top */}
        <div className="sticky top-0 z-10 bg-gradient-to-b from-purple-100 to-purple-100/95 pt-2 pb-2">
          <Link to="/">
            
          </Link>
          
          {/* Country title moved to top */}
          <h1 className="text-3xl font-normal kids-text flex items-center mb-2">
            {countryData.name} {countryData.flag}
          </h1>
          <p className="text-gray-600 kids-text">{t('capital')} {countryData.capital}</p>
        </div>
        
        <motion.div className="bg-white rounded-lg shadow-lg overflow-hidden mt-2" initial={{
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
          
          {/* Replace the old map with MapDisplay component */}
          <div className="h-[200px] w-full relative overflow-hidden border-t-2 border-b-2 border-purple-100">
            <MapDisplay zoom={mapZoom} highlightCountry={countryData.name} unlockedCountries={unlockedCountries} />
            <ZoomControls onZoomIn={handleZoomIn} onZoomOut={handleZoomOut} />
          </div>
          
          <div className="p-6">
            {/* Added country description - moved from main page */}
            <div className={`${panelClasses} rounded-lg p-4 mb-4`}>
              <h3 className="text-xl font-normal text-purple-800 kids-text mb-2 flex items-center">
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
              {isEnglish ? `In ${countryData.name}, they speak ${countryData.language}.` : `En ${countryData.name} se habla ${countryData.language}.`}
            </CountryPageIcons>
            
            <CountryPageIcons type="famousFor">
              {isEnglish ? `${countryData.name} is famous for ${countryData.famousFor}.` : `${countryData.name} es famoso por ${countryData.famousFor}.`}
            </CountryPageIcons>
            
            <Link to="/">
              <Button className={`w-full mt-4 ${buttonClasses}`} onClick={() => sessionStorage.setItem('navigatingBack', 'true')}>
                {t('return_to_game')}
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>;
};
export default CountryPageWrapper;