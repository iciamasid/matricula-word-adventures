
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, MapPin, Flag, Info } from "lucide-react";
import { motion } from "framer-motion";
import WorldMap from "@/components/WorldMap";

// Extended country info for kids
const countryDetails: Record<string, {
  facts: string[];
  imageUrl: string;
  funFact: string;
  childFriendlyDescription: string;
  color: string;
}> = {
  "España": {
    facts: [
      "España tiene 17 regiones autónomas, ¡cada una con sus propias tradiciones!",
      "La comida más famosa de España es la paella, un plato de arroz con azafrán.",
      "El fútbol es muy popular en España. ¡Real Madrid y FC Barcelona son equipos muy famosos!"
    ],
    imageUrl: "https://images.unsplash.com/photo-1543783207-ec64e4d95325",
    funFact: "¡En España existe una fiesta llamada 'La Tomatina' donde la gente se lanza tomates!",
    childFriendlyDescription: "España es un país colorido y alegre con playas, montañas y ciudades llenas de historia. A los españoles les encanta la música, el baile y pasar tiempo con sus amigos y familia.",
    color: "bg-red-500"
  },
  "Francia": {
    facts: [
      "La Torre Eiffel fue construida para la Exposición Universal de 1889.",
      "En Francia se habla francés, ¡y dicen 'Bonjour!' para saludar!",
      "Francia es famosa por sus deliciosos croissants, baguettes y quesos."
    ],
    imageUrl: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
    funFact: "¡En Francia tienen más de 400 tipos diferentes de queso!",
    childFriendlyDescription: "Francia es un país elegante con hermosos monumentos, arte y comida deliciosa. Los franceses disfrutan de largas comidas con familiares y amigos.",
    color: "bg-blue-600"
  },
  "Italia": {
    facts: [
      "Italia tiene forma de bota en el mapa.",
      "Los italianos inventaron la pizza, la pasta y el helado.",
      "En Roma está el Coliseo, un estadio gigante de hace 2000 años."
    ],
    imageUrl: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9",
    funFact: "¡En Italia la gente habla con las manos! Tienen más de 250 gestos que usan todos los días.",
    childFriendlyDescription: "Italia es un país lleno de historia, arte y la comida más rica del mundo. A los italianos les encanta hablar alto, reír y pasar tiempo en familia.",
    color: "bg-green-600"
  },
  "Reino Unido": {
    facts: [
      "En el Reino Unido está el Big Ben, un reloj gigante muy famoso.",
      "Los ingleses toman el té con leche por las tardes.",
      "En Londres, los autobuses son rojos y de dos pisos."
    ],
    imageUrl: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad",
    funFact: "¡La familia real británica tiene una colección de más de 10.000 obras de arte!",
    childFriendlyDescription: "Reino Unido es un país con castillos, parques verdes y mucha historia. A los británicos les encanta la educación, los buenos modales y hacer fila ordenadamente.",
    color: "bg-blue-900"
  },
  "Estados Unidos": {
    facts: [
      "Estados Unidos tiene 50 estados y la capital es Washington DC.",
      "La Estatua de la Libertad fue un regalo de Francia.",
      "El Gran Cañón es tan grande que se puede ver desde el espacio."
    ],
    imageUrl: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29",
    funFact: "¡En Estados Unidos inventaron los parques de atracciones, las hamburguesas y los pantalones vaqueros!",
    childFriendlyDescription: "Estados Unidos es un país enorme con desiertos, montañas, bosques y grandes ciudades. Es conocido por sus películas de Hollywood, la música y el entretenimiento.",
    color: "bg-blue-800"
  },
  "Japón": {
    facts: [
      "En Japón la gente se saluda haciendo una reverencia.",
      "Los japoneses comen con palillos en lugar de tenedor.",
      "Japón tiene más de 5 millones de máquinas expendedoras."
    ],
    imageUrl: "https://images.unsplash.com/photo-1528164344705-47542687000d",
    funFact: "¡En Japón hay una isla llena de conejos amistosos que puedes visitar!",
    childFriendlyDescription: "Japón es un país fascinante donde la tecnología moderna convive con tradiciones antiguas. Los japoneses adoran los dibujos animados (anime) y los videojuegos.",
    color: "bg-red-600"
  },
  "Australia": {
    facts: [
      "En Australia viven canguros, koalas y ornitorrincos.",
      "La Gran Barrera de Coral es el ser vivo más grande del planeta.",
      "Australia es el único país que ocupa un continente entero."
    ],
    imageUrl: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be",
    funFact: "¡En Australia hay una playa con 7 kilómetros de arena tan blanca que parece nieve!",
    childFriendlyDescription: "Australia es un país lleno de animales únicos, playas increíbles y mucha naturaleza. Los australianos son muy amigables y les encanta la vida al aire libre.",
    color: "bg-blue-700"
  },
  "Brasil": {
    facts: [
      "Brasil tiene la selva amazónica, el pulmón del planeta.",
      "El Carnaval de Río es una de las fiestas más grandes del mundo.",
      "El fútbol es el deporte más popular en Brasil."
    ],
    imageUrl: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325",
    funFact: "¡En Brasil hay un río tan ancho que desde una orilla no puedes ver la otra!",
    childFriendlyDescription: "Brasil es un país colorido, alegre y musical. Es famoso por sus playas, sus bailes y su naturaleza impresionante.",
    color: "bg-green-700"
  },
  "Egipto": {
    facts: [
      "Las pirámides de Egipto tienen más de 4500 años.",
      "Los antiguos egipcios inventaron el papel, la escritura y el calendario.",
      "El río Nilo es el más largo del mundo."
    ],
    imageUrl: "https://images.unsplash.com/photo-1568322445389-f7e0c1d7fd60",
    funFact: "¡Los antiguos egipcios creían que los gatos eran mágicos y sagrados!",
    childFriendlyDescription: "Egipto es un país de misterio y aventura, con pirámides, momias y tesoros antiguos. Su historia es tan antigua que parece mágica.",
    color: "bg-yellow-600"
  },
  "China": {
    facts: [
      "La Gran Muralla China es la única construcción humana visible desde el espacio.",
      "En China se inventaron el papel, la brújula, la pólvora y la imprenta.",
      "El Año Nuevo chino es la fiesta más importante del país."
    ],
    imageUrl: "https://images.unsplash.com/photo-1547981609-4b6a0451243f",
    funFact: "¡En China hay restaurantes donde robots te sirven la comida!",
    childFriendlyDescription: "China es un país enorme con una historia de más de 5000 años. Es famoso por sus dragones, pandas, artes marciales y comida deliciosa.",
    color: "bg-red-700"
  },
  "Sudáfrica": {
    facts: [
      "Sudáfrica tiene 11 idiomas oficiales.",
      "En Sudáfrica viven los 5 grandes animales: león, leopardo, rinoceronte, elefante y búfalo.",
      "La flor nacional es la protea, que parece una estrella de colores."
    ],
    imageUrl: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5",
    funFact: "¡En Sudáfrica hay una carretera que cambia de color cuando hace frío para avisar a los conductores de posible hielo!",
    childFriendlyDescription: "Sudáfrica es un país con impresionantes paisajes, animales salvajes y playas hermosas. Es conocido como la nación arcoíris por la diversidad de su gente.",
    color: "bg-green-800"
  },
  "Kenia": {
    facts: [
      "En Kenia está el Parque Nacional Maasai Mara, famoso por la migración de ñus.",
      "El monte Kilimanjaro, la montaña más alta de África, está en la frontera con Tanzania.",
      "Los masái son una tribu famosa por sus saltos altos y coloridas vestimentas."
    ],
    imageUrl: "https://images.unsplash.com/photo-1489493887525-1f0313400bb7",
    funFact: "¡En Kenia hay un santuario donde puedes adoptar elefantes bebés huérfanos!",
    childFriendlyDescription: "Kenia es un país de safaris, donde puedes ver leones, jirafas y elefantes en libertad. Su naturaleza salvaje es impresionante y hermosa.",
    color: "bg-red-800"
  }
};

// Default content for countries without specific data
const defaultCountryInfo = {
  facts: [
    "¡Este país tiene su propia cultura, historia y tradiciones!",
    "Cada país tiene comida, música y costumbres únicas.",
    "¡Explorar nuevos países nos ayuda a entender mejor nuestro mundo!"
  ],
  imageUrl: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5ce",
  funFact: "¡Hay 195 países en el mundo, cada uno con su propio conjunto único de maravillas!",
  childFriendlyDescription: "Este país es un lugar fascinante esperando a ser explorado. ¡Cada país tiene sus propias sorpresas y tesoros!",
  color: "bg-purple-600"
};

const CountryPage: React.FC = () => {
  const { country } = useParams<{ country: string }>();
  const navigate = useNavigate();
  
  const countryInfo = countryDetails[country || ""] || defaultCountryInfo;
  const countryName = country || "País Desconocido";
  
  return (
    <div 
      className="min-h-screen py-6 flex flex-col items-center overflow-y-auto"
      style={{
        backgroundColor: "rgb(154, 131, 185)",
        backgroundSize: "cover"
      }}
    >
      <motion.div 
        className="container max-w-2xl px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Button 
          onClick={() => navigate('/')} 
          variant="outline" 
          className="mb-6 bg-white hover:bg-gray-100"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Volver al juego
        </Button>
        
        <Card className="mb-6 border-2 border-purple-300 overflow-hidden">
          <div className={`${countryInfo.color} h-3`}></div>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <Flag className="h-6 w-6 mr-2 text-purple-700" />
                <span className="text-2xl">Descubre {countryName}</span>
              </div>
              <motion.span
                className="text-4xl"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, 0, -10, 0]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                {country === "España" ? "🇪🇸" : 
                 country === "Francia" ? "🇫🇷" :
                 country === "Italia" ? "🇮🇹" :
                 country === "Reino Unido" ? "🇬🇧" :
                 country === "Estados Unidos" ? "🇺🇸" :
                 country === "Japón" ? "🇯🇵" :
                 country === "Australia" ? "🇦🇺" :
                 country === "Brasil" ? "🇧🇷" :
                 country === "Egipto" ? "🇪🇬" :
                 country === "China" ? "🇨🇳" :
                 country === "Sudáfrica" ? "🇿🇦" :
                 country === "Kenia" ? "🇰🇪" : "🌎"}
              </motion.span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6 aspect-video relative overflow-hidden rounded-md">
              <img 
                src={`${countryInfo.imageUrl}?auto=format&fit=crop&w=700&h=400&q=80`}
                alt={countryName} 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <p className="text-white text-lg font-bold drop-shadow-md">
                  {countryName}
                </p>
              </div>
            </div>
            
            <motion.p
              className="text-lg mb-6 text-purple-800 font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {countryInfo.childFriendlyDescription}
            </motion.p>
            
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-3 text-purple-900 flex items-center">
                <Info className="h-5 w-5 mr-2 text-purple-700" /> 
                Datos curiosos:
              </h3>
              
              {countryInfo.facts.map((fact, index) => (
                <motion.div 
                  key={index}
                  className="flex items-start mb-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <span className="text-2xl mr-2">🌟</span>
                  <p className="text-lg">{fact}</p>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              className="bg-purple-100 p-4 rounded-lg border border-purple-300 mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <h3 className="flex items-center text-lg font-bold mb-2 text-purple-900">
                <motion.span
                  className="text-2xl mr-2"
                  animate={{ rotate: [0, 10, -10, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ✨
                </motion.span>
                ¡Dato divertido!
              </h3>
              <p className="text-lg text-purple-800">{countryInfo.funFact}</p>
            </motion.div>
            
            <div className="h-[300px] rounded-lg overflow-hidden border-2 border-purple-300 mb-4">
              <WorldMap highlightCountry={countryName} />
            </div>
            
            <div className="text-center mt-6">
              <Button 
                onClick={() => navigate('/')} 
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-6 py-3"
              >
                <ArrowLeft className="mr-2 h-5 w-5" /> Volver al juego
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default CountryPage;
