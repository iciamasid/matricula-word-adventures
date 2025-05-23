
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const Grecia = () => {
  const handleNavigation = () => {
    sessionStorage.setItem('navigatingBack', 'true');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white p-4">
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
          <div className="text-8xl mb-4">🇬🇷</div>
          <h1 className="text-4xl font-bold text-blue-800 kids-text mb-2">Grecia</h1>
          <p className="text-xl text-blue-700 kids-text">¡Bienvenido a Grecia!</p>
        </div>

        {/* Country image */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
          <motion.img 
            src="/lovable-uploads/6eb44f09-3864-48b2-8a08-b682e3a1ada3.png" 
            alt="Coliseo Romano, Roma"
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
              <p className="text-gray-700 kids-text">Atenas</p>
            </div>
            <div>
              <h3 className="font-semibold text-blue-700 kids-text">Idioma</h3>
              <p className="text-gray-700 kids-text">Griego</p>
            </div>
            <div>
              <h3 className="font-semibold text-blue-700 kids-text">Población</h3>
              <p className="text-gray-700 kids-text">10.7 millones</p>
            </div>
            <div>
              <h3 className="font-semibold text-blue-700 kids-text">Moneda</h3>
              <p className="text-gray-700 kids-text">Euro (€)</p>
            </div>
          </div>
        </div>

        {/* Fun facts section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-blue-800 kids-text mb-4">¡Datos curiosos!</h2>
          <div className="space-y-4 text-lg text-gray-700">
            <p>🏛️ <strong>¡Grecia es la cuna de la democracia!</strong> En Atenas se inventó el sistema democrático hace más de 2500 años.</p>
            <p>🏃‍♂️ <strong>¡Los Juegos Olímpicos nacieron aquí!</strong> Se celebraron por primera vez en Olimpia en el año 776 a.C.</p>
            <p>🏺 <strong>¡Los antiguos griegos inventaron el teatro!</strong> Las tragedias y comedias nacieron en Grecia.</p>
            <p>🌊 <strong>¡Tiene más de 6.000 islas!</strong> Aunque solo unas 200 están habitadas.</p>
          </div>
        </div>

        {/* Landmarks section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-blue-800 kids-text mb-4">Lugares famosos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg text-gray-700">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-bold text-blue-800">🏛️ Partenón</h3>
              <p>Un templo antiguo dedicado a la diosa Atenea en la Acrópolis de Atenas.</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-bold text-blue-800">🏺 Delfos</h3>
              <p>Un lugar sagrado donde los antiguos griegos consultaban el oráculo.</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-bold text-blue-800">🌅 Santorini</h3>
              <p>Una isla volcánica famosa por sus casas blancas y atardeceres espectaculares.</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-bold text-blue-800">🏔️ Monte Olimpo</h3>
              <p>La montaña más alta de Grecia, hogar de los dioses en la mitología griega.</p>
            </div>
          </div>
        </div>

        {/* Cultural section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-blue-800 kids-text mb-4">Cultura y tradiciones</h2>
          <div className="space-y-4 text-lg text-gray-700">
            <p>🍯 <strong>Gastronomía:</strong> Famosa por el aceite de oliva, el queso feta, y la miel.</p>
            <p>💃 <strong>Danza griega:</strong> El sirtaki es su baile tradicional más conocido.</p>
            <p>📚 <strong>Mitología:</strong> Historias fascinantes de dioses como Zeus, Poseidón y Atenea.</p>
            <p>🎭 <strong>Filosofía:</strong> Grandes pensadores como Sócrates, Platón y Aristóteles vivieron aquí.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Grecia;
