import React, { useEffect, useRef } from 'react';
import { ArrowLeft, Shield, Eye, Lock, Users, FileText, Phone, Mail, MapPin, Clock, CheckCircle, XCircle } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PrivacyPolicyPage: React.FC = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Animaciones de entrada
    const tl = gsap.timeline();

    gsap.set([headerRef.current, contentRef.current], {
      opacity: 0,
      y: 30
    });

    tl.to(headerRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out"
    })
    .to(contentRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.4");

    // Animaciones de scroll para las tarjetas
    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(card, 
          {
            opacity: 0,
            y: 50,
            scale: 0.95
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleBack = () => {
    window.history.back();
  };

  const PolicyCard = ({ 
    icon, 
    title, 
    children, 
    gradient = "from-blue-50 to-indigo-50",
    borderColor = "border-blue-200",
    index 
  }: { 
    icon: React.ReactNode; 
    title: string; 
    children: React.ReactNode;
    gradient?: string;
    borderColor?: string;
    index: number;
  }) => (
    <div 
      ref={el => cardsRef.current[index] = el}
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${gradient} border ${borderColor} p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]`}
    >
      <div className="flex items-start space-x-4 mb-6">
        <div className="flex-shrink-0 w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-md">
          {icon}
        </div>
        <h3 className="text-2xl font-bold text-gray-800 leading-tight">{title}</h3>
      </div>
      <div className="text-gray-700 leading-relaxed space-y-4">
        {children}
      </div>
    </div>
  );

  const InfoItem = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
    <div className="flex items-center space-x-3 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg flex items-center justify-center">
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-600">{label}</p>
        <p className="text-gray-800 font-semibold">{value}</p>
      </div>
    </div>
  );

  const GuaranteeItem = ({ icon, text, positive = true }: { icon: React.ReactNode; text: string; positive?: boolean }) => (
    <div className={`flex items-center space-x-3 p-4 rounded-xl ${positive ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${positive ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
        {icon}
      </div>
      <p className={`font-medium ${positive ? 'text-green-800' : 'text-red-800'}`}>{text}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      {/* Header con diseño moderno */}
      <div 
        ref={headerRef}
        className="relative bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 text-white overflow-hidden"
      >
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent"></div>
        
        <div className="relative max-w-6xl mx-auto px-6 py-12">
          <button
            onClick={handleBack}
            className="group flex items-center space-x-2 mb-8 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all duration-300"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Volver</span>
          </button>

          <div className="text-center space-y-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl shadow-2xl mb-6">
              <Shield size={40} className="text-white" />
            </div>
            
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                Política de Privacidad
              </h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                En <span className="font-heavyrust-primary text-orange-300">PARRILLEROS FAST FOOD</span> protegemos tu información personal con los más altos estándares de seguridad y transparencia.
              </p>
            </div>

            <div className="inline-flex items-center space-x-2 px-6 py-3 bg-green-500/20 backdrop-blur-sm rounded-full border border-green-400/30">
              <CheckCircle size={20} className="text-green-300" />
              <span className="text-green-200 font-medium">Última actualización: Enero 2025</span>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido principal con diseño fluido */}
      <div ref={contentRef} className="max-w-6xl mx-auto px-6 py-16 space-y-12">
        
        {/* Información de contacto destacada */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-8 text-white shadow-2xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Responsable del Tratamiento</h2>
            <p className="text-orange-100 text-lg">Toda consulta sobre el manejo de tus datos puede ser dirigida a:</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <InfoItem 
              icon={<Users className="text-orange-500" size={20} />}
              label="Empresa"
              value="PARRILLEROS FAST FOOD"
            />
            <InfoItem 
              icon={<Phone className="text-orange-500" size={20} />}
              label="Teléfono"
              value="(+57) 301 222 2098"
            />
            <InfoItem 
              icon={<Mail className="text-orange-500" size={20} />}
              label="Email"
              value="privacidad@parrilleros.com"
            />
          </div>
        </div>

        {/* Grid de políticas principales */}
        <div className="grid lg:grid-cols-2 gap-8">
          
          <PolicyCard
            icon={<Eye className="text-blue-600" size={24} />}
            title="¿Qué datos recopilamos?"
            gradient="from-blue-50 to-cyan-50"
            borderColor="border-blue-200"
            index={0}
          >
            <p className="text-lg font-medium text-blue-900 mb-4">Únicamente recopilamos la información necesaria para procesar tu pedido:</p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span><strong>Datos personales:</strong> Nombre completo y número de cédula (solo si requiere factura)</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span><strong>Información de contacto:</strong> Número de teléfono y correo electrónico</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span><strong>Dirección de entrega:</strong> Dirección completa y barrio para el domicilio</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span><strong>Información del pedido:</strong> Productos seleccionados y preferencias</span>
              </div>
            </div>
          </PolicyCard>

          <PolicyCard
            icon={<Lock className="text-green-600" size={24} />}
            title="¿Cómo usamos tus datos?"
            gradient="from-green-50 to-emerald-50"
            borderColor="border-green-200"
            index={1}
          >
            <p className="text-lg font-medium text-green-900 mb-4">Tus datos tienen un propósito específico y limitado:</p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span><strong>Procesamiento del pedido:</strong> Preparar y confirmar tu orden</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span><strong>Entrega a domicilio:</strong> Coordinar la entrega en tu dirección</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span><strong>Comunicación:</strong> Contactarte sobre el estado de tu pedido</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span><strong>Facturación:</strong> Generar factura cuando sea solicitada</span>
              </div>
            </div>
          </PolicyCard>

          <PolicyCard
            icon={<Shield className="text-purple-600" size={24} />}
            title="Seguridad y Protección"
            gradient="from-purple-50 to-violet-50"
            borderColor="border-purple-200"
            index={2}
          >
            <p className="text-lg font-medium text-purple-900 mb-4">Implementamos medidas de seguridad robustas:</p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span><strong>Encriptación:</strong> Todos los datos se transmiten de forma segura</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span><strong>Acceso limitado:</strong> Solo personal autorizado maneja tu información</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span><strong>Almacenamiento seguro:</strong> Sistemas protegidos contra accesos no autorizados</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span><strong>Eliminación automática:</strong> Los datos se eliminan tras completar el servicio</span>
              </div>
            </div>
          </PolicyCard>

          <PolicyCard
            icon={<FileText className="text-indigo-600" size={24} />}
            title="Tus Derechos"
            gradient="from-indigo-50 to-blue-50"
            borderColor="border-indigo-200"
            index={3}
          >
            <p className="text-lg font-medium text-indigo-900 mb-4">Tienes control total sobre tu información personal:</p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                <span><strong>Acceso:</strong> Conocer qué datos tenemos sobre ti</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                <span><strong>Rectificación:</strong> Corregir información incorrecta</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                <span><strong>Eliminación:</strong> Solicitar la eliminación de tus datos</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                <span><strong>Oposición:</strong> Oponerte al tratamiento de tus datos</span>
              </div>
            </div>
          </PolicyCard>
        </div>

        {/* Garantías y compromisos */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Nuestros Compromisos Contigo</h2>
            <p className="text-gray-600 text-lg">Lo que SÍ hacemos y lo que NUNCA haremos con tu información</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-green-800 mb-6 flex items-center">
                <CheckCircle className="mr-2" size={24} />
                Lo que SÍ hacemos
              </h3>
              <div className="space-y-4">
                <GuaranteeItem 
                  icon={<CheckCircle size={16} />}
                  text="Proteger tu información con tecnología de seguridad avanzada"
                  positive={true}
                />
                <GuaranteeItem 
                  icon={<CheckCircle size={16} />}
                  text="Usar tus datos únicamente para procesar tu pedido"
                  positive={true}
                />
                <GuaranteeItem 
                  icon={<CheckCircle size={16} />}
                  text="Eliminar tu información después de completar el servicio"
                  positive={true}
                />
                <GuaranteeItem 
                  icon={<CheckCircle size={16} />}
                  text="Respetar todos tus derechos de privacidad"
                  positive={true}
                />
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-red-800 mb-6 flex items-center">
                <XCircle className="mr-2" size={24} />
                Lo que NUNCA haremos
              </h3>
              <div className="space-y-4">
                <GuaranteeItem 
                  icon={<XCircle size={16} />}
                  text="Vender tu información a terceros"
                  positive={false}
                />
                <GuaranteeItem 
                  icon={<XCircle size={16} />}
                  text="Usar tus datos para marketing no autorizado"
                  positive={false}
                />
                <GuaranteeItem 
                  icon={<XCircle size={16} />}
                  text="Compartir tu información sin tu consentimiento"
                  positive={false}
                />
                <GuaranteeItem 
                  icon={<XCircle size={16} />}
                  text="Almacenar datos innecesarios o por tiempo indefinido"
                  positive={false}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Información de contacto y tiempo */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <Phone className="mr-3" size={28} />
              ¿Tienes preguntas?
            </h3>
            <p className="text-blue-100 mb-6 text-lg">
              Estamos aquí para resolver cualquier duda sobre el manejo de tu información personal.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="text-blue-300" size={20} />
                <span className="text-blue-100">privacidad@parrilleros.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="text-blue-300" size={20} />
                <span className="text-blue-100">(+57) 301 222 2098</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="text-blue-300" size={20} />
                <span className="text-blue-100">Todas nuestras sedes</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <Clock className="mr-3" size={28} />
              Tiempo de Respuesta
            </h3>
            <p className="text-orange-100 mb-6 text-lg">
              Nos comprometemos a responder tus consultas sobre privacidad de manera rápida y efectiva.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-orange-300 rounded-full"></div>
                <span className="text-orange-100"><strong>Consultas generales:</strong> 24-48 horas</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-orange-300 rounded-full"></div>
                <span className="text-orange-100"><strong>Solicitudes de derechos:</strong> 5-10 días hábiles</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-orange-300 rounded-full"></div>
                <span className="text-orange-100"><strong>Emergencias de seguridad:</strong> Inmediato</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer con compromiso final */}
        <div className="text-center bg-gradient-to-r from-gray-800 to-gray-900 rounded-3xl p-12 text-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Nuestro Compromiso Final</h2>
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              En <span className="font-heavyrust-primary text-orange-400">PARRILLEROS FAST FOOD</span>, 
              entendemos que tu confianza es el ingrediente más importante de nuestro servicio. 
              Por eso, nos comprometemos a proteger tu privacidad con la misma dedicación 
              que ponemos en preparar tus hamburguesas favoritas.
            </p>
            <div className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full">
              <Shield size={24} />
              <span className="font-bold text-lg">Tu privacidad, nuestra prioridad</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;