import ActivityList from '@/components/ActivityList';
import CustomButton from '@/components/CustomButton';
import Header from '@/components/Header';
import PlusIcon from '@/components/icons/PlusIcon';
import {
  atomCreateActivity,
  atomFetchAllActivity,
} from '@/stores/activityStore';
import { useSetAtom } from 'jotai';
import { useEffect, useState } from 'react';

const Dashboard = () => {
  const fetchActivities = useSetAtom(atomFetchAllActivity);
  const createActivity = useSetAtom(atomCreateActivity);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    setErrorMsg('');

    fetchActivities().catch((err: Error) => setErrorMsg(err.message));
  }, []);

  return (
    <>
      <Header />
      <main className="mx-auto flex w-full max-w-[1000px] flex-col py-11">
        <div className="mb-11 flex">
          <h1 className="text-4xl font-bold">Activity</h1>

          <CustomButton className="ml-auto" onClick={createActivity}>
            <PlusIcon />
            Tambah
          </CustomButton>
        </div>

        {errorMsg || <ActivityList />}
      </main>
    </>
  );
};

export default Dashboard;
