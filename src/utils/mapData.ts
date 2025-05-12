
// Country positions on the map
const countryPositions: Record<string, { left: string, top: string }> = {
  "España": { left: "43%", top: "40%" },
  "España (vuelta completa)": { left: "43%", top: "40%" },
  "France": { left: "45%", top: "36%" },
  "Francia": { left: "45%", top: "36%" },
  "Italia": { left: "48%", top: "40%" },
  "Italy": { left: "48%", top: "40%" },
  "Rusia": { left: "58%", top: "32%" },
  "Russia": { left: "58%", top: "32%" },
  "Japón": { left: "80%", top: "40%" },
  "Japan": { left: "80%", top: "40%" },
  "Estados Unidos": { left: "20%", top: "38%" },
  "United States": { left: "20%", top: "38%" },
  "Argentina": { left: "31%", top: "70%" },
  "Méjico": { left: "17%", top: "48%" },
  "Mexico": { left: "17%", top: "48%" },
  "Australia": { left: "83%", top: "70%" },
  "Perú": { left: "25%", top: "60%" },
  "Peru": { left: "25%", top: "60%" },
  "Antártida": { left: "50%", top: "88%" },
  "Antarctica": { left: "50%", top: "88%" },
  "Spain": { left: "43%", top: "40%" }
};

// Country flag images
const countryImages: Record<string, string> = {
  "España": "/lovable-uploads/82ed4a47-c090-4db2-b49e-6041114c97b7.png",
  "España (vuelta completa)": "/lovable-uploads/82ed4a47-c090-4db2-b49e-6041114c97b7.png",
  "Spain": "/lovable-uploads/82ed4a47-c090-4db2-b49e-6041114c97b7.png",
  "Francia": "/lovable-uploads/276d9054-061e-45b9-9517-d7f0d8218579.png",
  "France": "/lovable-uploads/276d9054-061e-45b9-9517-d7f0d8218579.png",
  "Italia": "/lovable-uploads/501f7c44-46fc-44ae-8a9f-94b1215f5544.png",
  "Italy": "/lovable-uploads/501f7c44-46fc-44ae-8a9f-94b1215f5544.png",
  "Rusia": "/lovable-uploads/13c721ae-3f14-415a-86bb-0228c47d8425.png",
  "Russia": "/lovable-uploads/13c721ae-3f14-415a-86bb-0228c47d8425.png",
  "Japón": "/lovable-uploads/501f7c44-46fc-44ae-8a9f-94b1215f5544.png",
  "Japan": "/lovable-uploads/501f7c44-46fc-44ae-8a9f-94b1215f5544.png",
  "Estados Unidos": "/lovable-uploads/501f7c44-46fc-44ae-8a9f-94b1215f5544.png",
  "United States": "/lovable-uploads/501f7c44-46fc-44ae-8a9f-94b1215f5544.png",
  "Argentina": "/lovable-uploads/501f7c44-46fc-44ae-8a9f-94b1215f5544.png",
  "Méjico": "/lovable-uploads/501f7c44-46fc-44ae-8a9f-94b1215f5544.png",
  "Mexico": "/lovable-uploads/501f7c44-46fc-44ae-8a9f-94b1215f5544.png",
  "Australia": "/lovable-uploads/501f7c44-46fc-44ae-8a9f-94b1215f5544.png",
  "Perú": "/lovable-uploads/501f7c44-46fc-44ae-8a9f-94b1215f5544.png",
  "Peru": "/lovable-uploads/501f7c44-46fc-44ae-8a9f-94b1215f5544.png",
  "Antártida": "/lovable-uploads/501f7c44-46fc-44ae-8a9f-94b1215f5544.png",
  "Antarctica": "/lovable-uploads/501f7c44-46fc-44ae-8a9f-94b1215f5544.png"
};

// Get country position on the map
export const getCountryPosition = (country: string) => {
  return countryPositions[country] || { left: "50%", top: "50%" };
};

// Get country flag image
export const getCountryImage = (country: string) => {
  return countryImages[country] || "/lovable-uploads/501f7c44-46fc-44ae-8a9f-94b1215f5544.png";
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
    city: "Barcelona",
    country: "España",
    flag: "🇪🇸",
    fact: "¡En Barcelona puedes visitar la Sagrada Familia, una iglesia diseñada por Gaudí que aún está en construcción desde 1882!"
  },
  {
    city: "París",
    country: "Francia",
    flag: "🇫🇷",
    fact: "¡La Torre Eiffel mide 324 metros! ¡Es tan alta como un edificio de 81 pisos y fue construida en 1889!"
  },
  {
    city: "Paris",
    country: "France",
    flag: "🇫🇷",
    fact: "The Eiffel Tower is 324 meters tall! It's as tall as an 81-story building and was built in 1889!"
  },
  {
    city: "Roma",
    country: "Italia",
    flag: "🇮🇹",
    fact: "En Roma puedes visitar el Coliseo, ¡donde luchaban los gladiadores hace 2000 años! Podía albergar a más de 50.000 personas."
  },
  {
    city: "Rome",
    country: "Italy",
    flag: "🇮🇹",
    fact: "In Rome you can visit the Colosseum, where gladiators fought 2,000 years ago! It could hold more than 50,000 people."
  },
  {
    city: "Moscú",
    country: "Rusia",
    flag: "🇷🇺",
    fact: "¡La Plaza Roja de Moscú es tan grande que caben 6 campos de fútbol! A su lado está el Kremlin, una fortaleza con murallas de color rojo."
  },
  {
    city: "Moscow",
    country: "Russia",
    flag: "🇷🇺",
    fact: "Moscow's Red Square is so big that 6 football fields could fit inside it! Next to it is the Kremlin, a fortress with red walls."
  },
  {
    city: "Tokio",
    country: "Japón",
    flag: "🇯🇵",
    fact: "¡En Tokio hay máquinas expendedoras que venden casi de todo: desde juguetes hasta paraguas! Hay más de 5 millones de máquinas en Japón."
  },
  {
    city: "Tokyo",
    country: "Japan",
    flag: "🇯🇵",
    fact: "In Tokyo there are vending machines that sell almost everything: from toys to umbrellas! There are more than 5 million machines in Japan."
  },
  {
    city: "Nueva York",
    country: "Estados Unidos",
    flag: "🇺🇸",
    fact: "¡La Estatua de la Libertad fue un regalo de Francia a Estados Unidos! Mide 93 metros y su corona tiene 7 picos que representan los 7 continentes."
  },
  {
    city: "New York",
    country: "United States",
    flag: "🇺🇸",
    fact: "The Statue of Liberty was a gift from France to the United States! It's 93 meters tall and its crown has 7 spikes representing the 7 continents."
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
    city: "Mexico City",
    country: "Mexico",
    flag: "🇲🇽",
    fact: "The ancient Aztecs built Mexico City on a lake. There are still parts of the city that sink a little bit each year!"
  },
  {
    city: "Lima",
    country: "Perú",
    flag: "🇵🇪",
    fact: "En Perú está Machu Picchu, una ciudad antigua construida por los Incas en lo alto de las montañas. ¡Es una de las siete maravillas del mundo moderno!"
  },
  {
    city: "Lima",
    country: "Peru",
    flag: "🇵🇪",
    fact: "In Peru is Machu Picchu, an ancient city built by the Incas high in the mountains. It's one of the seven wonders of the modern world!"
  },
  {
    city: "Sídney",
    country: "Australia",
    flag: "🇦🇺",
    fact: "La Ópera de Sídney parece barcos con velas desplegadas en el puerto. ¡Tardaron 14 años en construirla!"
  },
  {
    city: "Sydney",
    country: "Australia",
    flag: "🇦🇺",
    fact: "The Sydney Opera House looks like ships with sails unfurled in the harbor. It took 14 years to build!"
  },
  {
    city: "Base Marambio",
    country: "Antártida",
    flag: "🇦🇶",
    fact: "¡En la Antártida hace tanto frío que el hielo puede tener 4 kilómetros de grosor! Es el lugar más frío de la Tierra, ¡puede llegar a -89ºC!"
  },
  {
    city: "Marambio Base",
    country: "Antarctica",
    flag: "🇦🇶",
    fact: "In Antarctica it's so cold that the ice can be 4 kilometers thick! It's the coldest place on Earth, temperatures can reach -89ºC!"
  },
  {
    city: "Madrid",
    country: "España (vuelta completa)",
    flag: "🇪🇸",
    fact: "¡Has completado la vuelta al mundo y has regresado a Madrid! ¡Enhorabuena por tu aventura!"
  },
  {
    city: "Madrid",
    country: "Spain (full tour)",
    flag: "🇪🇸",
    fact: "You've completed your trip around the world and returned to Madrid! Congratulations on your adventure!"
  }
];
