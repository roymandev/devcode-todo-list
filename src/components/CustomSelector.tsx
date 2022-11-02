import CheckIcon from '@/components/icons/CheckIcon';
import twclsx from '@/lib/twclsx';

export interface CustomDropdownProps<T = string> {
  className?: string;
  itemClassName?: string;
  value: T;
  items: {
    value: T;
    text: string;
    icon: React.ReactNode;
  }[];
  onSelect: (item: T) => void;
  itemDataCyPrefix: string;
  dataCy: string;
}

const CustomSelector = <T,>({
  value,
  items,
  className,
  itemClassName,
  onSelect,
  itemDataCyPrefix,
  dataCy,
}: CustomDropdownProps<T>) => {
  return (
    <div
      data-cy={dataCy}
      className={twclsx(
        'divide-primary absolute mt-1 divide-y rounded-md bg-white',
        className,
      )}
    >
      {items.map((item) => {
        return (
          <button
            data-cy={itemDataCyPrefix + item.value}
            key={item.text}
            className={twclsx(
              'flex h-[52px] w-56 items-center gap-4 py-4 px-5',
              itemClassName,
            )}
            onClick={() => onSelect(item.value)}
          >
            {item.icon}
            {item.text}
            {item.value === value && <CheckIcon className="ml-auto" />}
          </button>
        );
      })}
    </div>
  );
};

export default CustomSelector;
