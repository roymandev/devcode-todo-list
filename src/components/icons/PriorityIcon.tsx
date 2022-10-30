import { Todo } from '@/hooks/useTodo';

export interface PriorityIconProps {
  type: Todo['priority'];
}

const iconColors: Record<PriorityIconProps['type'], string> = {
  'very-high': '#ED4C5C',
  high: '#F8A541',
  normal: '#00A790',
  low: '#428BC1',
  'very-low': '#8942C1',
};

const PriorityIcon = ({ type }: PriorityIconProps) => {
  return (
    <span
      className="h-[14px] w-[14px] rounded-full"
      style={{ background: iconColors[type] }}
    />
  );
};

export default PriorityIcon;
