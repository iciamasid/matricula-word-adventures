
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const CanadaPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    sessionStorage.setItem('navigatingBack', 'true');
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-red-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <div className="w-full flex justify-start mb-4">
          <Button 
            variant="outline" 
            onClick={handleGoBack}
            className="bg-white/80 border-red-400 hover:bg-white/90 text-red-800 kids-text"
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> Volver
          </Button>
        </div>

        {/* Header with flag and country name */}
        <div className="text-center mb-8">
          <div className="text-8xl mb-4">🇨🇦</div>
          <h1 className="text-4xl font-bold text-red-800 kids-text mb-2">Canadá</h1>
          <p className="text-xl text-red-700 kids-text">¡Bienvenido a Canadá!</p>
        </div>

        {/* Country image */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
          <motion.img 
            src="/lovable-uploads/501f7c44-46fc-44ae-8a9f-94b1215f5544.png" 
            alt="Paisaje canadiense"
            className="w-full h-64 object-cover"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1 }}
          />
        </div>

        {/* Basic info section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-red-800 kids-text mb-4">Información básica</h2>
          <div className="grid grid-cols-2 gap-4 text-lg">
            <div>
              <h3 className="font-semibold text-red-700 kids-text">Capital</h3>
              <p className="text-gray-700 kids-text">Ottawa</p>
            </div>
            <div>
              <h3 className="font-semibold text-red-700 kids-text">Idioma</h3>
              <p className="text-gray-700 kids-text">Inglés y Francés</p>
            </div>
            <div>
              <h3 className="font-semibold text-red-700 kids-text">Población</h3>
              <p className="text-gray-700 kids-text">38.01 millones</p>
            </div>
            <div>
              <h3 className="font-semibold text-red-700 kids-text">Moneda</h3>
              <p className="text-gray-700 kids-text">Dólar canadiense ($)</p>
            </div>
          </div>
        </div>

        {/* Fun facts section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-red-800 kids-text mb-4">¡Datos curiosos!</h2>
          <div className="space-y-4 text-lg text-gray-700">
            <p>🏔️ <strong>¡Canadá tiene más lagos que el resto del mundo junto!</strong> Con más de 2 millones de lagos.</p>
            <p>🦫 <strong>¡El castor es el animal nacional!</strong> Aparece en la moneda de 5 centavos.</p>
            <p>🏒 <strong>¡El hockey sobre hielo es el deporte nacional de invierno!</strong> Y lacrosse el de verano.</p>
            <p>🌍 <strong>¡Es el segundo país más grande del mundo!</strong> Solo Rusia es más grande.</p>
          </div>
        </div>

        {/* Landmarks section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-red-800 kids-text mb-4">Lugares famosos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg text-gray-700">
            <div className="p-4 bg-red-50 rounded-lg">
              <h3 className="font-bold text-red-800">🌊 Cataratas del Niágara</h3>
              <p>Enormes cataratas de agua que comparte con Estados Unidos.</p>
            </div>
            <div className="p-4 bg-red-50 rounded-lg">
              <h3 className="font-bold text-red-800">🗼 CN Tower</h3>
              <p>Torre de comunicaciones de 553 metros en Toronto.</p>
            </div>
            <div className="p-4 bg-red-50 rounded-lg">
              <h3 className="font-bold text-red-800">🏔️ Parque Nacional Banff</h3>
              <p>Montañas Rocosas con lagos cristalinos y glaciares.</p>
            </div>
            <div className="p-4 bg-red-50 rounded-lg">
              <h3 className="font-bold text-red-800">🏛️ Viejo Quebec</h3>
              <p>Ciudad histórica amurallada, patrimonio de la humanidad.</p>
            </div>
          </div>
        </div>

        {/* Cultural section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-red-800 kids-text mb-4">Cultura y tradiciones</h2>
          <div className="space-y-4 text-lg text-gray-700">
            <p>🥞 <strong>Jarabe de arce:</strong> Canadá produce el 71% del jarabe de arce del mundo.</p>
            <p>🏒 <strong>Hockey:</strong> Deporte nacional que se juega en pistas de hielo durante el invierno.</p>
            <p>🦃 <strong>Día de Acción de Gracias:</strong> Se celebra en octubre, antes que en Estados Unidos.</p>
            <p>🌈 <strong>Multiculturalismo:</strong> País donde conviven personas de muchas culturas diferentes.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CanadaPage;
