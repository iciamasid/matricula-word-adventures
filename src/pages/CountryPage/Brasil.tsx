
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const BrasilPage = () => {
  const navigate = useNavigate();

  // Marcar que estamos navegando entre páginas
  const handleGoBack = () => {
    sessionStorage.setItem('navigatingBack', 'true');
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-green-100 flex flex-col items-center p-4">
      {/* Botón para volver */}
      <div className="w-full flex justify-start mb-4">
        <Button 
          variant="outline" 
          onClick={handleGoBack}
          className="bg-white/80 border-yellow-400 hover:bg-white/90 text-yellow-800 kids-text"
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
          <span className="text-4xl mr-3">🇧🇷</span>
          <h1 className="text-3xl font-bold text-green-800 kids-text">Brasil</h1>
        </div>

        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold text-green-700 kids-text">Capital</h2>
            <p className="kids-text text-gray-700">Brasilia</p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-green-700 kids-text">Idioma</h2>
            <p className="kids-text text-gray-700">Portugués</p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-green-700 kids-text">Población</h2>
            <p className="kids-text text-gray-700">212.6 millones de habitantes</p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-green-700 kids-text">Moneda</h2>
            <p className="kids-text text-gray-700">Real brasileño (R$)</p>
          </div>
        </div>
      </motion.div>

      <motion.div 
        className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full mb-8"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-green-800 kids-text mb-4">¿Sabías que...?</h2>
        <ul className="space-y-2">
          <li className="kids-text text-gray-700">
            • Brasil es el quinto país más grande del mundo por tamaño y población.
          </li>
          <li className="kids-text text-gray-700">
            • El Amazonas, que pasa por Brasil, es el río más caudaloso del mundo.
          </li>
          <li className="kids-text text-gray-700">
            • El Carnaval de Río de Janeiro es una de las fiestas más grandes del mundo.
          </li>
          <li className="kids-text text-gray-700">
            • Brasil ha ganado más Copas Mundiales de fútbol que cualquier otro país.
          </li>
        </ul>
      </motion.div>

      <motion.div 
        className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-green-800 kids-text mb-4">Lugares famosos</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-green-700 kids-text">Cristo Redentor</h3>
            <p className="kids-text text-sm text-gray-600">Estatua gigante en Río de Janeiro</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-green-700 kids-text">Pan de Azúcar</h3>
            <p className="kids-text text-sm text-gray-600">Montaña con vistas a la ciudad</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-green-700 kids-text">Cataratas del Iguazú</h3>
            <p className="kids-text text-sm text-gray-600">Cascadas entre Brasil y Argentina</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-green-700 kids-text">Amazonia</h3>
            <p className="kids-text text-sm text-gray-600">El bosque tropical más grande</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BrasilPage;
