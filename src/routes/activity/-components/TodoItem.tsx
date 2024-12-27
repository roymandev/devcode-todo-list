import { IconPencil, IconTrash } from "@tabler/icons-react";
import { Button } from "../../../components/Button";
import { cn } from "../../../libs/cn";
import type { ResGetActivityDetail } from "../../../modules/activity/api/types";
import PriorityDot from "../../../modules/todo/ui/PriorityDot";

type Props = {
  todo: ResGetActivityDetail["todo_items"][number];
  onToggleCheck: (todoId: number, is_active: boolean) => void;
  onClickEdit: () => void;
};

const TodoItem = ({ todo, onToggleCheck, onClickEdit, ...rest }: Props) => {
  return (
    <li
      key={todo.id}
      className="flex min-h-20 items-center rounded-xl bg-white px-7 shadow-lg"
      {...rest}
    >
      <input
        data-cy="todo-item-checkbox"
        type="checkbox"
        className="size-5 border-gray-300 text-primary"
        checked={!todo.is_active}
        onChange={(e) => onToggleCheck(todo.id, !e.target.checked)}
      />
      <PriorityDot
        data-cy="todo-item-priority-indicator"
        priority={todo.priority}
        className="ml-6"
      />
      <h4
        data-cy="todo-item-title"
        className={cn(
          "ml-4 font-semibold text-lg",
          !todo.is_active && "text-gray-600 line-through"
        )}
      >
        {todo.title}
      </h4>

      <Button
        data-cy="todo-item-checkbox"
        variant="unstyled"
        className="ml-3 p-1 text-gray-500"
        onClick={onClickEdit}
      >
        <IconPencil />
      </Button>

      <Button
        data-cy="todo-item-delete-button"
        variant="unstyled"
        className="ml-auto p-1 text-gray-600"
      >
        <IconTrash />
      </Button>
    </li>
  );
};

export default TodoItem;
