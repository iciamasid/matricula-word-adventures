
// Update the GameInstructions to have larger text
// We'll increase the font size for the tips

import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";

interface GameInstructionsProps {
  onClose: () => void;
}

const GameInstructions: React.FC<GameInstructionsProps> = ({ onClose }) => {
  const { isEnglish } = useLanguage();
  
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-purple-50 border-2 border-purple-300 rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-purple-800 kids-text text-center">
            {isEnglish ? "How to Play" : "Cómo jugar"}
          </DialogTitle>
          <DialogDescription className="text-xl text-purple-700">
            {isEnglish ? "Learn how to play the Word License Plate Game" : "Aprende a jugar con las palabras de las matrículas"}
          </DialogDescription>
        </DialogHeader>
        
        {/* Increased the font size for all instruction text to make it more readable */}
        <div className="space-y-6 text-lg">
          <div className="bg-white p-4 rounded-lg border border-purple-200">
            <h3 className="text-2xl font-bold text-purple-800 kids-text mb-2">
              {isEnglish ? "Goal" : "Objetivo"}
            </h3>
            <p className="text-purple-700 text-xl">
              {isEnglish 
                ? "Create words using the letters on the license plate." 
                : "Crear palabras utilizando las letras de la matrícula."}
            </p>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-purple-200">
            <h3 className="text-2xl font-bold text-purple-800 kids-text mb-2">
              {isEnglish ? "Rules" : "Reglas"}
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-purple-700 text-xl">
              <li>
                {isEnglish 
                  ? "You must use ALL the letters from the license plate in the correct order." 
                  : "Debes usar TODAS las letras de la matrícula en el orden correcto."}
              </li>
              <li>
                {isEnglish 
                  ? "You can add more letters between them to form a complete word." 
                  : "Puedes añadir más letras entre ellas para formar una palabra completa."}
              </li>
              <li>
                {isEnglish 
                  ? "Example: License BCN → you could write 'BaCoN' or 'BaNaNa'." 
                  : "Ejemplo: Matrícula BCN → puedes escribir 'BaCóN' o 'BoCiNa'."}
              </li>
            </ul>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-purple-200">
            <h3 className="text-2xl font-bold text-purple-800 kids-text mb-2">
              {isEnglish ? "Tips" : "Consejos"}
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-purple-700 text-xl">
              <li>
                {isEnglish 
                  ? "Try to place vowels between consonants." 
                  : "Intenta colocar vocales entre consonantes."}
              </li>
              <li>
                {isEnglish 
                  ? "Think of common word patterns." 
                  : "Piensa en patrones comunes de palabras."}
              </li>
              <li>
                {isEnglish
                  ? "Click on the 'NEW' button if you're stuck with difficult letters."
                  : "Haz clic en el botón 'NUEVA' si te atascas con letras difíciles."}
              </li>
              <li>
                {isEnglish
                  ? "Explore countries by clicking on flags to learn about them!"
                  : "¡Explora países haciendo clic en las banderas para aprender sobre ellos!"}
              </li>
            </ul>
          </div>
        </div>
        
        <DialogFooter className="flex justify-center">
          <Button 
            onClick={onClose}
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-2 text-lg kids-text"
          >
            {isEnglish ? "Let's Play!" : "¡A jugar!"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GameInstructions;
