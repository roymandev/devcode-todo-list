import Activity from '@/components/Activity';
import {
  Activity as ActivityType,
  atomActivityList,
  atomCreateActivity,
} from '@/stores/activityStore';
import { useAtomValue, useSetAtom } from 'jotai';
import ModalDeleteActivity from '@/components/modals/DeleteActivity';
import { useState } from 'react';

const ActivityList = () => {
  const activities = useAtomValue(atomActivityList);
  const createActivity = useSetAtom(atomCreateActivity);
  const [deleteActivity, setDeleteActivity] = useState<ActivityType | null>(
    null,
  );

  return (
    <>
      {activities.length ? (
        <div className="grid grid-cols-4 gap-5">
          {activities.map((activity, index) => (
            <Activity
              index={index}
              key={activity.id}
              onDelete={() => setDeleteActivity(activity)}
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

      {deleteActivity && (
        <ModalDeleteActivity
          show={!!deleteActivity}
          activity={deleteActivity}
          onClose={() => setDeleteActivity(null)}
        />
      )}
    </>
  );
};

export default ActivityList;
