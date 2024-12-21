import { queryOptions } from '@tanstack/react-query';
import { API } from '../../../shared/api';
import { QUERY_KEYS } from './keys';
import type { ResGetActivityList } from './types';

export const GetActivityList = () =>
  API.get('activity-groups').json<ResGetActivityList>();

export const queryActivityList = () =>
  queryOptions({
    queryKey: QUERY_KEYS.list(),
    queryFn: GetActivityList,
  });
