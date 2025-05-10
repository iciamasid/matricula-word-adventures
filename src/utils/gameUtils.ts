
// Generates a random license plate with 4 numbers and 3 consonants
export function generateLicensePlate(): string {
  const numbers = Array(4)
    .fill(0)
    .map(() => Math.floor(Math.random() * 10))
    .join("");
  
  const consonants = "BCDFGHJKLMNPQRSTVWXYZ";
  const randomConsonants = Array(3)
    .fill("")
    .map(() => consonants.charAt(Math.floor(Math.random() * consonants.length)))
    .join("");
  
  return `${numbers}${randomConsonants}`;
}

// Extracts the consonants from the license plate
export function getConsonantsFromPlate(plate: string): string {
  return plate.substring(4);
}

// Get a list of possible Spanish vowels
export const vowels = "AEIOUÁÉÍÓÚ";

// Calculate score based on the word and license plate consonants
export function calculateScore(word: string, plateConsonants: string): number {
  const uppercaseWord = word.toUpperCase();
  let score = 0;
  let foundConsonants = 0;
  let inOrder = true;
  let lastIndex = -1;

  // Check each consonant from the plate
  for (let i = 0; i < plateConsonants.length; i++) {
    const consonant = plateConsonants[i];
    const index = uppercaseWord.indexOf(consonant);
    
    if (index !== -1) {
      foundConsonants++;
      
      // Check if consonants appear in order
      if (lastIndex !== -1 && index <= lastIndex) {
        inOrder = false;
      }
      lastIndex = index;
    }
  }

  // Calculate score based on found consonants and order
  if (foundConsonants === 3) {
    score = inOrder ? 100 : 50;
  } else if (foundConsonants === 2) {
    score = 25;
  } else if (foundConsonants === 1) {
    score = 10;
  }

  // Bonus for longer words
  score += Math.min(50, word.length * 5);

  return score;
}

// Get game level from points
export function getLevel(points: number): number {
  return Math.floor(points / 500) + 1;
}

// Get car model based on level
export function getCarModel(level: number): string {
  const cars = [
    "Compact",
    "Sedan",
    "SUV",
    "Sports Car",
    "Luxury Sedan",
    "Super Car",
    "Hypercar"
  ];
  
  const index = Math.min(cars.length - 1, Math.floor((level - 1) / 3));
  return cars[index];
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

// Check if a word is potentially valid (contains the required consonants)
export function isValidWord(word: string, plateConsonants: string): boolean {
  const uppercaseWord = word.toUpperCase();
  let foundConsonants = 0;
  
  for (const consonant of plateConsonants) {
    if (uppercaseWord.includes(consonant)) {
      foundConsonants++;
    }
  }
  
  return foundConsonants > 0;
}
