
/**
 * Generates a license plate with 4 numbers and 3 consonants
 */
export function generatePlate() {
  const numbers = Array(4)
    .fill(0)
    .map(() => Math.floor(Math.random() * 10))
    .join("");
  
  // List of Spanish consonants
  const consonants = "BCDFGHJKLMNPQRSTVWXYZ";
  const randomConsonants = Array(3)
    .fill("")
    .map(() => consonants.charAt(Math.floor(Math.random() * consonants.length)));
  
  return {
    plate: `${numbers}${randomConsonants.join('')}`,
    consonants: randomConsonants,
  };
}
