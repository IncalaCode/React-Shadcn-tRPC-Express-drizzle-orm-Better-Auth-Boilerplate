// Import all user controllers from their respective folders
import { getProfile } from "./getProfile/getProfile";
import { updateProfile } from "./updateProfile/updateProfile";
import { deleteAccount } from "./deleteAccount/deleteAccount";
import { getAllUsers } from "./getAllUsers/getAllUsers";
import { getUserById } from "./getUserById/getUserById";
import { banUser } from "./banUser/banUser";
import { unbanUser } from "./unbanUser/unbanUser";
import { updateUserRole } from "./updateUserRole/updateUserRole";
import { getUserStats } from "./getUserStats/getUserStats";

export const userController = {
  // User profile controllers
  getProfile,
  updateProfile,
  deleteAccount,

  // Admin-only controllers
  getAllUsers,
  getUserById,
  banUser,
  unbanUser,
  updateUserRole,

  // Statistics controller
  getUserStats,
};
