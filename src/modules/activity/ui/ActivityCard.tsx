import { IconTrash } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { Button } from '../../../components/Button';

type Props = {
  title: string;
  date: string;
  onDelete: () => void;
  'data-cy': string;
};

export const ActivityCard = ({ title, date, onDelete, ...rest }: Props) => {
  return (
    <article
      className="flex min-h-60 flex-col rounded-xl bg-white p-6 shadow-lg"
      {...rest}
    >
      <h3 data-cy="activity-item-title" className="font-bold text-lg">
        {title}
      </h3>

      <div className="mt-auto flex items-center justify-between text-gray-600">
        <p data-cy="activity-item-date" className="font-medium text-sm">
          {dayjs(date).format('D MMMM YYYY')}
        </p>

        <Button
          data-cy="activity-item-delete-button"
          variant="unstyled"
          title="Delete this activity"
          onClick={onDelete}
        >
          <IconTrash />
        </Button>
      </div>
    </article>
  );
};
