import Activity from '@/components/Activity';
import { atomActivityList } from '@/stores/activityStore';
import { useAtomValue } from 'jotai';

const ActivityList = () => {
  const activities = useAtomValue(atomActivityList);

  if (!activities.length)
    return (
      <button className="mx-auto" data-cy="activity-empty-state">
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
