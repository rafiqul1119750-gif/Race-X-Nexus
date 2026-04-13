import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import studioRouter from "./routes/studio";

dotenv.config();
const app = express();

// ✅ CORS Fix: Frontend URL ko backend mein allow karna
app.use(cors({
  origin: "https://race-x-nexus-1.onrender.com",
  methods: ["GET", "POST"],
  credentials: true
}));

app.use(express.json());

// Routes
app.use("/api/studio", studioRouter);

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 Nexus Backend Live on Port ${PORT}`);
});
