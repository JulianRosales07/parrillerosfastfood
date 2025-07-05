import React, { useState, useEffect } from 'react';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { CreditCard, Loader, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';
import { useOrder } from '../context/OrderContext';

interface MercadoPagoCheckoutProps {
  onBack: () => void;
  onSuccess: (paymentData: any) => void;
  onError: (error: any) => void;
}

// Inicializar MercadoPago con tu Public Key
// IMPORTANTE: Reemplaza con tu Public Key real de MercadoPago
const MERCADOPAGO_PUBLIC_KEY = 'APP_USR-9b9bee5a-12ac-424e-a335-0da0788c973c'; // Cambia por tu clave real

const MercadoPagoCheckout: React.FC<MercadoPagoCheckoutProps> = ({
  onBack,
  onSuccess,
  onError
}) => {
  const { cart, total, orderNumber } = useOrder();
  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Inicializar MercadoPago
  useEffect(() => {
    try {
      initMercadoPago(MERCADOPAGO_PUBLIC_KEY, {
        locale: 'es-CO'
      });
    } catch (err) {
      console.error('Error inicializando MercadoPago:', err);
      setError('Error al inicializar el sistema de pagos');
    }
  }, []);

  // Crear preferencia de pago
  useEffect(() => {
    const createPreference = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Preparar items para MercadoPago
        const items = cart.map((item) => {
          const basePrice = item.withFries 
            ? (item.menuItem.priceWithFries || item.menuItem.price) 
            : item.menuItem.price;
          
          const customizationsTotal = item.customizations.reduce(
            (sum, option) => sum + option.price,
            0
          );

          const unitPrice = basePrice + customizationsTotal;

          let title = item.menuItem.name;
          if (item.withFries) title += ' + Papas';
          if (item.customizations.length > 0) {
            title += ` (${item.customizations.map(c => c.name.replace('AD ', '')).join(', ')})`;
          }

          return {
            id: item.id,
            title: title,
            description: item.menuItem.description,
            quantity: item.quantity,
            unit_price: unitPrice,
            currency_id: 'COP'
          };
        });

        // Get current origin dynamically
        const currentOrigin = window.location.origin;

        // Datos de la preferencia optimizada para mostrar todos los métodos de pago
        const preferenceData = {
          items: items,
          payer: {
            email: 'cliente@parrilleros.com' // Email por defecto
          },
          // Configuración optimizada para mostrar TODOS los métodos de pago disponibles
          payment_methods: {
            // No excluir ningún tipo de pago (permite tarjetas, PSE, Nequi, Efecty, etc.)
            excluded_payment_types: [],
            // No excluir métodos específicos
            excluded_payment_methods: [],
            // Permitir cuotas para tarjetas de crédito
            installments: 12,
            // Configuración adicional para Colombia
            default_payment_method_id: null,
            default_installments: 1
          },
          back_urls: {
            success: `${currentOrigin}/payment-success`,
            failure: `${currentOrigin}/payment-failure`,
            pending: `${currentOrigin}/payment-pending`
          },
          external_reference: `PARRILLEROS-${orderNumber}`,
          statement_descriptor: 'PARRILLEROS FAST FOOD',
          metadata: {
            order_number: orderNumber,
            restaurant: 'Parrilleros Fast Food'
          },
          // Configuraciones adicionales para optimizar la experiencia
          expires: false, // No expira
          purpose: 'wallet_purchase' // Optimizado para compras
        };

        console.log('Enviando datos a la API:', preferenceData);

        // Llamar a tu backend para crear la preferencia
        const response = await fetch('http://localhost:3001/api/create-preference', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(preferenceData)
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error('Error response from server:', errorData);
          throw new Error(errorData.details || 'Error al crear la preferencia de pago');
        }

        const data = await response.json();
        console.log('Preferencia creada:', data);
        setPreferenceId(data.id);
        
      } catch (err) {
        console.error('Error creando preferencia:', err);
        setError(`Error al preparar el pago: ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    if (cart.length > 0) {
      createPreference();
    }
  }, [cart, total, orderNumber]);

  const handlePaymentSuccess = (paymentData: any) => {
    console.log('Pago exitoso:', paymentData);
    onSuccess(paymentData);
  };

  const handlePaymentError = (error: any) => {
    console.error('Error en el pago:', error);
    onError(error);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="animate-spin w-16 h-16 border-4 border-[#FF8C00] border-t-transparent rounded-full mx-auto mb-6"></div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Preparando tu pago</h2>
          <p className="text-gray-600">Configurando MercadoPago...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle size={32} className="text-red-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Error en el pago</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="space-y-3">
            <button
              onClick={() => window.location.reload()}
              className="w-full py-3 bg-[#FF8C00] text-white font-bold rounded-lg hover:bg-orange-600 transition-colors"
            >
              Intentar nuevamente
            </button>
            <button
              onClick={onBack}
              className="w-full py-3 bg-gray-200 text-gray-800 font-bold rounded-lg hover:bg-gray-300 transition-colors"
            >
              Volver al carrito
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center mb-4">
            <button
              onClick={onBack}
              className="mr-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800 flex items-center">
                <CreditCard size={28} className="mr-2 text-[#FF8C00]" />
                Pagar con MercadoPago
              </h1>
              <p className="text-gray-600">Elige tu método de pago preferido</p>
            </div>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <CheckCircle size={16} className="text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-blue-800">
                  Pedido #{orderNumber.toString().padStart(3, '0')} - Total: ${Math.round(total).toLocaleString()}
                </p>
                <p className="text-sm text-blue-600">
                  Pago seguro procesado por MercadoPago
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Resumen del pedido */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Resumen del Pedido</h2>
            <div className="space-y-3">
              {cart.map((item) => {
                const basePrice = item.withFries 
                  ? (item.menuItem.priceWithFries || item.menuItem.price) 
                  : item.menuItem.price;
                
                const customizationsTotal = item.customizations.reduce(
                  (sum, option) => sum + option.price,
                  0
                );

                const itemTotal = (basePrice + customizationsTotal) * item.quantity;

                return (
                  <div key={item.id} className="flex justify-between items-start p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-800">
                        {item.menuItem.name}
                        {item.withFries && ' + Papas'}
                      </h3>
                      {item.customizations.length > 0 && (
                        <p className="text-sm text-gray-600">
                          + {item.customizations.map(c => c.name.replace('AD ', '')).join(', ')}
                        </p>
                      )}
                      <p className="text-sm text-gray-500">Cantidad: {item.quantity}</p>
                    </div>
                    <span className="font-bold text-[#FF8C00]">
                      ${Math.round(itemTotal).toLocaleString()}
                    </span>
                  </div>
                );
              })}
            </div>
            
            <div className="border-t border-gray-200 pt-4 mt-4">
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span className="text-[#FF8C00]">${Math.round(total).toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Información de métodos de pago */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Métodos de Pago Disponibles</h2>
            <div className="space-y-4">
              <div className="flex items-center p-3 bg-green-50 rounded-lg">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <CheckCircle size={16} className="text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-green-800">💳 Tarjetas de Crédito y Débito</p>
                  <p className="text-sm text-green-600">Visa, Mastercard, American Express</p>
                </div>
              </div>
              
              <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <CheckCircle size={16} className="text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-blue-800">🏦 PSE (Débito Online)</p>
                  <p className="text-sm text-blue-600">Pago directo desde tu banco</p>
                </div>
              </div>

              <div className="flex items-center p-3 bg-purple-50 rounded-lg">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                  <CheckCircle size={16} className="text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-purple-800">📱 Billeteras Digitales</p>
                  <p className="text-sm text-purple-600">Nequi, Daviplata, y más</p>
                </div>
              </div>

              <div className="flex items-center p-3 bg-orange-50 rounded-lg">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                  <CheckCircle size={16} className="text-orange-600" />
                </div>
                <div>
                  <p className="font-medium text-orange-800">💰 Efectivo</p>
                  <p className="text-sm text-orange-600">Efecty, Baloto, y otros puntos</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Widget de MercadoPago */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-6 text-gray-800 text-center">
            Selecciona tu método de pago preferido
          </h2>
          
          {preferenceId ? (
            <div className="max-w-md mx-auto">
              <Wallet
                initialization={{
                  preferenceId: preferenceId,
                }}
                customization={{
                  texts: {
                    valueProp: 'smart_option',
                  },
                  visual: {
                    buttonBackground: 'default',
                    borderRadius: '8px',
                  },
                }}
                onSubmit={handlePaymentSuccess}
                onError={handlePaymentError}
                onReady={() => console.log('MercadoPago Wallet ready')}
              />
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="animate-spin w-8 h-8 border-4 border-[#FF8C00] border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-600">Cargando métodos de pago...</p>
            </div>
          )}
        </div>

        {/* Información de seguridad */}
        <div className="mt-6 bg-gray-100 rounded-lg p-6">
          <h3 className="font-bold text-gray-800 mb-3 text-center">🔒 Pago 100% Seguro</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
            <div className="flex items-center justify-center">
              <CheckCircle size={16} className="mr-2 text-green-600" />
              <span>Encriptación SSL</span>
            </div>
            <div className="flex items-center justify-center">
              <CheckCircle size={16} className="mr-2 text-green-600" />
              <span>Datos protegidos</span>
            </div>
            <div className="flex items-center justify-center">
              <CheckCircle size={16} className="mr-2 text-green-600" />
              <span>Procesamiento inmediato</span>
            </div>
          </div>
          <p className="text-center text-xs text-gray-500 mt-4">
            Una vez completado el pago, tu pedido será enviado automáticamente por WhatsApp a la sede seleccionada.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MercadoPagoCheckout;