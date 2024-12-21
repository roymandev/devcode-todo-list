import { IconPlus } from '@tabler/icons-react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { ActivityCard, queryActivityList } from '../../../entities/activity';
import { Button, PageTitle } from '../../../shared/ui';

export const HomePage = () => {
  const {
    data: { data },
  } = useSuspenseQuery(queryActivityList());

  const handleAddActivity = () => {};

  const handleDeleteActivity = (id: number) => {};

  return (
    <main className="container">
      <section>
        <header className="my-11 flex items-center">
          <PageTitle data-cy="activity-title">Activity</PageTitle>

          <Button
            className="ml-auto"
            leftIcon={<IconPlus size={24} />}
            onClick={handleAddActivity}
          >
            Tambah
          </Button>
        </header>

        {!data.length && (
          <Button variant="unstyled" className="mx-auto block">
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
                onDelete={() => {}}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
};
