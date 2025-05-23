
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const ChinaPage = () => {
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
          <span className="text-4xl mr-3">🇨🇳</span>
          <h1 className="text-3xl font-bold text-red-800 kids-text">China</h1>
        </div>

        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold text-red-700 kids-text">Capital</h2>
            <p className="kids-text text-gray-700">Pekín</p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-red-700 kids-text">Idioma</h2>
            <p className="kids-text text-gray-700">Mandarín</p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-red-700 kids-text">Población</h2>
            <p className="kids-text text-gray-700">1.402 mil millones de habitantes</p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-red-700 kids-text">Moneda</h2>
            <p className="kids-text text-gray-700">Yuan (¥)</p>
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
            • La Gran Muralla China es tan larga que podría dar la vuelta a la Tierra.
          </li>
          <li className="kids-text text-gray-700">
            • En China se inventó el papel, la brújula, la pólvora y la imprenta.
          </li>
          <li className="kids-text text-gray-700">
            • El Año Nuevo Chino cambia de fecha cada año según el calendario lunar.
          </li>
          <li className="kids-text text-gray-700">
            • El panda gigante es nativo de China y es el símbolo nacional del país.
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
            <h3 className="text-lg font-semibold text-red-700 kids-text">Gran Muralla China</h3>
            <p className="kids-text text-sm text-gray-600">La estructura más larga del mundo</p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-red-700 kids-text">Ciudad Prohibida</h3>
            <p className="kids-text text-sm text-gray-600">Antiguo palacio imperial</p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-red-700 kids-text">Ejército de Terracota</h3>
            <p className="kids-text text-sm text-gray-600">Miles de estatuas de guerreros</p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-red-700 kids-text">Torres Karst</h3>
            <p className="kids-text text-sm text-gray-600">Montañas en forma de pilares</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ChinaPage;
