import CustomSelector from '@/components/CustomSelector';
import SortAltIcon from '@/components/icons/SortAltIcon';
import SortAtoZIcon from '@/components/icons/SortAtoZIcon';
import SortIcon from '@/components/icons/SortIcon';
import SortLatestIcon from '@/components/icons/SortLatestIcon';
import SortOldestIcon from '@/components/icons/SortOldestIcon';
import SortZtoAIcon from '@/components/icons/SortZtoAIcon';
import { TODOS_SORT_TYPE } from '@/lib/sortTodos';
import { useState } from 'react';

export interface ItemSortButtonProps {
  sort: TODOS_SORT_TYPE;
  setSort: (sortType: TODOS_SORT_TYPE) => void;
}

const itemSortType: {
  value: TODOS_SORT_TYPE;
  text: string;
  icon: React.ReactNode;
}[] = [
  {
    value: 'latest',
    text: 'Terbaru',
    icon: <SortLatestIcon />,
  },
  {
    value: 'oldest',
    text: 'Terlama',
    icon: <SortOldestIcon />,
  },
  {
    value: 'az',
    text: 'A-Z',
    icon: <SortAtoZIcon />,
  },
  {
    value: 'za',
    text: 'Z-A',
    icon: <SortZtoAIcon />,
  },
  {
    value: 'unfinished',
    text: 'Belum Selesai',
    icon: <SortAltIcon />,
  },
];

const ItemSortButton = ({ sort, setSort }: ItemSortButtonProps) => {
  const [showSelector, setShowSelector] = useState(false);

  const toggleShowSelector = () => setShowSelector((prev) => !prev);

  return (
    <div className="relative ml-auto">
      <button
        data-cy="todo-sort-button"
        className="border-primary h-[54px] w-[54px] rounded-full border"
        onClick={toggleShowSelector}
      >
        <SortIcon className="mx-auto" />
      </button>

      {showSelector && (
        <CustomSelector<TODOS_SORT_TYPE>
          value={sort}
          onSelect={(value) => {
            setSort(value);
            toggleShowSelector();
          }}
          items={itemSortType}
          className="shadow-lg"
        />
      )}
    </div>
  );
};

export default ItemSortButton;
