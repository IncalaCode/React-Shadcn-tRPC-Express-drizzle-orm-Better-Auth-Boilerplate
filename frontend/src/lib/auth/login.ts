import { signIn, authClient } from "./client";

export const loginMethods = {
  // Email login
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

  // Phone login
  loginWithPhone: async (credentials: { phone: string; password: string }) => {
    try {
      const result = await signIn.phoneNumber({
        phoneNumber: credentials.phone,
        password: credentials.password,
        rememberMe: true,
      });
      
      if (result.error) {
        throw new Error(result.error.message || 'Phone login failed');
      }
      
      return {
        success: true,
        data: {
          user: result.data?.user,
        }
      };
    } catch (error: any) {
      console.error('Phone login API error:', error);
      throw error;
    }
  },
};
