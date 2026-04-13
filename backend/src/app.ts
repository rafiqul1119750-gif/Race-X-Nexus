import express, { type Express, Request, Response } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();

// 🔥 LOGGER (Request/Response logs)
app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  })
);

// 🌐 CORS (allow frontend)
app.use(cors());

// 📦 BODY PARSER
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==============================
// ✅ SYSTEM ROUTES (IMPORTANT)
// ==============================

// 🔋 Health check (Render wake + uptime)
app.get("/health", (req: Request, res: Response) => {
  res.status(200).send("OK");
});

// 🏠 Root route (basic check)
app.get("/", (req: Request, res: Response) => {
  res.send("Nexus Backend Live 🚀");
});

// ==============================
// 🚀 MAIN API ROUTES
// ==============================

// 👉 All AI routes
app.use("/api", router);

// ==============================
// ❌ 404 HANDLER (optional but pro)
// ==============================
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

export default app;
