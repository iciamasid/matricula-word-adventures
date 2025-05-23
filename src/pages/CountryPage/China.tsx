
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const ChinaPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    sessionStorage.setItem('navigatingBack', 'true');
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-red-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <div className="w-full flex justify-start mb-4">
          <Button 
            variant="outline" 
            onClick={handleGoBack}
            className="bg-white/80 border-red-400 hover:bg-white/90 text-red-800 kids-text"
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> Volver
          </Button>
        </div>

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
            alt="Cruce de Shibuya, Tokio"
            className="w-full h-64 object-cover"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1 }}
          />
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
