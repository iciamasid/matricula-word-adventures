import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const ChinaPage = () => {
  const navigate = useNavigate();

  // Determine the correct return path based on navigation context
  const getReturnPath = () => {
    const navigatingBack = sessionStorage.getItem('navigatingBack');
    
    if (navigatingBack === 'motorcycle-game') {
      return '/motorcycle-game';
    } else {
      return '/'; // Default to car game (Index page)
    }
  };

  const handleNavigation = () => {
    // CRITICAL FIX: Restore game state if it was stored
    const gameState = sessionStorage.getItem('gameStateBeforeCountry');
    if (gameState) {
      const parsedState = JSON.parse(gameState);
      console.log('Restoring game state from China page:', parsedState);
      
      // Store the state for the GameContext to restore
      sessionStorage.setItem('restoreGameState', JSON.stringify(parsedState));
      sessionStorage.removeItem('gameStateBeforeCountry');
    }
    
    // Clear the navigation flag when returning
    sessionStorage.removeItem('navigatingBack');
    navigate(getReturnPath());
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-red-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleNavigation}
          className="mb-4 bg-red-700/90 hover:bg-red-800 text-white border-red-600"
        >
          <ArrowLeft className="w-4 h-4 mr-1" /> Volver al juego
        </Button>

        {/* Header with flag and country name */}
        <div className="text-center mb-8">
          <div className="text-8xl mb-4">🇨🇳</div>
          <h1 className="text-4xl font-bold text-red-800 kids-text mb-2">China</h1>
          <p className="text-xl text-red-700 kids-text">¡Bienvenido a China!</p>
        </div>

        {/* Country image */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
          <motion.img 
            src="/lovable-uploads/54b230f6-8a76-4e9a-ae4c-5fa2f7087600.png" 
            alt="Gran Muralla China"
            className="w-full h-64 object-cover"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1 }}
          />
        </div>

        {/* Country map location */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
          <div className="p-4 bg-red-50">
            <h2 className="text-2xl font-bold text-red-800 kids-text mb-2 flex items-center">
              <MapPin className="w-6 h-6 mr-2 text-red-700" /> Ubicación
            </h2>
          </div>
          <div className="relative pb-[56.25%] h-0">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24185315.40829373!2d81.17132033164064!3d35.86166130145476!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31508e64e5c642c1%3A0x951daa7c349f366f!2sChina!5e0!3m2!1sen!2ses!4v1653131456789!5m2!1sen!2ses"
              width="100%"
              height="100%"
              style={{ border: 0, position: 'absolute', top: 0, left: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        {/* Basic info section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-red-800 kids-text mb-4">Información básica</h2>
          <div className="grid grid-cols-2 gap-4 text-lg">
            <div>
              <h3 className="font-semibold text-red-700 kids-text">Capital</h3>
              <p className="text-gray-700 kids-text">Pekín</p>
            </div>
            <div>
              <h3 className="font-semibold text-red-700 kids-text">Idioma</h3>
              <p className="text-gray-700 kids-text">Mandarín</p>
            </div>
            <div>
              <h3 className="font-semibold text-red-700 kids-text">Población</h3>
              <p className="text-gray-700 kids-text">1.402 mil millones</p>
            </div>
            <div>
              <h3 className="font-semibold text-red-700 kids-text">Moneda</h3>
              <p className="text-gray-700 kids-text">Yuan (¥)</p>
            </div>
          </div>
        </div>

        {/* Fun facts section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-red-800 kids-text mb-4">¡Datos curiosos!</h2>
          <div className="space-y-4 text-lg text-gray-700">
            <p>🧱 <strong>¡La Gran Muralla China es visible desde el espacio!</strong> Aunque esto es un mito, sí es impresionante desde aviones.</p>
            <p>📜 <strong>¡Inventaron el papel, la brújula, la pólvora y la imprenta!</strong> Los cuatro grandes inventos de China.</p>
            <p>🧧 <strong>¡El Año Nuevo Chino cambia cada año!</strong> Se basa en el calendario lunar, no el solar.</p>
            <p>🐼 <strong>¡El panda gigante solo vive en China!</strong> Es el símbolo nacional del país y está en peligro de extinción.</p>
          </div>
        </div>

        {/* Landmarks section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-red-800 kids-text mb-4">Lugares famosos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg text-gray-700">
            <div className="p-4 bg-red-50 rounded-lg">
              <h3 className="font-bold text-red-800">🧱 Gran Muralla China</h3>
              <p>La estructura más larga jamás construida por el ser humano.</p>
            </div>
            <div className="p-4 bg-red-50 rounded-lg">
              <h3 className="font-bold text-red-800">🏛️ Ciudad Prohibida</h3>
              <p>Antiguo palacio imperial en Pekín con 9.999 habitaciones.</p>
            </div>
            <div className="p-4 bg-red-50 rounded-lg">
              <h3 className="font-bold text-red-800">🏺 Ejército de Terracota</h3>
              <p>Miles de estatuas de guerreros que protegen la tumba del primer emperador.</p>
            </div>
            <div className="p-4 bg-red-50 rounded-lg">
              <h3 className="font-bold text-red-800">🏔️ Torres Karst</h3>
              <p>Montañas en forma de pilares en Guilin, famosas por su belleza.</p>
            </div>
          </div>
        </div>

        {/* Cultural section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-red-800 kids-text mb-4">Cultura y tradiciones</h2>
          <div className="space-y-4 text-lg text-gray-700">
            <p>🥟 <strong>Gastronomía:</strong> Dumplings, pato laqueado, arroz frito y té son muy importantes.</p>
            <p>🐲 <strong>Dragón chino:</strong> Símbolo de buena suerte, poder y sabiduría en la cultura china.</p>
            <p>🎎 <strong>Kung Fu:</strong> Arte marcial tradicional que combina filosofía y técnicas de combate.</p>
            <p>📿 <strong>Filosofía:</strong> Confucio y Lao Tse fueron grandes pensadores chinos antiguos.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChinaPage;
