import { trpc } from '@/lib/trpc';

export const useAdminConfig = () => {
  return (trpc as any).admin.getConfig.useQuery();
};
