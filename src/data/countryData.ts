
export interface CountryInfo {
  name: string;
  flag: string;
  sections: {
    title: string;
    icon: string;
    content: string;
  }[];
  image?: string;
  wikipediaUrl?: string;
}

export const countryData: Record<string, CountryInfo> = {
  // Car game countries
  "España": {
    name: "España",
    flag: "🇪🇸",
    sections: [
      {
        title: "Acerca de España",
        icon: "MapPin",
        content: "España es un país situado en la península ibérica en el suroeste de Europa. Es conocida por su rica historia, cultura vibrante, arquitectura impresionante y gastronomía deliciosa."
      },
      {
        title: "Turismo en España",
        icon: "Camera", 
        content: "Descubre lugares increíbles como la Sagrada Familia en Barcelona, el Museo del Prado en Madrid, la Alhambra en Granada, y las hermosas playas de las Costas del Sol y Brava."
      },
      {
        title: "Gastronomía de España",
        icon: "Utensils",
        content: "Prueba la auténtica paella valenciana, tapas variadas, jamón ibérico, gazpacho andaluz, y los deliciosos churros con chocolate."
      },
      {
        title: "Naturaleza en España",
        icon: "Mountain",
        content: "Explora los Pirineos, la Costa Brava, las Islas Baleares, las Canarias, y los parques nacionales como Doñana y Picos de Europa."
      }
    ],
    wikipediaUrl: "https://es.wikipedia.org/wiki/España"
  },
  "Francia": {
    name: "Francia",
    flag: "🇫🇷",
    sections: [
      {
        title: "Acerca de Francia",
        icon: "MapPin",
        content: "Francia es famosa por su arte, moda, gastronomía y cultura. París, su capital, es conocida como la Ciudad de la Luz."
      },
      {
        title: "Turismo en Francia",
        icon: "Camera",
        content: "Visita la Torre Eiffel, el Louvre, Versalles, la Costa Azul, los Alpes franceses y los castillos del Valle del Loira."
      },
      {
        title: "Gastronomía de Francia",
        icon: "Utensils", 
        content: "Disfruta de croissants, quesos franceses, vinos de Burdeos y Champagne, foie gras, y la exquisita cocina francesa."
      },
      {
        title: "Naturaleza en Francia",
        icon: "Mountain",
        content: "Descubre los Alpes, los Pirineos, la Provenza con sus campos de lavanda, y la hermosa costa mediterránea."
      }
    ],
    wikipediaUrl: "https://es.wikipedia.org/wiki/Francia"
  },
  "Italia": {
    name: "Italia",
    flag: "🇮🇹", 
    sections: [
      {
        title: "Acerca de Italia",
        icon: "MapPin",
        content: "Italia es la cuna del Renacimiento, conocida por su arte, historia, arquitectura y la deliciosa cocina italiana."
      },
      {
        title: "Turismo en Italia",
        icon: "Camera",
        content: "Explora Roma y el Coliseo, Venecia con sus canales, Florencia y el arte renacentista, la Torre de Pisa, y la hermosa costa de Amalfi."
      },
      {
        title: "Gastronomía de Italia", 
        icon: "Utensils",
        content: "Saborea auténtica pizza napolitana, pasta fresca, risotto, gelato, vinos italianos, y el café espresso."
      },
      {
        title: "Naturaleza en Italia",
        icon: "Mountain", 
        content: "Admira los Alpes italianos, el lago Como, la Toscana con sus colinas, y las islas de Sicilia y Cerdeña."
      }
    ],
    wikipediaUrl: "https://es.wikipedia.org/wiki/Italia"
  },
  
  // Motorcycle game countries
  "Portugal": {
    name: "Portugal",
    flag: "🇵🇹",
    sections: [
      {
        title: "Acerca de Portugal",
        icon: "MapPin",
        content: "Portugal es un país atlántico famoso por su historia marítima, azulejos decorativos, y paisajes diversos desde montañas hasta costas doradas."
      },
      {
        title: "Turismo en Portugal",
        icon: "Camera",
        content: "Visita Lisboa con sus tranvías históricos, Oporto y sus bodegas de vino, los acantilados del Algarve, y los monasterios de Batalha y Alcobaça."
      },
      {
        title: "Gastronomía de Portugal",
        icon: "Utensils",
        content: "Prueba el bacalao en sus múltiples preparaciones, pastéis de nata, vinho verde, francesinha, y los mariscos frescos de la costa."
      },
      {
        title: "Naturaleza en Portugal", 
        icon: "Mountain",
        content: "Explora las playas del Algarve, la región vinícola del Douro, las montañas de la Serra da Estrela, y las islas de Madeira y Azores."
      }
    ],
    wikipediaUrl: "https://es.wikipedia.org/wiki/Portugal"
  },
  "Reino_Unido": {
    name: "Reino Unido",
    flag: "🇬🇧",
    sections: [
      {
        title: "Acerca del Reino Unido",
        icon: "MapPin",
        content: "El Reino Unido comprende Inglaterra, Escocia, Gales e Irlanda del Norte, cada uno con su propia cultura y tradiciones únicas."
      },
      {
        title: "Turismo en el Reino Unido", 
        icon: "Camera",
        content: "Descubre Londres con el Big Ben y Buckingham Palace, Stonehenge, los castillos escoceses, y los paisajes de las Highlands."
      },
      {
        title: "Gastronomía del Reino Unido",
        icon: "Utensils",
        content: "Disfruta del fish and chips, afternoon tea con scones, haggis escocés, y la cerveza británica en los tradicionales pubs."
      },
      {
        title: "Naturaleza en el Reino Unido",
        icon: "Mountain", 
        content: "Explora las Highlands escocesas, el Distrito de los Lagos, los acantilados de Dover, y los parques nacionales de Gales."
      }
    ],
    wikipediaUrl: "https://es.wikipedia.org/wiki/Reino_Unido"
  },
  
  // Add more countries as needed with similar structure
};

export const getCountryInfo = (countryCode: string): CountryInfo | null => {
  return countryData[countryCode] || null;
};
