import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const Noruega = () => {
  // Ensure page starts from top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleNavigation = () => {
    sessionStorage.setItem('navigatingBack', 'true');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-200 to-white p-4">
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
          <div className="text-8xl mb-4">🇳🇴</div>
          <h1 className="text-4xl font-bold text-blue-800 kids-text mb-2">Noruega</h1>
          <p className="text-xl text-blue-700 kids-text">¡Bienvenido a Noruega!</p>
        </div>

        {/* Country image */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
          <motion.img 
            src="/lovable-uploads/3eeeb432-83e7-40d5-839a-f72b03d08da9.png" 
            alt="Catedral de San Basilio, Moscú"
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
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14513100.039617467!2d-0.2981319869615985!3d64.5739716462129!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x461268458f4de5bf%3A0xa1b03b9db864d02b!2sNorway!5e0!3m2!1sen!2ses!4v1653130012496!5m2!1sen!2ses"
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
              <p className="text-gray-700 kids-text">Oslo</p>
            </div>
            <div>
              <h3 className="font-semibold text-blue-700 kids-text">Idioma</h3>
              <p className="text-gray-700 kids-text">Noruego</p>
            </div>
            <div>
              <h3 className="font-semibold text-blue-700 kids-text">Población</h3>
              <p className="text-gray-700 kids-text">5.4 millones</p>
            </div>
            <div>
              <h3 className="font-semibold text-blue-700 kids-text">Moneda</h3>
              <p className="text-gray-700 kids-text">Corona noruega (kr)</p>
            </div>
          </div>
        </div>

        {/* Fun facts section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-blue-800 kids-text mb-4">¡Datos curiosos!</h2>
          <div className="space-y-4 text-lg text-gray-700">
            <p>🌌 <strong>¡Puedes ver la aurora boreal!</strong> En invierno, las luces del norte bailan en el cielo nocturno.</p>
            <p>☀️ <strong>¡El sol de medianoche!</strong> En verano, el sol no se pone durante semanas en el norte de Noruega.</p>
            <p>🛥️ <strong>¡Los vikingos eran noruegos!</strong> Fueron exploradores valientes que navegaron por todo el mundo.</p>
            <p>🐧 <strong>¡Los trolls vienen de aquí!</strong> Los cuentos de trolls nacieron en los bosques y montañas noruegas.</p>
          </div>
        </div>

        {/* Landmarks section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-blue-800 kids-text mb-4">Lugares famosos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg text-gray-700">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-bold text-blue-800">🏔️ Fiordos</h3>
              <p>Valles profundos llenos de agua azul rodeados de montañas gigantes.</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-bold text-blue-800">🏛️ Oslo</h3>
              <p>La capital, famosa por sus museos de barcos vikingos y arte moderno.</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-bold text-blue-800">🎿 Lillehammer</h3>
              <p>Ciudad de los Juegos Olímpicos de Invierno y perfecta para esquiar.</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-bold text-blue-800">🌊 Cabo Norte</h3>
              <p>Uno de los puntos más al norte de Europa continental.</p>
            </div>
          </div>
        </div>

        {/* Cultural section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-blue-800 kids-text mb-4">Cultura y tradiciones</h2>
          <div className="space-y-4 text-lg text-gray-700">
            <p>🎿 <strong>Deportes de invierno:</strong> El esquí se inventó aquí y es el deporte nacional.</p>
            <p>🐟 <strong>Pesca:</strong> El salmón y el bacalao son muy importantes en su cultura.</p>
            <p>🏠 <strong>Arquitectura:</strong> Las casas de madera tradicionales son muy coloridas.</p>
            <p>🎵 <strong>Música:</strong> Los coros y la música folk son muy populares.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Noruega;
