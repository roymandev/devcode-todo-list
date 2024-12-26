import { cn } from '../../../libs/cn';
import { TODO_PRIORITY_OPTIONS, type TodoPriority } from '../contant/options';

type Props = {
  priority: TodoPriority | (string & {});
  className?: string;
};

const PriorityDot = ({ priority, className, ...rest }: Props) => {
  const color = TODO_PRIORITY_OPTIONS.find(
    (option) => option.value === priority,
  )?.color;

  return !color ? null : (
    <span
      style={{ background: color }}
      className={cn('block size-[14px] rounded-full', className)}
      {...rest}
    />
  );
};

export default PriorityDot;
