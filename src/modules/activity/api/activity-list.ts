import { queryOptions } from '@tanstack/react-query';
import { API } from '../../../libs/api';
import { QUERY_KEYS } from './keys';
import type { ResGetActivityList } from './types';

export const apiActivityList = () =>
  API.get('activity-groups').json<ResGetActivityList>();

export const queryActivityList = () =>
  queryOptions({
    queryKey: QUERY_KEYS.list(),
    queryFn: apiActivityList,
  });
