
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
    country: "México",
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
    city: "Lima",
    country: "Perú",
    flag: "🇵🇪",
    fact: "¡En Perú hay más de 3,000 variedades diferentes de patatas (papas)!"
  }
];
