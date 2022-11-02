import CustomButton from '@/components/CustomButton';
import CustomSelector from '@/components/CustomSelector';
import ChevronIcon from '@/components/icons/ChevronIcon';
import CloseIcon from '@/components/icons/CloseIcon';
import PriorityIcon from '@/components/icons/PriorityIcon';
import Base, { BaseModalProps } from '@/components/modals/Base';
import { Todo } from '@/hooks/useTodo';
import twclsx from '@/lib/twclsx';
import { useEffect, useId, useState } from 'react';

export interface TodoEditorProps extends Omit<BaseModalProps, 'children'> {
  todo?: Todo;
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

const TodoEditor = ({ todo, onClose, onSave, ...props }: TodoEditorProps) => {
  const formId = useId();
  const [openSelector, setOpenSelector] = useState(false);

  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<Todo['priority']>('very-high');

  const getSelectedPriority = () =>
    selectorItems.find((item) => item.value === priority);

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setPriority(todo.priority);
    }
  }, [todo]);

  return (
    <Base onClose={onClose} {...props}>
      <article
        data-cy="modal-add"
        className="my-auto w-full max-w-[830px] rounded-xl bg-white shadow-md"
      >
        <header className="border-primary flex h-[70px] items-center border-b px-[30px] text-lg font-semibold">
          <h3 data-cy="modal-add-title">
            {todo ? 'Edit Item' : 'Tambah List Item'}
          </h3>

          <button
            data-cy="modal-add-close-button"
            className="ml-auto"
            onClick={onClose}
          >
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
              data-cy="modal-add-name-title"
              htmlFor={formId + 'name'}
              className="mb-2 text-xs font-semibold uppercase"
            >
              Nama List Item
            </label>
            <input
              data-cy="modal-add-name-input"
              className="border-primary mb-6 h-[52px] rounded-md border py-[14px] px-[18px] outline-none focus:border-[#16ABF8]"
              type="text"
              placeholder="Tambahkan nama list item"
              required
              id={formId + 'name'}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <label
              data-cy="modal-add-priority-title"
              htmlFor={formId + 'priority'}
              className="mb-2 text-xs font-semibold uppercase"
            >
              Priority
            </label>

            <div>
              <button
                id={formId + 'priority'}
                type="button"
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
                {openSelector
                  ? 'Pilih Priority'
                  : getSelectedPriority()?.text || 'Very High'}
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
                  dataCy="modal-add-priority-dropdown"
                  itemDataCyPrefix="modal-add-priority-"
                />
              )}
            </div>
          </div>

          <div className="border-primary border-t px-10 py-5">
            <CustomButton
              data-cy="modal-add-save-button"
              type="submit"
              className="ml-auto w-40 justify-center disabled:opacity-20"
              disabled={!title}
            >
              Simpan
            </CustomButton>
          </div>
        </form>
      </article>
    </Base>
  );
};

export default TodoEditor;
