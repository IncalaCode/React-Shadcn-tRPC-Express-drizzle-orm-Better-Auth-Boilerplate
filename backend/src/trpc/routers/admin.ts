import { router } from "../trpc";
import { adminProcedures } from "../../admin/admin.procedures";

export const adminRouter = router({
  getConfig: adminProcedures.getConfig,
  getData: adminProcedures.getData,
  crud: adminProcedures.crud,
});
