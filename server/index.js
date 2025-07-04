import express from 'express';
import cors from 'cors';
import { MercadoPagoConfig, Preference } from 'mercadopago';

const app = express();
const PORT = 3001;

// Configurar CORS
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

// Configurar MercadoPago
// IMPORTANTE: Reemplaza con tu Access Token real de MercadoPago
const MERCADOPAGO_ACCESS_TOKEN = 'APP_USR-3422455489449986-070314-8ae7114f290e730ae49b902b6fe44bc8-271204335'; // Cambia por tu token real

const client = new MercadoPagoConfig({
  accessToken: MERCADOPAGO_ACCESS_TOKEN,
  options: { timeout: 5000 }
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
      payment_methods: {
        excluded_payment_types: [],
        excluded_payment_methods: [],
        installments: 12
      },
      back_urls: {
        success: req.body.back_urls?.success || `${req.get('origin') || 'http://localhost:5173'}/payment-success`,
        failure: req.body.back_urls?.failure || `${req.get('origin') || 'http://localhost:5173'}/payment-failure`,
        pending: req.body.back_urls?.pending || `${req.get('origin') || 'http://localhost:5173'}/payment-pending`
      },
      auto_return: req.body.auto_return || 'approved',
      external_reference: req.body.external_reference || `PARRILLEROS-${Date.now()}`,
      statement_descriptor: req.body.statement_descriptor || 'PARRILLEROS FAST FOOD',
      metadata: req.body.metadata || {
        restaurant: 'Parrilleros Fast Food'
      }
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
  if (MERCADOPAGO_ACCESS_TOKEN) {
    console.log(`Token prefix: ${MERCADOPAGO_ACCESS_TOKEN.substring(0, 10)}...`);
  }
});