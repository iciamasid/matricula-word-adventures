
/**
 * License plate generator functions
 */

/**
 * Generate random consonants for a license plate
 * @returns string A 3-letter consonant string
 */
export const getPlateConsonants = (): string => {
  const consonants = ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z'];
  let result = '';
  
  // For the license plate numbers (0000-9999)
  const randomNumber = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  
  // Special cases for bonus - occasionally generate specific plates
  const specialRoll = Math.random();
  if (specialRoll < 0.05) {
    // 5% chance of generating "6666" license plate
    return "6666";
  }
  
  // Generate three random consonants after the number
  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * consonants.length);
    result += consonants[randomIndex];
  }
  
  return randomNumber;
};

/**
 * Generate a full license plate with both numbers and letters
 * @returns object with numbers and consonants
 */
export const generateLicensePlate = () => {
  // Generate a 4-digit number between 0000-9999
  const numbers = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  
  // Generate 3 random consonants
  const consonants = getPlateConsonants();
  
  return {
    numbers,
    consonants,
    full: `${numbers}-${consonants}`
  };
};
