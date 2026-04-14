import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import studioRouter from "./routes/studio";

dotenv.config();
const app = express();

// ✅ Sabse important: CORS ko allow karna
app.use(cors({
    origin: "*", // Testing ke liye sab allow hai
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// API Routes
app.use("/api/studio", studioRouter);

// Health Check Route (Ye check karne ke liye ki backend zinda hai)
app.get("/", (req, res) => {
    res.send("🚀 Nexus Core is Online");
});

const PORT = process.env.PORT || 10000;
app.listen(Number(PORT), "0.0.0.0", () => {
    console.log(`🚀 Nexus Backend Live on Port ${PORT}`);
});
