
const useSound = () => {
  const playLevelUpSound = () => {
    try {
      const audio = new Audio('/lovable-uploads/level-up.mp3');
      audio.volume = 0.5;
      audio.play().catch(error => {
        console.error("Error playing sound:", error);
      });
    } catch (e) {
      console.error("Could not play level up sound", e);
    }
  };

  return { playLevelUpSound };
};

export default useSound;
