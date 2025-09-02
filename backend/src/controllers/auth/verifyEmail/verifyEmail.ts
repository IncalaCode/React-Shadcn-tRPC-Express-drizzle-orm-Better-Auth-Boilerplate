import { TRPCError } from "@trpc/server";
import { publicProcedure } from "../../../trpc/trpc";
import { auth } from "../../../auth/config";
import { verifyEmailSchema } from "../../../schemas/auth.schema";

export const verifyEmail = publicProcedure
  .input(verifyEmailSchema)
  .mutation(async ({ input, ctx }) => {
    try {
      await auth.api.verifyEmail({
        query: { token: input.token },
        headers: ctx.req.headers as any,
      });

      return { success: true };
    } catch (error: any) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: error.message || "Failed to verify email",
      });
    }
  });
