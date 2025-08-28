import "dotenv/config";
import { TRPCError } from "@trpc/server";
import { publicProcedure } from "../trpc/trpc";
import { isAuthenticated } from "../trpc/middleware/auth";
import { auth } from "../auth/config";
import {
  signUpSchema,
  signInSchema,
  changePasswordSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  verifyEmailSchema,
  updateProfileSchema,
} from "../schemas/auth.schema";

export const authProcedures = {
  // Public authentication procedures
  signUp: publicProcedure
    .input(signUpSchema)
    .mutation(async ({ input, ctx }) => {
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
        try {
          const { emailService } = await import("../services/email.service");
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
    }),

  signIn: publicProcedure
    .input(signInSchema)
    .mutation(async ({ input, ctx }) => {
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
            const { emailService } = await import("../services/email.service");
            await emailService.sendSignInNotificationEmail(
              result.user.email,
              result.user.name || "User", // Keep fallback here as existing users might not have names
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
    }),

  signOut: publicProcedure.mutation(async ({ ctx }) => {
    try {
      await auth.api.signOut({
        headers: ctx.req.headers as any,
      });

      return { success: true };
    } catch (error: any) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to sign out",
      });
    }
  }),

  getSession: publicProcedure.query(async ({ ctx }) => {
    try {
      const session = await auth.api.getSession({
        headers: ctx.req.headers as any,
      });

      return session || null;
    } catch (error) {
      return null;
    }
  }),

  // Authenticated procedures
  getMe: publicProcedure.use(isAuthenticated).query(({ ctx }) => {
    return {
      user: ctx.user,
      session: ctx.session,
    };
  }),

  updateProfile: publicProcedure.use(isAuthenticated)
    .input(updateProfileSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        const result = await auth.api.updateUser({
          body: {
            name: input.name,
            image: input.image,
          },
          headers: ctx.req.headers as any,
        });

        return {
          success: true,
          user: result,
        };
      } catch (error: any) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: error.message || "Failed to update profile",
        });
      }
    }),

  changePassword: publicProcedure.use(isAuthenticated)
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
          const { emailService } = await import("../services/email.service");
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
    }),

  // Email verification procedures
  sendVerificationEmail: publicProcedure.use(isAuthenticated).mutation(async ({ ctx }) => {
    try {
      await auth.api.sendVerificationEmail({
        body: {
          email: ctx.user.email,
        },
        headers: ctx.req.headers as any,
      });

      return { success: true };
    } catch (error: any) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: error.message || "Failed to send verification email",
      });
    }
  }),

  verifyEmail: publicProcedure
    .input(verifyEmailSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        await auth.api.verifyEmail({
          query: { token: input.token },
          headers: ctx.req.headers as any,
        });

        return { success: true };
      } catch (error: any) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: error.message || "Failed to verify email",
        });
      }
    }),

  // Password reset procedures
  forgotPassword: publicProcedure
    .input(forgotPasswordSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        await auth.api.forgetPassword({
          body: {
            email: input.email,
            redirectTo: input.redirectTo,
          },
          headers: ctx.req.headers as any,
        });

        return { success: true };
      } catch (error: any) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: error.message || "Failed to send reset email",
        });
      }
    }),

  resetPassword: publicProcedure
    .input(resetPasswordSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        await auth.api.resetPassword({
          body: {
            token: input.token,
            newPassword: input.password,
          },
          headers: ctx.req.headers as any,
        });

        return { success: true };
      } catch (error: any) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: error.message || "Failed to reset password",
        });
      }
    }),
};
