import { createAuthClient } from "better-auth/react";
import { phoneNumberClient } from "better-auth/client/plugins";
import { config } from "@/config";

// Better Auth client configuration
export const authClient = createAuthClient({
  baseURL: config.api.authUrl, 
  credentials: "include",
  plugins: [
    phoneNumberClient(),
  ],
});

// Export Better Auth hooks and utilities
export const {
  signIn,
  signUp,
  signOut,
  useSession,
  getSession,
  resetPassword,
  verifyEmail,
  changePassword,
  forgetPassword,
  sendVerificationEmail,
} = authClient;

// Helper functions for compatibility with existing code
export const isAuthenticated = async (): Promise<boolean> => {
  try {
    const session = await getSession();
    return !!session.data?.user;
  } catch {
    return false;
  }
};
