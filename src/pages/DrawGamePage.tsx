
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import DrawPathGame from "@/components/games/DrawPathGame";
import { Toaster } from "@/components/ui/toaster";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

const DrawGamePage: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  // Log when component mounts to help with debugging
  useEffect(() => {
    console.log("DrawGamePage mounted");
    return () => console.log("DrawGamePage unmounted");
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
    <div 
      className="min-h-screen flex flex-col items-center px-4 py-6 relative overflow-hidden"
      style={{
        backgroundColor: "#bba7ca",
        backgroundSize: "cover",
        backgroundAttachment: "fixed"
      }}
    >
      <motion.div 
        className="w-full max-w-3xl flex flex-col items-center gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="w-full flex justify-between items-center">
          <Link to="/">
            <Button variant="outline" className="bg-white/80 hover:bg-white">
              <ArrowLeft className="mr-2 h-5 w-5" /> Volver
            </Button>
          </Link>
          
          <h1 className="text-3xl font-bold kids-text text-white">Juego del Cochecito</h1>
          
          <div className="w-[100px]"></div> {/* Empty div for layout balance */}
        </div>
        
        {/* Error Display */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full"
          >
            <Alert variant="destructive" className="border-red-500 bg-red-100">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </motion.div>
        )}
        
        {/* Game Instructions - Updated with clearer instructions */}
        <motion.div 
          className="bg-white/90 rounded-lg p-5 w-full shadow-lg"
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-purple-800 kids-text mb-3">¿Cómo jugar?</h2>
          <ol className="list-decimal list-inside space-y-2 text-purple-900 kids-text">
            <li>Primero, haz clic en el botón <span className="font-bold bg-green-100 px-2 py-1 rounded">Dibujar Camino</span></li>
            <li>Luego, mantén presionado y mueve tu dedo o ratón para dibujar un camino</li>
            <li>Cuando termines de dibujar, pulsa el botón <span className="font-bold bg-cyan-100 px-2 py-1 rounded">Jugar</span></li>
            <li>¡Mira cómo el cochecito sigue tu camino!</li>
          </ol>
          <div className="mt-3 bg-yellow-100 p-2 rounded-md">
            <p className="text-amber-700 text-sm font-medium">
              Importante: Dibuja líneas continuas y no muy rápido para mejores resultados.
            </p>
          </div>
        </motion.div>
        
        {/* Game Component */}
        <motion.div 
          className="w-full"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <DrawPathGame onError={handleError} />
        </motion.div>
        
        {/* Fun Fact */}
        <motion.div 
          className="bg-purple-100/90 border-2 border-purple-300 rounded-lg p-4 w-full shadow-lg"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="text-lg font-bold text-purple-800 kids-text">¿Sabías que...?</h3>
          <p className="text-purple-700 kids-text">
            Los coches siguen caminos programados en muchos juegos y aplicaciones. 
            ¡Lo que acabas de hacer es similar a cómo los ingenieros programan vehículos autónomos!
          </p>
        </motion.div>
      </motion.div>
      
      <Toaster />
    </div>
  );
};

export default DrawGamePage;
