
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useGame } from "@/context/GameContext";
import { useIsMobile } from "@/hooks/use-mobile";

const LicensePlate: React.FC = () => {
  const { licensePlate, plateConsonants } = useGame();
  const isMobile = useIsMobile();
  
  const [displayPlate, setDisplayPlate] = useState("");
  const [isAnimating, setIsAnimating] = useState(true);
  
  // Efecto para animar las letras y números estilo máquina tragaperras
  useEffect(() => {
    if (!licensePlate) return;
    
    setIsAnimating(true);
    
    const characters = "0123456789BCDFGHJKLMNPQRSTVWXYZ";
    const plateLength = licensePlate.length;
    let iteration = 0;
    let intervalId: NodeJS.Timeout;
    
    const animate = () => {
      intervalId = setInterval(() => {
        setDisplayPlate(prev => {
          const result = licensePlate.split("")
            .map((char, index) => {
              if (index < iteration / 3) {
                return licensePlate[index];
              }
              return characters[Math.floor(Math.random() * characters.length)];
            })
            .join("");
            
          if (iteration > plateLength * 3) {
            clearInterval(intervalId);
            setIsAnimating(false);
            return licensePlate;
          }
          
          iteration += 1;
          return result;
        });
      }, 50);
    };
    
    animate();
    
    return () => clearInterval(intervalId);
  }, [licensePlate]);
  
  const numbers = displayPlate.substring(0, 4) || "0000";
  const letters = displayPlate.substring(4) || "XXX";

  return (
    <motion.div
      className="flex flex-col items-center w-full gap-2 mb-2"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <div className="license-plate py-3 px-5 rounded-md shadow-md w-full max-w-xs mx-auto relative">
        {/* EU flag - centered vertically */}
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex flex-col items-center">
          <div className="bg-blue-600 rounded-sm flex items-center justify-center w-8 h-6 mb-1">
            <div className="text-yellow-300 text-xs flex justify-center items-center">
              <motion.span 
                animate={{ 
                  rotateY: [0, 360],
                  scale: [1, 1.2, 1] 
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  repeatDelay: 5 
                }}
                className="flex"
              >
                ★★★★★
              </motion.span>
            </div>
          </div>
          <div className="text-[8px] font-bold text-center text-gray-600">E</div>
        </div>
        
        <div className="flex justify-center items-center ml-8">
          <div className="text-center">
            <motion.span 
              className={`text-gray-800 ${isMobile ? "text-5xl" : "text-6xl"} font-bold tracking-wider kids-text`}
              animate={isAnimating ? { y: [0, -2, 0, 2, 0] } : {}}
              transition={{ repeat: Infinity, duration: 0.3 }}
            >
              {numbers}
            </motion.span>
            <motion.span 
              className={`text-purple-700 ml-2 ${isMobile ? "text-5xl" : "text-6xl"} font-bold tracking-wider kids-text`}
              animate={isAnimating ? { y: [0, -2, 0, 2, 0] } : {}}
              transition={{ repeat: Infinity, duration: 0.3, delay: 0.1 }}
            >
              {letters}
            </motion.span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LicensePlate;
