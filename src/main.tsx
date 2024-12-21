import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './styles/main.css';

import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createRouter } from '@tanstack/react-router';
// Import the generated route tree
import { routeTree } from '../routeTree.gen.ts';
import { Query } from './libs/query.ts';

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

// biome-ignore lint/style/noNonNullAssertion: This is root code
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={Query}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);
