import "dotenv/config";
import { betterAuth } from "better-auth";
import { phoneNumber } from "better-auth/plugins";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../database/connection";
import { user, session, account, verification } from "../database/entities/auth-schema";
import { resolveCorsOrigin } from "../utils/cors";

const authWay = process.env.BETTERAUTH_WAY || "session";
const isJWTMode = authWay === "jwt";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "mysql",
    schema: {
      user,
      session,
      account,
      verification,
    },
  }),
  
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  secret: process.env.BETTER_AUTH_SECRET!,
  
  plugins: [
    phoneNumber({
      sendOTP: async ({ phoneNumber, code }, request) => {
        const { smsService } = await import("../services/sms.service");
        
        try {
          const success = await smsService.sendVerificationCode(phoneNumber, code);
          
          if (success) {
            console.log(`✅ OTP sent to: ${phoneNumber}`);
          } else {
            throw new Error("Failed to send OTP");
          }
        } catch (error) {
          console.error("❌ Failed to send OTP:", error);
          throw error;
        }
      },
      signUpOnVerification: {
        getTempEmail: (phoneNumber) => `${phoneNumber.replace(/[^0-9]/g, '')}@phone.temp`,
        getTempName: (phoneNumber) => phoneNumber,
      },
    }),
  ],
  
  emailAndPassword: {
    enabled: process.env.AUTH_METHOD === "email" || process.env.AUTH_METHOD === "both",
    autoSignIn: true,
    minPasswordLength: parseInt(process.env.BETTERAUTH_PASSWORD_MIN_LENGTH || "8"),
    maxPasswordLength: 128,
    requireEmailVerification: process.env.BETTERAUTH_EMAIL_VERIFICATION_REQUIRED === "true",
    sendEmailVerificationOnSignUp: process.env.BETTERAUTH_EMAIL_VERIFICATION_REQUIRED === "true",
    sendResetPassword: async (data, request) => {
      const { emailService } = await import("../services/email.service");
      
      try {
        await emailService.sendPasswordResetEmail(
          data.user.email,
          data.user.name || "User",
          data.url
        );
        console.log(`✅ Password reset email sent to: ${data.user.email}`);
      } catch (error) {
        console.error("❌ Failed to send password reset email:", error);
        throw error;
      }
    },
  },



  session: {
    expiresIn: parseInt(process.env.BETTERAUTH_SESSION_DURATION || "604800"), // 7 days in seconds
    updateAge: 24 * 60 * 60, // 24 hours in seconds
    cookieCache: {
      enabled: true,
      maxAge: parseInt(process.env.BETTERAUTH_SESSION_DURATION || "604800"), // 7 days in seconds
    },
  },

  // Cookie configuration
  cookies: {
    sessionToken: {
      name: "better-auth.session_token",
      httpOnly: process.env.BETTERAUTH_SESSION_HTTPONLY !== "false",
      secure: process.env.BETTERAUTH_SESSION_SECURE === "true" || process.env.NODE_ENV === "production",
      sameSite: (process.env.BETTERAUTH_SESSION_SAMESITE as any) || "lax",
      maxAge: parseInt(process.env.BETTERAUTH_SESSION_DURATION || "604800"), // 7 days in seconds
      path: "/",
    },
  },

  // JWT configuration (when using JWT mode)
  ...(isJWTMode && {
    jwt: {
      secret: process.env.JWT_SECRET || process.env.BETTERAUTH_SECRET!,
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    },
  }),
  
  rateLimit: {
    enabled: true, // Disable rate limiting for development
    window: parseInt(process.env.BETTERAUTH_RATE_LIMIT_WINDOW_MS || "900000"), // 15 minutes
    max: parseInt(process.env.BETTERAUTH_RATE_LIMIT_MAX_ATTEMPTS || "100"), // Increased to 100 for development
    storage: "memory", // Use Redis in production
  },
  
  trustedOrigins: process.env.CORS_ORIGIN ? resolveCorsOrigin(process.env.CORS_ORIGIN) : undefined,
  
  // Advanced configuration
  useSecureCookies: process.env.NODE_ENV === "production",
  
  emailVerification: {
    sendOnSignUp: process.env.BETTERAUTH_EMAIL_VERIFICATION_REQUIRED === "true",
    autoSignInAfterVerification: true,
    verificationTokenExpiresIn: parseInt(process.env.BETTERAUTH_EMAIL_VERIFICATION_EXPIRES || "86400"), // 24 hours in seconds
    sendVerificationEmail: async (data, request) => {
      const { emailService } = await import("../services/email.service");
      
      try {
        await emailService.sendVerificationEmail(
          data.user.email,
          data.user.name || "User",
          data.url
        );
        console.log(`✅ Verification email sent to: ${data.user.email}`);
      } catch (error) {
        console.error("❌ Failed to send verification email:", error);
        throw error;
      }
    },
    afterEmailVerification: async (user, request) => {
      console.log(`🎉 Email verified successfully for user: ${user.email}`);
      // You can add custom logic here, like granting access to premium features
    },
  },


  

  
  logger: {
    level: process.env.NODE_ENV === "production" ? "error" : "debug",
    disabled: process.env.NODE_ENV === "test",
  },

});
