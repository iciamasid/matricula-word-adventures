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

// Spanish dictionary cache
let spanishDictionary: Set<string> | null = null;
let isLoadingDictionary = false;

// Load Spanish dictionary from JSON file
async function loadSpanishDictionary(): Promise<Set<string>> {
  if (spanishDictionary !== null) {
    return spanishDictionary;
  }
  
  if (isLoadingDictionary) {
    // If already loading, wait until it completes
    return new Promise((resolve) => {
      const checkInterval = setInterval(() => {
        if (spanishDictionary !== null) {
          clearInterval(checkInterval);
          resolve(spanishDictionary);
        }
      }, 100);
    });
  }
  
  isLoadingDictionary = true;
  
  try {
    const response = await fetch('/lovable-uploads/diccionario.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    // Convert to uppercase for case-insensitive comparison
    const wordSet = new Set(Object.keys(data).map(word => word.toUpperCase()));
    spanishDictionary = wordSet;
    console.log(`Loaded Spanish dictionary with ${wordSet.size} words`);
    return spanishDictionary;
  } catch (error) {
    console.error('Failed to load Spanish dictionary:', error);
    // Fallback to empty set to avoid crashes
    spanishDictionary = new Set();
    return spanishDictionary;
  } finally {
    isLoadingDictionary = false;
  }
}

// Initialize dictionary loading immediately
loadSpanishDictionary().catch(console.error);

// Calculate score based on the word and license plate consonants, considering language
export async function calculateScore(word: string, plateConsonants: string, language: 'es' | 'en'): Promise<number> {
  // First check if word exists in the dictionary for the corresponding language
  const isValidWord = await wordExists(word, language);
  if (!isValidWord) {
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
        (language === 'en' && await isSpanishWord(word))) {
      score = Math.max(score, 0) + 200;
      console.log(`Foreign language bonus: +200 points`);
    }
  }

  console.log(`Final score for ${word}: ${score}`);
  return score;
}

// Check if a word might be English (improved)
export function isEnglishWord(word: string): boolean {
  const uppercaseWord = word.toUpperCase();
  
  // Check against English word list first
  if (ENGLISH_WORDS.has(uppercaseWord)) {
    console.log(`Word ${word} found in English dictionary`);
    return true;
  }
  
  // Additional common English words for better validation
  const additionalEnglishWords = [
    "REMEMBER", "AMAZE", "GAME", "PLAY", "DRIVE", "QUICK", "JUMP", "ZONE",
    "BRAVE", "CRASH", "DREAM", "FLIGHT", "GHOST", "HAPPY", "JUICE", "KNIFE",
    "LOGIC", "MOVIE", "NORTH", "PLACE", "QUEEN", "SMILE", "THINK", "VOICE",
    "WATER", "ZEBRA", "YOUNG", "XYLOPHONE", "LEVEL", "MAGIC", "NIGHT"
  ];
  
  if (additionalEnglishWords.includes(uppercaseWord)) {
    console.log(`Word ${word} found in additional English words`);
    return true;
  }
  
  // Check against common English patterns
  const englishPatterns = [
    /ing$/, /tion$/, /th/, /wh/, /ph/, /gh/, /sh/, /ght$/, /ought$/, /y$/,
    /ew$/, /dge$/, /ck$/, /mb$/, /kn/, /wr/
  ];
  
  return englishPatterns.some(pattern => pattern.test(uppercaseWord));
}

// Check if a word might be Spanish - now using dictionary.json
export async function isSpanishWord(word: string): Promise<boolean> {
  const uppercaseWord = word.toUpperCase();
  
  try {
    // Load the Spanish dictionary from the JSON file
    const dictionary = await loadSpanishDictionary();
    
    // Check if the word exists in the dictionary
    return dictionary.has(uppercaseWord);
  } catch (error) {
    console.error('Error checking if word is Spanish:', error);
    return false;
  }
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

// Word validation function - Updated to use dictionary.json for Spanish words
export async function wordExists(word: string, language: 'es' | 'en'): Promise<boolean> {
  // First check if word length is sufficient
  if (word.length < 4) {
    console.log(`Word ${word} rejected: too short (less than 4 letters)`);
    return false;
  }
  
  const uppercaseWord = word.toUpperCase();
  
  // For Spanish words - check against Spanish dictionary from JSON file
  if (language === 'es') {
    try {
      // Load the Spanish dictionary
      const dictionary = await loadSpanishDictionary();
      
      // Check if the word exists in the dictionary
      const exists = dictionary.has(uppercaseWord);
      
      if (exists) {
        console.log(`Word ${word} found in Spanish dictionary JSON file`);
      } else {
        console.log(`Word ${word} NOT found in Spanish dictionary JSON file`);
      }
      
      return exists;
    } catch (error) {
      console.error('Error checking if word exists in Spanish dictionary:', error);
      return false;
    }
  }
  
  // For English words - keep existing validation logic
  if (language === 'en') {
    if (ENGLISH_WORDS.has(uppercaseWord)) {
      console.log(`Word ${word} found in English dictionary`);
      return true;
    }
    
    // Additional English words - common English words that might not be in our limited dictionary
    const additionalEnglishWords = [
      "REMEMBER", "GAME", "PLAY", "WORD", "DICE", "CARD", "RULE", "TEAM", "MOVE", "TIME",
      "TURN", "ROOM", "WAVE", "RAIN", "SNOW", "WIND", "FIRE", "TREE", "ROAD",
      "FISH", "BIRD", "TOWN", "CITY", "HERO", "KING", "SAND", "LOGO", "SONG",
      "STAR", "BLUE", "PINK", "FAST", "SLOW", "WILD", "CALM", "GOOD", "EVIL",
      "GOLD", "DARK", "FARM", "LION", "FROG", "DOOR", "BAKE", "WEAR", "WEAK",
      "FACT", "FILM", "GOAL", "JUMP", "KISS", "LADY", "MILK", "NEWS", "PLAN",
      "SAFE", "SHIP", "TOUR", "VIEW", "VOTE", "WIDE", "ZERO", "ZONE", "TAPE",
      "HOUSE", "MOUSE", "CLOUD", "STORE", "DRESS", "SPEED", "GREEN", "SWEET",
      "SOUND", "LIGHT", "NIGHT", "THING", "PHONE", "PLACE", "WATER", "PAPER"
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

// Keep the ENGLISH_WORDS set for English validation
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
  "REMEMBER", "FORGET", "THINK", "BELIEVE", "KNOW", "UNDERSTAND", "LEARN", "TEACH",
  "SPEAK", "TALK", "LISTEN", "HEAR", "SEE", "LOOK", "WATCH", "READ", "WRITE",
  "WALK", "RUN", "JUMP", "SWIM", "RIDE", "DRIVE", "FLY", "TRAVEL", "MOVE",
  "STOP", "START", "FINISH", "BEGIN", "END", "OPEN", "CLOSE", "PLAY", "WORK",
  "HELP", "GIVE", "TAKE", "MAKE", "CREATE", "BUILD", "BREAK", "DESTROY", "FIND",
  "LOSE", "WIN", "FAIL", "SUCCEED", "TRY", "TEST", "PROVE", "SHOW", "HIDE",
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
