
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const CostaRicaPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    sessionStorage.setItem('navigatingBack', 'true');
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <div className="w-full flex justify-start mb-4">
          <Button 
            variant="outline" 
            onClick={handleGoBack}
            className="bg-white/80 border-green-400 hover:bg-white/90 text-green-800 kids-text"
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> Volver
          </Button>
        </div>

        {/* Header with flag and country name */}
        <div className="text-center mb-8">
          <div className="text-8xl mb-4">🇨🇷</div>
          <h1 className="text-4xl font-bold text-green-800 kids-text mb-2">Costa Rica</h1>
          <p className="text-xl text-green-700 kids-text">¡Bienvenido a Costa Rica!</p>
        </div>

        {/* Country image */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
          <motion.img 
            src="/lovable-uploads/276d9054-061e-45b9-9517-d7f0d8218579.png" 
            alt="Paisaje de Costa Rica"
            className="w-full h-64 object-cover"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1 }}
          />
        </div>

        {/* Basic info section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-green-800 kids-text mb-4">Información básica</h2>
          <div className="grid grid-cols-2 gap-4 text-lg">
            <div>
              <h3 className="font-semibold text-green-700 kids-text">Capital</h3>
              <p className="text-gray-700 kids-text">San José</p>
            </div>
            <div>
              <h3 className="font-semibold text-green-700 kids-text">Idioma</h3>
              <p className="text-gray-700 kids-text">Español</p>
            </div>
            <div>
              <h3 className="font-semibold text-green-700 kids-text">Población</h3>
              <p className="text-gray-700 kids-text">5.09 millones</p>
            </div>
            <div>
              <h3 className="font-semibold text-green-700 kids-text">Moneda</h3>
              <p className="text-gray-700 kids-text">Colón costarricense (₡)</p>
            </div>
          </div>
        </div>

        {/* Fun facts section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-green-800 kids-text mb-4">¡Datos curiosos!</h2>
          <div className="space-y-4 text-lg text-gray-700">
            <p>⚔️ <strong>¡Costa Rica no tiene ejército desde 1948!</strong> Es uno de los pocos países del mundo sin fuerzas armadas.</p>
            <p>😊 <strong>¡"Pura Vida" es su lema!</strong> Significa vivir sin preocupaciones y disfrutar la vida.</p>
            <p>🦋 <strong>¡5% de la biodiversidad mundial está aquí!</strong> En solo 0.03% de la superficie terrestre.</p>
            <p>🌳 <strong>¡Más del 25% del país está protegido!</strong> Como parques nacionales y reservas naturales.</p>
          </div>
        </div>

        {/* Landmarks section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-green-800 kids-text mb-4">Lugares famosos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg text-gray-700">
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-bold text-green-800">🌋 Volcán Arenal</h3>
              <p>Volcán activo rodeado de aguas termales naturales.</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-bold text-green-800">🏖️ Manuel Antonio</h3>
              <p>Parque Nacional con playas paradisíacas y vida silvestre.</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-bold text-green-800">☁️ Monteverde</h3>
              <p>Bosque nuboso con increíble biodiversidad y puentes colgantes.</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-bold text-green-800">🐢 Tortuguero</h3>
              <p>Canales naturales y playas donde anidan tortugas marinas.</p>
            </div>
          </div>
        </div>

        {/* Cultural section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-green-800 kids-text mb-4">Cultura y tradiciones</h2>
          <div className="space-y-4 text-lg text-gray-700">
            <p>☕ <strong>Café:</strong> Costa Rica produce algunos de los mejores cafés del mundo.</p>
            <p>🦥 <strong>Perezosos:</strong> Animales emblemáticos que se mueven muy lentamente.</p>
            <p>🌿 <strong>Ecoturismo:</strong> Pionero mundial en turismo sostenible y conservación.</p>
            <p>🎵 <strong>Música:</strong> El calipso y la cumbia son géneros musicales populares.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CostaRicaPage;
