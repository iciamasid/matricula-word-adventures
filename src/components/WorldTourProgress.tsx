import React, { useState, useEffect } from 'react';
import { useGame } from '@/context/GameContext';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { Car } from 'lucide-react';
import { Link } from 'react-router-dom';
import LockedCountryPopup from './LockedCountryPopup';

// Function to get the flag emoji based on level
const getLevelFlag = (level: number) => {
  switch (level) {
    case 1:
      return "🇪🇸"; // Origen España
    case 2:
      return "🇫🇷"; // Origen Francia
    case 3:
      return "🇮🇹"; // Origen Italia
    case 4:
      return "🇷🇺"; // Origen Rusia
    case 5:
      return "🇯🇵"; // Origen Japón
    case 6:
      return "🇦🇺"; // Origen Australia
    case 7:
      return "🇺🇸"; // Origen EEUU
    case 8:
      return "🇲🇽"; // Origen México
    case 9:
      return "🇦🇷"; // Origen Argentina
    case 10:
      return "🇪🇸"; // Vuelta a España
    default:
      return "🇪🇸"; // Default España
  }
};

// Function to get country name based on level and language
const getCountryName = (level: number, isEnglish: boolean) => {
  switch (level) {
    case 1:
      return isEnglish ? "Spain" : "España";
    case 2:
      return isEnglish ? "France" : "Francia";
    case 3:
      return isEnglish ? "Italy" : "Italia";
    case 4:
      return isEnglish ? "Russia" : "Rusia";
    case 5:
      return isEnglish ? "Japan" : "Japón";
    case 6:
      return isEnglish ? "Australia" : "Australia";
    case 7:
      return isEnglish ? "United States" : "EEUU";
    case 8:
      return isEnglish ? "Mexico" : "México";
    case 9:
      return isEnglish ? "Argentina" : "Argentina";
    case 10:
      return isEnglish ? "Spain (complete)" : "España (completo)";
    default:
      return isEnglish ? "Spain" : "España";
  }
};

// Function to get country code for routing
const getCountryCode = (level: number) => {
  switch (level) {
    case 1:
      return "España";
    case 2:
      return "Francia";
    case 3:
      return "Italia";
    case 4:
      return "Rusia";
    case 5:
      return "Japón";
    case 6:
      return "Australia";
    case 7:
      return "Estados Unidos";
    case 8:
      return "México";
    case 9:
      return "Argentina";
    case 10:
      return "España";
    default:
      return "España";
  }
};

// IMPORTANT: Spain is ALWAYS unlocked regardless of level
const isCountryUnlocked = (locationIndex: number, currentLevel: number) => {
  // Spain (index 1) is ALWAYS unlocked from the beginning
  if (locationIndex === 1) {
    return true;
  }
  // Level 10 (back to Spain) also unlocked when level is 10 or above
  if (locationIndex === 10 && currentLevel >= 10) {
    return true;
  }
  // For other countries, check if level is high enough
  return currentLevel >= locationIndex;
};

const WorldTourProgress = () => {
  const { level } = useGame();
  const { t, isEnglish } = useLanguage?.() || { language: 'es' };
  const [animatingLevel, setAnimatingLevel] = useState(0);
  const [progressValue, setProgressValue] = useState(0);
  const [hoveredCountry, setHoveredCountry] = useState<number | null>(null);
  const [showLockedPopup, setShowLockedPopup] = useState(false);
  const [lockedCountry, setLockedCountry] = useState("");

  // Set background color based on language
  const bgColor = isEnglish ? "bg-orange-100" : "bg-purple-100";
  const textColor = isEnglish ? "text-orange-800" : "text-purple-800";
  const accentColor = isEnglish ? "bg-orange-400" : "bg-purple-400";
  const completedColor = isEnglish ? "bg-orange-500" : "bg-purple-500";

  // Modified animation to show circular path progress - using 9 steps now instead of 10
  useEffect(() => {
    const targetValue = (level - 1) / 9 * 100;
    let animationActive = true;
    const runAnimation = async () => {
      while (animationActive) {
        // Always start from the beginning (Spain)
        setProgressValue(0);
        setAnimatingLevel(1);

        // Smoothly increase to target value
        for (let i = 0; i <= 100; i += 2) {
          if (!animationActive) break;
          const currentProgress = Math.min(i / 100 * targetValue, targetValue);
          setProgressValue(currentProgress);

          // Update current animating level based on progress
          const currentLevelBasedOnProgress = Math.ceil(currentProgress / 100 * 9) + 1;
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
      case 1:
        return "🇫🇷"; // Destino Francia
      case 2:
        return "🇮🇹"; // Destino Italia 
      case 3:
        return "🇷🇺"; // Destino Rusia
      case 4:
        return "🇯🇵"; // Destino Japón
      case 5:
        return "🇦🇺"; // Destino Australia
      case 6:
        return "🇺🇸"; // Destino EEUU
      case 7:
        return "🇲🇽"; // Destino México
      case 8:
        return "🇦🇷"; // Destino Argentina
      case 9:
        return "🇪🇸"; // Destino España (vuelta completa)
      default:
        return "🇫🇷"; // Default Francia
    }
  };

  // Calculate positions for an elliptical layout - now with 10 points (removed Peru)
  const getEllipsePosition = (index: number, totalPoints: number = 10) => {
    // Calculate angle for evenly distributed points around an ellipse
    // Subtract from 360 to go clockwise, and adjust starting point to top (270 degrees)
    const angle = (360 / (totalPoints - 1) * index + 270) % 360;

    // Convert to radians
    const angleRad = angle * Math.PI / 180;

    // Ellipse parameters (smaller radius to fit inside Earth image)
    const radiusX = 38; // horizontal radius
    const radiusY = 30; // vertical radius

    // Calculate x and y position on an ellipse
    const x = 50 + radiusX * Math.cos(angleRad);
    const y = 50 + radiusY * Math.sin(angleRad);
    return {
      x,
      y
    };
  };

  // Determine position of the moving vehicle
  const getVehiclePosition = () => {
    // Calculate how many full segments the vehicle has completed
    const segmentSize = 100 / 9; // 9 segments in total (changed from 10)
    const completedSegments = Math.floor(progressValue / segmentSize);

    // Calculate progress within the current segment (0 to 1)
    const progressInSegment = progressValue % segmentSize / segmentSize;

    // Calculate the current and next point positions
    const currentPoint = getEllipsePosition(completedSegments);
    const nextPoint = getEllipsePosition(completedSegments + 1);

    // Interpolate between the two points based on progress in segment
    const x = currentPoint.x + (nextPoint.x - currentPoint.x) * progressInSegment;
    const y = currentPoint.y + (nextPoint.y - currentPoint.y) * progressInSegment;

    // Calculate rotation angle for the vehicle (tangent to the ellipse)
    const dx = nextPoint.x - currentPoint.x;
    const dy = nextPoint.y - currentPoint.y;
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);
    return {
      x,
      y,
      angle
    };
  };

  // Helper function to determine if a location is completed
  const isLocationCompleted = (locationIndex: number) => {
    return animatingLevel > locationIndex;
  };

  // Determine which icon to show as the moving vehicle
  const vehiclePosition = getVehiclePosition();

  // Helper to create SVG path for the elliptical journey
  const createEllipsePath = () => {
    const points = [];
    for (let i = 0; i < 10; i++) { // Changed from 11 to 10 points (removed Peru)
      const pos = getEllipsePosition(i);
      points.push(`${pos.x},${pos.y}`);
    }
    return `M ${points.join(" L ")}`;
  };

  // Handle country selection with lock check
  const handleCountrySelection = (levelIndex: number, countryName: string) => {
    if (isCountryUnlocked(levelIndex, level)) {
      // Country is unlocked - proceed with navigation
      handleNavigateToCountry(getCountryCode(levelIndex));
    } else {
      // Country is locked - show popup
      setLockedCountry(countryName);
      setShowLockedPopup(true);
    }
  };

  // Prepare for navigation when clicking on a flag
  const handleNavigateToCountry = (countryCode: string) => {
    // Set navigation flag for proper destination restoration
    sessionStorage.setItem('navigatingBack', 'true');
  };

  // Get current country based on level
  const getCurrentCountry = () => {
    return getCountryName(level, isEnglish);
  };

  return (
    <motion.div 
      className={`w-full p-4 rounded-lg shadow-lg ${bgColor}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <h3 className={`text-xl text-center ${textColor} kids-text mb-2 uppercase font-bold`}>
        {isEnglish ? "Your world tour!" : "¡TU VUELTA AL MUNDO!"}
      </h3>
      
      {/* Current country indicator - MOVED to top */}
      <div className="mt-2 text-center">
        <span className="text-xl font-normal text-fuchsia-800">
          {isEnglish ? "You are in:" : "Estás en:"} {getLevelFlag(level)} {getCurrentCountry()}
        </span>
      </div>
      
      {/* Current destination indicator - MOVED to top */}
      {level <= 9 && (
        <div className="mt-2 text-center mb-3">
          <span className="text-xl font-normal text-fuchsia-800">
            {isEnglish ? "Next destination:" : "Próximo destino:"} {getDestinationFlag(level)} {getCountryName(level + 1, isEnglish)}
          </span>
        </div>
      )}
      
      {/* Elliptical world tour visualization */}
      <div className="relative pt-2 pb-4">
        <div className="w-full h-[220px] relative"> 
          {/* Background elliptical path (dotted line) */}
          <svg className="absolute top-0 left-0 w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
            <path d={createEllipsePath()} fill="none" stroke="#D1D5DB" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3,3" />
            
            {/* Highlighted portion of the path based on progress */}
            <path d={createEllipsePath()} fill="none" strokeWidth="2.5" stroke={level >= 10 ? "#FBBF24" : isEnglish ? "#F97316" : "#8B5CF6"} strokeLinecap="round" strokeDasharray={progressValue === 0 ? "0" : "282"} style={{
              strokeDashoffset: `${(1 - progressValue / 100) * 282}px`
            }} />
          </svg>
          
          {/* Earth image in the center */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              className="relative"
            >
              <img 
                src="/lovable-uploads/5442b86d-0d51-47d8-b187-efc2e154d0e4.png" 
                alt="Earth" 
                className="w-[100px] h-[100px] object-contain"
              />
            </motion.div>
          </div>
          
          {/* Country flags positioned on the ellipse */}
          {[...Array(10)].map((_, i) => { 
            // Skip index 0 as it's just a placeholder
            const levelIndex = i + 1;
            const flag = getLevelFlag(levelIndex);
            const position = getEllipsePosition(i);
            const isCurrentLocation = animatingLevel === levelIndex;
            // IMPORTANT: Always unlock Spain (levelIndex 1)
            const isUnlocked = isCountryUnlocked(levelIndex, level);
            const countryName = getCountryName(levelIndex, isEnglish);
            const countryCode = getCountryCode(levelIndex);
            
            return (
              <div 
                key={i}
                onClick={() => handleCountrySelection(levelIndex, countryName)}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer ${!isUnlocked ? 'opacity-60' : ''}`} 
                style={{
                  left: `${position.x}%`,
                  top: `${position.y}%`,
                  zIndex: hoveredCountry === levelIndex ? 30 : 10
                }}
                onMouseEnter={() => setHoveredCountry(levelIndex)}
                onMouseLeave={() => setHoveredCountry(null)}
              >
                {/* Country flag with pulse animation if current */}
                <motion.div 
                  className="flex flex-col items-center justify-center"
                  animate={isCurrentLocation ? {
                    scale: [1, 1.2, 1],
                    transition: {
                      repeat: Infinity,
                      duration: 2
                    }
                  } : {}}
                >
                  {isUnlocked ? (
                    <Link to={`/country/${countryCode}`} onClick={() => handleNavigateToCountry(countryCode)}>
                      <motion.div 
                        className="relative"
                        whileHover={{ scale: 1.3 }}
                      >
                        <span className="text-3xl z-10">{flag}</span>
                      </motion.div>
                    </Link>
                  ) : (
                    <motion.div 
                      className="relative"
                      whileHover={{ scale: 1.3 }}
                    >
                      <span className="text-3xl z-10">{flag}</span>
                      
                      {/* Lock icon for locked countries */}
                      <motion.div 
                        className="absolute -top-2 -right-2 bg-pink-500 rounded-full p-1" 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring" }}
                      >
                        <Lock className="w-3 h-3 text-white" />
                      </motion.div>
                    </motion.div>
                  )}
                  
                  {/* Country name tooltip */}
                  {hoveredCountry === levelIndex && (
                    <div className="absolute -bottom-12 bg-white/90 px-2 py-1 rounded shadow-md text-xs whitespace-nowrap z-20">
                      {countryName}
                      {!isUnlocked && (
                        <span className="ml-1 text-pink-600">{isEnglish ? "(Locked)" : "(Bloqueado)"}</span>
                      )}
                    </div>
                  )}
                </motion.div>
              </div>
            );
          })}
          
          {/* Moving vehicle icon - Always use Car icon */}
          {progressValue > 0 && (
            <motion.div 
              className="absolute transform -translate-x-1/2 -translate-y-1/2" 
              style={{
                left: `${vehiclePosition.x}%`,
                top: `${vehiclePosition.y}%`,
                transform: `translate(-50%, -50%) rotate(${vehiclePosition.angle}deg) scale(1.2)`,
                zIndex: 20
              }}
              initial={false}
            >
              <Car className={isEnglish ? 'text-orange-500' : 'text-purple-500'} size={22} />
            </motion.div>
          )}
        </div>
      </div>
      
      {/* Update text about clicking flags - MOVED below the graph */}
      <p className="text-violet-900 font-normal text-base text-center mt-2">
        {isEnglish ? "Click on the flags and explore that country!" : "¡Pincha sobre las banderas y explora ese país!"}
      </p>

      {/* Locked country popup */}
      {showLockedPopup && (
        <LockedCountryPopup 
          country={lockedCountry}
          onClose={() => setShowLockedPopup(false)}
        />
      )}
    </motion.div>
  );
};

export default WorldTourProgress;
