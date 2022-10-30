import CustomButton from '@/components/CustomButton';
import CustomSelector from '@/components/CustomSelector';
import ChevronIcon from '@/components/icons/ChevronIcon';
import CloseIcon from '@/components/icons/CloseIcon';
import PriorityIcon from '@/components/icons/PriorityIcon';
import Base, { BaseModalProps } from '@/components/modals/Base';
import { Todo } from '@/hooks/useTodo';
import twclsx from '@/lib/twclsx';
import { useId, useState } from 'react';

export interface CreateTodoProps extends Omit<BaseModalProps, 'children'> {
  onSave: (title: Todo['title'], priority: Todo['priority']) => void;
}

const selectorItems: {
  value: Todo['priority'];
  text: string;
  icon: React.ReactNode;
}[] = [
  {
    value: 'very-high',
    text: 'Very High',
    icon: <PriorityIcon type="very-high" />,
  },
  {
    value: 'high',
    text: 'High',
    icon: <PriorityIcon type="high" />,
  },
  {
    value: 'normal',
    text: 'Medium',
    icon: <PriorityIcon type="normal" />,
  },
  {
    value: 'low',
    text: 'Low',
    icon: <PriorityIcon type="low" />,
  },
  {
    value: 'very-low',
    text: 'Very Low',
    icon: <PriorityIcon type="very-low" />,
  },
];

const CreateTodo = ({ onClose, onSave, ...props }: CreateTodoProps) => {
  const formId = useId();
  const [openSelector, setOpenSelector] = useState(false);

  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<Todo['priority']>('very-high');

  const getSelectedPriority = () =>
    selectorItems.find((item) => item.value === priority);

  return (
    <Base onClose={onClose} {...props}>
      <article className="my-auto w-full max-w-[830px] rounded-xl bg-white shadow-md">
        <header className="border-primary flex h-[70px] items-center border-b px-[30px] text-lg font-semibold">
          <h3>Tambah List Item</h3>

          <button className="ml-auto" onClick={onClose}>
            <CloseIcon />
          </button>
        </header>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (title) {
              onSave(title, priority);
              onClose();
            }
          }}
        >
          <div className="flex flex-col p-8">
            <label
              htmlFor={formId + 'name'}
              className="mb-2 text-xs font-semibold uppercase"
            >
              Nama List Item
            </label>
            <input
              className="border-primary mb-6 h-[52px] rounded-md border py-[14px] px-[18px] outline-none focus:border-[#16ABF8]"
              type="text"
              placeholder="Tambahkan nama list item"
              required
              id={formId + 'name'}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <label
              htmlFor={formId + 'priority'}
              className="mb-2 text-xs font-semibold uppercase"
            >
              Priority
            </label>

            <div>
              <button
                id={formId + 'priority'}
                className={twclsx(
                  'border-primary flex h-[52px] w-52 items-center gap-4 rounded-md border py-4 px-5',
                  openSelector && 'rounded-b-none bg-secondary',
                )}
                onClick={() => setOpenSelector((prev) => !prev)}
              >
                {!openSelector && (
                  <PriorityIcon
                    type={getSelectedPriority()?.value || 'very-high'}
                  />
                )}
                {openSelector ? 'Pilih Priority' : getSelectedPriority()?.text}
                <ChevronIcon
                  direction={openSelector ? 'top' : 'bottom'}
                  className="ml-auto"
                />
              </button>

              {openSelector && (
                <CustomSelector<Todo['priority']>
                  items={selectorItems}
                  value={priority}
                  onSelect={(value) => {
                    setPriority(value);
                    setOpenSelector(false);
                  }}
                  className="border-primary mt-0 flex w-52 flex-col rounded-t-none border border-t-0"
                  itemClassName="w-auto"
                />
              )}
            </div>
          </div>

          <div className="border-primary border-t px-10 py-5">
            <CustomButton type="submit" className="ml-auto w-40 justify-center">
              Simpan
            </CustomButton>
          </div>
        </form>
      </article>
    </Base>
  );
};

export default CreateTodo;
