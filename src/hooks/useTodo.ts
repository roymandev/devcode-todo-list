import { sortTodos, TODOS_SORT_TYPE } from '@/lib/sortTodos';
import { createTodo, deleteTodo, getTodos, Todo, updateTodo } from '@/lib/todo';
import { Activity } from '@/store';
import { useEffect, useState } from 'react';

const useTodo = (activityId: Activity['id']) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [sortType, setSortType] = useState<TODOS_SORT_TYPE>('latest');

  useEffect(() => {
    fetchTodos();
  }, [activityId]);

  useEffect(() => {
    if (todos.length) setTodos((prevTodos) => sortTodos(sortType, prevTodos));
  }, [sortType]);

  const fetchTodos = () => getTodos(activityId).then(setTodos);

  const addTodo: typeof createTodo = (activityId, title, priority) =>
    createTodo(activityId, title, priority).then(() => fetchTodos());

  const removeTodo = (todoId: Todo['id']) =>
    deleteTodo(todoId).then(() => fetchTodos());

  const setTodo: typeof updateTodo = (todoId, update) =>
    updateTodo(todoId, update).then(fetchTodos);

  const toggleTodo = (todoId: Todo['id']) => {
    const todo = todos.find((todo) => todo.id === todoId);

    if (todo) {
      const newTodo = { ...todo, is_active: !todo.is_active };

      updateTodo(todoId, newTodo);

      setTodos((todos) =>
        todos.map((todo) => (todo.id === todoId ? newTodo : todo)),
      );
    }
  };

  return {
    todos,
    setTodos,
    fetchTodos,
    addTodo,
    removeTodo,
    setTodo,
    sortType,
    setSortType,
    toggleTodo,
  };
};

export default useTodo;
