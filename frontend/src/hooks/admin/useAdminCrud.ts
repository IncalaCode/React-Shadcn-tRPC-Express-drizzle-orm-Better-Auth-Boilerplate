import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';

export const useAdminCrud = () => {
  const crudMutation = (trpc as any).admin.crud.useMutation({
    onSuccess: (data: any) => {
      toast.success('Operation completed successfully!');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Operation failed');
    },
  });

  const handleCrud = async (entity: string, action: string, data?: any, id?: string, filters?: any) => {
    return new Promise((resolve, reject) => {
      crudMutation.mutate(
        { entity, action, data, id, filters },
        {
          onSuccess: (result: any) => {
            resolve(result || {});
          },
          onError: (error: any) => {
            reject(error);
          },
        }
      );
    });
  };

  return {
    crudMutation,
    handleCrud,
    isLoading: crudMutation.isPending,
  };
};
