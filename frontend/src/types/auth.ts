export interface User {
  _id?: string;
  id?: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthFormValues {
  email: string;
  password: string;
}

export interface AuthSession {
  user: User;
  token: string;
}

export type AuthMode = "login" | "register";
