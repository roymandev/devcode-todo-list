import { API } from "../../../libs/api";
import { mutationOptions } from "../../../libs/mutate-options";
import { Query } from "../../../libs/query";
import { ACTIVITY_QUERY_KEYS } from "../../activity";
import { ResGetActivityDetail } from "../../activity/api/types";
import { PayloadApiRemoveTodo } from "./types";

export const apiRemoveTodo = ({ id }: PayloadApiRemoveTodo) =>
  API.delete(`todo-items/${id}`).json();

export const mutateRemoveTodo = mutationOptions({
  mutationFn: apiRemoveTodo,
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
          todo_items: prev.todo_items.filter((todo) => todo.id !== payload.id),
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
