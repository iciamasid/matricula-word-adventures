
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const PeruPage = () => {
  const navigate = useNavigate();

  // Marcar que estamos navegando entre páginas
  const handleGoBack = () => {
    sessionStorage.setItem('navigatingBack', 'true');
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-red-100 flex flex-col items-center p-4">
      {/* Botón para volver */}
      <div className="w-full flex justify-start mb-4">
        <Button 
          variant="outline" 
          onClick={handleGoBack}
          className="bg-white/80 border-red-400 hover:bg-white/90 text-red-800 kids-text"
        >
          <ArrowLeft className="w-4 h-4 mr-1" /> Volver
        </Button>
      </div>

      <motion.div 
        className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full mb-8"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center mb-6">
          <span className="text-4xl mr-3">🇵🇪</span>
          <h1 className="text-3xl font-bold text-red-800 kids-text">Perú</h1>
        </div>

        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold text-red-700 kids-text">Capital</h2>
            <p className="kids-text text-gray-700">Lima</p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-red-700 kids-text">Idioma</h2>
            <p className="kids-text text-gray-700">Español</p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-red-700 kids-text">Población</h2>
            <p className="kids-text text-gray-700">32.97 millones de habitantes</p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-red-700 kids-text">Moneda</h2>
            <p className="kids-text text-gray-700">Sol peruano (S/)</p>
          </div>
        </div>
      </motion.div>

      <motion.div 
        className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full mb-8"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-red-800 kids-text mb-4">¿Sabías que...?</h2>
        <ul className="space-y-2">
          <li className="kids-text text-gray-700">
            • Perú es el lugar de origen de la papa, con más de 3.000 variedades diferentes.
          </li>
          <li className="kids-text text-gray-700">
            • Machu Picchu fue construido en el siglo XV y redescubierto en 1911.
          </li>
          <li className="kids-text text-gray-700">
            • El Lago Titicaca es el lago navegable más alto del mundo.
          </li>
          <li className="kids-text text-gray-700">
            • Las líneas de Nazca son dibujos enormes que solo se ven desde el aire.
          </li>
        </ul>
      </motion.div>

      <motion.div 
        className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-red-800 kids-text mb-4">Lugares famosos</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-red-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-red-700 kids-text">Machu Picchu</h3>
            <p className="kids-text text-sm text-gray-600">Ciudad inca en la montaña</p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-red-700 kids-text">Líneas de Nazca</h3>
            <p className="kids-text text-sm text-gray-600">Gigantescos geoglifos antiguos</p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-red-700 kids-text">Valle Sagrado</h3>
            <p className="kids-text text-sm text-gray-600">Valle con ruinas y cultivos incas</p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-red-700 kids-text">Lago Titicaca</h3>
            <p className="kids-text text-sm text-gray-600">Lago entre Perú y Bolivia</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PeruPage;
