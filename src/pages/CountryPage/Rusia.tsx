import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useCountryNavigation } from '@/hooks/useCountryNavigation';

const RusiaPage = () => {
  const { handleReturnToGame } = useCountryNavigation('Rusia');

  // Ensure page starts from top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-200 to-white p-4">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleReturnToGame}
          className="mb-4 bg-red-700/90 hover:bg-red-800 text-white border-red-600"
        >
          <ArrowLeft className="w-4 h-4 mr-1" /> Volver al juego
        </Button>

        {/* Header with flag and country name */}
        <div className="text-center mb-8">
          <div className="text-8xl mb-4">🇷🇺</div>
          <h1 className="text-4xl font-bold text-red-800 kids-text mb-2">Rusia</h1>
          <p className="text-xl text-red-700 kids-text">¡Bienvenido a Rusia!</p>
        </div>

        {/* Country image */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
          <motion.img 
            src="/lovable-uploads/Rusia.jpg" 
            alt="Catedral de San Basilio, Moscú"
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
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14848849.493996797!2d37.61766300000001!3d61.52401!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4696cf9159e5438b%3A0x1c64514fa0529c96!2sRussia!5e0!3m2!1sen!2ses!4v1653129907448!5m2!1sen!2ses"
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
              <p className="text-gray-700 kids-text">Moscú</p>
            </div>
            <div>
              <h3 className="font-semibold text-red-700 kids-text">Idioma</h3>
              <p className="text-gray-700 kids-text">Ruso</p>
            </div>
            <div>
              <h3 className="font-semibold text-red-700 kids-text">Población</h3>
              <p className="text-gray-700 kids-text">144.4 millones</p>
            </div>
            <div>
              <h3 className="font-semibold text-red-700 kids-text">Moneda</h3>
              <p className="text-gray-700 kids-text">Rublo ruso (₽)</p>
            </div>
          </div>
        </div>

        {/* Fun facts section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-red-800 kids-text mb-4">¡Datos curiosos!</h2>
          <div className="space-y-4 text-lg text-gray-700">
            <p>❄️ <strong>¡Rusia es el país más grande del mundo!</strong> Cubre más de una octava parte de la superficie terrestre.</p>
            <p>🐻 <strong>¡El oso es un símbolo de Rusia!</strong> Aunque no es el animal nacional oficial.</p>
            <p>🚂 <strong>¡El ferrocarril Transiberiano es el más largo del mundo!</strong> Conecta Moscú con Vladivostok.</p>
            <p>🎭 <strong>¡El ballet ruso es famoso en todo el mundo!</strong> El Bolshói es uno de los teatros más importantes.</p>
          </div>
        </div>

        {/* Landmarks section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-red-800 kids-text mb-4">Lugares famosos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg text-gray-700">
            <div className="p-4 bg-red-50 rounded-lg">
              <h3 className="font-bold text-red-800">🏛️ Plaza Roja</h3>
              <p>La plaza principal de Moscú, rodeada de edificios históricos.</p>
            </div>
            <div className="p-4 bg-red-50 rounded-lg">
              <h3 className="font-bold text-red-800">⛪ Catedral de San Basilio</h3>
              <p>Famosa por sus coloridas cúpulas en forma de bulbo.</p>
            </div>
            <div className="p-4 bg-red-50 rounded-lg">
              <h3 className="font-bold text-red-800">🏰 Kremlin de Moscú</h3>
              <p>Una antigua fortaleza que alberga palacios y catedrales.</p>
            </div>
            <div className="p-4 bg-red-50 rounded-lg">
              <h3 className="font-bold text-red-800">❄️ Lago Baikal</h3>
              <p>El lago más profundo del mundo y una reserva natural única.</p>
            </div>
          </div>
        </div>

        {/* Cultural section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-red-800 kids-text mb-4">Cultura y tradiciones</h2>
          <div className="space-y-4 text-lg text-gray-700">
            <p>🎶 <strong>Música:</strong> Compositores famosos como Tchaikovsky y Rachmaninoff.</p>
            <p>🎨 <strong>Arte:</strong> Iconos religiosos y pinturas realistas.</p>
            <p>🎭 <strong>Teatro:</strong> El Bolshói y el Mariinsky son teatros de renombre mundial.</p>
            <p>🪆 <strong>Matrioskas:</strong> Muñecas de madera pintadas que se encajan una dentro de otra.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RusiaPage;
