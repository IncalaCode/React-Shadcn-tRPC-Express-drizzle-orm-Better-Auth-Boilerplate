import { createContext, useContext, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI, useSession } from '@/lib/auth';
import { trpcClient } from '@/lib/trpc';
import { toast } from 'sonner';
import { useAuthConfigWithFallback } from '@/hooks/useAuthConfig';
import { AuthConfig } from '@/services/authConfig.service';

interface User {
  id: string;
  email?: string;
  phone?: string;
  name?: string;
  emailVerified?: boolean;
  phoneVerified?: boolean;
  role?: string;
  banned?: boolean;
  image?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  authConfig: AuthConfig | null;
  authConfigLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithPhone: (phone: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<any>;
  verifyPhone: (phoneNumber: string, code: string) => Promise<void>;
  sendPhoneOTP: (phoneNumber: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: UpdateProfileData) => Promise<void>;
}

interface RegisterData {
  email?: string;
  phone?: string;
  password: string;
  name: string;
  username?: string;
  firstName?: string;
  lastName?: string;
}

interface UpdateProfileData {
  name?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const { data: session, isPending } = useSession();
  
  // Get user from Better Auth session
  const user = session?.user || null;
  const isLoading = isPending;

  // Use React Query hook for auth configuration
  const { data: authConfig, isLoading: authConfigLoading } = useAuthConfigWithFallback();

  const login = async (email: string, password: string) => {
    try {
      const result = await authAPI.login({ email, password });
      if (result.success && result.data) {
        toast.success('Login successful!', {
          description: `Welcome back, ${result.data.user?.name || result.data.user?.email}!`,
        });
        navigate('/');
      } else {
        throw new Error('Login failed');
      }
    } catch (error: any) {
      console.error('Login failed:', error);
      toast.error('Login failed', {
        description: error.message || 'Please check your credentials and try again.',
      });
      throw error;
    }
  };

  const loginWithPhone = async (phone: string, password: string) => {
    try {
      const result = await authAPI.loginWithPhone({ phone, password });
      if (result.success && result.data) {
        toast.success('Login successful!', {
          description: `Welcome back, ${result.data.user?.name || result.data.user?.phoneNumber || 'User'}!`,
        });
        navigate('/');
      } else {
        throw new Error('Login failed');
      }
    } catch (error: any) {
      console.error('Phone login failed:', error);
      toast.error('Login failed', {
        description: error.message || 'Please check your credentials and try again.',
      });
      throw error;
    }
  };

  const register = async (data: RegisterData) => {
    try {
      const result = await authAPI.register(data);
      if (result.success) {
        if (data.phone && result.data?.requiresVerification) {
          // Phone registration requires OTP verification
          toast.success('OTP sent!', {
            description: 'Please check your phone for the verification code.',
          });
          // Don't navigate to login yet, user needs to verify phone
          return { requiresVerification: true, phoneNumber: data.phone };
        } else {
          // Email registration
          toast.success('Registration successful!', {
            description: 'Please check your email to verify your account.',
          });
          navigate('/auth/login');
        }
      } else {
        throw new Error('Registration failed');
      }
    } catch (error: any) {
      console.error('Registration failed:', error);
      toast.error('Registration failed', {
        description: error.message || 'Please try again.',
      });
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
      toast.success('Logged out successfully', {
        description: 'Come back soon!',
      });
      navigate('/');
    } catch (error: any) {
      console.error('Logout failed:', error);
      toast.error('Logout failed', {
        description: error.message || 'Please try again.',
      });
      // Still navigate to home on error
      navigate('/');
    }
  };

  const verifyPhone = async (phoneNumber: string, code: string) => {
    try {
      const result = await authAPI.verifyPhone(phoneNumber, code);
      if (result.success) {
        toast.success('Phone verified successfully!', {
          description: 'Your phone number has been verified.',
        });
        navigate('/auth/login');
      } else {
        throw new Error('Phone verification failed');
      }
    } catch (error: any) {
      console.error('Phone verification failed:', error);
      toast.error('Phone verification failed', {
        description: error.message || 'Please check your code and try again.',
      });
      throw error;
    }
  };

  const sendPhoneOTP = async (phoneNumber: string) => {
    try {
      const result = await authAPI.sendPhoneOTP(phoneNumber);
      if (result.success) {
        toast.success('OTP sent!', {
          description: 'Please check your phone for the verification code.',
        });
      } else {
        throw new Error('Failed to send OTP');
      }
    } catch (error: any) {
      console.error('Send OTP failed:', error);
      toast.error('Failed to send OTP', {
        description: error.message || 'Please try again.',
      });
      throw error;
    }
  };

  const updateProfile = async (data: UpdateProfileData) => {
    try {
      // Use tRPC user router for profile updates
      await trpcClient.user.updateProfile.mutate({
        name: data.firstName && data.lastName 
          ? `${data.firstName} ${data.lastName}`.trim()
          : data.username || undefined,
      });
      
      toast.success('Profile updated successfully', {
        description: 'Your changes have been saved.',
      });
    } catch (error: any) {
      console.error('Profile update failed:', error);
      toast.error('Profile update failed', {
        description: error.message || 'Please try again.',
      });
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    authConfig: authConfig || null,
    authConfigLoading,
    login,
    loginWithPhone,
    register,
    verifyPhone,
    sendPhoneOTP,
    logout,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
