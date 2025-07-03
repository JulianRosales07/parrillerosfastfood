import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, Download, Printer, Home, Clock, Truck } from 'lucide-react';
import { useOrder } from '../context/OrderContext';
import OrderSummary from './OrderSummary';

const PaymentSuccessPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { cart, total, orderNumber, clearCart } = useOrder();
  const [paymentData, setPaymentData] = useState<any>(null);

  // Obtener datos del pago desde los parámetros de URL
  useEffect(() => {
    const paymentId = searchParams.get('payment_id');
    const status = searchParams.get('status');
    const externalReference = searchParams.get('external_reference');
    const merchantOrderId = searchParams.get('merchant_order_id');

    if (paymentId && status) {
      setPaymentData({
        paymentId,
        status,
        externalReference,
        merchantOrderId
      });

      // Si el pago fue aprobado, verificar con el backend
      if (status === 'approved') {
        verifyPayment(paymentId);
      }
    }
  }, [searchParams]);

  const verifyPayment = async (paymentId: string) => {
    try {
      const response = await fetch(`/api/verify-payment/${paymentId}`);
      const data = await response.json();
      
      if (data.status === 'approved') {
        console.log('Pago verificado exitosamente');
        // Aquí puedes actualizar el estado del pedido en tu base de datos
      }
    } catch (error) {
      console.error('Error verificando el pago:', error);
    }
  };

  const generateTicketContent = () => {
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

    return `🍔 PEDIDO PAGADO - PARRILLEROS FAST FOOD
═══════════════════════════════════════

📋 PEDIDO #${orderNumber.toString().padStart(3, '0')} | ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}

💳 PAGO PROCESADO POR MERCADOPAGO
ID de Pago: ${paymentData?.paymentId || 'N/A'}
Estado: ${paymentData?.status === 'approved' ? 'APROBADO' : 'PENDIENTE'}

🛒 PRODUCTOS
${cartDetails}

💰 DESGLOSE DE COSTOS
• Subtotal: $${Math.round(subtotal).toLocaleString()}
• IVA (8%): $${Math.round(iva).toLocaleString()}
• TOTAL PAGADO: $${Math.round(total).toLocaleString()}

⏰ Tiempo estimado: 15-20 minutos
📍 Recoger en mostrador

¡GRACIAS POR TU COMPRA!`;
  };

  const handleDownloadTicket = () => {
    const ticketContent = generateTicketContent();
    const blob = new Blob([ticketContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Ticket_Parrilleros_${orderNumber.toString().padStart(3, '0')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handlePrintTicket = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Ticket Parrilleros #${orderNumber.toString().padStart(3, '0')}</title>
            <style>
              body { font-family: monospace; font-size: 12px; line-height: 1.4; margin: 20px; }
              .header { text-align: center; margin-bottom: 20px; }
              .section { margin-bottom: 15px; }
              .section-title { font-weight: bold; margin-bottom: 5px; }
              .item { margin-bottom: 10px; }
              .total { font-weight: bold; font-size: 14px; }
            </style>
          </head>
          <body>
            <pre>${generateTicketContent()}</pre>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const handleFinish = () => {
    clearCart();
    navigate('/');
  };

  if (!paymentData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="animate-spin w-16 h-16 border-4 border-[#FF8C00] border-t-transparent rounded-full mx-auto mb-6"></div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Procesando pago</h2>
          <p className="text-gray-600">Verificando el estado de tu transacción...</p>
        </div>
      </div>
    );
  }

  const isApproved = paymentData.status === 'approved';
  const subtotal = total * 0.92;
  const iva = total * 0.08;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full">
        {/* Header de éxito */}
        <div className="text-center mb-8">
          <div className={`w-20 h-20 ${isApproved ? 'bg-green-100' : 'bg-yellow-100'} rounded-full flex items-center justify-center mx-auto mb-6`}>
            <CheckCircle size={48} className={isApproved ? 'text-green-600' : 'text-yellow-600'} />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {isApproved ? '¡Pago Exitoso! 🎉' : 'Pago en Proceso ⏳'}
          </h1>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-blue-800 font-semibold mb-2">
              {isApproved 
                ? '✅ Tu pago ha sido procesado correctamente' 
                : '⏳ Tu pago está siendo verificado'
              }
            </p>
            <div className="text-sm text-blue-700 space-y-1">
              <p><strong>ID de Pago:</strong> {paymentData.paymentId}</p>
              <p><strong>Estado:</strong> {paymentData.status.toUpperCase()}</p>
              <p><strong>Referencia:</strong> {paymentData.externalReference}</p>
            </div>
          </div>
        </div>

        {/* Información del pedido */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">📋 Número de pedido:</span>
              <span className="font-bold text-[#FF8C00]">#{orderNumber.toString().padStart(3, '0')}</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">💳 Método de pago:</span>
              <span className="font-medium">MercadoPago</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">💰 Total pagado:</span>
              <span className="font-bold text-[#FF8C00]">${Math.round(total).toLocaleString()}</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <Clock size={20} className="text-green-600 mr-2" />
                <span className="font-bold text-green-800">Tiempo estimado</span>
              </div>
              <p className="text-2xl font-bold text-green-600">15-20 minutos</p>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <Truck size={20} className="text-orange-600 mr-2" />
                <span className="font-bold text-orange-800">Recoger en mostrador</span>
              </div>
              <p className="text-sm text-orange-700">
                Presenta este comprobante al recoger tu pedido
              </p>
            </div>
          </div>
        </div>

        {/* Desglose de costos */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h3 className="font-bold text-blue-800 mb-4">💰 Desglose de Costos:</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-blue-700">Subtotal:</span>
              <span className="font-medium">${Math.round(subtotal).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-700">IVA (8%):</span>
              <span className="font-medium">${Math.round(iva).toLocaleString()}</span>
            </div>
            <div className="border-t border-blue-300 pt-2 mt-2">
              <div className="flex justify-between font-bold text-base">
                <span className="text-blue-800">TOTAL PAGADO:</span>
                <span className="text-[#FF8C00]">${Math.round(total).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Resumen del pedido */}
        <div className="mb-8">
          <h3 className="font-bold text-gray-800 mb-4">🛒 Resumen del pedido:</h3>
          <div className="max-h-40 overflow-y-auto">
            <OrderSummary showItems isReceipt />
          </div>
        </div>

        {/* Acciones */}
        <div className="space-y-4">
          <div className="flex gap-3">
            <button
              onClick={handleDownloadTicket}
              className="flex-1 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              <Download size={18} className="mr-2" />
              Descargar Comprobante
            </button>
            <button
              onClick={handlePrintTicket}
              className="flex-1 py-3 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center"
            >
              <Printer size={18} className="mr-2" />
              Imprimir
            </button>
          </div>

          <button
            onClick={handleFinish}
            className="w-full py-4 bg-[#FF8C00] text-white font-bold rounded-lg hover:bg-orange-600 transition-colors shadow-lg flex items-center justify-center"
          >
            <Home size={20} className="mr-2" />
            Finalizar y Volver al Inicio
          </button>
        </div>

        {/* Nota importante */}
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>📱 Importante:</strong> Guarda este comprobante y preséntalo al recoger tu pedido. 
            Si tienes algún problema, contacta a nuestro personal con el ID de pago.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;