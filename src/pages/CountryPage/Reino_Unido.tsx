
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useGame } from '@/context/GameContext';

const ReinoUnidoPage = () => {
  const navigate = useNavigate();
  const { level } = useGame();

  // Marcar que estamos navegando entre páginas
  const handleGoBack = () => {
    sessionStorage.setItem('navigatingBack', 'true');
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 flex flex-col items-center p-4">
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
          <span className="text-4xl mr-3">🇬🇧</span>
          <h1 className="text-3xl font-bold text-blue-800 kids-text">Reino Unido</h1>
        </div>

        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold text-blue-700 kids-text">Capital</h2>
            <p className="kids-text text-gray-700">Londres</p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-blue-700 kids-text">Idioma</h2>
            <p className="kids-text text-gray-700">Inglés</p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-blue-700 kids-text">Población</h2>
            <p className="kids-text text-gray-700">67.22 millones de habitantes</p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-blue-700 kids-text">Moneda</h2>
            <p className="kids-text text-gray-700">Libra esterlina (£)</p>
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
            • El Big Ben no es la torre sino la campana que hay dentro.
          </li>
          <li className="kids-text text-gray-700">
            • El metro de Londres es el más antiguo del mundo, inaugurado en 1863.
          </li>
          <li className="kids-text text-gray-700">
            • La familia real británica existe desde hace más de 1000 años.
          </li>
          <li className="kids-text text-gray-700">
            • El Reino Unido está formado por Inglaterra, Escocia, Gales e Irlanda del Norte.
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
            <h3 className="text-lg font-semibold text-blue-700 kids-text">Big Ben</h3>
            <p className="kids-text text-sm text-gray-600">Famoso reloj en Londres</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-700 kids-text">Torre de Londres</h3>
            <p className="kids-text text-sm text-gray-600">Antigua fortaleza histórica</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-700 kids-text">Stonehenge</h3>
            <p className="kids-text text-sm text-gray-600">Monumento prehistórico</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-700 kids-text">Palacio de Buckingham</h3>
            <p className="kids-text text-sm text-gray-600">Residencia real</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ReinoUnidoPage;
