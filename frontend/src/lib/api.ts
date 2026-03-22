import type { AuthFormValues, AuthSession, User } from "@/types/auth";
import type { Note, NoteFormValues } from "@/types/note";

interface ApiEnvelope<T> {
  success: boolean;
  data: T;
  message?: string;
  token?: string;
  accessToken?: string;
  user?: User;
}

type AuthResponseData =
  | User
  | {
      user?: User;
      token?: string;
      accessToken?: string;
    };

const rawApiBaseUrl =
  process.env.NEXT_PUBLIC_API_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL;

if (!rawApiBaseUrl) {
  throw new Error(
    "Missing NEXT_PUBLIC_API_URL or NEXT_PUBLIC_API_BASE_URL in the frontend environment."
  );
}

const API_BASE_URL = rawApiBaseUrl.replace(/\/$/, "");

const AUTH_ENDPOINT = `${API_BASE_URL}/auth`;
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

function buildHeaders(token?: string, headers?: HeadersInit) {
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(headers ?? {})
  };
}

async function apiRequest<T>(
  input: RequestInfo,
  init?: RequestInit,
  token?: string
): Promise<T> {
  const response = await fetch(input, {
    ...init,
    headers: buildHeaders(token, init?.headers),
    cache: "no-store"
  });

  const payload = await parseResponse<T>(response);
  return payload.data;
}

function normalizeAuthSession(payload: ApiEnvelope<AuthResponseData>): AuthSession {
  const rawData = payload.data;
  const nestedUser =
    rawData &&
    typeof rawData === "object" &&
    "user" in rawData &&
    rawData.user
      ? rawData.user
      : undefined;

  const user = payload.user ?? nestedUser ?? (rawData as User);

  const token =
    payload.token ??
    payload.accessToken ??
    (rawData &&
    typeof rawData === "object" &&
    "token" in rawData &&
    typeof rawData.token === "string"
      ? rawData.token
      : undefined) ??
    (rawData &&
    typeof rawData === "object" &&
    "accessToken" in rawData &&
    typeof rawData.accessToken === "string"
      ? rawData.accessToken
      : undefined);

  if (!token) {
    throw new Error("Auth succeeded, but the backend response does not include a token.");
  }

  if ((!user?._id && !user?.id) || !user.email) {
    throw new Error("Auth succeeded, but the backend response does not include a valid user.");
  }

  return {
    user: {
      ...user,
      _id: user._id ?? user.id
    },
    token
  };
}

async function authRequest(path: string, values: AuthFormValues): Promise<AuthSession> {
  const response = await fetch(`${AUTH_ENDPOINT}${path}`, {
    method: "POST",
    headers: buildHeaders(),
    body: JSON.stringify(values),
    cache: "no-store"
  });

  const payload = await parseResponse<AuthResponseData>(response);
  return normalizeAuthSession(payload);
}

export function registerUser(values: AuthFormValues) {
  return authRequest("/register", values);
}

export function loginUser(values: AuthFormValues) {
  return authRequest("/login", values);
}

export function getNotes(token: string) {
  return apiRequest<Note[]>(NOTES_ENDPOINT, undefined, token);
}

export function createNote(values: NoteFormValues, token: string) {
  return apiRequest<Note>(
    NOTES_ENDPOINT,
    {
      method: "POST",
      body: JSON.stringify(values)
    },
    token
  );
}

export function updateNote(noteId: string, values: NoteFormValues, token: string) {
  return apiRequest<Note>(
    `${NOTES_ENDPOINT}/${noteId}`,
    {
      method: "PATCH",
      body: JSON.stringify(values)
    },
    token
  );
}

export function removeNote(noteId: string, token: string) {
  return apiRequest<Note | { acknowledged?: boolean }>(
    `${NOTES_ENDPOINT}/${noteId}`,
    {
      method: "DELETE"
    },
    token
  );
}
