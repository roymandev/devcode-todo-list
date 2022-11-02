import { Todo } from '@/hooks/useTodo';

export type TODOS_SORT_TYPE = 'latest' | 'oldest' | 'az' | 'za' | 'unfinished';

export const sortTodos = (sortType: TODOS_SORT_TYPE, todos: Todo[]) => {
  if (sortType === 'latest') {
    return [...todos].sort((a, b) => b.id - a.id);
  }

  if (sortType === 'oldest') {
    return [...todos].sort((a, b) => a.id - b.id);
  }

  if (sortType === 'az') {
    return [...todos].sort((a, b) => a.title.localeCompare(b.title));
  }

  if (sortType === 'za') {
    return [...todos].sort((a, b) => b.title.localeCompare(a.title));
  }

  if (sortType === 'unfinished') {
    return [...todos].sort((a, b) => Number(a.is_active) - Number(b.is_active));
  }

  return todos;
};
