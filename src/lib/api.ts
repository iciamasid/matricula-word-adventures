
/**
 * Country API and info utilities
 */

/**
 * Information about a country destination
 */
interface CountryInfo {
  country: string;
  capital?: string;
  language?: string;
  population?: number;
  currency?: string;
  flagEmoji?: string;
  description?: string;
  landmarks?: string[];
}

/**
 * Map of countries to their information
 */
const countryData: Record<string, CountryInfo> = {
  "España": {
    country: "España",
    capital: "Madrid",
    language: "Español",
    population: 47350000,
    currency: "Euro (€)",
    flagEmoji: "🇪🇸",
    description: "España es un país con una rica historia y cultura, famoso por su gastronomía, arte y arquitectura.",
    landmarks: ["La Sagrada Familia", "El Prado", "La Alhambra", "Parque Güell"]
  },
  "Francia": {
    country: "Francia",
    capital: "París",
    language: "Francés",
    population: 67390000,
    currency: "Euro (€)",
    flagEmoji: "🇫🇷",
    description: "Francia es conocida por su arte, cultura y gastronomía. Es uno de los destinos turísticos más populares del mundo.",
    landmarks: ["Torre Eiffel", "Museo del Louvre", "Catedral de Notre Dame", "Palacio de Versalles"]
  },
  "Italia": {
    country: "Italia",
    capital: "Roma",
    language: "Italiano",
    population: 60360000,
    currency: "Euro (€)",
    flagEmoji: "🇮🇹",
    description: "Italia tiene una rica historia cultural y es famosa por su arte, arquitectura, moda y gastronomía.",
    landmarks: ["Coliseo Romano", "Torre de Pisa", "Catedral de Florencia", "Canales de Venecia"]
  },
  "Rusia": {
    country: "Rusia",
    capital: "Moscú",
    language: "Ruso",
    population: 144400000,
    currency: "Rublo ruso (₽)",
    flagEmoji: "🇷🇺",
    description: "Rusia es el país más grande del mundo y tiene una rica historia cultural y literaria.",
    landmarks: ["Plaza Roja", "Kremlin", "Catedral de San Basilio", "Museo Hermitage"]
  },
  "Japón": {
    country: "Japón",
    capital: "Tokio",
    language: "Japonés",
    population: 126300000,
    currency: "Yen japonés (¥)",
    flagEmoji: "🇯🇵",
    description: "Japón es conocido por su tradición y tecnología avanzada, así como por su arte y gastronomía única.",
    landmarks: ["Monte Fuji", "Templo Senso-ji", "Castillo de Osaka", "Santuario Fushimi Inari"]
  },
  "Australia": {
    country: "Australia",
    capital: "Canberra",
    language: "Inglés",
    population: 25690000,
    currency: "Dólar australiano ($)",
    flagEmoji: "🇦🇺",
    description: "Australia es conocida por sus paisajes únicos, su fauna exótica y sus hermosas playas.",
    landmarks: ["Ópera de Sídney", "Gran Barrera de Coral", "Uluru", "Bahía de Sídney"]
  },
  "Estados Unidos": {
    country: "Estados Unidos",
    capital: "Washington D.C.",
    language: "Inglés",
    population: 331900000,
    currency: "Dólar estadounidense ($)",
    flagEmoji: "🇺🇸",
    description: "Estados Unidos es una potencia mundial con gran diversidad cultural y paisajes variados.",
    landmarks: ["Estatua de la Libertad", "Gran Cañón", "Golden Gate Bridge", "Times Square"]
  },
  "Méjico": {
    country: "Méjico",
    capital: "Ciudad de México",
    language: "Español",
    population: 128900000,
    currency: "Peso mexicano ($)",
    flagEmoji: "🇲🇽",
    description: "México tiene una rica historia y cultura, con influencias tanto indígenas como europeas.",
    landmarks: ["Chichén Itzá", "Teotihuacán", "Cancún", "Catedral Metropolitana"]
  },
  "Argentina": {
    country: "Argentina",
    capital: "Buenos Aires",
    language: "Español",
    population: 45380000,
    currency: "Peso argentino ($)",
    flagEmoji: "🇦🇷",
    description: "Argentina es conocida por sus paisajes diversos, desde los Andes hasta las pampas, así como por su cultura y gastronomía.",
    landmarks: ["Cataratas del Iguazú", "Glaciar Perito Moreno", "Obelisco de Buenos Aires", "Casa Rosada"]
  }
};

/**
 * Fetch information about the origin country
 * @returns {Promise<CountryInfo>} Information about the origin country
 */
export const fetchOriginInfo = async (): Promise<CountryInfo> => {
  // Default to Spain as the origin
  return Promise.resolve(countryData["España"]);
};

/**
 * Fetch information about a destination country
 * @param {string} country Country name to fetch
 * @returns {Promise<CountryInfo>} Information about the destination country
 */
export const fetchDestinationInfo = async (country: string): Promise<CountryInfo> => {
  // Default to Spain if the country doesn't exist in our data
  const info = countryData[country] || countryData["España"];
  return Promise.resolve(info);
};
