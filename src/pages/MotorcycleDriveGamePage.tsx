
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, AlertCircle, HelpCircle, X, Bike } from "lucide-react";
import { Link } from "react-router-dom";
import DrawPathGame from "@/components/games/DrawPathGame";
import { Toaster } from "@/components/ui/toaster";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { useGame, GameProvider } from "@/context/GameContext";
import MotorcycleCustomization from "@/components/MotorcycleCustomization";
import { ScrollArea } from "@/components/ui/scroll-area";

// Wrapped content component that uses useGame hook
const MotorcycleDriveGameContent: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [showHelp, setShowHelp] = useState<boolean>(false);
  const [showMotorcycleSelection, setShowMotorcycleSelection] = useState<boolean>(false);
  const {
    toast
  } = useToast();
  const {
    selectedCarColor
  } = useGame();

  // Determine styling for motorcycle page (teal/turquoise theme)
  const bgColor = "bg-teal-100";
  const textColor = "text-teal-900";
  const panelBg = "bg-teal-100";
  const buttonBg = "bg-teal-600 hover:bg-teal-700";

  // Log when component mounts to help with debugging
  useEffect(() => {
    console.log("MotorcycleDriveGamePage mounted");
    // Scroll to top when page loads to ensure title is visible
    window.scrollTo(0, 0);
    // Set session storage flag for navigation
    return () => {
      console.log("MotorcycleDriveGamePage unmounted");
      sessionStorage.setItem('navigatingBack', 'true');
    };
  }, []);

  // Clear error after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  // Function to handle errors from the DrawPathGame component
  const handleError = (errorMessage: string) => {
    setError(errorMessage);
    toast({
      title: "Error",
      description: errorMessage,
      variant: "destructive"
    });
  };

  return (
    <div className={`min-h-screen flex flex-col items-center px-4 pt-3 pb-20 relative overflow-hidden ${bgColor}`}>
      <motion.div
        className="w-full max-w-3xl flex flex-col items-center gap-4"
        initial={{
          opacity: 0
        }}
        animate={{
          opacity: 1
        }}
        transition={{
          duration: 0.5
        }}
      >
        {/* Header with title taking full width */}
        <div className="w-full mb-2">
          <motion.h1
            animate={{
              scale: [1, 1.05, 1],
              transition: {
                repeat: Infinity,
                duration: 2
              }
            }}
            className={`kids-text ${textColor} text-3xl font-medium text-center whitespace-nowrap w-full`}
          >
            Conduce tu moto al destino
          </motion.h1>
        </div>
        
        {/* Help and Motorcycle Selection buttons now below title */}
        <div className="w-full flex justify-center gap-4 mb-3">
          <Button 
            variant="outline" 
            onClick={() => setShowHelp(true)} 
            className="text-white kids-text bg-transparent bg-teal-600 hover:bg-teal-700"
          >
            <HelpCircle className="mr-2 h-5 w-5" /> Ayuda
          </Button>
        </div>
        
        {/* Motorcycle selection panel */}
        <AnimatePresence>
          {showMotorcycleSelection && (
            <motion.div
              className="w-full"
              initial={{
                opacity: 0,
                height: 0
              }}
              animate={{
                opacity: 1,
                height: 'auto'
              }}
              exit={{
                opacity: 0,
                height: 0
              }}
              transition={{
                duration: 0.3
              }}
            >
              <div className={`w-full ${panelBg} rounded-lg p-4 shadow-md mb-3`}>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-medium kids-text text-teal-700 flex items-center">
                    <Bike className="mr-2 h-5 w-5" />
                  </h3>
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    onClick={() => setShowMotorcycleSelection(false)} 
                    className="h-7 w-7"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <MotorcycleCustomization />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Game Components - Speed Control and Draw Controls */}
        <motion.div
          className="w-full"
          initial={{
            y: 20,
            opacity: 0
          }}
          animate={{
            y: 0,
            opacity: 1
          }}
          transition={{
            delay: 0.2
          }}
        >
          <DrawPathGame onError={handleError} onHelp={() => setShowHelp(true)} />
        </motion.div>
        
        {/* Error Display */}
        {error && (
          <motion.div
            initial={{
              opacity: 0,
              y: -20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            exit={{
              opacity: 0,
              y: -20
            }}
            className="w-full"
          >
            <Alert variant="destructive" className="border-red-500 bg-red-100">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </motion.div>
        )}
        
        {/* Motorcycle type indicator */}
        {selectedCarColor && (
          <div className="w-full flex justify-center items-center">
            
          </div>
        )}
      </motion.div>
      
      {/* Help Instructions Modal */}
      <AnimatePresence>
        {showHelp && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
            initial={{
              opacity: 0
            }}
            animate={{
              opacity: 1
            }}
            exit={{
              opacity: 0
            }}
            onClick={() => setShowHelp(false)}
          >
            <motion.div
              className="bg-white rounded-xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto relative"
              initial={{
                scale: 0.9,
                y: 20
              }}
              animate={{
                scale: 1,
                y: 0
              }}
              exit={{
                scale: 0.9,
                y: 20
              }}
              onClick={e => e.stopPropagation()}
            >
              <button 
                className="absolute top-3 right-3 text-gray-600 hover:text-gray-900" 
                onClick={() => setShowHelp(false)}
              >
                <X className="h-6 w-6" />
              </button>
              
              <h2 className="text-2xl font-bold text-teal-800 kids-text mb-4 flex items-center gap-2">
                <HelpCircle className="h-7 w-7 text-teal-600" />
                Cómo jugar
              </h2>
              
              <ol className="list-decimal list-inside space-y-4 text-teal-900 kids-text">
                <li className="flex items-start gap-2">
                  <div className="bg-green-100 rounded-full p-1 mt-1 flex-shrink-0">1</div>
                  <div>
                    <span className="font-bold">Presiona el botón <span className="bg-green-100 px-2 py-1 rounded">Dibujar</span></span>
                    <p className="text-sm text-teal-700">Dibuja el camino por donde quieres que vaya tu moto.</p>
                  </div>
                </li>
                
                <li className="flex items-start gap-2">
                  <div className="bg-green-100 rounded-full p-1 mt-1 flex-shrink-0">2</div>
                  <div>
                    <span className="font-bold">Dibuja el camino en el mapa</span>
                    <p className="text-sm text-teal-700">Usa tu dedo o ratón para trazar la ruta desde España hasta el destino.</p>
                  </div>
                </li>
                
                <li className="flex items-start gap-2">
                  <div className="bg-green-100 rounded-full p-1 mt-1 flex-shrink-0">3</div>
                  <div>
                    <span className="font-bold">Presiona <span className="bg-cyan-100 px-2 py-1 rounded">Conducir</span></span>
                    <p className="text-sm text-teal-700">Tu moto seguirá el camino que dibujaste.</p>
                  </div>
                </li>
                
                <li className="flex items-start gap-2">
                  <div className="bg-green-100 rounded-full p-1 mt-1 flex-shrink-0">4</div>
                  <div>
                    <span className="font-bold">¡Llega al destino!</span>
                    <p className="text-sm text-teal-700">Si tu moto llega al país correcto, ganarás puntos.</p>
                  </div>
                </li>
              </ol>
              
              <div className="mt-6 pt-4 border-t border-gray-200">
                <Button 
                  className={`w-full ${buttonBg} text-white kids-text text-xl py-6`} 
                  onClick={() => setShowHelp(false)}
                >
                  Entendido
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <Toaster />
    </div>
  );
};

// Main component wrapped in GameProvider
const MotorcycleDriveGamePage: React.FC = () => {
  return (
    <GameProvider>
      <ScrollArea className="h-[100dvh]">
        <MotorcycleDriveGameContent />
      </ScrollArea>
    </GameProvider>
  );
};

export default MotorcycleDriveGamePage;
