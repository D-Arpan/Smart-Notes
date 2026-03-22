import type { ToastMessage } from "@/types/note";

interface ToastStackProps {
  toasts: ToastMessage[];
  onDismiss: (toastId: string) => void;
}

export function ToastStack({ toasts, onDismiss }: ToastStackProps) {
  if (toasts.length === 0) {
    return null;
  }

  return (
    <aside aria-live="polite" className="toast-stack">
      {toasts.map((toast) => (
        <article className={`toast-card toast-card--${toast.tone}`} key={toast.id}>
          <div className="toast-card__top">
            <div>
              <h3 className="toast-card__title">{toast.title}</h3>
              <p className="toast-card__message">{toast.message}</p>
            </div>
            <button
              aria-label="Dismiss message"
              className="toast-card__dismiss"
              onClick={() => onDismiss(toast.id)}
              type="button"
            >
              x
            </button>
          </div>
        </article>
      ))}
    </aside>
  );
}
