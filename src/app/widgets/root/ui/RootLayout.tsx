import { Outlet } from '@tanstack/react-router';
import { Header } from '../../../shared/ui';

export const RootLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
