import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { Textarea } from "@/components/ui/textarea";
import type { Note, NoteFormValues } from "@/types/note";

interface EditNoteModalProps {
  note: Note | null;
  values: NoteFormValues;
  busy: boolean;
  onChange: (field: keyof NoteFormValues, value: string) => void;
  onClose: () => void;
  onSubmit: () => void;
}

export function EditNoteModal({
  note,
  values,
  busy,
  onChange,
  onClose,
  onSubmit
}: EditNoteModalProps) {
  return (
    <Modal
      className="ui-modal--editor"
      description="Make changes inside the popup card and save them back to the existing backend."
      onClose={onClose}
      open={Boolean(note)}
      title={note ? `Edit "${note.title}"` : "Edit note"}
    >
      <div className="composer-card composer-card--modal composer-card--plain">
        <Input
          id="edit-note-title"
          label="Title"
          onChange={(event) => onChange("title", event.target.value)}
          placeholder="Update the note title"
          value={values.title}
        />

        <Textarea
          id="edit-note-description"
          label="Description"
          onChange={(event) => onChange("description", event.target.value)}
          placeholder="Update the note description"
          value={values.description}
        />

        <div className="modal-actions">
          <Button onClick={onClose} type="button" variant="ghost">
            Cancel
          </Button>
          <Button loading={busy} onClick={onSubmit} type="button">
            {busy ? "Saving changes" : "Save changes"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
