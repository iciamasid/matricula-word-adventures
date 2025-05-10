
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ZoomIn, ZoomOut, Map } from 'lucide-react';

interface WorldMapProps {
  highlightCountry?: string;
  unlockedCountries?: string[];
}

const WorldMap: React.FC<WorldMapProps> = ({ highlightCountry, unlockedCountries = [] }) => {
  const [zoom, setZoom] = useState(1);
  
  // Map countries to their accurate positions
  const getCountryPosition = (country: string) => {
    const positions: Record<string, { left: string, top: string }> = {
      "España": { left: "47%", top: "42%" },
      "Francia": { left: "48.5%", top: "39%" },
      "Italia": { left: "51%", top: "41%" },
      "Rusia": { left: "62%", top: "35%" },
      "Japón": { left: "82%", top: "42%" },
      "Estados Unidos": { left: "20%", top: "40%" },
      "Argentina": { left: "30%", top: "75%" },
      "Méjico": { left: "17%", top: "48%" },
      "Australia": { left: "83%", top: "75%" },
      "Antártida": { left: "50%", top: "90%" }
    };
    
    return positions[country] || { left: "50%", top: "50%" };
  };

  // Get image for each country
  const getCountryImage = (country: string) => {
    const images: Record<string, string> = {
      "España": "/lovable-uploads/82ed4a47-c090-4db2-b49e-6041114c97b7.png",
      "Francia": "/lovable-uploads/276d9054-061e-45b9-9517-d7f0d8218579.png",
      "Italia": "/lovable-uploads/501f7c44-46fc-44ae-8a9f-94b1215f5544.png",
      "Rusia": "/lovable-uploads/501f7c44-46fc-44ae-8a9f-94b1215f5544.png",
      "Japón": "/lovable-uploads/501f7c44-46fc-44ae-8a9f-94b1215f5544.png",
      "Estados Unidos": "/lovable-uploads/501f7c44-46fc-44ae-8a9f-94b1215f5544.png",
      "Argentina": "/lovable-uploads/501f7c44-46fc-44ae-8a9f-94b1215f5544.png",
      "Méjico": "/lovable-uploads/501f7c44-46fc-44ae-8a9f-94b1215f5544.png",
      "Australia": "/lovable-uploads/501f7c44-46fc-44ae-8a9f-94b1215f5544.png",
      "Antártida": "/lovable-uploads/501f7c44-46fc-44ae-8a9f-94b1215f5544.png"
    };
    
    return images[country] || "/lovable-uploads/501f7c44-46fc-44ae-8a9f-94b1215f5544.png";
  };

  const handleZoomIn = () => {
    if (zoom < 2) setZoom(prev => prev + 0.25);
  };

  const handleZoomOut = () => {
    if (zoom > 0.5) setZoom(prev => prev - 0.25);
  };
  
  return (
    <div className="bg-[#9a83b9] h-full w-full flex items-center justify-center p-3 relative rounded-lg border-4 border-white/50">
      {/* Zoom controls */}
      <div className="absolute top-2 right-2 z-10 flex gap-1">
        <button 
          onClick={handleZoomIn}
          className="bg-white/80 hover:bg-white p-1 rounded-md shadow-sm"
          aria-label="Zoom in"
        >
          <ZoomIn className="w-5 h-5 text-purple-800" />
        </button>
        <button 
          onClick={handleZoomOut}
          className="bg-white/80 hover:bg-white p-1 rounded-md shadow-sm"
          aria-label="Zoom out"
        >
          <ZoomOut className="w-5 h-5 text-purple-800" />
        </button>
      </div>
      
      <motion.div 
        className="relative w-full h-full overflow-hidden"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="w-full h-full relative"
          style={{ 
            scale: zoom,
            transformOrigin: "center"
          }}
        >
          {/* Usar la imagen del mapa mundi como fondo */}
          <img 
            src="/lovable-uploads/775e117d-bc61-4576-a77e-acba4f134785.png" 
            alt="World Map" 
            className="w-full h-full object-cover opacity-70"
            style={{ minWidth: "100%", minHeight: "100%" }}
          />

          {/* Current highlighted country */}
          {highlightCountry && (
            <motion.div 
              className="absolute w-6 h-6 z-10"
              style={{ 
                left: getCountryPosition(highlightCountry).left,
                top: getCountryPosition(highlightCountry).top,
                transform: "translate(-50%, -50%)"
              }}
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white rounded-full p-1 shadow-lg">
                <div className="bg-red-500 rounded-full w-4 h-4 flex items-center justify-center pulse">
                  <span className="text-white text-xs font-bold">
                    {WORLD_DESTINATIONS.find(dest => dest.country === highlightCountry)?.flag || "🚩"}
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Unlocked countries */}
          {unlockedCountries.map((country, index) => (
            <Link to={`/country/${country}`} key={country} className="block">
              <motion.div 
                className="absolute unlocked-country"
                style={{ 
                  left: getCountryPosition(country).left,
                  top: getCountryPosition(country).top,
                  transform: "translate(-50%, -50%)",
                  zIndex: highlightCountry === country ? 20 : 5
                }}
                animate={{ 
                  y: [0, -5, 0],
                  scale: highlightCountry === country ? 1.2 : 1
                }}
                transition={{ 
                  y: { duration: 2, repeat: Infinity, repeatType: "reverse" },
                  scale: { duration: 0.3 }
                }}
                whileHover={{ scale: 1.2 }}
              >
                <motion.div 
                  className="bg-white rounded-full p-0.5 shadow-lg"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <img 
                    src={getCountryImage(country)} 
                    alt={country}
                    className="w-5 h-5 rounded-full object-cover"
                  />
                </motion.div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

// Add the destinations array so we can access the flags
const WORLD_DESTINATIONS = [
  {
    city: "Madrid",
    country: "España",
    flag: "🇪🇸",
    fact: "¡En Madrid está el museo del Prado con obras de arte increíbles! Es una de las galerías de arte más famosas del mundo."
  },
  {
    city: "París",
    country: "Francia",
    flag: "🇫🇷",
    fact: "¡La Torre Eiffel mide 324 metros! ¡Es tan alta como un edificio de 81 pisos y fue construida en 1889!"
  },
  {
    city: "Roma",
    country: "Italia",
    flag: "🇮🇹",
    fact: "En Roma puedes visitar el Coliseo, ¡donde luchaban los gladiadores hace 2000 años! Podía albergar a más de 50.000 personas."
  },
  {
    city: "Moscú",
    country: "Rusia",
    flag: "🇷🇺",
    fact: "¡La Plaza Roja de Moscú es tan grande que caben 6 campos de fútbol! A su lado está el Kremlin, una fortaleza con murallas de color rojo."
  },
  {
    city: "Tokio",
    country: "Japón",
    flag: "🇯🇵",
    fact: "¡En Tokio hay máquinas expendedoras que venden casi de todo: desde juguetes hasta paraguas! Hay más de 5 millones de máquinas en Japón."
  },
  {
    city: "Nueva York",
    country: "Estados Unidos",
    flag: "🇺🇸",
    fact: "¡La Estatua de la Libertad fue un regalo de Francia a Estados Unidos! Mide 93 metros y su corona tiene 7 picos que representan los 7 continentes."
  },
  {
    city: "Buenos Aires",
    country: "Argentina",
    flag: "🇦🇷",
    fact: "¡En Buenos Aires hay una librería en un antiguo teatro! Es tan bonita que la llaman 'la librería más bella del mundo'."
  },
  {
    city: "Ciudad de México",
    country: "Méjico",
    flag: "🇲🇽",
    fact: "Los antiguos aztecas construyeron Ciudad de México sobre un lago. ¡Todavía hay partes de la ciudad que se hunden un poco cada año!"
  },
  {
    city: "Sídney",
    country: "Australia",
    flag: "🇦🇺",
    fact: "La Ópera de Sídney parece barcos con velas desplegadas en el puerto. ¡Tardaron 14 años en construirla!"
  },
  {
    city: "Base Marambio",
    country: "Antártida",
    flag: "🇦🇶",
    fact: "¡En la Antártida hace tanto frío que el hielo puede tener 4 kilómetros de grosor! Es el lugar más frío de la Tierra, ¡puede llegar a -89ºC!"
  }
];

export default WorldMap;
