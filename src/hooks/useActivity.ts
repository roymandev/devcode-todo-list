import { API_ACTIVITY_PATH, API_BASE_URL, API_EMAIL_ENV } from '@/constant';
import { promiseHanlder } from '@/lib/promiseHandler';
import { Activity, atomActivityList } from '@/stores/activityStore';
import { useAtom } from 'jotai';

const useActivity = () => {
  const [activities, setActivities] = useAtom(atomActivityList);

  const fetchActivities = async (): Promise<void> => {
    const [res] = await promiseHanlder(
      fetch(API_BASE_URL + API_ACTIVITY_PATH + '?email=' + API_EMAIL_ENV),
    );

    if (res?.ok) {
      const [resJson] = await promiseHanlder<{ data: Activity[] }>(res.json());

      if (resJson) {
        setActivities(resJson.data);
        return;
      }
    }

    throw Error('Failed to get activities');
  };

  const createActivity = async (): Promise<void> => {
    const [res] = await promiseHanlder(
      fetch(API_BASE_URL + API_ACTIVITY_PATH, {
        method: 'POST',
        body: JSON.stringify({ title: 'New Activity', email: API_EMAIL_ENV }),
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    );

    if (res?.ok) {
      const [resJson] = await promiseHanlder<Activity>(res.json());

      if (resJson) {
        setActivities((activities) => [resJson, ...activities]);
        return;
      }
    }

    throw Error('Failed to create new activity');
  };

  const deleteActivity = async (activityId: Activity['id']): Promise<void> => {
    const [res] = await promiseHanlder(
      fetch(API_BASE_URL + API_ACTIVITY_PATH + '/' + activityId, {
        method: 'DELETE',
        redirect: 'follow',
      }),
    );
    if (res?.ok) {
      setActivities((activities) =>
        activities.filter((activity) => activity.id !== activityId),
      );
      return;
    }

    throw Error('Failed to delete activity with id ' + activityId);
  };

  const fetchActivity = async (activityId: Activity['id']): Promise<void> => {
    const [res] = await promiseHanlder(
      fetch(
        API_BASE_URL +
          API_ACTIVITY_PATH +
          '/' +
          activityId +
          '?email=' +
          API_EMAIL_ENV,
      ),
    );

    if (res?.ok) {
      const [resJson] = await promiseHanlder<Activity>(res.json());

      if (resJson) {
        setActivities((activities) =>
          [resJson, ...activities].sort(
            (a, b) =>
              new Date(b.created_at).getDate() -
              new Date(a.created_at).getDate(),
          ),
        );
        return;
      }
    }

    throw Error('Failed to get activity with id ' + activityId);
  };

  return {
    activities,
    setActivities,
    fetchActivities,
    createActivity,
    deleteActivity,
    fetchActivity,
  };
};

export default useActivity;
