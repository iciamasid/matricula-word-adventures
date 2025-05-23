
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
  // Car game countries
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
  },
  
  // Motorcycle game countries
  "Portugal": {
    country: "Portugal",
    capital: "Lisboa",
    language: "Portugués",
    population: 10310000,
    currency: "Euro (€)",
    flagEmoji: "🇵🇹",
    description: "Portugal es conocido por sus hermosas playas, pueblos pintorescos y su rica historia de exploración marítima.",
    landmarks: ["Torre de Belém", "Monasterio de los Jerónimos", "Barrio del Alfama", "Cabo de Roca"]
  },
  "Grecia": {
    country: "Grecia",
    capital: "Atenas",
    language: "Griego",
    population: 10720000,
    currency: "Euro (€)",
    flagEmoji: "🇬🇷",
    description: "Grecia es la cuna de la civilización occidental, famosa por sus ruinas antiguas, islas idílicas y gastronomía mediterránea.",
    landmarks: ["Acrópolis", "Santorini", "Templo de Zeus", "Meteora"]
  },
  "Alemania": {
    country: "Alemania",
    capital: "Berlín",
    language: "Alemán",
    population: 83020000,
    currency: "Euro (€)",
    flagEmoji: "🇩🇪",
    description: "Alemania es conocida por su precisión ingeniería, su rica historia y sus festivales tradicionales como el Oktoberfest.",
    landmarks: ["Puerta de Brandeburgo", "Castillo de Neuschwanstein", "Muro de Berlín", "Catedral de Colonia"]
  },
  "Reino Unido": {
    country: "Reino Unido",
    capital: "Londres",
    language: "Inglés",
    population: 66650000,
    currency: "Libra esterlina (£)",
    flagEmoji: "🇬🇧",
    description: "El Reino Unido combina tradición y modernidad, con una monarquía histórica e importantes contribuciones a la literatura y música.",
    landmarks: ["Big Ben", "Torre de Londres", "Palacio de Buckingham", "Stonehenge"]
  },
  "China": {
    country: "China",
    capital: "Pekín",
    language: "Chino mandarín",
    population: 1393000000,
    currency: "Yuan (¥)",
    flagEmoji: "🇨🇳",
    description: "China es una de las civilizaciones más antiguas del mundo, con una rica cultura, arquitectura impresionante y deliciosa gastronomía.",
    landmarks: ["Gran Muralla China", "Ciudad Prohibida", "Guerreros de Terracota", "Skyline de Shanghái"]
  },
  "India": {
    country: "India",
    capital: "Nueva Delhi",
    language: "Hindi e inglés (oficiales)",
    population: 1366000000,
    currency: "Rupia india (₹)",
    flagEmoji: "🇮🇳",
    description: "India es conocida por su diversidad cultural, espiritual y gastronómica, así como por monumentos emblemáticos.",
    landmarks: ["Taj Mahal", "Fuerte Amber", "Río Ganges", "Templos de Khajuraho"]
  },
  "Brasil": {
    country: "Brasil",
    capital: "Brasilia",
    language: "Portugués",
    population: 212000000,
    currency: "Real brasileño (R$)",
    flagEmoji: "🇧🇷",
    description: "Brasil es famoso por sus vibrantes festivales, playas tropicales, selva amazónica y pasión por el fútbol.",
    landmarks: ["Cristo Redentor", "Pan de Azúcar", "Cataratas de Iguazú", "Playa de Copacabana"]
  },
  "Canadá": {
    country: "Canadá",
    capital: "Ottawa",
    language: "Inglés y francés (oficiales)",
    population: 37590000,
    currency: "Dólar canadiense ($)",
    flagEmoji: "🇨🇦",
    description: "Canadá es conocido por sus vastos paisajes naturales, la amabilidad de su gente y su multiculturalismo.",
    landmarks: ["Cataratas del Niágara", "Montañas Rocosas", "CN Tower", "Parque Nacional Banff"]
  },
  "Sudáfrica": {
    country: "Sudáfrica",
    capital: "Pretoria (administrativa), Ciudad del Cabo (legislativa), Bloemfontein (judicial)",
    language: "11 idiomas oficiales, incluidos inglés, afrikáans y zulú",
    population: 59310000,
    currency: "Rand (R)",
    flagEmoji: "🇿🇦",
    description: "Sudáfrica es conocida por su diversidad paisajística, fauna salvaje y su rica historia cultural.",
    landmarks: ["Parque Nacional Kruger", "Montaña de la Mesa", "Robben Island", "Cabo de Buena Esperanza"]
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
