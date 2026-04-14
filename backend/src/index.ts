import express from "express";
import cors from "cors";
import studioRouter from "./routes/studio";

const app = express();

// ✅ Sab kuch allow kar do taaki connection block na ho
app.use(cors()); 
app.use(express.json());

app.use("/api/studio", studioRouter);

const PORT = process.env.PORT || 10000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Nexus Backend Live on Port ${PORT}`);
});
