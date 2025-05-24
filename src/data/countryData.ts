
export interface CountryInfo {
  name: string;
  flag: string;
  code: string;
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
    code: "España",
    sections: [
      {
        title: "Acerca de España",
        icon: "MapPin",
        content: "España es un país situado en la península ibérica en el suroeste de Europa. Es conocida por su rica historia, cultura vibrante, arquitectura impresionante y gastronomía deliciosa. Con una superficie de 505.990 km², España es el cuarto país más grande de Europa."
      },
      {
        title: "Lugares Famosos",
        icon: "Camera", 
        content: "Descubre lugares increíbles como la Sagrada Familia en Barcelona, el Museo del Prado en Madrid, la Alhambra en Granada, el Camino de Santiago, las hermosas playas de las Costas del Sol y Brava, y los parques nacionales como Doñana."
      },
      {
        title: "Gastronomía de España",
        icon: "Utensils",
        content: "Prueba la auténtica paella valenciana, tapas variadas, jamón ibérico, gazpacho andaluz, tortilla española, churros con chocolate, y los excelentes vinos de La Rioja y Ribera del Duero."
      },
      {
        title: "Cultura y Tradiciones",
        icon: "Mountain",
        content: "Explora el flamenco andaluz, las fiestas de San Fermín en Pamplona, La Tomatina de Buñol, las Fallas de Valencia, y la rica arquitectura que va desde el románico hasta el modernismo de Gaudí."
      }
    ],
    image: "/lovable-uploads/Espana.jpg",
    wikipediaUrl: "https://es.wikipedia.org/wiki/España"
  },
  "Francia": {
    name: "Francia",
    flag: "🇫🇷",
    code: "Francia",
    sections: [
      {
        title: "Acerca de Francia",
        icon: "MapPin",
        content: "Francia es famosa por su arte, moda, gastronomía y cultura. París, su capital, es conocida como la Ciudad de la Luz. Con 67 millones de habitantes, Francia es el país más visitado del mundo con más de 89 millones de turistas anuales."
      },
      {
        title: "Lugares Famosos",
        icon: "Camera",
        content: "Visita la Torre Eiffel, el Louvre con la Mona Lisa, el Palacio de Versalles, la Costa Azul, los Alpes franceses para esquiar, los castillos del Valle del Loira, y la región de Provenza con sus campos de lavanda."
      },
      {
        title: "Gastronomía de Francia",
        icon: "Utensils", 
        content: "Disfruta de croissants recién horneados, más de 400 tipos de quesos franceses, vinos de Burdeos y Champagne, foie gras, escargots, ratatouille, y la exquisita alta cocina francesa reconocida mundialmente."
      },
      {
        title: "Arte y Cultura",
        icon: "Mountain",
        content: "Descubre los impresionistas en Giverny, la moda parisina, los festivales de Cannes y Avignon, la arquitectura gótica de Notre-Dame, y la rica herencia cultural que incluye 45 sitios Patrimonio de la Humanidad."
      }
    ],
    image: "/lovable-uploads/Francia.jpg",
    wikipediaUrl: "https://es.wikipedia.org/wiki/Francia"
  },
  "Italia": {
    name: "Italia",
    flag: "🇮🇹",
    code: "Italia",
    sections: [
      {
        title: "Acerca de Italia",
        icon: "MapPin",
        content: "Italia es la cuna del Renacimiento, conocida por su arte, historia, arquitectura y la deliciosa cocina italiana. Con forma de bota, Italia tiene 60 millones de habitantes y alberga más sitios Patrimonio de la Humanidad que cualquier otro país."
      },
      {
        title: "Lugares Famosos",
        icon: "Camera",
        content: "Explora Roma con el Coliseo y el Vaticano, Venecia con sus románticos canales, Florencia cuna del Renacimiento, la Torre Inclinada de Pisa, la hermosa costa de Amalfi, las ruinas de Pompeya, y los lagos del norte como Como y Garda."
      },
      {
        title: "Gastronomía de Italia", 
        icon: "Utensils",
        content: "Saborea auténtica pizza napolitana, pasta fresca casera, risotto cremoso, gelato artesanal, vinos italianos como Chianti y Barolo, café espresso perfecto, y quesos como parmesano y mozzarella di bufala."
      },
      {
        title: "Arte e Historia",
        icon: "Mountain", 
        content: "Admira obras de Miguel Ángel y Leonardo da Vinci, la arquitectura romana como el Panteón, las iglesias barrocas, los frescos de la Capilla Sixtina, y la rica herencia artística que abarca desde el Imperio Romano hasta el Renacimiento."
      }
    ],
    image: "/lovable-uploads/Italia.jpg",
    wikipediaUrl: "https://es.wikipedia.org/wiki/Italia"
  },
  "Rusia": {
    name: "Rusia",
    flag: "🇷🇺",
    code: "Rusia",
    sections: [
      {
        title: "Acerca de Rusia",
        icon: "MapPin",
        content: "Rusia es el país más grande del mundo, extendiéndose a través de 11 zonas horarias. Con 146 millones de habitantes, Rusia tiene una rica historia imperial, cultura única, y vastos recursos naturales desde Siberia hasta los Urales."
      },
      {
        title: "Lugares Famosos",
        icon: "Camera",
        content: "Visita la Plaza Roja y el Kremlin en Moscú, el Hermitage en San Petersburgo, el ferrocarril Transiberiano, el lago Baikal (el más profundo del mundo), las montañas del Cáucaso, y la tundra siberiana."
      },
      {
        title: "Gastronomía de Rusia",
        icon: "Utensils",
        content: "Prueba el borscht (sopa de remolacha), beef stroganoff, blinis con caviar, vodka auténtico, pelmeni (dumplings rusos), y kvas (bebida fermentada tradicional)."
      },
      {
        title: "Cultura y Tradiciones",
        icon: "Mountain",
        content: "Explora el ballet del Bolshoi, la literatura de Tolstoy y Dostoievsky, la música de Tchaikovsky, las iglesias ortodoxas con cúpulas doradas, y las tradiciones de la Maslenitsa (carnaval de invierno)."
      }
    ],
    image: "/lovable-uploads/Rusia.jpg",
    wikipediaUrl: "https://es.wikipedia.org/wiki/Rusia"
  },
  "Japón": {
    name: "Japón",
    flag: "🇯🇵",
    code: "Japón",
    sections: [
      {
        title: "Acerca de Japón",
        icon: "MapPin",
        content: "Japón es un archipiélago de 6.852 islas en el Pacífico, famoso por combinar tradiciones milenarias con tecnología avanzada. Con 125 millones de habitantes, Japón es líder mundial en innovación, anime, y cultura pop."
      },
      {
        title: "Lugares Famosos",
        icon: "Camera",
        content: "Descubre Tokio con sus rascacielos y templos, el monte Fuji, los templos de Kyoto, el castillo de Himeji, los jardines zen, Hiroshima, las aguas termales (onsen), y los cerezos en flor (sakura)."
      },
      {
        title: "Gastronomía de Japón",
        icon: "Utensils",
        content: "Disfruta del sushi y sashimi frescos, ramen auténtico, tempura crujiente, wagyu (carne de res premium), té matcha ceremonial, mochi dulce, y sake tradicional."
      },
      {
        title: "Cultura y Tradiciones",
        icon: "Mountain",
        content: "Explora el arte del origami, la ceremonia del té, los jardines zen, el anime y manga, los festivales matsuri, el teatro kabuki, y la filosofía del ikigai (propósito de vida)."
      }
    ],
    image: "/lovable-uploads/Japon.jpg",
    wikipediaUrl: "https://es.wikipedia.org/wiki/Japón"
  },
  "Estados_Unidos": {
    name: "Estados Unidos",
    flag: "🇺🇸",
    code: "Estados_Unidos",
    sections: [
      {
        title: "Acerca de Estados Unidos",
        icon: "MapPin",
        content: "Estados Unidos es un país de 50 estados con 331 millones de habitantes, conocido por su diversidad cultural, innovación tecnológica, y paisajes variados desde desiertos hasta montañas nevadas."
      },
      {
        title: "Lugares Famosos",
        icon: "Camera",
        content: "Visita Nueva York con la Estatua de la Libertad, el Gran Cañón, Yellowstone, las playas de California, Disney World en Florida, Las Vegas, Washington D.C., y los parques nacionales como Yosemite."
      },
      {
        title: "Gastronomía de Estados Unidos",
        icon: "Utensils",
        content: "Prueba las hamburguesas gourmet, barbacoa texana, pizza estilo Nueva York, hot dogs, mac and cheese, donuts, y la diversa cocina fusion de inmigrantes de todo el mundo."
      },
      {
        title: "Cultura y Entretenimiento",
        icon: "Mountain",
        content: "Explora Hollywood y el cine, la música country y jazz, los deportes como el béisbol y fútbol americano, Broadway en Nueva York, y la cultura del 'sueño americano'."
      }
    ],
    image: "/lovable-uploads/EstadosUnidos.jpg",
    wikipediaUrl: "https://es.wikipedia.org/wiki/Estados_Unidos"
  },
  "México": {
    name: "México",
    flag: "🇲🇽",
    code: "México",
    sections: [
      {
        title: "Acerca de México",
        icon: "MapPin",
        content: "México es un país de contrastes con 128 millones de habitantes, rico en historia precolombina, cultura colorida, y tradiciones que combinan herencia indígena con influencia española."
      },
      {
        title: "Lugares Famosos",
        icon: "Camera",
        content: "Descubre las pirámides de Teotihuacán y Chichen Itzá, las playas de Cancún y Riviera Maya, Ciudad de México con sus museos, Oaxaca colonial, y los cenotes de Yucatán."
      },
      {
        title: "Gastronomía de México",
        icon: "Utensils",
        content: "Saborea tacos auténticos, mole poblano, guacamole fresco, tequila y mezcal, tamales caseros, chiles en nogada, y chocolate tradicional mexicano."
      },
      {
        title: "Cultura y Tradiciones",
        icon: "Mountain",
        content: "Celebra el Día de los Muertos, disfruta del mariachi, admira el arte de Frida Kahlo y Diego Rivera, las artesanías coloridas, y las fiestas tradicionales llenas de música y baile."
      }
    ],
    image: "/lovable-uploads/5c9f474f-aacc-4729-a294-c1cfb159ff3c.png",
    wikipediaUrl: "https://es.wikipedia.org/wiki/México"
  },
  "Australia": {
    name: "Australia",
    flag: "🇦🇺",
    code: "Australia",
    sections: [
      {
        title: "Acerca de Australia",
        icon: "MapPin",
        content: "Australia es un continente-país con 25 millones de habitantes, famoso por su vida silvestre única, paisajes diversos, y las culturas aborígenes más antiguas del mundo con más de 65,000 años de historia."
      },
      {
        title: "Lugares Famosos",
        icon: "Camera",
        content: "Explora la Ópera de Sídney, la Gran Barrera de Coral, Uluru (Ayers Rock), las Montañas Azules, Melbourne con su arte urbano, Perth, y Tasmania con su naturaleza prístina."
      },
      {
        title: "Gastronomía de Australia",
        icon: "Utensils",
        content: "Prueba la barbacoa australiana, pavlova (postre nacional), meat pies, Vegemite, mariscos frescos, vinos de Barossa Valley, y la cocina multicultural de sus ciudades."
      },
      {
        title: "Naturaleza Única",
        icon: "Mountain",
        content: "Conoce canguros, koalas, wombats, el ornitorrinco, los demonios de Tasmania, y más de 800 especies de aves en diversos ecosistemas desde desiertos hasta selvas tropicales."
      }
    ],
    image: "/lovable-uploads/Australia.jpg",
    wikipediaUrl: "https://es.wikipedia.org/wiki/Australia"
  },
  "Argentina": {
    name: "Argentina",
    flag: "🇦🇷",
    code: "Argentina",
    sections: [
      {
        title: "Acerca de Argentina",
        icon: "MapPin",
        content: "Argentina es el segundo país más grande de Sudamérica con 45 millones de habitantes, famoso por el tango, el fútbol, la carne, y paisajes que van desde los Andes hasta la Patagonia."
      },
      {
        title: "Lugares Famosos",
        icon: "Camera",
        content: "Visita Buenos Aires con sus barrios históricos, las Cataratas del Iguazú, los glaciares de la Patagonia, Mendoza con sus viñedos, Bariloche en los lagos, y Ushuaia al fin del mundo."
      },
      {
        title: "Gastronomía de Argentina",
        icon: "Utensils",
        content: "Disfruta del asado argentino (barbacoa), empanadas caseras, dulce de leche, vinos Malbec de clase mundial, mate (infusión tradicional), y alfajores dulces."
      },
      {
        title: "Cultura y Tradiciones",
        icon: "Mountain",
        content: "Baila tango en San Telmo, vive la pasión del fútbol, escucha folklore argentino, admira la arquitectura europea de Buenos Aires, y experimenta la hospitalidad gaucha."
      }
    ],
    image: "/lovable-uploads/Argentina.jpg",
    wikipediaUrl: "https://es.wikipedia.org/wiki/Argentina"
  },
  
  // Motorcycle game countries
  "Reino_Unido": {
    name: "Reino Unido",
    flag: "🇬🇧",
    code: "Reino_Unido",
    sections: [
      {
        title: "Acerca del Reino Unido",
        icon: "MapPin",
        content: "El Reino Unido comprende Inglaterra, Escocia, Gales e Irlanda del Norte, cada uno con su propia cultura y tradiciones únicas. Con 67 millones de habitantes, es la cuna del idioma inglés y tiene una rica historia monárquica."
      },
      {
        title: "Lugares Famosos", 
        icon: "Camera",
        content: "Descubre Londres con el Big Ben y Buckingham Palace, Stonehenge misterioso, los castillos escoceses como Edimburgo, las universidades de Oxford y Cambridge, y los paisajes de las Highlands escocesas."
      },
      {
        title: "Gastronomía del Reino Unido",
        icon: "Utensils",
        content: "Disfruta del fish and chips tradicional, afternoon tea con scones, haggis escocés, shepherd's pie, bangers and mash, y la cerveza británica en los tradicionales pubs históricos."
      },
      {
        title: "Cultura y Tradiciones",
        icon: "Mountain", 
        content: "Explora la literatura de Shakespeare y Dickens, la música de The Beatles, las tradiciones monárquicas, el cricket, los jardines ingleses, y los festivales como Wimbledon y Edinburgh Fringe."
      }
    ],
    image: "/lovable-uploads/ReinoUnido.jpg",
    wikipediaUrl: "https://es.wikipedia.org/wiki/Reino_Unido"
  },
  "Portugal": {
    name: "Portugal",
    flag: "🇵🇹",
    code: "Portugal",
    sections: [
      {
        title: "Acerca de Portugal",
        icon: "MapPin",
        content: "Portugal es un país atlántico con 10 millones de habitantes, famoso por su historia marítima, azulejos decorativos, fado melancólico, y paisajes diversos desde montañas hasta costas doradas."
      },
      {
        title: "Lugares Famosos",
        icon: "Camera",
        content: "Visita Lisboa con sus tranvías históricos, Oporto y sus bodegas de vino de Oporto, los acantilados dramáticos del Algarve, los monasterios de Batalha y Alcobaça, y las islas de Madeira y Azores."
      },
      {
        title: "Gastronomía de Portugal",
        icon: "Utensils",
        content: "Prueba el bacalao en sus múltiples preparaciones (dicen que hay 365 recetas), pastéis de nata cremosos, vinho verde refrescante, francesinha de Oporto, y los mariscos frescos de la costa."
      },
      {
        title: "Cultura y Tradiciones", 
        icon: "Mountain",
        content: "Escucha el fado emocional, admira los azulejos artísticos, explora la era de los descubrimientos, las tradiciones pesqueras, y la hospitalidade portuguesa única."
      }
    ],
    image: "/lovable-uploads/Portugal.jpg",
    wikipediaUrl: "https://es.wikipedia.org/wiki/Portugal"
  },
  "Grecia": {
    name: "Grecia",
    flag: "🇬🇷",
    code: "Grecia",
    sections: [
      {
        title: "Acerca de Grecia",
        icon: "MapPin",
        content: "Grecia es la cuna de la democracia y la filosofía occidental, con 10.7 millones de habitantes. Sus 6,000 islas e islotes ofrecen paisajes mediterráneos únicos con una historia que abarca más de 3,000 años."
      },
      {
        title: "Lugares Famosos",
        icon: "Camera",
        content: "Visita la Acrópolis de Atenas, las islas de Santorini y Mykonos, los monasterios de Meteora, el sitio arqueológico de Delfos, Creta con el palacio de Cnossos, y las playas cristalinas del Egeo."
      },
      {
        title: "Gastronomía de Grecia",
        icon: "Utensils",
        content: "Saborea moussaka tradicional, souvlaki a la parrilla, ensalada griega con feta, tzatziki refrescante, baklava dulce, aceite de oliva extra virgen, y ouzo tradicional."
      },
      {
        title: "Historia y Cultura",
        icon: "Mountain",
        content: "Explora los orígenes de la filosofía con Sócrates y Platón, la mitología griega, el teatro clásico, la arquitectura de columnas dóricas, y las tradiciones ortodoxas que perduran."
      }
    ],
    image: "/lovable-uploads/Grecia.jpg",
    wikipediaUrl: "https://es.wikipedia.org/wiki/Grecia"
  },
  "Noruega": {
    name: "Noruega",
    flag: "🇳🇴",
    code: "Noruega",
    sections: [
      {
        title: "Acerca de Noruega",
        icon: "MapPin",
        content: "Noruega es un país escandinavo con 5.4 millones de habitantes, famoso por sus fiordos espectaculares, auroras boreales, y ser uno de los países más prósperos del mundo con alta calidad de vida."
      },
      {
        title: "Lugares Famosos",
        icon: "Camera",
        content: "Admira los fiordos como Geiranger y Nærøy, las auroras boreales en Tromsø, el sol de medianoche, las islas Lofoten, Bergen la ciudad hanseática, y el cabo Norte en el Ártico."
      },
      {
        title: "Gastronomía de Noruega",
        icon: "Utensils",
        content: "Prueba el salmón noruego fresco, bacalao del Ártico, reno tradicional, lefse (pan noruego), aquavit (licor de hierbas), y los mariscos del mar del Norte."
      },
      {
        title: "Cultura y Naturaleza",
        icon: "Mountain",
        content: "Descubre la herencia vikinga, el esquí de fondo (deporte nacional), las casas de madera tradicionales, la cultura sami del norte, y la filosofía del 'friluftsliv' (vida al aire libre)."
      }
    ],
    image: "/lovable-uploads/Noruega.jpg",
    wikipediaUrl: "https://es.wikipedia.org/wiki/Noruega"
  },
  "China": {
    name: "China",
    flag: "🇨🇳",
    code: "China",
    sections: [
      {
        title: "Acerca de China",
        icon: "MapPin",
        content: "China es el país más poblado del mundo con 1.4 mil millones de habitantes y una civilización de más de 5,000 años. Es la segunda economía mundial y líder en tecnología e innovación."
      },
      {
        title: "Lugares Famosos",
        icon: "Camera",
        content: "Visita la Gran Muralla China, la Ciudad Prohibida en Beijing, los Guerreros de Terracota en Xi'an, las montañas de Zhangjiajie, el río Li en Guilin, y las modernas ciudades como Shanghai."
      },
      {
        title: "Gastronomía de China",
        icon: "Utensils",
        content: "Disfruta del pato pequinés, dim sum variado, hot pot picante, fideos caseros, té tradicional en ceremonia, mapo tofu, y la diversa cocina regional de Sichuan a Cantón."
      },
      {
        title: "Cultura Milenaria",
        icon: "Mountain",
        content: "Explora la filosofía del confucianismo y taoísmo, las artes marciales como kung fu, la caligrafía china, la medicina tradicional, los festivales como el Año Nuevo Chino, y la ópera de Beijing."
      }
    ],
    image: "/lovable-uploads/China.jpg",
    wikipediaUrl: "https://es.wikipedia.org/wiki/China"
  },
  "Canada": {
    name: "Canadá",
    flag: "🇨🇦",
    code: "Canada",
    sections: [
      {
        title: "Acerca de Canadá",
        icon: "MapPin",
        content: "Canadá es el segundo país más grande del mundo con 38 millones de habitantes, conocido por su naturaleza virgen, multiculturalismo, y alta calidad de vida. Tiene dos idiomas oficiales: inglés y francés."
      },
      {
        title: "Lugares Famosos",
        icon: "Camera",
        content: "Explora las Cataratas del Niágara, las Montañas Rocosas, los parques nacionales de Banff y Jasper, Quebec histórico, Toronto cosmopolita, Vancouver junto al Pacífico, y la tundra ártica."
      },
      {
        title: "Gastronomía de Canadá",
        icon: "Utensils",
        content: "Prueba poutine (papas con queso y salsa), jarabe de arce auténtico, salmón del Pacífico, tourtière quebequense, butter tarts, y Tim Hortons (café icónico canadiense)."
      },
      {
        title: "Naturaleza y Cultura",
        icon: "Mountain",
        content: "Descubre la cultura indígena de las Primeras Naciones, el hockey sobre hielo (deporte nacional), los colores otoñales, la observación de osos y ballenas, y la aurora boreal en el norte."
      }
    ],
    image: "/lovable-uploads/Canada.jpg",
    wikipediaUrl: "https://es.wikipedia.org/wiki/Canadá"
  },
  "Costa_Rica": {
    name: "Costa Rica",
    flag: "🇨🇷",
    code: "Costa_Rica",
    sections: [
      {
        title: "Acerca de Costa Rica",
        icon: "MapPin",
        content: "Costa Rica es un pequeño país centroamericano con 5 millones de habitantes, famoso por su biodiversidad extraordinaria, ecoturismo, y por no tener ejército desde 1949. Es líder mundial en sostenibilidad."
      },
      {
        title: "Lugares Famosos",
        icon: "Camera",
        content: "Explora el Parque Nacional Manuel Antonio, el volcán Arenal, Monteverde con su bosque nuboso, las playas del Pacífico y Caribe, el Parque Corcovado, y la observación de vida silvestre única."
      },
      {
        title: "Gastronomía de Costa Rica",
        icon: "Utensils",
        content: "Saborea gallo pinto (arroz con frijoles), casado tradicional, café de alta calidad, ceviche fresco, plátanos maduros, y agua de pipa (agua de coco) directa del coco."
      },
      {
        title: "Biodiversidad Única",
        icon: "Mountain",
        content: "Descubre más del 5% de la biodiversidad mundial en solo 0.03% de la superficie terrestre, incluyendo quetzales, perezosos, tucanes, ranas coloridas, y ecosistemas desde manglares hasta páramos."
      }
    ],
    image: "/lovable-uploads/Costa_Rica.jpg",
    wikipediaUrl: "https://es.wikipedia.org/wiki/Costa_Rica"
  },
  "Brasil": {
    name: "Brasil",
    flag: "🇧🇷",
    code: "Brasil",
    sections: [
      {
        title: "Acerca de Brasil",
        icon: "MapPin",
        content: "Brasil es el país más grande de Sudamérica con 215 millones de habitantes, famoso por el Amazonas, el carnaval, el fútbol, y su diversidad cultural que mezcla influencias indígenas, africanas y europeas."
      },
      {
        title: "Lugares Famosos",
        icon: "Camera",
        content: "Visita Río de Janeiro con el Cristo Redentor y Copacabana, las Cataratas del Iguazú, la selva amazónica, Salvador de Bahía colonial, Brasilia modernista, y las playas de Florianópolis."
      },
      {
        title: "Gastronomía de Brasil",
        icon: "Utensils",
        content: "Disfruta de feijoada (guiso nacional), churrasco brasileño, açaí energético, caipirinha refrescante, pão de açúcar, brigadeiro dulce, y la variada cocina regional de cada estado."
      },
      {
        title: "Cultura Vibrante",
        icon: "Mountain",
        content: "Vive el carnaval de Río, escucha samba y bossa nova, admira la arquitectura de Niemeyer, juega fútbol en la playa, y experimenta la alegría de vida brasileña llamada 'jeitinho brasileiro'."
      }
    ],
    image: "/lovable-uploads/Brasil.jpg",
    wikipediaUrl: "https://es.wikipedia.org/wiki/Brasil"
  },
  "Peru": {
    name: "Perú",
    flag: "🇵🇪",
    code: "Peru",
    sections: [
      {
        title: "Acerca de Perú",
        icon: "MapPin",
        content: "Perú tiene 33 millones de habitantes y es hogar de la civilización inca. Con tres regiones geográficas distintas (costa, sierra y selva), Perú ofrece una increíble diversidad natural y cultural."
      },
      {
        title: "Lugares Famosos",
        icon: "Camera",
        content: "Explora Machu Picchu (nueva maravilla del mundo), el Valle Sagrado de los Incas, las líneas de Nazca, el Cañón del Colca, la selva amazónica de Iquitos, y la arquitectura colonial de Cusco."
      },
      {
        title: "Gastronomía de Perú",
        icon: "Utensils",
        content: "Saborea ceviche fresco, lomo saltado, ají de gallina, anticuchos, pisco sour, quinoa nutritiva, y la fusión de cocina inca, española, china y japonesa (nikkei)."
      },
      {
        title: "Herencia Cultural",
        icon: "Mountain",
        content: "Descubre la herencia inca y pre-inca, los textiles coloridos, la música andina con quena y charango, las tradiciones de los pueblos originarios, y la moderna gastronomía peruana reconocida mundialmente."
      }
    ],
    image: "/lovable-uploads/Peru.jpg",
    wikipediaUrl: "https://es.wikipedia.org/wiki/Perú"
  }
};

export const getCountryInfo = (countryCode: string): CountryInfo | null => {
  return countryData[countryCode] || null;
};
