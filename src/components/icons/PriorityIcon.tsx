import { Todo } from '@/hooks/useTodo';
import twclsx from '@/lib/twclsx';

export interface PriorityIconProps {
  type: Todo['priority'];
  className?: string;
}

const iconColors: Record<PriorityIconProps['type'], string> = {
  'very-high': '#ED4C5C',
  high: '#F8A541',
  normal: '#00A790',
  low: '#428BC1',
  'very-low': '#8942C1',
};

const PriorityIcon = ({ type, className }: PriorityIconProps) => {
  return (
    <span
      className={twclsx('h-[14px] w-[14px] rounded-full', className)}
      style={{ background: iconColors[type] }}
    />
  );
};

export default PriorityIcon;
