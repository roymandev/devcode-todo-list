import { IconChevronLeft, IconPlus } from '@tabler/icons-react';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { Link, createFileRoute } from '@tanstack/react-router';
import { Button } from '../../components/Button';
import { Query } from '../../libs/query';
import { queryActivityDetail } from '../../modules/activity/api/activity-detail';
import { mutateUpdateActivity } from '../../modules/activity/api/update-activity';
import { PageTitleEditable } from './-components/PageTitleEditable';

export const Route = createFileRoute('/activity/$id')({
  component: RouteComponent,
  loader: ({ params }) =>
    Query.ensureQueryData(queryActivityDetail(Number(params.id))),
});

function RouteComponent() {
  const { id } = Route.useParams();

  const { data } = useSuspenseQuery(queryActivityDetail(Number(id)));
  const mutationEditActivity = useMutation(mutateUpdateActivity);

  const handleEditActivity = (title: string) => {
    mutationEditActivity.mutate({ id: Number(id), title });
  };

  return (
    <>
      <main className="container">
        <header className="my-11 flex items-center gap-5">
          <Link data-cy="todo-back-button" to="/" className="-ml-1 p-1">
            <IconChevronLeft size={32} stroke={3} />
          </Link>

          <PageTitleEditable data-cy="todo-title" onFinish={handleEditActivity}>
            {data.title}
          </PageTitleEditable>

          <Button
            data-cy="activity-add-button"
            className="ml-auto"
            leftIcon={<IconPlus size={24} />}
          >
            Tambah
          </Button>
        </header>
      </main>
    </>
  );
}
