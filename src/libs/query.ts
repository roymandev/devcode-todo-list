import { QueryClient } from '@tanstack/react-query';

export const Query = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: Number.POSITIVE_INFINITY,
    },
  },
});
