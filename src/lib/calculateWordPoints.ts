
/**
 * Calculate points for a word based on length and letter values
 */
export function calculateWordPoints(word: string): number {
  if (!word || word.length === 0) {
    return 0;
  }

  const uppercaseWord = word.toUpperCase();
  
  // Base points based on word length
  let points = Math.min(50, word.length * 10);
  
  // High-value letters (less common in Spanish)
  const highValueLetters = "JKQVWXYZ";
  const mediumValueLetters = "BCDFGHÑ";
  
  // Add bonus points for high-value letters
  for (const letter of uppercaseWord) {
    if (highValueLetters.includes(letter)) {
      points += 15;
    } else if (mediumValueLetters.includes(letter)) {
      points += 5;
    }
  }
  
  // Add bonus for longer words
  if (word.length >= 7) {
    points += 30;
  } else if (word.length >= 5) {
    points += 15;
  }
  
  return points;
}
