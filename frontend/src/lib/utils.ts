export function cn(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

export function getErrorMessage(error: unknown) {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return "Something went wrong. Please try again.";
}

export function isAuthErrorMessage(message: string) {
  const normalized = message.toLowerCase();

  return (
    normalized.includes("unauthorized") ||
    normalized.includes("expired token") ||
    normalized.includes("invalid or expired token") ||
    normalized.includes("does not include a token")
  );
}
