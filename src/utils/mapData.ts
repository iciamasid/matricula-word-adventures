
// Country positions on the map for CAR GAME
const countryPositions: Record<string, { left: string, top: string }> = {
  "España": { left: "49.2%", top: "33.8%" },
  "Spain": { left: "49.2%", top: "33.8%" },
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
  "Méjico": { left: "17%", top: "48%" },
  "Mexico": { left: "17%", top: "48%" },
  "Australia": { left: "83%", top: "70%" },
  "Argentina": { left: "31%", top: "70%" }
};

// Country flag images for CAR GAME
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
  "Méjico": "/lovable-uploads/2957a4f7-6a54-4e2f-bda1-2177609abc5f.png",
  "Mexico": "/lovable-uploads/2957a4f7-6a54-4e2f-bda1-2177609abc5f.png",
  "Australia": "/lovable-uploads/e27d86a7-9c73-425d-806e-1e86fd6c6e99.png",
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

// World destinations data for country flags - CAR GAME
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
    fact: "¡La Torre Eiffel de París tiene 324 metros de altura! Fue construida para la Exposición Universal de 1889."
  },
  {
    city: "Roma",
    country: "Italia",
    flag: "🇮🇹",
    fact: "¡El Coliseo de Roma podía albergar hasta 80,000 espectadores! Es uno de los anfiteatros más grandes jamás construidos."
  },
  {
    city: "Moscú",
    country: "Rusia",
    flag: "🇷🇺",
    fact: "¡La Plaza Roja de Moscú no se llama así por el color rojo, sino porque 'roja' significa 'hermosa' en ruso antiguo!"
  },
  {
    city: "Tokio",
    country: "Japón",
    flag: "🇯🇵",
    fact: "¡En Tokio hay más de 13 millones de habitantes! Es una de las ciudades más pobladas del mundo."
  },
  {
    city: "Nueva York",
    country: "Estados Unidos",
    flag: "🇺🇸",
    fact: "¡La Estatua de la Libertad fue un regalo de Francia a Estados Unidos! Mide más de 93 metros de altura."
  },
  {
    city: "Ciudad de México",
    country: "México",
    flag: "🇲🇽",
    fact: "¡Ciudad de México está construida sobre un antiguo lago! Los aztecas fundaron aquí su capital, Tenochtitlan."
  },
  {
    city: "Sídney",
    country: "Australia",
    flag: "🇦🇺",
    fact: "¡La Ópera de Sídney tardó 14 años en construirse! Su diseño único la convierte en Patrimonio de la Humanidad."
  },
  {
    city: "Buenos Aires",
    country: "Argentina",
    flag: "🇦🇷",
    fact: "¡En Buenos Aires nació el tango! Este baile apasionado es Patrimonio Cultural Inmaterial de la Humanidad."
  }
];
