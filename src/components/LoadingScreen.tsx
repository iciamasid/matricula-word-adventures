
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Progress } from "@/components/ui/progress";

interface LoadingScreenProps {
  onLoadComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadComplete }) => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    // Simular una carga progresiva durante 3 segundos
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + (100/30); // Incrementamos aproximadamente cada 100ms para llegar a 100 en 3000ms
        
        if (newProgress >= 100) {
          clearInterval(interval);
          // Pequeño retraso para mostrar el 100% antes de completar
          setTimeout(() => {
            onLoadComplete();
          }, 200);
          return 100;
        }
        
        return newProgress;
      });
    }, 100);

    // Asegurarnos de limpiar el intervalo si el componente se desmonta
    return () => clearInterval(interval);
  }, [onLoadComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm z-50"
    >
      <motion.div 
        className="max-w-md w-full px-4 flex flex-col items-center"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <img 
          src="/lovable-uploads/9e7f018b-48ce-4158-acf0-ddcc7e2b4804.png" 
          alt="Matriculabra Cadabra" 
          className="w-full max-h-60 object-contain mb-8"
        />
        
        <div className="w-full space-y-3">
          <Progress value={progress} className="h-3 bg-purple-200" />
          <p className="text-center text-white kids-text text-xl">
            {progress < 100 ? "Cargando el juego..." : "¡Listo!"}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LoadingScreen;
