import * as Select from '@radix-ui/react-select';
import { IconCheck, IconChevronDown } from '@tabler/icons-react';
import { useMemo, useState } from 'react';
import { useUncontrolled } from '../hooks/useUncontrolled';
import { cn } from '../libs/cn';

type Option = string | { label?: string; value: string };

type Props<T extends Option> = {
  options: T[];
  className?: string;
  itemProps?: (option: T) => {
    'data-cy'?: string;
  };
  valueProps?: (option: T) => {
    'data-cy'?: string;
  };
  renderItem?: (option: T) => React.ReactNode;
  placeholder?: string;
  value?: string;
  onChange?: (value?: string) => void;
};

const BaseSelect = <T extends Option>({
  options,
  className,
  itemProps,
  valueProps,
  renderItem,
  placeholder,
  onChange,
  value,
  ...rest
}: Props<T>) => {
  const [_value, handleChange] = useUncontrolled({
    value,
    onChange,
  });

  const [open, setOpen] = useState(false);
  const selectedOption = useMemo(
    () =>
      options.find((option) => {
        if (typeof option === 'object') {
          return option.value === _value;
        }
        return option === _value;
      }),
    [_value, options],
  );

  return (
    <Select.Root
      value={value}
      onValueChange={handleChange}
      open={open}
      onOpenChange={setOpen}
    >
      <Select.Trigger
        className={cn(
          'group flex min-w-52 items-center rounded-md border border-gray-200 px-4 py-3 data-[state=open]:rounded-b-none data-[state=open]:bg-gray-100',
          className,
        )}
        {...rest}
      >
        {
          <Select.Value placeholder={placeholder} asChild>
            <div
              {...(selectedOption ? valueProps?.(selectedOption) : {})}
              className="!pointer-events-auto flex items-center"
            >
              {selectedOption ? renderItem?.(selectedOption) : ''}
            </div>
          </Select.Value>
        }
        <Select.Icon asChild>
          <IconChevronDown className="ml-auto transition-all group-data-[state=open]:rotate-180" />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          position="popper"
          className="w-[var(--radix-select-trigger-width)] rounded-b-md border-gray-200 border-x border-b bg-white"
        >
          <Select.Viewport>
            {options.map((option) => {
              let value = option as string;
              let label = option as string;

              if (typeof option === 'object') {
                value = option.value;
                label = option.label || option.value;
              }

              return (
                <Select.Item
                  key={value}
                  value={value}
                  textValue={label}
                  {...itemProps?.(option)}
                  className="flex min-h-[52px] cursor-default items-center px-4 text-gray-700 hover:bg-gray-100"
                >
                  {renderItem?.(option)}

                  <Select.ItemText
                    asChild
                    className={cn(renderItem && 'hidden')}
                  >
                    {label}
                  </Select.ItemText>

                  <Select.ItemIndicator className="ml-auto">
                    <IconCheck size={18} />
                  </Select.ItemIndicator>
                </Select.Item>
              );
            })}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

export default BaseSelect;
