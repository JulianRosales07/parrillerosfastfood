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

    const preferenceData = {
      items: req.body.items,
      payer: req.body.payer,
      payment_methods: req.body.payment_methods,
      back_urls: req.body.back_urls,
      auto_return: req.body.auto_return,
      external_reference: req.body.external_reference,
      statement_descriptor: req.body.statement_descriptor,
      metadata: req.body.metadata
    };

    const result = await preference.create({ body: preferenceData });
    
    console.log('Preferencia creada exitosamente:', result.id);
    
    res.json({
      id: result.id,
      init_point: result.init_point,
      sandbox_init_point: result.sandbox_init_point
    });

  } catch (error) {
    console.error('Error creando preferencia:', error);
    res.status(500).json({
      error: 'Error al crear la preferencia de pago',
      details: error.message
    });
  }
});

// Endpoint de salud
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Servidor funcionando correctamente' });
});

app.listen(PORT, () => {
  console.log(`Servidor backend ejecutándose en http://localhost:${PORT}`);
});