import { Request, Response } from "express";
import { auth } from "../auth/config";

export interface CreateContextOptions {
  req: Request;
  res: Response;
}

export interface Context {
  req: Request;
  res: Response;
  user?: {
    id: string;
    email: string;
    name?: string;
    role?: string;
    emailVerified?: boolean;
  };
  session?: {
    id: string;
    userId: string;
    expiresAt: Date;
  };
}

export const createContext = async ({ req, res }: CreateContextOptions): Promise<Context> => {
  const context: Context = { req, res };

  try {
    // Check for session token in cookies or JWT in Authorization header
    const sessionToken = req.cookies?.["better-auth.session_token"];
    const authHeader = req.headers.authorization;
    
    let headers = { ...req.headers };
    
    // Handle JWT token from Authorization header
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      headers.authorization = `Bearer ${token}`;
    }
    
    // Handle session token from cookies
    if (sessionToken) {
      headers.cookie = `better-auth.session_token=${sessionToken}`;
    }

    // Try to get session using Better Auth (handles both JWT and cookies)
    const session = await auth.api.getSession({
      headers: headers as any,
    });

    if (session?.session && session?.user) {
      context.user = {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
        role: (session.user as any).role || 'user',
        emailVerified: session.user.emailVerified,
      };

      context.session = {
        id: session.session.id,
        userId: session.session.userId,
        expiresAt: session.session.expiresAt,
      };
    }
  } catch (error) {
    console.error("Context creation error:", error);
  }

  return context;
};
