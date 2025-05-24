
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const FranciaPage = () => {
  // Ensure page starts from top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleNavigation = () => {
    sessionStorage.setItem('navigatingBack', 'true');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <Link to="/">
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
            src="/lovable-uploads/Francia.jpg" 
            alt="Torre Eiffel, París"
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
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10852046.395847628!2d-1.1767985!3d46.603354!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e1f06e2b70f%3A0x40b82c3688c9460!2sFrance!5e0!3m2!1sen!2ses!4v1653130234567!5m2!1sen!2ses"
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
              <p className="text-gray-700 kids-text">67.8 millones</p>
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
            <p>🗼 <strong>¡La Torre Eiffel fue construida para la Exposición Universal de 1889!</strong> Y se suponía que era temporal.</p>
            <p>🧀 <strong>¡Francia produce más de 400 tipos de queso!</strong> Uno diferente para cada día del año.</p>
            <p>🥖 <strong>¡El croissant no es originalmente francés!</strong> Viene de Austria, pero Francia lo hizo famoso.</p>
            <p>🎨 <strong>¡El Museo del Louvre es el más visitado del mundo!</strong> Con la famosa Mona Lisa de Leonardo da Vinci.</p>
          </div>
        </div>

        {/* Landmarks section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-blue-800 kids-text mb-4">Lugares famosos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg text-gray-700">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-bold text-blue-800">🗼 Torre Eiffel</h3>
              <p>Símbolo de París y una de las estructuras más reconocidas del mundo.</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-bold text-blue-800">🏛️ Museo del Louvre</h3>
              <p>El museo más grande del mundo con obras como la Mona Lisa.</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-bold text-blue-800">🏰 Palacio de Versalles</h3>
              <p>Magnífico palacio real con jardines espectaculares.</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-bold text-blue-800">🌊 Costa Azul</h3>
              <p>Hermosas playas y ciudades como Niza y Cannes.</p>
            </div>
          </div>
        </div>

        {/* Cultural section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-blue-800 kids-text mb-4">Cultura y tradiciones</h2>
          <div className="space-y-4 text-lg text-gray-700">
            <p>🍷 <strong>Gastronomía:</strong> Famosa por sus vinos, quesos, croissants y alta cocina francesa.</p>
            <p>🎨 <strong>Arte:</strong> Cuna de muchos movimientos artísticos como el impresionismo.</p>
            <p>👗 <strong>Moda:</strong> París es una de las capitales mundiales de la moda.</p>
            <p>🎭 <strong>Literatura:</strong> Grandes escritores como Víctor Hugo y Alexandre Dumas.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FranciaPage;
