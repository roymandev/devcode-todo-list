import { IconPlus } from '@tabler/icons-react';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { Link, createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { Button } from '../components/Button';
import { PageTitle } from '../components/PageTitle';
import ModalDelete from '../components/modals/ModalDelete';
import { Query } from '../libs/query';
import { queryActivityList } from '../modules/activity/api/activity-list';
import { mutateCreateActivity } from '../modules/activity/api/create-activity';
import { mutateRemoveActivity } from '../modules/activity/api/remove-activity';
import type { ResGetActivityList } from '../modules/activity/api/types';
import { ActivityCard } from '../modules/activity/ui/ActivityCard';

type ActivityListItem = ResGetActivityList['data'][number];

export const Route = createFileRoute('/')({
  component: HomePage,
  loader: () => Query.ensureQueryData(queryActivityList()),
});

function HomePage() {
  const [deleteActivity, setDeleteActivity] = useState<ActivityListItem | null>(
    null,
  );

  const {
    data: { data },
  } = useSuspenseQuery(queryActivityList());

  const mutationCreateActivity = useMutation(mutateCreateActivity);
  const mutationRemoveActivity = useMutation(mutateRemoveActivity);

  const handleAddActivity = () => mutationCreateActivity.mutate();

  const handleDeleteActivity = setDeleteActivity;

  const handleApplyDeleteActivity = async () => {
    if (!deleteActivity) return;
    mutationRemoveActivity.mutate(deleteActivity.id);
  };

  return (
    <>
      <main className="container">
        <section>
          <header className="my-11 flex items-center">
            <PageTitle data-cy="activity-title">Activity</PageTitle>

            <Button
              data-cy="activity-add-button"
              className="ml-auto"
              leftIcon={<IconPlus size={24} />}
              onClick={handleAddActivity}
              loading={mutationCreateActivity.isPending}
            >
              Tambah
            </Button>
          </header>

          {!data.length ? (
            <Button
              data-cy="activity-empty-state"
              variant="unstyled"
              className="mx-auto block"
              loading={mutationCreateActivity.isPending}
              onClick={handleAddActivity}
            >
              <img src="/images/activity-empty-state.svg" alt="Empty state" />
            </Button>
          ) : (
            <div className="grid grid-cols-4 gap-x-5 gap-y-6">
              {data.map((activity) => (
                <Link
                  data-cy="activity-item"
                  key={activity.id}
                  to="/activity/$id"
                  params={{
                    id: activity.id.toString(),
                  }}
                >
                  <ActivityCard
                    title={activity.title}
                    date={activity.created_at}
                    onDelete={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleDeleteActivity(activity);
                    }}
                  />
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>

      <ModalDelete
        open={!!deleteActivity}
        onOpenChange={() => setDeleteActivity(null)}
        title={
          <>
            Apakah anda yakin menghapus activity
            <br />
            <b>“{deleteActivity?.title}”?</b>
          </>
        }
        onApply={handleApplyDeleteActivity}
        successMessage="Activity berhasil dihapus"
      />
    </>
  );
}
