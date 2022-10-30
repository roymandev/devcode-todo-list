import Activity from '@/components/Activity';
import { Activity as ActivityType } from '@/store';
import ModalDeleteActivity from '@/components/modals/DeleteActivity';
import { useState } from 'react';
import useActivity from '@/hooks/useActivity';

const ActivityList = () => {
  const { activities, createActivity, deleteActivity } = useActivity();
  const [deleteActivityData, setDeleteActivityData] =
    useState<ActivityType | null>(null);

  return (
    <>
      {activities.length ? (
        <div className="grid grid-cols-4 gap-5">
          {activities.map((activity, index) => (
            <Activity
              index={index}
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
          onClick={createActivity}
        >
          <img src="/activity-empty-state.png" alt="No activity" />
        </button>
      )}

      {deleteActivityData && (
        <ModalDeleteActivity
          show={!!deleteActivityData}
          activity={deleteActivityData}
          onDelete={deleteActivity}
          onClose={() => setDeleteActivityData(null)}
        />
      )}
    </>
  );
};

export default ActivityList;
