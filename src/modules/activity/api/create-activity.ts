import { API } from '../../../libs/api';
import { mutationOptions } from '../../../libs/mutate-options';
import { Query } from '../../../libs/query';
import { QUERY_KEYS } from './keys';
import type {
  PayloadCreateActivity,
  ResCreateActivity,
  ResGetActivityList,
} from './types';

export const apiCreateActivity = (payload?: PayloadCreateActivity) =>
  API.post('activity-groups', {
    json: {
      ...payload,
      title: 'New Activity',
    } satisfies PayloadCreateActivity,
  }).json<ResCreateActivity>();

export const mutateCreateActivity = mutationOptions({
  mutationFn: apiCreateActivity,
  onSuccess: (res) => {
    Query.setQueryData<ResGetActivityList>(
      QUERY_KEYS.list(),
      (prev) => prev && { ...prev, data: [res, ...prev.data] },
    );
    Query.invalidateQueries({ queryKey: QUERY_KEYS.lists() });
  },
});
