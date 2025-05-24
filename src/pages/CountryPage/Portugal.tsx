
import React, { useEffect } from 'react';
import { ArrowLeft, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useCountryNavigation } from '@/hooks/useCountryNavigation';

const PortugalPage = () => {
  const { handleReturnToGame } = useCountryNavigation('Portugal');

  // Ensure page starts from top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-red-100 p-4">
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
          <div className="text-8xl mb-4">🇵🇹</div>
          <h1 className="text-4xl font-bold text-green-800 kids-text mb-2">Portugal</h1>
          <p className="text-xl text-green-700 kids-text">¡Bienvenido a Portugal!</p>
        </div>

        {/* Country image */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
          <motion.img 
            src="/lovable-uploads/Portugal.jpg" 
            alt="Torre de Belém, Lisboa"
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
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2999986.3741773744!2d-9.508352!3d39.54007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xb32242dbf4226d5%3A0x2ab84b091c4ef041!2sPortugal!5e0!3m2!1sen!2ses!4v1653129484229!5m2!1sen!2ses"
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
              <p className="text-gray-700 kids-text">Lisboa</p>
            </div>
            <div>
              <h3 className="font-semibold text-green-700 kids-text">Idioma</h3>
              <p className="text-gray-700 kids-text">Portugués</p>
            </div>
            <div>
              <h3 className="font-semibold text-green-700 kids-text">Población</h3>
              <p className="text-gray-700 kids-text">10.3 millones</p>
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
            <p>🌊 <strong>¡Portugal tiene algunas de las mejores playas de Europa!</strong> La costa del Algarve es famosa por sus aguas cristalinas.</p>
            <p>🥮 <strong>¡Los pasteles de nata son originarios de Portugal!</strong> Se crearon en el Monasterio de los Jerónimos en Lisboa.</p>
            <p>⚽ <strong>¡Cristiano Ronaldo es portugués!</strong> Es uno de los mejores futbolistas del mundo.</p>
            <p>🏰 <strong>¡Portugal tiene castillos medievales increíbles!</strong> Algunos datan del siglo XII.</p>
          </div>
        </div>

        {/* Landmarks section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-green-800 kids-text mb-4">Lugares famosos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg text-gray-700">
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-bold text-green-800">🗼 Torre de Belém</h3>
              <p>Una torre histórica en Lisboa que protegía la entrada del puerto.</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-bold text-green-800">🏰 Castillo de Pena</h3>
              <p>Un castillo colorido en Sintra que parece de cuento de hadas.</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-bold text-green-800">🌊 Playa de Benagil</h3>
              <p>Una cueva marina con una playa secreta en el Algarve.</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-bold text-green-800">🏛️ Universidad de Coímbra</h3>
              <p>Una de las universidades más antiguas de Europa, fundada en 1290.</p>
            </div>
          </div>
        </div>

        {/* Cultural section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-green-800 kids-text mb-4">Cultura y tradiciones</h2>
          <div className="space-y-4 text-lg text-gray-700">
            <p>🎵 <strong>Fado:</strong> Un estilo musical tradicional portugués muy emotivo y melancólico.</p>
            <p>🐟 <strong>Bacalao:</strong> El pescado más popular, preparado de más de 365 formas diferentes.</p>
            <p>🚋 <strong>Tranvías:</strong> Los famosos tranvías amarillos de Lisboa son un símbolo de la ciudad.</p>
            <p>🎉 <strong>Carnaval:</strong> Especialmente famoso en las islas de Madeira y Azores.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortugalPage;
