import { API_BASE_URL, API_TODO_PATH } from '@/constant';
import { promiseHanlder } from '@/lib/promiseHandler';
import { Activity } from '@/store';
import { useState } from 'react';

export interface Todo {
  id: number;
  activity_group_id: number;
  title: string;
  is_active: boolean;
  priority: 'very-high' | 'high' | 'normal' | 'low' | 'very-low';
  created_at: string;
  updated_at: string;
  deleted_at: null;
}

const useTodo = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

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
        setTodos((todos) => [resJson, ...todos]);
        return;
      }
    }

    throw Error('Failed to create new activity');
  };

  return { todos, setTodos, createTodo };
};

export default useTodo;
