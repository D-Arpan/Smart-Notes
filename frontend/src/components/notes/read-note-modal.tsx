import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { NoteMarkdown } from "@/components/notes/note-markdown";
import type { Note } from "@/types/note";

interface ReadNoteModalProps {
  note: Note | null;
  onClose: () => void;
  onEdit: (note: Note) => void;
  onDelete: (note: Note) => void;
}

export function ReadNoteModal({
  note,
  onClose,
  onEdit,
  onDelete
}: ReadNoteModalProps) {
  return (
    <Modal
      className="ui-modal--reader"
      description="Read the full note in a larger, easier view."
      onClose={onClose}
      open={Boolean(note)}
      title={note?.title ?? "Read note"}
    >
      {note ? (
        <div className="reader-modal">
          <div className="reader-modal__content">
            <div className="reader-modal__heading">Note content</div>
            <div className="reader-modal__body">
              <NoteMarkdown content={note.description} />
            </div>
          </div>

          <div className="reader-modal__actions">
            <Button onClick={() => onEdit(note)} type="button" variant="secondary">
              Edit note
            </Button>
            <Button onClick={() => onDelete(note)} type="button" variant="danger">
              Delete note
            </Button>
          </div>
        </div>
      ) : null}
    </Modal>
  );
}
