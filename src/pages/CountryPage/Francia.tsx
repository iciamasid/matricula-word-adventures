
import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, MapPin, Camera, Utensils, Mountain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Francia = () => {
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
    // Restore game state if it was stored
    const gameState = sessionStorage.getItem('gameStateBeforeCountry');
    if (gameState) {
      const parsedState = JSON.parse(gameState);
      // Store the state for the target game to restore
      sessionStorage.setItem('restoreGameState', JSON.stringify(parsedState));
      sessionStorage.removeItem('gameStateBeforeCountry');
    }
    
    // Clear the navigation flag when returning
    sessionStorage.removeItem('navigatingBack');
    navigate(getReturnPath());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header with return button */}
        <div className="flex items-center justify-between mb-6">
          <Button
            onClick={handleReturn}
            variant="outline"
            size="sm"
            className="bg-white/80 hover:bg-white text-purple-700 border-purple-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al juego
          </Button>
          
          <div className="text-center">
            <h1 className="text-4xl font-bold text-purple-800 kids-text mb-2">
              🇫🇷 Francia
            </h1>
            <p className="text-purple-600 kids-text">
              ¡Bienvenido a Francia!
            </p>
          </div>

          <div className="w-24"></div> {/* Spacer for centering */}
        </div>

        {/* Main content sections */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-purple-700 kids-text mb-4 flex items-center">
            <MapPin className="w-6 h-6 mr-2" /> Lugares para visitar
          </h2>
          <ul className="list-disc list-inside text-purple-600">
            <li>Torre Eiffel (París)</li>
            <li>Museo del Louvre (París)</li>
            <li>Costa Azul (Niza, Cannes)</li>
            <li>Palacio de Versalles (Versalles)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-purple-700 kids-text mb-4 flex items-center">
            <Camera className="w-6 h-6 mr-2" /> Atracciones turísticas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div
              className="relative overflow-hidden rounded-md shadow-md"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src="/lovable-uploads/francia_eiffel.jpg"
                alt="Torre Eiffel"
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-black/40 p-4 flex items-end">
                <p className="text-white text-lg font-semibold">Torre Eiffel</p>
              </div>
            </motion.div>

            <motion.div
              className="relative overflow-hidden rounded-md shadow-md"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src="/lovable-uploads/francia_louvre.jpg"
                alt="Museo del Louvre"
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-black/40 p-4 flex items-end">
                <p className="text-white text-lg font-semibold">Museo del Louvre</p>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-purple-700 kids-text mb-4 flex items-center">
            <Utensils className="w-6 h-6 mr-2" /> Comida típica
          </h2>
          <ul className="list-disc list-inside text-purple-600">
            <li>Crêpes</li>
            <li>Ratatouille</li>
            <li>Macarons</li>
            <li>Quesos (Brie, Camembert)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-purple-700 kids-text mb-4 flex items-center">
            <Mountain className="w-6 h-6 mr-2" /> Datos interesantes
          </h2>
          <ul className="list-disc list-inside text-purple-600">
            <li>Francia es el país más visitado del mundo.</li>
            <li>La Revolución Francesa comenzó en 1789.</li>
            <li>El idioma oficial es el francés.</li>
            <li>Francia es famosa por su moda y alta cocina.</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Francia;
