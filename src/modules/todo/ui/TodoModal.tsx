import * as Dialog from "@radix-ui/react-dialog";
import { IconX } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Button } from "../../../components/Button";
import type { PayloadCreateTodo } from "../api/types";
import type { TodoPriority } from "../contant/options";
import PrioritySelect from "./PrioritySelect";

export type TodoModalValues = Pick<PayloadCreateTodo, "title" | "priority">;

type Props = Required<Pick<Dialog.DialogProps, "open" | "onOpenChange">> & {
  onSave?: (values: TodoModalValues) => Promise<void> | void;
  initialValues?: Partial<PayloadCreateTodo> | null;
};

const TodoModal = ({ open, onOpenChange, initialValues, onSave }: Props) => {
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<TodoPriority>("very-high");

  const handleClose = () => {
    onOpenChange(false);
  };

  useEffect(() => {
    if (open) {
      setTitle(initialValues?.title || "");
      setPriority(initialValues?.priority || "very-high");
    }
  }, [open]);

  const handleSave = async () => {
    if (!onSave || !title) return;

    setLoading(true);

    await onSave({ title, priority });

    setLoading(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={handleClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 flex bg-black/60" />
        <Dialog.Content
          data-cy="modal-add"
          aria-description="Todo modal"
          className="!pointer-events-auto relative mx-auto max-w-2xl rounded-xl bg-white"
        >
          <header className="flex min-h-[70px] items-center border-gray-200 border-b px-7">
            <Dialog.Title
              data-cy="modal-add-title"
              className="font-semibold text-lg"
            >
              Tambah List Item
            </Dialog.Title>

            <Dialog.Close
              data-cy="modal-add-close-button"
              className="ml-auto p-1 text-gray-500 transition-colors hover:text-dark"
            >
              <IconX />
            </Dialog.Close>
          </header>

          <div className="px-7 py-9">
            <div>
              <label
                data-cy="modal-add-name-title"
                htmlFor="title"
                className="block font-semibold text-xs"
              >
                NAMA LIST ITEM
              </label>
              <input
                data-cy="modal-add-name-input"
                type="text"
                name="title"
                id="title"
                className="mt-2 w-full rounded-md border border-gray-200 px-4 py-3 placeholder:text-gray-500"
                placeholder="Tambahkan nama list item"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="mt-7">
              <label
                data-cy="modal-add-priority-title"
                htmlFor="priority"
                className="block font-semibold text-xs"
              >
                PRIORITY
              </label>
              <PrioritySelect
                data-cy="modal-add-priority-dropdown"
                value={priority}
                onChange={setPriority}
                itemProps={(option) => ({
                  "data-cy": "modal-add-priority-item",
                })}
                className="mt-2"
              />
            </div>
          </div>

          <div className="flex min-h-[88px] items-center justify-end border-gray-200 border-t px-7">
            <Button
              data-cy="modal-add-save-button"
              disabled={!title}
              onClick={handleSave}
              loading={loading}
            >
              Simpan
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default TodoModal;
