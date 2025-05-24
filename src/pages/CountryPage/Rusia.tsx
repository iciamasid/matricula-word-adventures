
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const RusiaPage = () => {
  const [returnGame, setReturnGame] = useState('/');

  useEffect(() => {
    // Check if coming from car game based on the referrer or localStorage
    const referrer = document.referrer;
    if (referrer.includes('motorcycle-game')) {
      setReturnGame('/motorcycle-game');
    } else {
      setReturnGame('/');
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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-red-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <Link to={returnGame}>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleNavigation}
            className="mb-4 bg-blue-700/90 hover:bg-blue-800 text-white border-blue-600"
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> Volver al juego
          </Button>
        </Link>

        {/* Header with flag and country name */}
        <div className="text-center mb-8">
          <div className="text-8xl mb-4">🇷🇺</div>
          <h1 className="text-4xl font-bold text-blue-800 kids-text mb-2">Rusia</h1>
          <p className="text-xl text-blue-700 kids-text">¡Bienvenido a Rusia!</p>
        </div>

        {/* Country image */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
          <motion.img 
            src="/lovable-uploads/13c721ae-3f14-415a-86bb-0228c47d8425.png" 
            alt="Paisaje de Rusia"
            className="w-full h-64 object-cover"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1 }}
          />
        </div>

        {/* Country map location */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
          <div className="p-4 bg-blue-50">
            <h2 className="text-2xl font-bold text-blue-800 kids-text mb-2 flex items-center">
              <MapPin className="w-6 h-6 mr-2 text-blue-700" /> Ubicación
            </h2>
          </div>
          <div className="relative pb-[56.25%] h-0">
            {/* Animated capital city emoji */}
            <motion.div 
              className="absolute z-10"
              style={{ 
                top: '55%', 
                left: '40%',
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
                Moscú
              </div>
            </motion.div>
            
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d71692604.53634263!2d37.6176!3d55.755826!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x453c569a896724fb%3A0x1409fdf86611f613!2sRussia!5e0!3m2!1sen!2ses!4v1653130456789!5m2!1sen!2ses"
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
          <h2 className="text-2xl font-bold text-blue-800 kids-text mb-4">Información básica</h2>
          <div className="grid grid-cols-2 gap-4 text-lg">
            <div>
              <h3 className="font-semibold text-blue-700 kids-text">Capital</h3>
              <p className="text-gray-700 kids-text">Moscú</p>
            </div>
            <div>
              <h3 className="font-semibold text-blue-700 kids-text">Idioma</h3>
              <p className="text-gray-700 kids-text">Ruso</p>
            </div>
            <div>
              <h3 className="font-semibold text-blue-700 kids-text">Población</h3>
              <p className="text-gray-700 kids-text">146.17 millones</p>
            </div>
            <div>
              <h3 className="font-semibold text-blue-700 kids-text">Moneda</h3>
              <p className="text-gray-700 kids-text">Rublo ruso (₽)</p>
            </div>
          </div>
        </div>

        {/* Fun facts section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-blue-800 kids-text mb-4">¡Datos curiosos!</h2>
          <div className="space-y-4 text-lg text-gray-700">
            <p>🌍 <strong>¡Rusia es el país más grande del mundo!</strong> Cubre más de 17 millones de kilómetros cuadrados.</p>
            <p>🚂 <strong>¡El Transiberiano es el ferrocarril más largo del mundo!</strong> Conecta Moscú con Vladivostok en 9.289 kilómetros.</p>
            <p>🌨️ <strong>¡Siberia contiene el 20% del agua dulce del mundo!</strong> Principalmente en el lago Baikal.</p>
            <p>🚀 <strong>¡Rusia fue el primer país en enviar un humano al espacio!</strong> Yuri Gagarin en 1961.</p>
          </div>
        </div>

        {/* Landmarks section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-blue-800 kids-text mb-4">Lugares famosos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg text-gray-700">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-bold text-blue-800">🏰 Plaza Roja</h3>
              <p>Corazón de Moscú con el Kremlin y la catedral de San Basilio.</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-bold text-blue-800">🏛️ Hermitage</h3>
              <p>Uno de los museos más grandes del mundo en San Petersburgo.</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-bold text-blue-800">🌊 Lago Baikal</h3>
              <p>El lago más profundo y antiguo del mundo en Siberia.</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-bold text-blue-800">🎭 Teatro Bolshói</h3>
              <p>Famoso teatro de ópera y ballet en Moscú.</p>
            </div>
          </div>
        </div>

        {/* Cultural section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-blue-800 kids-text mb-4">Cultura y tradiciones</h2>
          <div className="space-y-4 text-lg text-gray-700">
            <p>🎭 <strong>Ballet:</strong> Rusia es famosa por sus compañías de ballet como el Bolshói y el Mariinski.</p>
            <p>📚 <strong>Literatura:</strong> Grandes escritores como Tolstói, Dostoyevski y Chéjov.</p>
            <p>🪆 <strong>Matrioshkas:</strong> Muñecas rusas de madera que se abren para revelar muñecas más pequeñas.</p>
            <p>🍵 <strong>Té:</strong> Tradición del samovar para preparar y servir té en reuniones familiares.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RusiaPage;
