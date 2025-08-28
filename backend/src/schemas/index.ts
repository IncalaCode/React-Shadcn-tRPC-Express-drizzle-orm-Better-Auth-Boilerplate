// Export all schemas from a central location
export * from "./auth.schema";
export * from "./user.schema";


// Re-export commonly used schemas for convenience
export {
  emailSchema,
  passwordSchema,
  nameSchema,
  signUpSchema,
  signInSchema,
} from "./auth.schema";

export {
  uuidSchema,
  userRoleSchema,
  paginationSchema,
  userProfileSchema,
} from "./user.schema";

export {
  idSchema,
  paginationInputSchema,
  successResponseSchema,
  errorResponseSchema,
} from "./common.schema";
