import CustomButton from '@/components/CustomButton';
import Header from '@/components/Header';
import CaretLeftIcon from '@/components/icons/CaretLeftIcon';
import PlusIcon from '@/components/icons/PlusIcon';
import ItemSortButton, { ITEM_SORT_TYPE } from '@/components/ItemSortButton';
import ItemTitle from '@/components/ItemTitle';
import CreateTodo from '@/components/modals/CreateTodo';
import useActivity from '@/hooks/useActivity';
import useTodo from '@/hooks/useTodo';
import { Activity } from '@/store';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const ItemList = () => {
  const { activityId: activityIdParam } = useParams();
  const { activities, fetchActivity, updateActivity } = useActivity();
  const [activity, setActivity] = useState<Activity | null>(null);
  const [itemSort, setItemSort] = useState<ITEM_SORT_TYPE>('latest');
  const [openModal, setOpenModal] = useState(false);
  const { todos, createTodo } = useTodo();

  useEffect(() => {
    if (activityIdParam) {
      const activityId = parseInt(activityIdParam);

      const activity = activities.find(
        (activity) => activity.id === activityId,
      );

      if (!activity) {
        fetchActivity(activityId);
      } else {
        setActivity(activity);
      }
    }
  }, [activityIdParam, activities]);

  return (
    <>
      <Header />
      <main className="mx-auto flex w-full max-w-[1000px] flex-col py-11">
        <div className="mb-11 flex h-[54px] items-center gap-5">
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
                <ItemSortButton sort={itemSort} setSort={setItemSort} />
              )}

              <CustomButton
                data-cy="todo-add-button"
                className={clsx(!todos.length && 'ml-auto')}
                onClick={() => setOpenModal(true)}
              >
                <PlusIcon />
                Tambah
              </CustomButton>
            </>
          )}
        </div>
      </main>

      <CreateTodo
        show={openModal}
        onClose={() => setOpenModal(false)}
        onSave={(title, priority) => {
          if (activity) createTodo(activity.id, title, priority);
        }}
      />
    </>
  );
};

export default ItemList;
