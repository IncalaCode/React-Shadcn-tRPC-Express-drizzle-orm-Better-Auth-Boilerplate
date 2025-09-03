import { createTRPCReact } from '@trpc/react-query';
import { httpBatchLink } from '@trpc/client';
import { getTrpcUrl } from '@/config';

// Create tRPC React hooks
export const trpc = createTRPCReact();

// Create tRPC client
export const trpcClient = (trpc as any).createClient({
  links: [
    httpBatchLink({
      url: getTrpcUrl(),
      fetch(url, options) {
        return fetch(url, {
          ...options,
          credentials: 'include',
        });
      },
    }),
  ],
});
