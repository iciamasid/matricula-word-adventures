import React, { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, MapPin, Camera, Utensils, Mountain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const CountryPage = () => {
  const { country } = useParams<{ country: string }>();
  const navigate = useNavigate();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Determine the correct return path based on navigation context
  const getReturnPath = () => {
    const navigatingBack = sessionStorage.getItem('navigatingBack');
    
    if (navigatingBack === 'motorcycle-game') {
      return '/motorcycle-game';
    } else {
      return '/'; // Default to car game (Index page)
    }
  };

  const handleReturn = () => {
    // Clear the navigation flag when returning
    sessionStorage.removeItem('navigatingBack');
    navigate(getReturnPath());
  };

  // Country-specific display logic
  const getCountryDisplayName = (countryCode: string) => {
    switch (countryCode) {
      case "España":
        return "España";
      case "Francia":
        return "Francia";
      case "Italia":
        return "Italia";
      case "Rusia":
        return "Rusia";
      case "Japón":
        return "Japón";
      case "Estados Unidos":
        return "Estados Unidos";
      case "México":
        return "México";
      case "Australia":
        return "Australia";
      case "Argentina":
        return "Argentina";
      case "Reino_Unido":
        return "Reino Unido";
      case "Grecia":
        return "Grecia";
      case "Noruega":
        return "Noruega";
      case "China":
        return "China";
      case "Canada":
        return "Canadá";
      case "Costa_Rica":
        return "Costa Rica";
      case "Brasil":
        return "Brasil";
      case "Peru":
        return "Perú";
      default:
        return countryCode; // Fallback to the country code if no display name is found
    }
  };

  const displayName = getCountryDisplayName(country);

  // Content sections
  const sections = [
    {
      title: `Acerca de ${displayName}`,
      icon: <MapPin className="w-5 h-5 mr-2 text-blue-500" />,
      content: `Información general sobre ${displayName}.`
    },
    {
      title: `Turismo en ${displayName}`,
      icon: <Camera className="w-5 h-5 mr-2 text-green-500" />,
      content: `Descubre los mejores lugares para visitar en ${displayName}.`
    },
    {
      title: `Gastronomía de ${displayName}`,
      icon: <Utensils className="w-5 h-5 mr-2 text-orange-500" />,
      content: `Prueba los platos típicos de la cocina de ${displayName}.`
    },
    {
      title: `Naturaleza en ${displayName}`,
      icon: <Mountain className="w-5 h-5 mr-2 text-gray-500" />,
      content: `Explora la belleza natural de ${displayName}.`
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header with return button */}
        <div className="flex items-center justify-between mb-6">
          <Button
            onClick={handleReturn}
            variant="outline"
            size="sm"
            className="bg-white/80 hover:bg-white text-indigo-700 border-indigo-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al juego
          </Button>
          
          <div className="text-center">
            <h1 className="text-4xl font-bold text-indigo-800 kids-text mb-2">
              {displayName}
            </h1>
            <p className="text-indigo-600 kids-text">
              ¡Bienvenido a {displayName}!
            </p>
          </div>

          <div className="w-24"></div> {/* Spacer for centering */}
        </div>

        {/* Content sections */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {sections.map((section, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg shadow-md p-4"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="text-2xl font-semibold text-indigo-700 flex items-center mb-2">
                {section.icon}
                {section.title}
              </h2>
              <p className="text-indigo-600">
                {section.content}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Explore More */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="text-indigo-700 mb-4">
            ¿Quieres saber más sobre {displayName}?
          </p>
          <Link
            to={`https://es.wikipedia.org/wiki/${country}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
              Explorar en Wikipedia
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default CountryPage;
