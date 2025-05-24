import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const EspanaPage = () => {
  // Ensure page starts from top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleNavigation = () => {
    sessionStorage.setItem('navigatingBack', 'true');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-yellow-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <Link to="/motorcycle-game">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleNavigation}
            className="mb-4 bg-yellow-700/90 hover:bg-yellow-800 text-white border-yellow-600"
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> Volver al juego
          </Button>
        </Link>

        {/* Header with flag and country name */}
        <div className="text-center mb-8">
          <div className="text-8xl mb-4">🇪🇸</div>
          <h1 className="text-4xl font-bold text-yellow-800 kids-text mb-2">España</h1>
          <p className="text-xl text-yellow-700 kids-text">¡Bienvenido a España!</p>
        </div>

        {/* Country image */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
          <motion.img 
            src="/lovable-uploads/995183a5-24a9-4c91-8660-a0c9312a6a9d.png" 
            alt="Plaza de España, Sevilla"
            className="w-full h-64 object-cover"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1 }}
          />
        </div>

        {/* Country map location */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
          <div className="p-4 bg-yellow-50">
            <h2 className="text-2xl font-bold text-yellow-800 kids-text mb-2 flex items-center">
              <MapPin className="w-6 h-6 mr-2 text-yellow-700" /> Ubicación
            </h2>
          </div>
          <div className="relative pb-[56.25%] h-0">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d16412148.40499972!2d-9.189583294454366!3d40.44895657144492!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd2cb28b4c4c53a3%3A0x2936b642b5d2a259!2sSpain!5e0!3m2!1sen!2ses!4v1653129484229!5m2!1sen!2ses"
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
          <h2 className="text-2xl font-bold text-yellow-800 kids-text mb-4">Información básica</h2>
          <div className="grid grid-cols-2 gap-4 text-lg">
            <div>
              <h3 className="font-semibold text-yellow-700 kids-text">Capital</h3>
              <p className="text-gray-700 kids-text">Madrid</p>
            </div>
            <div>
              <h3 className="font-semibold text-yellow-700 kids-text">Idioma</h3>
              <p className="text-gray-700 kids-text">Español</p>
            </div>
            <div>
              <h3 className="font-semibold text-yellow-700 kids-text">Población</h3>
              <p className="text-gray-700 kids-text">47.35 millones</p>
            </div>
            <div>
              <h3 className="font-semibold text-yellow-700 kids-text">Moneda</h3>
              <p className="text-gray-700 kids-text">Euro (€)</p>
            </div>
          </div>
        </div>

        {/* Fun facts section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-yellow-800 kids-text mb-4">¡Datos curiosos!</h2>
          <div className="space-y-4 text-lg text-gray-700">
            <p>⚽ <strong>¡España es la casa del fútbol!</strong> El Real Madrid y el FC Barcelona son equipos muy famosos.</p>
            <p>💃 <strong>¡El flamenco es un baile español!</strong> Es muy apasionado y usa guitarras y castañuelas.</p>
            <p>🏰 <strong>¡Hay muchos castillos antiguos!</strong> Algunos tienen más de 1000 años.</p>
            <p>☀️ <strong>¡España tiene muchas horas de sol!</strong> Es un lugar perfecto para las vacaciones.</p>
          </div>
        </div>

        {/* Landmarks section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-yellow-800 kids-text mb-4">Lugares famosos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg text-gray-700">
            <div className="p-4 bg-yellow-50 rounded-lg">
              <h3 className="font-bold text-yellow-800">🏰 La Alhambra</h3>
              <p>Un palacio muy bonito en Granada con jardines y fuentes.</p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg">
              <h3 className="font-bold text-yellow-800"> Sagrada Familia</h3>
              <p>Una iglesia gigante en Barcelona diseñada por Gaudí.</p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg">
              <h3 className="font-bold text-yellow-800"> 🏞️ Parque Güell</h3>
              <p>Un parque mágico en Barcelona también diseñado por Gaudí.</p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg">
              <h3 className="font-bold text-yellow-800"> ☀️ Islas Canarias</h3>
              <p>Islas con playas y volcanes, ¡perfectas para visitar!</p>
            </div>
          </div>
        </div>

        {/* Cultural section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-yellow-800 kids-text mb-4">Cultura y tradiciones</h2>
          <div className="space-y-4 text-lg text-gray-700">
            <p>🥘 <strong>Comida:</strong> La paella es un plato de arroz con mariscos y carne.</p>
            <p>🐂 <strong>Toros:</strong> Las corridas de toros son una tradición antigua.</p>
            <p>🎉 <strong>Fiestas:</strong> Las Fallas en Valencia tienen fuegos artificiales y ninots.</p>
            <p>🎭 <strong>Carnaval:</strong> El Carnaval de Tenerife es muy famoso.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EspanaPage;
