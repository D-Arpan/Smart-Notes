"use client";

import type { Dispatch, SetStateAction } from "react";
import { useEffect, useState } from "react";
import { DeleteNoteModal } from "@/components/notes/delete-note-modal";
import { EditNoteModal } from "@/components/notes/edit-note-modal";
import { NoteFormCard } from "@/components/notes/note-form-card";
import { NotesGrid } from "@/components/notes/notes-grid";
import { ReadNoteModal } from "@/components/notes/read-note-modal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { SearchInput } from "@/components/ui/search-input";
import { ToastStack } from "@/components/ui/toast-stack";
import { createNote, getNotes, removeNote, updateNote } from "@/lib/api";
import { getErrorMessage } from "@/lib/utils";
import type { Note, NoteFormValues, ToastMessage, ToastTone } from "@/types/note";

const EMPTY_FORM: NoteFormValues = {
  title: "",
  description: ""
};

async function syncNotes(
  setLoading: Dispatch<SetStateAction<boolean>>,
  setFetchError: Dispatch<SetStateAction<string | null>>,
  setNotes: Dispatch<SetStateAction<Note[]>>
) {
  setLoading(true);
  setFetchError(null);

  try {
    const nextNotes = await getNotes();
    setNotes(nextNotes);
  } catch (error) {
    setFetchError(getErrorMessage(error));
  } finally {
    setLoading(false);
  }
}

export function NotesWorkspaceSection() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [createValues, setCreateValues] = useState<NoteFormValues>(EMPTY_FORM);
  const [editValues, setEditValues] = useState<NoteFormValues>(EMPTY_FORM);
  const [viewingNote, setViewingNote] = useState<Note | null>(null);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [deletingNote, setDeletingNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [savingEdit, setSavingEdit] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const trimmedQuery = searchQuery.trim().toLowerCase();
  const filteredNotes = trimmedQuery
    ? notes.filter((note) => {
        const combinedText = `${note.title} ${note.description}`.toLowerCase();
        return combinedText.includes(trimmedQuery);
      })
    : notes;

  useEffect(() => {
    void syncNotes(setLoading, setFetchError, setNotes);
  }, []);

  function updateCreateField(field: keyof NoteFormValues, value: string) {
    setCreateValues((current) => ({ ...current, [field]: value }));
  }

  function updateEditField(field: keyof NoteFormValues, value: string) {
    setEditValues((current) => ({ ...current, [field]: value }));
  }

  function dismissToast(toastId: string) {
    setToasts((current) => current.filter((toast) => toast.id !== toastId));
  }

  function showToast(tone: ToastTone, title: string, message: string) {
    const toastId =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random()}`;

    const nextToast: ToastMessage = {
      id: toastId,
      title,
      message,
      tone
    };

    setToasts((current) => [...current, nextToast]);

    window.setTimeout(() => {
      dismissToast(toastId);
    }, 4200);
  }

  function loadNotes() {
    return syncNotes(setLoading, setFetchError, setNotes);
  }

  function validate(values: NoteFormValues) {
    if (!values.title.trim() || !values.description.trim()) {
      showToast(
        "error",
        "Missing fields",
        "Please add both a title and a description before saving."
      );
      return false;
    }

    return true;
  }

  async function handleCreate() {
    if (!validate(createValues)) {
      return;
    }

    setCreating(true);

    try {
      const createdNote = await createNote({
        title: createValues.title.trim(),
        description: createValues.description.trim()
      });

      setNotes((current) => [createdNote, ...current]);
      setCreateValues(EMPTY_FORM);
      showToast("success", "Note created", "Your new note has been saved.");
    } catch (error) {
      showToast("error", "Could not create note", getErrorMessage(error));
    } finally {
      setCreating(false);
    }
  }

  function openEditModal(note: Note) {
    setViewingNote(null);
    setEditingNote(note);
    setEditValues({
      title: note.title,
      description: note.description
    });
  }

  function openDeleteModal(note: Note) {
    setViewingNote(null);
    setDeletingNote(note);
  }

  async function handleUpdate() {
    if (!editingNote || !validate(editValues)) {
      return;
    }

    setSavingEdit(true);

    try {
      const updatedNote = await updateNote(editingNote._id, {
        title: editValues.title.trim(),
        description: editValues.description.trim()
      });

      setNotes((current) =>
        current.map((note) => (note._id === updatedNote._id ? updatedNote : note))
      );
      setEditingNote(null);
      setEditValues(EMPTY_FORM);
      showToast("success", "Note updated", "Your changes are live.");
    } catch (error) {
      showToast("error", "Could not update note", getErrorMessage(error));
    } finally {
      setSavingEdit(false);
    }
  }

  async function handleDelete() {
    if (!deletingNote) {
      return;
    }

    setDeleting(true);

    try {
      await removeNote(deletingNote._id);
      setNotes((current) => current.filter((note) => note._id !== deletingNote._id));
      setDeletingNote(null);
      showToast("success", "Note deleted", "The note has been removed.");
    } catch (error) {
      showToast("error", "Could not delete note", getErrorMessage(error));
    } finally {
      setDeleting(false);
    }
  }

  return (
    <>
      <section className="workspace-section">
        <div className="workspace-sidebar">
          <NoteFormCard
            busy={creating}
            onChange={updateCreateField}
            onSubmit={handleCreate}
            values={createValues}
          />
        </div>

        <div className="workspace-main">
          <Card>
            <div className="workspace-header">
              <div>
                <h2 className="workspace-title">Your note collection</h2>
                <p className="workspace-subtitle">
                  Review, edit, and manage the notes already stored by the existing
                  backend API.
                </p>
              </div>

              <div className="workspace-actions">
                <div className="status-pill">
                  <span className="status-pill__dot" aria-hidden="true" />
                  {loading
                    ? "Loading notes..."
                    : trimmedQuery
                      ? `${filteredNotes.length} of ${notes.length} note${notes.length === 1 ? "" : "s"}`
                      : `${notes.length} note${notes.length === 1 ? "" : "s"}`}
                </div>
                <Button onClick={() => void loadNotes()} type="button" variant="ghost">
                  Refresh
                </Button>
              </div>
            </div>

            <div className="workspace-toolbar">
              <SearchInput
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search by title or note content"
                value={searchQuery}
              />
              {trimmedQuery ? (
                <Button onClick={() => setSearchQuery("")} type="button" variant="ghost">
                  Clear
                </Button>
              ) : null}
            </div>
          </Card>

          {fetchError && notes.length === 0 ? (
            <Card className="feedback-card feedback-card--error">
              <h3 className="empty-state__title">Could not load notes</h3>
              <p className="empty-state__copy">{fetchError}</p>
              <Button onClick={() => void loadNotes()} type="button" variant="secondary">
                Try again
              </Button>
            </Card>
          ) : null}

          {!loading && !fetchError && notes.length === 0 ? (
            <EmptyState
              actionLabel="Reload notes"
              copy="No notes are available yet. Create one from the composer card to get started."
              onAction={() => void loadNotes()}
              title="Nothing here yet"
            />
          ) : null}

          {loading && notes.length === 0 ? (
            <EmptyState
              copy="The frontend is reaching out to the existing notes API."
              title="Loading your workspace"
            />
          ) : null}

          {!loading && !fetchError && notes.length > 0 && filteredNotes.length === 0 ? (
            <EmptyState
              actionLabel="Clear search"
              copy={`No notes matched "${searchQuery.trim()}". Try a different keyword.`}
              onAction={() => setSearchQuery("")}
              title="No matching notes"
            />
          ) : null}

          {filteredNotes.length > 0 ? (
            <NotesGrid
              notes={filteredNotes}
              onDelete={openDeleteModal}
              onEdit={openEditModal}
              onView={setViewingNote}
            />
          ) : null}
        </div>
      </section>

      <ReadNoteModal
        note={viewingNote}
        onClose={() => setViewingNote(null)}
        onDelete={openDeleteModal}
        onEdit={openEditModal}
      />

      <EditNoteModal
        busy={savingEdit}
        note={editingNote}
        onChange={updateEditField}
        onClose={() => {
          setEditingNote(null);
          setEditValues(EMPTY_FORM);
        }}
        onSubmit={() => void handleUpdate()}
        values={editValues}
      />

      <DeleteNoteModal
        busy={deleting}
        note={deletingNote}
        onClose={() => setDeletingNote(null)}
        onConfirm={() => void handleDelete()}
      />

      <ToastStack onDismiss={dismissToast} toasts={toasts} />
    </>
  );
}
