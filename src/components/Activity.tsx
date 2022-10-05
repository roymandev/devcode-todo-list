import TrashIcon from '@/components/icons/TrashIcon';
import { formatDate } from '@/lib/formatDate';
import { Activity as ActivityProps } from '@/stores/activityStore';

const Activity = ({ title, updated_at, created_at }: ActivityProps) => (
  <button className="flex h-60 flex-col rounded-xl bg-white p-6 text-left shadow-lg">
    <h3 className="text-lg font-bold">{title}</h3>

    <div className="mt-auto flex items-center">
      <span className="text-dimmed text-sm font-medium">
        {formatDate(updated_at || created_at)}
      </span>
      <TrashIcon className="ml-auto" />
    </div>
  </button>
);

export default Activity;
