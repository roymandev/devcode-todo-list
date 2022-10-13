import CustomButton from '@/components/CustomButton';
import InformationIcon from '@/components/icons/InformationIcon';
import WarningIcon from '@/components/icons/WarningIcon';
import Base, { BaseModalProps } from '@/components/modals/Base';
import { Activity, atomDeleteActivity } from '@/stores/activityStore';
import { useSetAtom } from 'jotai';
import { useState } from 'react';

export interface DeleteActivityProps extends BaseModalProps {
  activity: Activity;
}

const DeleteActivity = ({
  activity,
  onClose,
  ...rest
}: DeleteActivityProps) => {
  const deleteActivity = useSetAtom(atomDeleteActivity);
  const [isDelete, setIsDelete] = useState(false);

  return (
    <Base onClose={onClose} {...rest}>
      {isDelete ? (
        <div className="mt-48 flex w-full max-w-lg items-center gap-3 rounded-xl bg-white px-7 py-4 text-sm shadow-md">
          <InformationIcon />
          Activity berhasil dihapus
        </div>
      ) : (
        <div className="my-auto flex w-full max-w-lg flex-col items-center rounded-xl bg-white p-10 text-lg shadow-md">
          <WarningIcon />

          <p className="mt-8 mb-11 text-center">
            Apakah anda yakin menghapus activity
            <br />
            <b>“{activity.title}”?</b>
          </p>

          <div className="flex gap-5">
            <CustomButton
              color="secondary"
              className="w-36 justify-center"
              onClick={onClose}
            >
              Batal
            </CustomButton>
            <CustomButton
              color="red"
              className="w-36 justify-center"
              onClick={() =>
                deleteActivity(activity.id).finally(() => {
                  setIsDelete(true);

                  setTimeout(() => {
                    setIsDelete(false);
                    onClose();
                  }, 1000);
                })
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
