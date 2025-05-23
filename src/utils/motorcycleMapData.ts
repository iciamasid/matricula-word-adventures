
// Country positions on the map for motorcycle game
const motorcycleCountryPositions: Record<string, { left: string, top: string }> = {
  "España": { left: "47.5%", top: "38.5%" },
  "Spain": { left: "47.5%", top: "38.5%" },
  "Reino Unido": { left: "46%", top: "33%" },
  "United Kingdom": { left: "46%", top: "33%" },
  "Grecia": { left: "52%", top: "40%" },
  "Greece": { left: "52%", top: "40%" },
  "Noruega": { left: "49%", top: "28%" },
  "Norway": { left: "49%", top: "28%" },
  "China": { left: "70%", top: "40%" },
  "Canadá": { left: "20%", top: "30%" },
  "Canada": { left: "20%", top: "30%" },
  "Costa Rica": { left: "23%", top: "51%" },
  "Brasil": { left: "32%", top: "60%" },
  "Brazil": { left: "32%", top: "60%" },
  "Perú": { left: "25%", top: "57%" },
  "Peru": { left: "25%", top: "57%" }
};

// Country flag images for motorcycle game
const motorcycleCountryImages: Record<string, string> = {
  "España": "/lovable-uploads/82ed4a47-c090-4db2-b49e-6041114c97b7.png",
  "Spain": "/lovable-uploads/82ed4a47-c090-4db2-b49e-6041114c97b7.png",
  "Reino Unido": "/lovable-uploads/276d9054-061e-45b9-9517-d7f0d8218579.png",
  "United Kingdom": "/lovable-uploads/276d9054-061e-45b9-9517-d7f0d8218579.png",
  "Grecia": "/lovable-uploads/501f7c44-46fc-44ae-8a9f-94b1215f5544.png",
  "Greece": "/lovable-uploads/501f7c44-46fc-44ae-8a9f-94b1215f5544.png",
  "Noruega": "/lovable-uploads/13c721ae-3f14-415a-86bb-0228c47d8425.png",
  "Norway": "/lovable-uploads/13c721ae-3f14-415a-86bb-0228c47d8425.png",
  "China": "/lovable-uploads/54b230f6-8a76-4e9a-ae4c-5fa2f7087600.png",
  "Canadá": "/lovable-uploads/e27d86a7-9c73-425d-806e-1e86fd6c6e99.png",
  "Canada": "/lovable-uploads/e27d86a7-9c73-425d-806e-1e86fd6c6e99.png",
  "Costa Rica": "/lovable-uploads/21e71de1-c8e4-4bbb-95d6-67ce7ae41316.png",
  "Brasil": "/lovable-uploads/2957a4f7-6a54-4e2f-bda1-2177609abc5f.png",
  "Brazil": "/lovable-uploads/2957a4f7-6a54-4e2f-bda1-2177609abc5f.png",
  "Perú": "/lovable-uploads/24de870a-769c-4544-8001-8554fe29e7f0.png",
  "Peru": "/lovable-uploads/24de870a-769c-4544-8001-8554fe29e7f0.png"
};

// Get motorcycle country position on the map
export const getMotorcycleCountryPosition = (country: string) => {
  return motorcycleCountryPositions[country] || { left: "50%", top: "50%" };
};

// Get motorcycle country flag image
export const getMotorcycleCountryImage = (country: string) => {
  return motorcycleCountryImages[country] || "/lovable-uploads/501f7c44-46fc-44ae-8a9f-94b1215f5544.png";
};

// Motorcycle destinations data for country flags
export const MOTORCYCLE_DESTINATIONS = [
  {
    city: "Madrid",
    country: "España",
    flag: "🇪🇸",
    fact: "¡En Madrid está el museo del Prado con obras de arte increíbles! Es una de las galerías de arte más famosas del mundo."
  },
  {
    city: "Londres",
    country: "Reino Unido",
    flag: "🇬🇧",
    fact: "¡El Big Ben de Londres no es la torre sino la campana que hay dentro! La torre se llama Elizabeth Tower."
  },
  {
    city: "Atenas",
    country: "Grecia",
    flag: "🇬🇷",
    fact: "¡El Partenón de Atenas tiene más de 2.500 años de antigüedad! Fue construido en honor a la diosa Atenea."
  },
  {
    city: "Oslo",
    country: "Noruega",
    flag: "🇳🇴",
    fact: "¡En Noruega puedes ver el Sol de Medianoche, cuando el sol no se pone durante el verano! También puedes ver auroras boreales."
  },
  {
    city: "Pekín",
    country: "China",
    flag: "🇨🇳",
    fact: "¡La Gran Muralla China es tan larga que podría dar la vuelta a la Tierra! Tiene más de 21.000 kilómetros de largo."
  },
  {
    city: "Ottawa",
    country: "Canadá",
    flag: "🇨🇦",
    fact: "¡Canadá tiene más lagos que el resto del mundo junto! Hay más de 3 millones de lagos en todo el país."
  },
  {
    city: "San José",
    country: "Costa Rica",
    flag: "🇨🇷",
    fact: "¡Costa Rica tiene el 5% de toda la biodiversidad del planeta a pesar de ocupar solo el 0.03% de la superficie terrestre!"
  },
  {
    city: "Brasilia",
    country: "Brasil",
    flag: "🇧🇷",
    fact: "¡El Amazonas, en Brasil, es el río más caudaloso del mundo! Contiene el 20% del agua dulce del planeta."
  },
  {
    city: "Lima",
    country: "Perú",
    flag: "🇵🇪",
    fact: "¡En Perú hay más de 3,000 variedades diferentes de patatas (papas)! Es el lugar donde se originaron."
  }
];
