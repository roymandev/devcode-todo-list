import TrashIcon from '@/components/icons/TrashIcon';
import { formatDate } from '@/lib/formatDate';
import { Activity as ActivityType } from '@/stores/activityStore';

interface ActivityProps extends ActivityType {
  index: number;
}

const Activity = ({ title, updated_at, created_at, index }: ActivityProps) => (
  <button
    data-cy={'activity-item-' + index}
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
      <button data-cy="activity-item-delete-button" className="ml-auto">
        <TrashIcon />
      </button>
    </div>
  </button>
);

export default Activity;
