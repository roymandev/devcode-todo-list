import CustomButton from '@/components/CustomButton';
import CaretLeftIcon from '@/components/icons/CaretLeftIcon';
import PlusIcon from '@/components/icons/PlusIcon';
import ItemSortButton from '@/components/ItemSortButton';
import ItemTitle from '@/components/ItemTitle';
import DeleteTodo from '@/components/modals/DeleteTodo';
import TodoEditor from '@/components/modals/TodoEditor';
import TodoItem from '@/components/TodoItem';
import useTodo from '@/hooks/useTodo';
import { updateActivity } from '@/lib/activity';
import { Todo } from '@/lib/todo';
import { Activity } from '@/store';
import clsx from 'clsx';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export interface TodoListProps {
  activity: Activity;
}

const TodoList = ({ activity }: TodoListProps) => {
  const {
    todos,
    addTodo,
    setTodo,
    toggleTodo,
    removeTodo,
    sortType,
    setSortType,
  } = useTodo(activity.id);
  const [deleteTodoPayload, setDeleteTodoPayload] = useState<Todo | null>(null);
  const [editTodoPayload, setEditTodoPayload] = useState<Todo | null>(null);
  const [addTodoModal, setAddTodoModal] = useState(false);

  return (
    <>
      <main className="mx-auto flex w-full max-w-[1000px] flex-col py-11">
        <div className="flex h-[54px] items-center gap-5">
          <Link data-cy="todo-back-button" to="/" className="mr-2">
            <CaretLeftIcon />
          </Link>

          <ItemTitle
            title={activity.title}
            onChange={(newTitle) => {
              updateActivity(activity.id, { title: newTitle });
            }}
          />

          {!!todos.length && (
            <ItemSortButton sort={sortType} setSort={setSortType} />
          )}

          <CustomButton
            data-cy="todo-add-button"
            className={clsx(!todos.length && 'ml-auto')}
            onClick={() => setAddTodoModal(true)}
          >
            <PlusIcon />
            Tambah
          </CustomButton>
        </div>

        {todos.length ? (
          <div className="mt-12 flex flex-col gap-[10px]">
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggleTodo={toggleTodo}
                onEditTodo={setEditTodoPayload}
                onDeleteTodo={setDeleteTodoPayload}
              />
            ))}
          </div>
        ) : (
          <button
            data-cy="todo-empty-state"
            className="mx-auto mt-24"
            onClick={() => setAddTodoModal(true)}
          >
            <img src="/todo-empty-state.png" alt="No activity" />
          </button>
        )}
      </main>

      {deleteTodoPayload && (
        <DeleteTodo
          onClose={() => setDeleteTodoPayload(null)}
          todo={deleteTodoPayload}
          onDelete={(todoId) => removeTodo(todoId)}
        />
      )}

      {editTodoPayload && (
        <TodoEditor
          todo={editTodoPayload}
          onClose={() => setEditTodoPayload(null)}
          onSave={(title, priority) =>
            setTodo(editTodoPayload.id, {
              title,
              priority,
              is_active: editTodoPayload.is_active,
            })
          }
        />
      )}

      {addTodoModal && (
        <TodoEditor
          onClose={() => setAddTodoModal(false)}
          onSave={(title, priority) => addTodo(activity.id, title, priority)}
        />
      )}
    </>
  );
};

export default TodoList;
