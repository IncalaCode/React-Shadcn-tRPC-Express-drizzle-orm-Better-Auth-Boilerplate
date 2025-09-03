import { signUp, authClient } from "./client";

export const registerMethods = {
  register: async (userData: { 
    email?: string; 
    phoneNumber?: string;
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
        : userData.username || userData.email?.split('@')[0] || userData.phoneNumber || 'User';

      // Determine registration method based on available data
      if (userData.email) {
        const result = await signUp.email({
          email: userData.email,
          password: userData.password,
          name,
        });
        
        if (result.error) {
          throw new Error(result.error.message || 'Email registration failed');
        }
        
        return {
          success: true,
          data: {
            user: result.data?.user,
          }
        };
      } else if (userData.phoneNumber) {
        // For phone registration, we need to use the phone number verification flow
        // First send OTP to the phone number
        const otpResult = await authClient.phoneNumber.sendOtp({
          phoneNumber: userData.phoneNumber,
        });
        
        if (otpResult.error) {
          throw new Error(otpResult.error.message || 'Failed to send OTP');
        }
        
        // Return success with a message to verify the phone
        return {
          success: true,
          data: {
            message: 'OTP sent to your phone number. Please verify to complete registration.',
            requiresVerification: true,
            phoneNumber: userData.phoneNumber,
          }
        };
      } else {
        throw new Error('Either email or phone must be provided for registration');
      }
    } catch (error: any) {
      console.error('Register API error:', error);
      throw error;
    }
  },
};
