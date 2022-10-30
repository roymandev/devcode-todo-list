import CustomButton from '@/components/CustomButton';
import Header from '@/components/Header';
import CaretLeftIcon from '@/components/icons/CaretLeftIcon';
import PlusIcon from '@/components/icons/PlusIcon';
import ItemSortButton, { ITEM_SORT_TYPE } from '@/components/ItemSortButton';
import ItemTitle from '@/components/ItemTitle';
import useActivity from '@/hooks/useActivity';
import { Activity } from '@/stores/activityStore';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const ItemList = () => {
  const { activityId: activityIdParam } = useParams();
  const { activities, fetchActivity, updateActivity } = useActivity();
  const [activity, setActivity] = useState<Activity | null>(null);
  const [itemSort, setItemSort] = useState<ITEM_SORT_TYPE>('latest');

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

              <ItemSortButton sort={itemSort} setSort={setItemSort} />

              <CustomButton data-cy="todo-add-button">
                <PlusIcon />
                Tambah
              </CustomButton>
            </>
          )}
        </div>
      </main>
    </>
  );
};

export default ItemList;
