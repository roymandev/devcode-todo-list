import { createActivity, deleteActivity, getActivities } from '@/lib/activity';
import { Activity, atomActivityList } from '@/store';
import { useAtom } from 'jotai';

const useActivity = () => {
  const [activities, setActivities] = useAtom(atomActivityList);

  const fetchActivities = () =>
    getActivities().then((activities) => setActivities(activities));

  const addActivity = () => createActivity().then(fetchActivities);

  const removeActivity = (activityId: Activity['id']) =>
    deleteActivity(activityId).then(fetchActivities);

  return {
    activities,
    setActivities,
    fetchActivities,
    addActivity,
    removeActivity,
  };
};

export default useActivity;
