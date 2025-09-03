import "dotenv/config";
import { TRPCError } from "@trpc/server";
import { publicProcedure } from "../../../trpc/trpc";
import { auth } from "../../../auth/config";
import { signUpSchema } from "../../../schemas/auth.schema";

export const signUp = publicProcedure
  .input(signUpSchema)
  .mutation(async ({ input, ctx }) => {
    // Check if registration is allowed
    const showAuth = process.env.SHOW_AUTH || "both";
    if (showAuth !== "register" && showAuth !== "both") {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "Registration is currently disabled",
      });
    }

    try {
      const result = await auth.api.signUpEmail({
        body: {
          email: input.email,
          password: input.password,
          name: input.name,
          callbackURL: input.callbackURL,
        },
        headers: ctx.req.headers as any,
      });

      if (!result) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Failed to create account",
        });
      }

      // Send welcome email
      try {
        const { emailService } = await import("../../../services/email.service");
        const verificationUrl = process.env.BETTERAUTH_EMAIL_VERIFICATION_REQUIRED === "true" 
          ? `${process.env.FRONTEND_URL}/verify-email?email=${result.user.email}` 
          : undefined;
        
        await emailService.sendWelcomeEmail(
          result.user.email,
          result.user.name,
          verificationUrl
        );
        console.log(`✅ Welcome email sent to: ${result.user.email}`);
      } catch (emailError) {
        console.error("❌ Failed to send welcome email:", emailError);
        // Don't fail the signup if email fails
      }

      return {
        success: true,
        user: result.user,
      };
    } catch (error: any) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: error.message || "Failed to sign up",
      });
    }
  });
