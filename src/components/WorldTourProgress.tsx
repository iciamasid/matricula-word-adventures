
import React, { useState, useEffect } from 'react';
import { useGame } from '@/context/GameContext';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

// Function to get the flag emoji based on level
const getLevelFlag = (level: number) => {
  switch (level) {
    case 1: return "🇫🇷"; // Francia
    case 2: return "🇮🇹"; // Italia
    case 3: return "🇷🇺"; // Rusia
    case 4: return "🇯🇵"; // Japón
    case 5: return "🇦🇺"; // Australia
    case 6: return "🇺🇸"; // Estados Unidos
    case 7: return "🇲🇽"; // México
    case 8: return "🇵🇪"; // Perú
    case 9: return "🇦🇷"; // Argentina
    case 10: return "🇪🇸"; // España de vuelta
    default: return "🇪🇸"; // España
  }
};

const WorldTourProgress = () => {
  const { level } = useGame();
  const { t, isEnglish } = useLanguage();
  const [animatingLevel, setAnimatingLevel] = useState(0);
  const [isLooping, setIsLooping] = useState(false);

  // Animation for level progress with looping effect
  useEffect(() => {
    const startAnimation = () => {
      setAnimatingLevel(0);
      
      const interval = setInterval(() => {
        setAnimatingLevel(prev => {
          const nextLevel = prev + 1;
          if (nextLevel > level) {
            setTimeout(() => {
              setAnimatingLevel(0); // Reset to start the animation again
            }, 1500); // Pause at the end before restarting
            clearInterval(interval);
            return level;
          }
          return nextLevel;
        });
      }, 500); // 500ms between each level increment
      
      return interval;
    };
    
    // Start the animation initially
    let interval = startAnimation();
    setIsLooping(true);
    
    // Set up the loop
    const loopTimer = setInterval(() => {
      clearInterval(interval);
      interval = startAnimation();
    }, (level + 1) * 500 + 2000); // Total animation time plus pause
    
    return () => {
      clearInterval(interval);
      clearInterval(loopTimer);
    };
  }, [level]);

  // Set background color based on language
  const bgColor = isEnglish ? "bg-orange-100" : "bg-purple-100";
  const textColor = isEnglish ? "text-orange-800" : "text-purple-800";
  const subtextColor = isEnglish ? "text-orange-700" : "text-purple-700";
  
  return (
    <motion.div 
      className={`w-full p-4 rounded-lg shadow-lg ${bgColor}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <h3 className={`text-xl text-center ${textColor} kids-text mb-3`}>{t('world_tour_progress')}</h3>
      <div className="relative pt-4 pb-8">
        <Progress 
          value={animatingLevel / 10 * 100} 
          className={`h-4 ${level >= 10 ? 'bg-amber-200' : ''}`} 
        />
        
        {/* Country markers on progress bar */}
        <div className="absolute top-0 left-0 w-full flex justify-between px-1">
          {[...Array(11)].map((_, i) => (
            <div key={i} className="relative flex flex-col items-center">
              <motion.div 
                className={`w-3 h-3 rounded-full ${animatingLevel >= i ? 'bg-green-500' : 'bg-gray-300'}`}
                animate={{ scale: animatingLevel === i ? [1, 1.3, 1] : 1 }}
                transition={{ duration: 0.5 }}
              />
              <div 
                className="absolute top-4 transform -translate-x-1/2" 
                style={{ left: '50%' }}
              >
                <motion.span 
                  className="text-xs"
                  animate={{ 
                    scale: animatingLevel === i ? [1, 1.3, 1] : 1,
                    y: animatingLevel === i ? [0, -3, 0] : 0
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
          <span>{t('start_madrid')}</span>
          <span>{t('world_tour_complete')}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default WorldTourProgress;
