
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const EstadosUnidosPage = () => {
  const [returnGame, setReturnGame] = useState('/draw-game');

  useEffect(() => {
    // Check if coming from motorcycle game based on the referrer or localStorage
    const referrer = document.referrer;
    if (referrer.includes('motorcycle-game')) {
      setReturnGame('/motorcycle-game');
    } else {
      setReturnGame('/draw-game');
    }

    // Check if localStorage has info about which game we came from
    const navigatingBack = sessionStorage.getItem('navigatingBack');
    if (navigatingBack === 'car-game') {
      setReturnGame('/draw-game');
    } else if (navigatingBack === 'motorcycle-game') {
      setReturnGame('/motorcycle-game');
    }
  }, []);

  const handleNavigation = () => {
    // Store which game we're returning to
    if (returnGame === '/draw-game') {
      sessionStorage.setItem('navigatingBack', 'car-game');
    } else {
      sessionStorage.setItem('navigatingBack', 'motorcycle-game');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-blue-100 p-4 pt-0">
      <div className="max-w-md mx-auto">
        {/* Back button and title at top */}
        <div className="sticky top-0 z-10 bg-gradient-to-b from-purple-100 to-purple-100/95 pt-2 pb-2">
          <Link to={returnGame}>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleNavigation}
              className="mb-4 bg-blue-700/90 hover:bg-blue-800 text-white border-blue-600"
            >
              <ArrowLeft className="w-4 h-4 mr-1" /> Volver al juego
            </Button>
          </Link>
          
          {/* Country title moved to top */}
          <h1 className="text-3xl font-normal kids-text flex items-center mb-2">
            Estados Unidos 🇺🇸
          </h1>
          <p className="text-gray-600 kids-text">Capital: Washington D.C.</p>
        </div>
        
        <motion.div 
          className="bg-white rounded-lg shadow-lg overflow-hidden mt-2" 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
        >
          <motion.img 
            src="/lovable-uploads/10737802-ed6b-48c7-a4af-7df7deb120be.png" 
            alt="Empire State Building, Nueva York"
            className="w-full h-48 object-cover"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1 }}
          />
          
          <div className="p-6">
            {/* Country description */}
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
              <h3 className="text-xl font-normal text-purple-800 kids-text mb-2 flex items-center">
                <motion.span 
                  className="mr-2"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🌍
                </motion.span>
                Acerca de Estados Unidos
              </h3>
              <p className="kids-text text-fuchsia-600 text-lg font-normal">
                Estados Unidos es el tercer país más grande del mundo y uno de los más diversos culturalmente. 
                Desde los rascacielos de Nueva York hasta las playas de California, ofrece paisajes variados y 
                algunas de las ciudades más famosas del mundo.
              </p>
            </div>
            
            {/* Fun fact */}
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
              <h3 className="text-xl font-normal text-purple-800 kids-text mb-2 flex items-center">
                <motion.span 
                  className="mr-2"
                  animate={{ rotate: [0, 10, 0, -10, 0], scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🌟
                </motion.span>
                ¡Dato curioso!
              </h3>
              <p className="kids-text text-fuchsia-600 text-lg font-normal">
                ¡Estados Unidos tiene 63 parques nacionales que protegen paisajes increíbles!
              </p>
            </div>
            
            {/* Language */}
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
              <h3 className="text-xl font-normal text-purple-800 kids-text mb-2 flex items-center">
                <motion.span 
                  className="mr-2"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🗣️
                </motion.span>
                Idioma
              </h3>
              <p className="kids-text text-fuchsia-600 text-lg font-normal">
                En Estados Unidos se habla inglés.
              </p>
            </div>
            
            {/* Famous for */}
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
              <h3 className="text-xl font-normal text-purple-800 kids-text mb-2 flex items-center">
                <motion.span 
                  className="mr-2"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ⭐
                </motion.span>
                Famoso por
              </h3>
              <p className="kids-text text-fuchsia-600 text-lg font-normal">
                Estados Unidos es famoso por Hollywood, los rascacielos y la Estatua de la Libertad.
              </p>
            </div>
            
            <Link to={returnGame}>
              <Button 
                className="w-full mt-4 bg-game-purple hover:bg-game-purple/90 kids-text" 
                onClick={handleNavigation}
              >
                Volver al juego
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EstadosUnidosPage;
