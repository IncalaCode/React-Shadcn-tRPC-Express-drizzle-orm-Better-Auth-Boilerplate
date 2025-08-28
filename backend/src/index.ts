import "reflect-metadata";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import { createExpressMiddleware } from "@trpc/server/adapters/express";

import { initializeDatabase } from "./database/connection";
// Import auth after database is initialized
import { appRouter } from "./trpc/routers/_app";
import { createContext } from "./trpc/context";
import { generalRateLimit, authRateLimit } from "./utils/security";
import logger from "./utils/logger";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true,
  },
}));

app.use(compression());

// CORS configuration
const corsOptions = {
  origin: process.env.CORS_ORIGIN?.split(","),
  credentials: process.env.CORS_CREDENTIALS === "true",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Accept",
    "Origin",
    "Cache-Control",
    "X-File-Name",
  ],
};

app.use(cors(corsOptions));

// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Logging middleware
if (process.env.NODE_ENV !== "test") {
  app.use(morgan("combined", {
    stream: {
      write: (message: string) => {
        logger.info(message.trim());
      },
    },
  }));
}

// Rate limiting
app.use("/api/", generalRateLimit);
app.use("/api/auth/", authRateLimit);


let authHandler: any = null;

app.all("/api/auth/*", async (req, res) => {
  try {
    if (!authHandler) {
      return res.status(503).json({ error: "Authentication service not ready" });
    }
    
    const { toNodeHandler } = await import("better-auth/node");
    const nodeHandler = toNodeHandler(authHandler);
    await nodeHandler(req, res);
    
  } catch (error) {
    logger.error("Auth handler error:", error);
    if (!res.headersSent) {
      res.status(500).json({ error: "Authentication error" });
    }
  }
});

// tRPC middleware
app.use(
  "/api/trpc",
  createExpressMiddleware({
    router: appRouter,
    createContext,
    onError: ({ path, error, type, ctx }) => {
      logger.error(`❌ tRPC Error on '${path ?? "<no-path>"}':`, {
        error: error.message,
        type,
        code: error.code,
        stack: error.stack,
        userId: ctx?.user?.id,
      });
    },
  })
);

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    error: "Not Found",
    message: "The requested resource was not found",
    path: req.originalUrl,
  });
});

// Global error handler
app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error("Unhandled error:", {
    error: error.message,
    stack: error.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
  });

  if (res.headersSent) {
    return next(error);
  }

  const isDevelopment = process.env.NODE_ENV === "development";
  
  res.status(error.status || 500).json({
    error: "Internal Server Error",
    message: isDevelopment ? error.message : "Something went wrong",
    ...(isDevelopment && { stack: error.stack }),
  });
});

// Graceful shutdown handler
const gracefulShutdown = (signal: string) => {
  logger.info(`Received ${signal}. Starting graceful shutdown...`);
  
  process.exit(0);
};

process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));

// Unhandled promise rejection handler
process.on("unhandledRejection", (reason, promise) => {
  logger.error("Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1);
});

// Uncaught exception handler
process.on("uncaughtException", (error) => {
  logger.error("Uncaught Exception:", error);
  process.exit(1);
});

// Start server
const startServer = async () => {
  try {
    await initializeDatabase();
      const { auth } = await import("./auth/config");
      authHandler = auth;

    app.listen(PORT, () => {
      logger.info(`🚀 Server running on port ${PORT}`);
      logger.info(`🔐 Auth API: http://localhost:${PORT}/api/auth`);
      logger.info(`🌐 tRPC API: http://localhost:${PORT}/api/trpc`);
      logger.info(`🔒 Environment: ${process.env.NODE_ENV || "development"}`);
    });
  } catch (error) {
    logger.error("Failed to start server:", error);
    process.exit(1);
  }
};

if (require.main === module) {
  startServer();
}

export { app, startServer };
