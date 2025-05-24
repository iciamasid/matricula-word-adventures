import React, { useState, useEffect } from 'react';
import { useGame } from '@/context/GameContext';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { Car, LockKeyhole } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import LockedCountryPopup from './LockedCountryPopup';

// Function to get the flag emoji based on level - FOR MOTORCYCLE GAME
const getMotorcycleLevelFlag = (level: number) => {
  switch (level) {
    case 1:
      return "🇪🇸";
    // España
    case 2:
      return "🇬🇧";
    // Reino Unido
    case 3:
      return "🇬🇷";
    // Grecia
    case 4:
      return "🇳🇴";
    // Noruega
    case 5:
      return "🇨🇳";
    // China
    case 6:
      return "🇨🇦";
    // Canadá
    case 7:
      return "🇨🇷";
    // Costa Rica
    case 8:
      return "🇧🇷";
    // Brasil
    case 9:
      return "🇵🇪";
    // Perú
    case 10:
      return "🇪🇸";
    // Vuelta a España
    default:
      return "🇪🇸";
    // Default España
  }
};

// Function to get the flag emoji based on level - FOR CAR GAME
const getCarLevelFlag = (level: number) => {
  switch (level) {
    case 1:
      return "🇪🇸";
    // España
    case 2:
      return "🇫🇷";
    // Francia
    case 3:
      return "🇮🇹";
    // Italia
    case 4:
      return "🇷🇺";
    // Rusia
    case 5:
      return "🇯🇵";
    // Japón
    case 6:
      return "🇺🇸";
    // Estados Unidos
    case 7:
      return "🇲🇽";
    // México
    case 8:
      return "🇦🇺";
    // Australia
    case 9:
      return "🇦🇷";
    // Argentina
    case 10:
      return "🇪🇸";
    // Vuelta a España
    default:
      return "🇪🇸";
    // Default España
  }
};

// Function to get country name based on level and language - FOR MOTORCYCLE GAME
const getMotorcycleCountryName = (level: number, isEnglish: boolean) => {
  switch (level) {
    case 1:
      return isEnglish ? "Spain" : "España";
    case 2:
      return isEnglish ? "United Kingdom" : "Reino Unido";
    case 3:
      return isEnglish ? "Greece" : "Grecia";
    case 4:
      return isEnglish ? "Norway" : "Noruega";
    case 5:
      return isEnglish ? "China" : "China";
    case 6:
      return isEnglish ? "Canada" : "Canadá";
    case 7:
      return isEnglish ? "Costa Rica" : "Costa Rica";
    case 8:
      return isEnglish ? "Brazil" : "Brasil";
    case 9:
      return isEnglish ? "Peru" : "Perú";
    case 10:
      return isEnglish ? "Spain (complete)" : "España (completo)";
    default:
      return isEnglish ? "Spain" : "España";
  }
};

// Function to get country name based on level and language - FOR CAR GAME
const getCarCountryName = (level: number, isEnglish: boolean) => {
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
      return isEnglish ? "United States" : "Estados Unidos";
    case 7:
      return isEnglish ? "Mexico" : "México";
    case 8:
      return isEnglish ? "Australia" : "Australia";
    case 9:
      return isEnglish ? "Argentina" : "Argentina";
    case 10:
      return isEnglish ? "Spain (complete)" : "España (completo)";
    default:
      return isEnglish ? "Spain" : "España";
  }
};

// Function to get country code for routing - FOR MOTORCYCLE GAME
const getMotorcycleCountryCode = (level: number) => {
  switch (level) {
    case 1:
      return "España";
    case 2:
      return "Reino_Unido";
    case 3:
      return "Grecia";
    case 4:
      return "Noruega";
    case 5:
      return "China";
    case 6:
      return "Canada";
    case 7:
      return "Costa_Rica";
    case 8:
      return "Brasil";
    case 9:
      return "Peru";
    case 10:
      return "España";
    default:
      return "España";
  }
};

// Function to get country code for routing - FOR CAR GAME
const getCarCountryCode = (level: number) => {
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
      return "Estados_Unidos";
    case 7:
      return "México";
    case 8:
      return "Australia";
    case 9:
      return "Argentina";
    case 10:
      return "España";
    default:
      return "España";
  }
};

// IMPORTANT: Updated function to ensure Spain is ALWAYS unlocked regardless of level
const isCountryUnlocked = (locationIndex: number, currentLevel: number, countryName?: string) => {
  // Spain (index 1) is ALWAYS unlocked from the beginning
  if (locationIndex === 1) {
    return true;
  }

  // Check if the country name indicates it's Spain - this is an additional check
  if (countryName) {
    const normalizedName = countryName.toLowerCase();
    if (normalizedName === "españa" || normalizedName === "spain" || normalizedName.includes("españa") || normalizedName.includes("spain")) {
      return true;
    }
  }

  // Level 10 (back to Spain) also unlocked when level is 10 or above
  if (locationIndex === 10 && currentLevel >= 10) {
    return true;
  }

  // For other countries, check if level is high enough
  return currentLevel >= locationIndex;
};
const WorldTourProgress = () => {
  const {
    level
  } = useGame();
  const {
    t,
    isEnglish
  } = useLanguage?.() || {
    language: 'es'
  };
  const location = useLocation();
  const [animatingLevel, setAnimatingLevel] = useState(0);
  const [progressValue, setProgressValue] = useState(0);
  const [hoveredCountry, setHoveredCountry] = useState<number | null>(null);
  const [showLockedPopup, setShowLockedPopup] = useState(false);
  const [lockedCountry, setLockedCountry] = useState("");

  // Determine if we're in motorcycle game
  const isMotorcycleGame = location.pathname === '/motorcycle-game';

  // Use appropriate functions based on game type
  const getLevelFlag = isMotorcycleGame ? getMotorcycleLevelFlag : getCarLevelFlag;
  const getCountryName = isMotorcycleGame ? getMotorcycleCountryName : getCarCountryName;
  const getCountryCode = isMotorcycleGame ? getMotorcycleCountryCode : getCarCountryCode;

  // Set background color based on game type (FIXED)
  const bgColor = isMotorcycleGame ? "bg-teal-300" : "bg-purple-300";
  const textColor = isMotorcycleGame ? "text-teal-800" : "text-purple-800";
  const accentColor = isMotorcycleGame ? "bg-teal-400" : "bg-purple-400";
  const completedColor = isMotorcycleGame ? "bg-teal-500" : "bg-purple-500";

  // Define the estimated path length for the SVG path
  const estimatedPathLength = 225; // Approximate length of the elliptical path

  // Get path color based on level - gray dashed for level 1, colored for higher levels
  const getPathStrokeColor = () => {
    if (level <= 1 && progressValue === 0) {
      return "#D1D5DB"; // Gray color for initial path
    }
    return level >= 10 ? "#FBBF24" : isMotorcycleGame ? "#14B8A6" : "#8B5CF6";
  };

  // Modified animation to ensure the path only reaches the current country flag
  useEffect(() => {
    // Calculate target value based on current level
    // For level 1, we show zero progress (no purple line)
    // For level 2 to 9, the path should reach exactly the previous country (level - 1)
    // For level 10, the path should reach Argentina (level 9) but not go to Spain yet
    const targetLevel = Math.min(level, 10);
    const targetPosition = targetLevel <= 1 ? 0 : Math.min(targetLevel - 1, 9) / 9;
    const targetValue = targetPosition * 100;
    let animationActive = true;
    const runAnimation = async () => {
      while (animationActive) {
        // Always start from the beginning (Spain)
        setProgressValue(0);
        setAnimatingLevel(1);

        // Smoothly increase to target value but never exceed current level's position
        for (let i = 0; i <= 100; i += 2) {
          if (!animationActive) break;

          // Make sure we don't exceed the target value
          const currentProgress = Math.min(i / 100 * targetValue, targetValue);
          setProgressValue(currentProgress);

          // Update current animating level based on progress
          // This ensures the animating level matches the path completion
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
    if (isMotorcycleGame) {
      switch (level) {
        case 1:
          return "🇬🇧";
        // Destino Reino Unido
        case 2:
          return "🇬🇷";
        // Destino Grecia 
        case 3:
          return "🇳🇴";
        // Destino Noruega
        case 4:
          return "🇨🇳";
        // Destino China
        case 5:
          return "🇨🇦";
        // Destino Canadá
        case 6:
          return "🇨🇷";
        // Destino Costa Rica
        case 7:
          return "🇧🇷";
        // Destino Brasil
        case 8:
          return "🇵🇪";
        // Destino Perú
        case 9:
          return "🇪🇸";
        // Destino España (vuelta completa)
        default:
          return "🇬🇧";
        // Default Reino Unido
      }
    } else {
      switch (level) {
        case 1:
          return "🇫🇷";
        // Destino Francia
        case 2:
          return "🇮🇹";
        // Destino Italia
        case 3:
          return "🇷🇺";
        // Destino Rusia
        case 4:
          return "🇯🇵";
        // Destino Japón
        case 5:
          return "🇺🇸";
        // Destino Estados Unidos
        case 6:
          return "🇲🇽";
        // Destino México
        case 7:
          return "🇦🇺";
        // Destino Australia
        case 8:
          return "🇦🇷";
        // Destino Argentina
        case 9:
          return "🇪🇸";
        // Destino España (vuelta completa)
        default:
          return "🇫🇷";
        // Default Francia
      }
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

  // Calculate the path segment lengths for proper progress visualization
  const calculateSegmentLengths = () => {
    const segmentLengths = [];
    const totalSegments = 9; // Total number of segments (10 countries - 1)

    for (let i = 0; i < totalSegments; i++) {
      const startPos = getEllipsePosition(i);
      const endPos = getEllipsePosition(i + 1);

      // Calculate distance between points (simplified for this visualization)
      const dx = endPos.x - startPos.x;
      const dy = endPos.y - startPos.y;
      const length = Math.sqrt(dx * dx + dy * dy);
      segmentLengths.push(length);
    }
    return segmentLengths;
  };

  // Calculate the total path length up to a specific segment
  const getPathLengthUpToSegment = (segmentIndex: number) => {
    const segments = calculateSegmentLengths();
    let totalLength = 0;
    for (let i = 0; i < segmentIndex && i < segments.length; i++) {
      totalLength += segments[i];
    }
    return totalLength;
  };

  // Calculate the total path length
  const getTotalPathLength = () => {
    const segments = calculateSegmentLengths();
    return segments.reduce((sum, length) => sum + length, 0);
  };

  // UPDATED: Calculate stroke-dashoffset to ensure path stops exactly at country flags
  const calculateStrokeDashOffset = () => {
    const totalLength = estimatedPathLength;

    // For level 1 with no progress, show the entire path as unhighlighted (gray dashed)
    if (level <= 1 && progressValue === 0) {
      return totalLength;
    }

    // FIXED: Calculate exact segment progress to ensure path stops at flags
    // Calculate which segment we're currently in
    const segmentSize = 100 / 9; // 9 segments total
    const currentSegmentIndex = Math.floor(progressValue / segmentSize);

    // Calculate progress within the current segment (0 to 1)
    const progressInSegment = progressValue % segmentSize / segmentSize;

    // Calculate the exact position along the path based on completed segments
    // and partial progress in current segment
    const completedSegmentsRatio = currentSegmentIndex / 9;
    const progressInCurrentSegmentRatio = progressInSegment * (1 / 9);

    // The combined ratio determines how much of the path is highlighted
    const combinedRatio = completedSegmentsRatio + progressInCurrentSegmentRatio;

    // The dashoffset is inversely proportional to progress
    // When progress is 0, dashoffset = full length (no highlight)
    // When progress is 100%, dashoffset = 0 (fully highlighted)
    return totalLength * (1 - combinedRatio);
  };

  // Determine position of the moving vehicle
  const getVehiclePosition = () => {
    // Calculate how many full segments the vehicle has completed
    const segmentSize = 100 / 9; // 9 segments in total
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
    for (let i = 0; i < 10; i++) {
      // Changed from 11 to 10 points (removed Peru)
      const pos = getEllipsePosition(i);
      points.push(`${pos.x},${pos.y}`);
    }
    return `M ${points.join(" L ")}`;
  };

  // Handle country selection with lock check
  const handleCountrySelection = (levelIndex: number, countryName: string) => {
    if (isCountryUnlocked(levelIndex, level, countryName)) {
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
  return <motion.div initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    delay: 0.4
  }} className={`${bgColor} rounded-xl`}>
      <h3 className="py-[10px] text-xl text-center text-purple-800 font-bold">
        {isEnglish ? "Your world tour!" : "¡TU VUELTA AL MUNDO!"}
      </h3>
      
      {/* Current country indicator - MOVED to top */}
      <div className="mt-2 text-center">
        <span className="text-xl font-normal text-fuchsia-800">
          {isEnglish ? "You are in:" : "Estás en:"} {getLevelFlag(level)} {getCurrentCountry()}
        </span>
      </div>
      
      {/* Current destination indicator - MOVED to top */}
      {level <= 9 && <div className="mt-2 text-center mb-3">
          <span className="text-xl font-normal text-fuchsia-800">
            {isEnglish ? "Next destination:" : "Próximo destino:"} {getDestinationFlag(level)} {getCountryName(level + 1, isEnglish)}
          </span>
        </div>}
      
      {/* Elliptical world tour visualization */}
      <div className="relative pt-2 pb-4">
        <div className="w-full h-[220px] relative"> 
          {/* Background elliptical path (dotted line) */}
          <svg className="absolute top-0 left-0 w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
            {/* Background path always shown as gray dashed */}
            <path d={createEllipsePath()} fill="none" stroke="#D1D5DB" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3,3" />
            
            {/* Highlighted portion of the path based on progress */}
            <path d={createEllipsePath()} fill="none" strokeWidth="2.5" stroke={getPathStrokeColor()} strokeLinecap="round" strokeDasharray={estimatedPathLength} strokeDashoffset={calculateStrokeDashOffset()} style={{
            display: level <= 1 && progressValue === 0 ? 'none' : 'block'
          }} />
          </svg>
          
          {/* Earth image in the center */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0">
            <motion.div animate={{
            rotate: 360
          }} transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }} className="relative">
              <img src="/lovable-uploads/5442b86d-0d51-47d8-b187-efc2e154d0e4.png" alt="Earth" className="w-[100px] h-[100px] object-contain" />
            </motion.div>
          </div>
          
          {/* Country flags positioned on the ellipse */}
          {[...Array(10)].map((_, i) => {
          // Skip index 0 as it's just a placeholder
          const levelIndex = i + 1;
          const flag = getLevelFlag(levelIndex);
          const position = getEllipsePosition(i);
          const isCurrentLocation = animatingLevel === levelIndex;
          const countryName = getCountryName(levelIndex, isEnglish);
          // IMPORTANT: Use the updated function that checks both index and name
          const isUnlocked = isCountryUnlocked(levelIndex, level, countryName);
          const countryCode = getCountryCode(levelIndex);
          return <div key={i} onClick={() => handleCountrySelection(levelIndex, countryName)} className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer ${!isUnlocked ? 'opacity-60' : ''}`} style={{
            left: `${position.x}%`,
            top: `${position.y}%`,
            zIndex: hoveredCountry === levelIndex ? 30 : 10
          }} onMouseEnter={() => setHoveredCountry(levelIndex)} onMouseLeave={() => setHoveredCountry(null)}>
                {/* Country flag with pulse animation if current */}
                <motion.div className="flex flex-col items-center justify-center" animate={isCurrentLocation ? {
              scale: [1, 1.2, 1],
              transition: {
                repeat: Infinity,
                duration: 2
              }
            } : {}}>
                  {isUnlocked ? <Link to={`/country/${countryCode}`} onClick={() => handleNavigateToCountry(countryCode)}>
                      <motion.div className="relative" whileHover={{
                  scale: 1.3
                }}>
                        <span className="text-3xl z-10">{flag}</span>
                      </motion.div>
                    </Link> : <motion.div className="relative" whileHover={{
                scale: 1.3
              }}>
                      <span className="text-3xl z-10">{flag}</span>
                      
                      {/* Lock icon for locked countries */}
                      <motion.div className="absolute -top-2 -right-2 bg-pink-500 rounded-full p-1" initial={{
                  scale: 0
                }} animate={{
                  scale: 1
                }} transition={{
                  type: "spring"
                }}>
                        <LockKeyhole className="w-3 h-3 text-white" />
                      </motion.div>
                    </motion.div>}
                  
                  {/* Country name tooltip */}
                  {hoveredCountry === levelIndex && <div className="absolute -bottom-12 bg-white/90 px-2 py-1 rounded shadow-md text-xs whitespace-nowrap z-20">
                      {countryName}
                      {!isUnlocked && <span className="ml-1 text-pink-600">{isEnglish ? "(Locked)" : "(Bloqueado)"}</span>}
                    </div>}
                </motion.div>
              </div>;
        })}
          
          {/* Moving vehicle icon - shown only when there is progress */}
          {progressValue > 0 && level > 1 && <motion.div className="absolute transform -translate-x-1/2 -translate-y-1/2" style={{
          left: `${vehiclePosition.x}%`,
          top: `${vehiclePosition.y}%`,
          transform: `translate(-50%, -50%) rotate(${vehiclePosition.angle}deg) scale(${isMotorcycleGame ? 1.8 : 1.2})`,
          zIndex: 20
        }} initial={false}>
              {isMotorcycleGame ? <span className="text-xl">🏍️</span> : <Car className={isEnglish ? 'text-orange-500' : 'text-purple-500'} size={22} />}
            </motion.div>}
        </div>
      </div>
      
      {/* Update text about clicking flags - MOVED below the graph */}
      <p className="text-violet-900 font-normal text-base text-center mt-2">
        {isEnglish ? "Click on the flags and explore that country!" : "¡Pincha sobre las banderas y explora ese país!"}
      </p>

      {/* Locked country popup */}
      {showLockedPopup && <LockedCountryPopup country={lockedCountry} onClose={() => setShowLockedPopup(false)} />}
    </motion.div>;
};
export default WorldTourProgress;