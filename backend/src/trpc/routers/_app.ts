import { router } from "../trpc";
import { userRouter } from "./user";
import { adminRouter } from "./admin";

export const appRouter = router({
  user: userRouter,
  admin: adminRouter,
});

export type AppRouter = typeof appRouter;
