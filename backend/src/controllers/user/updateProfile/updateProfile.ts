import { TRPCError } from "@trpc/server";
import { publicProcedure } from "../../../trpc/trpc";
import { isAuthenticated } from "../../../trpc/middleware/auth";
import { db } from "../../../database/connection";
import { user } from "../../../database/entities/auth-schema";
import { eq } from "drizzle-orm";
import { updateUserProfileSchema } from "../../../schemas/user.schema";

export const updateProfile = publicProcedure.use(isAuthenticated)
  .input(updateUserProfileSchema)
  .mutation(async ({ input, ctx }) => {
    try {
      await db
        .update(user)
        .set({
          ...(input.name && { name: input.name }),
          ...(input.image && { image: input.image }),
          updatedAt: new Date(),
        })
        .where(eq(user.id, ctx.user.id));

      const [updatedUser] = await db
        .select({
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          role: user.role,
          emailVerified: user.emailVerified,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        })
        .from(user)
        .where(eq(user.id, ctx.user.id));

      return updatedUser;
    } catch (error: any) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to update profile",
      });
    }
  });
