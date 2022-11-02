import CustomButton from '@/components/CustomButton';
import InformationIcon from '@/components/icons/InformationIcon';
import WarningIcon from '@/components/icons/WarningIcon';
import Base, { BaseModalProps } from '@/components/modals/Base';
import { Activity } from '@/store';
import { useState } from 'react';

export interface DeleteActivityProps extends BaseModalProps {
  activity: Activity;
  onDelete: (activityId: Activity['id']) => Promise<void>;
}

const DeleteActivity = ({
  activity,
  onClose,
  onDelete,
  ...rest
}: DeleteActivityProps) => {
  const [isDelete, setIsDelete] = useState(false);

  const onCloseHanlder = () => {
    setIsDelete(false);
    onClose();
  };

  return (
    <Base onClose={onCloseHanlder} {...rest}>
      {isDelete ? (
        <div
          data-cy="modal-information"
          className="mt-48 flex w-full max-w-lg items-center gap-3 rounded-xl bg-white px-7 py-4 text-sm shadow-md"
        >
          <InformationIcon data-cy="modal-information-icon" />
          <p data-cy="modal-information-title">Activity berhasil dihapus</p>
        </div>
      ) : (
        <div
          data-cy="modal-delete"
          className="my-auto flex w-full max-w-lg flex-col items-center rounded-xl bg-white p-10 text-lg shadow-md"
        >
          <WarningIcon data-cy="modal-delete-icon" />

          <p data-cy="modal-delete-title" className="mt-8 mb-11 text-center">
            Apakah anda yakin menghapus activity
            <br />
            <b>“{activity.title}”?</b>
          </p>

          <div className="flex gap-5">
            <CustomButton
              data-cy="modal-delete-cancel-button"
              color="secondary"
              className="w-36 justify-center"
              onClick={onCloseHanlder}
            >
              Batal
            </CustomButton>
            <CustomButton
              data-cy="modal-delete-confirm-button"
              color="red"
              className="w-36 justify-center"
              onClick={() =>
                onDelete(activity.id).finally(() => setIsDelete(true))
              }
            >
              Hapus
            </CustomButton>
          </div>
        </div>
      )}
    </Base>
  );
};

export default DeleteActivity;
