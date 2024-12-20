import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './app/styles/main.css';

import { RouterProvider, createRouter } from '@tanstack/react-router';
// Import the generated route tree
import { routeTree } from '../routeTree.gen.ts';

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
    <RouterProvider router={router} />
  </StrictMode>,
);
