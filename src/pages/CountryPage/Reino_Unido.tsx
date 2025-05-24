import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const Reino_Unido = () => {
  const navigate = useNavigate();
  const [returnGame, setReturnGame] = useState('/draw-game');

  useEffect(() => {
    const navigatingBack = sessionStorage.getItem('navigatingBack');
    if (navigatingBack === 'motorcycle-game') {
      setReturnGame('/motorcycle-game');
    } else if (navigatingBack === 'car-game') {
      setReturnGame('/draw-game');
    } else {
      // Default based on current URL or referrer
      const referrer = document.referrer;
      if (referrer.includes('motorcycle-game')) {
        setReturnGame('/motorcycle-game');
      } else {
        setReturnGame('/draw-game');
      }
    }
  }, []);

  const handleNavigation = () => {
    const gameState = sessionStorage.getItem('gameStateBeforeCountry');
    if (gameState) {
      const parsedState = JSON.parse(gameState);
      console.log('Restoring game state from Reino Unido:', parsedState);
      
      sessionStorage.setItem('restoreGameState', JSON.stringify(parsedState));
      sessionStorage.removeItem('gameStateBeforeCountry');
    }
    
    sessionStorage.removeItem('navigatingBack');
    navigate(returnGame);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-red-50 p-4">
      <div className="max-w-4xl mx-auto">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleNavigation}
          className="mb-4 bg-blue-700/90 hover:bg-blue-800 text-white border-blue-600"
        >
          <ArrowLeft className="w-4 h-4 mr-1" /> Volver al juego
        </Button>

        {/* Header with flag and country name */}
        <div className="text-center mb-8">
          <div className="text-8xl mb-4">🇬🇧</div>
          <h1 className="text-4xl font-bold text-blue-800 kids-text mb-2">Reino Unido</h1>
          <p className="text-xl text-blue-700 kids-text">¡Bienvenido al Reino Unido!</p>
        </div>

        {/* Country image */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
          <motion.img 
            src="/lovable-uploads/Reino_Unido.jpg" 
            alt="Big Ben, Londres"
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
                top: '37%', 
                left: '55%',
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
                Londres
              </div>
            </motion.div>
            
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9552022.351081252!2d-9.456013203891186!3d54.234056791738224!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x25a3b1142c791a9%3A0xc4f8a0433288257a!2sUnited%20Kingdom!5e0!3m2!1sen!2ses!4v1653129429407!5m2!1sen!2ses"
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
              <p className="text-gray-700 kids-text">Londres</p>
            </div>
            <div>
              <h3 className="font-semibold text-blue-700 kids-text">Idioma</h3>
              <p className="text-gray-700 kids-text">Inglés</p>
            </div>
            <div>
              <h3 className="font-semibold text-blue-700 kids-text">Población</h3>
              <p className="text-gray-700 kids-text">67.5 millones</p>
            </div>
            <div>
              <h3 className="font-semibold text-blue-700 kids-text">Moneda</h3>
              <p className="text-gray-700 kids-text">Libra esterlina (£)</p>
            </div>
          </div>
        </div>

        {/* Fun facts section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-blue-800 kids-text mb-4">¡Datos curiosos!</h2>
          <div className="space-y-4 text-lg text-gray-700">
            <p>🏰 <strong>¡El Big Ben no es realmente una campana!</strong> Big Ben es el nombre de la campana más grande dentro de la Torre del Reloj en Londres.</p>
            <p>👑 <strong>¡La Reina tiene dos cumpleaños!</strong> Celebra su cumpleaños real y uno oficial en diferentes fechas del año.</p>
            <p>🚌 <strong>¡Los autobuses rojos de dos pisos son famosos en todo el mundo!</strong> Se llaman "double-deckers" y son un símbolo de Londres.</p>
            <p>🌧️ <strong>¡No llueve tanto como la gente piensa!</strong> Aunque es famoso por la lluvia, Londres recibe menos precipitaciones que París o Roma.</p>
          </div>
        </div>

        {/* Landmarks section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-blue-800 kids-text mb-4">Lugares famosos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg text-gray-700">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-bold text-blue-800">🏰 Torre de Londres</h3>
              <p>Una fortaleza histórica donde se guardan las Joyas de la Corona.</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-bold text-blue-800">🌉 Puente de la Torre</h3>
              <p>Un puente icónico que se puede abrir para dejar pasar barcos grandes.</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-bold text-blue-800">🎡 London Eye</h3>
              <p>Una noria gigante desde donde puedes ver toda la ciudad de Londres.</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-bold text-blue-800">🏛️ Palacio de Buckingham</h3>
              <p>La residencia oficial de la familia real británica en Londres.</p>
            </div>
          </div>
        </div>

        {/* Cultural section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-blue-800 kids-text mb-4">Cultura y tradiciones</h2>
          <div className="space-y-4 text-lg text-gray-700">
            <p>☕ <strong>La hora del té:</strong> Los británicos toman té por la tarde con galletas y pasteles.</p>
            <p>⚽ <strong>Fútbol:</strong> Inglaterra es la cuna del fútbol moderno y tiene equipos muy famosos.</p>
            <p>🎭 <strong>Teatro:</strong> Londres tiene teatros increíbles donde se representan musicales famosos.</p>
            <p>🏴󠁧󠁢󠁳󠁣󠁴󠁿 <strong>Escocia, Gales e Irlanda del Norte:</strong> El Reino Unido está formado por cuatro países diferentes.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reino_Unido;
