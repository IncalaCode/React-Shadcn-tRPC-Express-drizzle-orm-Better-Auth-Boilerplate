import { router } from "../trpc";
import { authController } from "../../controllers/auth/auth.controller";
import { getAuthConfig } from "../../controllers/auth/authConfig";

export const authRouter = router({
  signUp: authController.signUp,
  signIn: authController.signIn,
  signOut: authController.signOut,
  getSession: authController.getSession,
  getMe: authController.getMe,
  updateProfile: authController.updateProfile,
  changePassword: authController.changePassword,
  forgotPassword: authController.forgotPassword,
  resetPassword: authController.resetPassword,
  verifyEmail: authController.verifyEmail,
  sendVerificationEmail: authController.sendVerificationEmail,
  getAuthConfig,
});
