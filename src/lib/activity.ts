import { API_ACTIVITY_PATH, API_BASE_URL, API_EMAIL_ENV } from '@/constant';
import { promiseHanlder } from '@/lib/promiseHandler';
import { Activity } from '@/store';

export const getActivities = async () => {
  const [res] = await promiseHanlder(
    fetch(API_BASE_URL + API_ACTIVITY_PATH + '?email=' + API_EMAIL_ENV),
  );

  if (res?.ok) {
    const [resJson] = await promiseHanlder<{ data: Activity[] }>(res.json());

    if (resJson) return resJson.data;
  }

  throw Error('Failed to get activities');
};

export const createActivity = async () => {
  const [res] = await promiseHanlder(
    fetch(API_BASE_URL + API_ACTIVITY_PATH, {
      method: 'POST',
      body: JSON.stringify({ title: 'New Activity', email: API_EMAIL_ENV }),
      headers: {
        'Content-Type': 'application/json',
      },
    }),
  );

  if (!res?.ok) throw Error('Failed to create new activity');
};

export const deleteActivity = async (activityId: Activity['id']) => {
  const [res] = await promiseHanlder(
    fetch(API_BASE_URL + API_ACTIVITY_PATH + '/' + activityId, {
      method: 'DELETE',
      redirect: 'follow',
    }),
  );

  if (!res?.ok) throw Error('Failed to delete activity with id ' + activityId);
};

export const getActivity = async (activityId: Activity['id']) => {
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
    const [activity] = await promiseHanlder<Activity>(res.json());

    if (activity) return activity;
  }

  throw Error('Failed to get activity with id ' + activityId);
};

export const updateActivity = async (
  activityId: Activity['id'],
  updateData: Pick<Activity, 'title'>,
) => {
  const [res] = await promiseHanlder(
    fetch(API_BASE_URL + API_ACTIVITY_PATH + '/' + activityId, {
      method: 'PATCH',
      body: JSON.stringify(updateData),
      headers: {
        'Content-Type': 'application/json',
      },
    }),
  );

  if (!res?.ok) throw Error('Failed to update activity with id ' + activityId);
};
