import { IconTrash } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { Button } from '../../../shared/ui';

type Props = {
  title: string;
  date: string;
  onDelete: () => void;
};

export const ActivityCard = ({ title, date, onDelete }: Props) => {
  return (
    <article className="flex min-h-60 flex-col rounded-xl bg-white p-6 shadow-lg">
      <h3 className="font-bold text-lg">{title}</h3>

      <div className="mt-auto flex items-center justify-between text-gray-600">
        <p className="font-medium text-sm">
          {dayjs(date).format('D MMMM YYYY')}
        </p>

        <Button variant="unstyled" onClick={onDelete}>
          <IconTrash />
        </Button>
      </div>
    </article>
  );
};
