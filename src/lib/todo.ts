import { API_BASE_URL, API_TODO_PATH } from '@/constant';
import { promiseHanlder } from '@/lib/promiseHandler';
import { Activity } from '@/store';

export interface Todo {
  id: number;
  title: string;
  activity_group_id: number;
  is_active: boolean;
  priority: 'very-high' | 'high' | 'normal' | 'low' | 'very-low';
}

export const getTodos = async (activityId: Activity['id']) => {
  const [res] = await promiseHanlder(
    fetch(API_BASE_URL + API_TODO_PATH + '?activity_group_id=' + activityId),
  );

  if (res?.ok) {
    const [resJson] = await promiseHanlder<{ data: Todo[] }>(res.json());

    if (resJson) return resJson.data;
  }

  throw Error('Failed to get todos');
};

export const createTodo = async (
  activityId: Activity['id'],
  title: Todo['title'],
  priority: Todo['priority'],
) => {
  const [res] = await promiseHanlder(
    fetch(API_BASE_URL + API_TODO_PATH, {
      method: 'POST',
      body: JSON.stringify({
        activity_group_id: activityId,
        title,
        priority,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }),
  );

  if (!res?.ok) throw Error('Failed to create new todo');
};

export const updateTodo = async (
  todoId: Todo['id'],
  update: Pick<Todo, 'title' | 'is_active' | 'priority'>,
) => {
  const [res] = await promiseHanlder(
    fetch(API_BASE_URL + API_TODO_PATH + '/' + todoId, {
      method: 'PATCH',
      body: JSON.stringify(update),
      headers: {
        'Content-Type': 'application/json',
      },
    }),
  );

  if (!res?.ok) throw Error('Failed to update todo with id ' + todoId);
};

export const deleteTodo = async (todoId: Todo['id']) => {
  const [res] = await promiseHanlder(
    fetch(API_BASE_URL + API_TODO_PATH + '/' + todoId, {
      method: 'DELETE',
    }),
  );

  if (!res?.ok) throw Error('Failed to delete activity with id ' + todoId);
};
