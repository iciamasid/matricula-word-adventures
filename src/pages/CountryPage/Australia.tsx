
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const AustraliaPage = () => {
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
          <div className="text-8xl mb-4">🇦🇺</div>
          <h1 className="text-4xl font-bold text-yellow-800 kids-text mb-2">Australia</h1>
          <p className="text-xl text-yellow-700 kids-text">¡Bienvenido a Australia!</p>
        </div>

        {/* Country image */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
          <motion.img 
            src="/lovable-uploads/e27d86a7-9c73-425d-806e-1e86fd6c6e99.png" 
            alt="Paisaje de Australia"
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
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28149203.83113892!2d121.08310089999999!3d-25.274398!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2b2bfd076787c5df%3A0x538267a1955b1352!2sAustralia!5e0!3m2!1sen!2ses!4v1653130890123!5m2!1sen!2ses"
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
              <p className="text-gray-700 kids-text">Canberra</p>
            </div>
            <div>
              <h3 className="font-semibold text-yellow-700 kids-text">Idioma</h3>
              <p className="text-gray-700 kids-text">Inglés</p>
            </div>
            <div>
              <h3 className="font-semibold text-yellow-700 kids-text">Población</h3>
              <p className="text-gray-700 kids-text">25.69 millones</p>
            </div>
            <div>
              <h3 className="font-semibold text-yellow-700 kids-text">Moneda</h3>
              <p className="text-gray-700 kids-text">Dólar australiano ($)</p>
            </div>
          </div>
        </div>

        {/* Fun facts section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-yellow-800 kids-text mb-4">¡Datos curiosos!</h2>
          <div className="space-y-4 text-lg text-gray-700">
            <p>🦘 <strong>¡Australia es el único país que también es un continente!</strong> Y el sexto país más grande del mundo.</p>
            <p>🐨 <strong>¡Los koalas duermen 22 horas al día!</strong> Y solo comen hojas de eucalipto.</p>
            <p>🏊 <strong>¡Australia tiene más de 10.000 playas!</strong> Podrías visitar una playa diferente cada día durante 27 años.</p>
            <p>🕷️ <strong>¡Australia tiene algunos de los animales más venenosos del mundo!</strong> Pero también los más adorables como los wombats.</p>
          </div>
        </div>

        {/* Landmarks section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-yellow-800 kids-text mb-4">Lugares famosos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg text-gray-700">
            <div className="p-4 bg-yellow-50 rounded-lg">
              <h3 className="font-bold text-yellow-800">🎭 Ópera de Sídney</h3>
              <p>Edificio icónico con forma de velas blancas junto al mar.</p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg">
              <h3 className="font-bold text-yellow-800">🪨 Uluru</h3>
              <p>Roca sagrada gigante en el centro del continente.</p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg">
              <h3 className="font-bold text-yellow-800">🐠 Gran Barrera de Coral</h3>
              <p>El arrecife de coral más grande del mundo, visible desde el espacio.</p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg">
              <h3 className="font-bold text-yellow-800">🌉 Harbour Bridge</h3>
              <p>Puente emblemático de Sídney conocido como "la percha".</p>
            </div>
          </div>
        </div>

        {/* Cultural section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-yellow-800 kids-text mb-4">Cultura y tradiciones</h2>
          <div className="space-y-4 text-lg text-gray-700">
            <p>🏄 <strong>Surf:</strong> Australia es la cuna de la cultura del surf moderno.</p>
            <p>🔥 <strong>Barbacoa:</strong> Los "barbies" son una tradición social muy importante.</p>
            <p>🎨 <strong>Arte aborigen:</strong> La cultura indígena más antigua del mundo, con 65.000 años.</p>
            <p>🦘 <strong>Fauna única:</strong> Hogar de animales que no existen en ninguna otra parte del mundo.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AustraliaPage;
