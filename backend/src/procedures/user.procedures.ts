import { TRPCError } from "@trpc/server";
import { publicProcedure } from "../trpc/trpc";
import { isAuthenticated, isEmailVerified, hasRole } from "../trpc/middleware/auth";
import { AppDataSource } from "../database/connection";
import { User } from "../database/entities/User";
import {
  updateUserProfileSchema,
  deleteAccountSchema,
  paginationSchema,
  banUserSchema,
  unbanUserSchema,
  getUserByIdSchema,
  updateUserRoleSchema,
} from "../schemas/user.schema";

export const userProcedures = {
  // User profile procedures
  getProfile: publicProcedure.use(isAuthenticated).query(async ({ ctx }) => {
    try {
      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOne({
        where: { id: ctx.user.id },
        select: ["id", "email", "name", "image", "role", "emailVerified", "createdAt", "updatedAt"],
      });

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }

      return user;
    } catch (error: any) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch profile",
      });
    }
  }),

  updateProfile: publicProcedure.use(isAuthenticated)
    .input(updateUserProfileSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        const userRepository = AppDataSource.getRepository(User);
        
        await userRepository.update(ctx.user.id, {
          ...(input.name && { name: input.name }),
          ...(input.image && { image: input.image }),
          updatedAt: new Date(),
        });

        const updatedUser = await userRepository.findOne({
          where: { id: ctx.user.id },
          select: ["id", "email", "name", "image", "role", "emailVerified", "createdAt", "updatedAt"],
        });

        return updatedUser;
      } catch (error: any) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update profile",
        });
      }
    }),

  deleteAccount: publicProcedure.use(isAuthenticated).use(isEmailVerified)
    .input(deleteAccountSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        // Note: In a real implementation, you would verify the password first
        const userRepository = AppDataSource.getRepository(User);
        
        await userRepository.delete(ctx.user.id);

        return { success: true };
      } catch (error: any) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to delete account",
        });
      }
    }),

  // Admin-only procedures
  getAllUsers: publicProcedure.use(isAuthenticated).use(hasRole(["admin", "moderator"]))
    .input(paginationSchema)
    .query(async ({ input }) => {
      try {
        const userRepository = AppDataSource.getRepository(User);
        const skip = (input.page - 1) * input.limit;

        let queryBuilder = userRepository
          .createQueryBuilder("user")
          .select([
            "user.id",
            "user.email",
            "user.name",
            "user.image",
            "user.role",
            "user.emailVerified",
            "user.banned",
            "user.createdAt",
            "user.updatedAt",
          ]);

        if (input.search) {
          queryBuilder = queryBuilder.where(
            "user.email ILIKE :search OR user.name ILIKE :search",
            { search: `%${input.search}%` }
          );
        }

        const [users, total] = await queryBuilder
          .skip(skip)
          .take(input.limit)
          .orderBy("user.createdAt", "DESC")
          .getManyAndCount();

        return {
          users,
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
    }),

  getUserById: publicProcedure.use(isAuthenticated).use(hasRole(["admin", "moderator"]))
    .input(getUserByIdSchema)
    .query(async ({ input }) => {
      try {
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOne({
          where: { id: input.userId },
          select: [
            "id", "email", "name", "image", "role", "emailVerified", 
            "banned", "banReason", "banExpires", "createdAt", "updatedAt"
          ],
        });

        if (!user) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "User not found",
          });
        }

        return user;
      } catch (error: any) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch user",
        });
      }
    }),

  banUser: publicProcedure.use(isAuthenticated).use(hasRole("admin"))
    .input(banUserSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        if (input.userId === ctx.user.id) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Cannot ban yourself",
          });
        }

        const userRepository = AppDataSource.getRepository(User);
        
        // Get user details before banning
        const userToBan = await userRepository.findOne({
          where: { id: input.userId },
          select: ["email", "name"],
        });

        await userRepository.update(input.userId, {
          banned: true,
          banReason: input.reason,
          banExpires: input.expiresAt,
          updatedAt: new Date(),
        });

        // Send account banned notification email
        if (userToBan) {
          try {
            const { emailService } = await import("../services/email.service");
            await emailService.sendAccountBannedEmail(
              userToBan.email,
              userToBan.name || "User",
              input.reason
            );
            console.log(`✅ Account banned notification sent to: ${userToBan.email}`);
          } catch (emailError) {
            console.error("❌ Failed to send account banned notification:", emailError);
            // Don't fail the ban if email fails
          }
        }

        return { success: true };
      } catch (error: any) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to ban user",
        });
      }
    }),

  unbanUser: publicProcedure.use(isAuthenticated).use(hasRole("admin"))
    .input(unbanUserSchema)
    .mutation(async ({ input }) => {
      try {
        const userRepository = AppDataSource.getRepository(User);
        
        // Get user details before unbanning
        const userToUnban = await userRepository.findOne({
          where: { id: input.userId },
          select: ["email", "name"],
        });
        
        await userRepository.update(input.userId, {
          banned: false,
          banReason: undefined,
          banExpires: undefined,
          updatedAt: new Date(),
        });

        // Send account unbanned notification email
        if (userToUnban) {
          try {
            const { emailService } = await import("../services/email.service");
            await emailService.sendAccountUnbannedEmail(
              userToUnban.email,
              userToUnban.name || "User"
            );
            console.log(`✅ Account unbanned notification sent to: ${userToUnban.email}`);
          } catch (emailError) {
            console.error("❌ Failed to send account unbanned notification:", emailError);
            // Don't fail the unban if email fails
          }
        }

        return { success: true };
      } catch (error: any) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to unban user",
        });
      }
    }),

  updateUserRole: publicProcedure.use(isAuthenticated).use(hasRole("admin"))
    .input(updateUserRoleSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        if (input.userId === ctx.user.id) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Cannot change your own role",
          });
        }

        const userRepository = AppDataSource.getRepository(User);
        
        await userRepository.update(input.userId, {
          role: input.role,
          updatedAt: new Date(),
        });

        return { success: true };
      } catch (error: any) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update user role",
        });
      }
    }),

  // Statistics procedure
  getUserStats: publicProcedure.use(isAuthenticated).use(hasRole("admin")).query(async () => {
    try {
      const userRepository = AppDataSource.getRepository(User);
      
      const [totalUsers, activeUsers, bannedUsers, verifiedUsers] = await Promise.all([
        userRepository.count(),
        userRepository.count({ where: { banned: false } }),
        userRepository.count({ where: { banned: true } }),
        userRepository.createQueryBuilder("user")
          .where("user.emailVerified IS NOT NULL")
          .getCount(),
      ]);

      return {
        totalUsers,
        activeUsers,
        bannedUsers,
        verifiedUsers,
        unverifiedUsers: totalUsers - verifiedUsers,
      };
    } catch (error: any) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch user statistics",
      });
    }
  }),
};
