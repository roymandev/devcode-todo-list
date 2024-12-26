import { IconPencil } from '@tabler/icons-react';
import { type ElementRef, useEffect, useRef, useState } from 'react';
import { Button } from '../../../components/Button';
import { PageTitle, type PageTitleProps } from '../../../components/PageTitle';
import { FALLBACK_ACTIVITY_EMPTY_TITLE } from '../../../constants/fallbacks';
import { cn } from '../../../libs/cn';

type Props = PageTitleProps & {
  onFinish: (value: string) => void;
};

export const PageTitleEditable = ({ onFinish, children, ...rest }: Props) => {
  const [editMode, setEditMode] = useState(false);
  const [value, setValue] = useState<string | null>(null);
  const inputRef = useRef<ElementRef<'input'>>(null);

  const handleEdit = () => setEditMode((prev) => !prev);

  const handleOnBlur = () => setEditMode(false);

  useEffect(() => {
    if (editMode) {
      setValue(children);

      inputRef.current?.focus();
    } else if (value !== null && value !== children) {
      onFinish(value);
      setValue(null);
    }
  }, [editMode]);

  return (
    <div className="flex min-w-0 flex-1 items-center gap-5">
      {editMode ? (
        <input
          ref={inputRef}
          className="mt-px flex-1 border-0 border-b bg-transparent p-0 font-bold text-4xl focus:border-gray-500 focus:outline-none focus:ring-0"
          value={value || ''}
          onChange={(e) => setValue(e.target.value)}
          onBlur={handleOnBlur}
        />
      ) : (
        <PageTitle
          {...rest}
          role="button"
          className="overflow-hidden whitespace-nowrap break-all"
          onClick={handleEdit}
        >
          {value || children || FALLBACK_ACTIVITY_EMPTY_TITLE}
        </PageTitle>
      )}

      <Button
        data-cy="todo-title-edit-button"
        variant="unstyled"
        className={cn('p-1 text-gray-500', editMode && 'pointer-events-none')}
        onClick={handleEdit}
        disabled={editMode}
      >
        <IconPencil />
      </Button>
    </div>
  );
};
