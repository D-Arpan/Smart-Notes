import type { TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export function Textarea({
  label,
  id,
  autoComplete = "off",
  autoCorrect = "off",
  spellCheck = false,
  ...props
}: TextareaProps) {
  return (
    <label className="ui-field" htmlFor={id}>
      <span className="ui-field__label">{label}</span>
      <textarea
        autoComplete={autoComplete}
        autoCorrect={autoCorrect}
        className="ui-textarea"
        id={id}
        spellCheck={spellCheck}
        {...props}
      />
    </label>
  );
}
