
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check, X, Star, Trophy, Info } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface GameInstructionsProps {
  onClose: () => void;
}

const GameInstructions: React.FC<GameInstructionsProps> = ({ onClose }) => {
  const { isEnglish } = useLanguage();
  
  // Determine styling based on language
  const accentColor = isEnglish ? "text-orange-600" : "text-purple-600";
  const bgColor = isEnglish ? "bg-orange-100" : "bg-purple-100";
  const borderColor = isEnglish ? "border-orange-300" : "border-purple-300";
  const btnColor = isEnglish ? "bg-orange-600 hover:bg-orange-700" : "bg-purple-600 hover:bg-purple-700";
  
  return (
    <Dialog open={true} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2 kids-text">
            <Info className={`h-6 w-6 ${accentColor}`} />
            {isEnglish ? "How to Play Matriculabra" : "Cómo jugar a Matriculabra"}
          </DialogTitle>
          <DialogDescription className="text-base">
            {isEnglish 
              ? "Create words using the letters from the license plate to travel around the world!"
              : "¡Crea palabras usando las letras de la matrícula para viajar por todo el mundo!"}
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="space-y-6">
            {/* Game objective */}
            <section className={`p-4 rounded-lg ${bgColor} border ${borderColor}`}>
              <h3 className={`text-xl font-bold mb-2 kids-text ${accentColor}`}>
                {isEnglish ? "Game Objective" : "Objetivo del juego"}
              </h3>
              <p>
                {isEnglish 
                  ? "Form words using the consonants that appear on the license plate. Earn kilometers (points) to travel across different countries around the world."
                  : "Forma palabras usando las consonantes que aparecen en la matrícula. Gana kilómetros (puntos) para viajar por diferentes países alrededor del mundo."}
              </p>
            </section>
            
            {/* Scoring system */}
            <section className={`p-4 rounded-lg ${bgColor} border ${borderColor}`}>
              <h3 className={`text-xl font-bold mb-2 kids-text ${accentColor}`}>
                {isEnglish ? "Scoring System" : "Sistema de puntuación"}
              </h3>
              <ul className="space-y-3 list-disc pl-5">
                <li>
                  <span className="font-semibold">{isEnglish ? "3 consonants in order:" : "3 consonantes en orden:"}</span> 
                  {isEnglish ? " 100 points" : " 100 puntos"}
                </li>
                <li>
                  <span className="font-semibold">{isEnglish ? "3 consonants not in order:" : "3 consonantes sin orden:"}</span> 
                  {isEnglish ? " 75 points" : " 75 puntos"}
                </li>
                <li>
                  <span className="font-semibold">{isEnglish ? "2 consonants in order:" : "2 consonantes en orden:"}</span> 
                  {isEnglish ? " 50 points" : " 50 puntos"}
                </li>
                <li>
                  <span className="font-semibold">{isEnglish ? "2 consonants not in order:" : "2 consonantes sin orden:"}</span> 
                  {isEnglish ? " 25 points" : " 25 puntos"}
                </li>
                <li>
                  <span className="font-semibold">{isEnglish ? "1 consonant:" : "1 consonante:"}</span> 
                  {isEnglish ? " 10 points" : " 10 puntos"}
                </li>
                <li>
                  <span className="font-semibold">{isEnglish ? "Length bonus:" : "Bonus por longitud:"}</span> 
                  {isEnglish ? " 5 points per letter (for words longer than 4 letters)" : " 5 puntos por letra (para palabras más largas de 4 letras)"}
                </li>
                <li>
                  <span className="font-semibold">{isEnglish ? "Foreign word bonus:" : "Bonus por palabra extranjera:"}</span> 
                  {isEnglish ? " 200 points (for using words from another language)" : " 200 puntos (por usar palabras de otro idioma)"}
                </li>
                <li className="text-red-600">
                  <span className="font-semibold">{isEnglish ? "Invalid word:" : "Palabra no válida:"}</span> 
                  {isEnglish ? " -20 points" : " -20 puntos"}
                </li>
              </ul>
            </section>
            
            {/* Special bonuses */}
            <section className={`p-4 rounded-lg ${bgColor} border ${borderColor}`}>
              <h3 className={`text-xl font-bold mb-2 kids-text ${accentColor}`}>
                {isEnglish ? "Special Bonuses" : "Bonificaciones especiales"}
              </h3>
              <ul className="space-y-3 list-disc pl-5">
                <li>
                  <span className="font-semibold">
                    <Star className="inline h-4 w-4 text-yellow-500 mr-1" />
                    {isEnglish ? "Lucky Numbers (6666):" : "Números de la suerte (6666):"}
                  </span> 
                  {isEnglish ? " Get 500 bonus points when you see license plate with 6666!" : " ¡Consigue 500 puntos extra cuando veas una matrícula con 6666!"}
                </li>
                <li>
                  <span className="font-semibold">
                    <Trophy className="inline h-4 w-4 text-yellow-500 mr-1" />
                    {isEnglish ? "Level Up:" : "Subida de nivel:"}
                  </span> 
                  {isEnglish ? " Every 500 points you gain a level and travel to a new country!" : " ¡Cada 500 puntos subes un nivel y viajas a un nuevo país!"}
                </li>
              </ul>
            </section>
            
            {/* How to play */}
            <section className={`p-4 rounded-lg ${bgColor} border ${borderColor}`}>
              <h3 className={`text-xl font-bold mb-2 kids-text ${accentColor}`}>
                {isEnglish ? "How to Play" : "Cómo jugar"}
              </h3>
              <ol className="space-y-3 list-decimal pl-5">
                <li>
                  {isEnglish 
                    ? "Look at the three consonants shown on the license plate."
                    : "Mira las tres consonantes que aparecen en la matrícula."}
                </li>
                <li>
                  {isEnglish 
                    ? "Form a word that contains at least one of these consonants."
                    : "Forma una palabra que contenga al menos una de estas consonantes."}
                </li>
                <li>
                  {isEnglish 
                    ? "Type your word in the input box and press Enter or the arrow button."
                    : "Escribe tu palabra en la caja de texto y pulsa Enter o el botón de flecha."}
                </li>
                <li>
                  {isEnglish 
                    ? "You'll earn more points if you use more consonants from the plate and if they appear in the same order."
                    : "Ganarás más puntos si usas más consonantes de la matrícula y si aparecen en el mismo orden."}
                </li>
                <li>
                  {isEnglish 
                    ? "After a successful word, a new license plate will appear."
                    : "Después de una palabra correcta, aparecerá una nueva matrícula."}
                </li>
                <li>
                  {isEnglish 
                    ? "Invalid words will cost you 20 points, so choose wisely!"
                    : "Las palabras no válidas te costarán 20 puntos, ¡así que elige con cuidado!"}
                </li>
              </ol>
            </section>
            
            {/* Travel tips */}
            <section className={`p-4 rounded-lg ${bgColor} border ${borderColor}`}>
              <h3 className={`text-xl font-bold mb-2 kids-text ${accentColor}`}>
                {isEnglish ? "Travel Tips" : "Consejos para tu viaje"}
              </h3>
              <ul className="space-y-3">
                <li className="flex gap-2">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>
                    {isEnglish 
                      ? "Click on your car to change its color!"
                      : "¡Haz clic en tu coche para cambiar su color!"}
                  </span>
                </li>
                <li className="flex gap-2">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>
                    {isEnglish 
                      ? "Longer words give you more points, get creative!"
                      : "¡Las palabras más largas te dan más puntos, sé creativo!"}
                  </span>
                </li>
                <li className="flex gap-2">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>
                    {isEnglish 
                      ? "Try to use all three consonants in order for maximum points."
                      : "Intenta usar las tres consonantes en orden para conseguir la máxima puntuación."}
                  </span>
                </li>
                <li className="flex gap-2">
                  <X className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <span>
                    {isEnglish 
                      ? "Invalid words (that don't use any consonants from the plate) will lose you points."
                      : "Las palabras no válidas (que no usen ninguna consonante de la matrícula) te harán perder puntos."}
                  </span>
                </li>
              </ul>
            </section>
          </div>
        </ScrollArea>
        
        <DialogFooter>
          <Button onClick={onClose} className={`${btnColor} text-white`}>
            {isEnglish ? "Got it" : "Entendido"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GameInstructions;
