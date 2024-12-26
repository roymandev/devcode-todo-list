import { IconChevronLeft, IconPlus } from '@tabler/icons-react';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { Link, createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { Button } from '../../components/Button';
import { Query } from '../../libs/query';
import { queryActivityDetail } from '../../modules/activity/api/activity-detail';
import type { ResGetActivityDetail } from '../../modules/activity/api/types';
import { mutateUpdateActivity } from '../../modules/activity/api/update-activity';
import { mutateCreateTodo } from '../../modules/todo/api/create-todo';
import { mutateUpdateTodo } from '../../modules/todo/api/update-todo';
import TodoModal, {
  type TodoModalValues,
} from '../../modules/todo/ui/TodoModal';
import { PageTitleEditable } from './-components/PageTitleEditable';
import TodoItem from './-components/TodoItem';

type InitialTodoValues = ResGetActivityDetail['todo_items'][number];

export const Route = createFileRoute('/activity/$id')({
  component: RouteComponent,
  loader: ({ params }) =>
    Query.ensureQueryData(queryActivityDetail(Number(params.id))),
});

function RouteComponent() {
  const { id } = Route.useParams();

  const [createTodo, setCreateTodo] = useState<InitialTodoValues | boolean>(
    false,
  );

  const { data } = useSuspenseQuery(queryActivityDetail(Number(id)));
  const mutationEditActivity = useMutation(mutateUpdateActivity);
  const mutationCreateTodo = useMutation(mutateCreateTodo);
  const mutationUpdateTodo = useMutation(mutateUpdateTodo);

  const handleEditActivity = (title: string) => {
    mutationEditActivity.mutate({ id: Number(id), title });
  };

  const handleAddTodo = () => setCreateTodo(true);

  const handleEditTodo = (initialValues: InitialTodoValues) =>
    setCreateTodo(initialValues);

  const handleToggleCheck = (todoId: number, is_active: boolean) =>
    mutationUpdateTodo.mutate({
      activity_group_id: Number(id),
      id: todoId,
      is_active,
    });

  const handleSaveTodo = async (values: TodoModalValues) => {
    if (!createTodo) return;

    if (typeof createTodo === 'object') {
      // Edit
      mutationUpdateTodo.mutate({
        ...createTodo,
        ...values,
      });
    } else {
      // Create new todo

      await mutationCreateTodo.mutateAsync({
        ...values,
        activity_group_id: Number(id),
      });
    }

    setCreateTodo(false);
  };

  return (
    <>
      <main className="container">
        <section>
          <header className="my-11 flex items-center gap-5">
            <Link data-cy="todo-back-button" to="/" className="-ml-1 p-1">
              <IconChevronLeft size={32} stroke={3} />
            </Link>

            <PageTitleEditable
              data-cy="todo-title"
              onFinish={handleEditActivity}
            >
              {data.title}
            </PageTitleEditable>

            <Button
              data-cy="todo-add-button"
              className="ml-auto"
              leftIcon={<IconPlus size={24} />}
              onClick={handleAddTodo}
            >
              Tambah
            </Button>
          </header>

          {data.todo_items.length ? (
            <ul className="space-y-3">
              {data.todo_items.map((todo, index) => (
                <TodoItem
                  data-cy={`todo-item-${index}`}
                  key={todo.id}
                  todo={todo}
                  onToggleCheck={handleToggleCheck}
                  onClickEdit={() => handleEditTodo(todo)}
                />
              ))}
            </ul>
          ) : (
            <Button
              data-cy="todo-empty-state"
              variant="unstyled"
              className="mx-auto block"
              onClick={handleAddTodo}
            >
              <img src="/images/todo-empty-state.svg" alt="Empty state" />
            </Button>
          )}
        </section>
      </main>

      <TodoModal
        open={!!createTodo}
        onOpenChange={() => setCreateTodo(false)}
        initialValues={typeof createTodo === 'object' ? createTodo : null}
        onSave={handleSaveTodo}
      />
    </>
  );
}
