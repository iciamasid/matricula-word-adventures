
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const BrasilPage = () => {
  const handleNavigation = () => {
    sessionStorage.setItem('navigatingBack', 'true');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-green-100 p-4">
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
          <div className="text-8xl mb-4">🇧🇷</div>
          <h1 className="text-4xl font-bold text-green-800 kids-text mb-2">Brasil</h1>
          <p className="text-xl text-green-700 kids-text">¡Bienvenido a Brasil!</p>
        </div>

        {/* Country image */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
          <motion.img 
            src="/lovable-uploads/Brasil.jpg" 
            alt="Cristo Redentor en Río de Janeiro"
            className="w-full h-64 object-cover"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1 }}
          />
        </div>

        {/* Country map location */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
          <div className="p-4 bg-yellow-50">
            <h2 className="text-2xl font-bold text-green-800 kids-text mb-2 flex items-center">
              <MapPin className="w-6 h-6 mr-2 text-green-700" /> Ubicación
            </h2>
          </div>
          <div className="relative pb-[56.25%] h-0">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31868887.306779444!2d-81.09828173765624!3d-15.798267039500006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9c59c7ebcc28cf%3A0x295a1506f2293e63!2sBrazil!5e0!3m2!1sen!2ses!4v1653131234567!5m2!1sen!2ses"
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
              <p className="text-gray-700 kids-text">Brasilia</p>
            </div>
            <div>
              <h3 className="font-semibold text-green-700 kids-text">Idioma</h3>
              <p className="text-gray-700 kids-text">Portugués</p>
            </div>
            <div>
              <h3 className="font-semibold text-green-700 kids-text">Población</h3>
              <p className="text-gray-700 kids-text">212.6 millones</p>
            </div>
            <div>
              <h3 className="font-semibold text-green-700 kids-text">Moneda</h3>
              <p className="text-gray-700 kids-text">Real brasileño (R$)</p>
            </div>
          </div>
        </div>

        {/* Fun facts section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-green-800 kids-text mb-4">¡Datos curiosos!</h2>
          <div className="space-y-4 text-lg text-gray-700">
            <p>🌍 <strong>¡Brasil es el quinto país más grande del mundo!</strong> Por tamaño y población.</p>
            <p>🌊 <strong>¡El Amazonas pasa por Brasil!</strong> Es el río más caudaloso del mundo y tiene más agua que cualquier otro.</p>
            <p>🎭 <strong>¡El Carnaval de Río es la fiesta más grande del mundo!</strong> Atrae millones de visitantes cada año.</p>
            <p>⚽ <strong>¡Brasil ha ganado 5 Copas Mundiales de fútbol!</strong> Más que cualquier otro país del mundo.</p>
          </div>
        </div>

        {/* Landmarks section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-green-800 kids-text mb-4">Lugares famosos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg text-gray-700">
            <div className="p-4 bg-yellow-50 rounded-lg">
              <h3 className="font-bold text-green-800">✝️ Cristo Redentor</h3>
              <p>Estatua gigante de 38 metros en la cima del monte Corcovado.</p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg">
              <h3 className="font-bold text-green-800">🍞 Pan de Azúcar</h3>
              <p>Montaña con teleférico que ofrece vistas espectaculares de Río.</p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg">
              <h3 className="font-bold text-green-800">🌊 Cataratas del Iguazú</h3>
              <p>275 cascadas impresionantes en la frontera con Argentina.</p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg">
              <h3 className="font-bold text-green-800">🌳 Amazonía</h3>
              <p>El bosque tropical más grande del mundo, pulmón del planeta.</p>
            </div>
          </div>
        </div>

        {/* Cultural section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-green-800 kids-text mb-4">Cultura y tradiciones</h2>
          <div className="space-y-4 text-lg text-gray-700">
            <p>🥳 <strong>Carnaval:</strong> Desfiles con samba, disfraces coloridos y música durante días.</p>
            <p>🏖️ <strong>Playas:</strong> Copacabana e Ipanema son las playas más famosas del mundo.</p>
            <p>🥊 <strong>Capoeira:</strong> Arte marcial que combina danza, acrobacia y música.</p>
            <p>☕ <strong>Café:</strong> Brasil es el mayor productor de café del mundo.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrasilPage;
