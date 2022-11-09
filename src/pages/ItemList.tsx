import Header from '@/components/Header';
import TodoList from '@/components/TodoList';
import { getActivity } from '@/lib/activity';
import { Activity } from '@/store';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ItemList = () => {
  const { activityId: activityIdParam } = useParams();
  const [activity, setActivity] = useState<Activity | null>(null);

  useEffect(() => {
    if (activityIdParam) {
      const activityId = parseInt(activityIdParam);

      getActivity(activityId).then(setActivity);
    }
  }, [activityIdParam]);

  return (
    <>
      <Header />

      {activity ? <TodoList activity={activity} /> : <p>Loading activity...</p>}
    </>
  );
};

export default ItemList;
