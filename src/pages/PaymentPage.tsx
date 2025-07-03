import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, CheckCircle, Truck, ArrowLeft } from 'lucide-react';
import Layout from '../components/Layout';
import OrderSummary from '../components/OrderSummary';
import MercadoPagoCheckout from '../components/MercadoPagoCheckout';
import { useOrder } from '../context/OrderContext';

const PaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const { cart, total, completeOrder } = useOrder();
  const [showMercadoPago, setShowMercadoPago] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<string>('');

  const handleBack = () => {
    navigate('/cart');
  };

  const handleSelectPaymentMethod = (method: string) => {
    setPaymentMethod(method);
    
    if (method === 'mercadopago') {
      setShowMercadoPago(true);
    } else if (method === 'delivery') {
      // Redirigir al formulario de domicilio
      navigate('/cart'); // Esto debería ir al DeliveryForm
    }
  };

  const handleMercadoPagoSuccess = (paymentData: any) => {
    console.log('Pago exitoso:', paymentData);
    completeOrder();
    navigate('/payment-success');
  };

  const handleMercadoPagoError = (error: any) => {
    console.error('Error en el pago:', error);
    navigate('/payment-failure');
  };

  const handleBackFromMercadoPago = () => {
    setShowMercadoPago(false);
    setPaymentMethod('');
  };

  if (showMercadoPago) {
    return (
      <MercadoPagoCheckout
        onBack={handleBackFromMercadoPago}
        onSuccess={handleMercadoPagoSuccess}
        onError={handleMercadoPagoError}
      />
    );
  }

  return (
    <Layout title="Método de Pago" showBack onBack={handleBack}>
      <div className="container mx-auto max-w-4xl py-6 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Resumen del pedido */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <OrderSummary />
          </div>

          {/* Métodos de pago */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-6 text-gray-800 flex items-center">
              <CreditCard size={24} className="mr-2 text-[#FF8C00]" />
              Selecciona tu método de pago
            </h2>

            <div className="space-y-4">
              {/* Pago con MercadoPago */}
              <button
                onClick={() => handleSelectPaymentMethod('mercadopago')}
                className={`w-full p-6 rounded-xl border-2 transition-all hover:shadow-lg ${
                  paymentMethod === 'mercadopago'
                    ? 'border-[#FF8C00] bg-orange-50 shadow-md'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                      <CreditCard size={32} className="text-blue-600" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-lg font-bold text-gray-800">Pagar con MercadoPago</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Tarjetas, PSE, Efecty, Nequi y más
                      </p>
                      <div className="flex items-center mt-2">
                        <CheckCircle size={16} className="text-green-600 mr-2" />
                        <span className="text-sm text-green-600 font-medium">Pago seguro y rápido</span>
                      </div>
                    </div>
                  </div>
                  {paymentMethod === 'mercadopago' && (
                    <div className="w-6 h-6 bg-[#FF8C00] rounded-full flex items-center justify-center">
                      <CheckCircle size={16} className="text-white" />
                    </div>
                  )}
                </div>
              </button>

              {/* Pago en domicilio */}
              <button
                onClick={() => handleSelectPaymentMethod('delivery')}
                className={`w-full p-6 rounded-xl border-2 transition-all hover:shadow-lg ${
                  paymentMethod === 'delivery'
                    ? 'border-[#FF8C00] bg-orange-50 shadow-md'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                      <Truck size={32} className="text-green-600" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-lg font-bold text-gray-800">Pagar en Domicilio</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Efectivo, Bancolombia, Nequi, Daviplata
                      </p>
                      <div className="flex items-center mt-2">
                        <CheckCircle size={16} className="text-green-600 mr-2" />
                        <span className="text-sm text-green-600 font-medium">Paga al recibir</span>
                      </div>
                    </div>
                  </div>
                  {paymentMethod === 'delivery' && (
                    <div className="w-6 h-6 bg-[#FF8C00] rounded-full flex items-center justify-center">
                      <CheckCircle size={16} className="text-white" />
                    </div>
                  )}
                </div>
              </button>
            </div>

            {/* Información de seguridad */}
            <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center mb-2">
                <CheckCircle size={20} className="text-blue-600 mr-2" />
                <span className="font-bold text-blue-800">Transacciones Seguras</span>
              </div>
              <p className="text-sm text-blue-700">
                Todos los pagos están protegidos con encriptación SSL y son procesados 
                de forma segura por MercadoPago.
              </p>
            </div>

            {/* Total y continuar */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-bold text-gray-800">Total a pagar:</span>
                <span className="text-2xl font-bold text-[#FF8C00]">
                  ${Math.round(total).toLocaleString()}
                </span>
              </div>
              
              {paymentMethod && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <CheckCircle size={20} className="text-green-600 mr-2" />
                    <span className="font-medium text-green-800">
                      {paymentMethod === 'mercadopago' 
                        ? 'Método seleccionado: MercadoPago' 
                        : 'Método seleccionado: Pago en Domicilio'
                      }
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PaymentPage;