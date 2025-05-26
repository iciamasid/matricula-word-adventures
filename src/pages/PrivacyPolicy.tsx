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
            <Button variant="outline" className="bg-blue-100 hover:bg-blue-200 text-blue-800 border-blue-300 kids-text">
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
                <li><strong>Identificadores técnicos:</strong> Para mostrar anuncios apropiados para la edad (sin almacenar datos personales)</li>
              </ul>
              <p className="bg-green-50 p-3 rounded-md border-l-4 border-green-400">
                <strong>✅ Importante:</strong> Los datos del juego se guardan únicamente en el dispositivo 
                y nunca se envían a servidores externos. Los anuncios utilizan identificadores técnicos 
                temporales que no almacenan información personal.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 kids-text">
              2. Publicidad dirigida a niños
            </h2>
            <div className="space-y-3 text-gray-700">
              <p>
                <strong>Matriculaba Cadabra</strong> incluye anuncios apropiados para niños que aparecen en dos formatos:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Anuncios en banner:</strong> Aparecen ocasionalmente durante el juego</li>
                <li><strong>Anuncios recompensados:</strong> Los niños pueden elegir ver un anuncio para obtener recompensas en el juego</li>
              </ul>
              
              <div className="bg-blue-50 p-4 rounded-md border-l-4 border-blue-400">
                <h4 className="font-semibold mb-2">🛡️ Cumplimiento con COPPA y GDPR</h4>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Utilizamos tecnologías publicitarias que cumplen estrictamente con COPPA (Children's Online Privacy Protection Act)</li>
                  <li>Cumplimos con el GDPR (Reglamento General de Protección de Datos) europeo</li>
                  <li>Los anuncios están específicamente diseñados y filtrados para ser apropiados para niños</li>
                  <li>No se recopilan datos personales para la segmentación publicitaria</li>
                  <li>No se utilizan cookies de seguimiento comportamental</li>
                </ul>
              </div>

              <div className="bg-yellow-50 p-4 rounded-md border-l-4 border-yellow-400">
                <h4 className="font-semibold mb-2">👨‍👩‍👧‍👦 Control parental</h4>
                <p>
                  Los padres pueden contactarnos en cualquier momento para solicitar la desactivación 
                  de anuncios o para obtener más información sobre el contenido publicitario mostrado.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 kids-text">
              3. Cómo utilizamos la información
            </h2>
            <div className="space-y-3 text-gray-700">
              <p>La información recopilada se utiliza exclusivamente para:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Personalizar la experiencia de juego con el nombre del niño</li>
                <li>Guardar el progreso del juego para continuar donde se quedó</li>
                <li>Proporcionar bonificaciones especiales relacionadas con la edad</li>
                <li>Adaptar la dificultad del juego según el nivel alcanzado</li>
                <li>Mostrar anuncios apropiados para la edad del usuario (sin almacenar datos personales)</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 kids-text">
              4. Seguridad infantil
            </h2>
            <div className="space-y-3 text-gray-700">
              <p><strong>Matriculaba Cadabra</strong> está diseñado pensando en la seguridad de los niños:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Anuncios seguros:</strong> Solo se muestran anuncios pre-aprobados y apropiados para niños</li>
                <li><strong>Sin seguimiento personal:</strong> Los anuncios no rastrean comportamientos individuales</li>
                <li><strong>Cumplimiento legal:</strong> Compatible con COPPA, GDPR y otras regulaciones de protección infantil</li>
                <li><strong>Sin redes sociales:</strong> No hay integración con plataformas sociales</li>
                <li><strong>Contenido educativo:</strong> Los anuncios priorizan contenido educativo y apropiado</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 kids-text">
              5. Almacenamiento de datos
            </h2>
            <div className="space-y-3 text-gray-700">
              <p>
                Todos los datos del juego se almacenan localmente en el dispositivo utilizando 
                el almacenamiento local del navegador. Esto significa que:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Los datos del juego nunca salen del dispositivo</li>
                <li>No hay servidores externos que almacenen información personal</li>
                <li>Los padres tienen control total sobre la información</li>
                <li>Los datos se pueden eliminar desinstalando la aplicación</li>
                <li>Los identificadores publicitarios son temporales y no persistentes</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 kids-text">
              6. Derechos de los padres
            </h2>
            <div className="space-y-3 text-gray-700">
              <p>Los padres y tutores tienen derecho a:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Revisar la información almacenada en el dispositivo</li>
                <li>Eliminar todos los datos del juego en cualquier momento</li>
                <li>Solicitar la desactivación de anuncios</li>
                <li>Obtener información detallada sobre el contenido publicitario</li>
                <li>Supervisar el uso de la aplicación por parte de sus hijos</li>
                <li>Contactarnos para cualquier consulta sobre privacidad o publicidad</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 kids-text">
              7. Terceros y socios publicitarios
            </h2>
            <div className="space-y-3 text-gray-700">
              <p>
                Trabajamos únicamente con socios publicitarios que cumplen con las más estrictas 
                normas de protección infantil:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Todos los socios están certificados para publicidad dirigida a menores</li>
                <li>Los anuncios pasan por filtros de contenido apropiado</li>
                <li>No se comparten datos personales con terceros</li>
                <li>Los socios cumplen con COPPA, GDPR y regulaciones locales</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 kids-text">
              8. Cambios en esta política
            </h2>
            <div className="space-y-3 text-gray-700">
              <p>
                Si realizamos cambios en esta política de privacidad, actualizaremos la fecha 
                de "última actualización" en la parte superior de esta página. Los cambios 
                significativos serán comunicados a través de la aplicación. Recomendamos 
                revisar esta política periódicamente.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 kids-text">
              9. Contacto
            </h2>
            <div className="space-y-3 text-gray-700">
              <p>
                Si tienes preguntas sobre esta política de privacidad, sobre cómo manejamos 
                la información en <strong>Matriculaba Cadabra</strong>, o sobre los anuncios 
                mostrados, puedes contactarnos a través de:
              </p>
              <div className="bg-blue-50 p-4 rounded-md">
                <p><strong>Email:</strong> imasidur@gmail.com</p>
                <p><strong>Aplicación:</strong> Matriculaba Cadabra - Juego Educativo</p>
                <p><strong>Desarrollador:</strong> Equipo Matriculaba Cadabra</p>
              </div>
            </div>
          </section>

          <div className="border-t pt-6 mt-8">
            <p className="text-center text-gray-600 kids-text">
              <strong>Matriculaba Cadabra</strong> - Un juego educativo seguro y divertido para niños
            </p>
            <p className="text-center text-sm text-gray-500 mt-2">
              Con anuncios apropiados y compatibles con COPPA/GDPR
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
