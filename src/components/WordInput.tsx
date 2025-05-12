
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Rotate } from 'lucide-react';
import { useGame } from '@/context/GameContext';
import { useLanguage } from '@/context/LanguageContext';

const WordInput: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { state, submitWord, setCurrentWord, generateNewPlate } = useGame();
  const { t, isEnglish } = useLanguage();
  const [isSpinning, setIsSpinning] = useState(false);
  
  // Focus on input when component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Filter out non-letter characters and convert to uppercase
    const filteredValue = e.target.value
      .replace(/[^a-zA-ZáéíóúüñÁÉÍÓÚÜÑ]/g, '')
      .toUpperCase();
    
    setCurrentWord(filteredValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && state.currentWord.trim() !== '') {
      submitWord();
    }
  };

  const handleSubmit = () => {
    if (state.currentWord.trim() !== '') {
      submitWord();
    }
  };

  const handleGenerateNewPlate = () => {
    setIsSpinning(true);
    generateNewPlate();
    setTimeout(() => {
      setIsSpinning(false);
    }, 1000);
  };

  // Determine background color based on language
  const buttonBgColor = isEnglish ? "bg-orange-600 hover:bg-orange-700" : "bg-purple-600 hover:bg-purple-700";
  const buttonBgColorLight = isEnglish ? "bg-orange-500 hover:bg-orange-600" : "bg-purple-500 hover:bg-purple-600";
  
  return (
    <div className="w-full">
      <motion.div
        className="bg-white p-3 rounded-lg shadow-md border-2 border-gray-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder={t('enter_word_with_these_letters')}
              value={state.currentWord}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              className="flex-1 text-xl uppercase kids-text"
              ref={inputRef}
              maxLength={15}
              autoComplete="off"
            />
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSubmit}
              className={`${buttonBgColor} text-white py-2 px-4 rounded-lg transition-colors duration-200 kids-text`}
              disabled={state.currentWord.trim() === ''}
            >
              <Send className="h-5 w-5" />
            </motion.button>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              {state.currentWord.length > 0 ? (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-blue-600 text-sm"
                >
                  {state.currentWord.length} {t('letters')}
                </motion.p>
              ) : (
                <p className="opacity-0">-</p>
              )}
            </div>
            
            <Button
              size="sm"
              variant="outline"
              onClick={handleGenerateNewPlate}
              className={`text-white ${buttonBgColorLight} border-none kids-text font-normal`}
            >
              <motion.div
                animate={isSpinning ? { rotate: 360 } : {}}
                transition={{ duration: 1, ease: "easeInOut" }}
                className="flex items-center"
              >
                <Rotate className="mr-2 h-4 w-4" />
                {t('new_license_plate')}
              </motion.div>
            </Button>
          </div>

          {/* Player instructions - styled for mobile */}
          <style>
            {`
            @media (max-width: 640px) {
              .mobile-instructions {
                font-size: 0.9rem;
              }
            }
            `}
          </style>
          <p className="text-gray-600 mt-2 text-sm mobile-instructions">
            {t('instructions_short')}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default WordInput;
