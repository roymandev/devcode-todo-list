import type { ComponentProps } from 'react';
import BaseSelect from '../../../components/BaseSelect';
import { TODO_PRIORITY_OPTIONS, type TodoPriority } from '../contant/options';
import PriorityDot from './PriorityDot';

type PriorityOption = (typeof TODO_PRIORITY_OPTIONS)[number];

type Props = {
  value: TodoPriority;
  onChange: (value: TodoPriority) => void;
} & Omit<
  ComponentProps<typeof BaseSelect<PriorityOption>>,
  'options' | 'value' | 'onChange' | 'renderItem'
>;

const PrioritySelect = ({ value, onChange, ...rest }: Props) => {
  return (
    <BaseSelect
      placeholder="Pilih priority"
      {...rest}
      options={TODO_PRIORITY_OPTIONS}
      renderItem={(option) => (
        <>
          <PriorityDot priority={option.value} className="mr-5" />
          {option.label}
        </>
      )}
      value={value}
      onChange={(value) => value && onChange(value as never)}
    />
  );
};

export default PrioritySelect;
