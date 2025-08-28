import { z } from "zod";

// Common validation schemas
export const idSchema = z.string().uuid("Invalid ID format");

export const emailSchema = z.string().email("Invalid email address");

export const urlSchema = z.string().url("Invalid URL format");

export const dateSchema = z.date();

export const timestampSchema = z.union([z.date(), z.string().datetime()]);

// Pagination schemas
export const paginationInputSchema = z.object({
  page: z.number().min(1, "Page must be at least 1").default(1),
  limit: z.number().min(1, "Limit must be at least 1").max(100, "Limit cannot exceed 100").default(10),
  search: z.string().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export const paginationMetaSchema = z.object({
  page: z.number(),
  limit: z.number(),
  total: z.number(),
  pages: z.number(),
  hasNext: z.boolean(),
  hasPrev: z.boolean(),
});

// Generic paginated response schema
export const createPaginatedResponseSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
  z.object({
    data: z.array(itemSchema),
    pagination: paginationMetaSchema,
  });

// API Response schemas
export const successResponseSchema = z.object({
  success: z.literal(true),
  message: z.string().optional(),
});

export const errorResponseSchema = z.object({
  success: z.literal(false),
  error: z.string(),
  code: z.string().optional(),
});

export const apiResponseSchema = z.union([successResponseSchema, errorResponseSchema]);

// File upload schema
export const fileUploadSchema = z.object({
  filename: z.string(),
  mimetype: z.string(),
  size: z.number().max(10 * 1024 * 1024, "File size cannot exceed 10MB"), // 10MB limit
  url: urlSchema.optional(),
});

// Search and filter schemas
export const searchSchema = z.object({
  query: z.string().min(1, "Search query is required"),
  fields: z.array(z.string()).optional(),
});

export const filterSchema = z.object({
  field: z.string(),
  operator: z.enum(["eq", "ne", "gt", "gte", "lt", "lte", "in", "nin", "contains"]),
  value: z.union([z.string(), z.number(), z.boolean(), z.array(z.any())]),
});

export const sortSchema = z.object({
  field: z.string(),
  direction: z.enum(["asc", "desc"]).default("asc"),
});

// Common input validation
export const stringWithLengthSchema = (min: number, max: number, message?: string) =>
  z.string()
    .min(min, message || `Must be at least ${min} characters`)
    .max(max, message || `Must be at most ${max} characters`)
    .trim();

export const optionalStringWithLengthSchema = (min: number, max: number, message?: string) =>
  stringWithLengthSchema(min, max, message).optional();

// Type exports
export type PaginationInput = z.infer<typeof paginationInputSchema>;
export type PaginationMeta = z.infer<typeof paginationMetaSchema>;
export type SuccessResponse = z.infer<typeof successResponseSchema>;
export type ErrorResponse = z.infer<typeof errorResponseSchema>;
export type ApiResponse = z.infer<typeof apiResponseSchema>;
export type FileUpload = z.infer<typeof fileUploadSchema>;
export type SearchInput = z.infer<typeof searchSchema>;
export type FilterInput = z.infer<typeof filterSchema>;
export type SortInput = z.infer<typeof sortSchema>;
