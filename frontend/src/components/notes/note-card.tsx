import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Note } from "@/types/note";

interface NoteCardProps {
  note: Note;
  onView: (note: Note) => void;
  onEdit: (note: Note) => void;
  onDelete: (note: Note) => void;
}

export function NoteCard({ note, onView, onEdit, onDelete }: NoteCardProps) {
  return (
    <Card className="note-card">
      <div className="note-card__header">
        <h3 className="note-title">{note.title}</h3>
        <button
          aria-label={`View ${note.title}`}
          className="note-card__view"
          onClick={() => onView(note)}
          type="button"
        >
          <svg
            aria-hidden="true"
            fill="none"
            height="18"
            viewBox="0 0 24 24"
            width="18"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 12C3.9 7.9 7.4 5.5 12 5.5C16.6 5.5 20.1 7.9 22 12C20.1 16.1 16.6 18.5 12 18.5C7.4 18.5 3.9 16.1 2 12Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.8"
            />
            <circle cx="12" cy="12" r="3.1" stroke="currentColor" strokeWidth="1.8" />
          </svg>
        </button>
      </div>

      <div className="note-card__preview">
        <p className="note-preview">{note.description}</p>
      </div>

      <div className="note-card__actions">
        <Button onClick={() => onEdit(note)} type="button" variant="secondary">
          Edit
        </Button>
        <Button onClick={() => onDelete(note)} type="button" variant="danger">
          Delete
        </Button>
      </div>
    </Card>
  );
}
