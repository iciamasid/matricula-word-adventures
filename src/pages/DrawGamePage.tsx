
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import DrawPathGame from "@/components/games/DrawPathGame";
import { Toaster } from "@/components/ui/toaster";

const DrawGamePage: React.FC = () => {
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
        
        {/* Game Instructions */}
        <motion.div 
          className="bg-white/90 rounded-lg p-5 w-full shadow-lg"
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-purple-800 kids-text mb-3">¿Cómo jugar?</h2>
          <ol className="list-decimal list-inside space-y-2 text-purple-900 kids-text">
            <li>Haz clic en <span className="font-bold">Dibujar Camino</span> para activar el modo dibujo</li>
            <li>Dibuja un camino con tu dedo o el ratón en la zona de dibujo</li>
            <li>Pulsa el botón de <span className="font-bold">Jugar</span></li>
            <li>¡Mira cómo el cochecito sigue tu camino!</li>
          </ol>
        </motion.div>
        
        {/* Game Component */}
        <motion.div 
          className="w-full"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <DrawPathGame />
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
