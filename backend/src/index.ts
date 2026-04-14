import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import studioRouter from "./routes/studio";

dotenv.config();
const app = express();

// ✅ CORS: Sab kuch allow kar do taaki connection block na ho
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// Routes
app.use("/api/studio", studioRouter);

// Health Check
app.get("/", (req, res) => {
    res.json({ status: "online", message: "Nexus Core is Active" });
});

const PORT = process.env.PORT || 10000;

// ✅ Render ke liye "0.0.0.0" par host karna zaroori hai
app.listen(Number(PORT), "0.0.0.0", () => {
    console.log(`🚀 Nexus Backend Live on Port ${PORT}`);
});
