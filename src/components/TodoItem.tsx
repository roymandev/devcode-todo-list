import CheckAltIcon from '@/components/icons/CheckAltIcon';
import PencilIcon from '@/components/icons/PencilIcon';
import PriorityIcon from '@/components/icons/PriorityIcon';
import TrashIcon from '@/components/icons/TrashIcon';
import { Todo } from '@/lib/todo';
import twclsx from '@/lib/twclsx';

export interface TodoItemProps {
  todo: Todo;
  onToggleTodo: (todoId: Todo['id']) => void;
  onDeleteTodo: (todo: Todo) => void;
  onEditTodo: (todo: Todo) => void;
}

const TodoItem = ({
  todo,
  onToggleTodo,
  onEditTodo,
  onDeleteTodo,
}: TodoItemProps) => (
  <div
    data-cy="todo-item"
    key={todo.id}
    className="flex h-20 items-center gap-4 rounded-xl bg-white px-7 text-lg font-medium shadow-lg"
  >
    <span
      data-cy="todo-item-checkbox"
      className={twclsx(
        'border-secondary h-5 w-5 cursor-pointer border flex items-center justify-center',
        !todo.is_active && 'border-blue bg-primary',
      )}
      onClick={() => onToggleTodo(todo.id)}
    >
      {!todo.is_active && <CheckAltIcon />}
    </span>

    <PriorityIcon
      data-cy="todo-item-priority-indicator"
      className="h-[9px] w-[9px]"
      type={todo.priority}
    />

    <h3
      data-cy="todo-item-title"
      className={twclsx(!todo.is_active && 'text-dimmed line-through')}
    >
      {todo.title}
    </h3>

    <button data-cy="todo-item-edit-button" onClick={() => onEditTodo(todo)}>
      <PencilIcon />
    </button>

    <button
      data-cy="todo-item-delete-button"
      className="ml-auto"
      onClick={() => onDeleteTodo(todo)}
    >
      <TrashIcon />
    </button>
  </div>
);

export default TodoItem;
