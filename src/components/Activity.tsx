import TrashIcon from '@/components/icons/TrashIcon';
import { formatDate } from '@/lib/formatDate';
import { Activity as ActivityType } from '@/store';
import { Link } from 'react-router-dom';

interface ActivityProps extends ActivityType {
  onDelete: () => void;
}

const Activity = ({
  id,
  title,
  updated_at,
  created_at,
  onDelete,
}: ActivityProps) => {
  return (
    <Link
      to={'/detail/' + id}
      data-cy="activity-item"
      className="flex h-60 flex-col rounded-xl bg-white p-6 text-left shadow-lg"
    >
      <h3 data-cy="activity-item-title" className="text-lg font-bold">
        {title}
      </h3>

      <div className="mt-auto flex items-center">
        <span
          data-cy="activity-item-date"
          className="text-dimmed text-sm font-medium"
        >
          {formatDate(updated_at || created_at)}
        </span>
        <button
          data-cy="activity-item-delete-button"
          className="ml-auto"
          onClick={(e) => {
            e.preventDefault();
            onDelete();
          }}
        >
          <TrashIcon />
        </button>
      </div>
    </Link>
  );
};

export default Activity;
