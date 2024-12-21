import ky from 'ky';

export const API = ky.create({
  prefixUrl: import.meta.env.VITE_API_URL,
  searchParams: { email: import.meta.env.VITE_API_EMAIL },
});
