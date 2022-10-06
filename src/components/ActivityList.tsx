import Activity from '@/components/Activity';
import { atomActivityList, atomCreateActivity } from '@/stores/activityStore';
import { useAtomValue, useSetAtom } from 'jotai';

const ActivityList = () => {
  const activities = useAtomValue(atomActivityList);
  const createActivity = useSetAtom(atomCreateActivity);

  if (!activities.length)
    return (
      <button
        data-cy="activity-empty-state"
        className="mx-auto"
        onClick={createActivity}
      >
        <img src="/activity-empty-state.png" alt="No activity" />
      </button>
    );

  return (
    <div className="grid grid-cols-4 gap-5">
      {activities.map((activity, index) => (
        <Activity index={index} key={activity.id} {...activity} />
      ))}
    </div>
  );
};

export default ActivityList;
