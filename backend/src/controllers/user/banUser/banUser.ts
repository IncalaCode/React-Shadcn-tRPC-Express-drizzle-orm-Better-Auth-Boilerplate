import { TRPCError } from "@trpc/server";
import { publicProcedure } from "../../../trpc/trpc";
import { isAuthenticated, hasRole } from "../../../trpc/middleware/auth";
import { db } from "../../../database/connection";
import { user } from "../../../database/entities/auth-schema";
import { eq } from "drizzle-orm";
import { banUserSchema } from "../../../schemas/user.schema";

export const banUser = publicProcedure.use(isAuthenticated).use(hasRole("admin"))
  .input(banUserSchema)
  .mutation(async ({ input, ctx }) => {
    try {
      if (input.userId === ctx.user.id) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Cannot ban yourself",
        });
      }

      // Get user details before banning
      const [userToBan] = await db
        .select({ email: user.email, name: user.name })
        .from(user)
        .where(eq(user.id, input.userId));

      await db
        .update(user)
        .set({
          banned: true,
          banReason: input.reason,
          banExpires: input.expiresAt,
          updatedAt: new Date(),
        })
        .where(eq(user.id, input.userId));

      // Send account banned notification email
      if (userToBan) {
        try {
          const { emailService } = await import("../../../services/email.service");
          await emailService.sendAccountBannedEmail(
            userToBan.email,
            userToBan.name || "User",
            input.reason
          );
          console.log(`✅ Account banned notification sent to: ${userToBan.email}`);
        } catch (emailError) {
          console.error("❌ Failed to send account banned notification:", emailError);
          // Don't fail the ban if email fails
        }
      }

      return { success: true };
    } catch (error: any) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to ban user",
      });
    }
  });
