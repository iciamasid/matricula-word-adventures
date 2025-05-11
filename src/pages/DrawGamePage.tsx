import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, AlertCircle, HelpCircle, X, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import DrawPathGame from "@/components/games/DrawPathGame";
import { Toaster } from "@/components/ui/toaster";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { useGame, GameProvider } from "@/context/GameContext";

// Wrapped content component that uses useGame hook
const DrawGameContent: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [showHelp, setShowHelp] = useState<boolean>(false);
  const {
    toast
  } = useToast();
  const {
    originInfo,
    destinationInfo
  } = useGame();

  // Log when component mounts to help with debugging
  useEffect(() => {
    console.log("DrawGamePage mounted");
    // Set session storage flag for navigation
    return () => {
      console.log("DrawGamePage unmounted");
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
  return <div className="min-h-screen flex flex-col items-center px-4 pt-3 pb-20 relative overflow-hidden" style={{
    backgroundColor: "#bba7ca",
    backgroundSize: "cover",
    backgroundAttachment: "fixed"
  }}>
      <motion.div className="w-full max-w-3xl flex flex-col items-center gap-4" initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} transition={{
      duration: 0.5
    }}>
        {/* Header with Help button positioned at top right */}
        <div className="w-full flex justify-between items-center mb-2">
          <motion.h1 animate={{
          scale: [1, 1.05, 1],
          transition: {
            repeat: Infinity,
            duration: 2
          }
        }} className="kids-text text-fuchsia-900 text-3xl font-medium">Conduce al país destino</motion.h1>
          
          <div className="flex items-center gap-2">
            <Link to="/">
              
            </Link>
            
            <Button variant="outline" onClick={() => setShowHelp(true)} className="text-white kids-text bg-transparent">
              <HelpCircle className="mr-2 h-5 w-5" /> Ayuda
            </Button>
          </div>
        </div>
        
        {/* Origin and Destination with route visualization */}
        <div className="w-full bg-purple-100 rounded-lg p-4 shadow-md">
          <div className="grid grid-cols-5 items-center">
            {/* Origin */}
            <div className="col-span-2 text-center">
              <motion.div className="flex flex-col items-center" initial={{
              opacity: 0,
              x: -20
            }} animate={{
              opacity: 1,
              x: 0
            }} transition={{
              delay: 0.3
            }}>
                <motion.span className="text-7xl mb-2" animate={{
                rotate: [0, 10, -10, 0],
                transition: {
                  duration: 2,
                  repeat: Infinity
                }
              }}>
                  {originInfo.flag}
                </motion.span>
                <p className="text-xl font-bold text-purple-900 kids-text">{originInfo.city}</p>
                <p className="text-lg text-purple-700 kids-text">{originInfo.country}</p>
                <p className="text-base text-purple-600 kids-text">ORIGEN</p>
              </motion.div>
            </div>
            
            {/* Arrow */}
            <div className="col-span-1 flex justify-center">
              <motion.div animate={{
              x: [0, 10, 0],
              transition: {
                duration: 1.5,
                repeat: Infinity
              }
            }}>
                <ArrowRight className="h-12 w-12 text-purple-700" />
              </motion.div>
            </div>
            
            {/* Destination */}
            <div className="col-span-2 text-center">
              <motion.div className="flex flex-col items-center" initial={{
              opacity: 0,
              x: 20
            }} animate={{
              opacity: 1,
              x: 0
            }} transition={{
              delay: 0.3
            }}>
                <motion.span className="text-7xl mb-2" animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1],
                transition: {
                  duration: 2,
                  repeat: Infinity
                }
              }}>
                  {destinationInfo.flag}
                </motion.span>
                <p className="text-xl font-bold text-purple-900 kids-text">{destinationInfo.city}</p>
                <p className="text-lg text-purple-700 kids-text">{destinationInfo.country}</p>
                <p className="text-base text-purple-600 kids-text">DESTINO</p>
              </motion.div>
            </div>
          </div>
        </div>
        
        {/* Error Display */}
        {error && <motion.div initial={{
        opacity: 0,
        y: -20
      }} animate={{
        opacity: 1,
        y: 0
      }} exit={{
        opacity: 0,
        y: -20
      }} className="w-full">
            <Alert variant="destructive" className="border-red-500 bg-red-100">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </motion.div>}
        
        {/* Game Component */}
        <motion.div className="w-full" initial={{
        y: 20,
        opacity: 0
      }} animate={{
        y: 0,
        opacity: 1
      }} transition={{
        delay: 0.2
      }}>
          <DrawPathGame onError={handleError} onHelp={() => setShowHelp(true)} />
        </motion.div>
      </motion.div>
      
      {/* Help Instructions Modal */}
      <AnimatePresence>
        {showHelp && <motion.div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} onClick={() => setShowHelp(false)}>
            <motion.div className="bg-white rounded-xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto relative" initial={{
          scale: 0.9,
          y: 20
        }} animate={{
          scale: 1,
          y: 0
        }} exit={{
          scale: 0.9,
          y: 20
        }} onClick={e => e.stopPropagation()}>
              <button className="absolute top-3 right-3 text-gray-600 hover:text-gray-900" onClick={() => setShowHelp(false)}>
                <X className="h-6 w-6" />
              </button>
              
              <h2 className="text-2xl font-bold text-purple-800 kids-text mb-4 flex items-center gap-2">
                <HelpCircle className="h-7 w-7 text-purple-600" />
                ¿Cómo jugar?
              </h2>
              
              <ol className="list-decimal list-inside space-y-4 text-purple-900 kids-text">
                <li className="flex items-start gap-2">
                  <div className="bg-green-100 rounded-full p-1 mt-1 flex-shrink-0">1</div>
                  <div>
                    <span className="font-bold">Haz clic en el botón <span className="bg-green-100 px-2 py-1 rounded">Dibujar</span></span>
                    <p className="text-sm text-purple-700">Esto activará el modo de dibujo</p>
                  </div>
                </li>
                
                <li className="flex items-start gap-2">
                  <div className="bg-green-100 rounded-full p-1 mt-1 flex-shrink-0">2</div>
                  <div>
                    <span className="font-bold">Dibuja un camino en el tablero</span>
                    <p className="text-sm text-purple-700">Mantén pulsado y mueve el dedo o ratón para dibujar</p>
                  </div>
                </li>
                
                <li className="flex items-start gap-2">
                  <div className="bg-green-100 rounded-full p-1 mt-1 flex-shrink-0">3</div>
                  <div>
                    <span className="font-bold">Haz clic en <span className="bg-cyan-100 px-2 py-1 rounded">Conducir</span></span>
                    <p className="text-sm text-purple-700">El coche seguirá exactamente el camino que dibujaste</p>
                  </div>
                </li>
                
                <li className="flex items-start gap-2">
                  <div className="bg-green-100 rounded-full p-1 mt-1 flex-shrink-0">4</div>
                  <div>
                    <span className="font-bold">Ajusta la velocidad con el control deslizante</span>
                    <p className="text-sm text-purple-700">Más lento o más rápido según prefieras</p>
                  </div>
                </li>
              </ol>
              
              <div className="mt-6 pt-4 border-t border-gray-200">
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white kids-text text-xl py-6" onClick={() => setShowHelp(false)}>
                  ¡Entendido!
                </Button>
              </div>
            </motion.div>
          </motion.div>}
      </AnimatePresence>
      
      <Toaster />
    </div>;
};

// Main component wrapped in GameProvider
const DrawGamePage: React.FC = () => {
  return <GameProvider>
      <DrawGameContent />
    </GameProvider>;
};
export default DrawGamePage;