
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const EspanaPage = () => {
  const handleNavigation = () => {
    sessionStorage.setItem('navigatingBack', 'true');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-yellow-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <Link to="/motorcycle-game">
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
          <div className="text-8xl mb-4">🇪🇸</div>
          <h1 className="text-4xl font-bold text-red-800 kids-text mb-2">España</h1>
          <p className="text-xl text-red-700 kids-text">¡Bienvenido a España!</p>
        </div>

        {/* Country image */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
          <motion.img 
            src="/lovable-uploads/82ed4a47-c090-4db2-b49e-6041114c97b7.png" 
            alt="Paisaje de España"
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
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6509025.776657027!2d-9.036053850000001!3d40.0527567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xc42e3783261bc8b%3A0xa6ec2c940768a3ec!2sSpain!5e0!3m2!1sen!2ses!4v1653130123456!5m2!1sen!2ses"
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
              <p className="text-gray-700 kids-text">Madrid</p>
            </div>
            <div>
              <h3 className="font-semibold text-red-700 kids-text">Idioma</h3>
              <p className="text-gray-700 kids-text">Español</p>
            </div>
            <div>
              <h3 className="font-semibold text-red-700 kids-text">Población</h3>
              <p className="text-gray-700 kids-text">47.35 millones</p>
            </div>
            <div>
              <h3 className="font-semibold text-red-700 kids-text">Moneda</h3>
              <p className="text-gray-700 kids-text">Euro (€)</p>
            </div>
          </div>
        </div>

        {/* Fun facts section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-red-800 kids-text mb-4">¡Datos curiosos!</h2>
          <div className="space-y-4 text-lg text-gray-700">
            <p>🏛️ <strong>¡España tiene el tercer mayor número de sitios Patrimonio de la Humanidad!</strong> Con 49 lugares declarados por la UNESCO.</p>
            <p>🥘 <strong>¡La paella es originaria de Valencia!</strong> Y tradicionalmente se come directamente de la sartén con cuchara de madera.</p>
            <p>🌅 <strong>¡España tiene más de 8.000 kilómetros de costa!</strong> Entre el Mar Mediterráneo y el Océano Atlántico.</p>
            <p>🏔️ <strong>¡El Teide en Canarias es el pico más alto de España!</strong> Con 3.715 metros de altura.</p>
          </div>
        </div>

        {/* Landmarks section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-red-800 kids-text mb-4">Lugares famosos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg text-gray-700">
            <div className="p-4 bg-red-50 rounded-lg">
              <h3 className="font-bold text-red-800">⛪ Sagrada Familia</h3>
              <p>Basilica diseñada por Antoni Gaudí en Barcelona, aún en construcción.</p>
            </div>
            <div className="p-4 bg-red-50 rounded-lg">
              <h3 className="font-bold text-red-800">🏛️ Alhambra</h3>
              <p>Palacio y fortaleza de Granada, ejemplo de arquitectura musulmana.</p>
            </div>
            <div className="p-4 bg-red-50 rounded-lg">
              <h3 className="font-bold text-red-800">🎨 Museo del Prado</h3>
              <p>Uno de los museos de arte más importantes del mundo en Madrid.</p>
            </div>
            <div className="p-4 bg-red-50 rounded-lg">
              <h3 className="font-bold text-red-800">🏰 Alcázar de Sevilla</h3>
              <p>Palacio real en Sevilla con impresionantes jardines y arquitectura.</p>
            </div>
          </div>
        </div>

        {/* Cultural section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-red-800 kids-text mb-4">Cultura y tradiciones</h2>
          <div className="space-y-4 text-lg text-gray-700">
            <p>💃 <strong>Flamenco:</strong> Arte que combina cante, baile y guitarra, originario de Andalucía.</p>
            <p>🍅 <strong>La Tomatina:</strong> Festival en Buñol donde la gente se arroja tomates.</p>
            <p>🐂 <strong>Fiestas de San Fermín:</strong> Famosos encierros de toros en Pamplona.</p>
            <p>🥖 <strong>Tapas:</strong> Pequeñas porciones de comida que se comparten entre amigos.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EspanaPage;
