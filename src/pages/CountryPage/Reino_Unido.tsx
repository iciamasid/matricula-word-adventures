
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const ReinoUnido = () => {
  const handleNavigation = () => {
    sessionStorage.setItem('navigatingBack', 'true');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <Link to="/motorcycle-game">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleNavigation}
            className="mb-4 bg-blue-700/90 hover:bg-blue-800 text-white border-blue-600"
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> Volver al juego
          </Button>
        </Link>

        {/* Header with flag and country name */}
        <div className="text-center mb-8">
          <div className="text-8xl mb-4">🇬🇧</div>
          <h1 className="text-4xl font-bold text-blue-800 kids-text mb-2">Reino Unido</h1>
          <p className="text-xl text-blue-700 kids-text">¡Bienvenido al Reino Unido!</p>
        </div>

        {/* Country image */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
          <motion.img 
            src="/lovable-uploads/21e71de1-c8e4-4bbb-95d6-67ce7ae41316.png" 
            alt="Empire State Building, Nueva York"
            className="w-full h-64 object-cover"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1 }}
          />
        </div>

        {/* Basic info section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-blue-800 kids-text mb-4">Información básica</h2>
          <div className="grid grid-cols-2 gap-4 text-lg">
            <div>
              <h3 className="font-semibold text-blue-700 kids-text">Capital</h3>
              <p className="text-gray-700 kids-text">Londres</p>
            </div>
            <div>
              <h3 className="font-semibold text-blue-700 kids-text">Idioma</h3>
              <p className="text-gray-700 kids-text">Inglés</p>
            </div>
            <div>
              <h3 className="font-semibold text-blue-700 kids-text">Población</h3>
              <p className="text-gray-700 kids-text">67.5 millones</p>
            </div>
            <div>
              <h3 className="font-semibold text-blue-700 kids-text">Moneda</h3>
              <p className="text-gray-700 kids-text">Libra esterlina (£)</p>
            </div>
          </div>
        </div>

        {/* Fun facts section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-blue-800 kids-text mb-4">¡Datos curiosos!</h2>
          <div className="space-y-4 text-lg text-gray-700">
            <p>🏰 <strong>¡El Big Ben no es realmente una campana!</strong> Big Ben es el nombre de la campana más grande dentro de la Torre del Reloj en Londres.</p>
            <p>👑 <strong>¡La Reina tiene dos cumpleaños!</strong> Celebra su cumpleaños real y uno oficial en diferentes fechas del año.</p>
            <p>🚌 <strong>¡Los autobuses rojos de dos pisos son famosos en todo el mundo!</strong> Se llaman "double-deckers" y son un símbolo de Londres.</p>
            <p>🌧️ <strong>¡No llueve tanto como la gente piensa!</strong> Aunque es famoso por la lluvia, Londres recibe menos precipitaciones que París o Roma.</p>
          </div>
        </div>

        {/* Landmarks section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-blue-800 kids-text mb-4">Lugares famosos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg text-gray-700">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-bold text-blue-800">🏰 Torre de Londres</h3>
              <p>Una fortaleza histórica donde se guardan las Joyas de la Corona.</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-bold text-blue-800">🌉 Puente de la Torre</h3>
              <p>Un puente icónico que se puede abrir para dejar pasar barcos grandes.</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-bold text-blue-800">🎡 London Eye</h3>
              <p>Una noria gigante desde donde puedes ver toda la ciudad de Londres.</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-bold text-blue-800">🏛️ Palacio de Buckingham</h3>
              <p>La residencia oficial de la familia real británica en Londres.</p>
            </div>
          </div>
        </div>

        {/* Cultural section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-blue-800 kids-text mb-4">Cultura y tradiciones</h2>
          <div className="space-y-4 text-lg text-gray-700">
            <p>☕ <strong>La hora del té:</strong> Los británicos toman té por la tarde con galletas y pasteles.</p>
            <p>⚽ <strong>Fútbol:</strong> Inglaterra es la cuna del fútbol moderno y tiene equipos muy famosos.</p>
            <p>🎭 <strong>Teatro:</strong> Londres tiene teatros increíbles donde se representan musicales famosos.</p>
            <p>🏴󠁧󠁢󠁳󠁣󠁴󠁿 <strong>Escocia, Gales e Irlanda del Norte:</strong> El Reino Unido está formado por cuatro países diferentes.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReinoUnido;
