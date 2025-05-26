
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center mb-4">
            <Shield className="w-12 h-12 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-800 kids-text">
              Política de Privacidad
            </h1>
          </div>
          <p className="text-lg text-gray-600 kids-text">
            Matriculaba Cadabra - Juego Educativo
          </p>
        </motion.div>

        {/* Back button */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/">
            <Button 
              variant="outline" 
              className="bg-blue-100 hover:bg-blue-200 text-blue-800 border-blue-300 kids-text"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al juego
            </Button>
          </Link>
        </motion.div>

        {/* Content */}
        <motion.div
          className="bg-white rounded-lg shadow-lg p-8 space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="text-sm text-gray-500 mb-4">
            Última actualización: {new Date().toLocaleDateString('es-ES')}
          </div>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 kids-text">
              1. Información que recopilamos
            </h2>
            <div className="space-y-3 text-gray-700">
              <p>
                <strong>Matriculaba Cadabra</strong> es un juego educativo diseñado para niños que prioriza 
                la privacidad y seguridad. La información que recopilamos es mínima y se almacena únicamente 
                en el dispositivo del usuario:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Nombre del jugador:</strong> Solo para personalizar la experiencia de juego</li>
                <li><strong>Edad:</strong> Para adaptar el contenido y otorgar bonificaciones apropiadas</li>
                <li><strong>Progreso del juego:</strong> Niveles completados, puntuación y vehículos desbloqueados</li>
              </ul>
              <p className="bg-green-50 p-3 rounded-md border-l-4 border-green-400">
                <strong>✅ Importante:</strong> Toda esta información se guarda únicamente en el dispositivo 
                y nunca se envía a servidores externos.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 kids-text">
              2. Cómo utilizamos la información
            </h2>
            <div className="space-y-3 text-gray-700">
              <p>La información recopilada se utiliza exclusivamente para:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Personalizar la experiencia de juego con el nombre del niño</li>
                <li>Guardar el progreso del juego para continuar donde se quedó</li>
                <li>Proporcionar bonificaciones especiales relacionadas con la edad</li>
                <li>Adaptar la dificultad del juego según el nivel alcanzado</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 kids-text">
              3. Seguridad infantil
            </h2>
            <div className="space-y-3 text-gray-700">
              <p><strong>Matriculaba Cadabra</strong> está diseñado pensando en la seguridad de los niños:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Sin comunicación externa:</strong> La aplicación no se conecta a internet</li>
                <li><strong>Sin publicidad:</strong> Completamente libre de anuncios</li>
                <li><strong>Sin compras integradas:</strong> No hay transacciones dentro de la aplicación</li>
                <li><strong>Sin seguimiento:</strong> No utilizamos cookies ni herramientas de seguimiento</li>
                <li><strong>Sin redes sociales:</strong> No hay integración con plataformas sociales</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 kids-text">
              4. Almacenamiento de datos
            </h2>
            <div className="space-y-3 text-gray-700">
              <p>
                Todos los datos del juego se almacenan localmente en el dispositivo utilizando 
                el almacenamiento local del navegador. Esto significa que:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Los datos nunca salen del dispositivo</li>
                <li>No hay servidores externos involucrados</li>
                <li>Los padres tienen control total sobre la información</li>
                <li>Los datos se pueden eliminar desinstalando la aplicación</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 kids-text">
              5. Derechos de los padres
            </h2>
            <div className="space-y-3 text-gray-700">
              <p>Los padres y tutores tienen derecho a:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Revisar la información almacenada en el dispositivo</li>
                <li>Eliminar todos los datos del juego en cualquier momento</li>
                <li>Supervisar el uso de la aplicación por parte de sus hijos</li>
                <li>Contactarnos para cualquier consulta sobre privacidad</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 kids-text">
              6. Cambios en esta política
            </h2>
            <div className="space-y-3 text-gray-700">
              <p>
                Si realizamos cambios en esta política de privacidad, actualizaremos la fecha 
                de "última actualización" en la parte superior de esta página. Recomendamos 
                revisar esta política periódicamente.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 kids-text">
              7. Contacto
            </h2>
            <div className="space-y-3 text-gray-700">
              <p>
                Si tienes preguntas sobre esta política de privacidad o sobre cómo manejamos 
                la información en <strong>Matriculaba Cadabra</strong>, puedes contactarnos a través de:
              </p>
              <div className="bg-blue-50 p-4 rounded-md">
                <p><strong>Email:</strong> privacidad@matriculabacadabra.com</p>
                <p><strong>Aplicación:</strong> Matriculaba Cadabra - Juego Educativo</p>
                <p><strong>Desarrollador:</strong> Equipo Matriculaba Cadabra</p>
              </div>
            </div>
          </section>

          <div className="border-t pt-6 mt-8">
            <p className="text-center text-gray-600 kids-text">
              <strong>Matriculaba Cadabra</strong> - Un juego educativo seguro y divertido para niños
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
