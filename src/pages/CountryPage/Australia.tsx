import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const AustraliaPage = () => {
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
          <div className="text-8xl mb-4">🇦🇺</div>
          <h1 className="text-4xl font-bold text-blue-800 kids-text mb-2">Australia</h1>
          <p className="text-xl text-blue-700 kids-text">¡Bienvenido a Australia!</p>
        </div>

        {/* Country image */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
          <motion.img 
            src="/lovable-uploads/b1c2b1e5-8e65-49d3-b857-7b1e3a96c4f2.png" 
            alt="Paisaje de Australia"
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
                top: '75%', 
                left: '75%',
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
                Canberra
              </div>
            </motion.div>
            
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26507455.67616069!2d117.20956039726562!3d-25.274398000000014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2b2bfd076787c5df%3A0x538267a1955b1352!2sAustralia!5e0!3m2!1sen!2ses!4v1653130812345!5m2!1sen!2ses"
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
              <p className="text-gray-700 kids-text">Canberra</p>
            </div>
            <div>
              <h3 className="font-semibold text-blue-700 kids-text">Idioma</h3>
              <p className="text-gray-700 kids-text">Inglés</p>
            </div>
            <div>
              <h3 className="font-semibold text-blue-700 kids-text">Población</h3>
              <p className="text-gray-700 kids-text">25.69 millones</p>
            </div>
            <div>
              <h3 className="font-semibold text-blue-700 kids-text">Moneda</h3>
              <p className="text-gray-700 kids-text">Dólar australiano ($)</p>
            </div>
          </div>
        </div>

        {/* Fun facts section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-blue-800 kids-text mb-4">¡Datos curiosos!</h2>
          <div className="space-y-4 text-lg text-gray-700">
            <p>🦘 <strong>¡Australia es el único país que también es un continente!</strong> Y el sexto país más grande del mundo.</p>
            <p>🐨 <strong>¡Los koalas duermen 22 horas al día!</strong> Y solo se encuentran en Australia.</p>
            <p>🏖️ <strong>¡Tiene más de 10.000 playas!</strong> Podrías visitar una playa diferente cada día durante 27 años.</p>
            <p>🔥 <strong>¡El centro del país es un desierto enorme!</strong> Llamado el Outback, donde viven pocos habitantes.</p>
          </div>
        </div>

        {/* Landmarks section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-blue-800 kids-text mb-4">Lugares famosos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg text-gray-700">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-bold text-blue-800">🎭 Ópera de Sídney</h3>
              <p>Edificio icónico con forma de velas en el puerto de Sídney.</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-bold text-blue-800">🏔️ Uluru</h3>
              <p>Enorme roca sagrada en el centro del país, también llamada Ayers Rock.</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-bold text-blue-800">🐠 Gran Barrera de Coral</h3>
              <p>El sistema de arrecifes más grande del mundo, visible desde el espacio.</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-bold text-blue-800">🌉 Puente del Puerto</h3>
              <p>Famoso puente de acero en Sídney donde se puede escalar.</p>
            </div>
          </div>
        </div>

        {/* Cultural section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-blue-800 kids-text mb-4">Cultura y tradiciones</h2>
          <div className="space-y-4 text-lg text-gray-700">
            <p>🏏 <strong>Deportes:</strong> Cricket, rugby y fútbol australiano son muy populares.</p>
            <p>🔥 <strong>Barbacoa:</strong> Los australianos aman hacer barbacoas al aire libre.</p>
            <p>🎨 <strong>Arte aborigen:</strong> Los aborígenes han creado arte durante más de 60.000 años.</p>
            <p>🦘 <strong>Animales únicos:</strong> 80% de los animales de Australia no se encuentran en ningún otro lugar.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AustraliaPage;
