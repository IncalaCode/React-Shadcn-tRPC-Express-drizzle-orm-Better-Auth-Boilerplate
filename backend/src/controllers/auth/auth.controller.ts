// Import all auth controllers from their respective folders
import { signUp } from "./signUp/signUp";
import { signIn } from "./signIn/signIn";
import { signOut } from "./signOut/signOut";
import { getSession } from "./getSession/getSession";
import { getMe } from "./getMe/getMe";
import { updateProfile } from "./updateProfile/updateProfile";
import { changePassword } from "./changePassword/changePassword";
import { forgotPassword } from "./forgotPassword/forgotPassword";
import { resetPassword } from "./resetPassword/resetPassword";
import { verifyEmail } from "./verifyEmail/verifyEmail";
import { sendVerificationEmail } from "./sendVerificationEmail/sendVerificationEmail";



export const authController = {
  // Public authentication controllers
  signUp,
  signIn,
  signOut,
  getSession,

  // Authenticated controllers
  getMe,
  updateProfile,
  changePassword,

  // Email verification controllers
  sendVerificationEmail,
  verifyEmail,

  // Password reset controllers
  forgotPassword,
  resetPassword,
};
