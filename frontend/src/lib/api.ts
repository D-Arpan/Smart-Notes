import type { Note, NoteFormValues } from "@/types/note";

interface ApiEnvelope<T> {
  success: boolean;
  data: T;
  message?: string;
}

const rawApiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

if (!rawApiBaseUrl) {
  throw new Error("Missing NEXT_PUBLIC_API_URL in the frontend environment.");
}

const API_BASE_URL = rawApiBaseUrl.replace(/\/$/, "");

export const NOTES_ENDPOINT = `${API_BASE_URL}/notes`;

async function parseResponse<T>(response: Response): Promise<ApiEnvelope<T>> {
  const payload = (await response.json().catch(() => null)) as ApiEnvelope<T> | null;

  if (!response.ok || !payload?.success) {
    throw new Error(
      payload?.message ?? `Request failed with status ${response.status}.`
    );
  }

  return payload;
}

async function apiRequest<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
  const response = await fetch(input, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {})
    },
    cache: "no-store"
  });

  const payload = await parseResponse<T>(response);
  return payload.data;
}

export function getNotes() {
  return apiRequest<Note[]>(NOTES_ENDPOINT);
}

export function createNote(values: NoteFormValues) {
  return apiRequest<Note>(NOTES_ENDPOINT, {
    method: "POST",
    body: JSON.stringify(values)
  });
}

export function updateNote(noteId: string, values: NoteFormValues) {
  return apiRequest<Note>(`${NOTES_ENDPOINT}/${noteId}`, {
    method: "PATCH",
    body: JSON.stringify(values)
  });
}

export function removeNote(noteId: string) {
  return apiRequest<Note | { acknowledged?: boolean }>(`${NOTES_ENDPOINT}/${noteId}`, {
    method: "DELETE"
  });
}
