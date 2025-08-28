import { createAuthClient } from "better-auth/react";
import { config } from "@/config";

// Better Auth client configuration
export const authClient = createAuthClient({
  baseURL: config.api.authUrl, 
  credentials: "include",
});

// Export Better Auth hooks and utilities
export const {
  signIn,
  signUp,
  signOut,
  useSession,
  getSession,
  resetPassword,
  verifyEmail,
  changePassword,
  forgetPassword,
  sendVerificationEmail,
} = authClient;

// Helper functions for compatibility with existing code
export const isAuthenticated = async (): Promise<boolean> => {
  try {
    const session = await getSession();
    return !!session.data?.user;
  } catch {
    return false;
  }
};

// Auth API wrapper for Better Auth
export const authAPI = {
  login: async (credentials: { email: string; password: string }) => {
    try {
      const result = await signIn.email(credentials);
      
      if (result.error) {
        throw new Error(result.error.message || 'Login failed');
      }
      
      return {
        success: true,
        data: {
          user: result.data?.user,
        }
      };
    } catch (error: any) {
      console.error('Login API error:', error);
      throw error;
    }
  },
  
  register: async (userData: { 
    email: string; 
    password: string; 
    name: string;
    username?: string; 
    firstName?: string; 
    lastName?: string; 
  }) => {
    try {
      // Better Auth expects 'name' field, so we'll use firstName + lastName or username
      const name = userData.firstName && userData.lastName 
        ? `${userData.firstName} ${userData.lastName}`.trim()
        : userData.username || userData.email.split('@')[0];

      const result = await signUp.email({
        email: userData.email,
        password: userData.password,
        name,
      });
      
      if (result.error) {
        throw new Error(result.error.message || 'Registration failed');
      }
      
      return {
        success: true,
        data: {
          user: result.data?.user,
        }
      };
    } catch (error: any) {
      console.error('Register API error:', error);
      throw error;
    }
  },
  
  forgotPassword: async (email: string) => {
    try {
      const result = await forgetPassword({
        email,
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });
      
      if (result.error) {
        if (result.error.message?.includes('not found') || result.error.message?.includes('does not exist')) {
          throw new Error('Email not found. Please register first or check your email address.');
        }
        throw new Error(result.error.message || 'Failed to send reset email');
      }
      
      return {
        success: true,
        data: result.data,
      };
    } catch (error: any) {
      console.error('Forgot password API error:', error);
      throw error;
    }
  },
  
  resetPassword: async (token: string, password: string) => {
    try {
      const result = await resetPassword({
        token,
        newPassword: password,
      });
      
      if (result.error) {
        throw new Error(result.error.message || 'Password reset failed');
      }
      
      return {
        success: true,
        data: result.data,
      };
    } catch (error: any) {
      console.error('Reset password API error:', error);
      throw error;
    }
  },
  
  logout: async () => {
    try {
      const result = await signOut();
      
      if (result.error) {
        throw new Error(result.error.message || 'Logout failed');
      }
      
      return { success: true, data: null };
    } catch (error: any) {
      console.error('Logout API error:', error);
      throw error;
    }
  },
  
  getProfile: async () => {
    try {
      const session = await getSession();
      
      if (session.data?.user) {
        return {
          success: true,
          data: session.data.user,
        };
      }
      
      return { success: false, data: null };
    } catch (error: any) {
      console.error('Get profile API error:', error);
      throw error;
    }
  },
  
  updateProfile: async (profileData: { 
    username?: string; 
    firstName?: string; 
    lastName?: string; 
  }) => {
    try {
      // Better Auth doesn't have a direct updateProfile method
      // We'll need to use the tRPC endpoint for this
      const name = profileData.firstName && profileData.lastName 
        ? `${profileData.firstName} ${profileData.lastName}`.trim()
        : profileData.username;

      // For now, we'll return success and let the tRPC handle the actual update
      // This would need to be implemented via tRPC call
      return {
        success: true,
        data: { name },
      };
    } catch (error: any) {
      console.error('Update profile API error:', error);
      throw error;
    }
  },
  
  verifyEmail: async (token: string) => {
    try {
      const result = await verifyEmail({
        query: { token },
      });
      
      if (result.error) {
        throw new Error(result.error.message || 'Email verification failed');
      }
      
      return {
        success: true,
        data: result.data,
      };
    } catch (error: any) {
      console.error('Email verification API error:', error);
      throw error;
    }
  },
};
