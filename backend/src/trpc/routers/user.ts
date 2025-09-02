import { router } from "../trpc";
import { userController } from "../../controllers/user/user.controller";

export const userRouter = router({
  getProfile: userController.getProfile,
  updateProfile: userController.updateProfile,
  deleteAccount: userController.deleteAccount,
  getAllUsers: userController.getAllUsers,
  getUserById: userController.getUserById,
  banUser: userController.banUser,
  unbanUser: userController.unbanUser,
  updateUserRole: userController.updateUserRole,
  getUserStats: userController.getUserStats,
});
