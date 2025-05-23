
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useGame } from '@/context/GameContext';

const CostaRicaPage = () => {
  const navigate = useNavigate();
  const { level } = useGame();

  // Marcar que estamos navegando entre páginas
  const handleGoBack = () => {
    sessionStorage.setItem('navigatingBack', 'true');
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex flex-col items-center p-4">
      {/* Botón para volver */}
      <div className="w-full flex justify-start mb-4">
        <Button 
          variant="outline" 
          onClick={handleGoBack}
          className="bg-white/80 border-green-400 hover:bg-white/90 text-green-800 kids-text"
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
          <span className="text-4xl mr-3">🇨🇷</span>
          <h1 className="text-3xl font-bold text-green-800 kids-text">Costa Rica</h1>
        </div>

        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold text-green-700 kids-text">Capital</h2>
            <p className="kids-text text-gray-700">San José</p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-green-700 kids-text">Idioma</h2>
            <p className="kids-text text-gray-700">Español</p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-green-700 kids-text">Población</h2>
            <p className="kids-text text-gray-700">5.09 millones de habitantes</p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-green-700 kids-text">Moneda</h2>
            <p className="kids-text text-gray-700">Colón costarricense (₡)</p>
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
            • Costa Rica no tiene ejército desde 1948.
          </li>
          <li className="kids-text text-gray-700">
            • El lema del país es "Pura Vida" que significa vivir sin preocupaciones.
          </li>
          <li className="kids-text text-gray-700">
            • Tiene el 5% de la biodiversidad mundial en solo 0.03% de la superficie terrestre.
          </li>
          <li className="kids-text text-gray-700">
            • Más del 25% de su territorio está protegido como parques o reservas naturales.
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
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-green-700 kids-text">Volcán Arenal</h3>
            <p className="kids-text text-sm text-gray-600">Volcán activo con aguas termales</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-green-700 kids-text">Manuel Antonio</h3>
            <p className="kids-text text-sm text-gray-600">Parque Nacional con playas</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-green-700 kids-text">Monteverde</h3>
            <p className="kids-text text-sm text-gray-600">Bosque nuboso con gran biodiversidad</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-green-700 kids-text">Tortuguero</h3>
            <p className="kids-text text-sm text-gray-600">Canales y playas de tortugas</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CostaRicaPage;
