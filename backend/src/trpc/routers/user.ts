import { router } from "../trpc";
import { userProcedures } from "../../procedures/user.procedures";

export const userRouter = router({
  getProfile: userProcedures.getProfile,
  updateProfile: userProcedures.updateProfile,
  deleteAccount: userProcedures.deleteAccount,
  getAllUsers: userProcedures.getAllUsers,
  getUserById: userProcedures.getUserById,
  banUser: userProcedures.banUser,
  unbanUser: userProcedures.unbanUser,
  updateUserRole: userProcedures.updateUserRole,
  getUserStats: userProcedures.getUserStats,
});
