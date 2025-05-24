import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const CostaRicaPage = () => {
  // Ensure page starts from top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleNavigation = () => {
    sessionStorage.setItem('navigatingBack', 'true');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <Link to="/motorcycle-game">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleNavigation}
            className="mb-4 bg-green-700/90 hover:bg-green-800 text-white border-green-600"
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> Volver al juego
          </Button>
        </Link>

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

        {/* Country map location */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
          <div className="p-4 bg-green-50">
            <h2 className="text-2xl font-bold text-green-800 kids-text mb-2 flex items-center">
              <MapPin className="w-6 h-6 mr-2 text-green-700" /> Ubicación
            </h2>
          </div>
          <div className="relative pb-[56.25%] h-0">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2019796.524056837!2d-86.58045454887695!3d9.748917073222133!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fa244bbf7637147%3A0x6629f39bc684d471!2sCosta%20Rica!5e0!3m2!1sen!2ses!4v1653130567890!5m2!1sen!2ses"
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
