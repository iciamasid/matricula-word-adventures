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
  // First check if word exists in the dictionary (specifically for the selected language)
  if (!wordExists(word, language)) {
    console.log(`Word rejected as non-existent in ${language}: ${word}`);
    return -20; // Return negative score immediately for non-existent words
  }
  
  // IMPORTANT: Check for language match - only accept English words in English mode and Spanish words in Spanish mode
  if (language === 'en' && !isEnglishWord(word)) {
    console.log(`Word rejected: ${word} - not an English word in English mode`);
    return -20;
  }
  
  if (language === 'es' && !isSpanishWord(word)) {
    console.log(`Word rejected: ${word} - not a Spanish word in Spanish mode`);
    return -20;
  }
  
  const uppercaseWord = word.toUpperCase();
  
  // Check if word has minimum length
  if (word.trim().length < 3) {
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
      const foreignBonus = 200;
      score = Math.max(score, 0) + foreignBonus;
      console.log(`Foreign language bonus: +${foreignBonus} points`);
    }
  }

  // Special license plate bonus checks
  if (score > 0) {
    // Check for 6666 pattern in the license plate - moved to a separate function
    // This is now handled in the context component after word submission
  }
  
  console.log(`Final score for ${word}: ${score}`);
  return score;
}

// Check if a word might be English (improved)
export function isEnglishWord(word: string): boolean {
  if (!word) return false;
  
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
  
  // For English validation, be more strict - only dictionary words are valid
  return ENGLISH_WORDS.has(uppercaseWord);
}

// Check if a word might be Spanish (improved)
export function isSpanishWord(word: string): boolean {
  if (!word) return false;
  
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
  
  return SPANISH_WORDS.has(uppercaseWord);
}

// Check if a word is potentially valid (contains at least one required consonant)
export function isValidWord(word: string, plateConsonants: string): boolean {
  if (word.length < 3) return false; // Words must be at least 3 letters
  
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

// Word validation function - Enhanced to strictly validate based on language
export function wordExists(word: string, language: 'es' | 'en'): boolean {
  // First check if word length is sufficient
  if (word.length < 3) {
    console.log(`Word ${word} rejected: too short`);
    return false;
  }
  
  const uppercaseWord = word.toUpperCase();
  
  // For Spanish words
  if (language === 'es') {
    // Check against our explicit dictionary
    if (SPANISH_WORDS.has(uppercaseWord)) {
      console.log(`Word ${word} found in Spanish dictionary`);
      return true;
    }
    
    // Check common Spanish patterns for more flexible Spanish mode
    const spanishPatterns = [
      /ón$/, /ción$/, /sión$/, /ado$/, /ido$/, /ada$/, /ida$/, /mente$/, /idad$/,
      /aba$/, /ía$/, /ar$/, /er$/, /ir$/, /ñ/, /rr/, /ante$/, /ente$/, /anza$/,
      /enza$/, /eza$/, /ible$/, /able$/, /oso$/, /osa$/, /ísimo$/, /ísima$/
    ];
    
    if (spanishPatterns.some(pattern => pattern.test(uppercaseWord))) {
      console.log(`Word ${word} validated by Spanish patterns`);
      return true;
    }
    
    // More generous length validation for Spanish
    if (word.length >= 5) {
      // Words 5+ letters are likely valid if they follow basic Spanish structure
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
      if (vowelCount > 1 && consonantCount > 0 && !(/[^AEIOUÁÉÍÓÚ]{4,}/).test(uppercaseWord)) {
        console.log(`Word ${word} likely valid Spanish based on structure and length`);
        return true;
      }
    }
  }
  
  // For English words - be more strict, only accept dictionary words
  if (language === 'en') {
    if (ENGLISH_WORDS.has(uppercaseWord)) {
      console.log(`Word ${word} found in English dictionary`);
      return true;
    }
  }
  
  console.log(`Word ${word} not found in any dictionary or pattern match for language: ${language}`);
  return false;
}

// Keep the existing SPANISH_WORDS and ENGLISH_WORDS sets
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
  // Adding many more common Spanish words
  "GUSTAR", "QUERER", "HACER", "TENER", "ESTAR", "COMER", "BEBER", "DORMIR", "HABLAR",
  "CANTAR", "BAILAR", "SALTAR", "CORRER", "CAMINAR", "JUGAR", "LEER", "ESCRIBIR", 
  "MIRAR", "ESCUCHAR", "PENSAR", "SOÑAR", "TRABAJAR", "ESTUDIAR", "ENSEÑAR", "APRENDER",
  "VIAJAR", "CONDUCIR", "NADAR", "COCINAR", "LIMPIAR", "COMPRAR", "VENDER", "PAGAR",
  "GANAR", "PERDER", "BUSCAR", "ENCONTRAR", "ABRIR", "CERRAR", "COMENZAR", "TERMINAR",
  "ENTRAR", "SALIR", "SUBIR", "BAJAR", "LLEGAR", "PARTIR", "QUEDAR", "PONER", "SACAR",
  "LLEVAR", "TRAER", "DAR", "RECIBIR", "MANDAR", "ENVIAR", "ESPERAR", "CONTINUAR",
  "PARAR", "SEGUIR", "VOLVER", "GIRAR", "CAMBIAR", "MEJORAR", "EMPEORAR", "AUMENTAR",
  "DISMINUIR", "ACABAR", "INICIAR", "PREPARAR", "ARREGLAR", "ROMPER", "DESTRUIR",
  "CONSTRUIR", "CREAR", "INVENTAR", "DESCUBRIR", "EXPLICAR", "CONTAR", "MOSTRAR",
  "DEBER", "PODER", "SABER", "CONOCER", "CREER", "PENSAR", "SENTIR", "PARECER",
  "GUSTAR", "ENCANTAR", "ODIAR", "AMAR", "NECESITAR", "FALTAR", "SOBRAR", "BASTAR",
  "IMPORTAR", "INTERESAR", "PREOCUPAR", "ALEGRAR", "ENTRISTECER", "ENFADAR", "CALMAR",
  "TRANQUILIZAR", "ANIMAR", "DESANIMAR", "ASUSTAR", "SORPRENDER", "CONFUNDIR", "ACLARAR",
  "PEDIR", "PREGUNTAR", "RESPONDER", "CONTESTAR", "DECIR", "GRITAR", "SUSURRAR", "CALLAR",
  "REIR", "LLORAR", "SONREIR", "SUSPIRAR", "RESPIRAR", "TOSER", "ESTORNUDAR", "BOSTEZAR",
  "DESPERTAR", "LEVANTAR", "ACOSTAR", "SENTAR", "PARAR", "ANDAR", "MOVER", "TOCAR",
  "COGER", "SOLTAR", "TIRAR", "EMPUJAR", "CARGAR", "DESCARGAR", "FIRMAR", "BORRAR",
  "MARCAR", "SEÑALAR", "INDICAR", "APUNTAR", "DIRIGIR", "SEGUIR", "PERSEGUIR", "ALCANZAR",
  "PRIMAVERA", "OTOÑO", "INVIERNO", "PAJARO", "GATO", "PERRO", "PATO", "OSO", "LEON",
  "TIGRE", "ELEFANTE", "JIRAFA", "CEBRA", "MONO", "CABALLO", "VACA", "CERDO", "GALLINA",
  "POLLO", "OVEJA", "CABRA", "CONEJO", "RATON", "ARDILLA", "SERPIENTE", "LAGARTO",
  "TORTUGA", "COCODRILO", "PEZ", "TIBURON", "BALLENA", "DELFIN", "AGUILA", "PALOMA",
  "PINGUINO", "PULPO", "CALAMAR", "ARAÑA", "MOSCA", "ABEJA", "MARIPOSA", "HORMIGA",
  "VERANO", "LORO", "HEREDERO", "HERIDA", "HERMANO", "HERMANA", "HERRAMIENTA", "HIERRO",
  "MANTENIMIENTO", "MANTENEDOR", "MANTEL", "MANTENER", "MANZANA", "MAPA", "MAR", "MARAVILLA",
  "MARCO", "MAREAR", "MARGEN", "MARIDO", "MARIPOSA", "MARMOL", "MARRON", "MARTILLO",
  "MARZO", "MAS", "MASA", "MASCARA", "MASCAR", "MASCULINO", "MASIVO", "MATAR",
  "MATE", "MATERIAL", "MATERNO", "MATRIZ", "MATRIMONIO", "MAXIMO", "MAYO", "MAYOR",
  "MEDALLA", "MEDIA", "MEDIANO", "MEDICO", "MEDIDA", "MEDIO", "MEDIOCRE", "MEDIR",
  "MEJOR", "MELANCOLIA", "MELON", "MEMORIA", "MENOR", "MENSAJE", "MENTIR", "MENU",
  "MERECER", "MES", "MESA", "META", "METER", "METODO", "METRO", "MIEDO", "MIEL",
  "MIEMBRO", "MIENTRAS", "MIERCOLES", "MIL", "MILAGRO", "MILITAR", "MILLON", "MINIMO",
  "MINISTERIO", "MINUTO", "MIRAR", "MISMO", "MITAD", "MITO", "MOCHILA", "MODA",
  "MODELO", "MODERNO", "MODO", "MOLESTAR", "MOMENTO", "MONEDA", "MONSTRUO", "MONTE",
  "MORAL", "MORAR", "MORDER", "MORENO", "MORIR", "MOSCA", "MOSTRAR", "MOTIVO",
  "MOTOR", "MOVER", "MOVIL", "MUCHACHA", "MUCHACHO", "MUCHO", "MUEBLE", "MUERTE",
  "MUJER", "MUNDIAL", "MUNDO", "MUNICIPAL", "MURAL", "MURO", "MUSICA", "MUSCULO",
  "MUSEO", "MUSICA", "MUSLO", "MUY", "NACER", "NACIONAL", "NADA", "NADAR", "NADIE",
  "NAIPE", "NARANJA", "NARIZ", "NARRAR", "NASAL", "NATURALEZA", "NATURAL", "NAVAL",
  "NAVEGAR", "NAVIO", "NECESARIO", "NECESIDAD", "NECESITAR", "NEGATIVO", "NEGOCIAR",
  "NEGOCIO", "NEGRO", "NERVIO", "NERVIOSO", "NETO", "NEUTRAL", "NEUTRO", "NEVAR",
  "NIDO", "NIEBLA", "NIEVE", "NINGUNO", "NIÑO", "NIVEL", "NOBLE", "NOCHE", "NOMBRE"
]);

// Keep the existing ENGLISH_WORDS set
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
  "LIKE", "WANT", "MAKE", "HAVE", "BE", "EAT", "DRINK", "SLEEP", "TALK",
  "SING", "DANCE", "JUMP", "RUN", "WALK", "PLAY", "READ", "WRITE", "LOOK",
  "LISTEN", "THINK", "DREAM", "WORK", "STUDY", "TEACH", "LEARN", "TRAVEL", "DRIVE",
  "SWIM", "COOK", "CLEAN", "BUY", "SELL", "PAY", "WIN", "LOSE", "SEARCH",
  "FIND", "OPEN", "CLOSE", "START", "END", "ENTER", "EXIT", "CLIMB", "DESCEND",
  "COME", "GO", "BRING", "TAKE", "GIVE", "RECEIVE", "SEND", "GET", "PUT",
  "SET", "MEET", "SEE", "WATCH", "HEAR", "FEEL", "SMELL", "TASTE", "TOUCH",
  "KNOW", "UNDERSTAND", "REMEMBER", "FORGET", "BELIEVE", "HOPE", "WISH", "NEED",
  "WANT", "HELP", "ASK", "ANSWER", "TELL", "SAY", "SPEAK", "CALL", "SHOUT",
  "CRY", "LAUGH", "SMILE", "FROWN", "STOP", "WAIT", "CONTINUE", "CHANGE", "TURN",
  "MOVE", "STAY", "SIT", "STAND", "LIE", "FALL", "RISE", "FOLLOW", "LEAD",
  "HIDE", "SEEK", "REACH", "ARRIVE", "DEPART", "LEAVE", "RETURN", "VISIT",
  "BREAK", "BUILD", "CREATE", "DESTROY", "DAMAGE", "REPAIR", "FIX", "IMPROVE",
  "TRY", "SUCCEED", "FAIL", "BEAT", "FIGHT", "ATTACK", "DEFEND", "PROTECT",
  "SAVE", "SPEND", "BUY", "SELL", "COST", "PAY", "OWE", "BORROW", "LEND",
  "SHARE", "DIVIDE", "ADD", "SUBTRACT", "MULTIPLY", "CALCULATE", "MEASURE",
  "WEIGH", "COUNT", "FILL", "EMPTY", "COVER", "WRAP", "PACK", "CARRY", "LIFT",
  "PUSH", "PULL", "THROW", "CATCH", "HOLD", "SHAKE", "WAVE", "NOD", "POINT",
  "TOUCH", "KISS", "HUG", "SQUEEZE", "PRESS", "WASH", "CLEAN", "COOK", "BAKE",
  "BOIL", "FRY", "GRILL", "DRINK", "SIP", "SWALLOW", "BITE", "CHEW", "TASTE",
  "SMELL", "BREATHE", "COUGH", "SNEEZE", "YAWN", "SNORE", "WAKE", "SLEEP",
  "DREAM", "REST", "RELAX", "WORRY", "STRESS", "CALM", "EXCITE", "BORE",
  "INTEREST", "AMUSE", "ENTERTAIN", "PLEASE", "ANNOY", "ANGER", "FRIGHTEN",
  "SCARE", "SURPRISE", "SHOCK", "CONFUSE", "PUZZLE", "DOUBT", "TRUST", "SUSPECT",
  "GUESS", "CHECK", "DECIDE", "CHOOSE", "SELECT", "PICK", "PREFER", "AGREE",
  "ACCEPT", "REFUSE", "REJECT", "ALLOW", "PERMIT", "FORBID", "PROHIBIT", "ENABLE",
  "DISABLE", "ENCOURAGE", "DISCOURAGE", "PRAISE", "CRITICIZE", "BLAME", "FORGIVE",
  "APOLOGIZE", "THANK", "WELCOME", "GREET", "INTRODUCE", "INVITE", "JOIN", "BELONG",
  "INCLUDE", "EXCLUDE", "SURVIVE", "EXIST", "LIVE", "GROW", "DEVELOP", "INCREASE",
  "DECREASE", "EXPAND", "EXTEND", "REDUCE", "SHRINK", "BEGIN", "START", "CONTINUE",
  "PROCEED", "PROGRESS", "FINISH", "END", "COMPLETE", "SUCCEED", "ACCOMPLISH",
  "ACHIEVE", "ATTEMPT", "TRY", "ENDEAVOR", "EFFORT", "STRUGGLE", "STRIVE",
  "HERO", "HERITAGE", "HERMIT", "MAINTENANCE"
]);
