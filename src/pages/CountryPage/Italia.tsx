
import React, { useEffect } from 'react';
import { ArrowLeft, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useCountryNavigation } from '@/hooks/useCountryNavigation';

const ItaliaPage = () => {
  const { handleReturnToGame } = useCountryNavigation('Italia');

  // Ensure page starts from top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleReturnToGame}
          className="mb-4 bg-green-700/90 hover:bg-green-800 text-white border-green-600"
        >
          <ArrowLeft className="w-4 h-4 mr-1" /> Volver al juego
        </Button>

        {/* Header with flag and country name */}
        <div className="text-center mb-8">
          <div className="text-8xl mb-4">🇮🇹</div>
          <h1 className="text-4xl font-bold text-green-800 kids-text mb-2">Italia</h1>
          <p className="text-xl text-green-700 kids-text">¡Bienvenido a Italia!</p>
        </div>

        {/* Country image */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
          <motion.img 
            src="/lovable-uploads/Italia.jpg" 
            alt="Coliseo Romano, Roma"
            className="w-full h-64 object-cover"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1 }}
          />
        </div>

        {/* Country map location */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
          <div className="p-4 bg-green-50">
            <h2 className="text-2xl font-bold text-green-800 kids-text mb-2 flex items-center">
              <MapPin className="w-6 h-6 mr-2 text-green-700" /> Ubicación
            </h2>
          </div>
          <div className="relative pb-[56.25%] h-0">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4640444.749341478!2d6.697533363999947!3d42.63842696430941!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12d4fe82448dd203%3A0xba2855e5c0ca38ed!2sItaly!5e0!3m2!1sen!2ses!4v1653129881574!5m2!1sen!2ses"
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
              <p className="text-gray-700 kids-text">Roma</p>
            </div>
            <div>
              <h3 className="font-semibold text-green-700 kids-text">Idioma</h3>
              <p className="text-gray-700 kids-text">Italiano</p>
            </div>
            <div>
              <h3 className="font-semibold text-green-700 kids-text">Población</h3>
              <p className="text-gray-700 kids-text">59.55 millones</p>
            </div>
            <div>
              <h3 className="font-semibold text-green-700 kids-text">Moneda</h3>
              <p className="text-gray-700 kids-text">Euro (€)</p>
            </div>
          </div>
        </div>

        {/* Fun facts section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-green-800 kids-text mb-4">¡Datos curiosos!</h2>
          <div className="space-y-4 text-lg text-gray-700">
            <p>🍕 <strong>¡La pizza nació en Italia!</strong> En Nápoles, para ser exactos, y es famosa en todo el mundo.</p>
            <p>🇮🇹 <strong>¡Italia tiene más sitios Patrimonio de la Humanidad que ningún otro país!</strong> Con 58 lugares reconocidos por la UNESCO.</p>
            <p>⛲ <strong>¡Roma tiene más de 2.000 fuentes!</strong> La Fontana di Trevi es la más famosa.</p>
            <p>🎭 <strong>¡El carnaval de Venecia es muy famoso!</strong> Con máscaras y trajes elaborados.</p>
          </div>
        </div>

        {/* Landmarks section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-green-800 kids-text mb-4">Lugares famosos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg text-gray-700">
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-bold text-green-800">🏛️ Coliseo de Roma</h3>
              <p>Un antiguo anfiteatro donde luchaban gladiadores y se hacían espectáculos.</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-bold text-green-800">🏞️ Canales de Venecia</h3>
              <p>Una ciudad construida sobre el agua con góndolas como medio de transporte.</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-bold text-green-800"> leaning Torre de Pisa</h3>
              <p>Una torre inclinada famosa por su peculiaridad.</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-bold text-green-800">🏛️ Foro Romano</h3>
              <p>El corazón de la antigua Roma, con templos y edificios importantes.</p>
            </div>
          </div>
        </div>

        {/* Cultural section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-green-800 kids-text mb-4">Cultura y tradiciones</h2>
          <div className="space-y-4 text-lg text-gray-700">
            <p>🍝 <strong>Gastronomía:</strong> Pasta, pizza, risotto y helado son platos típicos.</p>
            <p>🎭 <strong>Arte:</strong> Italia es la cuna del Renacimiento, con artistas como Leonardo da Vinci y Miguel Ángel.</p>
            <p>⚽ <strong>Deportes:</strong> El fútbol es el deporte más popular.</p>
            <p>👗 <strong>Moda:</strong> Milán es una de las capitales de la moda mundial.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItaliaPage;
