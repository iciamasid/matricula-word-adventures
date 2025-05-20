/**
 * API functions for fetching country information
 */

export interface CountryInfo {
  country: string;
  capital: string;
  language: string;
  population: number;
  currency: string;
  flag: string;
  description: string;
}

// Sample country data
const countryDatabase: Record<string, CountryInfo> = {
  "España": {
    country: "España",
    capital: "Madrid",
    language: "Español",
    population: 47350000,
    currency: "Euro",
    flag: "/lovable-uploads/54b230f6-8a76-4e9a-ae4c-5fa2f7087600.png",
    description: "España es un país de Europa occidental con diversas regiones y culturas."
  },
  "Francia": {
    country: "Francia",
    capital: "París",
    language: "Francés",
    population: 67390000,
    currency: "Euro",
    flag: "/lovable-uploads/5becfffc-2c80-433a-8148-0af29615f083.png",
    description: "Francia es conocida por sus vinos, quesos y la Torre Eiffel."
  },
  "Italia": {
    country: "Italia",
    capital: "Roma",
    language: "Italiano",
    population: 60360000,
    currency: "Euro",
    flag: "/lovable-uploads/45cc822d-687a-44d0-ad45-9078d02c48c9.png",
    description: "Italia es famosa por su arte, arquitectura y gastronomía."
  },
  "Rusia": {
    country: "Rusia",
    capital: "Moscú",
    language: "Ruso",
    population: 143400000,
    currency: "Rublo ruso",
    flag: "/lovable-uploads/3eeeb432-83e7-40d5-839a-f72b03d08da9.png",
    description: "Rusia es el país más grande del mundo por área territorial."
  },
  "Japón": {
    country: "Japón",
    capital: "Tokio",
    language: "Japonés",
    population: 126500000,
    currency: "Yen",
    flag: "/lovable-uploads/6eb44f09-3864-48b2-8a08-b682e3a1ada3.png",
    description: "Japón es conocido por su tecnología avanzada y cultura única."
  },
  "Australia": {
    country: "Australia",
    capital: "Canberra",
    language: "Inglés",
    population: 25690000,
    currency: "Dólar australiano",
    flag: "/lovable-uploads/9e7f018b-48ce-4158-acf0-ddcc7e2b4804.png",
    description: "Australia es el sexto país más grande del mundo y único país-continente."
  },
  "Estados Unidos": {
    country: "Estados Unidos",
    capital: "Washington D.C.",
    language: "Inglés",
    population: 331900000,
    currency: "Dólar estadounidense",
    flag: "/lovable-uploads/638a48e4-c52f-4687-a1e1-5db85caa1793.png",
    description: "Estados Unidos es una potencia mundial con una diversa población."
  },
  "Méjico": {
    country: "Méjico",
    capital: "Ciudad de México",
    language: "Español",
    population: 128900000,
    currency: "Peso mexicano",
    flag: "/lovable-uploads/276d9054-061e-45b9-9517-d7f0d8218579.png",
    description: "Méjico es conocido por su rica cultura, historia y gastronomía."
  },
  "Argentina": {
    country: "Argentina",
    capital: "Buenos Aires",
    language: "Español",
    population: 45380000,
    currency: "Peso argentino",
    flag: "/lovable-uploads/13c721ae-3f14-415a-86bb-0228c47d8425.png",
    description: "Argentina es famosa por el tango, el fútbol y sus extensas pampas."
  }
};

/**
 * Fetch information about the origin country
 * @returns Promise<CountryInfo>
 */
export const fetchOriginInfo = async (): Promise<CountryInfo> => {
  // Default to Spain as origin
  return Promise.resolve(countryDatabase["España"]);
};

/**
 * Fetch information about a destination country
 * @param country The name of the country to fetch information for
 * @returns Promise<CountryInfo>
 */
export const fetchDestinationInfo = async (country: string): Promise<CountryInfo> => {
  // If country exists in our database, return it
  if (countryDatabase[country]) {
    return Promise.resolve(countryDatabase[country]);
  }
  
  // Otherwise return a default entry
  return Promise.resolve({
    country: country || "País desconocido",
    capital: "Desconocida",
    language: "Desconocido",
    population: 0,
    currency: "Desconocida",
    flag: "/placeholder.svg",
    description: "No hay información disponible sobre este país."
  });
};
