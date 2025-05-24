import React, { useState, useEffect } from 'react';
import { GameProvider } from '@/context/GameContext';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import DrawPathGame from '@/components/games/DrawPathGame';
import MotorcycleGameInstructions from '@/components/MotorcycleGameInstructions';
import { Toaster } from '@/components/ui/toaster';

const MotorcycleDriveGamePage = () => {
  return (
    <GameProvider>
      <MotorcycleDriveGameContent />
    </GameProvider>
  );
};

const MotorcycleDriveGameContent = () => {
  const [showInstructions, setShowInstructions] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Ensure page starts from top when loading
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handle errors from the game
  const handleError = (message: string) => {
    setError(message);
    setTimeout(() => setError(null), 5000);
  };

  // Handle help
  const handleHelp = () => {
    setShowInstructions(true);
  };

  // Using sessionStorage to mark when we're navigating between pages
  const handleNavigation = () => {
    sessionStorage.setItem('navigatingBack', 'motorcycle-game');
  };

  return (
    <div 
      className="min-h-screen flex flex-col items-center relative overflow-hidden bg-teal-100"
      style={{
        backgroundSize: "cover",
        backgroundAttachment: "fixed"
      }}
    >
      {/* Navigation buttons */}
      <div className="w-full pt-12 px-4">
        <Link to="/motorcycle-game" onClick={handleNavigation}>
          <Button 
            variant="outline" 
            size="sm" 
            className="absolute top-2 left-4 bg-teal-700/90 hover:bg-teal-800 text-white border-teal-600 kids-text text-base font-normal"
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> Volver a motos
          </Button>
        </Link>
        
        {/* Instructions button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowInstructions(true)}
          className="absolute top-2 right-4 bg-teal-100/90 hover:bg-teal-200 text-teal-900 border-teal-300 kids-text text-base font-normal"
        >
          <HelpCircle className="w-4 h-4 mr-1" /> Ayuda
        </Button>
      </div>

      {/* Game title */}
      <motion.div
        className="text-center mt-8 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold text-teal-800 kids-text mb-2">
          ¡Conduce tu Moto!
        </h1>
        <p className="text-teal-700 kids-text text-lg">
          Dibuja el camino y conduce hasta tu destino
        </p>
      </motion.div>

      {/* Game container */}
      <motion.div
        className="w-full max-w-2xl px-4 mb-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <DrawPathGame 
          onError={handleError}
          onHelp={handleHelp}
        />
      </motion.div>

      {/* Error display */}
      {error && (
        <motion.div
          className="fixed bottom-4 right-4 bg-red-500 text-white p-4 rounded-lg shadow-lg z-50"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
        >
          {error}
        </motion.div>
      )}

      {/* Instructions modal - Updated to use MotorcycleGameInstructions */}
      {showInstructions && (
        <MotorcycleGameInstructions onClose={() => setShowInstructions(false)} />
      )}

      <Toaster />
    </div>
  );
};

export default MotorcycleDriveGamePage;
