
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useGame } from '@/context/GameContext';

const GreciaPage = () => {
  const navigate = useNavigate();
  const { level } = useGame();

  // Marcar que estamos navegando entre páginas
  const handleGoBack = () => {
    sessionStorage.setItem('navigatingBack', 'true');
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-300 flex flex-col items-center p-4">
      {/* Botón para volver */}
      <div className="w-full flex justify-start mb-4">
        <Button 
          variant="outline" 
          onClick={handleGoBack}
          className="bg-white/80 border-blue-400 hover:bg-white/90 text-blue-800 kids-text"
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
          <span className="text-4xl mr-3">🇬🇷</span>
          <h1 className="text-3xl font-bold text-blue-800 kids-text">Grecia</h1>
        </div>

        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold text-blue-700 kids-text">Capital</h2>
            <p className="kids-text text-gray-700">Atenas</p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-blue-700 kids-text">Idioma</h2>
            <p className="kids-text text-gray-700">Griego</p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-blue-700 kids-text">Población</h2>
            <p className="kids-text text-gray-700">10.72 millones de habitantes</p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-blue-700 kids-text">Moneda</h2>
            <p className="kids-text text-gray-700">Euro (€)</p>
          </div>
        </div>
      </motion.div>

      <motion.div 
        className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full mb-8"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-blue-800 kids-text mb-4">¿Sabías que...?</h2>
        <ul className="space-y-2">
          <li className="kids-text text-gray-700">
            • Los Juegos Olímpicos modernos comenzaron en Atenas en 1896.
          </li>
          <li className="kids-text text-gray-700">
            • El alfabeto griego tiene 24 letras y es uno de los más antiguos del mundo.
          </li>
          <li className="kids-text text-gray-700">
            • Grecia tiene más de 6.000 islas, pero solo 227 están habitadas.
          </li>
          <li className="kids-text text-gray-700">
            • Las matemáticas, la filosofía y el teatro tienen su origen en la antigua Grecia.
          </li>
        </ul>
      </motion.div>

      <motion.div 
        className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-blue-800 kids-text mb-4">Lugares famosos</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-700 kids-text">Acrópolis</h3>
            <p className="kids-text text-sm text-gray-600">Antigua ciudadela de Atenas</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-700 kids-text">Santorini</h3>
            <p className="kids-text text-sm text-gray-600">Isla con casas blancas</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-700 kids-text">Monte Olimpo</h3>
            <p className="kids-text text-sm text-gray-600">Hogar de los dioses griegos</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-700 kids-text">Partenón</h3>
            <p className="kids-text text-sm text-gray-600">Templo dedicado a Atenea</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default GreciaPage;
