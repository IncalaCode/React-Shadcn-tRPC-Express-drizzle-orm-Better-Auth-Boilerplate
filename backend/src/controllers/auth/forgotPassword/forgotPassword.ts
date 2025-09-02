import { TRPCError } from "@trpc/server";
import { publicProcedure } from "../../../trpc/trpc";
import { auth } from "../../../auth/config";
import { forgotPasswordSchema } from "../../../schemas/auth.schema";

export const forgotPassword = publicProcedure
  .input(forgotPasswordSchema)
  .mutation(async ({ input, ctx }) => {
    try {
      await auth.api.forgetPassword({
        body: {
          email: input.email,
          redirectTo: input.redirectTo,
        },
        headers: ctx.req.headers as any,
      });

      return { success: true };
    } catch (error: any) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: error.message || "Failed to send reset email",
      });
    }
  });
