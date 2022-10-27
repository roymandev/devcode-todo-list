import PencilIcon from '@/components/icons/PencilIcon';
import twclsx from '@/lib/twclsx';
import { useEffect, useRef, useState } from 'react';

export interface ItemTitleProps {
  title: string;
  onChange: (newTitle: string) => void;
}

const ItemTitle = ({ title: initialTitle, onChange }: ItemTitleProps) => {
  const [title, setTitle] = useState(initialTitle);
  const [onEditTitle, setOnEditTitle] = useState(false);
  const titleInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (onEditTitle) {
      if (titleInputRef.current) titleInputRef.current.focus();
    }
  }, [onEditTitle]);

  return (
    <>
      <input
        ref={titleInputRef}
        type="text"
        value={title}
        className={twclsx(
          'border-b border-black bg-transparent text-4xl font-bold outline-none -mb-px w-full',
          !onEditTitle && 'hidden',
        )}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        onBlur={() => {
          setOnEditTitle(false);
          if (initialTitle !== title) onChange(title);
        }}
      />
      <h1
        data-cy="todo-title"
        className={twclsx('text-4xl font-bold', onEditTitle && 'hidden')}
      >
        {title}
      </h1>
      <button
        data-cy="todo-title-edit-button"
        onClick={() => setOnEditTitle(true)}
      >
        <PencilIcon />
      </button>
    </>
  );
};

export default ItemTitle;
