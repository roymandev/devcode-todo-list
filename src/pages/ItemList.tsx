import CustomButton from '@/components/CustomButton';
import Header from '@/components/Header';
import CaretLeftIcon from '@/components/icons/CaretLeftIcon';
import PlusIcon from '@/components/icons/PlusIcon';
import ItemSortButton from '@/components/ItemSortButton';
import ItemTitle from '@/components/ItemTitle';
import TodoEditor from '@/components/modals/TodoEditor';
import TodoList from '@/components/TodoList';
import useTodo, { Todo } from '@/hooks/useTodo';
import { getActivity, updateActivity } from '@/lib/activity';
import { Activity } from '@/store';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const ItemList = () => {
  const { activityId: activityIdParam } = useParams();
  const [activity, setActivity] = useState<Activity | null>(null);
  const {
    todos,
    fetchTodos,
    createTodo,
    updateTodo,
    deleteTodo,
    sortType,
    setSortType,
  } = useTodo();
  const [editorTodo, setEditorTodo] = useState<(Todo | true) | false>(false);

  useEffect(() => {
    if (activityIdParam) {
      const activityId = parseInt(activityIdParam);

      getActivity(activityId).then((activity) => {
        setActivity(activity);
        fetchTodos(activity.id);
      });
    }
  }, [activityIdParam]);

  return (
    <>
      <Header />
      <main className="mx-auto flex w-full max-w-[1000px] flex-col py-11">
        <div className="flex h-[54px] items-center gap-5">
          <Link data-cy="todo-back-button" to="/" className="mr-2">
            <CaretLeftIcon />
          </Link>

          {activity && (
            <>
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
                onClick={() => setEditorTodo(true)}
              >
                <PlusIcon />
                Tambah
              </CustomButton>
            </>
          )}
        </div>

        <TodoList
          todos={todos}
          createTodo={() => setEditorTodo(true)}
          toggleTodo={(todoId) => {
            const todo = todos.find((todo) => todo.id === todoId);
            if (todo)
              updateTodo(todoId, { ...todo, is_active: !todo.is_active });
          }}
          editTodo={(todo) => setEditorTodo(todo)}
          deleteTodo={deleteTodo}
        />
      </main>

      {editorTodo && (
        <TodoEditor
          todo={(typeof editorTodo === 'object' && editorTodo) || undefined}
          show={!!editorTodo}
          onClose={() => setEditorTodo(false)}
          onSave={(title, priority) => {
            if (typeof editorTodo === 'object') {
              updateTodo(editorTodo.id, {
                title,
                priority,
                is_active: editorTodo.is_active,
              });
            } else if (activity) createTodo(activity.id, title, priority);
          }}
        />
      )}
    </>
  );
};

export default ItemList;
