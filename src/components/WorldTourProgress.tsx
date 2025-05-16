
import React, { useState, useEffect } from 'react';
import { useGame } from '@/context/GameContext';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { Car, Plane } from 'lucide-react';

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

// Function to get country name based on level and language
const getCountryName = (level: number, isEnglish: boolean) => {
  switch (level) {
    case 1: return isEnglish ? "Spain" : "España";
    case 2: return isEnglish ? "France" : "Francia";
    case 3: return isEnglish ? "Italy" : "Italia";
    case 4: return isEnglish ? "Russia" : "Rusia";
    case 5: return isEnglish ? "Japan" : "Japón";
    case 6: return isEnglish ? "Australia" : "Australia";
    case 7: return isEnglish ? "United States" : "EEUU";
    case 8: return isEnglish ? "Mexico" : "México";
    case 9: return isEnglish ? "Peru" : "Perú";
    case 10: return isEnglish ? "Argentina" : "Argentina";
    case 11: return isEnglish ? "Spain (complete)" : "España (completo)";
    default: return isEnglish ? "Spain" : "España";
  }
};

const WorldTourProgress = () => {
  const { level } = useGame();
  const { t, isEnglish } = useLanguage();
  const [animatingLevel, setAnimatingLevel] = useState(0);
  const [progressValue, setProgressValue] = useState(0);
  const [hoveredCountry, setHoveredCountry] = useState<number | null>(null);
  
  // Set background color based on language
  const bgColor = isEnglish ? "bg-orange-100" : "bg-purple-100";
  const textColor = isEnglish ? "text-orange-800" : "text-purple-800";
  const subtextColor = isEnglish ? "text-orange-700/80" : "text-purple-700/80";
  const accentColor = isEnglish ? "bg-orange-400" : "bg-purple-400";
  const completedColor = isEnglish ? "bg-orange-500" : "bg-purple-500";

  // Modified animation to show path from Spain to current destination
  useEffect(() => {
    const targetValue = (level - 1) / 10 * 100;
    let animationActive = true;

    const runAnimation = async () => {
      while (animationActive) {
        // Always start from the beginning (Spain)
        setProgressValue(0);
        setAnimatingLevel(1);
        
        // Smoothly increase to target value
        for (let i = 0; i <= 100; i += 2) {
          if (!animationActive) break;
          
          const currentProgress = Math.min((i / 100) * targetValue, targetValue);
          setProgressValue(currentProgress);
          
          // Update current animating level based on progress
          const currentLevelBasedOnProgress = Math.ceil((currentProgress / 100) * 10) + 1;
          setAnimatingLevel(Math.min(currentLevelBasedOnProgress, level));
          
          // Slow down animation with a small delay
          await new Promise(resolve => setTimeout(resolve, 30));
        }
        
        // Hold at the target value for 3 seconds
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
    };
    
    runAnimation();
    
    return () => {
      animationActive = false;
    };
  }, [level]);
  
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

  // Function to determine X position based on index (for the S-curve)
  const getXPosition = (index: number) => {
    // First row (indices 0-5) goes left to right
    if (index <= 5) {
      return `${index * 20}%`;
    } 
    // Second row (indices 6-10) goes right to left
    else {
      const reverseIndex = 10 - (index % 6);
      return `${reverseIndex * 20}%`;
    }
  };

  // Function to determine Y position based on index (for the S-curve)
  const getYPosition = (index: number) => {
    // First row is at top
    if (index <= 5) {
      return '0%';
    } 
    // Second row is at bottom
    else {
      return '100%';
    }
  };

  // Helper function to determine if a location is completed
  const isLocationCompleted = (locationIndex: number) => {
    return animatingLevel > locationIndex;
  };
  
  return (
    <motion.div 
      className={`w-full p-4 rounded-lg shadow-lg ${bgColor}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <h3 className={`text-xl text-center ${textColor} kids-text mb-3`}>{t('world_tour_progress')}</h3>
      
      {/* S-shaped world tour visualization */}
      <div className="relative pt-2 pb-4">
        <div className="w-full h-[180px] relative"> 
          {/* Background path (dotted line) */}
          <div className="absolute w-[92%] h-2 top-[25%] left-[4%] border-t-2 border-dashed border-gray-300"></div>
          <div className="absolute w-[92%] h-2 top-[75%] left-[4%] border-t-2 border-dashed border-gray-300"></div>
          <div className="absolute w-2 h-[50%] top-[25%] left-[96%] border-l-2 border-dashed border-gray-300"></div>
          <div className="absolute w-2 h-[50%] top-[25%] left-[4%] border-l-2 border-dashed border-gray-300"></div>
          
          {/* Highlighted portion of the path based on progress */}
          <svg className="absolute top-0 left-0 w-full h-full overflow-visible">
            <path 
              d={`M ${4}% ${25}% H ${Math.min(96, 4 + progressValue * 0.92)}%
                 ${progressValue >= 100 ? `V ${75}% H ${4}% ${progressValue >= 100 ? `V ${25}%` : ''}` : ''}`}
              fill="none" 
              strokeWidth="4"
              strokeDasharray={progressValue >= 100 ? "none" : "5,3"}
              stroke={level >= 10 ? "#FBBF24" : isEnglish ? "#F97316" : "#8B5CF6"} 
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          
          {/* Moving car/plane icon */}
          {progressValue > 0 && (
            <motion.div 
              className="absolute"
              style={{
                left: progressValue <= 96 ? `${4 + progressValue * 0.92}%` : 
                      progressValue <= 148 ? '96%' : 
                      progressValue <= 244 ? `${96 - (progressValue - 148) * 0.92}%` : '4%',
                top: progressValue <= 96 ? '22%' : 
                     progressValue <= 148 ? `${25 + (progressValue - 96) * 0.5}%` : 
                     progressValue <= 244 ? '75%' : 
                     `${75 - (progressValue - 244) * 0.5}%`,
                transform: 'translate(-50%, -50%) scale(1.2)'
              }}
            >
              {progressValue <= 96 ? (
                <Car className={isEnglish ? 'text-orange-500' : 'text-purple-500'} size={22} />
              ) : (
                <Plane className={isEnglish ? 'text-orange-500' : 'text-purple-500'} size={22} />
              )}
            </motion.div>
          )}
          
          {/* Country flags for locations */}
          {[...Array(11)].map((_, i) => {
            // Skip index 0 as it's just a placeholder
            const levelIndex = i + 1;
            const flag = getLevelFlag(levelIndex);
            const xPos = getXPosition(i);
            const yPos = getYPosition(i);
            const isCurrentLocation = animatingLevel === levelIndex;
            const isCompleted = isLocationCompleted(levelIndex);
            
            return (
              <motion.div 
                key={i} 
                className="absolute"
                style={{ left: xPos, top: yPos, transform: 'translate(-50%, -50%)' }}
                onMouseEnter={() => setHoveredCountry(levelIndex)}
                onMouseLeave={() => setHoveredCountry(null)}
              >
                {/* Country flag with pulse animation if current */}
                <motion.div 
                  className={`flex flex-col items-center justify-center`}
                  animate={isCurrentLocation ? {
                    scale: [1, 1.2, 1],
                    transition: { repeat: Infinity, duration: 2 }
                  } : {}}
                >
                  <motion.span 
                    className={`text-3xl z-10 ${isCompleted ? 'opacity-100' : 'opacity-70'}`}
                    whileHover={{ scale: 1.3 }}
                  >
                    {flag}
                  </motion.span>
                  
                  {/* Circle indicator beneath the flag */}
                  <div 
                    className={`w-4 h-4 rounded-full mt-1 ${
                      isCurrentLocation 
                        ? (isEnglish ? 'bg-orange-500 ring-4 ring-orange-300/50' : 'bg-purple-500 ring-4 ring-purple-300/50') 
                        : isCompleted 
                          ? (isEnglish ? 'bg-orange-400' : 'bg-purple-400') 
                          : 'bg-gray-300'
                    }`}
                  />
                  
                  {/* Country name tooltip */}
                  {hoveredCountry === levelIndex && (
                    <div className="absolute -bottom-10 bg-white/90 px-2 py-1 rounded shadow-md text-xs whitespace-nowrap z-20">
                      {getCountryName(levelIndex, isEnglish)}
                    </div>
                  )}
                </motion.div>
              </motion.div>
            );
          })}
        </div>
        
        {/* Legend */}
        <div className={`flex justify-between text-xs ${subtextColor} mt-6 px-2`}>
          <span>{t('start_madrid')}</span>
          <span>{t('world_tour_complete')}</span>
        </div>
      </div>
      
      {/* Current destination indicator */}
      {level <= 10 && (
        <div className="mt-2 text-center">
          <span className={`text-sm ${subtextColor}`}>
            {isEnglish ? "Next destination:" : "Próximo destino:"} {getDestinationFlag(level)} {getCountryName(level + 1, isEnglish)}
          </span>
        </div>
      )}
    </motion.div>
  );
};

export default WorldTourProgress;
