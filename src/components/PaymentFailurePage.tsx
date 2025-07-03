import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AlertCircle, ArrowLeft, RefreshCw, Home, CreditCard } from 'lucide-react';

const PaymentFailurePage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const paymentId = searchParams.get('payment_id');
  const status = searchParams.get('status');
  const statusDetail = searchParams.get('status_detail');

  const getErrorMessage = (status: string | null, statusDetail: string | null) => {
    if (status === 'rejected') {
      switch (statusDetail) {
        case 'cc_rejected_insufficient_amount':
          return 'Fondos insuficientes en tu tarjeta';
        case 'cc_rejected_bad_filled_security_code':
          return 'Código de seguridad incorrecto';
        case 'cc_rejected_bad_filled_date':
          return 'Fecha de vencimiento incorrecta';
        case 'cc_rejected_bad_filled_other':
          return 'Revisa los datos de tu tarjeta';
        case 'cc_rejected_blacklist':
          return 'Tu tarjeta no está autorizada';
        case 'cc_rejected_call_for_authorize':
          return 'Debes autorizar el pago con tu banco';
        case 'cc_rejected_card_disabled':
          return 'Tu tarjeta está deshabilitada';
        case 'cc_rejected_duplicated_payment':
          return 'Ya realizaste un pago similar recientemente';
        case 'cc_rejected_high_risk':
          return 'Pago rechazado por seguridad';
        default:
          return 'El pago fue rechazado por tu banco';
      }
    }
    return 'Hubo un problema procesando tu pago';
  };

  const getSuggestion = (statusDetail: string | null) => {
    switch (statusDetail) {
      case 'cc_rejected_insufficient_amount':
        return 'Verifica el saldo de tu tarjeta o usa otro método de pago';
      case 'cc_rejected_bad_filled_security_code':
      case 'cc_rejected_bad_filled_date':
      case 'cc_rejected_bad_filled_other':
        return 'Revisa cuidadosamente los datos de tu tarjeta';
      case 'cc_rejected_call_for_authorize':
        return 'Contacta a tu banco para autorizar el pago';
      case 'cc_rejected_card_disabled':
        return 'Contacta a tu banco o usa otra tarjeta';
      case 'cc_rejected_duplicated_payment':
        return 'Espera unos minutos antes de intentar nuevamente';
      default:
        return 'Intenta con otro método de pago o contacta a tu banco';
    }
  };

  const handleRetryPayment = () => {
    navigate('/cart');
  };

  const handleGoHome = () => {
    navigate('/');
  };

  const handleTryAgain = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full">
        {/* Header de error */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle size={48} className="text-red-600" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Pago No Procesado 😔
          </h1>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800 font-semibold mb-2">
              ❌ {getErrorMessage(status, statusDetail)}
            </p>
            <p className="text-sm text-red-700">
              💡 {getSuggestion(statusDetail)}
            </p>
          </div>
        </div>

        {/* Información del error */}
        {paymentId && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-8">
            <h3 className="font-bold text-gray-800 mb-3">📋 Detalles del Error:</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">ID de Transacción:</span>
                <span className="font-medium">{paymentId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Estado:</span>
                <span className="font-medium text-red-600">{status?.toUpperCase()}</span>
              </div>
              {statusDetail && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Detalle:</span>
                  <span className="font-medium">{statusDetail}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600">Fecha:</span>
                <span className="font-medium">{new Date().toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}

        {/* Opciones de solución */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h3 className="font-bold text-blue-800 mb-4">🔧 ¿Qué puedes hacer?</h3>
          <div className="space-y-3">
            <div className="flex items-start">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                <span className="text-blue-600 text-sm font-bold">1</span>
              </div>
              <div>
                <p className="font-medium text-blue-800">Verificar datos de la tarjeta</p>
                <p className="text-sm text-blue-600">Asegúrate de que el número, fecha y CVV sean correctos</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                <span className="text-blue-600 text-sm font-bold">2</span>
              </div>
              <div>
                <p className="font-medium text-blue-800">Probar otro método de pago</p>
                <p className="text-sm text-blue-600">Usa otra tarjeta, PSE o efectivo en Efecty</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                <span className="text-blue-600 text-sm font-bold">3</span>
              </div>
              <div>
                <p className="font-medium text-blue-800">Contactar a tu banco</p>
                <p className="text-sm text-blue-600">Si el problema persiste, verifica con tu entidad financiera</p>
              </div>
            </div>
          </div>
        </div>

        {/* Métodos de pago alternativos */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
          <h3 className="font-bold text-green-800 mb-4">💳 Métodos de Pago Disponibles:</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <CreditCard size={24} className="text-green-600" />
              </div>
              <p className="text-sm font-medium text-green-800">Tarjetas</p>
              <p className="text-xs text-green-600">Crédito/Débito</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <span className="text-green-600 text-lg">🏦</span>
              </div>
              <p className="text-sm font-medium text-green-800">PSE</p>
              <p className="text-xs text-green-600">Débito online</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <span className="text-green-600 text-lg">💰</span>
              </div>
              <p className="text-sm font-medium text-green-800">Efecty</p>
              <p className="text-xs text-green-600">Pago en efectivo</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <span className="text-green-600 text-lg">📱</span>
              </div>
              <p className="text-sm font-medium text-green-800">Nequi</p>
              <p className="text-xs text-green-600">Billetera digital</p>
            </div>
          </div>
        </div>

        {/* Acciones */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={handleRetryPayment}
              className="py-3 bg-[#FF8C00] text-white font-bold rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center"
            >
              <RefreshCw size={20} className="mr-2" />
              Intentar Nuevamente
            </button>
            
            <button
              onClick={handleTryAgain}
              className="py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              <CreditCard size={20} className="mr-2" />
              Otro Método de Pago
            </button>
          </div>

          <button
            onClick={handleGoHome}
            className="w-full py-3 bg-gray-200 text-gray-800 font-bold rounded-lg hover:bg-gray-300 transition-colors flex items-center justify-center"
          >
            <Home size={20} className="mr-2" />
            Volver al Inicio
          </button>
        </div>

        {/* Ayuda */}
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>🆘 ¿Necesitas ayuda?</strong> Si continúas teniendo problemas, 
            contacta a nuestro personal en el mostrador o llama a cualquiera de nuestras sedes. 
            Menciona el ID de transacción: <strong>{paymentId}</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailurePage;