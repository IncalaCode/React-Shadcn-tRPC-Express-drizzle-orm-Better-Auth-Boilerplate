import "dotenv/config";
import { TRPCError } from "@trpc/server";
import { publicProcedure } from "../../../trpc/trpc";
import { auth } from "../../../auth/config";
import { signInSchema } from "../../../schemas/auth.schema";

export const signIn = publicProcedure
  .input(signInSchema)
  .mutation(async ({ input, ctx }) => {
    // Check if login is allowed
    const showAuth = process.env.SHOW_AUTH || "both";
    if (showAuth !== "login" && showAuth !== "both") {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "Login is currently disabled",
      });
    }

    try {
      const result = await auth.api.signInEmail({
        body: {
          email: input.email,
          password: input.password,
          rememberMe: input.rememberMe,
          callbackURL: input.callbackURL,
        },
        headers: ctx.req.headers as any,
      });

      if (!result) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid credentials",
        });
      }

      // Optional: Send sign-in notification email (for security)
      if (process.env.SEND_SIGNIN_NOTIFICATIONS === "true") {
        try {
          const { emailService } = await import("../../../services/email.service");
          await emailService.sendSignInNotificationEmail(
            result.user.email,
            result.user.name || "User",
            ctx.req.ip || "Unknown",
            ctx.req.get('User-Agent') || "Unknown"
          );
          console.log(`✅ Sign-in notification sent to: ${result.user.email}`);
        } catch (emailError) {
          console.error("❌ Failed to send sign-in notification:", emailError);
          // Don't fail the signin if email fails
        }
      }

      return {
        success: true,
        user: result.user,
      };
    } catch (error: any) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: error.message || "Invalid credentials",
      });
    }
  });
