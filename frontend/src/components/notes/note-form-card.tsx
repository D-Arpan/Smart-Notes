import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { NoteFormValues } from "@/types/note";

interface NoteFormCardProps {
  values: NoteFormValues;
  onChange: (field: keyof NoteFormValues, value: string) => void;
  onSubmit: () => void;
  busy: boolean;
}

export function NoteFormCard({
  values,
  onChange,
  onSubmit,
  busy
}: NoteFormCardProps) {
  return (
    <Card className="composer-card">
      <div className="composer-card__header">
        <span className="workspace-eyebrow">Create</span>
        <h2 className="workspace-title">New note</h2>
        <p className="helper-text">
          Save ideas, reminders, or longer thoughts here. You can always edit the full
          content later.
        </p>
      </div>

      <Input
        id="note-title"
        label="Title"
        onChange={(event) => onChange("title", event.target.value)}
        placeholder="Daily plan, idea, reminder..."
        value={values.title}
      />

      <Textarea
        id="note-description"
        label="Description"
        onChange={(event) => onChange("description", event.target.value)}
        placeholder="Write the details you want to remember."
        value={values.description}
      />

      <Button fullWidth loading={busy} onClick={onSubmit} type="button">
        {busy ? "Saving note" : "Create note"}
      </Button>
    </Card>
  );
}
