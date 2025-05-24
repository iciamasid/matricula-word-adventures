import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const EstadosUnidosPage = () => {
  const navigate = useNavigate();

  // Ensure page starts from top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Determine the correct return path based on navigation context
  const getReturnPath = () => {
    const navigatingBack = sessionStorage.getItem('navigatingBack');
    
    if (navigatingBack === 'motorcycle-game') {
      return '/motorcycle-game';
    } else {
      return '/'; // Default to car game (Index page)
    }
  };

  const handleNavigation = () => {
    // CRITICAL FIX: Restore game state if it was stored
    const gameState = sessionStorage.getItem('gameStateBeforeCountry');
    if (gameState) {
      const parsedState = JSON.parse(gameState);
      console.log('Restoring game state from Estados Unidos page:', parsedState);
      
      // Store the state for the GameContext to restore
      sessionStorage.setItem('restoreGameState', JSON.stringify(parsedState));
      sessionStorage.removeItem('gameStateBeforeCountry');
    }
    
    // Clear the navigation flag when returning
    sessionStorage.removeItem('navigatingBack');
    navigate(getReturnPath());
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-red-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleNavigation}
          className="mb-4 bg-blue-700/90 hover:bg-blue-800 text-white border-blue-600"
        >
          <ArrowLeft className="w-4 h-4 mr-1" /> Volver al juego
        </Button>

        {/* Header with flag and country name */}
        <div className="text-center mb-8">
          <div className="text-8xl mb-4">🇺🇸</div>
          <h1 className="text-4xl font-bold text-blue-800 kids-text mb-2">Estados Unidos</h1>
          <p className="text-xl text-blue-700 kids-text">¡Bienvenido a Estados Unidos!</p>
        </div>

        {/* Basic info section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-blue-800 kids-text mb-4">Información básica</h2>
          <div className="grid grid-cols-2 gap-4 text-lg">
            <div>
              <h3 className="font-semibold text-blue-700 kids-text">Capital</h3>
              <p className="text-gray-700 kids-text">Washington D.C.</p>
            </div>
            <div>
              <h3 className="font-semibold text-blue-700 kids-text">Idioma</h3>
              <p className="text-gray-700 kids-text">Inglés</p>
            </div>
            <div>
              <h3 className="font-semibold text-blue-700 kids-text">Población</h3>
              <p className="text-gray-700 kids-text">331 millones</p>
            </div>
            <div>
              <h3 className="font-semibold text-blue-700 kids-text">Moneda</h3>
              <p className="text-gray-700 kids-text">Dólar estadounidense ($)</p>
            </div>
          </div>
        </div>

        {/* Fun facts section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-blue-800 kids-text mb-4">¡Datos curiosos!</h2>
          <div className="space-y-4 text-lg text-gray-700">
            <p>🗽 <strong>¡La Estatua de la Libertad fue un regalo de Francia!</strong> Se entregó en 1886 como símbolo de amistad entre los dos países.</p>
            <p>🏞️ <strong>¡Estados Unidos tiene 63 parques nacionales!</strong> Desde el Gran Cañón hasta Yellowstone, protegen paisajes increíbles.</p>
            <p>🌽 <strong>¡Estados Unidos produce más maíz que cualquier otro país!</strong> Gran parte se usa para alimentar animales y hacer combustible.</p>
            <p>🎬 <strong>¡Hollywood es la capital mundial del entretenimiento!</strong> Produce películas que se ven en todo el mundo.</p>
          </div>
        </div>

        {/* Landmarks section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-blue-800 kids-text mb-4">Lugares famosos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg text-gray-700">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-bold text-blue-800">🗽 Estatua de la Libertad</h3>
              <p>Símbolo de libertad y democracia ubicado en Nueva York.</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-bold text-blue-800">🏛️ Casa Blanca</h3>
              <p>Residencia oficial del Presidente en Washington D.C.</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-bold text-blue-800">🏞️ Gran Cañón</h3>
              <p>Una de las maravillas naturales más impresionantes del mundo.</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-bold text-blue-800">🌉 Puente Golden Gate</h3>
              <p>Icónico puente rojo que conecta San Francisco con Marin County.</p>
            </div>
          </div>
        </div>

        {/* Cultural section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-blue-800 kids-text mb-4">Cultura y tradiciones</h2>
          <div className="space-y-4 text-lg text-gray-700">
            <p>🍔 <strong>Comida rápida:</strong> Estados Unidos es famoso por inventar las hamburguesas, hot dogs y pizza al estilo americano.</p>
            <p>🏈 <strong>Deportes:</strong> El fútbol americano, baloncesto y béisbol son los deportes más populares.</p>
            <p>🎆 <strong>4 de Julio:</strong> Día de la Independencia, se celebra con fuegos artificiales y barbacoas.</p>
            <p>🎵 <strong>Música:</strong> Cuna del jazz, blues, rock and roll y hip-hop que influyeron al mundo entero.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EstadosUnidosPage;
