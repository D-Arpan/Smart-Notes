"use client";

import type { Dispatch, SetStateAction } from "react";
import { useEffect, useState } from "react";
import { CreateNoteModal } from "@/components/notes/create-note-modal";
import { DeleteNoteModal } from "@/components/notes/delete-note-modal";
import { EditNoteModal } from "@/components/notes/edit-note-modal";
import { NotesGrid } from "@/components/notes/notes-grid";
import { ReadNoteModal } from "@/components/notes/read-note-modal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { SearchInput } from "@/components/ui/search-input";
import { ToastStack } from "@/components/ui/toast-stack";
import { createNote, getNotes, removeNote, updateNote } from "@/lib/api";
import { getErrorMessage, isAuthErrorMessage } from "@/lib/utils";
import type { Note, NoteFormValues, ToastMessage, ToastTone } from "@/types/note";

const EMPTY_FORM: NoteFormValues = {
  title: "",
  description: ""
};

interface NotesWorkspaceSectionProps {
  token: string;
  userEmail: string;
  onSessionInvalid: () => void;
}

function getNoteSortValue(note: Note) {
  if (note.updatedAt) {
    const updated = Date.parse(note.updatedAt);

    if (!Number.isNaN(updated)) {
      return updated;
    }
  }

  if (note.createdAt) {
    const created = Date.parse(note.createdAt);

    if (!Number.isNaN(created)) {
      return created;
    }
  }

  if (/^[a-fA-F0-9]{24}$/.test(note._id)) {
    return parseInt(note._id.slice(0, 8), 16) * 1000;
  }

  return 0;
}

async function syncNotes(
  setLoading: Dispatch<SetStateAction<boolean>>,
  setFetchError: Dispatch<SetStateAction<string | null>>,
  setNotes: Dispatch<SetStateAction<Note[]>>,
  token: string,
  onSessionInvalid: () => void
) {
  setLoading(true);
  setFetchError(null);

  try {
    const nextNotes = await getNotes(token);
    setNotes(nextNotes);
  } catch (error) {
    const message = getErrorMessage(error);
    setFetchError(message);

    if (isAuthErrorMessage(message)) {
      onSessionInvalid();
    }
  } finally {
    setLoading(false);
  }
}

export function NotesWorkspaceSection({
  token,
  userEmail,
  onSessionInvalid
}: NotesWorkspaceSectionProps) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [createValues, setCreateValues] = useState<NoteFormValues>(EMPTY_FORM);
  const [editValues, setEditValues] = useState<NoteFormValues>(EMPTY_FORM);
  const [viewingNote, setViewingNote] = useState<Note | null>(null);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [deletingNote, setDeletingNote] = useState<Note | null>(null);
  const [creatingOpen, setCreatingOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [savingEdit, setSavingEdit] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"latest" | "oldest">("latest");
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const sortedNotes = [...notes].sort((left, right) => {
    const difference = getNoteSortValue(right) - getNoteSortValue(left);
    return sortOrder === "latest" ? difference : -difference;
  });
  const trimmedQuery = searchQuery.trim().toLowerCase();
  const trimmedSearchValue = searchQuery.trim();
  const filteredNotes = trimmedQuery
    ? sortedNotes.filter((note) => {
        const combinedText = `${note.title} ${note.description}`.toLowerCase();
        return combinedText.includes(trimmedQuery);
      })
    : sortedNotes;

  useEffect(() => {
    void syncNotes(setLoading, setFetchError, setNotes, token, onSessionInvalid);
  }, [token, onSessionInvalid]);

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
    return syncNotes(setLoading, setFetchError, setNotes, token, onSessionInvalid);
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
      }, token);

      setNotes((current) => [createdNote, ...current]);
      setCreateValues(EMPTY_FORM);
      setCreatingOpen(false);
      showToast("success", "Note created", "Your new note has been saved.");
    } catch (error) {
      const message = getErrorMessage(error);
      showToast("error", "Could not create note", message);

      if (isAuthErrorMessage(message)) {
        onSessionInvalid();
      }
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
      }, token);

      setNotes((current) =>
        current.map((note) => (note._id === updatedNote._id ? updatedNote : note))
      );
      setEditingNote(null);
      setEditValues(EMPTY_FORM);
      showToast("success", "Note updated", "Your changes are live.");
    } catch (error) {
      const message = getErrorMessage(error);
      showToast("error", "Could not update note", message);

      if (isAuthErrorMessage(message)) {
        onSessionInvalid();
      }
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
      await removeNote(deletingNote._id, token);
      setNotes((current) => current.filter((note) => note._id !== deletingNote._id));
      setDeletingNote(null);
      showToast("success", "Note deleted", "The note has been removed.");
    } catch (error) {
      const message = getErrorMessage(error);
      showToast("error", "Could not delete note", message);

      if (isAuthErrorMessage(message)) {
        onSessionInvalid();
      }
    } finally {
      setDeleting(false);
    }
  }

  return (
    <>
      <section className="workspace-section">
        <div className="workspace-main">
          <Card className="workspace-shell">
            <div className="workspace-shell__header">
              <div className="workspace-shell__copy">
                <span className="workspace-eyebrow">Dashboard</span>
                <h2 className="workspace-title">Your Smart Notes dashboard</h2>
                <p className="workspace-subtitle">
                  A calm overview of your personal notes space. Your newest notes stay at
                  the top so recent work is always easier to reach.
                </p>
              </div>

              <div className="workspace-actions">
                <div className="status-pill">
                  <span className="status-pill__dot" aria-hidden="true" />
                  {loading
                    ? "Loading notes..."
                    : `${notes.length} note${notes.length === 1 ? "" : "s"} in your account`}
                </div>

                <div className="sort-toggle" aria-label="Sort notes" role="group">
                  <button
                    className={`sort-toggle__button ${sortOrder === "latest" ? "is-active" : ""}`}
                    onClick={() => setSortOrder("latest")}
                    type="button"
                  >
                    Latest first
                  </button>
                  <button
                    className={`sort-toggle__button ${sortOrder === "oldest" ? "is-active" : ""}`}
                    onClick={() => setSortOrder("oldest")}
                    type="button"
                  >
                    Oldest first
                  </button>
                </div>
              </div>
            </div>

            <div className="workspace-overview">
              <div className="workspace-stat">
                <span className="workspace-stat__label">Total notes</span>
                <strong className="workspace-stat__value">{notes.length}</strong>
                <p className="workspace-stat__meta">Everything saved to your account</p>
              </div>

              <div className="workspace-stat">
                <span className="workspace-stat__label">Showing now</span>
                <strong className="workspace-stat__value">{filteredNotes.length}</strong>
                <p className="workspace-stat__meta">
                  {trimmedQuery
                    ? "Results after filtering your notes"
                    : sortOrder === "latest"
                      ? "Latest notes first"
                      : "Oldest notes first"}
                </p>
              </div>

              <div className="workspace-stat workspace-stat--accent">
                <span className="workspace-stat__label">Workspace owner</span>
                <strong className="workspace-stat__value">Private</strong>
                <p className="workspace-stat__meta">{userEmail}</p>
              </div>
            </div>
          </Card>

          <Card className="workspace-controls">
            <div className="workspace-controls__copy">
              <span className="workspace-eyebrow">Notes tools</span>
              <h3 className="workspace-controls__title">Find or create a note</h3>
              <p className="workspace-controls__subtitle">
                Search through your saved notes or open the full-size editor for a new one.
              </p>
            </div>

            <div className="workspace-toolbar workspace-toolbar--controls">
              <SearchInput
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search by title or note content"
                value={searchQuery}
              />

              <div className="workspace-actions__buttons">
                <Button onClick={() => setCreatingOpen(true)} type="button">
                  Create new note
                </Button>
                {trimmedQuery ? (
                  <Button onClick={() => setSearchQuery("")} type="button" variant="ghost">
                    Clear search
                  </Button>
                ) : null}
                <Button onClick={() => void loadNotes()} type="button" variant="ghost">
                  Refresh notes
                </Button>
              </div>
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
              actionLabel="Create your first note"
              copy="You do not have any notes yet. Open the full-size editor and start writing."
              onAction={() => setCreatingOpen(true)}
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
            <div className="workspace-collection">
              <NotesGrid
                notes={filteredNotes}
                onDelete={openDeleteModal}
                onEdit={openEditModal}
                onView={setViewingNote}
              />
            </div>
          ) : null}
        </div>
      </section>

      <CreateNoteModal
        busy={creating}
        onChange={updateCreateField}
        onClose={() => setCreatingOpen(false)}
        onSubmit={() => void handleCreate()}
        open={creatingOpen}
        values={createValues}
      />

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
