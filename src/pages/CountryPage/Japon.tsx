
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const JaponPage = () => {
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
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white p-4">
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
          <div className="text-8xl mb-4">🇯🇵</div>
          <h1 className="text-4xl font-bold text-red-800 kids-text mb-2">Japón</h1>
          <p className="text-xl text-red-700 kids-text">¡Bienvenido a Japón!</p>
        </div>

        {/* Country image */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
          <motion.img 
            src="/lovable-uploads/54b230f6-8a76-4e9a-ae4c-5fa2f7087600.png" 
            alt="Paisaje de Japón"
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
                top: '40%', 
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
                Tokio
              </div>
            </motion.div>
            
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13155502.855759792!2d133.681556!3d36.204824!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x34674e0fd77f192f%3A0xf54275d47c665244!2sJapan!5e0!3m2!1sen!2ses!4v1653130567890!5m2!1sen!2ses"
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
              <p className="text-gray-700 kids-text">Tokio</p>
            </div>
            <div>
              <h3 className="font-semibold text-red-700 kids-text">Idioma</h3>
              <p className="text-gray-700 kids-text">Japonés</p>
            </div>
            <div>
              <h3 className="font-semibold text-red-700 kids-text">Población</h3>
              <p className="text-gray-700 kids-text">125.8 millones</p>
            </div>
            <div>
              <h3 className="font-semibold text-red-700 kids-text">Moneda</h3>
              <p className="text-gray-700 kids-text">Yen japonés (¥)</p>
            </div>
          </div>
        </div>

        {/* Fun facts section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-red-800 kids-text mb-4">¡Datos curiosos!</h2>
          <div className="space-y-4 text-lg text-gray-700">
            <p>🏔️ <strong>¡Japón tiene más de 6.800 islas!</strong> Aunque solo 430 están habitadas.</p>
            <p>🚅 <strong>¡Los trenes bala pueden alcanzar 320 km/h!</strong> Y son famosos por su puntualidad extrema.</p>
            <p>🌸 <strong>¡Los cerezos en flor (sakura) florecen solo 1-2 semanas!</strong> Y hay festivales para celebrarlo.</p>
            <p>🎮 <strong>¡Japón es la cuna de muchos videojuegos famosos!</strong> Como Mario, Pokémon y Zelda.</p>
          </div>
        </div>

        {/* Landmarks section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-red-800 kids-text mb-4">Lugares famosos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg text-gray-700">
            <div className="p-4 bg-red-50 rounded-lg">
              <h3 className="font-bold text-red-800">🗻 Monte Fuji</h3>
              <p>Volcán sagrado y símbolo de Japón con 3.776 metros.</p>
            </div>
            <div className="p-4 bg-red-50 rounded-lg">
              <h3 className="font-bold text-red-800">⛩️ Fushimi Inari</h3>
              <p>Miles de torii rojos que forman túneles en Kioto.</p>
            </div>
            <div className="p-4 bg-red-50 rounded-lg">
              <h3 className="font-bold text-red-800">🏯 Castillo de Himeji</h3>
              <p>Castillo samurái con arquitectura tradicional japonesa.</p>
            </div>
            <div className="p-4 bg-red-50 rounded-lg">
              <h3 className="font-bold text-red-800">🌸 Parque Ueno</h3>
              <p>Famoso por sus cerezos en flor y museos en Tokio.</p>
            </div>
          </div>
        </div>

        {/* Cultural section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-red-800 kids-text mb-4">Cultura y tradiciones</h2>
          <div className="space-y-4 text-lg text-gray-700">
            <p>🍣 <strong>Sushi:</strong> Arte culinario que requiere años de entrenamiento para dominarlo.</p>
            <p>🥋 <strong>Artes marciales:</strong> Karate, judo y kendo son originarios de Japón.</p>
            <p>🎭 <strong>Teatro Kabuki:</strong> Forma tradicional de teatro con maquillaje y vestuario elaborados.</p>
            <p>🎌 <strong>Respeto:</strong> La reverencia es una forma importante de saludo y muestra de respeto.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JaponPage;
