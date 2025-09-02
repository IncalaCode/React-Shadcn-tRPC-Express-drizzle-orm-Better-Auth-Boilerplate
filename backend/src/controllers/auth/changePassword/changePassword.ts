import { TRPCError } from "@trpc/server";
import { publicProcedure } from "../../../trpc/trpc";
import { isAuthenticated } from "../../../trpc/middleware/auth";
import { auth } from "../../../auth/config";
import { changePasswordSchema } from "../../../schemas/auth.schema";

export const changePassword = publicProcedure.use(isAuthenticated)
  .input(changePasswordSchema)
  .mutation(async ({ input, ctx }) => {
    try {
      await auth.api.changePassword({
        body: {
          currentPassword: input.currentPassword,
          newPassword: input.newPassword,
        },
        headers: ctx.req.headers as any,
      });

      // Send password changed notification email
      try {
        const { emailService } = await import("../../../services/email.service");
        await emailService.sendPasswordChangedEmail(
          ctx.user.email,
          ctx.user.name || "User"
        );
        console.log(`✅ Password changed notification sent to: ${ctx.user.email}`);
      } catch (emailError) {
        console.error("❌ Failed to send password changed notification:", emailError);
        // Don't fail the password change if email fails
      }

      return { success: true };
    } catch (error: any) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: error.message || "Failed to change password",
      });
    }
  });
