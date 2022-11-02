import CheckAltIcon from '@/components/icons/CheckAltIcon';
import PencilIcon from '@/components/icons/PencilIcon';
import PriorityIcon from '@/components/icons/PriorityIcon';
import TrashIcon from '@/components/icons/TrashIcon';
import DeleteTodo from '@/components/modals/DeleteTodo';
import { Todo } from '@/hooks/useTodo';
import twclsx from '@/lib/twclsx';
import clsx from 'clsx';
import { useState } from 'react';

export interface TodoListProps {
  todos: Todo[];
  createTodo: () => void;
  toggleTodo: (todoId: Todo['id']) => void;
  editTodo: (todo: Todo) => void;
  deleteTodo: (todId: Todo['id']) => void;
}

const TodoList = ({
  todos,
  createTodo,
  toggleTodo,
  editTodo,
  deleteTodo,
}: TodoListProps) => {
  const [deleteTodoData, setDeleteTodoData] = useState<Todo | null>(null);

  return (
    <>
      {todos.length ? (
        <div className="mt-12 flex flex-col gap-[10px]">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className="flex h-20 items-center gap-4 rounded-xl bg-white px-7 text-lg font-medium shadow-lg"
            >
              <span
                className={twclsx(
                  'border-secondary h-5 w-5 cursor-pointer border flex items-center justify-center',
                  !todo.is_active && 'border-blue bg-primary',
                )}
                onClick={() => toggleTodo(todo.id)}
              >
                {!todo.is_active && <CheckAltIcon />}
              </span>

              <PriorityIcon className="h-[9px] w-[9px]" type={todo.priority} />

              <h3
                className={clsx(!todo.is_active && 'text-dimmed line-through')}
              >
                {todo.title}
              </h3>

              <button onClick={() => editTodo(todo)}>
                <PencilIcon />
              </button>

              <button
                className="ml-auto"
                onClick={() => setDeleteTodoData(todo)}
              >
                <TrashIcon />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <button className="mx-auto mt-24" onClick={createTodo}>
          <img src="/todo-empty-state.png" alt="No activity" />
        </button>
      )}

      {deleteTodoData && (
        <DeleteTodo
          show={!!deleteTodoData}
          onClose={() => setDeleteTodoData(null)}
          todo={deleteTodoData}
          onDelete={(todoId) => deleteTodo(todoId)}
        />
      )}
    </>
  );
};

export default TodoList;
