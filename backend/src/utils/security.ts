import "dotenv/config";
import { Request, Response, NextFunction } from "express";

// Simple in-memory rate limiter
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

export const createRateLimit = (options: {
  windowMs?: number;
  max?: number;
  message?: string;
  keyGenerator?: (req: Request) => string;
}) => {
  const windowMs = options.windowMs || 15 * 60 * 1000; // 15 minutes
  const max = options.max || 100;
  const message = options.message || "Too many requests from this IP";
  const keyGenerator = options.keyGenerator || ((req: Request) => req.ip || 'unknown');

  return (req: Request, res: Response, next: NextFunction) => {
    const key = keyGenerator(req);
    const now = Date.now();
    const resetTime = now + windowMs;

    let record = rateLimitStore.get(key);

    if (!record || now > record.resetTime) {
      record = { count: 1, resetTime };
      rateLimitStore.set(key, record);
      return next();
    }

    if (record.count >= max) {
      return res.status(429).json({
        error: "Too Many Requests",
        message,
        retryAfter: Math.round((record.resetTime - now) / 1000),
      });
    }

    record.count++;
    next();
  };
};

export const authRateLimit = createRateLimit({
  windowMs: parseInt(process.env.BETTERAUTH_RATE_LIMIT_WINDOW_MS || "60000"), // 1 minute for development
  max: parseInt(process.env.BETTERAUTH_RATE_LIMIT_MAX_ATTEMPTS || "100"), // 100 attempts for development
  message: "Too many authentication attempts, please try again later",
});

export const generalRateLimit = createRateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS_LEGACY || "900000"), // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS_LEGACY || "100"), // 100 requests
  message: "Too many requests from this IP, please try again later",
});

export const strictRateLimit = createRateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 3, // 3 attempts
  message: "Too many failed attempts, please try again later",
});

// Cleanup old entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, record] of rateLimitStore.entries()) {
    if (now > record.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}, 60 * 1000); // Clean up every minute

export const sanitizeInput = (input: any): any => {
  if (typeof input === "string") {
    return input.trim().replace(/[<>]/g, "");
  }
  if (typeof input === "object" && input !== null) {
    const sanitized: any = {};
    for (const [key, value] of Object.entries(input)) {
      sanitized[key] = sanitizeInput(value);
    }
    return sanitized;
  }
  return input;
};

export const isValidUUID = (uuid: string): boolean => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
};

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const generateSecureToken = (): string => {
  return crypto.randomUUID();
};

export const isStrongPassword = (password: string): boolean => {
  const minLength = parseInt(process.env.BETTERAUTH_PASSWORD_MIN_LENGTH || "8");
  const requireUppercase = process.env.BETTERAUTH_PASSWORD_REQUIRE_UPPERCASE === "true";
  const requireLowercase = process.env.BETTERAUTH_PASSWORD_REQUIRE_LOWERCASE === "true";
  const requireNumbers = process.env.BETTERAUTH_PASSWORD_REQUIRE_NUMBERS === "true";
  const requireSymbols = process.env.BETTERAUTH_PASSWORD_REQUIRE_SYMBOLS === "true";

  if (password.length < minLength) return false;
  if (requireUppercase && !/[A-Z]/.test(password)) return false;
  if (requireLowercase && !/[a-z]/.test(password)) return false;
  if (requireNumbers && !/\d/.test(password)) return false;
  if (requireSymbols && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) return false;

  return true;
};
