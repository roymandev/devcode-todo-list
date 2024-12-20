import { createFileRoute } from '@tanstack/react-router';
import { HomePage } from '../ui/HomePage';

export const HomeRoute = createFileRoute('/')({
  component: HomePage,
});
