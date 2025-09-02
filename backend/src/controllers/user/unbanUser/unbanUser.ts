import { TRPCError } from "@trpc/server";
import { publicProcedure } from "../../../trpc/trpc";
import { isAuthenticated, hasRole } from "../../../trpc/middleware/auth";
import { db } from "../../../database/connection";
import { user } from "../../../database/entities/auth-schema";
import { eq } from "drizzle-orm";
import { unbanUserSchema } from "../../../schemas/user.schema";

export const unbanUser = publicProcedure.use(isAuthenticated).use(hasRole("admin"))
  .input(unbanUserSchema)
  .mutation(async ({ input }) => {
    try {
      // Get user details before unbanning
      const [userToUnban] = await db
        .select({ email: user.email, name: user.name })
        .from(user)
        .where(eq(user.id, input.userId));
      
      await db
        .update(user)
        .set({
          banned: false,
          banReason: undefined,
          banExpires: undefined,
          updatedAt: new Date(),
        })
        .where(eq(user.id, input.userId));

      // Send account unbanned notification email
      if (userToUnban) {
        try {
          const { emailService } = await import("../../../services/email.service");
          await emailService.sendAccountUnbannedEmail(
            userToUnban.email,
            userToUnban.name || "User"
          );
          console.log(`✅ Account unbanned notification sent to: ${userToUnban.email}`);
        } catch (emailError) {
          console.error("❌ Failed to send account unbanned notification:", emailError);
          // Don't fail the unban if email fails
        }
      }

      return { success: true };
    } catch (error: any) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to unban user",
      });
    }
  });
