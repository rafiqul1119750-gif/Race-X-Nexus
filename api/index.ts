import express from 'express';
import cors from 'cors';

const app = express();

// Port ko number mein convert karna zaroori hai TypeScript ke liye
const PORT = parseInt(process.env.PORT || '3000', 10);

app.use(cors({ origin: '*' })); 
app.use(express.json());

// 1. Home Route (Cron-job aur MeDo connection check ke liye)
app.get('/', (req, res) => {
  res.status(200).send('<h1>🚀 Race-X Nexus: 24/7 Active</h1>');
});

// 2. Magic Chat API (Gemini Style)
app.post('/api/magic-chat', (req, res) => {
  const { prompt } = req.body;
  res.json({
    status: "success",
    content: `### Result for "${prompt}"\n\nBhai, Magic Chat ab bilkul clean aur direct hai. Sabhi purane buttons hat chuke hain.`
  });
});

// 3. Shopping API (Full Catalog)
app.get('/api/shop', (req, res) => {
  const query = req.query.q || 'Products';
  res.json({
    success: true,
    data: [
      { id: 1, store: "Amazon", title: `${query} Premium`, price: "₹1,999" },
      { id: 2, store: "Flipkart", title: `${query} Budget`, price: "₹899" },
      { id: 3, store: "Meesho", title: `${query} Trending`, price: "₹450" }
    ]
  });
});

// ZAROORI: Ab 'PORT' ek number hai, toh build fail nahi hogi
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Race-X Engine Active on Port ${PORT}`);
});
