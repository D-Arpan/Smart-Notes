"use client";

import { useEffect, useState } from "react";
import { AuthModal } from "@/components/auth/auth-modal";
import { LogoutModal } from "@/components/auth/logout-modal";
import { NotesHeroSection } from "@/components/sections/notes-hero-section";
import { NotesWorkspaceSection } from "@/components/sections/notes-workspace-section";
import { Button } from "@/components/ui/button";
import { ToastStack } from "@/components/ui/toast-stack";
import { loginUser, registerUser } from "@/lib/api";
import { getErrorMessage, isAuthErrorMessage } from "@/lib/utils";
import type { AuthFormValues, AuthMode, AuthSession } from "@/types/auth";
import type { ToastMessage, ToastTone } from "@/types/note";

const SESSION_STORAGE_KEY = "smart-notes.session";

const EMPTY_AUTH_VALUES: AuthFormValues = {
  email: "",
  password: ""
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export function NotesAppShell() {
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [authValues, setAuthValues] = useState<AuthFormValues>(EMPTY_AUTH_VALUES);
  const [authOpen, setAuthOpen] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [session, setSession] = useState<AuthSession | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const userInitial = session?.user.email.slice(0, 1).toUpperCase() ?? "U";

  useEffect(() => {
    const rawSession = window.localStorage.getItem(SESSION_STORAGE_KEY);

    if (rawSession) {
      try {
        setSession(JSON.parse(rawSession) as AuthSession);
      } catch {
        window.localStorage.removeItem(SESSION_STORAGE_KEY);
      }
    }

    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!API_BASE_URL) {
      return;
    }

    void fetch(API_BASE_URL).catch(() => undefined);
  }, []);

  function dismissToast(toastId: string) {
    setToasts((current) => current.filter((toast) => toast.id !== toastId));
  }

  function showToast(tone: ToastTone, title: string, message: string) {
    const toastId =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random()}`;

    setToasts((current) => [...current, { id: toastId, title, message, tone }]);

    window.setTimeout(() => {
      dismissToast(toastId);
    }, 4200);
  }

  function openAuth(mode: AuthMode) {
    setAuthMode(mode);
    setAuthOpen(true);
  }

  function closeAuth() {
    setAuthOpen(false);
    setAuthValues(EMPTY_AUTH_VALUES);
    setAuthLoading(false);
  }

  function saveSession(nextSession: AuthSession) {
    setSession(nextSession);
    window.localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(nextSession));
  }

  function logout() {
    setSession(null);
    window.localStorage.removeItem(SESSION_STORAGE_KEY);
    setLogoutOpen(false);
    showToast("info", "Logged out", "You have been signed out of your account.");
  }

  function updateAuthField(field: keyof AuthFormValues, value: string) {
    setAuthValues((current) => ({ ...current, [field]: value }));
  }

  async function handleAuthSubmit() {
    if (!authValues.email.trim() || !authValues.password.trim()) {
      showToast("error", "Missing fields", "Email and password are both required.");
      return;
    }

    setAuthLoading(true);

    try {
      if (authMode === "register") {
        try {
          const registeredSession = await registerUser({
            email: authValues.email.trim(),
            password: authValues.password
          });

          saveSession(registeredSession);
          closeAuth();
          showToast("success", "Account created", "You are now signed in.");
          return;
        } catch (error) {
          const registerMessage = getErrorMessage(error);

          if (!isAuthErrorMessage(registerMessage)) {
            throw error;
          }
        }
      }

      const loggedInSession = await loginUser({
        email: authValues.email.trim(),
        password: authValues.password
      });

      saveSession(loggedInSession);
      closeAuth();
      showToast(
        "success",
        authMode === "login" ? "Welcome back" : "Account created",
        "Your private notes workspace is ready."
      );
    } catch (error) {
      const message = getErrorMessage(error);
      showToast(
        "error",
        authMode === "login" ? "Login failed" : "Registration failed",
        message
      );
    } finally {
      setAuthLoading(false);
    }
  }

  if (!hydrated) {
    return null;
  }

  return (
    <>
      {session ? (
        <div className="app-shell">
          <div className="session-topbar">
            <div className="session-topbar__identity">
              <span className="session-topbar__avatar" aria-hidden="true">
                {userInitial}
              </span>
              <div>
                <span className="session-topbar__label">Signed in to Smart Notes</span>
                <strong className="session-topbar__email">{session.user.email}</strong>
              </div>
            </div>

            <Button
              className="session-topbar__logout"
              onClick={() => setLogoutOpen(true)}
              type="button"
              variant="danger"
            >
              Logout
            </Button>
          </div>

          <NotesWorkspaceSection
            onSessionInvalid={logout}
            token={session.token}
            userEmail={session.user.email}
          />
        </div>
      ) : (
        <div className="landing-shell">
          <NotesHeroSection
            onLogin={() => openAuth("login")}
            onRegister={() => openAuth("register")}
          />

          <AuthModal
            loading={authLoading}
            mode={authMode}
            onChange={updateAuthField}
            onClose={closeAuth}
            onSubmit={() => void handleAuthSubmit()}
            onSwitchMode={setAuthMode}
            open={authOpen}
            values={authValues}
          />
        </div>
      )}

      <LogoutModal
        onClose={() => setLogoutOpen(false)}
        onConfirm={logout}
        open={logoutOpen}
      />

      <ToastStack onDismiss={dismissToast} toasts={toasts} />
    </>
  );
}
