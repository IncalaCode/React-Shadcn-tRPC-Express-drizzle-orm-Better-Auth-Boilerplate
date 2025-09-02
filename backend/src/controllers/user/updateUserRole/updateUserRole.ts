import { TRPCError } from "@trpc/server";
import { publicProcedure } from "../../../trpc/trpc";
import { isAuthenticated, hasRole } from "../../../trpc/middleware/auth";
import { db } from "../../../database/connection";
import { user } from "../../../database/entities/auth-schema";
import { eq } from "drizzle-orm";
import { updateUserRoleSchema } from "../../../schemas/user.schema";

export const updateUserRole = publicProcedure.use(isAuthenticated).use(hasRole("admin"))
  .input(updateUserRoleSchema)
  .mutation(async ({ input, ctx }) => {
    try {
      if (input.userId === ctx.user.id) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Cannot change your own role",
        });
      }

      await db
        .update(user)
        .set({
          role: input.role,
          updatedAt: new Date(),
        })
        .where(eq(user.id, input.userId));

      return { success: true };
    } catch (error: any) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to update user role",
      });
    }
  });
