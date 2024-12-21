import { QueryClient } from '@tanstack/react-query';
import ky from 'ky';

export const API = ky.create({
  prefixUrl: import.meta.env.VITE_API_URL,
  searchParams: { email: import.meta.env.VITE_API_EMAIL },
});

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
