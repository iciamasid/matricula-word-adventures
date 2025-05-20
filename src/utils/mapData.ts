// Country positions on the map
const countryPositions: Record<string, { left: string, top: string }> = {
  "España": { left: "47.5%", top: "38.5%" },
  "Spain": { left: "47.5%", top: "38.5%" },
  "Francia": { left: "48.2%", top: "36%" },
  "France": { left: "48.2%", top: "36%" },
  "Italia": { left: "50.5%", top: "38%" },
  "Italy": { left: "50.5%", top: "38%" },
  "Rusia": { left: "58%", top: "32%" },
  "Russia": { left: "58%", top: "32%" },
  "Japón": { left: "80%", top: "40%" },
  "Japan": { left: "80%", top: "40%" },
  "Estados Unidos": { left: "20%", top: "38%" },
  "United States": { left: "20%", top: "38%" },
  "México": { left: "17%", top: "48%" },
  "Méjico": { left: "17%", top: "48%" }, // Added alternate spelling
  "Mexico": { left: "17%", top: "48%" },
  "Australia": { left: "83%", top: "70%" },
  "Perú": { left: "25%", top: "57%" },
  "Peru": { left: "25%", top: "57%" },
  "Argentina": { left: "31%", top: "70%" }
};

// Country flag images
const countryImages: Record<string, string> = {
  "España": "/lovable-uploads/82ed4a47-c090-4db2-b49e-6041114c97b7.png",
  "Spain": "/lovable-uploads/82ed4a47-c090-4db2-b49e-6041114c97b7.png",
  "Francia": "/lovable-uploads/276d9054-061e-45b9-9517-d7f0d8218579.png",
  "France": "/lovable-uploads/276d9054-061e-45b9-9517-d7f0d8218579.png",
  "Italia": "/lovable-uploads/501f7c44-46fc-44ae-8a9f-94b1215f5544.png",
  "Italy": "/lovable-uploads/501f7c44-46fc-44ae-8a9f-94b1215f5544.png",
  "Rusia": "/lovable-uploads/13c721ae-3f14-415a-86bb-0228c47d8425.png",
  "Russia": "/lovable-uploads/13c721ae-3f14-415a-86bb-0228c47d8425.png",
  "Japón": "/lovable-uploads/54b230f6-8a76-4e9a-ae4c-5fa2f7087600.png",
  "Japan": "/lovable-uploads/54b230f6-8a76-4e9a-ae4c-5fa2f7087600.png",
  "Estados Unidos": "/lovable-uploads/21e71de1-c8e4-4bbb-95d6-67ce7ae41316.png",
  "United States": "/lovable-uploads/21e71de1-c8e4-4bbb-95d6-67ce7ae41316.png",
  "México": "/lovable-uploads/2957a4f7-6a54-4e2f-bda1-2177609abc5f.png",
  "Méjico": "/lovable-uploads/2957a4f7-6a54-4e2f-bda1-2177609abc5f.png", // Added alternate spelling
  "Mexico": "/lovable-uploads/2957a4f7-6a54-4e2f-bda1-2177609abc5f.png",
  "Australia": "/lovable-uploads/e27d86a7-9c73-425d-806e-1e86fd6c6e99.png",
  "Perú": "/lovable-uploads/24de870a-769c-4544-8001-8554fe29e7f0.png",
  "Peru": "/lovable-uploads/24de870a-769c-4544-8001-8554fe29e7f0.png",
  "Argentina": "/lovable-uploads/6060d896-a127-404e-987c-3cd8814f558a.png"
};

// Get country position on the map
export const getCountryPosition = (country: string) => {
  return countryPositions[country] || { left: "50%", top: "50%" };
};

// Get country flag image
export const getCountryImage = (country: string) => {
  return countryImages[country] || "/lovable-uploads/501f7c44-46fc-44ae-8a9f-94b1215f5544.png";
};

// Add the missing getCountryFacts function
export const getCountryFacts = (country: string): string[] => {
  // Facts about each country
  const facts: Record<string, string[]> = {
    "España": [
      "La Sagrada Familia de Barcelona lleva en construcción desde 1882.",
      "España tiene 47 sitios declarados Patrimonio de la Humanidad por la UNESCO.",
      "El español es el segundo idioma más hablado del mundo como lengua materna."
    ],
    "Francia": [
      "La Torre Eiffel fue construida para la Exposición Universal de 1889.",
      "Francia es el país más visitado del mundo, con más de 89 millones de turistas al año.",
      "El sistema de metro de París es uno de los más antiguos del mundo."
    ],
    "Italia": [
      "El Coliseo de Roma podía albergar hasta 50,000 espectadores.",
      "Italia tiene más sitios Patrimonio de la Humanidad que cualquier otro país.",
      "La pizza margherita fue nombrada en honor a la reina Margherita de Savoya."
    ],
    "Rusia": [
      "El Transiberiano es la línea ferroviaria más larga del mundo.",
      "La Plaza Roja de Moscú no debe su nombre al color rojo ni al comunismo.",
      "Rusia tiene 11 husos horarios diferentes a lo largo de su territorio."
    ],
    "Japón": [
      "Japón tiene más de 6,800 islas.",
      "Los japoneses tienen la mayor esperanza de vida del mundo.",
      "Hay más de 5 millones de máquinas expendedoras en Japón."
    ],
    "Australia": [
      "Australia es el único país que ocupa un continente entero.",
      "Más del 80% de los animales y plantas de Australia son únicos.",
      "La Gran Barrera de Coral es el organismo vivo más grande del planeta."
    ],
    "Estados Unidos": [
      "Estados Unidos tiene 63 parques nacionales.",
      "Alaska tiene más de 3 millones de lagos.",
      "El Gran Cañón tiene 446 km de largo y hasta 29 km de ancho."
    ],
    "México": [
      "México es el mayor productor de plata del mundo.",
      "La Ciudad de México se construyó sobre un lago.",
      "La cocina mexicana es Patrimonio Inmaterial de la Humanidad."
    ],
    "Méjico": [
      "México es el mayor productor de plata del mundo.",
      "La Ciudad de México se construyó sobre un lago.",
      "La cocina mexicana es Patrimonio Inmaterial de la Humanidad."
    ],
    "Argentina": [
      "El tango fue declarado Patrimonio Cultural Inmaterial de la Humanidad.",
      "Argentina tiene 8 sitios declarados Patrimonio de la Humanidad.",
      "Las Cataratas del Iguazú tienen 275 saltos de agua."
    ]
  };
  
  return facts[country] || [
    `Datos interesantes sobre ${country}.`,
    `${country} es un lugar fascinante para visitar.`
  ];
};

// World destinations data for country flags
export const WORLD_DESTINATIONS = [
  {
    city: "Madrid",
    country: "España",
    flag: "🇪🇸",
    fact: "¡En Madrid está el museo del Prado con obras de arte increíbles! Es una de las galerías de arte más famosas del mundo."
  },
  {
    city: "París",
    country: "Francia",
    flag: "🇫🇷",
    fact: "¡La Torre Eiffel mide 324 metros! ¡Es tan alta como un edificio de 81 pisos y fue construida en 1889!"
  },
  {
    city: "Roma",
    country: "Italia",
    flag: "🇮🇹",
    fact: "En Roma puedes visitar el Coliseo, ¡donde luchaban los gladiadores hace 2000 años! Podía albergar a más de 50.000 personas."
  },
  {
    city: "Moscú",
    country: "Rusia",
    flag: "🇷🇺",
    fact: "¡La Plaza Roja de Moscú es tan grande que caben 6 campos de fútbol! A su lado está el Kremlin, una fortaleza con murallas de color rojo."
  },
  {
    city: "Tokio",
    country: "Japón",
    flag: "🇯🇵",
    fact: "¡En Tokio hay máquinas expendedoras que venden casi de todo: desde juguetes hasta paraguas! Hay más de 5 millones de máquinas en Japón."
  },
  {
    city: "Sídney",
    country: "Australia",
    flag: "🇦🇺",
    fact: "La Ópera de Sídney parece barcos con velas desplegadas en el puerto. ¡Tardaron 14 años en construirla!"
  },
  {
    city: "Nueva York",
    country: "Estados Unidos",
    flag: "🇺🇸",
    fact: "¡La Estatua de la Libertad fue un regalo de Francia a Estados Unidos! Mide 93 metros y su corona tiene 7 picos que representan los 7 continentes."
  },
  {
    city: "Ciudad de México",
    country: "México",
    flag: "🇲🇽",
    fact: "Los antiguos aztecas construyeron Ciudad de México sobre un lago. ¡Todavía hay partes de la ciudad que se hunden un poco cada año!"
  },
  {
    city: "Lima",
    country: "Perú",
    flag: "🇵🇪",
    fact: "¡En Perú hay más de 3,000 variedades diferentes de patatas (papas)!"
  },
  {
    city: "Buenos Aires",
    country: "Argentina",
    flag: "🇦🇷",
    fact: "¡En Buenos Aires hay una librería en un antiguo teatro! Es tan bonita que la llaman 'la librería más bella del mundo'."
  }
];
