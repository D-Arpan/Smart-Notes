"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import type { AuthFormValues, AuthMode } from "@/types/auth";

interface AuthModalProps {
  open: boolean;
  mode: AuthMode;
  values: AuthFormValues;
  loading: boolean;
  onClose: () => void;
  onSubmit: () => void;
  onSwitchMode: (mode: AuthMode) => void;
  onChange: (field: keyof AuthFormValues, value: string) => void;
}

export function AuthModal({
  open,
  mode,
  values,
  loading,
  onClose,
  onSubmit,
  onSwitchMode,
  onChange
}: AuthModalProps) {
  const isLogin = mode === "login";
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Modal
      className="ui-modal--auth"
      description={
        isLogin
          ? "Sign in to continue to your notes workspace."
          : "Create your Smart Notes account to start saving notes."
      }
      onClose={onClose}
      open={open}
      title={isLogin ? "Welcome back" : "Create your account"}
    >
      <div className="auth-modal">
        <div className="auth-intro">
          <span className="auth-intro__eyebrow">{isLogin ? "Sign in" : "Register"}</span>
          <p className="auth-intro__copy">
            {isLogin
              ? "Access your personal notes, recent updates, and full reading workspace."
              : "Start with a simple account and keep your notes connected to you."}
          </p>
        </div>

        <div className="auth-switch">
          <button
            className={`auth-switch__button ${isLogin ? "is-active" : ""}`}
            onClick={() => onSwitchMode("login")}
            type="button"
          >
            Login
          </button>
          <button
            className={`auth-switch__button ${!isLogin ? "is-active" : ""}`}
            onClick={() => onSwitchMode("register")}
            type="button"
          >
            Register
          </button>
        </div>

        <div className="auth-fields">
          <Input
            autoComplete="email"
            id="auth-email"
            label="Email"
            onChange={(event) => onChange("email", event.target.value)}
            placeholder="you@example.com"
            value={values.email}
          />

          <label className="ui-field" htmlFor="auth-password">
            <span className="ui-field__label">Password</span>
            <div className="password-field">
              <input
                autoComplete={isLogin ? "current-password" : "new-password"}
                className="password-field__input"
                id="auth-password"
                onChange={(event) => onChange("password", event.target.value)}
                placeholder="Enter your password"
                type={showPassword ? "text" : "password"}
                value={values.password}
              />
              <button
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="password-field__toggle"
                onClick={() => setShowPassword((current) => !current)}
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
                  {showPassword ? (
                    <>
                      <path
                        d="M2 12C3.9 7.9 7.4 5.5 12 5.5C16.6 5.5 20.1 7.9 22 12C20.1 16.1 16.6 18.5 12 18.5C7.4 18.5 3.9 16.1 2 12Z"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.8"
                      />
                      <circle
                        cx="12"
                        cy="12"
                        r="3.1"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      />
                    </>
                  ) : (
                    <>
                      <path
                        d="M3 4L21 20"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeWidth="1.8"
                      />
                      <path
                        d="M10.7 6.1C11.1 5.9 11.5 5.8 12 5.8C16.3 5.8 19.6 8.1 21.5 12C20.8 13.4 19.9 14.6 18.9 15.5"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.8"
                      />
                      <path
                        d="M14.1 14.3C13.6 14.8 12.8 15.1 12 15.1C10.3 15.1 8.9 13.7 8.9 12C8.9 11.2 9.2 10.4 9.7 9.9"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.8"
                      />
                      <path
                        d="M6 8.3C4.6 9.2 3.5 10.5 2.5 12C4.4 15.9 7.7 18.2 12 18.2C13.6 18.2 15 17.9 16.3 17.2"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.8"
                      />
                    </>
                  )}
                </svg>
              </button>
            </div>
          </label>
        </div>

        <div className="auth-actions">
          <Button fullWidth loading={loading} onClick={onSubmit} type="button">
            {loading
              ? isLogin
                ? "Signing in"
                : "Creating account"
              : isLogin
                ? "Continue to notes"
                : "Create account"}
          </Button>
        </div>

        <p className="auth-footnote">
          {isLogin
            ? "Use your account to access notes created only by you."
            : "After registration, your notes stay scoped to your account."}
        </p>
      </div>
    </Modal>
  );
}
