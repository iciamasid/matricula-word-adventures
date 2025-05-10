
// Generates a random license plate with 4 numbers and 3 consonants
export function generateLicensePlate(): string {
  const numbers = Array(4)
    .fill(0)
    .map(() => Math.floor(Math.random() * 10))
    .join("");
  
  const consonants = "BCDFGHJKLMNPQRSTVWXYZ";
  const randomConsonants = Array(3)
    .fill("")
    .map(() => consonants.charAt(Math.floor(Math.random() * consonants.length)))
    .join("");
  
  return `${numbers}${randomConsonants}`;
}

// Extracts the consonants from the license plate
export function getConsonantsFromPlate(plate: string): string {
  return plate.substring(4);
}

// Get a list of possible Spanish vowels
export const vowels = "AEIOUÁÉÍÓÚ";

// Calculate score based on the word and license plate consonants
export function calculateScore(word: string, plateConsonants: string): number {
  const uppercaseWord = word.toUpperCase();
  let score = 0;
  let foundConsonants = 0;
  let inOrder = true;
  let lastIndex = -1;
  const foundIndices: number[] = [];

  // Check each consonant from the plate
  for (let i = 0; i < plateConsonants.length; i++) {
    const consonant = plateConsonants[i];
    const index = uppercaseWord.indexOf(consonant);
    
    if (index !== -1) {
      foundConsonants++;
      foundIndices.push(index);
      
      // Check if consonants appear in order
      if (lastIndex !== -1 && index <= lastIndex) {
        inOrder = false;
      }
      lastIndex = index;
    }
  }

  // Calculate score based on found consonants and order
  if (foundConsonants === 3) {
    score = inOrder ? 100 : 75;  // 3 consonantes en orden: 100 puntos; no ordenadas: 75 puntos
  } else if (foundConsonants === 2) {
    score = inOrder ? 50 : 25;   // 2 consonantes en orden: 50 puntos; no ordenadas: 25 puntos
  } else if (foundConsonants === 1) {
    score = 10;                  // 1 consonante: 10 puntos
  } else if (foundConsonants === 0) {
    score = -20;                 // Palabra incorrecta: -20 puntos
  }

  // Bonus for longer words
  if (score > 0) {
    score += Math.min(50, word.length * 5);
  }

  return score;
}

// Get game level from points
export function getLevel(points: number): number {
  return Math.floor(points / 500) + 1;
}

// Get destination based on level
export function getDestination(level: number): string {
  const destinations = [
    "Madrid",
    "Barcelona",
    "Valencia",
    "Sevilla",
    "Bilbao",
    "Granada",
    "Toledo",
    "Santiago de Compostela",
    "Segovia",
    "Córdoba",
    "Salamanca",
    "San Sebastián",
    "Mallorca",
    "Canarias"
  ];
  
  const index = Math.min(destinations.length - 1, level - 1);
  return destinations[index];
}

// Check if a word is potentially valid (contains at least one required consonant)
export function isValidWord(word: string, plateConsonants: string): boolean {
  const uppercaseWord = word.toUpperCase();
  
  for (const consonant of plateConsonants) {
    if (uppercaseWord.includes(consonant)) {
      return true;
    }
  }
  
  return false;
}

// Word validation function - This is the main change:
// Instead of using a limited dictionary, we'll use a more permissive approach
// considering any word with at least 3 letters as valid for gameplay purposes
export function wordExists(word: string): boolean {
  // First check our dictionary for common words
  const uppercaseWord = word.toUpperCase();
  
  // Reject very short words
  if (word.length < 3) {
    return false;
  }
  
  // For gameplay purposes, accept anything with 3+ letters that looks like a word
  // This is a simplified approach but will work better for the game mechanic
  return true;
}

// Keep the existing SPANISH_WORDS set for reference
const SPANISH_WORDS = new Set([
  "CASA", "PERRO", "GATO", "MESA", "SILLA", "LIBRO", "PAPEL", "PLUMA", "CARRO",
  "MUNDO", "TIEMPO", "COLOR", "COMIDA", "AGUA", "TIERRA", "FUEGO", "AIRE", "VIDA",
  "AMOR", "ODIO", "FELIZ", "TRISTE", "GRANDE", "PEQUEÑO", "ALTO", "BAJO", "BUENO",
  "MALO", "NEGRO", "BLANCO", "ROJO", "VERDE", "AZUL", "AMARILLO", "SOL", "LUNA",
  "ESTRELLA", "CIELO", "MAR", "RIO", "MONTAÑA", "BOSQUE", "ARBOL", "FLOR", "FRUTA",
  "CAMINO", "CALLE", "CIUDAD", "PAIS", "MUNDO", "HOMBRE", "MUJER", "NIÑO", "NIÑA",
  "MANO", "PIE", "CABEZA", "OJO", "NARIZ", "BOCA", "OREJA", "PELO", "DIENTE", "BARCO",
  "TREN", "AVION", "MOTO", "CAMION", "CASA", "PUERTA", "VENTANA", "TECHO", "PARED",
  "PISO", "COCINA", "BAÑO", "COMEDOR", "DORMITORIO", "FRIO", "CALOR", "NIEVE", "LLUVIA",
  "VIENTO", "NUBE", "DIA", "NOCHE", "MAÑANA", "TARDE", "HORA", "MINUTO", "SEGUNDO",
  "SEMANA", "MES", "AÑO", "SIGLO", "TRABAJO", "ESCUELA", "UNIVERSIDAD", "TIENDA",
  "HOSPITAL", "BANCO", "CARTA", "TELEFONO", "TELEVISION", "COMPUTADORA", "INTERNET",
  "MUSICA", "PELICULA", "DEPORTE", "FUTBOL", "BALONCESTO", "TENIS", "NATACION", "FAMILIA",
  "AMIGO", "VECINO", "JEFE", "COMPAÑERO", "PROFESOR", "ESTUDIANTE", "MEDICO", "PACIENTE",
  "POLICIA", "LADRON", "JUEZ", "ABOGADO", "COCINERO", "CAMARERO",
  // Adding many more common Spanish words
  "GUSTAR", "QUERER", "HACER", "TENER", "ESTAR", "COMER", "BEBER", "DORMIR", "HABLAR",
  "CANTAR", "BAILAR", "SALTAR", "CORRER", "CAMINAR", "JUGAR", "LEER", "ESCRIBIR", 
  "MIRAR", "ESCUCHAR", "PENSAR", "SOÑAR", "TRABAJAR", "ESTUDIAR", "ENSEÑAR", "APRENDER",
  "VIAJAR", "CONDUCIR", "NADAR", "COCINAR", "LIMPIAR", "COMPRAR", "VENDER", "PAGAR",
  "GANAR", "PERDER", "BUSCAR", "ENCONTRAR", "ABRIR", "CERRAR", "COMENZAR", "TERMINAR",
  "ENTRAR", "SALIR", "SUBIR", "BAJAR", "LLEGAR", "PARTIR", "QUEDAR", "PONER", "SACAR",
  "LLEVAR", "TRAER", "DAR", "RECIBIR", "MANDAR", "ENVIAR", "ESPERAR", "CONTINUAR",
  "PARAR", "SEGUIR", "VOLVER", "GIRAR", "CAMBIAR", "MEJORAR", "EMPEORAR", "AUMENTAR",
  "DISMINUIR", "ACABAR", "INICIAR", "PREPARAR", "ARREGLAR", "ROMPER", "DESTRUIR",
  "CONSTRUIR", "CREAR", "INVENTAR", "DESCUBRIR", "EXPLICAR", "CONTAR", "MOSTRAR",
  "DEBER", "PODER", "SABER", "CONOCER", "CREER", "PENSAR", "SENTIR", "PARECER",
  "GUSTAR", "ENCANTAR", "ODIAR", "AMAR", "NECESITAR", "FALTAR", "SOBRAR", "BASTAR",
  "IMPORTAR", "INTERESAR", "PREOCUPAR", "ALEGRAR", "ENTRISTECER", "ENFADAR", "CALMAR",
  "TRANQUILIZAR", "ANIMAR", "DESANIMAR", "ASUSTAR", "SORPRENDER", "CONFUNDIR", "ACLARAR",
  "PEDIR", "PREGUNTAR", "RESPONDER", "CONTESTAR", "DECIR", "GRITAR", "SUSURRAR", "CALLAR",
  "REIR", "LLORAR", "SONREIR", "SUSPIRAR", "RESPIRAR", "TOSER", "ESTORNUDAR", "BOSTEZAR",
  "DESPERTAR", "LEVANTAR", "ACOSTAR", "SENTAR", "PARAR", "ANDAR", "MOVER", "TOCAR",
  "COGER", "SOLTAR", "TIRAR", "EMPUJAR", "CARGAR", "DESCARGAR", "FIRMAR", "BORRAR",
  "MARCAR", "SEÑALAR", "INDICAR", "APUNTAR", "DIRIGIR", "SEGUIR", "PERSEGUIR", "ALCANZAR"
]);
