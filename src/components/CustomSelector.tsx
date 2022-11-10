import { CustomSelectorItemProps } from '@/components/CustomSelectorItem';
import twclsx from '@/lib/twclsx';

type Item<T> = CustomSelectorItemProps<T>['item'];

export interface CustomSelectorProps<T = string> {
  className?: string;
  currentValue: T;
  items: Item<T>[];
  renderItem: (value: T, item: Item<T>) => React.ReactNode;
}

const CustomSelector = <T,>({
  currentValue,
  items,
  className,
  renderItem,
}: CustomSelectorProps<T>) => {
  return (
    <div
      className={twclsx(
        'divide-primary absolute mt-1 divide-y rounded-md bg-white',
        className,
      )}
    >
      {items.map((item) => renderItem(currentValue, item))}
    </div>
  );
};

export default CustomSelector;
