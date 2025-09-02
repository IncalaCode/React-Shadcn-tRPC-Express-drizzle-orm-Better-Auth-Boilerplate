import { publicProcedure } from "../../../trpc/trpc";
import { auth } from "../../../auth/config";

export const getSession = publicProcedure.query(async ({ ctx }) => {
  try {
    const session = await auth.api.getSession({
      headers: ctx.req.headers as any,
    });

    return session || null;
  } catch (error) {
    return null;
  }
});
