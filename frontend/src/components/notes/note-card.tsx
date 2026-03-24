import { Card } from "@/components/ui/card";
import { NoteMarkdown } from "@/components/notes/note-markdown";
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
        <div className="note-card__heading">
          <span className="note-card__tag">Note</span>
          <h3 className="note-title">{note.title}</h3>
        </div>

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
        <div className="note-card__preview-shell">
          <NoteMarkdown className="note-preview" content={note.description} />
        </div>
      </div>

      <div className="note-card__actions">
        <span className="note-card__footer-label">Quick actions</span>

        <div className="note-card__action-group">
          <button
            aria-label={`Edit ${note.title}`}
            className="note-card__icon-action note-card__icon-action--edit"
            onClick={() => onEdit(note)}
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
                d="M4 20H8L18.4 9.6C19.2 8.8 19.2 7.5 18.4 6.7L17.3 5.6C16.5 4.8 15.2 4.8 14.4 5.6L4 16V20Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
              />
              <path
                d="M12.8 7.2L16.8 11.2"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="1.8"
              />
            </svg>
          </button>

          <button
            aria-label={`Delete ${note.title}`}
            className="note-card__icon-action note-card__icon-action--delete"
            onClick={() => onDelete(note)}
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
                d="M5 7H19"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="1.8"
              />
              <path
                d="M9 7V5.8C9 5.1 9.5 4.5 10.2 4.5H13.8C14.5 4.5 15 5.1 15 5.8V7"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
              />
              <path
                d="M7.2 7L8 18.2C8.1 19.1 8.8 19.8 9.7 19.8H14.3C15.2 19.8 15.9 19.1 16 18.2L16.8 7"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
              />
              <path
                d="M10.3 10.5V16"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="1.8"
              />
              <path
                d="M13.7 10.5V16"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="1.8"
              />
            </svg>
          </button>
        </div>
      </div>
    </Card>
  );
}
