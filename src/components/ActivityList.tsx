import Activity from '@/components/Activity';
import { atomActivityList } from '@/stores/activityStore';
import { useAtomValue } from 'jotai';

const ActivityList = () => {
  const activities = useAtomValue(atomActivityList);

  if (!activities.length)
    return (
      <button className="mx-auto">
        <img src="/activity-empty-state.png" alt="No activity" />
      </button>
    );

  return (
    <div className="grid grid-cols-4 gap-5">
      {activities.map((activity) => (
        <Activity key={activity.id} {...activity} />
      ))}
    </div>
  );
};

export default ActivityList;
