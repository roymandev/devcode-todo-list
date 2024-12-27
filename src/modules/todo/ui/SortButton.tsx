import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { IconCheck } from "@tabler/icons-react";
import { useMemo } from "react";
import { useUncontrolled } from "../../../hooks/useUncontrolled";
import { TODO_SORT_OPTIONS, TodoSort } from "../contant/options";

type Props = {
  onChange: (value: TodoSort) => void;
};

const SortButton = ({ onChange, ...rest }: Props) => {
  const [_value, handleChange] = useUncontrolled<TodoSort>({
    onChange,
    defaultValue: "unfinished",
  });

  const selected = useMemo(
    () => TODO_SORT_OPTIONS.find((o) => o.value === _value),
    [_value]
  );

  return (
    <Listbox value={_value} onChange={handleChange}>
      <ListboxButton
        className="size-[54px] border text-gray-600 grid place-items-center rounded-full border-gray-200"
        {...rest}
      >
        {selected?.icon}
      </ListboxButton>
      <ListboxOptions
        data-cy="sort-parent"
        anchor="bottom"
        className="bg-white rounded-md shadow-lg border border-gray-200 min-w-60"
      >
        {TODO_SORT_OPTIONS.map((sort) => (
          <ListboxOption
            data-cy={`sort-${sort.value}`}
            key={sort.label}
            value={sort.value}
            className="flex h-[52px] items-center px-5 group gap-4 text-gray-700"
          >
            <span className="text-primary">{sort.icon}</span>
            {sort.label}

            <IconCheck
              size={18}
              className="ml-auto invisible group-data-[selected]:visible"
            />
          </ListboxOption>
        ))}
      </ListboxOptions>
    </Listbox>
  );
};

export default SortButton;
