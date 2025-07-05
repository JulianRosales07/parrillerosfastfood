import express from 'express';
import { MercadoPagoConfig, Preference } from 'mercadopago';

const app = express();
const PORT = 3001;

// Eliminar CORS - permitir todas las solicitudes
app.use(express.json());

// Configurar MercadoPago
// IMPORTANTE: Reemplaza con tu Access Token real de MercadoPago
const MERCADOPAGO_ACCESS_TOKEN = 'APP_USR-3422455489449986-070314-8ae7114f290e730ae49b902b6fe44bc8-271204335'; // Cambia por tu token real

const client = new MercadoPagoConfig({
  accessToken: MERCADOPAGO_ACCESS_TOKEN,
  options: { timeout: 15000 } // Aumentado de 5000 a 15000ms para evitar timeouts
});

const preference = new Preference(client);

// Endpoint para crear preferencia de pago
app.post('/api/create-preference', async (req, res) => {
  try {
    console.log('Creando preferencia de pago:', req.body);

    // Validar que el request tenga los datos necesarios
    if (!req.body.items || !Array.isArray(req.body.items) || req.body.items.length === 0) {
      return res.status(400).json({
        error: 'Items son requeridos y deben ser un array no vacío',
        details: 'El campo items es obligatorio'
      });
    }

    // Validar cada item
    for (const item of req.body.items) {
      if (!item.title || !item.quantity || !item.unit_price) {
        return res.status(400).json({
          error: 'Cada item debe tener title, quantity y unit_price',
          details: 'Datos de items incompletos'
        });
      }
    }

    const preferenceData = {
      items: req.body.items.map(item => ({
        id: item.id || `item_${Date.now()}`,
        title: item.title,
        description: item.description || '',
        quantity: parseInt(item.quantity),
        unit_price: parseFloat(item.unit_price),
        currency_id: 'COP'
      })),
      payer: {
        email: req.body.payer?.email || 'cliente@parrilleros.com'
      },
      // Configuración de métodos de pago para mostrar TODAS las opciones disponibles
      payment_methods: {
        // No excluir ningún tipo de pago - esto permite tarjetas, PSE, Nequi, etc.
        excluded_payment_types: [],
        // No excluir métodos específicos
        excluded_payment_methods: [],
        // Permitir cuotas hasta 12 meses para tarjetas de crédito
        installments: 12,
        // Configuración adicional para Colombia
        default_payment_method_id: null,
        default_installments: 1
      },
      back_urls: {
        success: req.body.back_urls?.success || `${req.get('origin') || 'http://localhost:5174'}/payment-success`,
        failure: req.body.back_urls?.failure || `${req.get('origin') || 'http://localhost:5174'}/payment-failure`,
        pending: req.body.back_urls?.pending || `${req.get('origin') || 'http://localhost:5174'}/payment-pending`
      },
      external_reference: req.body.external_reference || `PARRILLEROS-${Date.now()}`,
      statement_descriptor: req.body.statement_descriptor || 'PARRILLEROS FAST FOOD',
      metadata: req.body.metadata || {
        restaurant: 'Parrilleros Fast Food'
      },
      notification_url: `${req.get('origin') || 'http://localhost:3001'}/api/webhook/mercadopago`,
      // Configuraciones adicionales para mejorar la experiencia de pago
      expires: false, // No expira la preferencia
      purpose: 'wallet_purchase' // Optimizado para compras
    };

    console.log('Datos de preferencia procesados:', JSON.stringify(preferenceData, null, 2));

    const result = await preference.create({ body: preferenceData });
    
    console.log('Preferencia creada exitosamente:', result.id);
    
    res.json({
      id: result.id,
      init_point: result.init_point,
      sandbox_init_point: result.sandbox_init_point
    });

  } catch (error) {
    console.error('Error detallado creando preferencia:', {
      message: error.message,
      stack: error.stack,
      response: error.response?.data,
      status: error.response?.status
    });
    
    // Enviar respuesta de error más detallada
    res.status(500).json({
      error: 'Error al crear la preferencia de pago',
      details: error.message,
      mercadopago_error: error.response?.data || null,
      timestamp: new Date().toISOString()
    });
  }
});

// Webhook para recibir notificaciones de MercadoPago
app.post('/api/webhook/mercadopago', async (req, res) => {
  try {
    console.log('Webhook recibido de MercadoPago:', req.body);
    
    const { type, data } = req.body;
    
    if (type === 'payment') {
      const paymentId = data.id;
      console.log('Pago recibido:', paymentId);
      
      // Aquí puedes verificar el estado del pago con MercadoPago API si es necesario
      // y procesar el pedido según corresponda
      
      // Responder a MercadoPago que recibimos la notificación
      res.status(200).send('OK');
    } else {
      res.status(200).send('OK');
    }
  } catch (error) {
    console.error('Error procesando webhook:', error);
    res.status(500).send('Error');
  }
});

// Endpoint para enviar mensaje de WhatsApp después del pago
app.post('/api/send-whatsapp', async (req, res) => {
  try {
    const { 
      orderData, 
      paymentData, 
      selectedLocation 
    } = req.body;

    console.log('Enviando mensaje de WhatsApp:', { orderData, paymentData, selectedLocation });

    // Generar contenido del ticket para WhatsApp
    const generateWhatsAppMessage = () => {
      const { cart, total, orderNumber, formData } = orderData;
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

      const paymentInfo = paymentData?.status === 'approved' 
        ? `\n💳 PAGO: MercadoPago PAGADO ✅\nID: ${paymentData?.paymentId || 'N/A'}`
        : `\n💳 PAGO: MercadoPago (${paymentData?.status || 'PENDIENTE'})`;

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

${paymentData?.status === 'approved' ? '✅ PEDIDO PAGADO - PROCESAR INMEDIATAMENTE' : '📞 CONFIRMAR PEDIDO Y COORDINAR ENTREGA'}

📍 ${selectedLocation?.name} | ${selectedLocation?.phone}`;
    };

    const message = generateWhatsAppMessage();
    
    // Retornar la URL de WhatsApp para que el frontend la abra
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${selectedLocation?.whatsapp}?text=${encodedMessage}`;

    res.json({
      success: true,
      whatsappUrl: whatsappUrl,
      message: 'Mensaje preparado para WhatsApp'
    });

  } catch (error) {
    console.error('Error enviando mensaje de WhatsApp:', error);
    res.status(500).json({
      error: 'Error al preparar mensaje de WhatsApp',
      details: error.message
    });
  }
});

// Endpoint de salud
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Servidor funcionando correctamente',
    timestamp: new Date().toISOString(),
    mercadopago_configured: !!MERCADOPAGO_ACCESS_TOKEN
  });
});

// Endpoint para verificar configuración de MercadoPago
app.get('/api/mp-status', (req, res) => {
  res.json({
    configured: !!MERCADOPAGO_ACCESS_TOKEN,
    token_length: MERCADOPAGO_ACCESS_TOKEN ? MERCADOPAGO_ACCESS_TOKEN.length : 0,
    token_prefix: MERCADOPAGO_ACCESS_TOKEN ? MERCADOPAGO_ACCESS_TOKEN.substring(0, 10) + '...' : 'No configurado'
  });
});

// Manejo de errores global
app.use((error, req, res, next) => {
  console.error('Error no manejado:', error);
  res.status(500).json({
    error: 'Error interno del servidor',
    details: error.message,
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`Servidor backend ejecutándose en http://localhost:${PORT}`);
  console.log(`MercadoPago configurado: ${!!MERCADOPAGO_ACCESS_TOKEN}`);
  console.log(`Sin restricciones CORS - Acepta todas las solicitudes`);
  if (MERCADOPAGO_ACCESS_TOKEN) {
    console.log(`Token prefix: ${MERCADOPAGO_ACCESS_TOKEN.substring(0, 10)}...`);
  }
});