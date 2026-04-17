import express from 'express';
import cors from 'cors';

const app = express();

// 🔓 Sabse broad CORS taaki MeDo block na ho
app.use(cors({ origin: '*' }));
app.use(express.json());

// 🌐 1. Root Handshake
app.get('/', (req, res) => {
  res.status(200).json({ status: "connected", system: "operational" });
});

// 🔑 2. ALL API & HEALTH ROUTES (Fixes 404)
// Ye har tarah ke /api/ ya /health requests ko handle karega
app.all(['/api/:service*', '/health', '/api-status'], (req, res) => {
  res.status(200).json({ 
    success: true, 
    status: "healthy", 
    message: "Race-X Nexus Bridge Active",
    path: req.path 
  });
});

// 🚀 Railway Port
const PORT = process.env.PORT || 3000;
app.listen(Number(PORT), "0.0.0.0", () => {
  console.log(`🏎️ Nexus Bridge: 404 Shield Active on Port ${PORT}`);
});
