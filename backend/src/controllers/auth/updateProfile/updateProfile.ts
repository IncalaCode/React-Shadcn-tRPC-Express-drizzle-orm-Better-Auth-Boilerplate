import { TRPCError } from "@trpc/server";
import { publicProcedure } from "../../../trpc/trpc";
import { isAuthenticated } from "../../../trpc/middleware/auth";
import { auth } from "../../../auth/config";
import { updateProfileSchema } from "../../../schemas/auth.schema";

export const updateProfile = publicProcedure.use(isAuthenticated)
  .input(updateProfileSchema)
  .mutation(async ({ input, ctx }) => {
    try {
      const result = await auth.api.updateUser({
        body: {
          name: input.name,
          image: input.image,
        },
        headers: ctx.req.headers as any,
      });

      return {
        success: true,
        user: result,
      };
    } catch (error: any) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: error.message || "Failed to update profile",
      });
    }
  });
