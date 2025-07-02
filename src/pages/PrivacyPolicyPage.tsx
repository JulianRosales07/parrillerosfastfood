import React from 'react';
import { ArrowLeft, Shield, Eye, Lock, Users, FileText, Phone, Mail, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicyPage: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50">
      {/* Header */}
      <div className="bg-white shadow-lg border-b-4 border-[#FF8C00]">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center mb-4">
            <button
              onClick={handleBack}
              className="mr-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="flex items-center">
              <Shield size={32} className="mr-3 text-[#FF8C00]" />
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Política de Tratamiento de Datos Personales</h1>
                <p className="text-gray-600">
                  <span className="font-heavyrust-primary text-[#FF8C00]">PARRILLEROS</span> 
                  <span className="font-bebas-neue-primary ml-2">FAST FOOD</span>
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-[#FF8C00] text-white px-4 py-3 rounded-lg">
            <p className="text-sm">
              <strong>Última actualización:</strong> Enero 2025 | 
              <strong className="ml-4">Vigencia:</strong> Indefinida
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          
          {/* Introduction */}
          <div className="bg-gradient-to-r from-[#FF8C00] to-orange-600 text-white p-8">
            <div className="flex items-center mb-4">
              <Eye size={28} className="mr-3" />
              <h2 className="text-2xl font-bold">Transparencia en el Manejo de tus Datos</h2>
            </div>
            <p className="text-lg leading-relaxed">
              En <strong className="font-heavyrust-primary">PARRILLEROS FAST FOOD</strong>, respetamos tu privacidad y nos comprometemos a proteger tus datos personales. Esta política explica de manera clara y sencilla cómo utilizamos tu información únicamente para procesar tu pedido y brindarte el mejor servicio.
            </p>
          </div>

          <div className="p-8 space-y-8">
            
            {/* Section 1: Data Collection */}
            <section className="border-l-4 border-[#FF8C00] pl-6">
              <div className="flex items-center mb-4">
                <Users size={24} className="mr-3 text-[#FF8C00]" />
                <h3 className="text-xl font-bold text-gray-800">1. ¿Qué datos recopilamos?</h3>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-700 mb-4">
                  Únicamente recopilamos los datos necesarios para procesar tu pedido a domicilio:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-800 mb-2">📋 Datos Básicos</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Nombre completo</li>
                      <li>• Número de celular</li>
                      <li>• Dirección de entrega</li>
                      <li>• Barrio</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-800 mb-2">🧾 Datos de Facturación (Opcional)</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Número de cédula</li>
                      <li>• Correo electrónico</li>
                      <li>• Solo si solicitas factura</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 2: Purpose */}
            <section className="border-l-4 border-blue-500 pl-6">
              <div className="flex items-center mb-4">
                <FileText size={24} className="mr-3 text-blue-500" />
                <h3 className="text-xl font-bold text-gray-800">2. ¿Para qué utilizamos tus datos?</h3>
              </div>
              <div className="bg-blue-50 rounded-lg p-6">
                <p className="text-gray-700 mb-4 font-medium">
                  Tus datos tienen un único propósito: <strong>procesar tu pedido de comida a domicilio</strong>
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg text-center">
                    <Phone size={32} className="mx-auto mb-2 text-blue-500" />
                    <h4 className="font-semibold text-gray-800 mb-1">Contactarte</h4>
                    <p className="text-xs text-gray-600">Para confirmar tu pedido y coordinar la entrega</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg text-center">
                    <MapPin size={32} className="mx-auto mb-2 text-blue-500" />
                    <h4 className="font-semibold text-gray-800 mb-1">Entregar</h4>
                    <p className="text-xs text-gray-600">Para llevar tu pedido a la dirección correcta</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg text-center">
                    <FileText size={32} className="mx-auto mb-2 text-blue-500" />
                    <h4 className="font-semibold text-gray-800 mb-1">Facturar</h4>
                    <p className="text-xs text-gray-600">Solo si solicitas factura a tu nombre</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3: No sharing */}
            <section className="border-l-4 border-green-500 pl-6">
              <div className="flex items-center mb-4">
                <Lock size={24} className="mr-3 text-green-500" />
                <h3 className="text-xl font-bold text-gray-800">3. Protección y No Compartición</h3>
              </div>
              <div className="bg-green-50 rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-green-800 mb-3 flex items-center">
                      <Shield size={20} className="mr-2" />
                      ✅ Lo que SÍ hacemos
                    </h4>
                    <ul className="text-sm text-green-700 space-y-2">
                      <li>• Proteger tus datos con medidas de seguridad</li>
                      <li>• Usar la información solo para tu pedido</li>
                      <li>• Mantener la confidencialidad</li>
                      <li>• Respetar tus derechos de privacidad</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-800 mb-3 flex items-center">
                      <Shield size={20} className="mr-2" />
                      ❌ Lo que NO hacemos
                    </h4>
                    <ul className="text-sm text-red-700 space-y-2">
                      <li>• No vendemos tu información</li>
                      <li>• No compartimos con terceros</li>
                      <li>• No enviamos publicidad no deseada</li>
                      <li>• No usamos para otros fines</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 4: Rights */}
            <section className="border-l-4 border-purple-500 pl-6">
              <div className="flex items-center mb-4">
                <Users size={24} className="mr-3 text-purple-500" />
                <h3 className="text-xl font-bold text-gray-800">4. Tus Derechos</h3>
              </div>
              <div className="bg-purple-50 rounded-lg p-6">
                <p className="text-gray-700 mb-4">
                  Como titular de los datos, tienes derecho a:
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white p-3 rounded-lg text-center">
                    <div className="text-2xl mb-2">👁️</div>
                    <p className="text-xs font-medium text-gray-800">Conocer</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg text-center">
                    <div className="text-2xl mb-2">✏️</div>
                    <p className="text-xs font-medium text-gray-800">Actualizar</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg text-center">
                    <div className="text-2xl mb-2">🗑️</div>
                    <p className="text-xs font-medium text-gray-800">Eliminar</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg text-center">
                    <div className="text-2xl mb-2">🚫</div>
                    <p className="text-xs font-medium text-gray-800">Revocar</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 5: Contact */}
            <section className="border-l-4 border-[#FF8C00] pl-6">
              <div className="flex items-center mb-4">
                <Mail size={24} className="mr-3 text-[#FF8C00]" />
                <h3 className="text-xl font-bold text-gray-800">5. Contacto y Consultas</h3>
              </div>
              <div className="bg-orange-50 rounded-lg p-6">
                <p className="text-gray-700 mb-4">
                  Si tienes preguntas sobre esta política o quieres ejercer tus derechos, contáctanos:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg border border-orange-200">
                    <h4 className="font-semibold text-gray-800 mb-2 font-heavyrust-primary">Parrilleros Tamasagra</h4>
                    <p className="text-sm text-gray-600">📍 Manzana 9A casa 1 - Tamasagra</p>
                    <p className="text-sm text-gray-600">📱 301 222 2098</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-orange-200">
                    <h4 className="font-semibold text-gray-800 mb-2 font-heavyrust-primary">Parrilleros San Ignacio</h4>
                    <p className="text-sm text-gray-600">📍 Cra 32 # 14 - 84 - San Ignacio</p>
                    <p className="text-sm text-gray-600">📱 316 606 0005</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-orange-200">
                    <h4 className="font-semibold text-gray-800 mb-2 font-heavyrust-primary">Parrilleros Cuadras</h4>
                    <p className="text-sm text-gray-600">📍 Calle 20 # 31C - 38 - Las Cuadras</p>
                    <p className="text-sm text-gray-600">📱 313 341 9733</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 6: Commitment */}
            <section className="bg-gradient-to-r from-[#FF8C00] to-orange-600 text-white rounded-xl p-6">
              <div className="text-center">
                <Shield size={48} className="mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">Nuestro Compromiso</h3>
                <p className="text-lg leading-relaxed">
                  En <strong className="font-heavyrust-primary">PARRILLEROS FAST FOOD</strong> nos comprometemos a usar tus datos personales únicamente para procesar tu pedido y brindarte el mejor servicio de domicilio. Tu confianza es nuestro ingrediente más importante.
                </p>
              </div>
            </section>

          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <button
            onClick={handleBack}
            className="bg-[#FF8C00] text-white px-8 py-3 rounded-lg font-bold hover:bg-orange-600 transition-colors shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
          >
            Volver al Formulario
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;