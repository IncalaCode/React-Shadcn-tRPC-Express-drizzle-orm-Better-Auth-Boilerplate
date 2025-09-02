import { TRPCError } from "@trpc/server";
import { publicProcedure } from "../../../trpc/trpc";
import { isAuthenticated } from "../../../trpc/middleware/auth";
import { auth } from "../../../auth/config";

export const sendVerificationEmail = publicProcedure.use(isAuthenticated).mutation(async ({ ctx }) => {
  try {
    await auth.api.sendVerificationEmail({
      body: {
        email: ctx.user.email,
      },
      headers: ctx.req.headers as any,
    });

    return { success: true };
  } catch (error: any) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: error.message || "Failed to send verification email",
    });
  }
});
