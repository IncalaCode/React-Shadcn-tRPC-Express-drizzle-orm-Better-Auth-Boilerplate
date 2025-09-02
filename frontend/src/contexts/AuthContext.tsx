import { createContext, useContext, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI, useSession } from '@/lib/auth';
import { toast } from 'sonner';

interface User {
  id: string;
  email: string;
  name?: string;
  emailVerified?: boolean;
  role?: string;
  banned?: boolean;
  image?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: UpdateProfileData) => Promise<void>;
}

interface RegisterData {
  email: string;
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

  const register = async (data: RegisterData) => {
    try {
      const result = await authAPI.register(data);
      if (result.success) {
        toast.success('Registration successful!', {
          description: 'Please check your email to verify your account.',
        });
        navigate('/auth/login');
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

  const updateProfile = async (data: UpdateProfileData) => {
    try {
      const result = await authAPI.updateProfile(data);
      if (result.success) {
        toast.success('Profile updated successfully', {
          description: 'Your changes have been saved.',
        });
        // Note: Better Auth will automatically update the session
      } else {
        throw new Error('Profile update failed');
      }
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
    login,
    register,
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
