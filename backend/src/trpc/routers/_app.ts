import { router } from "../trpc";
import { userRouter } from "./user";
import { adminRouter } from "./admin";
import { authRouter } from "./auth";

export const appRouter = router({
  user: userRouter,
  admin: adminRouter,
  auth: authRouter,
});

export type AppRouter = typeof appRouter;
