import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
  loading?: boolean;
}

export function Button({
  variant = "primary",
  className,
  fullWidth = false,
  loading = false,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "ui-button",
        `ui-button--${variant}`,
        fullWidth && "ui-button--full-width",
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <span className="loading-dot" aria-hidden="true" /> : null}
      <span>{children}</span>
    </button>
  );
}
