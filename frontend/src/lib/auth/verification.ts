import { verifyEmail, forgetPassword, resetPassword, authClient } from "./client";

export const verificationMethods = {
  // Email verification
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

  // Phone verification
  verifyPhone: async (phoneNumber: string, code: string) => {
    try {
      const result = await authClient.phoneNumber.verify({
        phoneNumber,
        code,
      });
      
      if (result.error) {
        throw new Error(result.error.message || 'Phone verification failed');
      }
      
      return {
        success: true,
        data: result.data,
      };
    } catch (error: any) {
      console.error('Phone verification API error:', error);
      throw error;
    }
  },

  // Send phone OTP
  sendPhoneOTP: async (phoneNumber: string) => {
    try {
      const result = await authClient.phoneNumber.sendOtp({
        phoneNumber,
      });
      
      if (result.error) {
        throw new Error(result.error.message || 'Failed to send OTP');
      }
      
      return {
        success: true,
        data: result.data,
      };
    } catch (error: any) {
      console.error('Send OTP API error:', error);
      throw error;
    }
  },

  // Forgot password
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

  // Reset password
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
};
