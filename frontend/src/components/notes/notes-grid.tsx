import { NoteCard } from "@/components/notes/note-card";
import type { Note } from "@/types/note";

interface NotesGridProps {
  notes: Note[];
  onView: (note: Note) => void;
  onEdit: (note: Note) => void;
  onDelete: (note: Note) => void;
}

export function NotesGrid({ notes, onView, onEdit, onDelete }: NotesGridProps) {
  return (
    <div className="notes-grid">
      {notes.map((note) => (
        <NoteCard
          key={note._id}
          note={note}
          onDelete={onDelete}
          onEdit={onEdit}
          onView={onView}
        />
      ))}
    </div>
  );
}
