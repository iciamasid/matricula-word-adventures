export interface MotorcycleDestination {
  country: string;
  flag: string;
  position: {
    left: string;
    top: string;
  };
  unlockedAtLevel: number;
}

export const getMotorcycleCountryPosition = (country: string) => {
  const destination = MOTORCYCLE_DESTINATIONS.find((dest) => dest.country === country);
  return destination ? destination.position : { left: "0%", top: "0%" };
};

export const MOTORCYCLE_DESTINATIONS: MotorcycleDestination[] = [
  {
    country: "Portugal",
    flag: "🇵🇹",
    position: { left: "20%", top: "45%" },
    unlockedAtLevel: 0 // Always unlocked
  },
  {
    country: "Reino Unido",
    flag: "🇬🇧", 
    position: { left: "35%", top: "25%" },
    unlockedAtLevel: 2
  },
  {
    country: "Grecia",
    flag: "🇬🇷",
    position: { left: "55%", top: "55%" },
    unlockedAtLevel: 3
  },
  {
    country: "Noruega", 
    flag: "🇳🇴",
    position: { left: "45%", top: "15%" },
    unlockedAtLevel: 4
  },
  {
    country: "China",
    flag: "🇨🇳",
    position: { left: "85%", top: "35%" },
    unlockedAtLevel: 5
  },
  {
    country: "Canadá",
    flag: "🇨🇦", 
    position: { left: "15%", top: "20%" },
    unlockedAtLevel: 6
  },
  {
    country: "Costa Rica",
    flag: "🇨🇷",
    position: { left: "25%", top: "65%" },
    unlockedAtLevel: 7
  },
  {
    country: "Brasil",
    flag: "🇧🇷",
    position: { left: "40%", top: "75%" },
    unlockedAtLevel: 8
  },
  {
    country: "Perú",
    flag: "🇵🇪",
    position: { left: "30%", top: "70%" },
    unlockedAtLevel: 9
  }
];
