/**
 * Authentication Configuration Service
 * 
 * This service fetches authentication configuration from the backend
 * and provides it to the frontend components to determine which
 * authentication methods to show and how to configure the UI.
 */

export interface AuthMethod {
  type: 'email' | 'phone';
  label: string;
  placeholder: string;
  icon: string;
  verificationRequired: boolean;
  verificationType: 'email' | 'sms';
}

export interface AuthSettings {
  allowMultipleMethods: boolean;
  defaultMethod: 'email' | 'phone';
  passwordMinLength: number;
  passwordMaxLength: number;
}

export interface VerificationSettings {
  email: {
    enabled: boolean;
    expiresIn: number;
  };
  phone: {
    enabled: boolean;
    expiresIn: number;
  };
}

export interface AuthUIConfig {
  showEmailOption: boolean;
  showPhoneOption: boolean;
  showMethodSelector: boolean;
  methodSelectorLabel: string;
  emailLabel: string;
  phoneLabel: string;
  passwordLabel: string;
  confirmPasswordLabel: string;
  nameLabel: string;
  signUpButtonText: string;
  signInButtonText: string;
  forgotPasswordText: string;
  noAccountText: string;
  hasAccountText: string;
}

export interface AuthFeatures {
  emailVerification: boolean;
  phoneVerification: boolean;
  passwordReset: boolean;
  rememberMe: boolean;
  socialLogin: boolean;
}

export interface AuthPageAccess {
  allowLogin: boolean;
  allowRegister: boolean;
  allowForgotPassword: boolean;
  allowResetPassword: boolean;
}

export interface AuthConfig {
  availableMethods: AuthMethod[];
  settings: AuthSettings;
  verification: VerificationSettings;
  ui: AuthUIConfig;
  pages: AuthPageAccess;
  features: AuthFeatures;
}

class AuthConfigService {
  private config: AuthConfig | null = null;
  private configPromise: Promise<AuthConfig> | null = null;

  /**
   * Fetch authentication configuration from backend
   * @returns Promise<AuthConfig>
   */
  async fetchConfig(): Promise<AuthConfig> {
    if (this.config) {
      return this.config;
    }

    if (this.configPromise) {
      return this.configPromise;
    }

    this.configPromise = this.loadConfig();
    this.config = await this.configPromise;
    return this.config;
  }

  private async loadConfig(): Promise<AuthConfig> {
    try {
      const { trpcClient } = await import('@/lib/trpc');
      const config = await trpcClient.auth.getAuthConfig.query();
      return config;
    } catch (error) {
      console.error('❌ Error loading auth config:', error);
      return this.getDefaultConfig();
    }
  }

  /**
   * Get default configuration (fallback)
   * @returns AuthConfig
   */
  private getDefaultConfig(): AuthConfig {
    return {
      availableMethods: [
        {
          type: 'email',
          label: 'Email',
          placeholder: 'Enter your email address',
          icon: 'Mail',
          verificationRequired: true,
          verificationType: 'email'
        }
      ],
      settings: {
        allowMultipleMethods: false,
        defaultMethod: 'email',
        passwordMinLength: 8,
        passwordMaxLength: 128,
      },
      verification: {
        email: {
          enabled: true,
          expiresIn: 86400, // 24 hours
        },
        phone: {
          enabled: false,
          expiresIn: 300, // 5 minutes
        }
      },
      ui: {
        showEmailOption: true,
        showPhoneOption: false,
        showMethodSelector: false,
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
        hasAccountText: 'Already have an account?',
      },
      pages: {
        allowLogin: true,
        allowRegister: true,
        allowForgotPassword: true,
        allowResetPassword: true,
      },
      features: {
        emailVerification: true,
        phoneVerification: false,
        passwordReset: true,
        rememberMe: true,
        socialLogin: false,
      }
    };
  }

  /**
   * Get current configuration (synchronous)
   * @returns AuthConfig | null
   */
  getConfig(): AuthConfig | null {
    return this.config;
  }

  /**
   * Check if email authentication is available
   * @returns boolean
   */
  isEmailAuthAvailable(): boolean {
    return this.config?.ui.showEmailOption ?? true;
  }

  /**
   * Check if phone authentication is available
   * @returns boolean
   */
  isPhoneAuthAvailable(): boolean {
    return this.config?.ui.showPhoneOption ?? false;
  }

  /**
   * Check if method selector should be shown
   * @returns boolean
   */
  shouldShowMethodSelector(): boolean {
    return this.config?.ui.showMethodSelector ?? false;
  }

  /**
   * Get available authentication methods
   * @returns AuthMethod[]
   */
  getAvailableMethods(): AuthMethod[] {
    return this.config?.availableMethods ?? [];
  }

  /**
   * Get default authentication method
   * @returns 'email' | 'phone'
   */
  getDefaultMethod(): 'email' | 'phone' {
    return this.config?.settings.defaultMethod ?? 'email';
  }

  /**
   * Check if login page is accessible
   * @returns boolean
   */
  isLoginPageAccessible(): boolean {
    return this.config?.pages.allowLogin ?? true;
  }

  /**
   * Check if register page is accessible
   * @returns boolean
   */
  isRegisterPageAccessible(): boolean {
    return this.config?.pages.allowRegister ?? true;
  }

  /**
   * Check if forgot password page is accessible
   * @returns boolean
   */
  isForgotPasswordPageAccessible(): boolean {
    return this.config?.pages.allowForgotPassword ?? true;
  }

  /**
   * Check if reset password page is accessible
   * @returns boolean
   */
  isResetPasswordPageAccessible(): boolean {
    return this.config?.pages.allowResetPassword ?? true;
  }

  /**
   * Reset configuration (useful for testing or re-fetching)
   */
  reset(): void {
    this.config = null;
    this.configPromise = null;
  }
}

// Export singleton instance
export const authConfigService = new AuthConfigService();
