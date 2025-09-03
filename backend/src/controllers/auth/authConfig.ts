import { publicProcedure } from "../../trpc/trpc";
import "dotenv/config";

/**
 * Get authentication configuration for frontend
 * This tRPC procedure provides the frontend with information about
 * which authentication methods are available and configured
 */
export const getAuthConfig = publicProcedure.query(async () => {
  const authMethod = process.env.AUTH_METHOD || "email";
  const phoneAuthEnabled = process.env.PHONE_AUTH_ENABLED === "true";
  const emailVerificationRequired = process.env.BETTERAUTH_EMAIL_VERIFICATION_REQUIRED === "true";
  const phoneVerificationRequired = process.env.PHONE_VERIFICATION_REQUIRED === "true";

  // Determine available authentication methods
  const availableMethods = [];
  
  if (authMethod === "email" || authMethod === "both") {
    availableMethods.push({
      type: "email" as const,
      label: "Email",
      placeholder: "Enter your email address",
      icon: "Mail",
      verificationRequired: emailVerificationRequired,
      verificationType: "email" as const
    });
  }
  
  if ((authMethod === "phone" || authMethod === "both") && phoneAuthEnabled) {
    availableMethods.push({
      type: "phone" as const,
      label: "Phone Number",
      placeholder: "Enter your phone number",
      icon: "Phone",
      verificationRequired: phoneVerificationRequired,
      verificationType: "sms" as const
    });
  }

  // Configuration for frontend
  const config = {
    // Available authentication methods
    availableMethods,
    
    // Authentication settings
    settings: {
      allowMultipleMethods: authMethod === "both",
      defaultMethod: authMethod === "both" ? "email" : authMethod as "email" | "phone",
      passwordMinLength: parseInt(process.env.BETTERAUTH_PASSWORD_MIN_LENGTH || "8"),
      passwordMaxLength: 128,
    },
    
    // Verification settings
    verification: {
      email: {
        enabled: emailVerificationRequired,
        expiresIn: parseInt(process.env.BETTERAUTH_EMAIL_VERIFICATION_EXPIRES || "86400"), // 24 hours
      },
      phone: {
        enabled: phoneVerificationRequired,
        expiresIn: parseInt(process.env.PHONE_VERIFICATION_EXPIRES || "300"), // 5 minutes
      }
    },
    
    // UI configuration
    ui: {
      showEmailOption: authMethod === "email" || authMethod === "both",
      showPhoneOption: (authMethod === "phone" || authMethod === "both") && phoneAuthEnabled,
      showMethodSelector: authMethod === "both",
      methodSelectorLabel: "Choose authentication method",
      emailLabel: "Email Address",
      phoneLabel: "Phone Number",
      passwordLabel: "Password",
      confirmPasswordLabel: "Confirm Password",
      nameLabel: "Full Name",
      signUpButtonText: "Create Account",
      signInButtonText: "Sign In",
      forgotPasswordText: "Forgot Password?",
      noAccountText: "Don't have an account?",
      hasAccountText: "Already have an account?",
    },
    
    // Feature flags
    features: {
      emailVerification: emailVerificationRequired,
      phoneVerification: phoneVerificationRequired,
      passwordReset: true,
      rememberMe: true,
      socialLogin: false, // Can be enabled later
    }
  };

  return config;
});
