import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import authRoutes from "./routes/auth";
import workoutRoutes from "./routes/workouts";
import prisma from "./lib/database";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
      ? [
          'https://fitplanbrasil.com',
          /^https:\/\/.*\.vercel\.app$/,  // Qualquer subdomínio .vercel.app
          process.env.FRONTEND_URL || 'https://fitdeiros-qgvj.vercel.app'
        ]
      : ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:4173'],
    credentials: true
  }));
  
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Health check
  app.get("/api/health", async (_req, res) => {
    try {
      await prisma.$queryRaw`SELECT 1`;
      res.json({ 
        status: 'healthy',
        database: 'connected',
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      res.status(500).json({ 
        status: 'unhealthy',
        database: 'disconnected',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "FitPlan API is running!";
    res.json({ message: ping });
  });

  // Demo route (manter para compatibilidade)
  app.get("/api/demo", handleDemo);

  // Auth routes
  app.use("/api/auth", authRoutes);

  // Workout routes
  app.use("/api/workouts", workoutRoutes);

  // 404 handler para rotas da API
  app.use("/api/*", (_req, res) => {
    res.status(404).json({
      error: 'Endpoint não encontrado',
      code: 'NOT_FOUND'
    });
  });

  // Error handler global
  app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error('Erro não tratado:', err);
    res.status(500).json({
      error: 'Erro interno do servidor',
      code: 'INTERNAL_ERROR'
    });
  });

  return app;
}

// Para desenvolvimento direto
if (process.env.NODE_ENV !== 'production' && require.main === module) {
  const app = createServer();
  const port = process.env.PORT || 3001;
  
  app.listen(port, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${port}`);
    console.log(`📊 Health check: http://localhost:${port}/api/health`);
    console.log(`📖 API Docs: http://localhost:${port}/api/ping`);
  });
}
