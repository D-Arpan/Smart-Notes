import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface EmptyStateProps {
  title: string;
  copy: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  title,
  copy,
  actionLabel,
  onAction
}: EmptyStateProps) {
  return (
    <Card className="empty-state">
      <div>
        <h3 className="empty-state__title">{title}</h3>
        <p className="empty-state__copy">{copy}</p>
      </div>
      {actionLabel && onAction ? (
        <Button onClick={onAction} type="button" variant="secondary">
          {actionLabel}
        </Button>
      ) : null}
    </Card>
  );
}
