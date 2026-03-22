import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { Textarea } from "@/components/ui/textarea";
import type { NoteFormValues } from "@/types/note";

interface CreateNoteModalProps {
  open: boolean;
  values: NoteFormValues;
  busy: boolean;
  onChange: (field: keyof NoteFormValues, value: string) => void;
  onClose: () => void;
  onSubmit: () => void;
}

export function CreateNoteModal({
  open,
  values,
  busy,
  onChange,
  onClose,
  onSubmit
}: CreateNoteModalProps) {
  return (
    <Modal
      className="ui-modal--editor"
      description="Use the full-size editor to write a title and a longer note without feeling cramped."
      onClose={onClose}
      open={open}
      title="Create new note"
    >
      <div className="composer-card composer-card--modal composer-card--plain">
        <Input
          id="create-note-title"
          label="Title"
          onChange={(event) => onChange("title", event.target.value)}
          placeholder="Daily plan, idea, reminder..."
          value={values.title}
        />

        <Textarea
          id="create-note-description"
          label="Description"
          onChange={(event) => onChange("description", event.target.value)}
          placeholder="Write the note details here."
          value={values.description}
        />

        <div className="modal-actions">
          <Button onClick={onClose} type="button" variant="ghost">
            Cancel
          </Button>
          <Button loading={busy} onClick={onSubmit} type="button">
            {busy ? "Saving note" : "Create note"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
