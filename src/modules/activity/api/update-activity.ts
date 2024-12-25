import { API } from '../../../libs/api';
import { mutationOptions } from '../../../libs/mutate-options';
import { Query } from '../../../libs/query';
import { QUERY_KEYS } from './keys';
import type {
  PayloadUpdateActivity,
  ResGetActivityDetail,
  ResGetActivityList,
} from './types';

export const apiUpdateActivity = ({ id, ...rest }: PayloadUpdateActivity) => {
  console.log('haha');
  return API.patch(`activity-groups/${id}`, {
    json: rest,
  }).json();
};

export const mutateUpdateActivity = mutationOptions({
  mutationFn: apiUpdateActivity,
  onMutate: async (payload) => {
    await Query.cancelQueries({ queryKey: QUERY_KEYS.lists() });
    await Query.cancelQueries({ queryKey: QUERY_KEYS.detail(payload.id) });

    // Update lists
    const prevActivitiesList = Query.getQueryData<ResGetActivityList>(
      QUERY_KEYS.lists(),
    );
    Query.setQueriesData<ResGetActivityList>(
      { queryKey: QUERY_KEYS.lists() },
      (prev) => {
        console.log(prev);
        return (
          prev && {
            ...prev,
            data: prev.data.map((activity) =>
              activity.id === payload.id
                ? {
                    ...activity,
                    ...payload,
                  }
                : activity,
            ),
          }
        );
      },
    );

    // Update detail
    const prevActivityDetail = Query.getQueryData<ResGetActivityDetail>(
      QUERY_KEYS.detail(payload.id),
    );

    Query.setQueryData<ResGetActivityDetail>(
      QUERY_KEYS.detail(payload.id),
      (prev) =>
        prev && {
          ...prev,
          ...payload,
        },
    );

    return { prevActivitiesList, prevActivityDetail };
  },
  onError: (_err, payload, context) => {
    console.log(_err);

    // Rollback list
    Query.setQueriesData(
      { queryKey: QUERY_KEYS.lists() },
      context?.prevActivitiesList,
    );

    // Rollback detail
    Query.setQueryData(
      QUERY_KEYS.detail(payload.id),
      context?.prevActivityDetail,
    );
  },
  // Always refetch after error or success:
  onSettled: (_data, _err, payload) => {
    Query.invalidateQueries({ queryKey: QUERY_KEYS.lists() });
    Query.invalidateQueries({ queryKey: QUERY_KEYS.detail(payload.id) });
  },
});
