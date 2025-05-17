
import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";

interface GameInstructionsProps {
  onClose: () => void;
}

const GameInstructions: React.FC<GameInstructionsProps> = ({ onClose }) => {
  const { isEnglish } = useLanguage();
  
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="w-[90vw] max-w-lg rounded-2xl bg-gradient-to-br from-amber-50 to-orange-100 border-4 border-orange-300 dark:from-purple-900 dark:to-purple-800 dark:border-purple-500">
        <DialogHeader className="text-center">
          <DialogTitle className={`text-3xl font-bold ${isEnglish ? 'text-orange-800' : 'text-purple-800'} kids-text`}>
            {isEnglish ? 'Game Instructions' : 'Instrucciones del Juego'}
          </DialogTitle>
          <Button
            variant="ghost"
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        
        <div className={`p-4 space-y-6 text-lg ${isEnglish ? 'text-orange-900' : 'text-purple-900'}`}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="font-bold text-xl mb-2">
              {isEnglish ? 'How to Play' : 'Cómo Jugar'}
            </h3>
            <p className="mb-2">
              {isEnglish
                ? '1. Each license plate shows 3 consonants. You need to create words using those consonants!'
                : '1. Cada matrícula muestra 3 consonantes. ¡Debes crear palabras usando esas consonantes!'}
            </p>
            <p>
              {isEnglish
                ? '2. Type a word that contains at least one of the consonants from the license plate.'
                : '2. Escribe una palabra que contenga al menos una de las consonantes de la matrícula.'}
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="font-bold text-xl mb-2">
              {isEnglish ? 'Scoring System' : 'Sistema de Puntuación'}
            </h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                {isEnglish
                  ? '3 consonants in order: 100 points'
                  : '3 consonantes en orden: 100 puntos'}
              </li>
              <li>
                {isEnglish
                  ? '3 consonants not in order: 75 points'
                  : '3 consonantes sin orden: 75 puntos'}
              </li>
              <li>
                {isEnglish
                  ? '2 consonants in order: 50 points'
                  : '2 consonantes en orden: 50 puntos'}
              </li>
              <li>
                {isEnglish
                  ? '2 consonants not in order: 25 points'
                  : '2 consonantes sin orden: 25 puntos'}
              </li>
              <li>
                {isEnglish
                  ? '1 consonant: 10 points'
                  : '1 consonante: 10 puntos'}
              </li>
              <li className="font-semibold text-red-600">
                {isEnglish
                  ? 'Invalid word or no consonants: -20 points'
                  : 'Palabra inválida o sin consonantes: -20 puntos'}
              </li>
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="font-bold text-xl mb-2">
              {isEnglish ? 'Bonus Points' : 'Puntos Extra'}
            </h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                {isEnglish
                  ? 'Longer words (>4 letters): Up to +50 points'
                  : 'Palabras largas (>4 letras): Hasta +50 puntos'}
              </li>
              <li>
                {isEnglish
                  ? 'Words in the opposite language: +200 points'
                  : 'Palabras en el idioma contrario: +200 puntos'}
              </li>
              <li>
                {isEnglish
                  ? 'License plate with 6666: +500 points'
                  : 'Matrícula con 6666: +500 puntos'}
              </li>
              <li>
                {isEnglish
                  ? 'Triple numbers in plate: +100 points'
                  : 'Triple número en la matrícula: +100 puntos'}
              </li>
              <li>
                {isEnglish
                  ? 'Plate contains your age: +10 points'
                  : 'Matrícula contiene tu edad: +10 puntos'}
              </li>
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <h3 className="font-bold text-xl mb-2">
              {isEnglish ? 'Important Rules' : 'Reglas Importantes'}
            </h3>
            <p className="mb-2 font-semibold">
              {isEnglish
                ? '- In English mode: Only English words are accepted!'
                : '- En modo inglés: ¡Solo se aceptan palabras en inglés!'}
            </p>
            <p className="font-semibold">
              {isEnglish
                ? '- In Spanish mode: Only Spanish words are accepted!'
                : '- En modo español: ¡Solo se aceptan palabras en español!'}
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="mt-4"
          >
            <Button 
              onClick={onClose} 
              className={`w-full py-6 text-lg kids-text ${isEnglish ? 'bg-orange-600 hover:bg-orange-700' : 'bg-purple-600 hover:bg-purple-700'}`}
            >
              {isEnglish ? "Let's Play!" : "¡Vamos a Jugar!"}
            </Button>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GameInstructions;
