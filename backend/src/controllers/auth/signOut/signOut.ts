import { TRPCError } from "@trpc/server";
import { publicProcedure } from "../../../trpc/trpc";
import { auth } from "../../../auth/config";

export const signOut = publicProcedure.mutation(async ({ ctx }) => {
  try {
    await auth.api.signOut({
      headers: ctx.req.headers as any,
    });

    return { success: true };
  } catch (error: any) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to sign out",
    });
  }
});
