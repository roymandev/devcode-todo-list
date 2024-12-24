import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/activity/$id')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/activity/$id"!</div>;
}
