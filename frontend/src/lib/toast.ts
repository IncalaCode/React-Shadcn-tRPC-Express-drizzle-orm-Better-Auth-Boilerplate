import { toast } from 'sonner';

// Toast types for consistent usage
export const showToast = {
  // Success notifications
  success: (message: string, description?: string) => {
    toast.success(message, {
      description,
      duration: 4000,
    });
  },

  // Error notifications
  error: (message: string, description?: string) => {
    toast.error(message, {
      description,
      duration: 6000,
    });
  },

  // Warning notifications
  warning: (message: string, description?: string) => {
    toast.warning(message, {
      description,
      duration: 5000,
    });
  },

  // Info notifications
  info: (message: string, description?: string) => {
    toast.info(message, {
      description,
      duration: 4000,
    });
  },

  // Loading notifications
  loading: (message: string) => {
    return toast.loading(message);
  },

  // Dismiss a specific toast
  dismiss: (toastId: string | number) => {
    toast.dismiss(toastId);
  },
};

// Convenience functions for common use cases
export const showSuccess = (message: string) => showToast.success(message);
export const showError = (message: string) => showToast.error(message);
export const showWarning = (message: string) => showToast.warning(message);
export const showInfo = (message: string) => showToast.info(message);
export const showLoading = (message: string) => showToast.loading(message);
export const dismissToast = (toastId: string | number) => showToast.dismiss(toastId);
