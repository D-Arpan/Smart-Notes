export interface Note {
  _id: string;
  title: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface NoteFormValues {
  title: string;
  description: string;
}

export type ToastTone = "success" | "error" | "info";

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  tone: ToastTone;
}
