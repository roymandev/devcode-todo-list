import { IconPlus } from '@tabler/icons-react';
import { ActivityCard } from '../../../entities/activity';
import { Button, PageTitle } from '../../../shared/ui';

export const HomePage = () => {
  return (
    <main className="container">
      <section>
        <header className="my-11 flex items-center">
          <PageTitle data-cy="activity-title">Activity</PageTitle>

          <Button className="ml-auto" leftIcon={<IconPlus size={24} />}>
            Tambah
          </Button>
        </header>

        <img
          src="/images/activity-empty-state.svg"
          alt="Empty state"
          className="mx-auto"
        />

        <div className="grid grid-cols-4">
          <ActivityCard
            title="Daftar Belanja Bulanan"
            date="2024-03-01"
            onDelete={() => {}}
          />
        </div>
      </section>
    </main>
  );
};
