
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useGame } from "@/context/GameContext";
import { Progress } from "@/components/ui/progress";
import { Globe } from "lucide-react";

// Function to get flag emoji based on level
const getLevelFlag = (level: number) => {
  switch (level) {
    case 0:
      return "🇪🇸";
    case 1:
      return "🇫🇷";
    case 2:
      return "🇮🇹";
    case 3:
      return "🇷🇺";
    case 4:
      return "🇯🇵";
    case 5:
      return "🇦🇺";
    case 6:
      return "🇺🇸";
    case 7:
      return "🇲🇽";
    case 8:
      return "🇵🇪";
    case 9:
      return "🇦🇷";
    case 10:
      return "🇪🇸";
    default:
      return "🇪🇸";
  }
};

const WorldTourProgress: React.FC = () => {
  const { level } = useGame();
  const [animatingLevel, setAnimatingLevel] = useState(0);
  
  // Animation loop for progress bar
  useEffect(() => {
    // Start animation from 0
    setAnimatingLevel(0);
    
    // Create animation loop
    const animationInterval = setInterval(() => {
      setAnimatingLevel(prev => {
        if (prev >= level) {
          return 0; // Reset to 0 to create a loop
        }
        return prev + 1;
      });
    }, 1000); // 1 second between each level increment
    
    return () => clearInterval(animationInterval);
  }, [level]);
  
  return (
    <motion.div 
      className={`w-full p-4 rounded-lg shadow-lg ${level >= 10 ? 'bg-gradient-to-r from-yellow-100 to-amber-100' : 'bg-purple-100'}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h3 className="text-xl text-center text-purple-800 kids-text mb-3 flex items-center justify-center">
        <Globe className="h-5 w-5 text-blue-600 mr-2" />
        Progreso de tu vuelta al mundo
        <Globe className="h-5 w-5 text-blue-600 ml-2" />
      </h3>
      
      <div className="relative pt-4 pb-8">
        <motion.div 
          className="w-full"
          animate={{ opacity: [1, 0.7, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Progress 
            value={animatingLevel / 10 * 100} 
            className={`h-4 ${level >= 10 ? 'bg-amber-200' : ''}`} 
          />
        </motion.div>
        
        {/* Country markers on progress bar */}
        <div className="absolute top-0 left-0 w-full flex justify-between px-1">
          {[...Array(11)].map((_, i) => (
            <div key={i} className="relative flex flex-col items-center">
              <div className={`w-3 h-3 rounded-full ${animatingLevel >= i ? 'bg-green-500' : 'bg-gray-300'}`} />
              <div 
                className="absolute top-4 transform -translate-x-1/2" 
                style={{ left: '50%' }}
              >
                <motion.span 
                  className="text-xs"
                  animate={{
                    scale: animatingLevel === i ? [1, 1.3, 1] : 1
                  }}
                  transition={{ duration: 0.5 }}
                >
                  {getLevelFlag(i)}
                </motion.span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-between text-xs text-purple-700 mt-6">
          <span>Inicio en Madrid</span>
          <span>¡Vuelta al mundo completada!</span>
        </div>
      </div>
    </motion.div>
  );
};

export default WorldTourProgress;
