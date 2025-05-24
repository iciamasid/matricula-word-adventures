import React, { useState, useEffect } from 'react';
import { useGame } from '@/context/GameContext';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { Car, LockKeyhole } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import CountryModal from './CountryModal';
import { getCountryInfo } from '@/data/countryData';

// Function to get the flag emoji based on level - FOR MOTORCYCLE GAME
const getMotorcycleLevelFlag = (level: number) => {
  switch (level) {
    case 1: return "🇪🇸"; // España
    case 2: return "🇬🇧"; // Reino Unido
    case 3: return "🇬🇷"; // Grecia
    case 4: return "🇳🇴"; // Noruega
    case 5: return "🇨🇳"; // China
    case 6: return "🇨🇦"; // Canadá
    case 7: return "🇨🇷"; // Costa Rica
    case 8: return "🇧🇷"; // Brasil
    case 9: return "🇵🇪"; // Perú
    case 10: return "🇪🇸"; // Vuelta a España
    default: return "🇪🇸"; // Default España
  }
};

// Function to get the flag emoji based on level - FOR CAR GAME
const getCarLevelFlag = (level: number) => {
  switch (level) {
    case 1: return "🇪🇸"; // España
    case 2: return "🇫🇷"; // Francia
    case 3: return "🇮🇹"; // Italia
    case 4: return "🇷🇺"; // Rusia
    case 5: return "🇯🇵"; // Japón
    case 6: return "🇺🇸"; // Estados Unidos
    case 7: return "🇲🇽"; // México
    case 8: return "🇦🇺"; // Australia
    case 9: return "🇦🇷"; // Argentina
    case 10: return "🇪🇸"; // Vuelta a España
    default: return "🇪🇸"; // Default España
  }
};

// Function to get country name based on level and language - FOR MOTORCYCLE GAME
const getMotorcycleCountryName = (level: number, isEnglish: boolean) => {
  switch (level) {
    case 1: return isEnglish ? "Spain" : "España";
    case 2: return isEnglish ? "United Kingdom" : "Reino Unido";
    case 3: return isEnglish ? "Greece" : "Grecia";
    case 4: return isEnglish ? "Norway" : "Noruega";
    case 5: return isEnglish ? "China" : "China";
    case 6: return isEnglish ? "Canada" : "Canadá";
    case 7: return isEnglish ? "Costa Rica" : "Costa Rica";
    case 8: return isEnglish ? "Brazil" : "Brasil";
    case 9: return isEnglish ? "Peru" : "Perú";
    case 10: return isEnglish ? "Spain (complete)" : "España (completo)";
    default: return isEnglish ? "Spain" : "España";
  }
};

// Function to get country name based on level and language - FOR CAR GAME
const getCarCountryName = (level: number, isEnglish: boolean) => {
  switch (level) {
    case 1: return isEnglish ? "Spain" : "España";
    case 2: return isEnglish ? "France" : "Francia";
    case 3: return isEnglish ? "Italy" : "Italia";
    case 4: return isEnglish ? "Russia" : "Rusia";
    case 5: return isEnglish ? "Japan" : "Japón";
    case 6: return isEnglish ? "United States" : "Estados Unidos";
    case 7: return isEnglish ? "Mexico" : "México";
    case 8: return isEnglish ? "Australia" : "Australia";
    case 9: return isEnglish ? "Argentina" : "Argentina";
    case 10: return isEnglish ? "Spain (complete)" : "España (completo)";
    default: return isEnglish ? "Spain" : "España";
  }
};

// Function to get country code for routing - FOR MOTORCYCLE GAME
const getMotorcycleCountryCode = (level: number) => {
  switch (level) {
    case 1: return "España";
    case 2: return "Reino_Unido";
    case 3: return "Grecia";
    case 4: return "Noruega";
    case 5: return "China";
    case 6: return "Canada";
    case 7: return "Costa_Rica";
    case 8: return "Brasil";
    case 9: return "Peru";
    case 10: return "España";
    default: return "España";
  }
};

// Function to get country code for routing - FOR CAR GAME
const getCarCountryCode = (level: number) => {
  switch (level) {
    case 1: return "España";
    case 2: return "Francia";
    case 3: return "Italia";
    case 4: return "Rusia";
    case 5: return "Japón";
    case 6: return "Estados_Unidos";
    case 7: return "México";
    case 8: return "Australia";
    case 9: return "Argentina";
    case 10: return "España";
    default: return "España";
  }
};

const isCountryUnlocked = (locationIndex: number, currentLevel: number, countryName?: string) => {
  if (locationIndex === 1) return true;
  if (countryName) {
    const normalizedName = countryName.toLowerCase();
    if (normalizedName === "españa" || normalizedName === "spain" || normalizedName.includes("españa") || normalizedName.includes("spain")) {
      return true;
    }
  }
  if (locationIndex === 10 && currentLevel >= 10) return true;
  return currentLevel >= locationIndex;
};

interface WorldTourProgressMiniProps {
  onCountryVisit?: (countryCode: string) => void;
}

const WorldTourProgressMini: React.FC<WorldTourProgressMiniProps> = ({ onCountryVisit }) => {
  const { level, markCountryAsVisited, requiredCountryToVisit, clearLevelUpMessage } = useGame();
  const { isEnglish } = useLanguage?.() || { language: 'es' };
  const location = useLocation();
  const [animatingLevel, setAnimatingLevel] = useState(0);
  const [progressValue, setProgressValue] = useState(0);
  const [hoveredCountry, setHoveredCountry] = useState<number | null>(null);
  const [showCountryModal, setShowCountryModal] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  // Determine if we're in motorcycle game
  const isMotorcycleGame = location.pathname === '/motorcycle-game';

  // Use appropriate functions based on game type
  const getLevelFlag = isMotorcycleGame ? getMotorcycleLevelFlag : getCarLevelFlag;
  const getCountryName = isMotorcycleGame ? getMotorcycleCountryName : getCarCountryName;
  const getCountryCode = isMotorcycleGame ? getMotorcycleCountryCode : getCarCountryCode;

  // Animation effect
  useEffect(() => {
    const targetLevel = Math.min(level, 10);
    const targetPosition = targetLevel <= 1 ? 0 : Math.min(targetLevel - 1, 9) / 9;
    const targetValue = targetPosition * 100;
    
    let animationActive = true;
    const runAnimation = async () => {
      while (animationActive) {
        setProgressValue(0);
        setAnimatingLevel(1);

        for (let i = 0; i <= 100; i += 4) {
          if (!animationActive) break;
          const currentProgress = Math.min(i / 100 * targetValue, targetValue);
          setProgressValue(currentProgress);
          const currentLevelBasedOnProgress = Math.ceil(currentProgress / 100 * 9) + 1;
          setAnimatingLevel(Math.min(currentLevelBasedOnProgress, level));
          await new Promise(resolve => setTimeout(resolve, 20));
        }
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    };
    runAnimation();
    return () => { animationActive = false; };
  }, [level]);

  // Calculate positions for an elliptical layout - MUCH BIGGER VERSION
  const getEllipsePosition = (index: number, totalPoints: number = 10) => {
    const angle = (360 / (totalPoints - 1) * index + 270) % 360;
    const angleRad = angle * Math.PI / 180;
    const radiusX = 40; // Slightly smaller radius to fit better
    const radiusY = 32; // Slightly smaller radius to fit better
    const x = 50 + radiusX * Math.cos(angleRad);
    const y = 50 + radiusY * Math.sin(angleRad);
    return { x, y };
  };

  // Create SVG path for the elliptical journey
  const createEllipsePath = () => {
    const points = [];
    for (let i = 0; i < 10; i++) {
      const pos = getEllipsePosition(i);
      points.push(`${pos.x},${pos.y}`);
    }
    return `M ${points.join(" L ")}`;
  };

  // Calculate stroke dash offset
  const calculateStrokeDashOffset = () => {
    const totalLength = 200; // Increased for larger path
    if (level <= 1 && progressValue === 0) return totalLength;
    const segmentSize = 100 / 9;
    const currentSegmentIndex = Math.floor(progressValue / segmentSize);
    const progressInSegment = progressValue % segmentSize / segmentSize;
    const completedSegmentsRatio = currentSegmentIndex / 9;
    const progressInCurrentSegmentRatio = progressInSegment * (1 / 9);
    const combinedRatio = completedSegmentsRatio + progressInCurrentSegmentRatio;
    return totalLength * (1 - combinedRatio);
  };

  // Get vehicle position
  const getVehiclePosition = () => {
    const segmentSize = 100 / 9;
    const completedSegments = Math.floor(progressValue / segmentSize);
    const progressInSegment = progressValue % segmentSize / segmentSize;
    const currentPoint = getEllipsePosition(completedSegments);
    const nextPoint = getEllipsePosition(completedSegments + 1);
    const x = currentPoint.x + (nextPoint.x - currentPoint.x) * progressInSegment;
    const y = currentPoint.y + (nextPoint.y - currentPoint.y) * progressInSegment;
    const dx = nextPoint.x - currentPoint.x;
    const dy = nextPoint.y - currentPoint.y;
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);
    return { x, y, angle };
  };

  const vehiclePosition = getVehiclePosition();

  // Handle country selection
  const handleCountrySelection = (levelIndex: number, countryName: string) => {
    if (isCountryUnlocked(levelIndex, level, countryName)) {
      const countryCode = getCountryCode(levelIndex);
      setSelectedCountry(countryCode);
      setShowCountryModal(true);
    }
  };

  const handleCloseCountryModal = () => {
    // Mark the country as visited when the modal is closed
    if (selectedCountry && requiredCountryToVisit && getCountryInfo(selectedCountry)?.name === requiredCountryToVisit) {
      markCountryAsVisited(requiredCountryToVisit);
    }
    
    // Clear the level up message and notify parent if needed
    clearLevelUpMessage();
    if (onCountryVisit && selectedCountry) {
      onCountryVisit(selectedCountry);
    }
    
    setShowCountryModal(false);
    setSelectedCountry(null);
  };

  return (
    <>
      <div className="w-full h-full">
        {/* Mini world tour visualization - MUCH BIGGER with more space below */}
        <div className="relative h-full min-h-[420px] pb-12">
          <div className="w-full h-full relative">
            {/* Background elliptical path */}
            <svg className="absolute top-0 left-0 w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
              <path d={createEllipsePath()} fill="none" stroke="#D1D5DB" strokeWidth="0.5" strokeLinecap="round" strokeDasharray="4,4" />
              <path 
                d={createEllipsePath()} 
                fill="none" 
                strokeWidth="1" 
                stroke={isMotorcycleGame ? "#14B8A6" : "#8B5CF6"} 
                strokeLinecap="round" 
                strokeDasharray="250" 
                strokeDashoffset={calculateStrokeDashOffset()}
                style={{ display: level <= 1 && progressValue === 0 ? 'none' : 'block' }}
              />
            </svg>
            
            {/* Earth image in the center - MUCH BIGGER */}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0">
              <motion.div 
                animate={{ rotate: 360 }} 
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              >
                <img src="/lovable-uploads/5442b86d-0d51-47d8-b187-efc2e154d0e4.png" alt="Earth" className="w-[100px] h-[100px] object-contain" />
              </motion.div>
            </div>
            
            {/* Moving vehicle icon - MUCH BIGGER */}
            {progressValue > 0 && level > 1 && (
              <motion.div 
                className="absolute transform -translate-x-1/2 -translate-y-1/2" 
                style={{
                  left: `${vehiclePosition.x}%`,
                  top: `${vehiclePosition.y}%`,
                  transform: `translate(-50%, -50%) rotate(${vehiclePosition.angle}deg) scale(${isMotorcycleGame ? 2.2 : 1.8})`,
                  zIndex: 5
                }}
              >
                {isMotorcycleGame ? (
                  <span className="text-2xl">🏍️</span>
                ) : (
                  <Car className={isEnglish ? 'text-orange-500' : 'text-purple-500'} size={32} />
                )}
              </motion.div>
            )}
            
            {/* Country flags - Bigger size for better visibility */}
            {[...Array(10)].map((_, i) => {
              const levelIndex = i + 1;
              const flag = getLevelFlag(levelIndex);
              const position = getEllipsePosition(i);
              const isCurrentLocation = animatingLevel === levelIndex;
              const countryName = getCountryName(levelIndex, isEnglish);
              const isUnlocked = isCountryUnlocked(levelIndex, level, countryName);
              
              return (
                <div
                  key={i}
                  onClick={() => handleCountrySelection(levelIndex, countryName)}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer ${!isUnlocked ? 'opacity-60' : 'hover:scale-110'} transition-all duration-200`}
                  style={{
                    left: `${position.x}%`,
                    top: `${position.y}%`,
                    zIndex: hoveredCountry === levelIndex ? 30 : 10
                  }}
                  onMouseEnter={() => setHoveredCountry(levelIndex)}
                  onMouseLeave={() => setHoveredCountry(null)}
                >
                  <motion.div
                    className="flex flex-col items-center justify-center"
                    animate={isCurrentLocation ? {
                      scale: [1, 1.3, 1],
                      transition: { repeat: Infinity, duration: 2 }
                    } : {}}
                  >
                    <motion.div className="relative" whileHover={{ scale: 1.2 }}>
                      <span className="text-5xl z-10 drop-shadow-lg">{flag}</span>
                      
                      {!isUnlocked && (
                        <motion.div
                          className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1.5 shadow-lg"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                        >
                          <LockKeyhole className="w-4 h-4 text-white" />
                        </motion.div>
                      )}
                    </motion.div>
                    
                    {hoveredCountry === levelIndex && (
                      <div className="absolute -bottom-12 bg-gray-800 text-white px-3 py-2 rounded shadow-lg text-lg whitespace-nowrap z-20">
                        {countryName}
                        {!isUnlocked && (
                          <span className="ml-1 text-red-300">
                            {isEnglish ? "(Locked)" : "(Bloqueado)"}
                          </span>
                        )}
                      </div>
                    )}
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Country Modal */}
      <CountryModal
        open={showCountryModal}
        onClose={handleCloseCountryModal}
        country={selectedCountry ? getCountryInfo(selectedCountry) : null}
      />
    </>
  );
};

export default WorldTourProgressMini;
