export interface Destination {
  city: string;
  country: string;
  flag: string;
  fact?: string;
}

export const WORLD_DESTINATIONS: Destination[] = [
  {
    city: 'Madrid',
    country: 'España',
    flag: '🇪🇸',
    fact: '¡En Madrid está el museo del Prado con obras de arte increíbles! Es una de las galerías de arte más famosas del mundo.'
  },
  {
    city: 'París',
    country: 'Francia',
    flag: '🇫🇷',
    fact: '¡La Torre Eiffel mide 324 metros! ¡Es tan alta como un edificio de 81 pisos y fue construida en 1889!'
  },
  {
    city: 'Roma',
    country: 'Italia',
    flag: '🇮🇹',
    fact: '¡El Coliseo romano tenía capacidad para 50.000 espectadores!'
  },
  {
    city: 'Moscú',
    country: 'Rusia',
    flag: '🇷🇺',
    fact: '¡La Plaza Roja de Moscú es tan grande como 9 campos de fútbol!'
  },
  {
    city: 'Tokio',
    country: 'Japón',
    flag: '🇯🇵',
    fact: '¡En Japón hay más de 200 volcanes!'
  },
  {
    city: 'Sídney',
    country: 'Australia',
    flag: '🇦🇺',
    fact: '¡Australia tiene más de 10.000 playas! Tardarías 27 años en visitar una cada día.'
  },
  {
    city: 'Nueva York',
    country: 'Estados Unidos',
    flag: '🇺🇸',
    fact: '¡El Gran Cañón en Estados Unidos tiene más de 1.6 km de profundidad!'
  },
  {
    city: 'Ciudad de México',
    country: 'México',
    flag: '🇲🇽',
    fact: '¡México tiene 34 sitios declarados Patrimonio de la Humanidad por la UNESCO!'
  },
  {
    city: 'Buenos Aires',
    country: 'Argentina',
    flag: '🇦🇷',
    fact: '¡Las Cataratas del Iguazú tienen 275 saltos de agua diferentes!'
  },
  {
    city: 'Lima',
    country: 'Perú',
    flag: '🇵🇪',
    fact: '¡La ciudadela de Machu Picchu fue construida en el siglo XV!'
  }
];

export const getCountryPosition = (country: string) => {
  switch (country) {
    case "España":
      return { left: "44%", top: "54%" };
    case "Francia":
      return { left: "41%", top: "48%" };
    case "Italia":
      return { left: "46%", top: "50%" };
    case "Rusia":
      return { left: "65%", top: "40%" };
    case "Japón":
      return { left: "85%", top: "40%" };
    case "Australia":
      return { left: "85%", top: "70%" };
    case "Estados Unidos":
      return { left: "20%", top: "40%" };
    case "México":
      return { left: "20%", top: "55%" };
    case "Argentina":
      return { left: "30%", top: "75%" };
    case "Perú":
      return { left: "25%", top: "65%" };
    default:
      return { left: "50%", top: "50%" };
  }
};

export const getCountryImage = (country: string) => {
  const normalizedCountry = country.toLowerCase();
  
  switch (normalizedCountry) {
    case "españa":
      return "/lovable-uploads/madrid.jpg";
    case "francia":
      return "/lovable-uploads/paris.jpg";
    case "italia":
      return "/lovable-uploads/roma.jpg";
    case "rusia":
      return "/lovable-uploads/moscu.jpg";
    case "japon":
      return "/lovable-uploads/tokio.jpg";
    case "australia":
      return "/lovable-uploads/sidney.jpg";
    case "estados unidos":
      return "/lovable-uploads/nuevayork.jpg";
    case "méxico":
      return "/lovable-uploads/mexico.jpg";
    case "argentina":
      return "/lovable-uploads/buenosaires.jpg";
    default:
      return "/lovable-uploads/default.jpg";
  }
};

// Add the missing getCountryFacts function
export const getCountryFacts = (countryName: string): string[] => {
  const countryData = WORLD_DESTINATIONS.find(
    dest => dest.country.toLowerCase() === countryName.toLowerCase()
  );
  
  // Default facts
  const defaultFacts = [
    `${countryName} es un país fascinante con una rica historia y cultura.`,
    `${countryName} tiene una gran diversidad de paisajes y lugares para visitar.`
  ];
  
  // Country-specific facts
  switch(countryName.toLowerCase()) {
    case 'españa':
      return [
        'España tiene 47 sitios declarados Patrimonio de la Humanidad por la UNESCO.',
        'La Sagrada Familia en Barcelona lleva en construcción desde 1882.',
        'España es el mayor productor de aceite de oliva del mundo.'
      ];
    case 'francia':
      return [
        'La Torre Eiffel mide 324 metros de altura.',
        'Francia es el país más visitado del mundo, con más de 89 millones de turistas al año.',
        'El Louvre es el museo de arte más grande del mundo, con 380.000 objetos y 35.000 obras de arte.'
      ];
    case 'italia':
      return [
        'Italia tiene más sitios del Patrimonio Mundial de la UNESCO que cualquier otro país.',
        'El Coliseo de Roma podía albergar hasta 80.000 espectadores.',
        'La pizza moderna nació en Nápoles, Italia, en el siglo XVIII.'
      ];
    case 'rusia':
      return [
        'Rusia es el país más grande del mundo, abarcando 11 zonas horarias.',
        'El Metro de Moscú es conocido por sus estaciones ornamentadas, consideradas palacios subterráneos.',
        'El Lago Baikal en Rusia es el lago de agua dulce más profundo del mundo.'
      ];
    case 'japón':
      return [
        'Japón tiene más de 200 volcanes y 6.852 islas.',
        'Los japoneses tienen la mayor esperanza de vida del mundo.',
        'En Japón hay más de 5 millones de máquinas expendedoras, una por cada 23 habitantes.'
      ];
    case 'australia':
      return [
        'Australia es el único país que ocupa un continente entero.',
        'La Gran Barrera de Coral es el organismo vivo más grande de la Tierra.',
        'Australia tiene más de 10.000 playas. Tardarías más de 27 años en visitar una cada día.'
      ];
    case 'estados unidos':
      return [
        'Estados Unidos tiene 63 parques nacionales que cubren más de 52 millones de acres.',
        'El Gran Cañón tiene 446 km de largo, hasta 29 km de ancho y más de 1,6 km de profundidad.',
        'La Estatua de la Libertad fue un regalo de Francia a Estados Unidos en 1886.'
      ];
    case 'méxico':
      return [
        'México tiene 34 sitios declarados Patrimonio de la Humanidad por la UNESCO.',
        'La pirámide de Cholula en México es la pirámide más grande del mundo por volumen.',
        'México tiene la mayor población de hispanohablantes del mundo.'
      ];
    case 'argentina':
      return [
        'Las Cataratas del Iguazú tienen 275 saltos de agua diferentes.',
        'Argentina produce y consume más carne per cápita que cualquier otro país.',
        'El Obelisco de Buenos Aires mide 67,5 metros de altura y fue construido en solo 31 días.'
      ];
    default:
      return defaultFacts;
  }
};
