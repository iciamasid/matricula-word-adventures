
import React, { useState, useEffect } from 'react';
import { useGame } from '@/context/GameContext';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

// Function to get the flag emoji based on level
const getLevelFlag = (level: number) => {
  switch (level) {
    case 1: return "🇪🇸"; // Origen España
    case 2: return "🇫🇷"; // Origen Francia
    case 3: return "🇮🇹"; // Origen Italia
    case 4: return "🇷🇺"; // Origen Rusia
    case 5: return "🇯🇵"; // Origen Japón
    case 6: return "🇦🇺"; // Origen Australia
    case 7: return "🇺🇸"; // Origen EEUU
    case 8: return "🇲🇽"; // Origen México
    case 9: return "🇵🇪"; // Origen Perú
    case 10: return "🇦🇷"; // Origen Argentina
    case 11: return "🇪🇸"; // Vuelta a España
    default: return "🇪🇸"; // Default España
  }
};

const WorldTourProgress = () => {
  const { level } = useGame();
  const { t, isEnglish } = useLanguage();
  const [animatingLevel, setAnimatingLevel] = useState(0);
  const [progressValue, setProgressValue] = useState(0);
  const [isLooping, setIsLooping] = useState(false);

  // Animation for level progress with looping effect
  useEffect(() => {
    const startAnimation = () => {
      setAnimatingLevel(0);
      setProgressValue(0);
      
      // Animate progress bar from 0 to current level
      const totalSteps = 100;
      const targetValue = (level - 1) / 10 * 100;
      let step = 0;
      
      const interval = setInterval(() => {
        step++;
        // Calculate progress as percentage of total steps
        const newProgress = (step / totalSteps) * targetValue;
        setProgressValue(newProgress);
        
        // Update current animating level based on progress
        const currentLevelBasedOnProgress = Math.ceil((newProgress / 100) * 10) + 1;
        setAnimatingLevel(Math.min(currentLevelBasedOnProgress, level));
        
        if (step >= totalSteps) {
          clearInterval(interval);
          // Pause at the end before restarting
          setTimeout(() => {
            startAnimation(); // Restart the animation
          }, 2000);
        }
      }, 30); // Smoother animation with more frequent updates
      
      return interval;
    };
    
    // Start the animation initially
    let interval = startAnimation();
    setIsLooping(true);
    
    return () => {
      clearInterval(interval);
    };
  }, [level]);

  // Set background color based on language
  const bgColor = isEnglish ? "bg-orange-100" : "bg-purple-100";
  const textColor = isEnglish ? "text-orange-800" : "text-purple-800";
  const subtextColor = isEnglish ? "text-orange-700" : "text-purple-700";
  
  // Get destination flag for current level
  const getDestinationFlag = (level: number) => {
    switch (level) {
      case 1: return "🇫🇷"; // Destino Francia
      case 2: return "🇮🇹"; // Destino Italia
      case 3: return "🇷🇺"; // Destino Rusia
      case 4: return "🇯🇵"; // Destino Japón
      case 5: return "🇦🇺"; // Destino Australia
      case 6: return "🇺🇸"; // Destino EEUU
      case 7: return "🇲🇽"; // Destino México
      case 8: return "🇵🇪"; // Destino Perú
      case 9: return "🇦🇷"; // Destino Argentina
      case 10: return "🇪🇸"; // Destino España (vuelta completa)
      default: return "🇫🇷"; // Default Francia
    }
  };
  
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
          value={progressValue} 
          className={`h-4 ${level >= 10 ? 'bg-amber-200' : ''}`} 
        />
        
        {/* Country markers on progress bar */}
        <div className="absolute top-0 left-0 w-full flex justify-between px-1">
          {[...Array(11)].map((_, i) => {
            // Adjust index to match level 1-11 (where 11 is completion)
            const levelIndex = i + 1;
            const flag = levelIndex <= 10 ? getLevelFlag(levelIndex) : "🇪🇸";
            
            return (
              <div key={i} className="relative flex flex-col items-center">
                <motion.div 
                  className={`w-3 h-3 rounded-full ${animatingLevel >= levelIndex ? 'bg-blue-500' : 'bg-gray-300'}`}
                  animate={{ scale: animatingLevel === levelIndex ? [1, 1.3, 1] : 1 }}
                  transition={{ duration: 0.5 }}
                />
                <div 
                  className="absolute top-4 transform -translate-x-1/2" 
                  style={{ left: '50%' }}
                >
                  <motion.span 
                    className="text-xs"
                    animate={{ 
                      scale: animatingLevel === levelIndex ? [1, 1.3, 1] : 1,
                      y: animatingLevel === levelIndex ? [0, -3, 0] : 0
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    {flag}
                  </motion.span>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="flex justify-between text-xs text-purple-700 mt-6">
          <span>{t('start_madrid')}</span>
          <span>{t('world_tour_complete')}</span>
        </div>
      </div>
      
      {/* Current destination indicator */}
      {level <= 10 && (
        <div className="mt-2 text-center">
          <span className={`text-sm ${subtextColor}`}>
            {isEnglish ? "Next destination:" : "Próximo destino:"} {getDestinationFlag(level)}
          </span>
        </div>
      )}
    </motion.div>
  );
};

export default WorldTourProgress;
