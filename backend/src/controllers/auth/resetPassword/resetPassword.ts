import { TRPCError } from "@trpc/server";
import { publicProcedure } from "../../../trpc/trpc";
import { auth } from "../../../auth/config";
import { resetPasswordSchema } from "../../../schemas/auth.schema";

export const resetPassword = publicProcedure
  .input(resetPasswordSchema)
  .mutation(async ({ input, ctx }) => {
    try {
      await auth.api.resetPassword({
        body: {
          token: input.token,
          newPassword: input.password,
        },
        headers: ctx.req.headers as any,
      });

      return { success: true };
    } catch (error: any) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: error.message || "Failed to reset password",
      });
    }
  });
