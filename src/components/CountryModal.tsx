
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Camera, Utensils, Mountain, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { CountryInfo } from '@/data/countryData';
import { useGame } from '@/context/GameContext';

interface CountryModalProps {
  open: boolean;
  onClose: () => void;
  country: CountryInfo | null;
}

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'Camera':
      return <Camera className="w-4 h-4 mr-2 text-green-500" />;
    case 'Utensils':
      return <Utensils className="w-4 h-4 mr-2 text-orange-500" />;
    case 'Mountain':
      return <Mountain className="w-4 h-4 mr-2 text-purple-500" />;
    default:
      return <Camera className="w-4 h-4 mr-2 text-green-500" />;
  }
};

const CountryModal: React.FC<CountryModalProps> = ({ open, onClose, country }) => {
  const { markCountryAsVisited, requiredCountryToVisit } = useGame();
  
  if (!country) return null;

  const handleContinuePlaying = () => {
    console.log('CountryModal - Continue playing clicked for country:', country.name);
    console.log('CountryModal - Required country to visit:', requiredCountryToVisit);
    
    // Mark the country as visited when closing the modal
    if (requiredCountryToVisit && country.name === requiredCountryToVisit) {
      console.log('CountryModal - Marking country as visited:', country.name);
      markCountryAsVisited(country.name);
    }
    
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-4xl h-[90vh] max-h-[90vh] overflow-y-auto bg-gradient-to-br from-blue-50 to-purple-50 p-4 sm:p-6">
        <DialogHeader className="text-center mb-4">
          <DialogTitle className="text-2xl sm:text-4xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text mb-2">
            {country.name}
          </DialogTitle>
          <div className="text-lg sm:text-xl text-blue-600 font-semibold mb-3">
            ¡Bienvenido a {country.name}! 🌟
          </div>
        </DialogHeader>

        {/* Country Image with fun overlay */}
        {country.image && (
          <motion.div
            className="relative w-full h-48 sm:h-64 rounded-xl overflow-hidden mb-4 shadow-xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <img 
              src={country.image} 
              alt={`Paisaje de ${country.name}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-purple/20" />
            <div className="absolute bottom-3 left-3 text-white">
              <h3 className="text-xl sm:text-2xl font-bold drop-shadow-lg">{country.name}</h3>
              <p className="text-sm sm:text-base opacity-90 drop-shadow-md">¡Vamos a explorar juntos! 🚗✨</p>
            </div>
            <div className="absolute top-3 right-3 text-3xl sm:text-4xl animate-bounce">
              {country.flag}
            </div>
          </motion.div>
        )}

        <motion.div
          className="space-y-3 sm:space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, staggerChildren: 0.1 }}
        >
          {country.sections.map((section, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-md p-4 sm:p-6 border-l-4 transform hover:scale-[1.01] transition-all duration-300"
              style={{ borderLeftColor: index % 2 === 0 ? '#3B82F6' : '#8B5CF6' }}
              whileHover={{ 
                scale: 1.01, 
                boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                y: -2
              }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-lg sm:text-2xl font-bold text-gray-800 flex items-center mb-2 sm:mb-3">
                {getIcon(section.icon)}
                {section.title}
              </h2>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base font-medium">
                {section.content}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-4 sm:mt-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-lg sm:text-xl font-bold text-blue-700 mb-3 sm:mb-4">
            ¿Listo para seguir tu aventura? 🚗💨
          </p>
          <Button 
            onClick={handleContinuePlaying}
            className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white text-lg sm:text-xl px-8 sm:px-10 py-3 sm:py-4 rounded-xl shadow-xl transform hover:scale-105 transition-all duration-300 font-bold"
          >
            <Play className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
            ¡Continúa Jugando!
          </Button>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default CountryModal;
