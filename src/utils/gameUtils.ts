// Generates a random license plate with 4 numbers and 3 consonants
export function generateLicensePlate(): string {
  const numbers = Array(4)
    .fill(0)
    .map(() => Math.floor(Math.random() * 10))
    .join("");
  
  // Spanish-friendly consonant distribution - higher weights for common Spanish consonants
  // B, C, D, F, G, J, L, M, N, P, R, S, T have higher frequency
  const spanishConsonantWeights = {
    'B': 3, 'C': 4, 'D': 4, 'F': 3, 'G': 3, 'H': 1, 'J': 2, 'K': 0.5,
    'L': 4, 'M': 4, 'N': 4, 'P': 3, 'Q': 1, 'R': 5, 'S': 5, 'T': 4,
    'V': 2, 'W': 0.2, 'X': 0.5, 'Y': 0.5, 'Z': 0.8
  };
  
  // Create weighted consonant pool
  let consonantPool = '';
  Object.entries(spanishConsonantWeights).forEach(([consonant, weight]) => {
    consonantPool += consonant.repeat(Math.round(weight * 10));
  });
  
  // Generate random consonants from weighted pool
  const randomConsonants = Array(3)
    .fill('')
    .map(() => consonantPool.charAt(Math.floor(Math.random() * consonantPool.length)))
    .join('');
  
  return `${numbers}${randomConsonants}`;
}

// Extracts the consonants from the license plate
export function getConsonantsFromPlate(plate: string): string {
  return plate.substring(4);
}

// Get a list of possible Spanish vowels
export const vowels = "AEIOUÁÉÍÓÚ";

// Calculate score based on the word and license plate consonants, considering language
export function calculateScore(word: string, plateConsonants: string, language: 'es' | 'en'): number {
  // First check if word exists in the dictionary for the corresponding language
  if (!wordExists(word, language)) {
    console.log(`Word rejected as non-existent in ${language}: ${word}`);
    return -20; // Return negative score immediately for non-existent words
  }
  
  const uppercaseWord = word.toUpperCase();
  
  // Check if word has minimum length (4 letters for both languages)
  if (word.trim().length < 4) {
    console.log(`Word rejected due to length: ${word}`);
    return -20; // Return negative score for short words
  }

  // Track found consonants and their positions to determine ordering
  const foundConsonants = [];
  const positionsInWord = [];
  
  // Check each consonant from the plate
  for (const consonant of plateConsonants) {
    const index = uppercaseWord.indexOf(consonant);
    if (index !== -1) {
      foundConsonants.push(consonant);
      positionsInWord.push(index);
    }
  }
  
  // Number of consonants found
  const foundCount = foundConsonants.length;
  
  // Check if they are in the same order by verifying positions are ascending
  let inOrder = true;
  for (let i = 1; i < positionsInWord.length; i++) {
    if (positionsInWord[i] < positionsInWord[i-1]) {
      inOrder = false;
      break;
    }
  }
  
  console.log(`Word: ${word}, Found consonants: ${foundConsonants.join('')}, In order: ${inOrder}, Count: ${foundCount}`);
  
  // Apply scoring rules based on number of consonants found and their order
  let score = 0;
  
  if (foundCount === 3) {
    // All 3 consonants found
    score = inOrder ? 100 : 75;  // 3 consonants in order: 100 points; not in order: 75 points
    console.log(`3 consonants ${inOrder ? 'in order' : 'not in order'}: ${score} points`);
  } else if (foundCount === 2) {
    // 2 consonants found
    score = inOrder ? 50 : 25;   // 2 consonants in order: 50 points; not in order: 25 points
    console.log(`2 consonants ${inOrder ? 'in order' : 'not in order'}: ${score} points`);
  } else if (foundCount === 1) {
    // 1 consonant found
    score = 10;                  // 1 consonant: 10 points
    console.log(`1 consonant: ${score} points`);
  } else {
    // No consonants found
    score = -20;                 // Invalid word: -20 points
    console.log(`No consonants found: ${score} points`);
  }

  // Bonus for longer words
  if (score > 0 && word.length > 4) {
    const lengthBonus = Math.min(50, word.length * 5);
    score += lengthBonus;
    console.log(`Length bonus: +${lengthBonus} points`);
  }
  
  // Bonus for words in the opposite language (200 points)
  if (score > 0) {
    if ((language === 'es' && isEnglishWord(word)) || 
        (language === 'en' && isSpanishWord(word))) {
      score = Math.max(score, 0) + 200;
      console.log(`Foreign language bonus: +200 points`);
    }
  }

  // Special license plate bonus checks
  if (score > 0) {
    // Check for 6666 pattern in the license plate
    if (plateConsonants.startsWith("6666")) {
      score += 500; // Add 500 points bonus for 6666
      console.log(`License plate 6666 bonus: +500 points`);
    }
  }
  
  console.log(`Final score for ${word}: ${score}`);
  return score;
}

// Check if a word might be English (simplified)
export function isEnglishWord(word: string): boolean {
  const uppercaseWord = word.toUpperCase();
  
  // Check against English word list first
  if (ENGLISH_WORDS.has(uppercaseWord)) {
    console.log(`Word ${word} found in English dictionary`);
    return true;
  }
  
  // Check against common English patterns
  const englishPatterns = [
    /ing$/, /tion$/, /th/, /wh/, /ph/, /gh/, /sh/, /ght$/, /ought$/, /y$/,
    /ew$/, /dge$/, /ck$/, /mb$/, /kn/, /wr/
  ];
  
  return englishPatterns.some(pattern => pattern.test(uppercaseWord));
}

// Check if a word might be Spanish
export function isSpanishWord(word: string): boolean {
  const uppercaseWord = word.toUpperCase();
  
  // Check against Spanish word list first
  if (SPANISH_WORDS.has(uppercaseWord)) {
    console.log(`Word ${word} found in Spanish dictionary`);
    return true;
  }
  
  // Check common Spanish word patterns
  const spanishPatterns = [
    /ón$/, /ción$/, /sión$/, /ado$/, /ido$/, /ada$/, /ida$/, /mente$/, /idad$/,
    /aba$/, /ía$/, /ar$/, /er$/, /ir$/, /ñ/, /rr/, /ante$/, /ente$/, /anza$/,
    /enza$/, /eza$/, /ible$/, /able$/, /oso$/, /osa$/, /ísimo$/, /ísima$/
  ];
  
  const matchesPattern = spanishPatterns.some(pattern => pattern.test(uppercaseWord));
  if (matchesPattern) {
    console.log(`Word ${word} matches Spanish pattern`);
    return true;
  }
  
  return false;
}

// Check if a word is potentially valid (contains at least one required consonant)
export function isValidWord(word: string, plateConsonants: string): boolean {
  if (word.length < 4) return false; // Words must be at least 4 letters
  
  const uppercaseWord = word.toUpperCase();
  
  // Check if the word contains at least one consonant from the plate
  for (const consonant of plateConsonants) {
    if (uppercaseWord.includes(consonant)) {
      return true;
    }
  }
  
  return false;
}

// Get game level from points
export function getLevel(points: number): number {
  return Math.floor(points / 500) + 1;
}

// Get destination based on level
export function getDestination(level: number): string {
  const destinations = [
    "Madrid",
    "Barcelona",
    "Valencia",
    "Sevilla",
    "Bilbao",
    "Granada",
    "Toledo",
    "Santiago de Compostela",
    "Segovia",
    "Córdoba",
    "Salamanca",
    "San Sebastián",
    "Mallorca",
    "Canarias"
  ];
  
  const index = Math.min(destinations.length - 1, level - 1);
  return destinations[index];
}

// Word validation function - Enhanced to correctly validate words by language
export function wordExists(word: string, language: 'es' | 'en'): boolean {
  // First check if word length is sufficient
  if (word.length < 4) {
    console.log(`Word ${word} rejected: too short (less than 4 letters)`);
    return false;
  }
  
  const uppercaseWord = word.toUpperCase();
  
  // For Spanish words - check against Spanish dictionary
  if (language === 'es') {
    // 1. Check against our explicit dictionary
    if (SPANISH_WORDS.has(uppercaseWord)) {
      console.log(`Word ${word} found in Spanish dictionary`);
      return true;
    }
    
    // 2. Check against additional Spanish words list
    const additionalSpanishWords = [
      "MANTENIMIENTO", "HEREDERO", "HERIDA", "HERMANO", "HERMANA", "HERRAMIENTA", 
      "HIERRO", "HARINA", "HELADERIA", "HELADO", "FARSANTE", "FARMACIA", "FARSALIA",
      "FAROLA", "FAMOSO", "FANTASMA", "FANTASTICO", "FANTASIA", "FASCINANTE", 
      "FASCINAR", "FASTIDIAR", "FASTIDIO", "FATAL", "FAVORITO", "FEBRERO", "FELICIDAD",
      "FELIZ", "FEMENINO", "FENOMENO", "FERIA", "FEROZ", "FERTILIZANTE", "FESTIVAL",
      "FEUDAL", "FIABLE", "FIANZA", "FICCION", "FIDELIDAD", "FIEBRE", "FIEREZA",
      "FIESTA", "FIGURA", "FIJAR", "FILA", "FILOSOFIA", "FILTRAR", "FINAL", "FINALIZAR",
      "FINANCIAR", "FINO", "FIRMA", "FIRME", "FISCAL", "FISICO", "FLAUTA", "FLECHA",
      "FLOR", "FLOTAR", "FLUIR", "FOCO", "FOGATA", "FOLLETO", "FOMENTAR", "FONDO",
      "FORMA", "FORMAL", "FORMATO", "FORMAR", "FORMULA", "FORTUNA", "FORZAR", "FOSA",
      "FOTO", "FOTOGRAFIA", "FRACASAR", "FRACCION", "FRAGIL", "FRAGMENTO", "FRANCES",
      "FRANQUEZA", "FRASE", "FRATERNIDAD", "FRAUDE", "FRECUENCIA", "FRENO", "FRENTE",
      "FRESCO", "FREZA", "FRIGORIFICO", "FRIO", "FRONTERA", "FRUTA", "FUEGO", "FUENTE",
      "FUERA", "FUERTE", "FUERZA", "FUNCION", "FUNCIONAR", "FUNDAMENTAL", "FUNDAMENTO",
      "FUNDAR", "FUNERAL", "FUNESTO", "FURGONETA", "FURIOSO", "FUTBOL", "FUTURO"
    ];
    
    if (additionalSpanishWords.includes(uppercaseWord)) {
      console.log(`Word ${word} found in additional Spanish words list`);
      return true;
    }
    
    // 3. Check for Spanish patterns
    const spanishPatterns = [
      /ón$/, /ción$/, /sión$/, /ado$/, /ido$/, /ada$/, /ida$/, /mente$/, /idad$/,
      /aba$/, /ía$/, /ar$/, /er$/, /ir$/, /ñ/, /rr/, /ante$/, /ente$/, /anza$/,
      /enza$/, /eza$/, /ible$/, /able$/, /oso$/, /osa$/, /ísimo$/, /ísima$/
    ];
    
    if (spanishPatterns.some(pattern => pattern.test(uppercaseWord))) {
      console.log(`Word ${word} validated by Spanish patterns`);
      return true;
    }
    
    // 4. More generous length validation for Spanish
    if (word.length >= 5) {
      // Words 5+ letters are likely valid if they follow basic Spanish structure
      // Check that word follows vowel-consonant patterns typical in Spanish
      let vowelCount = 0;
      let consonantCount = 0;
      
      for (const char of uppercaseWord) {
        if ("AEIOUÁÉÍÓÚ".includes(char)) {
          vowelCount++;
        } else if ("BCDFGHJKLMNPQRSTVWXYZ".includes(char)) {
          consonantCount++;
        }
      }
      
      // Spanish words typically have good vowel-consonant ratio
      // and don't have more than 3 consonants in a row
      if (vowelCount > 1 && consonantCount > 0 && !(/[^AEIOUÁÉÍÓÚ]{4,}/).test(uppercaseWord)) {
        console.log(`Word ${word} likely valid Spanish based on structure and length`);
        return true;
      }
    }
    
    console.log(`Word ${word} not found in Spanish dictionary or patterns`);
    return false;
  }
  
  // For English words - check against English dictionary
  if (language === 'en') {
    if (ENGLISH_WORDS.has(uppercaseWord)) {
      console.log(`Word ${word} found in English dictionary`);
      return true;
    }
    
    // Additional English words - common English words that might not be in our limited dictionary
    const additionalEnglishWords = [
      "GAME", "PLAY", "WORD", "DICE", "CARD", "RULE", "TEAM", "MOVE", "TIME",
      "TURN", "ROOM", "WAVE", "RAIN", "SNOW", "WIND", "FIRE", "TREE", "ROAD",
      "FISH", "BIRD", "TOWN", "CITY", "HERO", "KING", "SAND", "LOGO", "SONG",
      "STAR", "BLUE", "PINK", "FAST", "SLOW", "WILD", "CALM", "GOOD", "EVIL",
      "GOLD", "DARK", "FARM", "LION", "FROG", "DOOR", "BAKE", "WEAR", "WEAK",
      "FACT", "FILM", "GOAL", "JUMP", "KISS", "LADY", "MILK", "NEWS", "PLAN",
      "SAFE", "SHIP", "TOUR", "VIEW", "VOTE", "WIDE", "ZERO", "ZONE", "TAPE"
    ];
    
    if (additionalEnglishWords.includes(uppercaseWord)) {
      console.log(`Word ${word} found in additional English words list`);
      return true;
    }
    
    // Check for common English word patterns
    const englishPatterns = [
      /ing$/, /tion$/, /th/, /wh/, /ph/, /gh/, /sh/, /ght$/, /ought$/, /y$/,
      /ew$/, /dge$/, /ck$/, /mb$/, /kn/, /wr/
    ];
    
    if (englishPatterns.some(pattern => pattern.test(uppercaseWord))) {
      console.log(`Word ${word} validated by English patterns`);
      return true;
    }
    
    console.log(`Word ${word} not found in English dictionary or patterns`);
    return false;
  }
  
  console.log(`Word ${word} not found in any dictionary or pattern match`);
  return false;
}

// Keep the existing SPANISH_WORDS set 
const SPANISH_WORDS = new Set([
  "CASA", "PERRO", "GATO", "MESA", "SILLA", "LIBRO", "PAPEL", "PLUMA", "CARRO",
  "MUNDO", "TIEMPO", "COLOR", "COMIDA", "AGUA", "TIERRA", "FUEGO", "AIRE", "VIDA",
  "AMOR", "ODIO", "FELIZ", "TRISTE", "GRANDE", "PEQUEÑO", "ALTO", "BAJO", "BUENO",
  "MALO", "NEGRO", "BLANCO", "ROJO", "VERDE", "AZUL", "AMARILLO", "SOL", "LUNA",
  "ESTRELLA", "CIELO", "MAR", "RIO", "MONTAÑA", "BOSQUE", "ARBOL", "FLOR", "FRUTA",
  "CAMINO", "CALLE", "CIUDAD", "PAIS", "MUNDO", "HOMBRE", "MUJER", "NIÑO", "NIÑA",
  "MANO", "PIE", "CABEZA", "OJO", "NARIZ", "BOCA", "OREJA", "PELO", "DIENTE", "BARCO",
  "TREN", "AVION", "MOTO", "CAMION", "CASA", "PUERTA", "VENTANA", "TECHO", "PARED",
  "PISO", "COCINA", "BAÑO", "COMEDOR", "DORMITORIO", "FRIO", "CALOR", "NIEVE", "LLUVIA",
  "VIENTO", "NUBE", "DIA", "NOCHE", "MAÑANA", "TARDE", "HORA", "MINUTO", "SEGUNDO",
  "SEMANA", "MES", "AÑO", "SIGLO", "TRABAJO", "ESCUELA", "UNIVERSIDAD", "TIENDA",
  "HOSPITAL", "BANCO", "CARTA", "TELEFONO", "TELEVISION", "COMPUTADORA", "INTERNET",
  "MUSICA", "PELICULA", "DEPORTE", "FUTBOL", "BALONCESTO", "TENIS", "NATACION", "FAMILIA",
  "AMIGO", "VECINO", "JEFE", "COMPAÑERO", "PROFESOR", "ESTUDIANTE", "MEDICO", "PACIENTE",
  "POLICIA", "LADRON", "JUEZ", "ABOGADO", "COCINERO", "CAMARERO", "VERANO", "LORO",
  // ... keep existing code (more Spanish words)
]);

// Keep the existing ENGLISH_WORDS set and add more common English words
const ENGLISH_WORDS = new Set([
  "HOUSE", "DOG", "CAT", "TABLE", "CHAIR", "BOOK", "PAPER", "PEN", "CAR",
  "WORLD", "TIME", "COLOR", "FOOD", "WATER", "EARTH", "FIRE", "AIR", "LIFE",
  "LOVE", "HATE", "HAPPY", "SAD", "BIG", "SMALL", "TALL", "SHORT", "GOOD",
  "BAD", "BLACK", "WHITE", "RED", "GREEN", "BLUE", "YELLOW", "SUN", "MOON",
  "STAR", "SKY", "SEA", "RIVER", "MOUNTAIN", "FOREST", "TREE", "FLOWER", "FRUIT",
  "ROAD", "STREET", "CITY", "COUNTRY", "WORLD", "MAN", "WOMAN", "BOY", "GIRL",
  "HAND", "FOOT", "HEAD", "EYE", "NOSE", "MOUTH", "EAR", "HAIR", "TOOTH", "BOAT",
  "TRAIN", "PLANE", "BIKE", "TRUCK", "DOOR", "WINDOW", "ROOF", "WALL",
  "FLOOR", "KITCHEN", "BATHROOM", "ROOM", "BEDROOM", "COLD", "HOT", "SNOW", "RAIN",
  "WIND", "CLOUD", "DAY", "NIGHT", "MORNING", "AFTERNOON", "HOUR", "MINUTE", "SECOND",
  "WEEK", "MONTH", "YEAR", "CENTURY", "JOB", "SCHOOL", "UNIVERSITY", "STORE",
  "HOSPITAL", "BANK", "LETTER", "PHONE", "TELEVISION", "COMPUTER", "INTERNET",
  "MUSIC", "MOVIE", "SPORT", "FOOTBALL", "BASKETBALL", "TENNIS", "SWIMMING", "FAMILY",
  "FRIEND", "NEIGHBOR", "BOSS", "COLLEAGUE", "TEACHER", "STUDENT", "DOCTOR", "PATIENT",
  "POLICE", "THIEF", "JUDGE", "LAWYER", "COOK", "WAITER", "SUMMER", "PARROT",
  // Adding more common English words to improve validation
  "ABOUT", "ABOVE", "AFTER", "AGAIN", "ALONG", "APPLE", "BEACH", "BEARD", "BELOW",
  "BERRY", "BIRTH", "BLOOD", "BOARD", "BRAIN", "BREAD", "BREAK", "BROWN", "BUNCH",
  "BUNCH", "CARRY", "CATCH", "CAUSE", "CHAIN", "CHAIR", "CHART", "CHECK", "CHEST",
  "CHILD", "CLOCK", "CLOUD", "COAST", "COUNT", "COURT", "COVER", "CROWD", "CROWN",
  "CYCLE", "DANCE", "DEPTH", "DREAM", "DRINK", "DRIVE", "EARLY", "EARTH", "ENJOY",
  "ENTER", "EVENT", "EVERY", "EXACT", "EXIST", "EXTRA", "FIELD", "FIRST", "FLOOR",
  "FOCUS", "FORCE", "FRAME", "FRESH", "FRONT", "FRUIT", "FUNNY", "GHOST", "GLASS",
  "GRANT", "GRASS", "GREAT", "GREEN", "GROUP", "GUIDE", "HEART", "HEAVY", "HORSE",
  "HOTEL", "HOUSE", "IMAGE", "INDEX", "INPUT", "ISSUE", "JOINT", "JUICE", "KNIFE",
  "KNOCK", "KNOWN", "LABEL", "LARGE", "LAUGH", "LEARN", "LEVEL", "LIGHT", "LIMIT",
  "LOCAL", "LOGIC", "LUCKY", "LUNCH", "MAGIC", "MAJOR", "MARCH", "MATCH", "METAL",
  "MIGHT", "MINOR", "MODEL", "MONEY", "MONTH", "MORAL", "MOTOR", "MOUNT", "MOUSE",
  "MOUTH", "MUSIC", "NEVER", "NIGHT", "NOISE", "NORTH", "NOVEL", "NURSE", "OCCUR",
  "OCEAN", "OFFER", "OFTEN", "ORDER", "OTHER", "OUGHT", "PAINT", "PANEL", "PAPER",
  "PARTY", "PEACE", "PHASE", "PHONE", "PHOTO", "PIANO", "PIECE", "PILOT", "PITCH",
  "PLACE", "PLAIN", "PLANE", "PLANT", "PLATE", "POINT", "POUND", "POWER", "PRESS",
  "PRICE", "PRIDE", "PRINT", "PRIOR", "PRIZE", "PROOF", "PROUD", "PROVE", "QUEEN",
  "QUICK", "QUIET", "QUITE", "RADIO", "RAISE", "RANGE", "RAPID", "RATIO", "REACH",
  "READY", "REFER", "RIGHT", "RIVER", "ROUTE", "ROYAL", "RURAL", "SCALE", "SCENE",
  "SCOPE", "SCORE", "SENSE", "SERVE", "SEVEN", "SHADE", "SHAKE", "SHALL", "SHAPE",
  "SHARE", "SHARP", "SHEEP", "SHEET", "SHELF", "SHELL", "SHIFT", "SHIRT", "SHOCK",
  "SHOOT", "SHORE", "SHORT", "SHOWN", "SIGHT", "SINCE", "SIXTH", "SKILL", "SLEEP",
  "SLIDE", "SMALL", "SMART", "SMILE", "SMOKE", "SMOOTH", "SOLAR", "SOLID", "SOLVE", 
  "SORRY", "SOUND", "SOUTH", "SPACE", "SPARE", "SPEAK", "SPEED", "SPEND", "SPLIT",
  "SPORT", "STAFF", "STAGE", "STAND", "START", "STATE", "STEAM", "STEEL", "STICK",
  "STILL", "STOCK", "STONE", "STORE", "STORM", "STORY", "STRIP", "STUDY", "STUFF",
  "STYLE", "SUGAR", "SUITE", "SUPER", "SWEET", "TABLE", "TAKEN", "TASTE", "TEACH",
  "TEETH", "THANK", "THEME", "THERE", "THICK", "THING", "THINK", "THIRD", "THOSE",
  "THREE", "THROW", "TIGHT", "TIMES", "TIRED", "TITLE", "TODAY", "TOPIC", "TOTAL",
  "TOUCH", "TOUGH", "TOWER", "TRACK", "TRADE", "TRAIN", "TREAT", "TREND", "TRIAL",
  "TRIED", "TRIES", "TRUCK", "TRULY", "TRUST", "TRUTH", "TWICE", "UNCLE", "UNDER",
  "UNION", "UNITE", "UNITY", "UNTIL", "UPPER", "UPSET", "URBAN", "USAGE", "USUAL",
  "VALID", "VALUE", "VIDEO", "VIRUS", "VISIT", "VITAL", "VOICE", "WASTE", "WATCH",
  "WATER", "WEIGH", "WHERE", "WHICH", "WHILE", "WHITE", "WHOLE", "WHOSE", "WIDTH",
  "WOMAN", "WORDS", "WORLD", "WORRY", "WORSE", "WORST", "WORTH", "WOULD", "WOUND",
  "WRITE", "WRONG", "WROTE", "YIELD", "YOUNG", "YOURS", "YOUTH", "ZEBRA", "PHONE"
]);
