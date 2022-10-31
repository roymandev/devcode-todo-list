import CustomButton from '@/components/CustomButton';
import WarningIcon from '@/components/icons/WarningIcon';
import Base, { BaseModalProps } from '@/components/modals/Base';
import { Todo } from '@/hooks/useTodo';

export interface DeleteTodoProps extends BaseModalProps {
  todo: Todo;
  onDelete: (todoId: Todo['id']) => void;
}

const DeleteTodo = ({ todo, onDelete, onClose, ...props }: DeleteTodoProps) => (
  <Base onClose={onClose} {...props}>
    <div className="my-auto flex w-full max-w-lg flex-col items-center rounded-xl bg-white p-10 text-lg shadow-md">
      <WarningIcon data-cy="modal-delete-icon" />

      <p data-cy="modal-delete-title" className="mt-8 mb-11 text-center">
        Apakah anda yakin menghapus List Item
        <br />
        <b>“{todo.title}”?</b>
      </p>

      <div className="flex gap-5">
        <CustomButton
          data-cy="modal-delete-cancel-button"
          color="secondary"
          className="w-36 justify-center"
          onClick={onClose}
        >
          Batal
        </CustomButton>
        <CustomButton
          data-cy="modal-delete-confirm-button"
          color="red"
          className="w-36 justify-center"
          onClick={() => {
            onDelete(todo.id);
            onClose();
          }}
        >
          Hapus
        </CustomButton>
      </div>
    </div>
  </Base>
);

export default DeleteTodo;
