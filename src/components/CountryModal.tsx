
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Camera, Utensils, Mountain, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { CountryInfo } from '@/data/countryData';

interface CountryModalProps {
  open: boolean;
  onClose: () => void;
  country: CountryInfo | null;
}

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'Camera':
      return <Camera className="w-6 h-6 mr-3 text-green-500" />;
    case 'Utensils':
      return <Utensils className="w-6 h-6 mr-3 text-orange-500" />;
    case 'Mountain':
      return <Mountain className="w-6 h-6 mr-3 text-purple-500" />;
    default:
      return <Camera className="w-6 h-6 mr-3 text-green-500" />;
  }
};

const CountryModal: React.FC<CountryModalProps> = ({ open, onClose, country }) => {
  if (!country) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-blue-50 to-purple-50">
        <DialogHeader className="text-center">
          <DialogTitle className="text-5xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text mb-4">
            {country.name}
          </DialogTitle>
          <div className="text-2xl text-blue-600 font-semibold mb-6">
            ¡Bienvenido a {country.name}! 🌟
          </div>
        </DialogHeader>

        {/* Country Image with fun overlay */}
        {country.image && (
          <motion.div
            className="relative w-full h-80 rounded-2xl overflow-hidden mb-8 shadow-2xl"
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
            <div className="absolute bottom-6 left-6 text-white">
              <h3 className="text-3xl font-bold drop-shadow-lg">{country.name}</h3>
              <p className="text-lg opacity-90 drop-shadow-md">¡Vamos a explorar juntos! 🚗✨</p>
            </div>
            <div className="absolute top-6 right-6 text-6xl animate-bounce">
              {country.flag}
            </div>
          </motion.div>
        )}

        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, staggerChildren: 0.1 }}
        >
          {country.sections.map((section, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-8 border-l-8 border-gradient-to-b from-blue-400 to-purple-400 transform hover:scale-105 transition-all duration-300"
              style={{ borderLeftColor: index % 2 === 0 ? '#3B82F6' : '#8B5CF6' }}
              whileHover={{ 
                scale: 1.02, 
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                y: -5
              }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-3xl font-bold text-gray-800 flex items-center mb-4">
                {getIcon(section.icon)}
                {section.title}
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg font-medium">
                {section.content}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-2xl font-bold text-blue-700 mb-6">
            ¿Listo para seguir tu aventura? 🚗💨
          </p>
          <Button 
            onClick={onClose}
            className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white text-2xl px-12 py-6 rounded-2xl shadow-2xl transform hover:scale-110 transition-all duration-300 font-bold"
          >
            <Play className="w-8 h-8 mr-3" />
            ¡Continúa Jugando!
          </Button>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default CountryModal;
