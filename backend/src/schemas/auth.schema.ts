import "dotenv/config";
import { z } from "zod";

export const emailSchema = z.string().email("Invalid email address");

export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(128, "Password must be less than 128 characters")
  .refine(
    (password) => {
      const hasUppercase = /[A-Z]/.test(password);
      const hasLowercase = /[a-z]/.test(password);
      const hasNumbers = /\d/.test(password);
      const hasSymbols = /[!@#$%^&*(),.?":{}|<>]/.test(password);
      
      const requireUppercase = process.env.BETTERAUTH_PASSWORD_REQUIRE_UPPERCASE === "true";
      const requireLowercase = process.env.BETTERAUTH_PASSWORD_REQUIRE_LOWERCASE === "true";
      const requireNumbers = process.env.BETTERAUTH_PASSWORD_REQUIRE_NUMBERS === "true";
      const requireSymbols = process.env.BETTERAUTH_PASSWORD_REQUIRE_SYMBOLS === "true";

      if (requireUppercase && !hasUppercase) return false;
      if (requireLowercase && !hasLowercase) return false;
      if (requireNumbers && !hasNumbers) return false;
      if (requireSymbols && !hasSymbols) return false;

      return true;
    },
    {
      message: "Password does not meet security requirements",
    }
  );

export const nameSchema = z
  .string()
  .min(1, "Name is required")
  .max(100, "Name must be less than 100 characters")
  .trim();

export const signUpSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  name: nameSchema, // Made required to match Better Auth expectations
  callbackURL: z.string().url().optional(),
});

export const signInSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().default(false),
  callbackURL: z.string().url().optional(),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: passwordSchema,
});

export const forgotPasswordSchema = z.object({
  email: emailSchema,
  redirectTo: z.string().url().optional(),
});

export const resetPasswordSchema = z.object({
  token: z.string().min(1, "Token is required"),
  password: passwordSchema,
});

export const verifyEmailSchema = z.object({
  token: z.string().min(1, "Token is required"),
});

export const updateProfileSchema = z.object({
  name: nameSchema.optional(),
  image: z.string().url("Invalid image URL").optional(),
});

// Type exports
export type SignUpInput = z.infer<typeof signUpSchema>;
export type SignInInput = z.infer<typeof signInSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type VerifyEmailInput = z.infer<typeof verifyEmailSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
