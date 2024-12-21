import { Outlet, createRootRoute } from '@tanstack/react-router';
import { MainHeader } from '../components/MainHeader';

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <>
      <MainHeader />
      <Outlet />
    </>
  );
}
