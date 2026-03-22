import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import type { Note } from "@/types/note";

interface DeleteNoteModalProps {
  note: Note | null;
  busy: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteNoteModal({
  note,
  busy,
  onClose,
  onConfirm
}: DeleteNoteModalProps) {
  return (
    <Modal
      description="This replaces the browser confirm dialog with a calmer in-app action card."
      onClose={onClose}
      open={Boolean(note)}
      title="Delete note"
    >
      <p className="danger-callout">
        {note
          ? `You are about to delete "${note.title}". This action cannot be undone.`
          : "This action cannot be undone."}
      </p>

      <div className="modal-actions">
        <Button onClick={onClose} type="button" variant="ghost">
          Keep note
        </Button>
        <Button loading={busy} onClick={onConfirm} type="button" variant="danger">
          {busy ? "Deleting note" : "Delete permanently"}
        </Button>
      </div>
    </Modal>
  );
}
