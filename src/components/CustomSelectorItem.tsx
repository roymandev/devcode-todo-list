import CheckIcon from '@/components/icons/CheckIcon';
import twclsx from '@/lib/twclsx';

export interface CustomSelectorItemProps<T = string>
  extends React.ComponentPropsWithoutRef<'button'> {
  item: {
    value: T;
    text: string;
    icon: React.ReactNode;
  };
  isSelected: boolean;
}

const CustomSelectorItem = <T,>({
  item,
  className,
  isSelected = false,
  ...rest
}: CustomSelectorItemProps<T>) => (
  <button
    className={twclsx(
      'flex h-[52px] w-56 items-center gap-4 py-4 px-5',
      className,
    )}
    {...rest}
  >
    {item.icon}
    {item.text}
    {isSelected && <CheckIcon className="ml-auto" />}
  </button>
);

export default CustomSelectorItem;
