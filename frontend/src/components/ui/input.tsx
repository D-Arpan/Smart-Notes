import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function Input({
  label,
  id,
  autoComplete = "off",
  autoCorrect = "off",
  spellCheck = false,
  ...props
}: InputProps) {
  return (
    <label className="ui-field" htmlFor={id}>
      <span className="ui-field__label">{label}</span>
      <input
        autoComplete={autoComplete}
        autoCorrect={autoCorrect}
        className="ui-input"
        id={id}
        spellCheck={spellCheck}
        {...props}
      />
    </label>
  );
}
