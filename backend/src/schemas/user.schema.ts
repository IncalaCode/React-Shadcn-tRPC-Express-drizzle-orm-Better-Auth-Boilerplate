import { z } from "zod";

export const uuidSchema = z.string().uuid("Invalid UUID format");

export const userRoleSchema = z.enum(["admin", "moderator", "user"], {
  errorMap: () => ({ message: "Invalid role" }),
});

export const paginationSchema = z.object({
  page: z.number().min(1, "Page must be at least 1").default(1),
  limit: z.number().min(1, "Limit must be at least 1").max(100, "Limit cannot exceed 100").default(10),
  search: z.string().optional(),
});

export const updateUserProfileSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long").optional(),
  image: z.string().url("Invalid image URL").optional(),
});

export const deleteAccountSchema = z.object({
  password: z.string().min(1, "Password is required for account deletion"),
});

export const banUserSchema = z.object({
  userId: uuidSchema,
  reason: z.string().min(1, "Ban reason is required").max(500, "Ban reason is too long"),
  expiresAt: z.date().optional(),
});

export const unbanUserSchema = z.object({
  userId: uuidSchema,
});

export const getUserByIdSchema = z.object({
  userId: uuidSchema,
});

export const updateUserRoleSchema = z.object({
  userId: uuidSchema,
  role: userRoleSchema,
});

// Response schemas
export const userProfileSchema = z.object({
  id: uuidSchema,
  email: z.string().email(),
  name: z.string().nullable(),
  image: z.string().url().nullable(),
  role: userRoleSchema.nullable(),
  emailVerified: z.date().nullable(),
  banned: z.boolean().nullable(),
  banReason: z.string().nullable(),
  banExpires: z.date().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const paginatedUsersSchema = z.object({
  users: z.array(userProfileSchema),
  pagination: z.object({
    page: z.number(),
    limit: z.number(),
    total: z.number(),
    pages: z.number(),
  }),
});

// Type exports
export type UserRole = z.infer<typeof userRoleSchema>;
export type PaginationInput = z.infer<typeof paginationSchema>;
export type UpdateUserProfileInput = z.infer<typeof updateUserProfileSchema>;
export type DeleteAccountInput = z.infer<typeof deleteAccountSchema>;
export type BanUserInput = z.infer<typeof banUserSchema>;
export type UnbanUserInput = z.infer<typeof unbanUserSchema>;
export type GetUserByIdInput = z.infer<typeof getUserByIdSchema>;
export type UpdateUserRoleInput = z.infer<typeof updateUserRoleSchema>;
export type UserProfile = z.infer<typeof userProfileSchema>;
export type PaginatedUsers = z.infer<typeof paginatedUsersSchema>;
