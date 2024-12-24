import * as Dialog from '@radix-ui/react-dialog';
import { IconAlertTriangle, IconInfoCircle } from '@tabler/icons-react';
import { type ReactNode, useState } from 'react';
import { promiseHandler } from '../../libs/promise-handler';
import { Button } from '../Button';

type Props = Required<Pick<Dialog.DialogProps, 'open' | 'onOpenChange'>> & {
  title: ReactNode;
  onApply?: () => Promise<void> | void;
  successMessage: string;
};

const ModalDelete = ({
  open,
  onOpenChange,
  title,
  onApply,
  successMessage,
}: Props) => {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleApply = async () => {
    if (!onApply) return;

    setLoading(true);

    const [, error] = await promiseHandler(onApply);

    setLoading(false);

    if (!error) setSuccess(true);
  };

  const handleClose = () => {
    onOpenChange(false);
    setSuccess(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={handleClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 flex bg-black/60" />
        {success ? (
          <Dialog.Content
            data-cy="modal-information"
            aria-description="Delete success information"
            className="relative mx-auto max-w-2xl rounded-xl bg-white px-7 py-5"
          >
            <div className="flex gap-3">
              <IconInfoCircle
                data-cy="modal-information-icon"
                className="text-green"
              />
              <p data-cy="modal-information-title" className="font-medium">
                {successMessage}
              </p>
            </div>
          </Dialog.Content>
        ) : (
          <Dialog.Content
            data-cy="modal-delete"
            aria-description="Delete confirmation modal"
            className="relative mx-auto max-w-2xl rounded-xl bg-white p-12"
          >
            <div>
              <IconAlertTriangle
                data-cy="modal-delete-icon"
                size={84}
                stroke={1}
                className="mx-auto text-red"
              />
            </div>
            <Dialog.Title
              data-cy="modal-delete-title"
              className="mt-8 text-center text-lg"
            >
              {title}
            </Dialog.Title>

            <div className="mt-12 flex justify-center gap-5">
              <Dialog.Close asChild>
                <Button
                  data-cy="modal-delete-cancel-button"
                  variant="secondary"
                  className="w-[150px]"
                >
                  Batal
                </Button>
              </Dialog.Close>

              <Button
                data-cy="modal-delete-confirm-button"
                variant="danger"
                className="w-[150px]"
                onClick={handleApply}
                disabled={loading}
              >
                Hapus
              </Button>
            </div>
          </Dialog.Content>
        )}
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ModalDelete;
