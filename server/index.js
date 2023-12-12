
import express from 'express';
import cors from 'cors';
import { MercadoPagoConfig, Preference } from 'mercadopago';

const app = express();
const port = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Configurar CORS
app.use(cors({
  origin: 'http://localhost:4200', // Reemplaza con la URL de tu aplicación cliente
  methods: ['GET', 'POST'], // Especifica los métodos HTTP permitidos
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin',  ], // Especifica los encabezados permitidos
}));

// Agrega credenciales
const client = new MercadoPagoConfig({ accessToken: 'TEST-8845370922479618-110813-0f91b5c9b9673fa2f3bbf680c7337d96-215332497' });

app.post('/create_preference', async (req, res) => {
  try{
    const preference = new Preference(client);
    const createdPreference = await preference.create({body: {
      items: [
        {
          title: req.body.items[0].title,
          quantity: req.body.items[0].quantity,
          unit_price: req.body.items[0].price,
          currency_id: "ARS",
        }
      ],
      back_urls: {
        "success": "http://localhost:8080/sucess",
        "failure": "http://localhost:8080/failure",
        "pending": "http://localhost:8080/sucess"
      },
      auto_return: "approved"
    }});
    res.json({ preferenceId: createdPreference.id });
  }catch(error){
    console.error('Error creating preference:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/feedback', function (req, res) {
  res.json({
    Payment: req.query.payment_id,
    Status: req.query.status,
    MerchantOrder: req.query.merchant_order_id,
  });
});

app.get('/sucess', function (req, res) {
  res.redirect('http://localhost:4200/shop/clear-cart');
});

app.get('/failure', function (req, res) {
  setTimeout(() => {
    res.redirect('http://localhost:4200/shop/cart');
  }, 300);
  // res.redirect('http://localhost:4200/shop/cart');
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
