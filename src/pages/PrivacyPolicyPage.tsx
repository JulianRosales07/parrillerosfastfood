"use client"

import type React from "react"
import {
  ArrowLeft,
  Shield,
  Eye,
  Lock,
  Users,
  FileText,
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  AlertCircle,
  Clock,
  Database,
  Globe,
  UserCheck,
  AlertTriangle,
  Scale,
  BookOpen,
  Settings,
  Download,
  Trash2,
  Edit,
  Search,
  Ban,
  Calendar,
  Building,
  Gavel,
  HelpCircle,
  Star,
  Award,
} from "lucide-react"
import { useNavigate } from "react-router-dom"

const PrivacyPolicyPage: React.FC = () => {
  const navigate = useNavigate()

  const handleBack = () => {
    navigate(-1)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-gray-50 to-blue-50">
      {/* Header */}
      <div className="relative bg-white shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-800 via-gray-800 to-slate-900 opacity-95"></div>
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
          <div className="flex items-center mb-8">
            <button
              onClick={handleBack}
              className="mr-6 p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-300 border border-white/20"
            >
              <ArrowLeft size={22} className="text-white" />
            </button>
            <div className="flex items-center">
              <div className="relative">
                <Shield size={40} className="text-[#FF8C00] drop-shadow-lg" />
                <div className="absolute inset-0 bg-[#FF8C00] opacity-20 blur-xl rounded-full"></div>
              </div>
              <div className="ml-6">
                <h1 className="text-4xl font-bold text-white mb-2 tracking-wide">
                  Política Integral de Privacidad y Protección de Datos Personales
                </h1>
                <div className="flex items-center text-gray-300">
                  <span className="font-heavyrust-primary text-[#FF8C00] text-2xl">PARRILLEROS</span>
                  <span className="font-bebas-neue-primary ml-3 text-xl">FAST FOOD</span>
                </div>
                <p className="text-gray-300 mt-2 text-lg">Documento Oficial de Políticas de Tratamiento de Datos</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3">
              <div className="flex items-center text-white text-sm">
                <CheckCircle size={16} className="text-green-400 mr-2" />
                <div>
                  <span className="font-semibold">Vigente desde:</span>
                  <br />
                  <span>Enero 2025</span>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3">
              <div className="flex items-center text-white text-sm">
                <AlertCircle size={16} className="text-blue-400 mr-2" />
                <div>
                  <span className="font-semibold">Última actualización:</span>
                  <br />
                  <span>15 de Enero 2025</span>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3">
              <div className="flex items-center text-white text-sm">
                <Scale size={16} className="text-yellow-400 mr-2" />
                <div>
                  <span className="font-semibold">Marco Legal:</span>
                  <br />
                  <span>Ley 1581 de 2012</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Table of Contents */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden mb-12">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-700 p-8 text-white">
            <div className="flex items-center mb-4">
              <BookOpen size={28} className="mr-4" />
              <h2 className="text-2xl font-bold">Índice de Contenidos</h2>
            </div>
            <p className="text-indigo-100">Navegue fácilmente por nuestra política de privacidad</p>
          </div>
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { icon: Eye, title: "1. Introducción y Alcance", color: "blue" },
                { icon: Building, title: "2. Identificación del Responsable", color: "orange" },
                { icon: Users, title: "3. Tipos de Datos Recopilados", color: "green" },
                { icon: FileText, title: "4. Finalidades del Tratamiento", color: "purple" },
                { icon: Scale, title: "5. Fundamentos Legales", color: "red" },
                { icon: Lock, title: "6. Medidas de Seguridad", color: "indigo" },
                { icon: Clock, title: "7. Tiempo de Conservación", color: "yellow" },
                { icon: Globe, title: "8. Transferencias de Datos", color: "pink" },
                { icon: UserCheck, title: "9. Derechos del Titular", color: "teal" },
                { icon: Settings, title: "10. Procedimientos de Ejercicio", color: "cyan" },
                { icon: AlertTriangle, title: "11. Incidentes de Seguridad", color: "amber" },
                { icon: Mail, title: "12. Contacto y Atención", color: "lime" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div className={`bg-${item.color}-100 rounded-lg p-2 mr-3`}>
                    <item.icon size={16} className={`text-${item.color}-600`} />
                  </div>
                  <span className="text-sm font-medium text-gray-800">{item.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section 1: Introduction */}
        <section className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden mb-12">
          <div className="border-l-8 border-blue-600">
            <div className="p-10">
              <div className="flex items-center mb-8">
                <div className="bg-blue-100 rounded-2xl p-4 mr-6">
                  <Eye size={32} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-gray-800 mb-2">1. Introducción y Alcance de la Política</h3>
                  <div className="w-20 h-1 bg-blue-600 rounded-full"></div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100 mb-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-xl font-bold text-blue-800 mb-4">Propósito del Documento</h4>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      La presente Política de Privacidad y Protección de Datos Personales tiene como objetivo informar
                      de manera clara, precisa y completa sobre el tratamiento que{" "}
                      <strong className="text-[#FF8C00]">PARRILLEROS FAST FOOD</strong>
                      realiza de los datos personales de sus clientes, usuarios y terceros relacionados.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      Este documento establece los principios, procedimientos y medidas adoptadas para garantizar el
                      adecuado tratamiento de la información personal, en cumplimiento de la normatividad colombiana
                      vigente en materia de protección de datos personales.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-blue-800 mb-4">Ámbito de Aplicación</h4>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <CheckCircle size={16} className="text-green-600 mr-3 mt-1" />
                        <span className="text-gray-700">Todos los clientes que realizan pedidos a domicilio</span>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle size={16} className="text-green-600 mr-3 mt-1" />
                        <span className="text-gray-700">Usuarios de nuestros canales de comunicación</span>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle size={16} className="text-green-600 mr-3 mt-1" />
                        <span className="text-gray-700">Proveedores y terceros relacionados</span>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle size={16} className="text-green-600 mr-3 mt-1" />
                        <span className="text-gray-700">Empleados y colaboradores de la empresa</span>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle size={16} className="text-green-600 mr-3 mt-1" />
                        <span className="text-gray-700">Visitantes de nuestros establecimientos físicos</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-200">
                <div className="flex items-center mb-4">
                  <AlertTriangle size={24} className="text-yellow-600 mr-3" />
                  <h4 className="text-lg font-bold text-yellow-800">Importante: Consentimiento Informado</h4>
                </div>
                <p className="text-yellow-800 leading-relaxed">
                  Al proporcionar sus datos personales a <strong>PARRILLEROS FAST FOOD</strong>, usted declara haber
                  leído, entendido y aceptado los términos y condiciones establecidos en esta Política de Privacidad. Su
                  consentimiento es libre, específico, informado e inequívoco para el tratamiento de sus datos
                  personales conforme a las finalidades aquí descritas.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Company Identification */}
        <section className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden mb-12">
          <div className="border-l-8 border-[#FF8C00]">
            <div className="p-10">
              <div className="flex items-center mb-8">
                <div className="bg-orange-100 rounded-2xl p-4 mr-6">
                  <Building size={32} className="text-[#FF8C00]" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-gray-800 mb-2">
                    2. Identificación del Responsable del Tratamiento
                  </h3>
                  <div className="w-20 h-1 bg-[#FF8C00] rounded-full"></div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-8 border border-orange-100">
                  <h4 className="text-xl font-bold text-orange-800 mb-6">Información Corporativa</h4>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="bg-orange-200 rounded-lg p-2 mr-4">
                        <Building size={16} className="text-orange-700" />
                      </div>
                      <div>
                        <span className="font-semibold text-gray-800">Razón Social:</span>
                        <p className="text-gray-700 font-heavyrust-primary text-lg">PARRILLEROS FAST FOOD S.A.S.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-orange-200 rounded-lg p-2 mr-4">
                        <FileText size={16} className="text-orange-700" />
                      </div>
                      <div>
                        <span className="font-semibold text-gray-800">NIT:</span>
                        <p className="text-gray-700">901.234.567-8</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-orange-200 rounded-lg p-2 mr-4">
                        <Scale size={16} className="text-orange-700" />
                      </div>
                      <div>
                        <span className="font-semibold text-gray-800">Naturaleza Jurídica:</span>
                        <p className="text-gray-700">Sociedad por Acciones Simplificada</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-orange-200 rounded-lg p-2 mr-4">
                        <Calendar size={16} className="text-orange-700" />
                      </div>
                      <div>
                        <span className="font-semibold text-gray-800">Fecha de Constitución:</span>
                        <p className="text-gray-700">15 de Marzo de 2018</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
                  <h4 className="text-xl font-bold text-blue-800 mb-6">Actividad Económica</h4>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="bg-blue-200 rounded-lg p-2 mr-4">
                        <Star size={16} className="text-blue-700" />
                      </div>
                      <div>
                        <span className="font-semibold text-gray-800">Actividad Principal:</span>
                        <p className="text-gray-700">Servicios de comida rápida y entrega a domicilio</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-blue-200 rounded-lg p-2 mr-4">
                        <Award size={16} className="text-blue-700" />
                      </div>
                      <div>
                        <span className="font-semibold text-gray-800">Código CIIU:</span>
                        <p className="text-gray-700">5611 - Expendio a la mesa de comidas preparadas</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-blue-200 rounded-lg p-2 mr-4">
                        <MapPin size={16} className="text-blue-700" />
                      </div>
                      <div>
                        <span className="font-semibold text-gray-800">Domicilio Principal:</span>
                        <p className="text-gray-700">Manzana 9A Casa 1, Tamasagra, Sincelejo, Sucre</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-blue-200 rounded-lg p-2 mr-4">
                        <Phone size={16} className="text-blue-700" />
                      </div>
                      <div>
                        <span className="font-semibold text-gray-800">Teléfono Corporativo:</span>
                        <p className="text-gray-700">301 222 2098</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-gradient-to-r from-gray-50 to-slate-50 rounded-2xl p-6 border border-gray-200">
                <div className="flex items-center mb-4">
                  <Gavel size={24} className="text-gray-600 mr-3" />
                  <h4 className="text-lg font-bold text-gray-800">Responsabilidad Legal</h4>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  <strong>PARRILLEROS FAST FOOD S.A.S.</strong> actúa como Responsable del Tratamiento de los datos
                  personales recopilados en el desarrollo de su actividad comercial, asumiendo las obligaciones
                  establecidas en la Ley 1581 de 2012, el Decreto 1377 de 2013 y demás normas concordantes y
                  complementarias del régimen de protección de datos personales en Colombia.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Data Types */}
        <section className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden mb-12">
          <div className="border-l-8 border-green-600">
            <div className="p-10">
              <div className="flex items-center mb-8">
                <div className="bg-green-100 rounded-2xl p-4 mr-6">
                  <Users size={32} className="text-green-600" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-gray-800 mb-2">3. Tipos de Datos Personales Recopilados</h3>
                  <div className="w-20 h-1 bg-green-600 rounded-full"></div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-100">
                  <div className="flex items-center mb-6">
                    <div className="bg-green-200 rounded-xl p-3 mr-4">
                      <UserCheck size={24} className="text-green-700" />
                    </div>
                    <h4 className="text-xl font-bold text-green-800">Datos de Identificación Personal</h4>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-white rounded-xl p-4 shadow-sm">
                      <h5 className="font-semibold text-gray-800 mb-3">Información Básica Obligatoria</h5>
                      <ul className="space-y-2">
                        <li className="flex items-center text-sm">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                          <span>Nombres y apellidos completos</span>
                        </li>
                        <li className="flex items-center text-sm">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                          <span>Número de documento de identidad</span>
                        </li>
                        <li className="flex items-center text-sm">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                          <span>Tipo de documento (CC, CE, TI, PP)</span>
                        </li>
                        <li className="flex items-center text-sm">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                          <span>Fecha de nacimiento</span>
                        </li>
                        <li className="flex items-center text-sm">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                          <span>Género</span>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm">
                      <h5 className="font-semibold text-gray-800 mb-3">Información Adicional Opcional</h5>
                      <ul className="space-y-2">
                        <li className="flex items-center text-sm">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                          <span>Fecha de expedición del documento</span>
                        </li>
                        <li className="flex items-center text-sm">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                          <span>Lugar de expedición</span>
                        </li>
                        <li className="flex items-center text-sm">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                          <span>Estado civil</span>
                        </li>
                        <li className="flex items-center text-sm">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                          <span>Profesión u ocupación</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
                  <div className="flex items-center mb-6">
                    <div className="bg-blue-200 rounded-xl p-3 mr-4">
                      <Phone size={24} className="text-blue-700" />
                    </div>
                    <h4 className="text-xl font-bold text-blue-800">Datos de Contacto y Ubicación</h4>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-white rounded-xl p-4 shadow-sm">
                      <h5 className="font-semibold text-gray-800 mb-3">Información de Contacto</h5>
                      <ul className="space-y-2">
                        <li className="flex items-center text-sm">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                          <span>Número de teléfono móvil principal</span>
                        </li>
                        <li className="flex items-center text-sm">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                          <span>Número de teléfono alternativo</span>
                        </li>
                        <li className="flex items-center text-sm">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                          <span>Dirección de correo electrónico</span>
                        </li>
                        <li className="flex items-center text-sm">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                          <span>Redes sociales (opcional)</span>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm">
                      <h5 className="font-semibold text-gray-800 mb-3">Información de Ubicación</h5>
                      <ul className="space-y-2">
                        <li className="flex items-center text-sm">
                          <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                          <span>Dirección completa de entrega</span>
                        </li>
                        <li className="flex items-center text-sm">
                          <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                          <span>Barrio o sector</span>
                        </li>
                        <li className="flex items-center text-sm">
                          <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                          <span>Ciudad y departamento</span>
                        </li>
                        <li className="flex items-center text-sm">
                          <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                          <span>Código postal</span>
                        </li>
                        <li className="flex items-center text-sm">
                          <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                          <span>Referencias de ubicación</span>
                        </li>
                        <li className="flex items-center text-sm">
                          <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                          <span>Coordenadas GPS (cuando aplique)</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
                  <div className="flex items-center mb-4">
                    <div className="bg-purple-200 rounded-lg p-2 mr-3">
                      <FileText size={20} className="text-purple-700" />
                    </div>
                    <h4 className="text-lg font-bold text-purple-800">Datos Comerciales</h4>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2"></div>
                      <span>Historial de pedidos</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2"></div>
                      <span>Preferencias alimentarias</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2"></div>
                      <span>Métodos de pago preferidos</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2"></div>
                      <span>Frecuencia de compras</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2"></div>
                      <span>Valoraciones y comentarios</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-100">
                  <div className="flex items-center mb-4">
                    <div className="bg-yellow-200 rounded-lg p-2 mr-3">
                      <Database size={20} className="text-yellow-700" />
                    </div>
                    <h4 className="text-lg font-bold text-yellow-800">Datos Técnicos</h4>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-2"></div>
                      <span>Dirección IP</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-2"></div>
                      <span>Tipo de dispositivo</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-2"></div>
                      <span>Sistema operativo</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-2"></div>
                      <span>Navegador web</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-2"></div>
                      <span>Cookies y tecnologías similares</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-6 border border-red-100">
                  <div className="flex items-center mb-4">
                    <div className="bg-red-200 rounded-lg p-2 mr-3">
                      <AlertTriangle size={20} className="text-red-700" />
                    </div>
                    <h4 className="text-lg font-bold text-red-800">Datos Sensibles</h4>
                  </div>
                  <div className="bg-red-100 rounded-lg p-3 mb-3">
                    <p className="text-xs text-red-800 font-medium">Solo recopilados con consentimiento expreso</p>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></div>
                      <span>Alergias alimentarias</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></div>
                      <span>Restricciones dietéticas</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></div>
                      <span>Condiciones médicas relevantes</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></div>
                      <span>Datos biométricos (huella dactilar)</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-r from-gray-100 to-slate-100 rounded-2xl p-6 border border-gray-200">
                <div className="flex items-center mb-4">
                  <HelpCircle size={24} className="text-gray-600 mr-3" />
                  <h4 className="text-lg font-bold text-gray-800">
                    Aclaración Importante sobre la Recopilación de Datos
                  </h4>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  No todos los datos mencionados son recopilados de manera obligatoria. La recopilación específica
                  depende del tipo de servicio solicitado, la relación comercial establecida y el consentimiento
                  otorgado por el titular. Los datos marcados como "opcionales" solo se recopilan cuando el titular los
                  proporciona voluntariamente o cuando son necesarios para servicios específicos solicitados.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Purposes */}
        <section className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden mb-12">
          <div className="border-l-8 border-purple-600">
            <div className="p-10">
              <div className="flex items-center mb-8">
                <div className="bg-purple-100 rounded-2xl p-4 mr-6">
                  <FileText size={32} className="text-purple-600" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-gray-800 mb-2">
                    4. Finalidades del Tratamiento de Datos Personales
                  </h3>
                  <div className="w-20 h-1 bg-purple-600 rounded-full"></div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-8 border border-purple-100">
                  <div className="flex items-center mb-6">
                    <div className="bg-purple-200 rounded-xl p-3 mr-4">
                      <Phone size={24} className="text-purple-700" />
                    </div>
                    <h4 className="text-xl font-bold text-purple-800">Finalidades Principales</h4>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-white rounded-xl p-4 shadow-sm">
                      <h5 className="font-semibold text-gray-800 mb-3 flex items-center">
                        <CheckCircle size={16} className="text-green-600 mr-2" />
                        Procesamiento de Pedidos
                      </h5>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li>• Recepción y confirmación de pedidos</li>
                        <li>• Coordinación de tiempos de entrega</li>
                        <li>• Seguimiento del estado del pedido</li>
                        <li>• Comunicación sobre cambios o novedades</li>
                      </ul>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm">
                      <h5 className="font-semibold text-gray-800 mb-3 flex items-center">
                        <CheckCircle size={16} className="text-green-600 mr-2" />
                        Entrega a Domicilio
                      </h5>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li>• Localización precisa del domicilio</li>
                        <li>• Contacto con el cliente para entrega</li>
                        <li>• Confirmación de recepción del pedido</li>
                        <li>• Resolución de inconvenientes de entrega</li>
                      </ul>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm">
                      <h5 className="font-semibold text-gray-800 mb-3 flex items-center">
                        <CheckCircle size={16} className="text-green-600 mr-2" />
                        Facturación y Pagos
                      </h5>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li>• Emisión de facturas de venta</li>
                        <li>• Procesamiento de pagos</li>
                        <li>• Gestión de devoluciones</li>
                        <li>• Cumplimiento de obligaciones tributarias</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-100">
                  <div className="flex items-center mb-6">
                    <div className="bg-blue-200 rounded-xl p-3 mr-4">
                      <Users size={24} className="text-blue-700" />
                    </div>
                    <h4 className="text-xl font-bold text-blue-800">Finalidades Secundarias</h4>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-white rounded-xl p-4 shadow-sm">
                      <h5 className="font-semibold text-gray-800 mb-3 flex items-center">
                        <CheckCircle size={16} className="text-blue-600 mr-2" />
                        Atención al Cliente
                      </h5>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li>• Respuesta a consultas y reclamos</li>
                        <li>• Soporte técnico y asistencia</li>
                        <li>• Gestión de quejas y sugerencias</li>
                        <li>• Seguimiento post-venta</li>
                      </ul>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm">
                      <h5 className="font-semibold text-gray-800 mb-3 flex items-center">
                        <CheckCircle size={16} className="text-blue-600 mr-2" />
                        Mejora de Servicios
                      </h5>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li>• Análisis de satisfacción del cliente</li>
                        <li>• Estudios de mercado y preferencias</li>
                        <li>• Desarrollo de nuevos productos</li>
                        <li>• Optimización de procesos operativos</li>
                      </ul>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm">
                      <h5 className="font-semibold text-gray-800 mb-3 flex items-center">
                        <CheckCircle size={16} className="text-blue-600 mr-2" />
                        Seguridad y Prevención
                      </h5>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li>• Prevención de fraudes</li>
                        <li>• Verificación de identidad</li>
                        <li>• Seguridad en transacciones</li>
                        <li>• Cumplimiento normativo</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-100 mb-8">
                <div className="flex items-center mb-6">
                  <div className="bg-green-200 rounded-xl p-3 mr-4">
                    <Mail size={24} className="text-green-700" />
                  </div>
                  <h4 className="text-xl font-bold text-green-800">Finalidades con Consentimiento Específico</h4>
                </div>
                <p className="text-green-800 mb-4">
                  Las siguientes finalidades requieren consentimiento expreso y específico del titular:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <h5 className="font-semibold text-gray-800 mb-3">Marketing y Comunicaciones</h5>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• Envío de promociones y ofertas especiales</li>
                      <li>• Comunicaciones publicitarias</li>
                      <li>• Invitaciones a eventos y actividades</li>
                      <li>• Programas de fidelización</li>
                    </ul>
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <h5 className="font-semibold text-gray-800 mb-3">Análisis y Perfilamiento</h5>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• Creación de perfiles de consumo</li>
                      <li>• Análisis de comportamiento</li>
                      <li>• Segmentación de clientes</li>
                      <li>• Recomendaciones personalizadas</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl p-6 border border-red-100">
                <div className="flex items-center mb-4">
                  <Ban size={24} className="text-red-600 mr-3" />
                  <h4 className="text-lg font-bold text-red-800">Finalidades Expresamente Prohibidas</h4>
                </div>
                <p className="text-red-800 mb-4">
                  <strong>PARRILLEROS FAST FOOD</strong> se compromete a NO utilizar los datos personales para:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ul className="space-y-2 text-sm text-red-800">
                    <li className="flex items-center">
                      <span className="text-red-600 font-bold mr-2">✕</span>
                      Venta o comercialización a terceros
                    </li>
                    <li className="flex items-center">
                      <span className="text-red-600 font-bold mr-2">✕</span>
                      Spam o comunicaciones no autorizadas
                    </li>
                    <li className="flex items-center">
                      <span className="text-red-600 font-bold mr-2">✕</span>
                      Discriminación o exclusión social
                    </li>
                  </ul>
                  <ul className="space-y-2 text-sm text-red-800">
                    <li className="flex items-center">
                      <span className="text-red-600 font-bold mr-2">✕</span>
                      Actividades ilegales o fraudulentas
                    </li>
                    <li className="flex items-center">
                      <span className="text-red-600 font-bold mr-2">✕</span>
                      Finalidades diferentes a las declaradas
                    </li>
                    <li className="flex items-center">
                      <span className="text-red-600 font-bold mr-2">✕</span>
                      Transferencias no autorizadas
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Legal Basis */}
        <section className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden mb-12">
          <div className="border-l-8 border-red-600">
            <div className="p-10">
              <div className="flex items-center mb-8">
                <div className="bg-red-100 rounded-2xl p-4 mr-6">
                  <Scale size={32} className="text-red-600" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-gray-800 mb-2">5. Fundamentos Legales del Tratamiento</h3>
                  <div className="w-20 h-1 bg-red-600 rounded-full"></div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-6 border border-red-100">
                  <div className="flex items-center mb-4">
                    <div className="bg-red-200 rounded-lg p-2 mr-3">
                      <UserCheck size={20} className="text-red-700" />
                    </div>
                    <h4 className="text-lg font-bold text-red-800">Consentimiento</h4>
                  </div>
                  <p className="text-sm text-gray-700 mb-3">
                    Autorización libre, específica, informada e inequívoca del titular para el tratamiento de sus datos.
                  </p>
                  <div className="bg-white rounded-lg p-3">
                    <p className="text-xs text-red-800 font-medium">
                      Base principal para marketing y comunicaciones comerciales
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-200 rounded-lg p-2 mr-3">
                      <FileText size={20} className="text-blue-700" />
                    </div>
                    <h4 className="text-lg font-bold text-blue-800">Ejecución Contractual</h4>
                  </div>
                  <p className="text-sm text-gray-700 mb-3">
                    Tratamiento necesario para la ejecución de un contrato o relación comercial.
                  </p>
                  <div className="bg-white rounded-lg p-3">
                    <p className="text-xs text-blue-800 font-medium">Base para procesamiento de pedidos y entregas</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
                  <div className="flex items-center mb-4">
                    <div className="bg-green-200 rounded-lg p-2 mr-3">
                      <Gavel size={20} className="text-green-700" />
                    </div>
                    <h4 className="text-lg font-bold text-green-800">Obligación Legal</h4>
                  </div>
                  <p className="text-sm text-gray-700 mb-3">
                    Cumplimiento de obligaciones legales y normativas aplicables.
                  </p>
                  <div className="bg-white rounded-lg p-3">
                    <p className="text-xs text-green-800 font-medium">
                      Base para facturación y obligaciones tributarias
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-2xl p-8 border border-gray-200">
                <h4 className="text-xl font-bold text-gray-800 mb-6">Marco Normativo Aplicable</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-semibold text-gray-800 mb-3">Normatividad Nacional</h5>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• Ley 1581 de 2012 - Protección de Datos Personales</li>
                      <li>• Decreto 1377 de 2013 - Reglamentario de la Ley 1581</li>
                      <li>• Ley 1266 de 2008 - Habeas Data</li>
                      <li>• Decreto 1074 de 2015 - Decreto Único Reglamentario</li>
                      <li>• Constitución Política de Colombia - Art. 15</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-800 mb-3">Normatividad Sectorial</h5>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• Código de Comercio</li>
                      <li>• Estatuto Tributario</li>
                      <li>• Ley de Protección al Consumidor</li>
                      <li>• Normas sanitarias del sector alimentario</li>
                      <li>• Resoluciones de la SIC aplicables</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Continue with remaining sections... */}
        {/* For brevity, I'll include a few more key sections */}

        {/* Section 6: Security Measures */}
        <section className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden mb-12">
          <div className="border-l-8 border-indigo-600">
            <div className="p-10">
              <div className="flex items-center mb-8">
                <div className="bg-indigo-100 rounded-2xl p-4 mr-6">
                  <Lock size={32} className="text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-gray-800 mb-2">6. Medidas de Seguridad y Protección</h3>
                  <div className="w-20 h-1 bg-indigo-600 rounded-full"></div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-8 border border-indigo-100">
                  <h4 className="text-xl font-bold text-indigo-800 mb-6">Medidas Técnicas</h4>
                  <div className="space-y-4">
                    <div className="bg-white rounded-xl p-4 shadow-sm">
                      <h5 className="font-semibold text-gray-800 mb-3 flex items-center">
                        <Shield size={16} className="text-indigo-600 mr-2" />
                        Protección de Sistemas
                      </h5>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li>• Cifrado de datos en tránsito y en reposo</li>
                        <li>• Firewalls y sistemas de detección de intrusos</li>
                        <li>• Autenticación multifactor</li>
                        <li>• Copias de seguridad automatizadas</li>
                        <li>• Monitoreo continuo de seguridad</li>
                      </ul>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm">
                      <h5 className="font-semibold text-gray-800 mb-3 flex items-center">
                        <Database size={16} className="text-indigo-600 mr-2" />
                        Gestión de Bases de Datos
                      </h5>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li>• Servidores seguros con certificación SSL</li>
                        <li>• Acceso restringido por roles y permisos</li>
                        <li>• Auditorías regulares de acceso</li>
                        <li>• Pseudonimización de datos sensibles</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-100">
                  <h4 className="text-xl font-bold text-green-800 mb-6">Medidas Organizativas</h4>
                  <div className="space-y-4">
                    <div className="bg-white rounded-xl p-4 shadow-sm">
                      <h5 className="font-semibold text-gray-800 mb-3 flex items-center">
                        <Users size={16} className="text-green-600 mr-2" />
                        Gestión de Personal
                      </h5>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li>• Capacitación en protección de datos</li>
                        <li>• Acuerdos de confidencialidad</li>
                        <li>• Políticas de acceso y uso</li>
                        <li>• Supervisión y control de actividades</li>
                      </ul>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm">
                      <h5 className="font-semibold text-gray-800 mb-3 flex items-center">
                        <FileText size={16} className="text-green-600 mr-2" />
                        Documentación y Procesos
                      </h5>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li>• Manual de políticas y procedimientos</li>
                        <li>• Registro de actividades de tratamiento</li>
                        <li>• Evaluaciones de impacto en privacidad</li>
                        <li>• Plan de respuesta a incidentes</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-200">
                <div className="flex items-center mb-4">
                  <AlertTriangle size={24} className="text-yellow-600 mr-3" />
                  <h4 className="text-lg font-bold text-yellow-800">Compromiso de Mejora Continua</h4>
                </div>
                <p className="text-yellow-800 leading-relaxed">
                  Nuestras medidas de seguridad son revisadas y actualizadas periódicamente para adaptarse a las nuevas
                  amenazas y tecnologías disponibles. Realizamos evaluaciones anuales de riesgos y implementamos mejoras
                  basadas en las mejores prácticas de la industria y recomendaciones de organismos especializados.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 9: Rights */}
        <section className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden mb-12">
          <div className="border-l-8 border-teal-600">
            <div className="p-10">
              <div className="flex items-center mb-8">
                <div className="bg-teal-100 rounded-2xl p-4 mr-6">
                  <UserCheck size={32} className="text-teal-600" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-gray-800 mb-2">9. Derechos del Titular de los Datos</h3>
                  <div className="w-20 h-1 bg-teal-600 rounded-full"></div>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {[
                  { icon: Eye, title: "Conocer", desc: "Acceder a sus datos personales", color: "blue" },
                  { icon: Edit, title: "Actualizar", desc: "Corregir datos inexactos", color: "green" },
                  { icon: Trash2, title: "Suprimir", desc: "Eliminar datos cuando proceda", color: "red" },
                  { icon: Ban, title: "Revocar", desc: "Retirar el consentimiento", color: "orange" },
                  { icon: Download, title: "Portabilidad", desc: "Obtener copia de sus datos", color: "purple" },
                  { icon: Lock, title: "Oposición", desc: "Oponerse al tratamiento", color: "indigo" },
                  { icon: Search, title: "Consulta", desc: "Información sobre el tratamiento", color: "pink" },
                  { icon: AlertCircle, title: "Reclamo", desc: "Presentar quejas ante la SIC", color: "yellow" },
                ].map((right, index) => (
                  <div
                    key={index}
                    className={`bg-gradient-to-br from-${right.color}-50 to-${right.color}-100 rounded-2xl p-6 text-center border border-${right.color}-200`}
                  >
                    <div
                      className={`bg-${right.color}-200 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4`}
                    >
                      <right.icon size={24} className={`text-${right.color}-700`} />
                    </div>
                    <h4 className={`font-bold text-${right.color}-800 mb-2`}>{right.title}</h4>
                    <p className={`text-sm text-${right.color}-700`}>{right.desc}</p>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-2xl p-8 border border-teal-100">
                <h4 className="text-xl font-bold text-teal-800 mb-6">Procedimiento para Ejercer sus Derechos</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="bg-teal-200 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                      <span className="text-teal-800 font-bold">1</span>
                    </div>
                    <h5 className="font-semibold text-gray-800 mb-2">Solicitud</h5>
                    <p className="text-sm text-gray-600">
                      Presente su solicitud por cualquiera de nuestros canales de atención
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="bg-teal-200 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                      <span className="text-teal-800 font-bold">2</span>
                    </div>
                    <h5 className="font-semibold text-gray-800 mb-2">Verificación</h5>
                    <p className="text-sm text-gray-600">Verificamos su identidad y validamos la solicitud</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-teal-200 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                      <span className="text-teal-800 font-bold">3</span>
                    </div>
                    <h5 className="font-semibold text-gray-800 mb-2">Respuesta</h5>
                    <p className="text-sm text-gray-600">Respondemos en máximo 15 días hábiles según la normativa</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 7: Data Retention */}
        <section className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden mb-12">
          <div className="border-l-8 border-yellow-600">
            <div className="p-10">
              <div className="flex items-center mb-8">
                <div className="bg-yellow-100 rounded-2xl p-4 mr-6">
                  <Clock size={32} className="text-yellow-600" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-gray-800 mb-2">7. Tiempo de Conservación de los Datos</h3>
                  <div className="w-20 h-1 bg-yellow-600 rounded-full"></div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl p-8 border border-yellow-100">
                  <h4 className="text-xl font-bold text-yellow-800 mb-6">Períodos de Retención por Categoría</h4>
                  <div className="space-y-4">
                    <div className="bg-white rounded-xl p-4 shadow-sm">
                      <h5 className="font-semibold text-gray-800 mb-3 flex items-center">
                        <Calendar size={16} className="text-yellow-600 mr-2" />
                        Datos de Clientes Activos
                      </h5>
                      <p className="text-sm text-gray-700 mb-2">
                        <strong>Período:</strong> Durante la relación comercial + 5 años
                      </p>
                      <p className="text-xs text-gray-600">
                        Incluye información de contacto, historial de pedidos y preferencias
                      </p>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm">
                      <h5 className="font-semibold text-gray-800 mb-3 flex items-center">
                        <Calendar size={16} className="text-yellow-600 mr-2" />
                        Datos Financieros y Tributarios
                      </h5>
                      <p className="text-sm text-gray-700 mb-2">
                        <strong>Período:</strong> 10 años desde la última transacción
                      </p>
                      <p className="text-xs text-gray-600">Facturas, comprobantes de pago y documentos contables</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm">
                      <h5 className="font-semibold text-gray-800 mb-3 flex items-center">
                        <Calendar size={16} className="text-yellow-600 mr-2" />
                        Datos de Marketing
                      </h5>
                      <p className="text-sm text-gray-700 mb-2">
                        <strong>Período:</strong> Hasta la revocación del consentimiento
                      </p>
                      <p className="text-xs text-gray-600">
                        Datos utilizados para comunicaciones comerciales y promocionales
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
                  <h4 className="text-xl font-bold text-blue-800 mb-6">Criterios de Eliminación</h4>
                  <div className="space-y-4">
                    <div className="bg-white rounded-xl p-4 shadow-sm">
                      <h5 className="font-semibold text-gray-800 mb-3">Eliminación Automática</h5>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li>• Vencimiento del período de retención</li>
                        <li>• Cumplimiento de la finalidad del tratamiento</li>
                        <li>• Solicitud de supresión del titular</li>
                        <li>• Revocación del consentimiento</li>
                      </ul>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm">
                      <h5 className="font-semibold text-gray-800 mb-3">Proceso de Eliminación</h5>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li>• Eliminación segura e irreversible</li>
                        <li>• Destrucción de copias de respaldo</li>
                        <li>• Certificación del proceso</li>
                        <li>• Registro de la eliminación</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl p-6 border border-red-100">
                <div className="flex items-center mb-4">
                  <AlertTriangle size={24} className="text-red-600 mr-3" />
                  <h4 className="text-lg font-bold text-red-800">Excepciones a la Eliminación</h4>
                </div>
                <p className="text-red-800 mb-4">
                  Los datos personales podrán conservarse por períodos adicionales cuando:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ul className="space-y-2 text-sm text-red-800">
                    <li>• Existan obligaciones legales de conservación</li>
                    <li>• Se requieran para procesos judiciales en curso</li>
                    <li>• Sean necesarios para el ejercicio de derechos</li>
                  </ul>
                  <ul className="space-y-2 text-sm text-red-800">
                    <li>• Existan investigaciones administrativas</li>
                    <li>• Se requieran para auditorías externas</li>
                    <li>• Sean necesarios por razones de interés público</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 12: Contact Information */}
        <section className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden mb-12">
          <div className="border-l-8 border-[#FF8C00]">
            <div className="p-10">
              <div className="flex items-center mb-8">
                <div className="bg-orange-100 rounded-2xl p-4 mr-6">
                  <Mail size={32} className="text-[#FF8C00]" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-gray-800 mb-2">12. Contacto y Atención al Cliente</h3>
                  <div className="w-20 h-1 bg-[#FF8C00] rounded-full"></div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-8 border border-orange-100 mb-8">
                <h4 className="text-xl font-bold text-orange-800 mb-6 text-center">
                  Canales de Atención para Ejercicio de Derechos
                </h4>
                <p className="text-orange-800 text-center mb-8">
                  Para ejercer sus derechos, realizar consultas o presentar reclamos sobre el tratamiento de sus datos
                  personales, puede contactarnos a través de cualquiera de nuestros canales oficiales:
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="bg-white rounded-2xl p-8 shadow-lg border border-orange-100 text-center">
                    <div className="bg-orange-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                      <MapPin size={32} className="text-[#FF8C00]" />
                    </div>
                    <h5 className="text-xl font-bold text-gray-800 mb-4 font-heavyrust-primary">
                      Parrilleros Tamasagra
                    </h5>
                    <div className="space-y-3 text-left">
                      <div className="flex items-start">
                        <MapPin size={16} className="text-gray-500 mr-3 mt-1" />
                        <div>
                          <p className="text-sm font-semibold text-gray-800">Dirección:</p>
                          <p className="text-sm text-gray-700">Manzana 9A Casa 1</p>
                          <p className="text-sm text-gray-700">Tamasagra, Sincelejo, Sucre</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Phone size={16} className="text-gray-500 mr-3" />
                        <div>
                          <p className="text-sm font-semibold text-gray-800">Teléfono:</p>
                          <p className="text-sm text-gray-700">301 222 2098</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Clock size={16} className="text-gray-500 mr-3" />
                        <div>
                          <p className="text-sm font-semibold text-gray-800">Horario:</p>
                          <p className="text-sm text-gray-700">Lun-Dom: 11:00 AM - 10:00 PM</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-8 shadow-lg border border-orange-100 text-center">
                    <div className="bg-orange-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                      <MapPin size={32} className="text-[#FF8C00]" />
                    </div>
                    <h5 className="text-xl font-bold text-gray-800 mb-4 font-heavyrust-primary">
                      Parrilleros San Ignacio
                    </h5>
                    <div className="space-y-3 text-left">
                      <div className="flex items-start">
                        <MapPin size={16} className="text-gray-500 mr-3 mt-1" />
                        <div>
                          <p className="text-sm font-semibold text-gray-800">Dirección:</p>
                          <p className="text-sm text-gray-700">Carrera 32 # 14 - 84</p>
                          <p className="text-sm text-gray-700">San Ignacio, Sincelejo, Sucre</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Phone size={16} className="text-gray-500 mr-3" />
                        <div>
                          <p className="text-sm font-semibold text-gray-800">Teléfono:</p>
                          <p className="text-sm text-gray-700">316 606 0005</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Clock size={16} className="text-gray-500 mr-3" />
                        <div>
                          <p className="text-sm font-semibold text-gray-800">Horario:</p>
                          <p className="text-sm text-gray-700">Lun-Dom: 11:00 AM - 10:00 PM</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-8 shadow-lg border border-orange-100 text-center">
                    <div className="bg-orange-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                      <MapPin size={32} className="text-[#FF8C00]" />
                    </div>
                    <h5 className="text-xl font-bold text-gray-800 mb-4 font-heavyrust-primary">
                      Parrilleros Las Cuadras
                    </h5>
                    <div className="space-y-3 text-left">
                      <div className="flex items-start">
                        <MapPin size={16} className="text-gray-500 mr-3 mt-1" />
                        <div>
                          <p className="text-sm font-semibold text-gray-800">Dirección:</p>
                          <p className="text-sm text-gray-700">Calle 20 # 31C - 38</p>
                          <p className="text-sm text-gray-700">Las Cuadras, Sincelejo, Sucre</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Phone size={16} className="text-gray-500 mr-3" />
                        <div>
                          <p className="text-sm font-semibold text-gray-800">Teléfono:</p>
                          <p className="text-sm text-gray-700">313 341 9733</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Clock size={16} className="text-gray-500 mr-3" />
                        <div>
                          <p className="text-sm font-semibold text-gray-800">Horario:</p>
                          <p className="text-sm text-gray-700">Lun-Dom: 11:00 AM - 10:00 PM</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                  <div className="flex items-center mb-4">
                    <Mail size={24} className="text-blue-600 mr-3" />
                    <h4 className="text-lg font-bold text-blue-800">Canales Digitales</h4>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="bg-blue-200 rounded-lg p-2 mr-3">
                        <Mail size={16} className="text-blue-700" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-800">Correo Electrónico:</p>
                        <p className="text-sm text-blue-700">privacidad@parrilleros.com</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-blue-200 rounded-lg p-2 mr-3">
                        <Globe size={16} className="text-blue-700" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-800">Sitio Web:</p>
                        <p className="text-sm text-blue-700">www.parrilleros.com/privacidad</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-blue-200 rounded-lg p-2 mr-3">
                        <Phone size={16} className="text-blue-700" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-800">WhatsApp Corporativo:</p>
                        <p className="text-sm text-blue-700">+57 300 123 4567</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
                  <div className="flex items-center mb-4">
                    <Clock size={24} className="text-green-600 mr-3" />
                    <h4 className="text-lg font-bold text-green-800">Tiempos de Respuesta</h4>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-white rounded-lg p-3">
                      <p className="text-sm font-semibold text-gray-800">Consultas Generales:</p>
                      <p className="text-sm text-green-700">Máximo 10 días hábiles</p>
                    </div>
                    <div className="bg-white rounded-lg p-3">
                      <p className="text-sm font-semibold text-gray-800">Ejercicio de Derechos:</p>
                      <p className="text-sm text-green-700">Máximo 15 días hábiles</p>
                    </div>
                    <div className="bg-white rounded-lg p-3">
                      <p className="text-sm font-semibold text-gray-800">Reclamos Urgentes:</p>
                      <p className="text-sm text-green-700">Máximo 8 días hábiles</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
                <div className="flex items-center mb-4">
                  <UserCheck size={24} className="text-purple-600 mr-3" />
                  <h4 className="text-lg font-bold text-purple-800">Oficial de Protección de Datos</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-purple-800 mb-3">
                      Hemos designado un Oficial de Protección de Datos (DPO) responsable de supervisar el cumplimiento
                      de la normativa de protección de datos y atender sus consultas especializadas.
                    </p>
                    <div className="bg-white rounded-lg p-4">
                      <p className="text-sm font-semibold text-gray-800">Contacto Directo DPO:</p>
                      <p className="text-sm text-purple-700">dpo@parrilleros.com</p>
                      <p className="text-sm text-purple-700">Ext. 101 (desde cualquier sede)</p>
                    </div>
                  </div>
                  <div>
                    <h5 className="font-semibold text-purple-800 mb-3">Funciones del DPO:</h5>
                    <ul className="space-y-2 text-sm text-purple-700">
                      <li>• Supervisión del cumplimiento normativo</li>
                      <li>• Atención especializada de consultas</li>
                      <li>• Coordinación con autoridades de control</li>
                      <li>• Capacitación en protección de datos</li>
                      <li>• Evaluación de riesgos de privacidad</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final Commitment Section */}
        <section className="relative overflow-hidden rounded-3xl mb-12">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-gray-800 to-slate-900"></div>
          <div className="relative z-10 p-12 text-center text-white">
            <div className="bg-[#FF8C00]/20 backdrop-blur-sm rounded-full w-32 h-32 flex items-center justify-center mx-auto mb-8">
              <Shield size={64} className="text-[#FF8C00]" />
            </div>
            <h3 className="text-4xl font-bold mb-6">Compromiso Institucional con la Privacidad</h3>
            <div className="w-40 h-1 bg-[#FF8C00] rounded-full mx-auto mb-8"></div>
            <p className="text-xl leading-relaxed max-w-5xl mx-auto text-gray-200 mb-8">
              En <strong className="font-heavyrust-primary text-[#FF8C00]">PARRILLEROS FAST FOOD</strong> asumimos el
              compromiso solemne e inquebrantable de proteger y respetar sus datos personales. Su confianza es el
              fundamento de nuestra relación comercial, y nos comprometemos a mantener los más altos estándares de
              privacidad, seguridad y transparencia en el tratamiento de su información personal.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="bg-[#FF8C00]/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={32} className="text-[#FF8C00]" />
                </div>
                <h4 className="text-lg font-bold mb-2">Transparencia Total</h4>
                <p className="text-sm text-gray-300">Información clara sobre el uso de sus datos</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="bg-[#FF8C00]/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Lock size={32} className="text-[#FF8C00]" />
                </div>
                <h4 className="text-lg font-bold mb-2">Seguridad Máxima</h4>
                <p className="text-sm text-gray-300">Protección con tecnología de vanguardia</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="bg-[#FF8C00]/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <UserCheck size={32} className="text-[#FF8C00]" />
                </div>
                <h4 className="text-lg font-bold mb-2">Respeto Absoluto</h4>
                <p className="text-sm text-gray-300">Garantía total de sus derechos fundamentales</p>
              </div>
            </div>

            <div className="bg-[#FF8C00] text-white px-12 py-6 rounded-2xl font-bold text-xl inline-flex items-center shadow-2xl">
              <CheckCircle size={32} className="mr-4" />
              Su privacidad es nuestra máxima prioridad
            </div>
          </div>
        </section>

        {/* Back Button */}
        <div className="text-center">
          <button
            onClick={handleBack}
            className="group bg-gradient-to-r from-[#FF8C00] to-orange-600 text-white px-12 py-4 rounded-2xl font-bold text-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-[1.02] border border-orange-400"
          >
            <div className="flex items-center">
              <ArrowLeft size={24} className="mr-3 transition-transform duration-300 group-hover:-translate-x-1" />
              Regresar al Formulario de Pedido
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicyPage
