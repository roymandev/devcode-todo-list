import { ResGetActivityDetail } from "../../activity/api/types";
import { TodoSort } from "../contant/options";

export const todoSort = (
  todos: ResGetActivityDetail["todo_items"],
  sort: TodoSort
) => {
  if (sort === "latest") {
    return todos.sort((a, b) => b.id - a.id);
  }
  if (sort === "oldest") {
    return todos.sort((a, b) => a.id - b.id);
  }
  if (sort === "az") {
    return todos.sort((a, b) => a.title.localeCompare(b.title));
  }
  if (sort === "za") {
    return todos.sort((a, b) => b.title.localeCompare(a.title));
  }

  if (sort === "unfinished") {
    return todos.sort((a, b) => {
      if (a.is_active === b.is_active) {
        return 0;
      }

      return a.is_active ? -1 : 1;
    });
  }

  return todos;
};
