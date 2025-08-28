import { router } from "../trpc";
import { authProcedures } from "../../procedures/auth.procedures";

export const authRouter = router({
  signUp: authProcedures.signUp,
  signIn: authProcedures.signIn,
  signOut: authProcedures.signOut,
  getSession: authProcedures.getSession,
  getMe: authProcedures.getMe,
  updateProfile: authProcedures.updateProfile,
  changePassword: authProcedures.changePassword,
  forgotPassword: authProcedures.forgotPassword,
  resetPassword: authProcedures.resetPassword,
  verifyEmail: authProcedures.verifyEmail,
  sendVerificationEmail: authProcedures.sendVerificationEmail,
});
