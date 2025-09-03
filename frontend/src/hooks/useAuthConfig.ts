import { useQuery } from '@tanstack/react-query';
import { trpcClient } from '@/lib/trpc';

/**
 * React Query hook for fetching authentication configuration
 * This hook provides the auth config with caching, loading states, and error handling
 */
export const useAuthConfig = () => {
  return useQuery({
    queryKey: ['authConfig'],
    queryFn: async () => {
      const config = await trpcClient.auth.getAuthConfig.query();
      return config;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (replaces cacheTime)
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

/**
 * Hook to get auth config with fallback to default config
 */
export const useAuthConfigWithFallback = () => {
  const query = useAuthConfig();
  
  const defaultConfig = {
    availableMethods: [
      {
        type: 'email' as const,
        label: 'Email',
        placeholder: 'Enter your email address',
        icon: 'Mail',
        verificationRequired: true,
        verificationType: 'email' as const
      },
      {
        type: 'phone' as const,
        label: 'Phone Number',
        placeholder: 'Enter your phone number',
        icon: 'Phone',
        verificationRequired: true,
        verificationType: 'sms' as const
      }
    ],
    settings: {
      allowMultipleMethods: true,
      defaultMethod: 'email' as const,
      passwordMinLength: 8,
      passwordMaxLength: 128
    },
    verification: {
      email: {
        enabled: true,
        expiresIn: 86400, // 24 hours
      },
      phone: {
        enabled: true,
        expiresIn: 300, // 5 minutes
      }
    },
    ui: {
      showEmailOption: true,
      showPhoneOption: true,
      showMethodSelector: true,
      methodSelectorLabel: 'Choose authentication method',
      emailLabel: 'Email Address',
      phoneLabel: 'Phone Number',
      passwordLabel: 'Password',
      confirmPasswordLabel: 'Confirm Password',
      nameLabel: 'Full Name',
      signUpButtonText: 'Create Account',
      signInButtonText: 'Sign In',
      forgotPasswordText: 'Forgot Password?',
      noAccountText: "Don't have an account?",
      hasAccountText: 'Already have an account?'
    },
    features: {
      emailVerification: true,
      phoneVerification: true,
      passwordReset: true,
      rememberMe: true,
      socialLogin: false
    }
  };

  return {
    ...query,
    data: query.isLoading ? undefined : (query.data || defaultConfig),
    isLoading: query.isLoading,
    error: query.error,
    isError: query.isError,
  };
};
