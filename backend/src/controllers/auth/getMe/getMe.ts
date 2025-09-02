import { publicProcedure } from "../../../trpc/trpc";
import { isAuthenticated } from "../../../trpc/middleware/auth";

export const getMe = publicProcedure.use(isAuthenticated).query(({ ctx }) => {
  return {
    user: ctx.user,
    session: ctx.session,
  };
});
