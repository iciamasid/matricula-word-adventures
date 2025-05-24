
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { MapPin, Camera, Utensils, Mountain, X, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { CountryInfo } from '@/data/countryData';

interface CountryModalProps {
  open: boolean;
  onClose: () => void;
  country: CountryInfo | null;
}

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'MapPin':
      return <MapPin className="w-5 h-5 mr-2 text-blue-500" />;
    case 'Camera':
      return <Camera className="w-5 h-5 mr-2 text-green-500" />;
    case 'Utensils':
      return <Utensils className="w-5 h-5 mr-2 text-orange-500" />;
    case 'Mountain':
      return <Mountain className="w-5 h-5 mr-2 text-gray-500" />;
    default:
      return <MapPin className="w-5 h-5 mr-2 text-blue-500" />;
  }
};

const CountryModal: React.FC<CountryModalProps> = ({ open, onClose, country }) => {
  if (!country) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-4xl font-bold text-indigo-800 kids-text mb-2 text-center">
            {country.flag} {country.name}
          </DialogTitle>
          <p className="text-indigo-600 kids-text text-center">
            ¡Bienvenido a {country.name}!
          </p>
        </DialogHeader>

        {/* Country Image */}
        {country.image && (
          <motion.div
            className="relative w-full h-64 rounded-lg overflow-hidden mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <img 
              src={country.image} 
              alt={`Paisaje de ${country.name}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-xl font-bold">{country.name}</h3>
              <p className="text-sm opacity-90">Explora este hermoso país</p>
            </div>
          </motion.div>
        )}

        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {country.sections.map((section, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 border-l-4 border-indigo-500"
              whileHover={{ scale: 1.02, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="text-2xl font-semibold text-indigo-700 flex items-center mb-3">
                {getIcon(section.icon)}
                {section.title}
              </h2>
              <p className="text-indigo-600 leading-relaxed text-base">
                {section.content}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Interactive Map placeholder */}
        <motion.div
          className="mt-6 bg-gray-100 rounded-lg p-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h3 className="text-xl font-semibold text-indigo-700 mb-2">
            📍 Ubicación de {country.name}
          </h3>
          <p className="text-indigo-600">
            {country.name} te espera para una aventura increíble. ¡Descubre todos sus secretos!
          </p>
        </motion.div>

        <motion.div
          className="mt-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="text-indigo-700 mb-4 text-lg font-medium">
            ¿Quieres saber más sobre {country.name}?
          </p>
          {country.wikipediaUrl && (
            <a
              href={country.wikipediaUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white text-lg px-6 py-3">
                <ExternalLink className="w-5 h-5 mr-2" />
                Explorar en Wikipedia
              </Button>
            </a>
          )}
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default CountryModal;
