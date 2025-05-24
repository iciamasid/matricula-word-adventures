import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const EspanaPage = () => {
  const [returnGame, setReturnGame] = useState('/');

  useEffect(() => {
    // Check sessionStorage first for the game type
    const navigatingBack = sessionStorage.getItem('navigatingBack');
    
    if (navigatingBack === 'motorcycle-game') {
      setReturnGame('/motorcycle-game');
    } else if (navigatingBack === 'car-game') {
      setReturnGame('/');
    } else {
      // Fallback: check referrer
      const referrer = document.referrer;
      if (referrer.includes('motorcycle-game')) {
        setReturnGame('/motorcycle-game');
      } else {
        setReturnGame('/');
      }
    }
  }, []);

  const handleNavigation = () => {
    // Clear the navigation flag when leaving
    sessionStorage.removeItem('navigatingBack');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-yellow-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <Link to={returnGame}>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleNavigation}
            className="mb-4 bg-red-700/90 hover:bg-red-800 text-white border-red-600"
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> Volver al juego
          </Button>
        </Link>

        {/* Header with flag and country name */}
        <div className="text-center mb-8">
          <div className="text-8xl mb-4">🇪🇸</div>
          <h1 className="text-4xl font-bold text-red-800 kids-text mb-2">España</h1>
          <p className="text-xl text-red-700 kids-text">¡Bienvenido a España!</p>
        </div>

        {/* Country image */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
          <motion.img 
            src="/lovable-uploads/bfca2fcf-0f6d-40a5-9a14-c24f46112d54.png" 
            alt="Plaza de la Puerta del Sol en Madrid con el símbolo del Oso y el Madroño"
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
                Madrid
              </div>
            </motion.div>
            
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6377585.065066203!2d-9.39288367658691!3d39.31428706791531!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xc42e3783261bc8b%3A0xa6ec2c940768a3ec!2sSpain!5e0!3m2!1sen!2ses!4v1653130123456!5m2!1sen!2ses"
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
              <p className="text-gray-700 kids-text">Madrid</p>
            </div>
            <div>
              <h3 className="font-semibold text-red-700 kids-text">Idioma</h3>
              <p className="text-gray-700 kids-text">Español</p>
            </div>
            <div>
              <h3 className="font-semibold text-red-700 kids-text">Población</h3>
              <p className="text-gray-700 kids-text">47.35 millones</p>
            </div>
            <div>
              <h3 className="font-semibold text-red-700 kids-text">Moneda</h3>
              <p className="text-gray-700 kids-text">Euro (€)</p>
            </div>
          </div>
        </div>

        {/* Fun facts section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-red-800 kids-text mb-4">¡Datos curiosos!</h2>
          <div className="space-y-4 text-lg text-gray-700">
            <p>🏰 <strong>¡España tiene más de 40 sitios Patrimonio de la Humanidad!</strong> Desde la Alhambra hasta el Camino de Santiago.</p>
            <p>🥘 <strong>¡La paella nació en Valencia!</strong> Y originalmente se hacía con pollo, conejo y verduras, no con mariscos.</p>
            <p>💃 <strong>¡El flamenco es Patrimonio Cultural Inmaterial!</strong> Este arte andaluz combina cante, baile y guitarra.</p>
            <p>🌞 <strong>¡España tiene más de 300 días de sol al año!</strong> Por eso es uno de los destinos turísticos favoritos del mundo.</p>
          </div>
        </div>

        {/* Landmarks section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-red-800 kids-text mb-4">Lugares famosos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg text-gray-700">
            <div className="p-4 bg-red-50 rounded-lg">
              <h3 className="font-bold text-red-800">🏰 La Alhambra</h3>
              <p>Palacio nazarí en Granada con jardines y arquitectura islámica.</p>
            </div>
            <div className="p-4 bg-red-50 rounded-lg">
              <h3 className="font-bold text-red-800">⛪ Sagrada Familia</h3>
              <p>Basílica de Gaudí en Barcelona, aún en construcción después de más de 100 años.</p>
            </div>
            <div className="p-4 bg-red-50 rounded-lg">
              <h3 className="font-bold text-red-800">🎨 Museo del Prado</h3>
              <p>Uno de los museos de arte más importantes del mundo en Madrid.</p>
            </div>
            <div className="p-4 bg-red-50 rounded-lg">
              <h3 className="font-bold text-red-800">🌊 Costa del Sol</h3>
              <p>Famosas playas mediterráneas en Andalucía con sol todo el año.</p>
            </div>
          </div>
        </div>

        {/* Cultural section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-red-800 kids-text mb-4">Cultura y tradiciones</h2>
          <div className="space-y-4 text-lg text-gray-700">
            <p>🍽️ <strong>Tapas:</strong> Pequeñas porciones de comida que se comparten entre amigos.</p>
            <p>🌙 <strong>Siesta:</strong> Descanso tradicional después del almuerzo durante las horas más calurosas.</p>
            <p>🎉 <strong>Fiestas:</strong> Cada región tiene sus propias celebraciones como San Fermín o La Tomatina.</p>
            <p>⚽ <strong>Fútbol:</strong> El Real Madrid y FC Barcelona son dos de los equipos más famosos del mundo.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EspanaPage;
