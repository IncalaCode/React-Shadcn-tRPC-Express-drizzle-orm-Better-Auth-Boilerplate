import { TRPCError } from "@trpc/server";
import { publicProcedure } from "../../../trpc/trpc";
import { isAuthenticated, isEmailVerified } from "../../../trpc/middleware/auth";
import { db } from "../../../database/connection";
import { user } from "../../../database/entities/auth-schema";
import { eq } from "drizzle-orm";
import { deleteAccountSchema } from "../../../schemas/user.schema";

export const deleteAccount = publicProcedure.use(isAuthenticated).use(isEmailVerified)
  .input(deleteAccountSchema)
  .mutation(async ({ input, ctx }) => {
    try {
      // Note: In a real implementation, you would verify the password first
      await db.delete(user).where(eq(user.id, ctx.user.id));

      return { success: true };
    } catch (error: any) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to delete account",
      });
    }
  });
