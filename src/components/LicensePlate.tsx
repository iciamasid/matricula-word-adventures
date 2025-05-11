
import React from "react";
import { useGame } from "@/context/GameContext";
import { motion } from "framer-motion";
const LicensePlate: React.FC = () => {
  const {
    licensePlate,
    plateConsonants
  } = useGame();
  const CONSONANT_COLORS = ["bg-game-purple", "bg-game-blue", "bg-game-yellow"];

  // Get the numbers part (first 4 characters) from the license plate
  const numbers = licensePlate.substring(0, 4);

  // Ensure plateConsonants is treated as a string and safely convert to array
  const consonantsArray = typeof plateConsonants === 'string' ? plateConsonants.split('') : [];
  return <motion.div className="w-full" initial={{
    scale: 0.9,
    opacity: 0
  }} animate={{
    scale: 1,
    opacity: 1
  }} transition={{
    duration: 0.5
  }}>
      {/* Vintage license plate with EU flag */}
      <div className="relative bg-gray-100 p-3 rounded-md border-2 border-gray-400 w-full flex items-center justify-center space-x-2 shadow-md" style={{
      background: 'linear-gradient(to bottom, #F1F0FB 0%, #aaadb0 100%)'
    }}>
        
        {/* EU flag on the left */}
        <div className="absolute left-2 h-full flex items-center">
          
        </div>

        {/* License plate content - numbers and letters with space for the EU flag */}
        <div className="flex items-center justify-center space-x-2 ml-8">
          {/* Numbers part with slot machine effect - SLOWED DOWN to 2-3 seconds total */}
          {numbers.split('').map((number, index) => <motion.div key={`number-${index}`} className="bg-gray-200 w-9 h-12 rounded-sm flex items-center justify-center shadow-inner" initial={{
          rotateX: 180,
          opacity: 0
        }} animate={{
          rotateX: 0,
          opacity: 1
        }} transition={{
          delay: index * 0.4, // Slowed down from 0.1 to 0.4 for each digit
          duration: 0.8, // Increased from default to 0.8 seconds per animation
          type: "spring",
          stiffness: 80 // Reduced stiffness for slower animation
        }}>
              <span className="text-black text-3xl kids-text font-normal">{number}</span>
            </motion.div>)}
          
          {/* Separator */}
          <div className="h-12 flex items-center">
            <span className="text-gray-700 text-2xl kids-text font-normal">-</span>
          </div>
          
          {/* Consonants with slot machine effect - SLOWED DOWN */}
          {consonantsArray.map((consonant, index) => <motion.div key={`consonant-${index}`} className={`${CONSONANT_COLORS[index]} w-9 h-12 rounded-sm flex items-center justify-center shadow-inner`} initial={{
          rotateY: 180,
          opacity: 0
        }} animate={{
          rotateY: 0,
          opacity: 1
        }} transition={{
          delay: 1.6 + index * 0.5, // Increased delay to start after numbers + increased per-letter delay
          duration: 0.7, // Longer duration for each letter animation
          type: "spring",
          stiffness: 70 // Reduced stiffness for slower animation
        }} whileHover={{
          scale: 1.1
        }}>
              <span className="text-white text-3xl kids-text font-normal">{consonant}</span>
            </motion.div>)}
        </div>
      </div>
      
      {/* Car image centered below the license plate */}
      <div className="flex justify-center w-full mt-2">
        <motion.img src="/lovable-uploads/coche_portada.gif" alt="Coche caca" animate={{
        y: [0, -3, 0]
      }} transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }} className="h-16 w-auto" />
      </div>
    </motion.div>;
};
export default LicensePlate;
