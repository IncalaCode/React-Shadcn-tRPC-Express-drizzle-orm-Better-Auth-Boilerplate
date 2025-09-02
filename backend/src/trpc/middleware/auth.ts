import { TRPCError } from "@trpc/server";
import { middleware } from "../trpc";
import { db } from "../../database/connection";
import { user } from "../../database/entities/auth-schema";
import { eq } from "drizzle-orm";

export const isAuthenticated = middleware(async ({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Authentication required",
    });
  }

  try {
    const [dbUser] = await db
      .select({ role: user.role })
      .from(user)
      .where(eq(user.id, ctx.user.id));

    const userWithCorrectRole = {
      ...ctx.user,
      role: dbUser?.role || 'user' // Use database role or default to 'user'
    };

    return next({
      ctx: {
        ...ctx,
        user: userWithCorrectRole,
      },
    });
  } catch (error) {
    return next({
      ctx: {
        ...ctx,
        user: ctx.user,
      },
    });
  }
});

export const isEmailVerified = middleware(({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Authentication required",
    });
  }

  if (!ctx.user.emailVerified) {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "Email verification required",
    });
  }

  return next({
    ctx: {
      ...ctx,
      user: ctx.user,
    },
  });
});

export const hasRole = (roles: string | string[]) => {
  const roleArray = Array.isArray(roles) ? roles : [roles];
  
  return middleware(({ ctx, next }) => {
    if (!ctx.user) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Authentication required",
      });
    }

    if (!ctx.user.role || !roleArray.includes(ctx.user.role)) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "Insufficient permissions",
      });
    }

    return next({
      ctx: {
        ...ctx,
        user: ctx.user,
      },
    });
  });
};
