
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const FranciaPage = () => {
  const [returnGame, setReturnGame] = useState('/motorcycle-game');

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
      setReturnGame('/draw-game');
    } else if (navigatingBack === 'motorcycle-game') {
      setReturnGame('/motorcycle-game');
    }
  }, []);

  const handleNavigation = () => {
    // Store which game we're returning to
    if (returnGame === '/draw-game') {
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
          <div className="text-8xl mb-4">🇫🇷</div>
          <h1 className="text-4xl font-bold text-blue-800 kids-text mb-2">Francia</h1>
          <p className="text-xl text-blue-700 kids-text">¡Bienvenido a Francia!</p>
        </div>

        {/* Country image */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
          <motion.img 
            src="/lovable-uploads/276d9054-061e-45b9-9517-d7f0d8218579.png" 
            alt="Paisaje de Francia"
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
                top: '40%', 
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
                París
              </div>
            </motion.div>
            
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10886164.085278615!2d-2.6882740000000003!3d46.603354!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd54a02933785731%3A0x6bfd3f96c747d9f7!2sFrance!5e0!3m2!1sen!2ses!4v1653130234567!5m2!1sen!2ses"
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
              <p className="text-gray-700 kids-text">París</p>
            </div>
            <div>
              <h3 className="font-semibold text-blue-700 kids-text">Idioma</h3>
              <p className="text-gray-700 kids-text">Francés</p>
            </div>
            <div>
              <h3 className="font-semibold text-blue-700 kids-text">Población</h3>
              <p className="text-gray-700 kids-text">67.39 millones</p>
            </div>
            <div>
              <h3 className="font-semibold text-blue-700 kids-text">Moneda</h3>
              <p className="text-gray-700 kids-text">Euro (€)</p>
            </div>
          </div>
        </div>

        {/* Fun facts section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-blue-800 kids-text mb-4">¡Datos curiosos!</h2>
          <div className="space-y-4 text-lg text-gray-700">
            <p>🗼 <strong>¡La Torre Eiffel fue construida en solo 2 años!</strong> Entre 1887 y 1889 para la Exposición Universal.</p>
            <p>🧀 <strong>¡Francia produce más de 400 tipos de queso!</strong> Charles de Gaulle dijo que era imposible gobernar un país con tantos quesos.</p>
            <p>🥐 <strong>¡El croissant no es originalmente francés!</strong> Viene de Austria, pero Francia lo perfeccionó.</p>
            <p>🎨 <strong>¡El Louvre es el museo más visitado del mundo!</strong> Con más de 10 millones de visitantes al año.</p>
          </div>
        </div>

        {/* Landmarks section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-blue-800 kids-text mb-4">Lugares famosos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg text-gray-700">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-bold text-blue-800">🗼 Torre Eiffel</h3>
              <p>Símbolo de París y Francia, con 324 metros de altura.</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-bold text-blue-800">🎨 Museo del Louvre</h3>
              <p>Hogar de la Mona Lisa y miles de obras de arte.</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-bold text-blue-800">⛪ Notre-Dame</h3>
              <p>Catedral gótica famosa por su arquitectura y historia.</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-bold text-blue-800">🏰 Versalles</h3>
              <p>Lujoso palacio real con impresionantes jardines.</p>
            </div>
          </div>
        </div>

        {/* Cultural section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-blue-800 kids-text mb-4">Cultura y tradiciones</h2>
          <div className="space-y-4 text-lg text-gray-700">
            <p>🍷 <strong>Gastronomía:</strong> Francia es famosa por sus vinos, quesos y alta cocina.</p>
            <p>🎭 <strong>Arte y cultura:</strong> Cuna del impresionismo y muchos movimientos artísticos.</p>
            <p>🚲 <strong>Tour de Francia:</strong> La carrera ciclista más famosa del mundo.</p>
            <p>💋 <strong>Saludos:</strong> Los franceses se saludan con besos en las mejillas.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FranciaPage;
