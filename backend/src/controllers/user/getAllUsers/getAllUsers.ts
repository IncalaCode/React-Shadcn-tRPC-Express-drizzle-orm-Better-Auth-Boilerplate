import { TRPCError } from "@trpc/server";
import { publicProcedure } from "../../../trpc/trpc";
import { isAuthenticated, hasRole } from "../../../trpc/middleware/auth";
import { db } from "../../../database/connection";
import { user } from "../../../database/entities/auth-schema";
import { desc, ilike, or, count } from "drizzle-orm";
import { paginationSchema } from "../../../schemas/user.schema";

export const getAllUsers = publicProcedure.use(isAuthenticated).use(hasRole(["admin", "moderator"]))
  .input(paginationSchema)
  .query(async ({ input }) => {
    try {
      const skip = (input.page - 1) * input.limit;

      let whereCondition;
      if (input.search) {
        whereCondition = or(
          ilike(user.email, `%${input.search}%`),
          ilike(user.name, `%${input.search}%`)
        );
      }

      const [usersList, totalResult] = await Promise.all([
        db
          .select({
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
            role: user.role,
            emailVerified: user.emailVerified,
            banned: user.banned,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
          })
          .from(user)
          .where(whereCondition)
          .orderBy(desc(user.createdAt))
          .limit(input.limit)
          .offset(skip),
        db
          .select({ count: count() })
          .from(user)
          .where(whereCondition)
      ]);

      const total = totalResult[0]?.count || 0;

      return {
        users: usersList,
        pagination: {
          page: input.page,
          limit: input.limit,
          total,
          pages: Math.ceil(total / input.limit),
          hasNext: input.page < Math.ceil(total / input.limit),
          hasPrev: input.page > 1,
        },
      };
    } catch (error: any) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch users",
      });
    }
  });
