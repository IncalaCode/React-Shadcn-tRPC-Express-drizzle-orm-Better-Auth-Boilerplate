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
    const sessionToken = req.cookies?.["better-auth.session_token"];
    
    if (sessionToken) {
      const session = await auth.api.getSession({
        headers: req.headers as any,
      });

      if (session?.session && session?.user) {
        context.user = {
          id: session.user.id,
          email: session.user.email,
          name: session.user.name,
          role: (session.user as any).role || 'user', // Better Auth doesn't include role by default
          emailVerified: session.user.emailVerified, // Keep as boolean
        };

        context.session = {
          id: session.session.id,
          userId: session.session.userId,
          expiresAt: session.session.expiresAt,
        };
      }
    }
  } catch (error) {
    console.error("Context creation error:", error);
  }

  return context;
};
