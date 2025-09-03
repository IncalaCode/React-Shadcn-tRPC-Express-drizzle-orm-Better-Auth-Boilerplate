import { getSession, signOut } from "./client";

export const profileMethods = {
  // Get user profile
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



  // Logout
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
};
