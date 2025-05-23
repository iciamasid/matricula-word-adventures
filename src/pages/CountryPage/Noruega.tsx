
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useGame } from '@/context/GameContext';

const NoruegaPage = () => {
  const navigate = useNavigate();
  const { level } = useGame();

  // Marcar que estamos navegando entre páginas
  const handleGoBack = () => {
    sessionStorage.setItem('navigatingBack', 'true');
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-indigo-100 flex flex-col items-center p-4">
      {/* Botón para volver */}
      <div className="w-full flex justify-start mb-4">
        <Button 
          variant="outline" 
          onClick={handleGoBack}
          className="bg-white/80 border-indigo-400 hover:bg-white/90 text-indigo-800 kids-text"
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
          <span className="text-4xl mr-3">🇳🇴</span>
          <h1 className="text-3xl font-bold text-indigo-800 kids-text">Noruega</h1>
        </div>

        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold text-indigo-700 kids-text">Capital</h2>
            <p className="kids-text text-gray-700">Oslo</p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-indigo-700 kids-text">Idioma</h2>
            <p className="kids-text text-gray-700">Noruego</p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-indigo-700 kids-text">Población</h2>
            <p className="kids-text text-gray-700">5.38 millones de habitantes</p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-indigo-700 kids-text">Moneda</h2>
            <p className="kids-text text-gray-700">Corona noruega (kr)</p>
          </div>
        </div>
      </motion.div>

      <motion.div 
        className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full mb-8"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-indigo-800 kids-text mb-4">¿Sabías que...?</h2>
        <ul className="space-y-2">
          <li className="kids-text text-gray-700">
            • En el norte de Noruega, el sol no se pone durante dos meses en verano.
          </li>
          <li className="kids-text text-gray-700">
            • Noruega tiene más de 1.000 fiordos, que son entradas de mar entre montañas.
          </li>
          <li className="kids-text text-gray-700">
            • El queso marrón (brunost) es un dulce típico noruego hecho de suero de leche.
          </li>
          <li className="kids-text text-gray-700">
            • Los vikingos, famosos navegantes y guerreros, eran originarios de Noruega.
          </li>
        </ul>
      </motion.div>

      <motion.div 
        className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-indigo-800 kids-text mb-4">Lugares famosos</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-indigo-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-indigo-700 kids-text">Fiordo de Geiranger</h3>
            <p className="kids-text text-sm text-gray-600">Uno de los fiordos más bellos</p>
          </div>
          <div className="bg-indigo-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-indigo-700 kids-text">Preikestolen</h3>
            <p className="kids-text text-sm text-gray-600">Acantilado con vista impresionante</p>
          </div>
          <div className="bg-indigo-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-indigo-700 kids-text">Tromso</h3>
            <p className="kids-text text-sm text-gray-600">Ciudad para ver auroras boreales</p>
          </div>
          <div className="bg-indigo-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-indigo-700 kids-text">Bergen</h3>
            <p className="kids-text text-sm text-gray-600">Ciudad con casas de colores</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default NoruegaPage;
