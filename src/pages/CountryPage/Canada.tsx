import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const CanadaPage = () => {
  const navigate = useNavigate();

  // Ensure page starts from top when component mounts
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

  const handleNavigation = () => {
    // CRITICAL FIX: Restore game state if it was stored
    const gameState = sessionStorage.getItem('gameStateBeforeCountry');
    if (gameState) {
      const parsedState = JSON.parse(gameState);
      console.log('Restoring game state from Canada page:', parsedState);
      
      // Store the state for the GameContext to restore
      sessionStorage.setItem('restoreGameState', JSON.stringify(parsedState));
      sessionStorage.removeItem('gameStateBeforeCountry');
    }
    
    // Clear the navigation flag when returning
    sessionStorage.removeItem('navigatingBack');
    navigate(getReturnPath());
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-red-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleNavigation}
          className="mb-4 bg-red-700/90 hover:bg-red-800 text-white border-red-600"
        >
          <ArrowLeft className="w-4 h-4 mr-1" /> Volver al juego
        </Button>

        {/* Header with flag and country name */}
        <div className="text-center mb-8">
          <div className="text-8xl mb-4">🇨🇦</div>
          <h1 className="text-4xl font-bold text-red-800 kids-text mb-2">Canadá</h1>
          <p className="text-xl text-red-700 kids-text">¡Bienvenido a Canadá!</p>
        </div>

        {/* Country image */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
          <motion.img 
            src="/lovable-uploads/501f7c44-46fc-44ae-8a9f-94b1215f5544.png" 
            alt="Paisaje canadiense"
            className="w-full h-64 object-cover"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1 }}
          />
        </div>

        {/* Country map location */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
          <div className="p-4 bg-red-50">
            <h2 className="text-2xl font-bold text-red-800 kids-text mb-2 flex items-center">
              <MapPin className="w-6 h-6 mr-2 text-red-700" /> Ubicación
            </h2>
          </div>
          <div className="relative pb-[56.25%] h-0">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25311534.858223863!2d-136.40945936225693!3d60.015397470051464!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4b0d03d337cc6ad9%3A0x9968b72aa2438fa5!2sCanada!5e0!3m2!1sen!2ses!4v1653130345678!5m2!1sen!2ses"
              width="100%"
              height="100%"
              style={{ border: 0, position: 'absolute', top: 0, left: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        {/* Basic info section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-red-800 kids-text mb-4">Información básica</h2>
          <div className="grid grid-cols-2 gap-4 text-lg">
            <div>
              <h3 className="font-semibold text-red-700 kids-text">Capital</h3>
              <p className="text-gray-700 kids-text">Ottawa</p>
            </div>
            <div>
              <h3 className="font-semibold text-red-700 kids-text">Idioma</h3>
              <p className="text-gray-700 kids-text">Inglés y Francés</p>
            </div>
            <div>
              <h3 className="font-semibold text-red-700 kids-text">Población</h3>
              <p className="text-gray-700 kids-text">38.01 millones</p>
            </div>
            <div>
              <h3 className="font-semibold text-red-700 kids-text">Moneda</h3>
              <p className="text-gray-700 kids-text">Dólar canadiense ($)</p>
            </div>
          </div>
        </div>

        {/* Fun facts section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-red-800 kids-text mb-4">¡Datos curiosos!</h2>
          <div className="space-y-4 text-lg text-gray-700">
            <p>🏔️ <strong>¡Canadá tiene más lagos que el resto del mundo junto!</strong> Con más de 2 millones de lagos.</p>
            <p>🦫 <strong>¡El castor es el animal nacional!</strong> Aparece en la moneda de 5 centavos.</p>
            <p>🏒 <strong>¡El hockey sobre hielo es el deporte nacional de invierno!</strong> Y lacrosse el de verano.</p>
            <p>🌍 <strong>¡Es el segundo país más grande del mundo!</strong> Solo Rusia es más grande.</p>
          </div>
        </div>

        {/* Landmarks section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-red-800 kids-text mb-4">Lugares famosos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg text-gray-700">
            <div className="p-4 bg-red-50 rounded-lg">
              <h3 className="font-bold text-red-800">🌊 Cataratas del Niágara</h3>
              <p>Enormes cataratas de agua que comparte con Estados Unidos.</p>
            </div>
            <div className="p-4 bg-red-50 rounded-lg">
              <h3 className="font-bold text-red-800">🗼 CN Tower</h3>
              <p>Torre de comunicaciones de 553 metros en Toronto.</p>
            </div>
            <div className="p-4 bg-red-50 rounded-lg">
              <h3 className="font-bold text-red-800">🏔️ Parque Nacional Banff</h3>
              <p>Montañas Rocosas con lagos cristalinos y glaciares.</p>
            </div>
            <div className="p-4 bg-red-50 rounded-lg">
              <h3 className="font-bold text-red-800">🏛️ Viejo Quebec</h3>
              <p>Ciudad histórica amurallada, patrimonio de la humanidad.</p>
            </div>
          </div>
        </div>

        {/* Cultural section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-red-800 kids-text mb-4">Cultura y tradiciones</h2>
          <div className="space-y-4 text-lg text-gray-700">
            <p>🥞 <strong>Jarabe de arce:</strong> Canadá produce el 71% del jarabe de arce del mundo.</p>
            <p>🏒 <strong>Hockey:</strong> Deporte nacional que se juega en pistas de hielo durante el invierno.</p>
            <p>🦃 <strong>Día de Acción de Gracias:</strong> Se celebra en octubre, antes que en Estados Unidos.</p>
            <p>🌈 <strong>Multiculturalismo:</strong> País donde conviven personas de muchas culturas diferentes.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CanadaPage;
