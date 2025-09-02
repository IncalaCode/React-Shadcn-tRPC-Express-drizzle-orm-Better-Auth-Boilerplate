import { TRPCError } from "@trpc/server";
import { publicProcedure } from "../../../trpc/trpc";
import { isAuthenticated, hasRole } from "../../../trpc/middleware/auth";
import { db } from "../../../database/connection";
import { user } from "../../../database/entities/auth-schema";
import { eq } from "drizzle-orm";
import { getUserByIdSchema } from "../../../schemas/user.schema";

export const getUserById = publicProcedure.use(isAuthenticated).use(hasRole(["admin", "moderator"]))
  .input(getUserByIdSchema)
  .query(async ({ input }) => {
    try {
      const [foundUser] = await db
        .select({
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          role: user.role,
          emailVerified: user.emailVerified,
          banned: user.banned,
          banReason: user.banReason,
          banExpires: user.banExpires,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        })
        .from(user)
        .where(eq(user.id, input.userId));

      if (!foundUser) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }

      return foundUser;
    } catch (error: any) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch user",
      });
    }
  });
