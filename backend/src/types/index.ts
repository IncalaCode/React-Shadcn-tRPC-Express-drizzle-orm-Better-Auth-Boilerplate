export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginationOptions {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface UserProfile {
  id: string;
  email: string;
  name?: string;
  image?: string;
  role?: string;
  emailVerified?: Date;
  banned?: boolean;
  banReason?: string;
  banExpires?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface SessionInfo {
  id: string;
  userId: string;
  expiresAt: Date;
  ipAddress?: string;
  userAgent?: string;
}

export type UserRole = "admin" | "moderator" | "user";

export interface AuthUser {
  id: string;
  email: string;
  name?: string;
  role?: string;
  emailVerified?: Date;
}

export interface AuthSession {
  id: string;
  userId: string;
  expiresAt: Date;
}
