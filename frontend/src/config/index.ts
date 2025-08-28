// Application configuration
export const config = {
  // Application info
  app: {
    name: 'Your App',
    version: '1.0.0',
    environment: 'development',
  },

  // API URLs
  api: {
    baseUrl: 'http://localhost:3000',
    trpcUrl: 'http://localhost:3000/api/trpc',
    authUrl: 'http://localhost:3000',
  },

  // Frontend URLs
  frontend: {
    baseUrl: 'http://localhost:3000',
  },

  // Asset URLs
  assets: {
    imagesBaseUrl: 'http://localhost:3000/uploads',
    avatarsUrl: 'http://localhost:3000/avatars',
    cdnUrl: '',
  },

  // Feature flags
  features: {
    analytics: false,
    errorReporting: false,
    debugMode: false,
  },

  // Development settings
  dev: {
    isDevelopment: true,
    isProduction: false,
    debugMode: true,
  },
} as const;

// Helper functions
export const getApiUrl = (endpoint: string = '') => {
  const baseUrl = config.api.baseUrl.replace(/\/$/, ''); // Remove trailing slash
  const cleanEndpoint = endpoint.replace(/^\//, ''); // Remove leading slash
  return cleanEndpoint ? `${baseUrl}/${cleanEndpoint}` : baseUrl;
};

export const getTrpcUrl = () => config.api.trpcUrl;

export const getAuthUrl = () => config.api.authUrl;

export const getImageUrl = (imagePath: string) => {
  if (!imagePath) return '';
  
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  const baseUrl = config.assets.cdnUrl || config.assets.imagesBaseUrl;
  return `${baseUrl}/${imagePath.replace(/^\//, '')}`;
};

export const getAvatarUrl = (avatarPath: string | null | undefined) => {
  if (!avatarPath) return '';
  
  // If it's already a full URL, return as is
  if (avatarPath.startsWith('http://') || avatarPath.startsWith('https://')) {
    return avatarPath;
  }
  
  return `${config.assets.avatarsUrl}/${avatarPath.replace(/^\//, '')}`;
};

// Environment helpers
export const isDevelopment = () => config.dev.isDevelopment;
export const isProduction = () => config.dev.isProduction;
export const isDebugMode = () => config.dev.debugMode;

// Export default config
export default config;
