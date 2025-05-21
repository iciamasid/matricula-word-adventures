
// Motorcycle images will be provided by the user
export interface MotorcycleType {
  id: string;
  name: string;
  image: string;
  color: string;
  unlockedAtLevel: number;
}

// Placeholder motorcycle data (images need to be provided by the user)
export const motorcycles: MotorcycleType[] = [{
  id: "1",
  name: "Azul",
  image: "motoazul.png", // Placeholder, user will provide actual images
  color: "bg-cyan-500",
  unlockedAtLevel: 0 // Always unlocked
}, {
  id: "2",
  name: "Amarilla",
  image: "motoamarilla.png",
  color: "bg-yellow-500",
  unlockedAtLevel: 2
}, {
  id: "3",
  name: "Roja",
  image: "motoroja.png",
  color: "bg-red-500",
  unlockedAtLevel: 3
}, {
  id: "4",
  name: "Verde",
  image: "motoverde.png",
  color: "bg-green-500",
  unlockedAtLevel: 4
}, {
  id: "5",
  name: "Turquesa Racing",
  image: "mototurquesa.png",
  color: "bg-cyan-400",
  unlockedAtLevel: 5
}, {
  id: "6",
  name: "Negra",
  image: "motonegra.png", 
  color: "bg-gray-900",
  unlockedAtLevel: 6
}, {
  id: "7", 
  name: "Blanca",
  image: "motoblanca.png",
  color: "bg-gray-100",
  unlockedAtLevel: 7
}, {
  id: "8",
  name: "Dorada",
  image: "motodorada.png",
  color: "bg-amber-300",
  unlockedAtLevel: 8
}, {
  id: "9",
  name: "Plateada",
  image: "motoplateada.png",
  color: "bg-gray-400",
  unlockedAtLevel: 9
}];

// New world destinations for the motorcycle tour
export const MOTORCYCLE_DESTINATIONS = [
  {
    city: "Bangkok",
    country: "Tailandia",
    flag: "🇹🇭",
    fact: "¡Tailandia tiene más de 35.000 templos budistas! En Bangkok está el Templo del Buda de Esmeralda."
  },
  {
    city: "Río de Janeiro",
    country: "Brasil",
    flag: "🇧🇷",
    fact: "¡La estatua del Cristo Redentor en Río de Janeiro mide 30 metros de altura y es una de las Siete Maravillas del Mundo Moderno!"
  },
  {
    city: "Toronto",
    country: "Canadá",
    flag: "🇨🇦",
    fact: "¡Canadá tiene más lagos que el resto del mundo junto! Casi el 20% del agua dulce del planeta está en Canadá."
  },
  {
    city: "Marrakech",
    country: "Marruecos",
    flag: "🇲🇦",
    fact: "¡En Marruecos hay una ciudad entera pintada de azul llamada Chefchaouen! Sus edificios están pintados en distintos tonos de azul."
  },
  {
    city: "Ciudad del Cabo",
    country: "Sudáfrica",
    flag: "🇿🇦",
    fact: "¡En Sudáfrica hay 11 idiomas oficiales! También es hogar de la Gran Migración anual de ñus y cebras."
  },
  {
    city: "Berlín",
    country: "Alemania",
    flag: "🇩🇪",
    fact: "¡El osito de gominola (Haribo) fue inventado en Alemania en 1922! Alemania también tiene más de 1.500 tipos diferentes de salchichas."
  },
  {
    city: "Mumbai",
    country: "India",
    flag: "🇮🇳",
    fact: "¡La película más larga de la historia se hizo en India y dura 41 horas! La India también inventó el ajedrez hace más de 1.500 años."
  },
  {
    city: "Auckland",
    country: "Nueva Zelanda",
    flag: "🇳🇿",
    fact: "¡En Nueva Zelanda hay más ovejas que personas! Por cada persona hay aproximadamente 6 ovejas."
  },
  {
    city: "El Cairo",
    country: "Egipto",
    flag: "🇪🇬",
    fact: "¡La Gran Pirámide de Guiza en Egipto es la única de las Siete Maravillas del Mundo Antiguo que aún sigue en pie!"
  },
  {
    city: "Lisboa",
    country: "Portugal",
    flag: "🇵🇹",
    fact: "¡Portugal es el país europeo que más tiempo ha mantenido sus fronteras sin cambios, desde el año 1249! También tiene la librería más antigua del mundo."
  }
];
