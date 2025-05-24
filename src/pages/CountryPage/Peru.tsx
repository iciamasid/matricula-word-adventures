import React, { useEffect } from 'react';
import { ArrowLeft, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useCountryNavigation } from '@/hooks/useCountryNavigation';

const PeruPage = () => {
  const { handleReturnToGame } = useCountryNavigation('Peru');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-red-100 p-4">
      <div className="max-w-4xl mx-auto">
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
          <div className="text-8xl mb-4">🇵🇪</div>
          <h1 className="text-4xl font-bold text-red-800 kids-text mb-2">Perú</h1>
          <p className="text-xl text-red-700 kids-text">¡Bienvenido a Perú!</p>
        </div>

        {/* Country image */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
          <motion.img 
            src="/lovable-uploads/Perú.jpg" 
            alt="Machu Picchu"
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
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15603736.956513474!2d-84.09825396220297!3d-9.189967097799816!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c850c05914f7%3A0x364d984c86b05670!2sPeru!5e0!3m2!1sen!2ses!4v1653130789012!5m2!1sen!2ses"
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
              <p className="text-gray-700 kids-text">Lima</p>
            </div>
            <div>
              <h3 className="font-semibold text-red-700 kids-text">Idioma</h3>
              <p className="text-gray-700 kids-text">Español</p>
            </div>
            <div>
              <h3 className="font-semibold text-red-700 kids-text">Población</h3>
              <p className="text-gray-700 kids-text">32.97 millones</p>
            </div>
            <div>
              <h3 className="font-semibold text-red-700 kids-text">Moneda</h3>
              <p className="text-gray-700 kids-text">Sol peruano (S/)</p>
            </div>
          </div>
        </div>

        {/* Fun facts section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-red-800 kids-text mb-4">¡Datos curiosos!</h2>
          <div className="space-y-4 text-lg text-gray-700">
            <p>🥔 <strong>¡Perú es el lugar de origen de la papa!</strong> Con más de 3.000 variedades diferentes.</p>
            <p>🏛️ <strong>¡Machu Picchu fue construido en el siglo XV!</strong> Y redescubierto en 1911 por Hiram Bingham.</p>
            <p>🌊 <strong>¡El Lago Titicaca es navegable más alto del mundo!</strong> A 3.812 metros sobre el nivel del mar.</p>
            <p>✈️ <strong>¡Las líneas de Nazca solo se ven desde el aire!</strong> Son dibujos enormes de animales y figuras geométricas.</p>
          </div>
        </div>

        {/* Landmarks section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-red-800 kids-text mb-4">Lugares famosos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg text-gray-700">
            <div className="p-4 bg-red-50 rounded-lg">
              <h3 className="font-bold text-red-800">🏛️ Machu Picchu</h3>
              <p>Ciudad inca perdida en las montañas, patrimonio de la humanidad.</p>
            </div>
            <div className="p-4 bg-red-50 rounded-lg">
              <h3 className="font-bold text-red-800">✈️ Líneas de Nazca</h3>
              <p>Gigantescos geoglifos antiguos que solo se aprecian desde el aire.</p>
            </div>
            <div className="p-4 bg-red-50 rounded-lg">
              <h3 className="font-bold text-red-800">🌄 Valle Sagrado</h3>
              <p>Valle con ruinas incas y cultivos en terrazas espectaculares.</p>
            </div>
            <div className="p-4 bg-red-50 rounded-lg">
              <h3 className="font-bold text-red-800">🌊 Lago Titicaca</h3>
              <p>Lago compartido entre Perú y Bolivia, con islas flotantes.</p>
            </div>
          </div>
        </div>

        {/* Cultural section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-red-800 kids-text mb-4">Cultura y tradiciones</h2>
          <div className="space-y-4 text-lg text-gray-700">
            <p>🍽️ <strong>Gastronomía:</strong> Ceviche, anticuchos, ají de gallina y pisco sour son platos típicos.</p>
            <p>🎵 <strong>Música:</strong> La música andina con quena, zampoña y charango es tradicional.</p>
            <p>🦙 <strong>Llamas y alpacas:</strong> Animales andinos importantes para transporte y lana.</p>
            <p>🎭 <strong>Tradiciones incas:</strong> Muchas costumbres y festivales tienen origen en el Imperio Inca.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeruPage;
