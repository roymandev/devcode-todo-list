import ky from 'ky';

export const API = ky.create({
  prefixUrl: import.meta.env.VITE_API_URL,

  hooks: {
    beforeRequest: [
      async (request) => {
        if (request.method === 'GET') {
          const url = new URL(request.url);
          url.searchParams.set('email', import.meta.env.VITE_API_EMAIL);
          return new Request(url.toString(), { method: request.method });
        }

        if (request.method === 'POST' || request.method === 'PUT') {
          const json = (await request.json()) as Record<string, unknown>;
          const body = JSON.stringify({
            ...json,
            email: import.meta.env.VITE_API_EMAIL,
          });

          return new Request(request, { body });
        }
      },
    ],
  },
});
