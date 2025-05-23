
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
  "Reino Unido": {
    country: "Reino Unido",
    capital: "Londres",
    language: "Inglés",
    population: 67220000,
    currency: "Libra esterlina (£)",
    flagEmoji: "🇬🇧",
    description: "El Reino Unido es conocido por su historia monárquica, su cultura diversa y sus monumentos históricos.",
    landmarks: ["Big Ben", "Torre de Londres", "Palacio de Buckingham", "Stonehenge"]
  },
  "Grecia": {
    country: "Grecia",
    capital: "Atenas",
    language: "Griego",
    population: 10720000,
    currency: "Euro (€)",
    flagEmoji: "🇬🇷",
    description: "Grecia es la cuna de la civilización occidental, famosa por su mitología, filosofía y ruinas antiguas.",
    landmarks: ["Acrópolis", "Partenón", "Santorini", "Monte Olimpo"]
  },
  "Noruega": {
    country: "Noruega",
    capital: "Oslo",
    language: "Noruego",
    population: 5380000,
    currency: "Corona noruega (kr)",
    flagEmoji: "🇳🇴",
    description: "Noruega es conocida por sus impresionantes fiordos, auroras boreales y alta calidad de vida.",
    landmarks: ["Fiordo de Geiranger", "Preikestolen", "Tromso", "Bergen"]
  },
  "China": {
    country: "China",
    capital: "Pekín",
    language: "Mandarín",
    population: 1402000000,
    currency: "Yuan (¥)",
    flagEmoji: "🇨🇳",
    description: "China es uno de los países más antiguos del mundo, con una rica historia y cultura milenaria.",
    landmarks: ["Gran Muralla China", "Ciudad Prohibida", "Ejército de Terracota", "Torres Karst de Guilin"]
  },
  "Canadá": {
    country: "Canadá",
    capital: "Ottawa",
    language: "Inglés y Francés",
    population: 38010000,
    currency: "Dólar canadiense ($)",
    flagEmoji: "🇨🇦",
    description: "Canadá es conocido por sus vastos paisajes naturales, diversidad cultural y amabilidad.",
    landmarks: ["Cataratas del Niágara", "CN Tower", "Parque Nacional Banff", "Viejo Quebec"]
  },
  "Costa Rica": {
    country: "Costa Rica",
    capital: "San José",
    language: "Español",
    population: 5094000,
    currency: "Colón costarricense (₡)",
    flagEmoji: "🇨🇷",
    description: "Costa Rica es famosa por su biodiversidad, ecoturismo y sus hermosas playas y volcanes.",
    landmarks: ["Volcán Arenal", "Parque Nacional Manuel Antonio", "Monteverde", "Tortuguero"]
  },
  "Brasil": {
    country: "Brasil",
    capital: "Brasilia",
    language: "Portugués",
    population: 212600000,
    currency: "Real brasileño (R$)",
    flagEmoji: "🇧🇷",
    description: "Brasil es el país más grande de Sudamérica, conocido por sus playas, la selva amazónica y el carnaval.",
    landmarks: ["Cristo Redentor", "Pan de Azúcar", "Cataratas del Iguazú", "Amazonia"]
  },
  "Perú": {
    country: "Perú",
    capital: "Lima",
    language: "Español",
    population: 32970000,
    currency: "Sol peruano (S/)",
    flagEmoji: "🇵🇪",
    description: "Perú es conocido por su historia inca, su gastronomía y sus impresionantes ruinas arqueológicas.",
    landmarks: ["Machu Picchu", "Líneas de Nazca", "Valle Sagrado", "Lago Titicaca"]
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
