import { queryOptions } from '@tanstack/react-query';
import { API } from '../../../libs/api';
import { QUERY_KEYS } from './keys';
import type { ResGetActivityDetail } from './types';

export const queryActivityDetail = (id: number) =>
  queryOptions<ResGetActivityDetail>({
    queryKey: QUERY_KEYS.detail(id),
    queryFn: async ({ signal }) => {
      return API.get(`activity-groups/${id}`, { signal }).json();
    },
  });
