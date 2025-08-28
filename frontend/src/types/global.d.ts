// Global type definitions

// Vite environment variables
interface ImportMetaEnv {
  readonly VITE_APP_NAME: string;
  readonly VITE_APP_VERSION: string;
  readonly VITE_BACKEND_URL: string;
  readonly VITE_FRONTEND_URL: string;
  readonly VITE_API_BASE_URL: string;
  readonly VITE_TRPC_URL: string;
  readonly VITE_AUTH_URL: string;
  readonly VITE_IMAGES_BASE_URL: string;
  readonly VITE_AVATARS_URL: string;
  readonly VITE_CDN_URL: string;
  readonly VITE_NODE_ENV: 'development' | 'production' | 'test';
  readonly VITE_PORT: string;
  readonly VITE_ENABLE_ANALYTICS: string;
  readonly VITE_ENABLE_ERROR_REPORTING: string;
  readonly VITE_DEBUG_MODE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Build-time constants
declare const __APP_VERSION__: string;
declare const __BUILD_TIME__: string;

// Window extensions (for potential future use)
declare global {
  interface Window {
    // Add any window extensions here
    __APP_CONFIG__?: any;
  }
}

export {};
