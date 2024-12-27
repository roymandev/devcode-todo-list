import { API } from "../../../libs/api";
import { mutationOptions } from "../../../libs/mutate-options";
import { Query } from "../../../libs/query";
import { ACTIVITY_QUERY_KEYS } from "../../activity";
import type { ResGetActivityDetail } from "../../activity/api/types";
import type { PayloadUpdateTodo, ResUpdateTodo } from "./types";

export const apiUpdateTodo = ({
  id,
  activity_group_id,
  ...payload
}: PayloadUpdateTodo) =>
  API.patch(`todo-items/${id}`, {
    json: payload,
  }).json<ResUpdateTodo>();

export const mutateUpdateTodo = mutationOptions({
  mutationFn: apiUpdateTodo,
  onMutate: async (payload) => {
    await Query.cancelQueries({
      queryKey: ACTIVITY_QUERY_KEYS.detail(payload.activity_group_id),
    });

    const prevActivityDetail = Query.getQueryData<ResGetActivityDetail>(
      ACTIVITY_QUERY_KEYS.detail(payload.activity_group_id)
    );

    Query.setQueryData<ResGetActivityDetail>(
      ACTIVITY_QUERY_KEYS.detail(payload.activity_group_id),
      (prev) =>
        prev && {
          ...prev,
          todo_items: prev.todo_items.map((todo) =>
            todo.id === payload.id ? { ...todo, ...payload } : todo
          ),
        }
    );

    return { prevActivityDetail };
  },
  onError: (_err, payload, context) => {
    Query.setQueryData(
      ACTIVITY_QUERY_KEYS.detail(payload.activity_group_id),
      context?.prevActivityDetail
    );
  },
});
