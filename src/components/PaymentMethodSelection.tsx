import React, { useState } from 'react';
import { ArrowLeft, CreditCard, Truck, CheckCircle, AlertCircle } from 'lucide-react';
import MercadoPagoCheckout from './MercadoPagoCheckout';
import OrderSummary from './OrderSummary';

interface PaymentMethodSelectionProps {
  onBack: () => void;
  onPaymentSelected: (paymentMethod: string, paymentData?: any) => void;
  orderData: {
    formData: any;
    selectedLocation: any;
    cart: any[];
    total: number;
    orderNumber: number;
  };
}

const PaymentMethodSelection: React.FC<PaymentMethodSelectionProps> = ({
  onBack,
  onPaymentSelected,
  orderData
}) => {
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [showMercadoPago, setShowMercadoPago] = useState(false);

  const handleSelectPaymentMethod = (method: string) => {
    setSelectedMethod(method);
    
    if (method === 'mercadopago') {
      setShowMercadoPago(true);
    } else if (method === 'delivery') {
      // Pago en domicilio - proceder directamente
      onPaymentSelected('delivery');
    }
  };

  const handleMercadoPagoSuccess = (paymentData: any) => {
    onPaymentSelected('mercadopago', paymentData);
  };

  const handleMercadoPagoError = (error: any) => {
    console.error('Error en el pago:', error);
    setShowMercadoPago(false);
    setSelectedMethod('');
  };

  const handleBackFromMercadoPago = () => {
    setShowMercadoPago(false);
    setSelectedMethod('');
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
                Método de Pago
              </h1>
              <p className="text-gray-600">Selecciona cómo deseas pagar tu pedido</p>
            </div>
          </div>
          
          {/* Order Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-blue-800">
                  Pedido #{orderData.orderNumber.toString().padStart(3, '0')} - {orderData.formData.name}
                </p>
                <p className="text-sm text-blue-600">
                  {orderData.formData.address}, {orderData.formData.neighborhood}
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-[#FF8C00]">
                  ${Math.round(orderData.total).toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">Total a pagar</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Payment Methods */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-6 text-gray-800">
              Selecciona tu método de pago
            </h2>

            <div className="space-y-4">
              {/* Pago con MercadoPago */}
              <button
                onClick={() => handleSelectPaymentMethod('mercadopago')}
                className={`w-full p-6 rounded-xl border-2 transition-all hover:shadow-lg ${
                  selectedMethod === 'mercadopago'
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
                      <h3 className="text-lg font-bold text-gray-800">Pagar Ahora con MercadoPago</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Tarjetas, PSE, Efecty, Nequi y más
                      </p>
                      <div className="flex items-center mt-2">
                        <CheckCircle size={16} className="text-green-600 mr-2" />
                        <span className="text-sm text-green-600 font-medium">Pago inmediato y seguro</span>
                      </div>
                    </div>
                  </div>
                  {selectedMethod === 'mercadopago' && (
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
                  selectedMethod === 'delivery'
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
                        <span className="text-sm text-green-600 font-medium">Paga al recibir tu pedido</span>
                      </div>
                    </div>
                  </div>
                  {selectedMethod === 'delivery' && (
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
                Todos los pagos están protegidos. MercadoPago usa encriptación SSL 
                y los pagos en domicilio son coordinados directamente con nuestro personal.
              </p>
            </div>

            {/* Ventajas de cada método */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-bold text-blue-800 mb-2">💳 Pago Online</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>✅ Pago inmediato</li>
                  <li>✅ Sin contacto físico</li>
                  <li>✅ Comprobante digital</li>
                  <li>✅ Múltiples métodos</li>
                </ul>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-bold text-green-800 mb-2">🚚 Pago en Domicilio</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>✅ Paga al recibir</li>
                  <li>✅ Efectivo o transferencia</li>
                  <li>✅ Confirmas antes de pagar</li>
                  <li>✅ Flexibilidad total</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <OrderSummary />
            
            {/* Customer Info */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="font-bold text-gray-800 mb-4">📋 Datos de Entrega</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Cliente:</span>
                  <span className="font-medium">{orderData.formData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Teléfono:</span>
                  <span className="font-medium">{orderData.formData.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Dirección:</span>
                  <span className="font-medium text-right">
                    {orderData.formData.address}, {orderData.formData.neighborhood}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sede:</span>
                  <span className="font-medium font-heavyrust-primary">{orderData.selectedLocation?.name}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodSelection;