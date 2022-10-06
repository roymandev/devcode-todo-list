import { API_ACTIVITY_PATH, API_EMAIL_ENV, API_BASE_URL } from '@/constant';
import { promiseHanlder } from '@/lib/promiseHandler';
import { atom } from 'jotai';

export interface Activity {
  id: number;
  email: string;
  title: string;
  created_at: string;
  updated_at: string;
  deleted_at: null;
}

// State
export const atomActivityList = atom<Activity[]>([]);

// Actions
export const atomFetchAllActivity = atom(null, async (get, set) => {
  const [res] = await promiseHanlder(
    fetch(API_BASE_URL + API_ACTIVITY_PATH + '?email=' + API_EMAIL_ENV),
  );

  if (res?.ok) {
    const [resJson] = await promiseHanlder<{ data: Activity[] }>(res.json());

    if (resJson) {
      set(atomActivityList, resJson.data);
      return;
    }
  }

  throw Error('Failed to get activities');
});

export const atomCreateActivity = atom(null, async (get, set) => {
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
      set(atomActivityList, (activities) => [resJson, ...activities]);
      return;
    }
  }

  throw Error('Failed to create new activity');
});

export const atomDeleteActivity = atom(null, async (get, set, id: number) => {
  const [res] = await promiseHanlder(
    fetch(API_BASE_URL + API_ACTIVITY_PATH + '/' + id, {
      method: 'DELETE',
      redirect: 'follow',
    }),
  );
  if (res?.ok) {
    set(atomActivityList, (activities) =>
      activities.filter((activity) => activity.id !== id),
    );
  }

  throw Error('Failed to delete activity with id ' + id);
});
