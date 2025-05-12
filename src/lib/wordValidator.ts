
/**
 * Validates if a word contains at least one of the required consonants
 */
export function isValidWord(word: string, plateConsonants: string[]): boolean {
  if (!word || word.length < 3) {
    return false;
  }
  
  const uppercaseWord = word.toUpperCase();
  
  // Check if plateConsonants is an array or convert it to one
  let consonantsArray: string[];
  
  if (Array.isArray(plateConsonants)) {
    consonantsArray = plateConsonants;
  } else if (typeof plateConsonants === 'string') {
    try {
      const parsed = JSON.parse(plateConsonants);
      consonantsArray = Array.isArray(parsed) ? parsed : [plateConsonants];
    } catch {
      consonantsArray = [plateConsonants];
    }
  } else {
    consonantsArray = [];
  }
  
  // Check if the word contains at least one consonant from the plate
  for (const consonant of consonantsArray) {
    if (uppercaseWord.includes(consonant)) {
      return true;
    }
  }
  
  return false;
}
