// Export all controllers from a central location
export * from "./auth/auth.controller";
export * from "./user/user.controller";

// Re-export commonly used controllers for convenience
export { authController } from "./auth/auth.controller";
export { userController } from "./user/user.controller";
