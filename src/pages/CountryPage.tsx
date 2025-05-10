
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import WorldMap from '@/components/WorldMap';

// Información de países para niños
const countriesInfo = {
  "España": {
    flag: "🇪🇸",
    capital: "Madrid",
    language: "Español",
    famousFor: ["La Sagrada Familia", "Platos como la paella", "Fútbol"],
    funFact: "¡En España hay una fiesta llamada 'La Tomatina' donde la gente se lanza tomates unos a otros por diversión!",
    image: "/lovable-uploads/501f7c44-46fc-44ae-8a9f-94b1215f5544.png",
    description: "España es un país colorido con hermosas playas, mucha historia y deliciosa comida. Tiene 17 regiones diferentes, cada una con sus propias tradiciones."
  },
  "Francia": {
    flag: "🇫🇷",
    capital: "París",
    language: "Francés",
    famousFor: ["La Torre Eiffel", "Quesos y pasteles", "Arte"],
    funFact: "La Torre Eiffel fue construida para una exposición y se suponía que sería temporal, ¡pero gustó tanto que la dejaron!",
    image: "/lovable-uploads/82ed4a47-c090-4db2-b49e-6041114c97b7.png",
    description: "Francia es conocida por su deliciosa comida, su arte y la Torre Eiffel. París, su capital, es llamada la 'Ciudad del Amor'."
  },
  "Italia": {
    flag: "🇮🇹",
    capital: "Roma",
    language: "Italiano",
    famousFor: ["Pizza y pasta", "El Coliseo", "Arte renacentista"],
    funFact: "¡Los italianos inventaron el helado! Y tienen más de 100 sabores diferentes.",
    image: "/lovable-uploads/276d9054-061e-45b9-9517-d7f0d8218579.png",
    description: "Italia tiene forma de bota y es famosa por su comida deliciosa como la pizza y el helado. También tiene muchos monumentos históricos antiguos."
  },
  "Rusia": {
    flag: "🇷🇺",
    capital: "Moscú",
    language: "Ruso",
    famousFor: ["La Plaza Roja", "El Kremlin", "Ballet clásico"],
    funFact: "¡Rusia es tan grande que abarca 11 zonas horarias diferentes! Si en un extremo es por la mañana, en el otro ya es casi de noche.",
    image: "/placeholder.svg",
    description: "Rusia es el país más grande del mundo, ¡tan grande que ocupa parte de Europa y parte de Asia! Tiene hermosos palacios, bosques enormes y mucha nieve en invierno."
  },
  "Japón": {
    flag: "🇯🇵",
    capital: "Tokio",
    language: "Japonés",
    famousFor: ["Anime y manga", "Sushi", "Tecnología"],
    funFact: "En Japón hay un café donde puedes jugar con gatos mientras tomas algo. ¡Se llaman 'Cat Cafés'!",
    image: "/placeholder.svg",
    description: "Japón es un país con una mezcla de tradición y tecnología moderna. Tiene hermosos templos, jardines de cerezos y es donde se inventaron los videojuegos y el anime."
  },
  "Estados Unidos": {
    flag: "🇺🇸",
    capital: "Washington D.C.",
    language: "Inglés",
    famousFor: ["Hollywood", "Parques de atracciones", "Hamburguesas"],
    funFact: "El Gran Cañón es tan grande que se puede ver desde el espacio. ¡Y algunos árboles en California son tan altos como un edificio de 30 pisos!",
    image: "/placeholder.svg",
    description: "Estados Unidos es un país muy grande con muchos lugares diferentes para visitar: desde grandes ciudades como Nueva York hasta desiertos, playas y montañas."
  },
  "Argentina": {
    flag: "🇦🇷",
    capital: "Buenos Aires",
    language: "Español",
    famousFor: ["Fútbol", "Tango", "Asado (barbacoa)"],
    funFact: "En Argentina están las Cataratas del Iguazú, que tienen 275 cascadas diferentes. ¡Es como tener cientos de cascadas juntas!",
    image: "/placeholder.svg",
    description: "Argentina es un país con enormes llanuras donde viven vaqueros llamados gauchos, montañas nevadas, y hasta glaciares de hielo azul en el sur."
  },
  "Méjico": {
    flag: "🇲🇽",
    capital: "Ciudad de México",
    language: "Español",
    famousFor: ["Tacos", "Pirámides mayas", "Día de los Muertos"],
    funFact: "El chocolate fue inventado por los antiguos mayas y aztecas de México, ¡pero lo tomaban como una bebida picante, no dulce!",
    image: "/placeholder.svg",
    description: "México tiene una cultura muy colorida, con música alegre, comida deliciosa y fiestas llenas de color. También tiene pirámides antiguas que puedes visitar."
  },
  "Australia": {
    flag: "🇦🇺",
    capital: "Canberra",
    language: "Inglés",
    famousFor: ["Canguros y koalas", "La Gran Barrera de Coral", "La Ópera de Sídney"],
    funFact: "En Australia viven animales que no existen en ninguna otra parte del mundo, como el ornitorrinco, ¡que parece una mezcla entre pato y castor!",
    image: "/placeholder.svg",
    description: "Australia es un país que también es un continente entero. Tiene playas increíbles, el desierto en el centro llamado 'Outback' y animales muy especiales."
  },
  "Antártida": {
    flag: "🇦🇶",
    capital: "No tiene capital (no es un país oficial)",
    language: "No tiene idioma oficial",
    famousFor: ["Pingüinos", "Científicos", "Hielo y nieve"],
    funFact: "La Antártida está cubierta por una capa de hielo que tiene un promedio de 1.6 kilómetros de espesor. ¡Es el lugar más frío, ventoso y seco del planeta!",
    image: "/placeholder.svg",
    description: "La Antártida es un continente helado en el extremo sur de la Tierra. No pertenece a ningún país y está lleno de pingüinos, focas y científicos que estudian el clima."
  }
};

const CountryPage: React.FC = () => {
  const { country = "" } = useParams<{ country: string }>();
  const navigate = useNavigate();
  const countryInfo = countriesInfo[country as keyof typeof countriesInfo];
  
  // Scroll to top when the page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [country]);
  
  if (!countryInfo) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4" style={{ backgroundColor: "rgb(154, 131, 185)" }}>
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md">
          <h1 className="text-3xl font-bold mb-4 text-red-600 kids-text">¡País no encontrado!</h1>
          <p className="mb-6 text-lg kids-text">Lo sentimos, no tenemos información sobre este país.</p>
          <Button onClick={() => navigate('/')} className="kids-text">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Volver al juego
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <motion.div 
      className="min-h-screen"
      style={{ backgroundColor: "rgb(154, 131, 185)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="max-w-4xl mx-auto p-4">
        <Button 
          onClick={() => navigate('/')} 
          variant="outline" 
          className="mb-4 bg-white hover:bg-gray-100 kids-text"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Volver al juego
        </Button>
        
        <motion.div
          className="bg-white rounded-lg shadow-lg overflow-hidden"
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header con bandera y nombre del país */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-500 p-6 flex items-center">
            <motion.span 
              className="text-6xl mr-4"
              animate={{ 
                rotate: [0, 5, 0, -5, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              {countryInfo.flag}
            </motion.span>
            <div>
              <h1 className="text-4xl font-bold text-white kids-text">{country}</h1>
              <p className="text-xl text-white/90 kids-text">Capital: {countryInfo.capital}</p>
            </div>
          </div>
          
          <div className="p-6">
            {/* Mapa con el país destacado */}
            <div className="h-64 mb-6 rounded-lg overflow-hidden border-4 border-purple-200">
              <WorldMap highlightCountry={country} />
            </div>
            
            {/* Imagen del país */}
            <div className="mb-6">
              <img 
                src={countryInfo.image} 
                alt={`Imagen de ${country}`}
                className="w-full h-64 object-cover rounded-lg shadow-md"
              />
            </div>
            
            {/* Descripción del país */}
            <div className="mb-6">
              <h2 className="text-3xl font-bold mb-2 text-purple-800 kids-text">Sobre {country}</h2>
              <p className="text-xl text-gray-700 kids-text">{countryInfo.description}</p>
            </div>
            
            {/* Datos curiosos */}
            <motion.div 
              className="bg-yellow-50 p-5 rounded-lg border-2 border-yellow-200 mb-6"
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3 className="text-2xl font-bold mb-2 text-yellow-800 kids-text">¡Dato curioso!</h3>
              <p className="text-xl text-yellow-800 kids-text">{countryInfo.funFact}</p>
            </motion.div>
            
            {/* Información básica */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
                <h3 className="text-2xl font-bold mb-2 text-blue-800 kids-text">Idioma</h3>
                <p className="text-xl text-blue-800 kids-text">{countryInfo.language}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border-2 border-green-200">
                <h3 className="text-2xl font-bold mb-2 text-green-800 kids-text">Famoso por</h3>
                <ul className="list-disc pl-5">
                  {countryInfo.famousFor.map((item, index) => (
                    <li key={index} className="text-xl text-green-800 kids-text">{item}</li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Botón para volver al juego */}
            <div className="flex justify-center mt-8">
              <Button 
                onClick={() => navigate('/')} 
                size="lg"
                className="bg-purple-600 hover:bg-purple-700 text-xl px-8 py-6 kids-text"
              >
                ¡Volver a jugar!
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CountryPage;
