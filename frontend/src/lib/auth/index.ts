// Export auth client and utilities
export {
  authClient,
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
  isAuthenticated,
} from "./client";


export { loginMethods } from "./login";
export { registerMethods } from "./register";
export { verificationMethods } from "./verification";
export { profileMethods } from "./profile";

// Combined auth API for backward compatibility
import { loginMethods } from "./login";
import { registerMethods } from "./register";
import { verificationMethods } from "./verification";
import { profileMethods } from "./profile";

export const authAPI = {
  // Login methods
  ...loginMethods,
  
  // Registration methods
  ...registerMethods,
  
  // Verification methods
  ...verificationMethods,
  
  // Profile methods
  ...profileMethods,
};
