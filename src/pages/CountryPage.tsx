
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
          image: "/lovable-uploads/45cc822d-687a-44d0-ad45-9078d02c48c9.png",
          imageAlt: isSpanish ? "España" : "Spain"
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
          image: "/lovable-uploads/501f7c44-46fc-44ae-8a9f-94b1215f5544.png",
          imageAlt: isSpanish ? "Francia" : "France"
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
          image: "/lovable-uploads/1e352155-e337-4c3e-b4a9-503b2d6a03f4.png",
          imageAlt: isSpanish ? "Italia" : "Italy"
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
          image: "/lovable-uploads/276d9054-061e-45b9-9517-d7f0d8218579.png",
          imageAlt: isSpanish ? "Rusia" : "Russia"
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
          image: "/lovable-uploads/1e352155-e337-4c3e-b4a9-503b2d6a03f4.png",
          imageAlt: isSpanish ? "Japón" : "Japan"
        };
      case "estados unidos":
      case "estados_unidos":
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
          image: "/lovable-uploads/24de870a-769c-4544-8001-8554fe29e7f0.png",
          imageAlt: isSpanish ? "Estados Unidos" : "United States"
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
          image: "/lovable-uploads/54b230f6-8a76-4e9a-ae4c-5fa2f7087600.png",
          imageAlt: isSpanish ? "México" : "Mexico"
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
          image: "/lovable-uploads/5241c79d-2ef8-4940-9d7f-0b05d3d9a912.png",
          imageAlt: isSpanish ? "Australia" : "Australia"
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
          image: "/lovable-uploads/13c721ae-3f14-415a-86bb-0228c47d8425.png",
          imageAlt: isSpanish ? "Perú" : "Peru"
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
          image: "/lovable-uploads/5442b86d-0d51-47d8-b187-efc2e154d0e4.png",
          imageAlt: isSpanish ? "Argentina" : "Argentina"
        };
      case "brasil":
      case "brazil":
        return {
          name: isSpanish ? "Brasil" : "Brazil",
          flag: "🇧🇷",
          capital: isSpanish ? "Brasilia" : "Brasilia",
          language: isSpanish ? "Portugués" : "Portuguese",
          famousFor: isSpanish ? "El Cristo Redentor, el carnaval de Río y las playas de Copacabana" : "Christ the Redeemer, Rio carnival, and Copacabana beaches",
          description: isSpanish ? "Brasil es el país más grande de Sudamérica y el quinto más grande del mundo. Es famoso por sus playas tropicales, la selva amazónica, el fútbol y el vibrante carnaval de Río de Janeiro. El Cristo Redentor es uno de sus símbolos más reconocidos." : "Brazil is the largest country in South America and the fifth largest in the world. It is famous for its tropical beaches, the Amazon rainforest, football, and the vibrant Rio de Janeiro carnival. Christ the Redeemer is one of its most recognized symbols.",
          fact: isSpanish ? "¡Brasil tiene la mayor biodiversidad del mundo, con más de 8.5 millones de especies!" : "Brazil has the greatest biodiversity in the world, with more than 8.5 million species!",
          image: "/lovable-uploads/6eb44f09-3864-48b2-8a08-b682e3a1ada3.png",
          imageAlt: isSpanish ? "Brasil" : "Brazil"
        };
      case "canadá":
      case "canada":
        return {
          name: isSpanish ? "Canadá" : "Canada",
          flag: "🇨🇦",
          capital: isSpanish ? "Ottawa" : "Ottawa",
          language: isSpanish ? "Inglés y Francés" : "English and French",
          famousFor: isSpanish ? "Las Cataratas del Niágara, los lagos cristalinos y el jarabe de arce" : "Niagara Falls, crystal clear lakes, and maple syrup",
          description: isSpanish ? "Canadá es el segundo país más grande del mundo por superficie. Es conocido por sus impresionantes paisajes naturales, desde las Montañas Rocosas hasta los lagos cristalinos. Es famoso por su naturaleza virgen, el hockey sobre hielo y la amabilidad de sus habitantes." : "Canada is the second largest country in the world by area. It is known for its stunning natural landscapes, from the Rocky Mountains to crystal clear lakes. It is famous for its pristine nature, ice hockey, and the kindness of its inhabitants.",
          fact: isSpanish ? "¡Canadá tiene más lagos que el resto del mundo combinado!" : "Canada has more lakes than the rest of the world combined!",
          image: "/lovable-uploads/82ed4a47-c090-4db2-b49e-6041114c97b7.png",
          imageAlt: isSpanish ? "Canadá" : "Canada"
        };
      case "china":
        return {
          name: isSpanish ? "China" : "China",
          flag: "🇨🇳",
          capital: isSpanish ? "Pekín" : "Beijing",
          language: isSpanish ? "Chino Mandarín" : "Mandarin Chinese",
          famousFor: isSpanish ? "La Gran Muralla, los pandas gigantes y la Ciudad Prohibida" : "The Great Wall, giant pandas, and the Forbidden City",
          description: isSpanish ? "China es el país más poblado del mundo y tiene una historia milenaria. La Gran Muralla China es una de las construcciones más impresionantes de la humanidad. Su cultura, gastronomía y avances tecnológicos la convierten en una potencia mundial." : "China is the most populous country in the world and has a millennial history. The Great Wall of China is one of humanity's most impressive constructions. Its culture, gastronomy, and technological advances make it a world power.",
          fact: isSpanish ? "¡La Gran Muralla China es tan larga que podría dar la vuelta al ecuador terrestre!" : "The Great Wall of China is so long it could wrap around the Earth's equator!",
          image: "/lovable-uploads/3eeeb432-83e7-40d5-839a-f72b03d08da9.png",
          imageAlt: isSpanish ? "China" : "China"
        };
      case "costa rica":
      case "costa_rica":
        return {
          name: isSpanish ? "Costa Rica" : "Costa Rica",
          flag: "🇨🇷",
          capital: isSpanish ? "San José" : "San José",
          language: isSpanish ? "Español" : "Spanish",
          famousFor: isSpanish ? "La biodiversidad, los volcanes y las playas paradisíacas" : "Biodiversity, volcanoes, and paradisiacal beaches",
          description: isSpanish ? "Costa Rica es un pequeño país centroamericano conocido por su increíble biodiversidad y belleza natural. Aunque ocupa solo el 0.03% de la superficie terrestre, alberga el 6% de la biodiversidad mundial. Sus playas, volcanes y selvas tropicales lo convierten en un paraíso ecoturístico." : "Costa Rica is a small Central American country known for its incredible biodiversity and natural beauty. Although it occupies only 0.03% of the Earth's surface, it is home to 6% of the world's biodiversity. Its beaches, volcanoes, and tropical forests make it an ecotourism paradise.",
          fact: isSpanish ? "¡Costa Rica no tiene ejército desde 1948 y destina ese presupuesto a educación y salud!" : "Costa Rica has had no army since 1948 and allocates that budget to education and health!",
          image: "/lovable-uploads/638a48e4-c52f-4687-a1e1-5db85caa1793.png",
          imageAlt: isSpanish ? "Costa Rica" : "Costa Rica"
        };
      case "grecia":
      case "greece":
        return {
          name: isSpanish ? "Grecia" : "Greece",
          flag: "🇬🇷",
          capital: isSpanish ? "Atenas" : "Athens",
          language: isSpanish ? "Griego" : "Greek",
          famousFor: isSpanish ? "El Partenón, la filosofía antigua y las islas paradisíacas" : "The Parthenon, ancient philosophy, and paradisiacal islands",
          description: isSpanish ? "Grecia es considerada la cuna de la civilización occidental, la democracia y la filosofía. Sus ruinas antiguas, como el Partenón en Atenas, son testimonio de su rico pasado histórico. Sus hermosas islas en el mar Egeo atraen a millones de visitantes cada año." : "Greece is considered the cradle of Western civilization, democracy, and philosophy. Its ancient ruins, like the Parthenon in Athens, bear witness to its rich historical past. Its beautiful islands in the Aegean Sea attract millions of visitors each year.",
          fact: isSpanish ? "¡Grecia tiene más de 6,000 islas, pero solo 227 están habitadas!" : "Greece has more than 6,000 islands, but only 227 are inhabited!",
          image: "/lovable-uploads/aa16d3eb-100f-4916-ba38-871f34a715da.png",
          imageAlt: isSpanish ? "Grecia" : "Greece"
        };
      case "reino unido":
      case "reino_unido":
      case "united kingdom":
        return {
          name: isSpanish ? "Reino Unido" : "United Kingdom",
          flag: "🇬🇧",
          capital: isSpanish ? "Londres" : "London",
          language: isSpanish ? "Inglés" : "English",
          famousFor: isSpanish ? "El Big Ben, la familia real y el té de las cinco" : "Big Ben, the royal family, and five o'clock tea",
          description: isSpanish ? "El Reino Unido está formado por Inglaterra, Escocia, Gales e Irlanda del Norte. Londres, su capital, es famosa por sus monumentos históricos como el Big Ben, el Palacio de Buckingham y el London Eye. Su rica historia, cultura y tradiciones lo convierten en uno de los destinos más visitados del mundo." : "The United Kingdom consists of England, Scotland, Wales, and Northern Ireland. London, its capital, is famous for its historical monuments like Big Ben, Buckingham Palace, and the London Eye. Its rich history, culture, and traditions make it one of the most visited destinations in the world.",
          fact: isSpanish ? "¡El Reino Unido tiene más de 1,500 castillos!" : "The United Kingdom has more than 1,500 castles!",
          image: "/lovable-uploads/2957a4f7-6a54-4e2f-bda1-2177609abc5f.png",
          imageAlt: isSpanish ? "Reino Unido" : "United Kingdom"
        };
      case "noruega":
      case "norway":
        return {
          name: isSpanish ? "Noruega" : "Norway",
          flag: "🇳🇴",
          capital: isSpanish ? "Oslo" : "Oslo",
          language: isSpanish ? "Noruego" : "Norwegian",
          famousFor: isSpanish ? "Los fiordos, la aurora boreal y los vikingos" : "Fjords, northern lights, and Vikings",
          description: isSpanish ? "Noruega es famosa por sus espectaculares fiordos, la aurora boreal y su rica herencia vikinga. Es un país escandinavo con paisajes naturales impresionantes, desde las montañas nevadas hasta las costas rocosas. También es conocido por su alto nivel de vida y sostenibilidad ambiental." : "Norway is famous for its spectacular fjords, northern lights, and rich Viking heritage. It is a Scandinavian country with stunning natural landscapes, from snowy mountains to rocky coasts. It is also known for its high standard of living and environmental sustainability.",
          fact: isSpanish ? "¡Noruega tiene más de 1,000 fiordos a lo largo de su costa!" : "Norway has more than 1,000 fjords along its coast!",
          image: "/lovable-uploads/9e7f018b-48ce-4158-acf0-ddcc7e2b4804.png",
          imageAlt: isSpanish ? "Noruega" : "Norway"
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
