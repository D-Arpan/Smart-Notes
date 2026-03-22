"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

interface ModalProps {
  open: boolean;
  title: string;
  description?: string;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

export function Modal({
  open,
  title,
  description,
  onClose,
  children,
  className
}: ModalProps) {
  useEffect(() => {
    if (!open) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div
      aria-hidden={!open}
      className="ui-modal-backdrop"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
      role="presentation"
    >
      <section aria-modal="true" className={cn("ui-modal", className)} role="dialog">
        <header className="ui-modal__header">
          <div>
            <h2 className="ui-modal__title">{title}</h2>
            {description ? <p className="ui-modal__description">{description}</p> : null}
          </div>
          <button
            aria-label="Close modal"
            className="ui-modal__close"
            onClick={onClose}
            type="button"
          >
            x
          </button>
        </header>
        {children}
      </section>
    </div>
  );
}
