
// Country positions on the map
const countryPositions: Record<string, { left: string, top: string }> = {
  // Car game countries
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
  "Argentina": { left: "31%", top: "70%" },
  
  // Motorcycle game countries
  "Portugal": { left: "45.5%", top: "38.5%" },
  "Grecia": { left: "53%", top: "40%" },
  "Greece": { left: "53%", top: "40%" },
  "Alemania": { left: "50%", top: "34%" },
  "Germany": { left: "50%", top: "34%" },
  "Reino Unido": { left: "46.5%", top: "33%" },
  "United Kingdom": { left: "46.5%", top: "33%" },
  "China": { left: "75%", top: "42%" },
  "India": { left: "68%", top: "48%" },
  "Brasil": { left: "30%", top: "60%" },
  "Brazil": { left: "30%", top: "60%" },
  "Canadá": { left: "18%", top: "30%" },
  "Canada": { left: "18%", top: "30%" },
  "Sudáfrica": { left: "53%", top: "70%" },
  "South Africa": { left: "53%", top: "70%" }
};

// Country flag images
const countryImages: Record<string, string> = {
  // Car game countries
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
  "Argentina": "/lovable-uploads/6060d896-a127-404e-987c-3cd8814f558a.png",
  
  // Motorcycle game countries - Using placeholders from existing flags for now
  "Portugal": "/lovable-uploads/82ed4a47-c090-4db2-b49e-6041114c97b7.png", // Using Spain's flag as placeholder
  "Grecia": "/lovable-uploads/501f7c44-46fc-44ae-8a9f-94b1215f5544.png",   // Using Italy's flag as placeholder
  "Greece": "/lovable-uploads/501f7c44-46fc-44ae-8a9f-94b1215f5544.png",
  "Alemania": "/lovable-uploads/276d9054-061e-45b9-9517-d7f0d8218579.png", // Using France's flag as placeholder
  "Germany": "/lovable-uploads/276d9054-061e-45b9-9517-d7f0d8218579.png",
  "Reino Unido": "/lovable-uploads/21e71de1-c8e4-4bbb-95d6-67ce7ae41316.png", // Using US flag as placeholder
  "United Kingdom": "/lovable-uploads/21e71de1-c8e4-4bbb-95d6-67ce7ae41316.png",
  "China": "/lovable-uploads/54b230f6-8a76-4e9a-ae4c-5fa2f7087600.png",    // Using Japan's flag as placeholder
  "India": "/lovable-uploads/13c721ae-3f14-415a-86bb-0228c47d8425.png",    // Using Russia's flag as placeholder
  "Brasil": "/lovable-uploads/2957a4f7-6a54-4e2f-bda1-2177609abc5f.png",   // Using Mexico's flag as placeholder
  "Brazil": "/lovable-uploads/2957a4f7-6a54-4e2f-bda1-2177609abc5f.png",
  "Canadá": "/lovable-uploads/e27d86a7-9c73-425d-806e-1e86fd6c6e99.png",   // Using Australia's flag as placeholder
  "Canada": "/lovable-uploads/e27d86a7-9c73-425d-806e-1e86fd6c6e99.png",
  "Sudáfrica": "/lovable-uploads/6060d896-a127-404e-987c-3cd8814f558a.png" // Using Argentina's flag as placeholder
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
  // Car game destinations
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
  },
  
  // Motorcycle game destinations
  {
    city: "Lisboa",
    country: "Portugal",
    flag: "🇵🇹",
    fact: "¡Lisboa tiene tranvías amarillos que suben y bajan por las colinas de la ciudad desde hace más de 100 años!"
  },
  {
    city: "Atenas",
    country: "Grecia",
    flag: "🇬🇷",
    fact: "¡En Atenas está la Acrópolis, un templo antiguo que tiene más de 2.500 años! Desde ahí puedes ver toda la ciudad."
  },
  {
    city: "Berlín",
    country: "Alemania",
    flag: "🇩🇪",
    fact: "¡En Berlín hay un semáforo famoso llamado Ampelmännchen con forma de hombrecito que se ha convertido en un símbolo de la ciudad!"
  },
  {
    city: "Londres",
    country: "Reino Unido",
    flag: "🇬🇧",
    fact: "¡El Big Ben de Londres no es la torre, sino la campana que está dentro! La torre se llama Elizabeth Tower en honor a la reina."
  },
  {
    city: "Pekín",
    country: "China",
    flag: "🇨🇳",
    fact: "¡La Ciudad Prohibida de Pekín tiene 9.999 habitaciones! El número 9 se consideraba de buena suerte para los emperadores."
  },
  {
    city: "Nueva Delhi",
    country: "India",
    flag: "🇮🇳",
    fact: "¡En la India hay un templo en forma de loto gigante llamado Templo del Loto! Está hecho de mármol blanco y parece que flota en el agua."
  },
  {
    city: "Río de Janeiro",
    country: "Brasil",
    flag: "🇧🇷",
    fact: "¡La estatua del Cristo Redentor en Río de Janeiro tiene los brazos abiertos de 28 metros de ancho! Es como si abrazara a toda la ciudad."
  },
  {
    city: "Toronto",
    country: "Canadá",
    flag: "🇨🇦",
    fact: "¡La Torre CN de Toronto fue el edificio más alto del mundo durante 34 años! Mide 553 metros y tiene un suelo de cristal donde puedes ver la ciudad bajo tus pies."
  },
  {
    city: "Ciudad del Cabo",
    country: "Sudáfrica",
    flag: "🇿🇦",
    fact: "¡En Ciudad del Cabo está la Montaña de la Mesa, una montaña plana en la cima que a veces parece tener un mantel de nubes!"
  }
];
