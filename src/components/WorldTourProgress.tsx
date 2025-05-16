
import React, { useState, useEffect } from 'react';
import { useGame } from '@/context/GameContext';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { Car, Plane } from 'lucide-react';
import { Link } from 'react-router-dom';

// Function to get the flag emoji based on level
const getLevelFlag = (level: number) => {
  switch (level) {
    case 1:
      return "🇪🇸";
    // Origen España
    case 2:
      return "🇫🇷";
    // Origen Francia
    case 3:
      return "🇮🇹";
    // Origen Italia
    case 4:
      return "🇷🇺";
    // Origen Rusia
    case 5:
      return "🇯🇵";
    // Origen Japón
    case 6:
      return "🇦🇺";
    // Origen Australia
    case 7:
      return "🇺🇸";
    // Origen EEUU
    case 8:
      return "🇲🇽";
    // Origen México
    case 9:
      return "🇵🇪";
    // Origen Perú
    case 10:
      return "🇦🇷";
    // Origen Argentina
    case 11:
      return "🇪🇸";
    // Vuelta a España
    default:
      return "🇪🇸";
    // Default España
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
      return isEnglish ? "Peru" : "Perú";
    case 10:
      return isEnglish ? "Argentina" : "Argentina";
    case 11:
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
      return "Perú";
    case 10:
      return "Argentina";
    case 11:
      return "España";
    default:
      return "España";
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
  const accentColor = isEnglish ? "bg-orange-400" : "bg-purple-400";
  const completedColor = isEnglish ? "bg-orange-500" : "bg-purple-500";

  // Modified animation to show circular path progress
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
          const currentProgress = Math.min(i / 100 * targetValue, targetValue);
          setProgressValue(currentProgress);

          // Update current animating level based on progress
          const currentLevelBasedOnProgress = Math.ceil(currentProgress / 100 * 10) + 1;
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
        return "🇦🇺";
      // Destino Australia
      case 6:
        return "🇺🇸";
      // Destino EEUU
      case 7:
        return "🇲🇽";
      // Destino México
      case 8:
        return "🇵🇪";
      // Destino Perú
      case 9:
        return "🇦🇷";
      // Destino Argentina
      case 10:
        return "🇪🇸";
      // Destino España (vuelta completa)
      default:
        return "🇫🇷";
      // Default Francia
    }
  };

  // Calculate positions for an elliptical layout
  const getEllipsePosition = (index: number, totalPoints: number = 11) => {
    // Calculate angle for evenly distributed points around an ellipse
    // Subtract from 360 to go clockwise, and adjust starting point to top (270 degrees)
    const angle = (360 / (totalPoints - 1) * index + 270) % 360;

    // Convert to radians
    const angleRad = angle * Math.PI / 180;

    // Ellipse parameters (horizontal radius a bit larger than vertical radius)
    const radiusX = 42; // horizontal radius
    const radiusY = 32; // vertical radius

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
    const segmentSize = 100 / 10; // 10 segments in total
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
    for (let i = 0; i < 11; i++) {
      const pos = getEllipsePosition(i);
      points.push(`${pos.x},${pos.y}`);
    }
    return `M ${points.join(" L ")}`;
  };

  // Prepare for navigation when clicking on a flag
  const handleNavigateToCountry = (countryCode: string) => {
    // Set navigation flag for proper destination restoration
    sessionStorage.setItem('navigatingBack', 'true');
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
      
      {/* Add the new text about clicking flags */}
      <p className="text-violet-900 font-normal text-base">
        {isEnglish ? "Click on each flag to explore the country!" : "¡Pincha sobre cada bandera para explorar el país!"}
      </p>
      
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
          
          {/* Country flags positioned on the ellipse */}
          {[...Array(11)].map((_, i) => {
            // Skip index 0 as it's just a placeholder
            const levelIndex = i + 1;
            const flag = getLevelFlag(levelIndex);
            const position = getEllipsePosition(i);
            const isCurrentLocation = animatingLevel === levelIndex;
            const countryCode = getCountryCode(levelIndex);
            
            return (
              <Link 
                key={i}
                to={`/country/${countryCode}`} 
                onClick={() => handleNavigateToCountry(countryCode)}
                className="absolute transform -translate-x-1/2 -translate-y-1/2" 
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
                  <motion.span 
                    className="text-3xl z-10" 
                    whileHover={{ scale: 1.3 }}
                  >
                    {flag}
                  </motion.span>
                  
                  {/* Country name tooltip */}
                  {hoveredCountry === levelIndex && (
                    <div className="absolute -bottom-12 bg-white/90 px-2 py-1 rounded shadow-md text-xs whitespace-nowrap z-20">
                      {getCountryName(levelIndex, isEnglish)}
                    </div>
                  )}
                </motion.div>
              </Link>
            );
          })}
          
          {/* Moving vehicle icon */}
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
              {progressValue <= 50 ? (
                <Car className={isEnglish ? 'text-orange-500' : 'text-purple-500'} size={22} />
              ) : (
                <Plane className={isEnglish ? 'text-orange-500' : 'text-purple-500'} size={22} />
              )}
            </motion.div>
          )}
          
          {/* Updated Earth image */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
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
                className="w-[60px] h-[60px] object-contain"
              />
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Current destination indicator */}
      {level <= 10 && (
        <div className="mt-2 text-center">
          <span className="text-xl font-normal text-fuchsia-800">
            {isEnglish ? "Next destination:" : "Próximo destino:"} {getDestinationFlag(level)} {getCountryName(level + 1, isEnglish)}
          </span>
        </div>
      )}
    </motion.div>
  );
};

export default WorldTourProgress;
