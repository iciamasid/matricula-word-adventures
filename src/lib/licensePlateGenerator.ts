
/**
 * License Plate Generator utility functions
 */

/**
 * Generates a random set of consonants for the license plate
 * @returns {string} A string of 4 consonants or a special pattern
 */
export const getPlateConsonants = (): string => {
  // Define set of possible consonants (excluding vowels)
  const consonants = "BCDFGHJKLMNPQRSTVWXYZ";
  
  // Special cases - about 5% chance to get a special plate
  const random = Math.random();
  if (random < 0.05) {
    // Generate a 4-digit number (birth year like)
    const currentYear = new Date().getFullYear();
    const randomYear = Math.floor(Math.random() * 100) + (currentYear - 100);
    return randomYear.toString();
  }
  
  // Generate 4 random consonants
  let result = "";
  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * consonants.length);
    result += consonants[randomIndex];
  }
  
  return result;
};
