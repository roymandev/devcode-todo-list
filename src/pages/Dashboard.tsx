import ActivityList from '@/components/ActivityList';
import CustomButton from '@/components/CustomButton';
import Header from '@/components/Header';
import PlusIcon from '@/components/icons/PlusIcon';
import useActivity from '@/hooks/useActivity';
import { useEffect } from 'react';

const Dashboard = () => {
  const { fetchActivities, createActivity } = useActivity();

  useEffect(() => {
    fetchActivities();
  }, []);

  return (
    <>
      <Header />
      <main className="mx-auto flex w-full max-w-[1000px] flex-col py-11">
        <div className="mb-11 flex">
          <h1 data-cy="activity-title" className="text-4xl font-bold">
            Activity
          </h1>

          <CustomButton
            data-cy="activity-add-button"
            className="ml-auto"
            onClick={createActivity}
          >
            <PlusIcon />
            Tambah
          </CustomButton>
        </div>

        <ActivityList />
      </main>
    </>
  );
};

export default Dashboard;
