
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '@/context/GameContext';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/context/LanguageContext';

const LicensePlate: React.FC = () => {
  const { state, generateNewPlate, setIsGeneratingLicensePlate, plateConsonants } = useGame();
  const { t } = useLanguage();
  const [isSpinning, setIsSpinning] = useState(false);

  // Generate a new plate on component mount if needed
  useEffect(() => {
    if (!state.licensePlate) {
      generateNewPlate();
    }
  }, [state.licensePlate, generateNewPlate]);

  // Convert plateConsonants array to string (with safety check)
  const consonantsString = Array.isArray(plateConsonants) 
    ? plateConsonants.join(' - ') 
    : '';

  return (
    <div className="w-full relative">
      <motion.div
        className="w-full"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="w-full p-3 border-4 border-blue-500 bg-white shadow-lg text-center overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="bg-blue-600 text-white font-bold w-10 p-1 rounded-sm text-xs">
              ESP
            </div>
            <motion.p
              className="text-4xl font-bold text-blue-800 tracking-wider kids-text"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {state.licensePlate || "XXX 000"}
            </motion.p>
            <div className="bg-blue-600 w-10 p-1 rounded-sm">
              <img src="/lovable-uploads/82ed4a47-c090-4db2-b49e-6041114c97b7.png" alt="ESP" className="w-full" />
            </div>
          </div>
          
          {/* The consonants display */}
          <div className="mt-3 bg-gray-100 p-1 rounded-md">
            <p className="text-sm text-blue-700 font-semibold">
              {t('use_these_letters')}:
            </p>
            <motion.p 
              className="text-2xl text-blue-900 font-bold kids-text"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {consonantsString}
            </motion.p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default LicensePlate;
