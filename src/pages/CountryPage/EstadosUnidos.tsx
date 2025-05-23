
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const EstadosUnidosPage = () => {
  const handleNavigation = () => {
    sessionStorage.setItem('navigatingBack', 'true');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-red-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <Link to="/motorcycle-game">
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
          <div className="text-8xl mb-4">🇺🇸</div>
          <h1 className="text-4xl font-bold text-blue-800 kids-text mb-2">Estados Unidos</h1>
          <p className="text-xl text-blue-700 kids-text">¡Bienvenido a Estados Unidos!</p>
        </div>

        {/* Country image */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
          <motion.img 
            src="/lovable-uploads/21e71de1-c8e4-4bbb-95d6-67ce7ae41316.png" 
            alt="Paisaje de Estados Unidos"
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
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25265652.97663289!2d-119.3103448!3d44.58537949!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54eab584e432360b%3A0x1c3bb99243deb742!2sUnited%20States!5e0!3m2!1sen!2ses!4v1653130678901!5m2!1sen!2ses"
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
              <p className="text-gray-700 kids-text">Washington D.C.</p>
            </div>
            <div>
              <h3 className="font-semibold text-blue-700 kids-text">Idioma</h3>
              <p className="text-gray-700 kids-text">Inglés</p>
            </div>
            <div>
              <h3 className="font-semibold text-blue-700 kids-text">Población</h3>
              <p className="text-gray-700 kids-text">331.9 millones</p>
            </div>
            <div>
              <h3 className="font-semibold text-blue-700 kids-text">Moneda</h3>
              <p className="text-gray-700 kids-text">Dólar estadounidense ($)</p>
            </div>
          </div>
        </div>

        {/* Fun facts section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-blue-800 kids-text mb-4">¡Datos curiosos!</h2>
          <div className="space-y-4 text-lg text-gray-700">
            <p>🗽 <strong>¡La Estatua de la Libertad fue un regalo de Francia!</strong> Se inauguró en 1886 como símbolo de libertad.</p>
            <p>🏔️ <strong>¡Estados Unidos tiene todos los climas del mundo!</strong> Desde desiertos hasta glaciares.</p>
            <p>🎬 <strong>¡Hollywood es la capital mundial del cine!</strong> Donde se producen las películas más famosas.</p>
            <p>🚀 <strong>¡Fueron los primeros en llegar a la Luna!</strong> Neil Armstrong pisó la Luna en 1969.</p>
          </div>
        </div>

        {/* Landmarks section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-blue-800 kids-text mb-4">Lugares famosos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg text-gray-700">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-bold text-blue-800">🗽 Estatua de la Libertad</h3>
              <p>Símbolo de libertad y democracia en Nueva York.</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-bold text-blue-800">🏔️ Gran Cañón</h3>
              <p>Formación rocosa espectacular en Arizona de 446 km de largo.</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-bold text-blue-800">🏛️ Casa Blanca</h3>
              <p>Residencia oficial del Presidente en Washington D.C.</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-bold text-blue-800">🌉 Golden Gate</h3>
              <p>Puente icónico de color rojo en San Francisco.</p>
            </div>
          </div>
        </div>

        {/* Cultural section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-blue-800 kids-text mb-4">Cultura y tradiciones</h2>
          <div className="space-y-4 text-lg text-gray-700">
            <p>🍔 <strong>Comida rápida:</strong> Hamburguesas, hot dogs y pizza son comidas típicas.</p>
            <p>🏈 <strong>Deportes:</strong> Fútbol americano, baloncesto y béisbol son muy populares.</p>
            <p>🎵 <strong>Música:</strong> Cuna del jazz, blues, rock and roll y hip hop.</p>
            <p>🎆 <strong>4 de Julio:</strong> Día de la Independencia con fuegos artificiales y barbacoas.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EstadosUnidosPage;
