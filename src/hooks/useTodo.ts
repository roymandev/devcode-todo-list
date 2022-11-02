import { API_BASE_URL, API_TODO_PATH } from '@/constant';
import { promiseHanlder } from '@/lib/promiseHandler';
import { sortTodos, TODOS_SORT_TYPE } from '@/lib/sortTodos';
import { Activity } from '@/store';
import { useEffect, useState } from 'react';

export interface Todo {
  id: number;
  title: string;
  activity_group_id: number;
  is_active: boolean;
  priority: 'very-high' | 'high' | 'normal' | 'low' | 'very-low';
}

const useTodo = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [sortType, setSortType] = useState<TODOS_SORT_TYPE>('latest');

  useEffect(() => {
    if (todos.length) setTodos((prevTodos) => sortTodos(sortType, prevTodos));
  }, [sortType]);

  const fetchTodos = async (activityId: Todo['id']) => {
    const [res] = await promiseHanlder(
      fetch(API_BASE_URL + API_TODO_PATH + '?activity_group_id=' + activityId),
    );

    if (res?.ok) {
      const [resJson] = await promiseHanlder<{ data: Todo[] }>(res.json());

      if (resJson) {
        setTodos(resJson.data);
        return;
      }
    }

    throw Error('Failed to get todos');
  };

  const createTodo = async (
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

    if (res?.ok) {
      const [resJson] = await promiseHanlder<Todo>(res.json());

      if (resJson) {
        setTodos((todos) => sortTodos(sortType, [resJson, ...todos]));
        return;
      }
    }

    throw Error('Failed to create new todo');
  };

  const updateTodo = async (
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

    if (res?.ok) {
      const [resJson] = await promiseHanlder<Activity>(res.json());

      if (resJson) {
        setTodos((todos) =>
          todos.map((todo) =>
            todo.id == todoId ? { ...todo, ...resJson } : todo,
          ),
        );
      }
      return;
    }

    throw Error('Failed to update todo with id ' + todoId);
  };

  const deleteTodo = async (todoId: Todo['id']) => {
    const [res] = await promiseHanlder(
      fetch(API_BASE_URL + API_TODO_PATH + '/' + todoId, {
        method: 'DELETE',
      }),
    );

    if (res?.ok) {
      setTodos((todos) => todos.filter((todo) => todo.id !== todoId));
      return;
    }

    throw Error('Failed to delete activity with id ' + todoId);
  };

  return {
    todos,
    setTodos,
    fetchTodos,
    createTodo,
    updateTodo,
    deleteTodo,
    sortType,
    setSortType,
  };
};

export default useTodo;
