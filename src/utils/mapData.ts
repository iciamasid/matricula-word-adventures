
// Map countries to their positions and images
export const getCountryPosition = (country: string) => {
  const positions: Record<string, { left: string, top: string }> = {
    "España": { left: "43%", top: "40%" },
    "Francia": { left: "45%", top: "38%" },
    "Italia": { left: "48%", top: "40%" },
    "Rusia": { left: "58%", top: "32%" },
    "Japón": { left: "80%", top: "40%" },
    "Estados Unidos": { left: "20%", top: "38%" },
    "Argentina": { left: "31%", top: "70%" },
    "Méjico": { left: "17%", top: "48%" },
    "Australia": { left: "83%", top: "70%" },
    "Antártida": { left: "50%", top: "88%" }
  };
  
  return positions[country] || { left: "50%", top: "50%" };
};

export const getCountryImage = (country: string) => {
  const images: Record<string, string> = {
    "España": "/lovable-uploads/82ed4a47-c090-4db2-b49e-6041114c97b7.png",
    "Francia": "/lovable-uploads/276d9054-061e-45b9-9517-d7f0d8218579.png",
    "Italia": "/lovable-uploads/501f7c44-46fc-44ae-8a9f-94b1215f5544.png",
    "Rusia": "/lovable-uploads/13c721ae-3f14-415a-86bb-0228c47d8425.png",
    "Japón": "/lovable-uploads/501f7c44-46fc-44ae-8a9f-94b1215f5544.png",
    "Estados Unidos": "/lovable-uploads/501f7c44-46fc-44ae-8a9f-94b1215f5544.png",
    "Argentina": "/lovable-uploads/501f7c44-46fc-44ae-8a9f-94b1215f5544.png",
    "Méjico": "/lovable-uploads/501f7c44-46fc-44ae-8a9f-94b1215f5544.png",
    "Australia": "/lovable-uploads/501f7c44-46fc-44ae-8a9f-94b1215f5544.png",
    "Antártida": "/lovable-uploads/501f7c44-46fc-44ae-8a9f-94b1215f5544.png"
  };
  
  return images[country] || "/lovable-uploads/501f7c44-46fc-44ae-8a9f-94b1215f5544.png";
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
    city: "Nueva York",
    country: "Estados Unidos",
    flag: "🇺🇸",
    fact: "¡La Estatua de la Libertad fue un regalo de Francia a Estados Unidos! Mide 93 metros y su corona tiene 7 picos que representan los 7 continentes."
  },
  {
    city: "Buenos Aires",
    country: "Argentina",
    flag: "🇦🇷",
    fact: "¡En Buenos Aires hay una librería en un antiguo teatro! Es tan bonita que la llaman 'la librería más bella del mundo'."
  },
  {
    city: "Ciudad de México",
    country: "Méjico",
    flag: "🇲🇽",
    fact: "Los antiguos aztecas construyeron Ciudad de México sobre un lago. ¡Todavía hay partes de la ciudad que se hunden un poco cada año!"
  },
  {
    city: "Sídney",
    country: "Australia",
    flag: "🇦🇺",
    fact: "La Ópera de Sídney parece barcos con velas desplegadas en el puerto. ¡Tardaron 14 años en construirla!"
  },
  {
    city: "Base Marambio",
    country: "Antártida",
    flag: "🇦🇶",
    fact: "¡En la Antártida hace tanto frío que el hielo puede tener 4 kilómetros de grosor! Es el lugar más frío de la Tierra, ¡puede llegar a -89ºC!"
  }
];
