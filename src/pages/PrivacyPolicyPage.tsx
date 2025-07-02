import React, { useEffect, useRef } from 'react';
import { ArrowLeft, Shield, Eye, Lock, Users, FileText, Phone, Mail, MapPin, Clock, CheckCircle, XCircle, AlertTriangle, Database, Share2, Trash2, Edit, Download, Globe, Building, Calendar, UserCheck, Scale, BookOpen, HelpCircle, Star } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PrivacyPolicyPage: React.FC = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const tableOfContentsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animaciones de entrada
    const tl = gsap.timeline();

    gsap.set([headerRef.current, tableOfContentsRef.current, contentRef.current], {
      opacity: 0,
      y: 30
    });

    tl.to(headerRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out"
    })
    .to(tableOfContentsRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.4")
    .to(contentRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.2");

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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const PolicySection = ({ 
    id,
    icon, 
    title, 
    children, 
    gradient = "from-blue-50 to-indigo-50",
    borderColor = "border-blue-200",
    index 
  }: { 
    id: string;
    icon: React.ReactNode; 
    title: string; 
    children: React.ReactNode;
    gradient?: string;
    borderColor?: string;
    index: number;
  }) => (
    <section 
      id={id}
      ref={el => cardsRef.current[index] = el}
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${gradient} border ${borderColor} p-8 shadow-lg hover:shadow-xl transition-all duration-300 mb-8`}
    >
      <div className="flex items-start space-x-4 mb-6">
        <div className="flex-shrink-0 w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-md">
          {icon}
        </div>
        <h2 className="text-3xl font-bold text-gray-800 leading-tight">{title}</h2>
      </div>
      <div className="text-gray-700 leading-relaxed space-y-6">
        {children}
      </div>
    </section>
  );

  const SubSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="bg-white/60 rounded-xl p-6 border border-white/40 backdrop-blur-sm">
      <h3 className="text-xl font-bold text-gray-800 mb-4">{title}</h3>
      <div className="space-y-3">
        {children}
      </div>
    </div>
  );

  const ListItem = ({ children, highlight = false }: { children: React.ReactNode; highlight?: boolean }) => (
    <div className={`flex items-start space-x-3 p-3 rounded-lg ${highlight ? 'bg-yellow-50 border border-yellow-200' : ''}`}>
      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
      <span className="text-gray-700">{children}</span>
    </div>
  );

  const ImportantNote = ({ children }: { children: React.ReactNode }) => (
    <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-xl">
      <div className="flex items-start space-x-3">
        <AlertTriangle className="text-amber-500 flex-shrink-0 mt-1" size={20} />
        <div className="text-amber-800">
          {children}
        </div>
      </div>
    </div>
  );

  const LegalArticle = ({ number, title, content }: { number: string; title: string; content: React.ReactNode }) => (
    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
      <div className="flex items-start space-x-4 mb-4">
        <div className="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold">
          {number}
        </div>
        <h4 className="text-lg font-bold text-gray-800">{title}</h4>
      </div>
      <div className="ml-14 text-gray-700 space-y-3">
        {content}
      </div>
    </div>
  );

  const ContactCard = ({ icon, title, value, description }: { icon: React.ReactNode; title: string; value: string; description: string }) => (
    <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-center space-x-3 mb-3">
        <div className="w-10 h-10 bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg flex items-center justify-center">
          {icon}
        </div>
        <h4 className="font-bold text-gray-800">{title}</h4>
      </div>
      <p className="text-lg font-semibold text-gray-900 mb-2">{value}</p>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      {/* Header profesional estilo MercadoLibre */}
      <div 
        ref={headerRef}
        className="relative bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white overflow-hidden"
      >
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-600/20 via-transparent to-purple-600/20"></div>
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/5 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-blue-400/10 rounded-full blur-2xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 py-16">
          <button
            onClick={handleBack}
            className="group flex items-center space-x-2 mb-8 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all duration-300"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Volver</span>
          </button>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl shadow-2xl mb-6">
                <Shield size={40} className="text-white" />
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                Política de Privacidad y Protección de Datos
              </h1>
              <p className="text-xl text-blue-100 leading-relaxed mb-6">
                En <span className="font-heavyrust-primary text-orange-300">PARRILLEROS FAST FOOD</span> nos comprometemos con la protección integral de tu información personal, cumpliendo con la Ley 1581 de 2012 y el Decreto 1377 de 2013.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <div className="inline-flex items-center space-x-2 px-4 py-2 bg-green-500/20 backdrop-blur-sm rounded-full border border-green-400/30">
                  <CheckCircle size={16} className="text-green-300" />
                  <span className="text-green-200 text-sm font-medium">Última actualización: Enero 2025</span>
                </div>
                <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-500/20 backdrop-blur-sm rounded-full border border-blue-400/30">
                  <Scale size={16} className="text-blue-300" />
                  <span className="text-blue-200 text-sm font-medium">Conforme a la Ley 1581 de 2012</span>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold mb-6">Resumen Ejecutivo</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle size={16} className="text-white" />
                  </div>
                  <span>Recopilamos solo datos necesarios para tu pedido</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <Lock size={16} className="text-white" />
                  </div>
                  <span>Protegemos tu información con tecnología avanzada</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                    <Trash2 size={16} className="text-white" />
                  </div>
                  <span>Eliminamos datos tras completar el servicio</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                    <UserCheck size={16} className="text-white" />
                  </div>
                  <span>Respetamos todos tus derechos como titular</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabla de contenidos */}
      <div ref={tableOfContentsRef} className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <BookOpen className="mr-3 text-blue-600" size={28} />
            Tabla de Contenidos
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { id: 'responsable', title: '1. Responsable del Tratamiento', icon: <Building size={16} /> },
              { id: 'definiciones', title: '2. Definiciones', icon: <BookOpen size={16} /> },
              { id: 'datos-recopilados', title: '3. Datos que Recopilamos', icon: <Database size={16} /> },
              { id: 'finalidades', title: '4. Finalidades del Tratamiento', icon: <Eye size={16} /> },
              { id: 'derechos', title: '5. Derechos del Titular', icon: <Scale size={16} /> },
              { id: 'seguridad', title: '6. Medidas de Seguridad', icon: <Shield size={16} /> },
              { id: 'transferencias', title: '7. Transferencias y Transmisiones', icon: <Share2 size={16} /> },
              { id: 'conservacion', title: '8. Conservación de Datos', icon: <Calendar size={16} /> },
              { id: 'menores', title: '9. Tratamiento de Datos de Menores', icon: <Users size={16} /> },
              { id: 'cookies', title: '10. Cookies y Tecnologías', icon: <Globe size={16} /> },
              { id: 'cambios', title: '11. Modificaciones a la Política', icon: <Edit size={16} /> },
              { id: 'contacto', title: '12. Información de Contacto', icon: <Phone size={16} /> }
            ].map((item, index) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="flex items-center space-x-3 p-3 text-left bg-gray-50 hover:bg-blue-50 rounded-lg transition-colors group"
              >
                <div className="text-blue-600 group-hover:text-blue-700">
                  {item.icon}
                </div>
                <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700">
                  {item.title}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div ref={contentRef} className="max-w-7xl mx-auto px-6 pb-16 space-y-12">
        
        {/* 1. Responsable del Tratamiento */}
        <PolicySection
          id="responsable"
          icon={<Building className="text-blue-600" size={24} />}
          title="1. Responsable del Tratamiento de Datos Personales"
          gradient="from-blue-50 to-cyan-50"
          borderColor="border-blue-200"
          index={0}
        >
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white mb-6">
            <h3 className="text-2xl font-bold mb-6">Información de la Empresa</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <ContactCard 
                icon={<Building className="text-blue-600" size={20} />}
                title="Razón Social"
                value="PARRILLEROS FAST FOOD S.A.S."
                description="Empresa dedicada al servicio de comidas rápidas"
              />
              <ContactCard 
                icon={<FileText className="text-blue-600" size={20} />}
                title="NIT"
                value="900.123.456-7"
                description="Número de identificación tributaria"
              />
              <ContactCard 
                icon={<MapPin className="text-blue-600" size={20} />}
                title="Domicilio Principal"
                value="Pasto, Nariño, Colombia"
                description="Sede principal de operaciones"
              />
              <ContactCard 
                icon={<Mail className="text-blue-600" size={20} />}
                title="Email Institucional"
                value="info@parrilleros.com"
                description="Correo electrónico oficial"
              />
            </div>
          </div>

          <SubSection title="Datos del Oficial de Protección de Datos">
            <ListItem>
              <strong>Nombre:</strong> Departamento de Protección de Datos PARRILLEROS
            </ListItem>
            <ListItem>
              <strong>Email:</strong> privacidad@parrilleros.com
            </ListItem>
            <ListItem>
              <strong>Teléfono:</strong> (+57) 301 222 2098
            </ListItem>
            <ListItem>
              <strong>Horario de atención:</strong> Lunes a viernes de 8:00 AM a 6:00 PM
            </ListItem>
          </SubSection>

          <ImportantNote>
            <p className="font-semibold mb-2">Importante:</p>
            <p>PARRILLEROS FAST FOOD actúa como responsable del tratamiento de todos los datos personales recopilados a través de nuestros canales de atención, plataformas digitales y puntos de venta físicos.</p>
          </ImportantNote>
        </PolicySection>

        {/* 2. Definiciones */}
        <PolicySection
          id="definiciones"
          icon={<BookOpen className="text-purple-600" size={24} />}
          title="2. Definiciones y Conceptos Fundamentales"
          gradient="from-purple-50 to-violet-50"
          borderColor="border-purple-200"
          index={1}
        >
          <p className="text-lg font-medium text-purple-900 mb-6">
            Para efectos de esta política, se entiende por:
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <LegalArticle
              number="A"
              title="Dato Personal"
              content={
                <p>Cualquier información vinculada o que pueda asociarse a una o varias personas naturales determinadas o determinables.</p>
              }
            />
            <LegalArticle
              number="B"
              title="Titular"
              content={
                <p>Persona natural cuyos datos personales sean objeto de tratamiento por parte de PARRILLEROS FAST FOOD.</p>
              }
            />
            <LegalArticle
              number="C"
              title="Tratamiento"
              content={
                <p>Cualquier operación o conjunto de operaciones sobre datos personales, tales como la recolección, almacenamiento, uso, circulación o supresión.</p>
              }
            />
            <LegalArticle
              number="D"
              title="Responsable"
              content={
                <p>Persona natural o jurídica que por sí misma o en asocio con otros, decida sobre la base de datos y/o el tratamiento de los datos.</p>
              }
            />
            <LegalArticle
              number="E"
              title="Encargado"
              content={
                <p>Persona natural o jurídica que realice el tratamiento de datos personales por cuenta del responsable del tratamiento.</p>
              }
            />
            <LegalArticle
              number="F"
              title="Autorización"
              content={
                <p>Consentimiento previo, expreso e informado del titular para llevar a cabo el tratamiento de datos personales.</p>
              }
            />
          </div>
        </PolicySection>

        {/* 3. Datos que Recopilamos */}
        <PolicySection
          id="datos-recopilados"
          icon={<Database className="text-green-600" size={24} />}
          title="3. Tipos de Datos Personales que Recopilamos"
          gradient="from-green-50 to-emerald-50"
          borderColor="border-green-200"
          index={2}
        >
          <p className="text-lg font-medium text-green-900 mb-6">
            PARRILLEROS FAST FOOD recopila únicamente los datos personales necesarios para brindar nuestros servicios de manera eficiente y segura:
          </p>

          <div className="space-y-6">
            <SubSection title="3.1 Datos de Identificación">
              <ListItem><strong>Nombre completo:</strong> Para identificar al titular del pedido</ListItem>
              <ListItem><strong>Número de cédula:</strong> Solo cuando se requiere facturación</ListItem>
              <ListItem><strong>Fecha de nacimiento:</strong> Para verificación de mayoría de edad cuando sea necesario</ListItem>
            </SubSection>

            <SubSection title="3.2 Datos de Contacto">
              <ListItem><strong>Número de teléfono móvil:</strong> Para coordinar la entrega y confirmar pedidos</ListItem>
              <ListItem><strong>Correo electrónico:</strong> Para envío de confirmaciones y facturas electrónicas</ListItem>
              <ListItem><strong>Dirección de entrega:</strong> Dirección completa, barrio y referencias para domicilios</ListItem>
            </SubSection>

            <SubSection title="3.3 Datos del Pedido">
              <ListItem><strong>Productos seleccionados:</strong> Hamburguesas, bebidas y acompañamientos</ListItem>
              <ListItem><strong>Personalizaciones:</strong> Ingredientes adicionales o modificaciones</ListItem>
              <ListItem><strong>Instrucciones especiales:</strong> Comentarios sobre preparación o entrega</ListItem>
              <ListItem><strong>Método de pago preferido:</strong> Efectivo, transferencia o tarjeta</ListItem>
            </SubSection>

            <SubSection title="3.4 Datos Técnicos (Cuando Aplique)">
              <ListItem><strong>Dirección IP:</strong> Para seguridad y prevención de fraudes</ListItem>
              <ListItem><strong>Información del dispositivo:</strong> Tipo de dispositivo y navegador utilizado</ListItem>
              <ListItem><strong>Cookies:</strong> Para mejorar la experiencia de usuario en plataformas digitales</ListItem>
            </SubSection>
          </div>

          <ImportantNote>
            <p className="font-semibold mb-2">Principio de Minimización:</p>
            <p>Solo recopilamos los datos estrictamente necesarios para cumplir con las finalidades declaradas. No solicitamos información adicional que no sea relevante para nuestros servicios.</p>
          </ImportantNote>
        </PolicySection>

        {/* 4. Finalidades del Tratamiento */}
        <PolicySection
          id="finalidades"
          icon={<Eye className="text-indigo-600" size={24} />}
          title="4. Finalidades del Tratamiento de Datos Personales"
          gradient="from-indigo-50 to-blue-50"
          borderColor="border-indigo-200"
          index={3}
        >
          <p className="text-lg font-medium text-indigo-900 mb-6">
            Los datos personales recopilados por PARRILLEROS FAST FOOD son tratados exclusivamente para las siguientes finalidades:
          </p>

          <div className="space-y-6">
            <SubSection title="4.1 Finalidades Principales">
              <ListItem highlight><strong>Procesamiento de pedidos:</strong> Recibir, confirmar y preparar los productos solicitados</ListItem>
              <ListItem highlight><strong>Entrega a domicilio:</strong> Coordinar y ejecutar la entrega en la dirección indicada</ListItem>
              <ListItem highlight><strong>Comunicación directa:</strong> Contactar al cliente sobre el estado del pedido</ListItem>
              <ListItem highlight><strong>Facturación:</strong> Generar facturas de venta cuando sean requeridas</ListItem>
            </SubSection>

            <SubSection title="4.2 Finalidades Secundarias">
              <ListItem><strong>Atención al cliente:</strong> Resolver consultas, quejas y reclamos</ListItem>
              <ListItem><strong>Mejora del servicio:</strong> Analizar patrones de consumo para optimizar nuestros procesos</ListItem>
              <ListItem><strong>Cumplimiento legal:</strong> Satisfacer obligaciones tributarias y comerciales</ListItem>
              <ListItem><strong>Seguridad:</strong> Prevenir fraudes y garantizar la seguridad de las transacciones</ListItem>
            </SubSection>

            <SubSection title="4.3 Finalidades Opcionales (Con Autorización Expresa)">
              <ListItem><strong>Marketing directo:</strong> Envío de promociones y ofertas especiales</ListItem>
              <ListItem><strong>Programas de fidelización:</strong> Participación en programas de puntos y descuentos</ListItem>
              <ListItem><strong>Encuestas de satisfacción:</strong> Evaluación de la calidad del servicio</ListItem>
            </SubSection>
          </div>

          <div className="bg-blue-100 border border-blue-300 rounded-xl p-6">
            <h4 className="font-bold text-blue-900 mb-3 flex items-center">
              <CheckCircle className="mr-2" size={20} />
              Compromiso de Proporcionalidad
            </h4>
            <p className="text-blue-800">
              El tratamiento de datos personales se realizará de manera proporcional a las finalidades que lo justifican, 
              garantizando que no se utilicen para propósitos diferentes a los autorizados expresamente por el titular.
            </p>
          </div>
        </PolicySection>

        {/* 5. Derechos del Titular */}
        <PolicySection
          id="derechos"
          icon={<Scale className="text-red-600" size={24} />}
          title="5. Derechos del Titular de los Datos Personales"
          gradient="from-red-50 to-pink-50"
          borderColor="border-red-200"
          index={4}
        >
          <p className="text-lg font-medium text-red-900 mb-6">
            Como titular de datos personales, usted tiene los siguientes derechos fundamentales:
          </p>

          <div className="space-y-6">
            <SubSection title="5.1 Derecho de Acceso">
              <ListItem><strong>Conocer:</strong> Qué datos personales tenemos sobre usted</ListItem>
              <ListItem><strong>Consultar:</strong> El uso que se ha dado a sus datos personales</ListItem>
              <ListItem><strong>Solicitar:</strong> Copia de sus datos personales en nuestras bases de datos</ListItem>
            </SubSection>

            <SubSection title="5.2 Derecho de Rectificación">
              <ListItem><strong>Actualizar:</strong> Datos personales que estén incompletos o desactualizados</ListItem>
              <ListItem><strong>Corregir:</strong> Información que sea inexacta o errónea</ListItem>
              <ListItem><strong>Modificar:</strong> Datos que hayan cambiado con el tiempo</ListItem>
            </SubSection>

            <SubSection title="5.3 Derecho de Supresión">
              <ListItem><strong>Eliminar:</strong> Sus datos cuando no sean necesarios para las finalidades</ListItem>
              <ListItem><strong>Cancelar:</strong> El tratamiento cuando no exista autorización</ListItem>
              <ListItem><strong>Suprimir:</strong> Datos tratados de forma ilícita</ListItem>
            </SubSection>

            <SubSection title="5.4 Derecho de Oposición">
              <ListItem><strong>Oponerse:</strong> Al tratamiento de sus datos personales</ListItem>
              <ListItem><strong>Revocar:</strong> La autorización otorgada previamente</ListItem>
              <ListItem><strong>Limitar:</strong> El uso de sus datos para finalidades específicas</ListItem>
            </SubSection>
          </div>

          <div className="bg-gradient-to-r from-red-600 to-pink-600 rounded-2xl p-8 text-white">
            <h4 className="text-2xl font-bold mb-4 flex items-center">
              <HelpCircle className="mr-3" size={28} />
              ¿Cómo Ejercer sus Derechos?
            </h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-bold mb-3">Canales Disponibles:</h5>
                <ul className="space-y-2">
                  <li className="flex items-center space-x-2">
                    <Mail size={16} />
                    <span>privacidad@parrilleros.com</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Phone size={16} />
                    <span>(+57) 301 222 2098</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <MapPin size={16} />
                    <span>Cualquiera de nuestras sedes</span>
                  </li>
                </ul>
              </div>
              <div>
                <h5 className="font-bold mb-3">Tiempos de Respuesta:</h5>
                <ul className="space-y-2">
                  <li>• Consultas: Máximo 10 días hábiles</li>
                  <li>• Reclamos: Máximo 15 días hábiles</li>
                  <li>• Casos complejos: Máximo 8 días adicionales</li>
                </ul>
              </div>
            </div>
          </div>
        </PolicySection>

        {/* 6. Medidas de Seguridad */}
        <PolicySection
          id="seguridad"
          icon={<Shield className="text-cyan-600" size={24} />}
          title="6. Medidas de Seguridad y Protección"
          gradient="from-cyan-50 to-blue-50"
          borderColor="border-cyan-200"
          index={5}
        >
          <p className="text-lg font-medium text-cyan-900 mb-6">
            PARRILLEROS FAST FOOD implementa medidas técnicas, administrativas y físicas para proteger sus datos personales:
          </p>

          <div className="space-y-6">
            <SubSection title="6.1 Medidas Técnicas">
              <ListItem><strong>Encriptación:</strong> Todos los datos se transmiten usando protocolos SSL/TLS</ListItem>
              <ListItem><strong>Firewalls:</strong> Sistemas de protección contra accesos no autorizados</ListItem>
              <ListItem><strong>Copias de seguridad:</strong> Respaldos automáticos y seguros de la información</ListItem>
              <ListItem><strong>Monitoreo continuo:</strong> Vigilancia 24/7 de nuestros sistemas</ListItem>
            </SubSection>

            <SubSection title="6.2 Medidas Administrativas">
              <ListItem><strong>Capacitación del personal:</strong> Formación continua en protección de datos</ListItem>
              <ListItem><strong>Políticas internas:</strong> Procedimientos claros para el manejo de información</ListItem>
              <ListItem><strong>Controles de acceso:</strong> Solo personal autorizado puede acceder a los datos</ListItem>
              <ListItem><strong>Auditorías regulares:</strong> Revisiones periódicas de nuestros procesos</ListItem>
            </SubSection>

            <SubSection title="6.3 Medidas Físicas">
              <ListItem><strong>Acceso restringido:</strong> Áreas seguras para servidores y equipos</ListItem>
              <ListItem><strong>Sistemas de vigilancia:</strong> Cámaras y controles de seguridad</ListItem>
              <ListItem><strong>Control de visitantes:</strong> Registro y acompañamiento de personas externas</ListItem>
              <ListItem><strong>Destrucción segura:</strong> Eliminación adecuada de documentos físicos</ListItem>
            </SubSection>
          </div>

          <div className="bg-gradient-to-r from-cyan-100 to-blue-100 border border-cyan-300 rounded-xl p-6">
            <h4 className="font-bold text-cyan-900 mb-3 flex items-center">
              <Star className="mr-2 text-yellow-500" size={20} />
              Certificaciones y Estándares
            </h4>
            <p className="text-cyan-800 mb-3">
              Nuestras medidas de seguridad están alineadas con estándares internacionales y mejores prácticas de la industria:
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-3 text-center">
                <p className="font-semibold text-cyan-900">ISO 27001</p>
                <p className="text-sm text-cyan-700">Gestión de Seguridad</p>
              </div>
              <div className="bg-white rounded-lg p-3 text-center">
                <p className="font-semibold text-cyan-900">Ley 1581/2012</p>
                <p className="text-sm text-cyan-700">Habeas Data</p>
              </div>
              <div className="bg-white rounded-lg p-3 text-center">
                <p className="font-semibold text-cyan-900">GDPR Inspired</p>
                <p className="text-sm text-cyan-700">Mejores Prácticas</p>
              </div>
            </div>
          </div>
        </PolicySection>

        {/* 7. Transferencias y Transmisiones */}
        <PolicySection
          id="transferencias"
          icon={<Share2 className="text-orange-600" size={24} />}
          title="7. Transferencias y Transmisiones de Datos"
          gradient="from-orange-50 to-red-50"
          borderColor="border-orange-200"
          index={6}
        >
          <p className="text-lg font-medium text-orange-900 mb-6">
            PARRILLEROS FAST FOOD puede compartir sus datos personales únicamente en las siguientes circunstancias:
          </p>

          <div className="space-y-6">
            <SubSection title="7.1 Transferencias Autorizadas">
              <ListItem><strong>Proveedores de servicios:</strong> Empresas de domicilios y procesamiento de pagos</ListItem>
              <ListItem><strong>Autoridades competentes:</strong> Cuando sea requerido por ley</ListItem>
              <ListItem><strong>Socios comerciales:</strong> Solo con autorización expresa del titular</ListItem>
            </SubSection>

            <SubSection title="7.2 Garantías para Terceros">
              <ListItem><strong>Contratos de confidencialidad:</strong> Todos los terceros firman acuerdos de protección</ListItem>
              <ListItem><strong>Mismas medidas de seguridad:</strong> Exigimos estándares equivalentes de protección</ListItem>
              <ListItem><strong>Limitación de uso:</strong> Los datos solo pueden usarse para fines específicos</ListItem>
            </SubSection>

            <SubSection title="7.3 Transferencias Internacionales">
              <ListItem><strong>Países con nivel adecuado:</strong> Solo a países con protección equivalente</ListItem>
              <ListItem><strong>Cláusulas contractuales:</strong> Garantías adicionales en contratos internacionales</ListItem>
              <ListItem><strong>Autorización previa:</strong> Consentimiento específico para transferencias internacionales</ListItem>
            </SubSection>
          </div>

          <ImportantNote>
            <p className="font-semibold mb-2">Compromiso de No Venta:</p>
            <p>PARRILLEROS FAST FOOD NUNCA vende, alquila o comercializa sus datos personales con terceros para fines comerciales no relacionados con nuestros servicios.</p>
          </ImportantNote>
        </PolicySection>

        {/* 8. Conservación de Datos */}
        <PolicySection
          id="conservacion"
          icon={<Calendar className="text-teal-600" size={24} />}
          title="8. Política de Conservación y Eliminación de Datos"
          gradient="from-teal-50 to-cyan-50"
          borderColor="border-teal-200"
          index={7}
        >
          <p className="text-lg font-medium text-teal-900 mb-6">
            Los datos personales se conservan únicamente durante el tiempo necesario para cumplir con las finalidades del tratamiento:
          </p>

          <div className="space-y-6">
            <SubSection title="8.1 Períodos de Conservación">
              <ListItem><strong>Datos de pedidos activos:</strong> Durante el proceso de entrega y hasta 30 días después</ListItem>
              <ListItem><strong>Datos de facturación:</strong> 5 años según obligaciones tributarias</ListItem>
              <ListItem><strong>Datos de marketing:</strong> Hasta que el titular revoque su autorización</ListItem>
              <ListItem><strong>Datos de reclamos:</strong> 3 años desde la resolución del caso</ListItem>
            </SubSection>

            <SubSection title="8.2 Proceso de Eliminación">
              <ListItem><strong>Eliminación automática:</strong> Sistemas programados para borrar datos vencidos</ListItem>
              <ListItem><strong>Eliminación segura:</strong> Métodos que impiden la recuperación de información</ListItem>
              <ListItem><strong>Certificación de eliminación:</strong> Documentación del proceso de supresión</ListItem>
              <ListItem><strong>Notificación a terceros:</strong> Informamos a encargados sobre la eliminación</ListItem>
            </SubSection>

            <SubSection title="8.3 Excepciones Legales">
              <ListItem><strong>Obligaciones legales:</strong> Conservación requerida por ley</ListItem>
              <ListItem><strong>Procesos judiciales:</strong> Datos necesarios para procedimientos legales</ListItem>
              <ListItem><strong>Investigaciones:</strong> Información relevante para investigaciones oficiales</ListItem>
            </SubSection>
          </div>

          <div className="bg-teal-100 border border-teal-300 rounded-xl p-6">
            <h4 className="font-bold text-teal-900 mb-3 flex items-center">
              <Clock className="mr-2" size={20} />
              Cronograma de Revisión
            </h4>
            <p className="text-teal-800 mb-3">
              Realizamos revisiones periódicas para garantizar el cumplimiento de nuestros períodos de conservación:
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-3">
                <p className="font-semibold text-teal-900">Mensual</p>
                <p className="text-sm text-teal-700">Datos de pedidos completados</p>
              </div>
              <div className="bg-white rounded-lg p-3">
                <p className="font-semibold text-teal-900">Trimestral</p>
                <p className="text-sm text-teal-700">Datos de marketing y promociones</p>
              </div>
              <div className="bg-white rounded-lg p-3">
                <p className="font-semibold text-teal-900">Anual</p>
                <p className="text-sm text-teal-700">Revisión general de todas las bases</p>
              </div>
            </div>
          </div>
        </PolicySection>

        {/* 9. Tratamiento de Datos de Menores */}
        <PolicySection
          id="menores"
          icon={<Users className="text-pink-600" size={24} />}
          title="9. Protección Especial de Datos de Menores de Edad"
          gradient="from-pink-50 to-rose-50"
          borderColor="border-pink-200"
          index={8}
        >
          <p className="text-lg font-medium text-pink-900 mb-6">
            PARRILLEROS FAST FOOD otorga protección especial a los datos de menores de edad:
          </p>

          <div className="space-y-6">
            <SubSection title="9.1 Política General">
              <ListItem><strong>No recopilación directa:</strong> No solicitamos datos directamente a menores de 18 años</ListItem>
              <ListItem><strong>Autorización de padres:</strong> Requerimos consentimiento de padres o tutores legales</ListItem>
              <ListItem><strong>Verificación de edad:</strong> Implementamos mecanismos para verificar la mayoría de edad</ListItem>
              <ListItem><strong>Protección reforzada:</strong> Medidas adicionales de seguridad para datos de menores</ListItem>
            </SubSection>

            <SubSection title="9.2 Procedimientos Especiales">
              <ListItem><strong>Consentimiento informado:</strong> Explicación clara y comprensible para padres/tutores</ListItem>
              <ListItem><strong>Limitación de finalidades:</strong> Solo para servicios específicamente autorizados</ListItem>
              <ListItem><strong>Eliminación prioritaria:</strong> Supresión inmediata cuando se solicite</ListItem>
              <ListItem><strong>Acceso restringido:</strong> Personal especialmente capacitado para estos casos</ListItem>
            </SubSection>

            <SubSection title="9.3 Derechos Especiales">
              <ListItem><strong>Derecho de los padres:</strong> Control total sobre los datos de sus hijos menores</ListItem>
              <ListItem><strong>Acceso preferencial:</strong> Atención prioritaria para consultas sobre menores</ListItem>
              <ListItem><strong>Eliminación inmediata:</strong> Supresión sin demora cuando se solicite</ListItem>
            </SubSection>
          </div>

          <ImportantNote>
            <p className="font-semibold mb-2">Compromiso Especial:</p>
            <p>Si detectamos que hemos recopilado datos de un menor sin la autorización adecuada, procederemos inmediatamente a eliminar dicha información y contactaremos a los padres o tutores legales.</p>
          </ImportantNote>
        </PolicySection>

        {/* 10. Cookies y Tecnologías */}
        <PolicySection
          id="cookies"
          icon={<Globe className="text-violet-600" size={24} />}
          title="10. Cookies y Tecnologías de Seguimiento"
          gradient="from-violet-50 to-purple-50"
          borderColor="border-violet-200"
          index={9}
        >
          <p className="text-lg font-medium text-violet-900 mb-6">
            Cuando utiliza nuestras plataformas digitales, podemos usar cookies y tecnologías similares:
          </p>

          <div className="space-y-6">
            <SubSection title="10.1 Tipos de Cookies">
              <ListItem><strong>Cookies esenciales:</strong> Necesarias para el funcionamiento básico del sitio</ListItem>
              <ListItem><strong>Cookies de rendimiento:</strong> Para analizar el uso y mejorar la experiencia</ListItem>
              <ListItem><strong>Cookies de funcionalidad:</strong> Para recordar preferencias del usuario</ListItem>
              <ListItem><strong>Cookies de marketing:</strong> Solo con consentimiento expreso</ListItem>
            </SubSection>

            <SubSection title="10.2 Control de Cookies">
              <ListItem><strong>Configuración del navegador:</strong> Puede desactivar cookies en su navegador</ListItem>
              <ListItem><strong>Herramientas de gestión:</strong> Panel de control en nuestro sitio web</ListItem>
              <ListItem><strong>Cookies de terceros:</strong> Control independiente para servicios externos</ListItem>
            </SubSection>

            <SubSection title="10.3 Otras Tecnologías">
              <ListItem><strong>Web beacons:</strong> Para análisis de uso de correos electrónicos</ListItem>
              <ListItem><strong>Píxeles de seguimiento:</strong> Para medir efectividad de campañas</ListItem>
              <ListItem><strong>Almacenamiento local:</strong> Para mejorar la velocidad de carga</ListItem>
            </SubSection>
          </div>
        </PolicySection>

        {/* 11. Modificaciones a la Política */}
        <PolicySection
          id="cambios"
          icon={<Edit className="text-amber-600" size={24} />}
          title="11. Modificaciones y Actualizaciones"
          gradient="from-amber-50 to-yellow-50"
          borderColor="border-amber-200"
          index={10}
        >
          <p className="text-lg font-medium text-amber-900 mb-6">
            PARRILLEROS FAST FOOD se reserva el derecho de modificar esta política de privacidad:
          </p>

          <div className="space-y-6">
            <SubSection title="11.1 Proceso de Modificación">
              <ListItem><strong>Revisión periódica:</strong> Evaluamos la política al menos una vez al año</ListItem>
              <ListItem><strong>Cambios normativos:</strong> Actualizaciones por nuevas leyes o regulaciones</ListItem>
              <ListItem><strong>Mejoras del servicio:</strong> Modificaciones por nuevos productos o servicios</ListItem>
            </SubSection>

            <SubSection title="11.2 Notificación de Cambios">
              <ListItem><strong>Aviso previo:</strong> Notificación con al menos 30 días de anticipación</ListItem>
              <ListItem><strong>Múltiples canales:</strong> Email, sitio web y puntos de venta</ListItem>
              <ListItem><strong>Resumen de cambios:</strong> Explicación clara de las modificaciones</ListItem>
            </SubSection>

            <SubSection title="11.3 Aceptación de Cambios">
              <ListItem><strong>Consentimiento expreso:</strong> Para cambios sustanciales en el tratamiento</ListItem>
              <ListItem><strong>Derecho de oposición:</strong> Puede rechazar los cambios y solicitar eliminación</ListItem>
              <ListItem><strong>Continuidad del servicio:</strong> Opciones para mantener el servicio con nuevas condiciones</ListItem>
            </SubSection>
          </div>
        </PolicySection>

        {/* 12. Información de Contacto */}
        <PolicySection
          id="contacto"
          icon={<Phone className="text-blue-600" size={24} />}
          title="12. Canales de Atención y Contacto"
          gradient="from-blue-50 to-indigo-50"
          borderColor="border-blue-200"
          index={11}
        >
          <p className="text-lg font-medium text-blue-900 mb-6">
            Para cualquier consulta, solicitud o reclamo relacionado con el tratamiento de sus datos personales:
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <SubSection title="Oficial de Protección de Datos">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Mail className="text-blue-600" size={20} />
                    <span><strong>Email:</strong> privacidad@parrilleros.com</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="text-blue-600" size={20} />
                    <span><strong>Teléfono:</strong> (+57) 301 222 2098</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="text-blue-600" size={20} />
                    <span><strong>Horario:</strong> Lunes a viernes, 8:00 AM - 6:00 PM</span>
                  </div>
                </div>
              </SubSection>

              <SubSection title="Sedes Físicas">
                <ListItem><strong>Parrilleros Tamasagra:</strong> Manzana 9A casa 1 - Tamasagra</ListItem>
                <ListItem><strong>Parrilleros San Ignacio:</strong> Cra 32 # 14 - 84 - San Ignacio</ListItem>
                <ListItem><strong>Parrilleros Cuadras:</strong> Calle 20 # 31C - 38 - Las Cuadras</ListItem>
              </SubSection>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white">
              <h4 className="text-xl font-bold mb-4">Compromisos de Atención</h4>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <CheckCircle size={16} />
                  </div>
                  <div>
                    <p className="font-semibold">Respuesta Inmediata</p>
                    <p className="text-sm text-blue-100">Confirmación de recepción en 24 horas</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <Clock size={16} />
                  </div>
                  <div>
                    <p className="font-semibold">Resolución Oportuna</p>
                    <p className="text-sm text-blue-100">Máximo 15 días hábiles</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <UserCheck size={16} />
                  </div>
                  <div>
                    <p className="font-semibold">Atención Personalizada</p>
                    <p className="text-sm text-blue-100">Seguimiento individual de cada caso</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </PolicySection>

        {/* Footer final con compromiso */}
        <div className="text-center bg-gradient-to-r from-gray-800 via-blue-900 to-indigo-900 rounded-3xl p-12 text-white">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl shadow-2xl mb-8">
              <Shield size={40} className="text-white" />
            </div>
            <h2 className="text-4xl font-bold mb-6">Nuestro Compromiso Inquebrantable</h2>
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              En <span className="font-heavyrust-primary text-orange-400">PARRILLEROS FAST FOOD</span>, 
              entendemos que la confianza es el ingrediente más valioso de nuestra relación. 
              Por eso, nos comprometemos a proteger su privacidad con la misma pasión y dedicación 
              que ponemos en cada hamburguesa que preparamos.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Shield className="mx-auto mb-3 text-blue-300" size={32} />
                <h3 className="font-bold mb-2">Protección Total</h3>
                <p className="text-sm text-gray-300">Sus datos están seguros con nosotros</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <CheckCircle className="mx-auto mb-3 text-green-300" size={32} />
                <h3 className="font-bold mb-2">Transparencia Absoluta</h3>
                <p className="text-sm text-gray-300">Siempre sabrá cómo usamos su información</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <UserCheck className="mx-auto mb-3 text-purple-300" size={32} />
                <h3 className="font-bold mb-2">Control Total</h3>
                <p className="text-sm text-gray-300">Usted decide sobre sus datos personales</p>
              </div>
            </div>
            <div className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full text-lg font-bold">
              <Shield size={24} />
              <span>Su privacidad, nuestra prioridad número uno</span>
            </div>
            <p className="text-sm text-gray-400 mt-6">
              Última actualización: Enero 2025 | Versión 2.0 | Conforme a la Ley 1581 de 2012
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;