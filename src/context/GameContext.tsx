import React, { createContext, useState, useContext } from 'react';
import { CarColor } from '@/components/games/utils/carUtils';

interface CountryInfo {
  city: string;
  country: string;
  flag: string;
}

interface GameContextType {
  originInfo: CountryInfo;
  destinationInfo: CountryInfo;
  originWord: string;
  destinationWord: string;
  selectedCarColor: CarColor | null;
  setOriginInfo: (info: CountryInfo) => void;
  setDestinationInfo: (info: CountryInfo) => void;
  setOriginWord: (word: string) => void;
  setDestinationWord: (word: string) => void;
  setSelectedCarColor: (color: CarColor | null) => void;
}

export const GameContext = createContext<GameContextType>({
  originInfo: { city: '', country: '', flag: '' },
  destinationInfo: { city: '', country: '', flag: '' },
  originWord: '',
  destinationWord: '',
  selectedCarColor: { id: "2", name: "Coche Azul", image: "cocheazul.png", color: "bg-blue-500" }, // Set blue car as default
  setOriginInfo: () => {},
  setDestinationInfo: () => {},
  setOriginWord: () => {},
  setDestinationWord: () => {},
  setSelectedCarColor: () => {},
});

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [originInfo, setOriginInfo] = useState<CountryInfo>({ city: '', country: '', flag: '' });
  const [destinationInfo, setDestinationInfo] = useState<CountryInfo>({ city: '', country: '', flag: '' });
  const [originWord, setOriginWord] = useState<string>('');
  const [destinationWord, setDestinationWord] = useState<string>('');
  // Set the default selected car to the blue one (id: "2")
  const [selectedCarColor, setSelectedCarColor] = useState<CarColor>({ 
    id: "2", 
    name: "Coche Azul", 
    image: "cocheazul.png", 
    color: "bg-blue-500" 
  });

  return (
    <GameContext.Provider value={{
      originInfo,
      destinationInfo,
      originWord,
      destinationWord,
      selectedCarColor,
      setOriginInfo,
      setDestinationInfo,
      setOriginWord,
      setDestinationWord,
      setSelectedCarColor,
    }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);
