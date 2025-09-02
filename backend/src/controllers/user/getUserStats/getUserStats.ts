import { TRPCError } from "@trpc/server";
import { publicProcedure } from "../../../trpc/trpc";
import { isAuthenticated, hasRole } from "../../../trpc/middleware/auth";
import { db } from "../../../database/connection";
import { user } from "../../../database/entities/auth-schema";
import { count, eq, isNotNull } from "drizzle-orm";

export const getUserStats = publicProcedure.use(isAuthenticated).use(hasRole("admin")).query(async () => {
  try {
    const [totalUsers, activeUsers, bannedUsers, verifiedUsers] = await Promise.all([
      db.select({ count: count() }).from(user),
      db.select({ count: count() }).from(user).where(eq(user.banned, false)),
      db.select({ count: count() }).from(user).where(eq(user.banned, true)),
      db.select({ count: count() }).from(user).where(isNotNull(user.emailVerified)),
    ]);

    return {
      totalUsers: totalUsers[0]?.count || 0,
      activeUsers: activeUsers[0]?.count || 0,
      bannedUsers: bannedUsers[0]?.count || 0,
      verifiedUsers: verifiedUsers[0]?.count || 0,
      unverifiedUsers: (totalUsers[0]?.count || 0) - (verifiedUsers[0]?.count || 0),
    };
  } catch (error: any) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to fetch user statistics",
    });
  }
});
