import type { InputHTMLAttributes } from "react";

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function SearchInput({
  id = "search-notes",
  label = "Search notes",
  ...props
}: SearchInputProps) {
  return (
    <label className="search-field" htmlFor={id}>
      <span className="search-field__label">{label}</span>
      <div className="search-field__shell">
        <span className="search-field__icon" aria-hidden="true">
          <svg
            fill="none"
            height="18"
            viewBox="0 0 24 24"
            width="18"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.8" />
            <path
              d="M16 16L20 20"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.8"
            />
          </svg>
        </span>
        <input className="search-field__input" id={id} type="search" {...props} />
      </div>
    </label>
  );
}
