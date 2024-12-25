import { IconTrash } from '@tabler/icons-react';
import dayjs from 'dayjs';
import type { MouseEvent } from 'react';
import { Button } from '../../../components/Button';
import { FALLBACK_ACTIVITY_EMPTY_TITLE } from '../../../constants/fallbacks';

type Props = {
  title: string;
  date: string;
  onDelete: (e: MouseEvent<HTMLButtonElement>) => void;
};

export const ActivityCard = ({ title, date, onDelete }: Props) => {
  return (
    <article className="flex min-h-60 flex-col rounded-xl bg-white p-6 shadow-lg">
      <h3 data-cy="activity-item-title" className="font-bold text-lg">
        {title || FALLBACK_ACTIVITY_EMPTY_TITLE}
      </h3>

      <div className="relative mt-auto flex items-center justify-between text-gray-600">
        <p data-cy="activity-item-date" className="font-medium text-sm">
          {dayjs(date).format('D MMMM YYYY')}
        </p>

        <Button
          data-cy="activity-item-delete-button"
          variant="unstyled"
          title="Delete this activity"
          onClick={onDelete}
          className="-right-2 absolute p-2"
        >
          <IconTrash />
        </Button>
      </div>
    </article>
  );
};
