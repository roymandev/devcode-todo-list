import { API } from '../../../libs/api';
import { mutationOptions } from '../../../libs/mutate-options';
import { Query } from '../../../libs/query';
import { ACTIVITY_QUERY_KEYS } from '../../activity';
import type { ResGetActivityDetail } from '../../activity/api/types';
import type { PayloadCreateTodo, ResCreateTodo } from './types';

export const apiCreateTodo = (payload: PayloadCreateTodo) =>
  API.post('todo-items', {
    json: payload,
  }).json<ResCreateTodo>();

export const mutateCreateTodo = mutationOptions({
  mutationFn: apiCreateTodo,
  onSuccess: (res) => {
    Query.setQueryData<ResGetActivityDetail>(
      ACTIVITY_QUERY_KEYS.detail(res.activity_group_id),
      (prev) => prev && { ...prev, todo_items: [res, ...prev.todo_items] },
    );
  },
});
