import Activity from '@/components/Activity';
import ModalDeleteActivity from '@/components/modals/DeleteActivity';
import { useEffect, useState } from 'react';
import useActivity from '@/hooks/useActivity';
import { Activity as ActivityType } from '@/store';

const ActivityList = () => {
  const { activities, fetchActivities, addActivity, removeActivity } =
    useActivity();

  const [deleteActivityData, setDeleteActivityData] =
    useState<ActivityType | null>(null);

  useEffect(() => {
    fetchActivities();
  }, []);

  return (
    <>
      {activities.length ? (
        <div className="grid grid-cols-4 gap-5">
          {activities.map((activity) => (
            <Activity
              key={activity.id}
              onDelete={() => setDeleteActivityData(activity)}
              {...activity}
            />
          ))}
        </div>
      ) : (
        <button
          data-cy="activity-empty-state"
          className="mx-auto"
          onClick={addActivity}
        >
          <img src="/activity-empty-state.png" alt="No activity" />
        </button>
      )}

      {deleteActivityData && (
        <ModalDeleteActivity
          activity={deleteActivityData}
          onDelete={removeActivity}
          onClose={() => setDeleteActivityData(null)}
        />
      )}
    </>
  );
};

export default ActivityList;
