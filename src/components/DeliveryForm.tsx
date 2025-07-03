import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, MapPin, Phone, CreditCard, Mail, FileText, ArrowLeft, Send, CheckCircle, Clock, Truck, Download, Printer, Receipt, ExternalLink } from 'lucide-react';
import { useOrder } from '../context/OrderContext';
import OrderSummary from './OrderSummary';
import TourButton from './TourButton';
import LocationSelectionPage from '../pages/LocationSelectionPage';
import PaymentMethodSelection from './PaymentMethodSelection';
import { Location } from '../types';
import { useDriverTour } from '../hooks/useDriverTour';

interface DeliveryFormProps {
  onBack: () => void;
}

const deliveryFormTourSteps = [
  {
    element: '[data-tour="delivery-form"]',
    popover: {
      title: '📝 Datos de Entrega',
      description: 'Completa todos tus datos personales y dirección de entrega. Todos los campos son obligatorios.',
      side: 'left'
    }
  },
  {
    element: '[data-tour="order-summary-delivery"]',
    popover: {
      title: '💰 Resumen Final',
      description: 'Revisa una vez más tu pedido y el total antes de continuar.',
      side: 'left'
    }
  },
  {
    element: '[data-tour="continue-button"]',
    popover: {
      title: '➡️ Continuar al Pago',
      description: 'Una vez completados todos los datos, continúa para seleccionar tu método de pago.',
      side: 'top'
    }
  }
];

const DeliveryForm: React.FC<DeliveryFormProps> = ({ onBack }) => {
  const navigate = useNavigate();
  const { cart, total, clearCart, orderNumber } = useOrder();
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [showLocationSelection, setShowLocationSelection] = useState(true);
  const [showPaymentSelection, setShowPaymentSelection] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    neighborhood: '',
    phone: '',
    cedula: '',
    email: '',
    requiresInvoice: false,
    dataProcessingAuthorized: false
  });
  const [showTourButton, setShowTourButton] = useState(true);

  const { startTour } = useDriverTour({
    steps: deliveryFormTourSteps,
    onDestroyed: () => {
      setShowTourButton(false);
      setTimeout(() => {
        setShowTourButton(true);
      }, 30000);
    }
  });

  // Auto-start tour for first-time users (only when form is visible)
  useEffect(() => {
    if (!showLocationSelection && !showPaymentSelection && selectedLocation) {
      const hasSeenTour = localStorage.getItem('parrilleros-delivery-form-tour-seen');
      if (!hasSeenTour) {
        const timer = setTimeout(() => {
          startTour();
          localStorage.setItem('parrilleros-delivery-form-tour-seen', 'true');
        }, 1500);
        return () => clearTimeout(timer);
      }
    }
  }, [startTour, showLocationSelection, showPaymentSelection, selectedLocation]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleLocationSelected = (location: Location) => {
    setSelectedLocation(location);
    setShowLocationSelection(false);
  };

  const handleBackToLocationSelection = () => {
    setShowLocationSelection(true);
  };

  const handleBackFromPayment = () => {
    setShowPaymentSelection(false);
  };

  const handleStartTour = () => {
    startTour();
  };

  const isFormValid = () => {
    const basicFieldsValid = selectedLocation &&
           formData.name && 
           formData.address && 
           formData.neighborhood && 
           formData.phone && 
           cart.length > 0 &&
           formData.dataProcessingAuthorized;

    // Si requiere factura, validar campos adicionales
    if (formData.requiresInvoice) {
      return basicFieldsValid && formData.cedula && formData.email;
    }

    return basicFieldsValid;
  };

  const handleContinueToPayment = () => {
    if (!isFormValid() || !selectedLocation) return;
    setShowPaymentSelection(true);
  };

  const handlePaymentMethodSelected = (paymentMethod: string, paymentData?: any) => {
    // Generar contenido del ticket para WhatsApp
    const generateWhatsAppMessage = () => {
      const subtotal = total * 0.92;
      const iva = total * 0.08;

      const cartDetails = cart.map((item, index) => {
        const basePrice = item.withFries ? (item.menuItem.priceWithFries || item.menuItem.price) : item.menuItem.price;
        const customizationsTotal = item.customizations.reduce((sum, option) => sum + option.price, 0);
        const itemSubtotal = (basePrice + customizationsTotal) * item.quantity;
        
        let itemText = `${index + 1}. ${item.menuItem.name}`;
        if (item.withFries) {
          itemText += ' + Papas';
        }
        itemText += ` x${item.quantity} - $${Math.round(itemSubtotal).toLocaleString()}`;
        
        if (item.customizations.length > 0) {
          itemText += `\n   + ${item.customizations.map(c => c.name.replace('AD ', '')).join(', ')}`;
        }
        
        if (item.specialInstructions) {
          itemText += `\n   * ${item.specialInstructions}`;
        }
        
        return itemText;
      }).join('\n\n');

      const invoiceInfo = formData.requiresInvoice ? 
        `\n📄 FACTURA REQUERIDA\nCC: ${formData.cedula} | Email: ${formData.email}` : 
        '\n📄 Sin factura';

      const paymentInfo = paymentMethod === 'mercadopago' 
        ? `\n💳 PAGO: MercadoPago (${paymentData?.status === 'approved' ? 'PAGADO' : 'PENDIENTE'})\nID: ${paymentData?.paymentId || 'N/A'}`
        : `\n💳 PAGO: ${paymentMethod === 'delivery' ? 'Pago en domicilio' : paymentMethod}`;

      return `🍔 NUEVO PEDIDO DOMICILIO - PARRILLEROS
═══════════════════════════════════════

📋 PEDIDO #${orderNumber.toString().padStart(3, '0')} | ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}

👤 CLIENTE
${formData.name}
📱 ${formData.phone}${invoiceInfo}

📍 ENTREGA
${formData.address}, ${formData.neighborhood}

🛒 PRODUCTOS
${cartDetails}

💰 DESGLOSE DE COSTOS
• Subtotal: $${Math.round(subtotal).toLocaleString()}
• IVA (8%): $${Math.round(iva).toLocaleString()}
• TOTAL: $${Math.round(total).toLocaleString()}
${paymentInfo}

⏰ Tiempo estimado: 45-60 minutos

${paymentMethod === 'mercadopago' && paymentData?.status === 'approved' ? '✅ PEDIDO PAGADO - PROCESAR INMEDIATAMENTE' : '📞 CONFIRMAR PEDIDO Y COORDINAR ENTREGA'}

📍 ${selectedLocation?.name} | ${selectedLocation?.phone}`;
    };

    // Enviar mensaje a WhatsApp
    const message = generateWhatsAppMessage();
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${selectedLocation?.whatsapp}?text=${encodedMessage}`;

    // Abrir WhatsApp
    window.open(whatsappUrl, '_blank');

    // Limpiar carrito y navegar al inicio
    setTimeout(() => {
      clearCart();
      navigate('/');
    }, 2000);
  };

  // Show location selection page
  if (showLocationSelection) {
    return (
      <LocationSelectionPage
        onLocationSelected={handleLocationSelected}
        onBack={onBack}
      />
    );
  }

  // Show payment method selection
  if (showPaymentSelection) {
    return (
      <PaymentMethodSelection
        onBack={handleBackFromPayment}
        onPaymentSelected={handlePaymentMethodSelected}
        orderData={{
          formData,
          selectedLocation,
          cart,
          total,
          orderNumber
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center mb-4">
            <button
              onClick={handleBackToLocationSelection}
              className="mr-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800 flex items-center">
                <Truck size={28} className="mr-2 text-[#FF8C00]" />
                Datos de Entrega
              </h1>
              <p className="text-gray-600">Completa tus datos para procesar tu pedido</p>
            </div>
          </div>
          
          {/* Selected Location Info */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <CheckCircle size={16} className="text-green-600" />
              </div>
              <div>
                <p className="font-medium text-green-800">
                  Sede seleccionada: <span className="font-heavyrust-primary">{selectedLocation?.name}</span>
                </p>
                <p className="text-sm text-green-600">
                  {selectedLocation?.address} | {selectedLocation?.phone}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Form */}
          <div className="space-y-6">
            {/* Form */}
            <div className="bg-white rounded-lg shadow-md p-6" data-tour="delivery-form">
              <h2 className="text-xl font-bold mb-6 text-gray-800">Información Personal</h2>
              
              <div className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User size={16} className="inline mr-2" />
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8C00] focus:border-transparent"
                    placeholder="Ingresa tu nombre completo"
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin size={16} className="inline mr-2" />
                    Dirección *
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8C00] focus:border-transparent"
                    placeholder="Calle, carrera, número"
                  />
                </div>

                {/* Neighborhood */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Barrio *
                  </label>
                  <input
                    type="text"
                    value={formData.neighborhood}
                    onChange={(e) => handleInputChange('neighborhood', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8C00] focus:border-transparent"
                    placeholder="Escribe el nombre de tu barrio"
                  />
                  <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-xs text-blue-800 font-medium mb-1">
                      📍 Zonas de entrega para <span className="font-heavyrust-primary">{selectedLocation?.name}</span>:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {selectedLocation?.deliveryZones.map((zone, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs"
                        >
                          {zone}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone size={16} className="inline mr-2" />
                    Número de celular *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8C00] focus:border-transparent"
                    placeholder="3001234567"
                  />
                </div>

                {/* Invoice Option */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.requiresInvoice}
                      onChange={(e) => handleInputChange('requiresInvoice', e.target.checked)}
                      className="w-4 h-4 accent-[#FF8C00] mr-3"
                    />
                    <div>
                      <span className="font-medium text-gray-800 flex items-center">
                        <Receipt size={16} className="mr-2 text-[#FF8C00]" />
                        ¿Requiere factura a su nombre?
                      </span>
                      <p className="text-sm text-gray-600 mt-1">
                        Si necesita factura, marque esta opción y complete los campos adicionales
                      </p>
                    </div>
                  </label>
                </div>

                {/* Conditional fields for invoice */}
                {formData.requiresInvoice && (
                  <div className="space-y-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h3 className="font-medium text-gray-800 mb-3">Datos para facturación</h3>
                    
                    {/* Cedula */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <FileText size={16} className="inline mr-2" />
                        Número de cédula *
                      </label>
                      <input
                        type="text"
                        value={formData.cedula}
                        onChange={(e) => handleInputChange('cedula', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8C00] focus:border-transparent"
                        placeholder="12345678"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Mail size={16} className="inline mr-2" />
                        Correo electrónico *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8C00] focus:border-transparent"
                        placeholder="tu@email.com"
                      />
                    </div>
                  </div>
                )}

                {/* Data Processing Authorization */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <label className="flex items-start cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.dataProcessingAuthorized}
                      onChange={(e) => handleInputChange('dataProcessingAuthorized', e.target.checked)}
                      className="w-4 h-4 accent-[#FF8C00] mr-3 mt-1 flex-shrink-0"
                    />
                    <div className="text-sm">
                      <span className="font-medium text-gray-800">
                        Autorizo el tratamiento de mis datos personales *
                      </span>
                      <p className="text-gray-600 mt-1">
                        Acepto que mis datos personales sean utilizados para procesar mi pedido y contactarme. 
                        <a 
                          href="/privacy-policy" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-[#FF8C00] hover:text-orange-600 font-medium ml-1 inline-flex items-center"
                        >
                          Ver política de tratamiento de datos
                          <ExternalLink size={12} className="ml-1" />
                        </a>
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Continue Button */}
              <button
                data-tour="continue-button"
                onClick={handleContinueToPayment}
                disabled={!isFormValid()}
                className={`w-full mt-6 py-4 font-bold rounded-lg text-lg flex items-center justify-center transition-all ${
                  isFormValid()
                    ? 'bg-[#FF8C00] text-white hover:bg-orange-600 shadow-lg hover:shadow-xl transform hover:scale-[1.02]'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <ArrowRight size={20} className="mr-2" />
                Continuar al Pago
              </button>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="bg-white rounded-lg shadow-md p-6" data-tour="order-summary-delivery">
            <OrderSummary />
          </div>
        </div>

        {/* Tour Button - Pequeño en esquina inferior izquierda */}
        {showTourButton && !showPaymentSelection && (
          <TourButton 
            onStartTour={handleStartTour}
            variant="floating"
            size="sm"
            className="bottom-6 left-6"
          />
        )}
      </div>
    </div>
  );
};

export default DeliveryForm;