
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const ItaliaPage = () => {
  const [returnGame, setReturnGame] = useState('/draw-game');

  useEffect(() => {
    // Check if coming from car game based on the referrer or localStorage
    const referrer = document.referrer;
    if (referrer.includes('motorcycle-game')) {
      setReturnGame('/motorcycle-game');
    } else {
      setReturnGame('/draw-game');
    }

    // Check if localStorage has info about which game we came from
    const navigatingBack = sessionStorage.getItem('navigatingBack');
    if (navigatingBack === 'car-game') {
      setReturnGame('/');
    } else if (navigatingBack === 'motorcycle-game') {
      setReturnGame('/motorcycle-game');
    }
  }, []);

  const handleNavigation = () => {
    // Store which game we're returning to
    if (returnGame === '/') {
      sessionStorage.setItem('navigatingBack', 'car-game');
    } else {
      sessionStorage.setItem('navigatingBack', 'motorcycle-game');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-red-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <Link to={returnGame}>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleNavigation}
            className="mb-4 bg-green-700/90 hover:bg-green-800 text-white border-green-600"
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> Volver al juego
          </Button>
        </Link>

        {/* Header with flag and country name */}
        <div className="text-center mb-8">
          <div className="text-8xl mb-4">🇮🇹</div>
          <h1 className="text-4xl font-bold text-green-800 kids-text mb-2">Italia</h1>
          <p className="text-xl text-green-700 kids-text">¡Bienvenido a Italia!</p>
        </div>

        {/* Country image */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
          <motion.img 
            src="/lovable-uploads/501f7c44-46fc-44ae-8a9f-94b1215f5544.png" 
            alt="Paisaje de Italia"
            className="w-full h-64 object-cover"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1 }}
          />
        </div>

        {/* Country map location */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
          <div className="p-4 bg-green-50">
            <h2 className="text-2xl font-bold text-green-800 kids-text mb-2 flex items-center">
              <MapPin className="w-6 h-6 mr-2 text-green-700" /> Ubicación
            </h2>
          </div>
          <div className="relative pb-[56.25%] h-0">
            {/* Animated capital city emoji */}
            <motion.div 
              className="absolute z-10"
              style={{ 
                top: '45%', 
                left: '50%',
                transform: 'translate(-50%, -50%)'
              }}
              animate={{ 
                y: [0, -10, 0],
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 1.5,
                ease: "easeInOut"
              }}
            >
              <div className="bg-white rounded-full p-1 shadow-lg">
                <span className="text-2xl">🏙️</span>
              </div>
              <div className="text-xs font-bold bg-white px-1 rounded mt-1 text-center shadow-sm">
                Roma
              </div>
            </motion.div>
            
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6155844.044911242!2d8.019483799999999!3d41.87194!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12d4fe82448dd203%3A0xe22cf55c24635e6f!2sItaly!5e0!3m2!1sen!2ses!4v1653130345678!5m2!1sen!2ses"
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
          <h2 className="text-2xl font-bold text-green-800 kids-text mb-4">Información básica</h2>
          <div className="grid grid-cols-2 gap-4 text-lg">
            <div>
              <h3 className="font-semibold text-green-700 kids-text">Capital</h3>
              <p className="text-gray-700 kids-text">Roma</p>
            </div>
            <div>
              <h3 className="font-semibold text-green-700 kids-text">Idioma</h3>
              <p className="text-gray-700 kids-text">Italiano</p>
            </div>
            <div>
              <h3 className="font-semibold text-green-700 kids-text">Población</h3>
              <p className="text-gray-700 kids-text">60.36 millones</p>
            </div>
            <div>
              <h3 className="font-semibold text-green-700 kids-text">Moneda</h3>
              <p className="text-gray-700 kids-text">Euro (€)</p>
            </div>
          </div>
        </div>

        {/* Fun facts section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-green-800 kids-text mb-4">¡Datos curiosos!</h2>
          <div className="space-y-4 text-lg text-gray-700">
            <p>🏛️ <strong>¡Italia tiene más sitios del Patrimonio Mundial que cualquier otro país!</strong> Con 58 lugares reconocidos por la UNESCO.</p>
            <p>🍕 <strong>¡La pizza Margherita fue creada en honor a la reina!</strong> Con los colores de la bandera italiana: rojo, blanco y verde.</p>
            <p>🌋 <strong>¡Italia tiene tres volcanes activos!</strong> El Etna, el Vesubio y el Estrómboli.</p>
            <p>💧 <strong>¡Roma tiene más de 2.500 fuentes públicas!</strong> Y el agua es completamente potable y gratuita.</p>
          </div>
        </div>

        {/* Landmarks section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-green-800 kids-text mb-4">Lugares famosos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg text-gray-700">
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-bold text-green-800">🏛️ Coliseo</h3>
              <p>Anfiteatro romano donde luchaban los gladiadores.</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-bold text-green-800">🗼 Torre de Pisa</h3>
              <p>Famosa torre inclinada de mármol blanco.</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-bold text-green-800">🚣 Venecia</h3>
              <p>Ciudad de canales construida sobre más de 100 islas.</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-bold text-green-800">⛪ Capilla Sixtina</h3>
              <p>Famosa por los frescos de Miguel Ángel en el Vaticano.</p>
            </div>
          </div>
        </div>

        {/* Cultural section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-green-800 kids-text mb-4">Cultura y tradiciones</h2>
          <div className="space-y-4 text-lg text-gray-700">
            <p>🍝 <strong>Pasta:</strong> Italia es la cuna de la pasta, con más de 300 formas diferentes.</p>
            <p>🎭 <strong>Ópera:</strong> Arte nacido en Italia, con famosos teatros como La Scala de Milán.</p>
            <p>🏛️ <strong>Renacimiento:</strong> Período de gran florecimiento artístico y cultural.</p>
            <p>☕ <strong>Café:</strong> Los italianos toman espresso de pie y nunca cappuccino después de las 11 AM.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItaliaPage;
