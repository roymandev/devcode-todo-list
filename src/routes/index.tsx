import { IconPlus } from '@tabler/icons-react';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Button } from '../components/Button';
import { PageTitle } from '../components/PageTitle';
import { Query } from '../libs/query';
import { queryActivityList } from '../modules/activity/api/activity-list';
import { mutateCreateActivity } from '../modules/activity/api/create-activity';
import { ActivityCard } from '../modules/activity/ui/ActivityCard';

export const Route = createFileRoute('/')({
  component: HomePage,
  loader: () => Query.ensureQueryData(queryActivityList()),
});

function HomePage() {
  const {
    data: { data },
  } = useSuspenseQuery(queryActivityList());

  const { isPending, mutate } = useMutation(mutateCreateActivity);

  const handleAddActivity = () => mutate();

  const handleDeleteActivity = (id: number) => {
    console.log(id);
  };

  return (
    <main className="container">
      <section>
        <header className="my-11 flex items-center">
          <PageTitle data-cy="activity-title">Activity</PageTitle>

          <Button
            className="ml-auto"
            leftIcon={<IconPlus size={24} />}
            onClick={handleAddActivity}
            disabled={isPending}
          >
            Tambah
          </Button>
        </header>

        {!data.length && (
          <Button
            variant="unstyled"
            className="mx-auto block"
            disabled={isPending}
          >
            <img src="/images/activity-empty-state.svg" alt="Empty state" />
          </Button>
        )}

        {data.length && (
          <div className="grid grid-cols-4 gap-x-5 gap-y-6">
            {data.map((activity) => (
              <ActivityCard
                key={activity.id}
                title={activity.title}
                date={activity.created_at}
                onDelete={() => handleDeleteActivity(activity.id)}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
