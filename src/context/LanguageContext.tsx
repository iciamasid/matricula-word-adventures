import React, { createContext, useContext, useState, useEffect } from 'react';

// Define language types
export type Language = 'es' | 'en';

// Define the context type
interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
  isSpanish: boolean;
  isEnglish: boolean;
}

// Create the context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Dictionary of translations
export const translations: Record<string, Record<Language, string>> = {
  // Game interface
  'new_plate': {
    es: 'Nueva Matrícula',
    en: 'New License Plate'
  },
  'generating': {
    es: 'Generando',
    en: 'Generating'
  },
  'submit_word': {
    es: 'Enviar Palabra',
    en: 'Submit Word'
  },
  'type_here': {
    es: 'Escribe aquí',
    en: 'Type here'
  },
  'games_played': {
    es: 'partidas jugadas',
    en: 'games played'
  },
  'use_these_letters': {
    es: 'USA LAS LETRAS:',
    en: 'USE THESE LETTERS:'
  },
  
  // Player info
  'edit': {
    es: 'Cambiar',
    en: 'Edit'
  },
  'save': {
    es: 'Guardar',
    en: 'Save'
  },
  'years': {
    es: 'años',
    en: 'years'
  },
  'your_name': {
    es: 'Tu nombre',
    en: 'Your name'
  },
  'your_age': {
    es: 'Tu edad',
    en: 'Your age'
  },
  'invalid_name': {
    es: 'Nombre no válido',
    en: 'Invalid name'
  },
  'please_enter_name': {
    es: 'Por favor, introduce tu nombre para continuar.',
    en: 'Please enter your name to continue.'
  },
  'name_saved': {
    es: '¡Nombre guardado!',
    en: 'Name saved!'
  },
  'points_saved_as': {
    es: 'Tus puntos serán guardados como',
    en: 'Your points will be saved as'
  },
  'invalid_age': {
    es: 'Edad no válida',
    en: 'Invalid age'
  },
  'please_enter_age': {
    es: 'Por favor, introduce una edad entre 1 y 120 años.',
    en: 'Please enter an age between 1 and 120 years.'
  },
  'age_saved': {
    es: '¡Edad guardada!',
    en: 'Age saved!'
  },
  'your_age_has_been_saved': {
    es: 'Tu edad ha sido guardada.',
    en: 'Your age has been saved.'
  },
  
  // Car customization
  'select_car': {
    es: 'Selecciona tu coche',
    en: 'Select your car'
  },
  'car_selected': {
    es: 'Tu coche seleccionado',
    en: 'Your selected car'
  },
  
  // World tour
  'level_allows_driving_from': {
    es: 'Este nivel te permite conducir desde:',
    en: 'This level allows you to drive from:'
  },
  'origin': {
    es: 'Origen',
    en: 'Origin'
  },
  'destination': {
    es: 'Destino',
    en: 'Destination'
  },
  'learn_about': {
    es: 'Conoce',
    en: 'Learn about'
  },
  'world_tour_completed': {
    es: '¡VUELTA AL MUNDO COMPLETADA!',
    en: 'WORLD TOUR COMPLETED!'
  },
  
  // Draw game
  'drive_car': {
    es: 'Conduce tu coche al destino',
    en: 'Drive your car to the destination'
  },
  'draw_path': {
    es: 'Dibuja un camino y conduce hasta tu país destino',
    en: 'Draw a path and drive to your destination country'
  },
  'drive': {
    es: 'Conducir',
    en: 'Drive'
  },
  
  // Buttons and actions
  'help': {
    es: 'Ayuda',
    en: 'Help'
  },
  'reset_game': {
    es: 'Iniciar nueva partida',
    en: 'Start new game'
  },
  'reset_confirm': {
    es: '¿Estás seguro de que quieres reiniciar el juego? Perderás todo tu progreso.',
    en: 'Are you sure you want to reset the game? You will lose all your progress.'
  },
  'game_reset': {
    es: '¡Juego reiniciado!',
    en: 'Game reset!'
  },
  'reset_points': {
    es: 'Has vuelto al nivel 0 y todos tus puntos se han reiniciado.',
    en: 'You have returned to level 0 and all your points have been reset.'
  },
  
  // Success messages
  'word_accepted': {
    es: '¡Palabra aceptada!',
    en: 'Word accepted!'
  },
  'english_word': {
    es: '¡PALABRA EN INGLÉS!',
    en: 'SPANISH WORD!'
  },
  'perfect': {
    es: '¡PERFECTO!',
    en: 'PERFECT!'
  },
  'excellent': {
    es: '¡EXCELENTE!',
    en: 'EXCELLENT!'
  },
  'very_good': {
    es: '¡MUY BIEN!',
    en: 'VERY GOOD!'
  },
  'points_earned': {
    es: 'Has ganado',
    en: 'You earned'
  },
  'points': {
    es: 'puntos',
    en: 'points'
  },
  
  // Error messages
  'min_chars': {
    es: 'Introduce una palabra de al menos 3 letras',
    en: 'Enter a word with at least 3 letters'
  },
  'invalid_word': {
    es: 'no es una palabra válida. Se restan 20 puntos.',
    en: 'is not a valid word. 20 points deducted.'
  },
  'no_consonants': {
    es: 'La palabra no contiene ninguna de las consonantes. Se restan',
    en: 'The word doesn\'t contain any of the consonants. Deducting'
  },
  'must_contain': {
    es: 'La palabra debe contener al menos una consonante de la matrícula.',
    en: 'The word must contain at least one consonant from the license plate.'
  },
  
  // Welcome messages
  'welcome': {
    es: '¡Bienvenido a Matriculabra Cadabra!',
    en: 'Welcome to License Plate Magic!'
  },
  'enter_name_age': {
    es: 'Por favor, dinos tu nombre y edad para comenzar a jugar.',
    en: 'Please tell us your name and age to start playing.'
  },

  // New level notification
  'new_level': {
    es: '¡Nivel nuevo!',
    en: 'New level!'
  },
  'reached_level': {
    es: 'Has alcanzado el nivel',
    en: 'You have reached level'
  },
  'now_travel': {
    es: '¡Ahora viajas desde',
    en: 'Now you travel from'
  },
  'to': {
    es: 'hasta',
    en: 'to'
  },
  
  // Player Registration
  'welcome_game': {
    es: '¡Bienvenido a Matriculabra Cadabra!',
    en: 'Welcome to License Plate Magic!'
  },
  'please_enter_info': {
    es: 'Por favor, dinos tu nombre y edad para comenzar a jugar.',
    en: 'Please enter your name and age to start playing.'
  },
  'boy': {
    es: 'niño',
    en: 'boy'
  },
  'girl': {
    es: 'niña',
    en: 'girl'
  },
  
  // World tour progress
  'world_tour_progress': {
    es: 'Progreso de tu vuelta al mundo',
    en: 'World Tour Progress'
  },
  'start_madrid': {
    es: 'Inicio en Madrid',
    en: 'Starting in Madrid'
  },
  'world_tour_complete': {
    es: '¡Vuelta al mundo completada!',
    en: 'World Tour Complete!'
  },
  'points_for_next_level': {
    es: 'Kms. para subir de nivel',
    en: 'points for the next level'
  },
  'level': {
    es: 'Nivel',
    en: 'Level'
  },
  'points_total': {
    es: 'Kms.',
    en: 'Points'
  },
  'you_are_in': {
    es: 'Estás en',
    en: 'You are in'
  },
  
  // Draw game page
  'drive_to_destination': {
    es: 'Conduce al país destino',
    en: 'Drive to the destination country'
  },
  'origin_label': {
    es: 'ORIGEN',
    en: 'ORIGIN'
  },
  'destination_label': {
    es: 'DESTINO',
    en: 'DESTINATION'
  },
  'how_to_play': {
    es: '¿Cómo jugar?',
    en: 'How to play?'
  },
  'understood': {
    es: '¡Entendido!',
    en: 'Understood!'
  },
  'draw': {
    es: 'Dibujar',
    en: 'Draw'
  },
  
  // Help instructions
  'help_instruction_1': {
    es: 'Haz clic en el botón',
    en: 'Click the button'
  },
  'help_instruction_2': {
    es: 'Esto activará el modo de dibujo',
    en: 'This will activate drawing mode'
  },
  'help_instruction_3': {
    es: 'Dibuja un camino en el tablero',
    en: 'Draw a path on the board'
  },
  'help_instruction_4': {
    es: 'Mantén pulsado y mueve el dedo o ratón para dibujar',
    en: 'Press and hold while moving your finger or mouse to draw'
  },
  'help_instruction_5': {
    es: 'Haz clic en',
    en: 'Click on'
  },
  'help_instruction_6': {
    es: 'El coche seguirá exactamente el camino que dibujaste',
    en: 'The car will follow exactly the path you drew'
  },
  'help_instruction_7': {
    es: 'Ajusta la velocidad con el control deslizante',
    en: 'Adjust the speed with the slider'
  },
  'help_instruction_8': {
    es: 'Más lento o más rápido según prefieras',
    en: 'Slower or faster as you prefer'
  },
  
  // Country page
  'back_to_game': {
    es: 'Volver al juego',
    en: 'Back to game'
  },
  'about': {
    es: 'Sobre',
    en: 'About'
  },
  'capital': {
    es: 'Capital:',
    en: 'Capital:'
  },
  'return_to_game': {
    es: 'Volver a jugar',
    en: 'Return to game'
  },
  'unknown_country': {
    es: 'País desconocido',
    en: 'Unknown country'
  },
  'unknown_capital': {
    es: 'Desconocida',
    en: 'Unknown'
  },
  'unknown_language': {
    es: 'Desconocido',
    en: 'Unknown'
  },
  'unknown_description': {
    es: 'Este país aún está por descubrir. ¡Sigue jugando para desbloquear más información!',
    en: 'This country is yet to be discovered. Keep playing to unlock more information!'
  },
  'unknown_fact': {
    es: '¡Este país es un misterio por descubrir!',
    en: 'This country is a mystery waiting to be discovered!'
  },
  
  // Success banners
  'success_great_job': {
    es: '¡BUEN TRABAJO!',
    en: 'GREAT JOB!'
  },
  'success_well_done': {
    es: '¡MUY BIEN!',
    en: 'WELL DONE!'
  },
  'success_fantastic': {
    es: '¡FANTÁSTICO!',
    en: 'FANTASTIC!'
  },
  'success_amazing': {
    es: '¡INCREÍBLE!',
    en: 'AMAZING!'
  },
  'success_bonus': {
    es: '¡BONUS!',
    en: 'BONUS!'
  }
};

// Create the provider component
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('es');

  // Load language preference from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('matriculabraCadabra_language');
    if (savedLanguage === 'en' || savedLanguage === 'es') {
      setLanguageState(savedLanguage);
    }
  }, []);

  // Function to set language and save to localStorage
  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    localStorage.setItem('matriculabraCadabra_language', newLanguage);
  };

  // Function to translate text
  const t = (key: string): string => {
    if (!translations[key]) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
    return translations[key][language] || key;
  };

  // Convenience booleans for conditional styling
  const isSpanish = language === 'es';
  const isEnglish = language === 'en';

  // Return the provider with its value
  return (
    <LanguageContext.Provider 
      value={{ 
        language, 
        setLanguage, 
        t,
        isSpanish,
        isEnglish
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
