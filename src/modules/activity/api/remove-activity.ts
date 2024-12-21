import { API } from '../../../libs/api';
import { mutationOptions } from '../../../libs/mutate-options';
import { Query } from '../../../libs/query';
import { QUERY_KEYS } from './keys';
import type { ResGetActivityList } from './types';

export const apiRemoveActivity = (id: number) =>
  API.delete(`activity-groups/${id}`).json();

export const mutateRemoveActivity = mutationOptions({
  mutationFn: apiRemoveActivity,
  onMutate: async (activityId) => {
    await Query.cancelQueries({ queryKey: QUERY_KEYS.lists() });

    // Snapshot the previous value
    const prevActivitiesList = Query.getQueryData<ResGetActivityList>(
      QUERY_KEYS.lists(),
    );

    Query.setQueriesData<ResGetActivityList>(
      { queryKey: QUERY_KEYS.lists() },
      (prev) =>
        prev && {
          ...prev,
          data: prev.data.filter((item) => item.id !== activityId),
        },
    );

    return { prevActivitiesList };
  },
  onError: (_err, _newTodo, context) => {
    Query.setQueriesData(
      { queryKey: QUERY_KEYS.lists() },
      context?.prevActivitiesList,
    );
  },
  // Always refetch after error or success:
  onSettled: () => {
    Query.invalidateQueries({ queryKey: QUERY_KEYS.lists() });
  },
});
