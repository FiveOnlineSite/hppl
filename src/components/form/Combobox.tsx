"use client";

import { KeyboardEvent, useEffect, useId, useMemo, useRef, useState } from "react";

type ComboboxProps = {
  label: string;
  name: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  disabledPlaceholder?: string;
  defaultValue?: string;
  options?: string[];
  fetchOptions?: (query: string) => Promise<string[]>;
  onValueChange?: (value: string) => void;
};

export function Combobox({
  label,
  name,
  required,
  disabled,
  placeholder = "Type to search…",
  disabledPlaceholder,
  defaultValue = "",
  options,
  fetchOptions,
  onValueChange,
}: ComboboxProps) {
  const id = useId();
  const [value, setValue] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const [fetchedSuggestions, setFetchedSuggestions] = useState<string[]>([]);
  const [highlighted, setHighlighted] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const staticSuggestions = useMemo(() => {
    if (!options) return null;
    const q = value.trim().toLowerCase();
    return (q ? options.filter((o) => o.toLowerCase().includes(q)) : options).slice(0, 50);
  }, [options, value]);

  const suggestions = staticSuggestions ?? fetchedSuggestions;

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  useEffect(() => {
    if (options || !fetchOptions) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      fetchOptions(value.trim())
        .then(setFetchedSuggestions)
        .catch(() => setFetchedSuggestions([]));
    }, 200);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [value, options, fetchOptions]);

  function selectOption(opt: string) {
    setValue(opt);
    setOpen(false);
    setHighlighted(-1);
    onValueChange?.(opt);
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (!open && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
      setOpen(true);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlighted((h) => Math.min(h + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlighted((h) => Math.max(h - 1, 0));
    } else if (e.key === "Enter") {
      if (open && highlighted >= 0 && suggestions[highlighted]) {
        e.preventDefault();
        selectOption(suggestions[highlighted]);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <div ref={containerRef} className="relative">
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-slate-800">
        {label}
        {required && <span className="ml-0.5 text-red-600">*</span>}
      </label>
      <div className="relative">
        <input
          id={id}
          name={name}
          autoComplete="off"
          required={required}
          disabled={disabled}
          value={value}
          placeholder={disabled ? (disabledPlaceholder ?? placeholder) : placeholder}
          onChange={(e) => {
            setValue(e.target.value);
            setOpen(true);
            setHighlighted(-1);
            onValueChange?.(e.target.value);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 pr-9 text-sm text-slate-900 shadow-sm outline-none transition focus:border-red-600 focus:ring-4 focus:ring-red-100 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-400"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
        >
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {open && !disabled && suggestions.length > 0 && (
        <ul className="absolute z-20 mt-1 max-h-56 w-full overflow-auto rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
          {suggestions.map((opt, i) => (
            <li
              key={opt}
              onMouseDown={(e) => {
                e.preventDefault();
                selectOption(opt);
              }}
              className={`cursor-pointer px-3.5 py-2 text-sm transition ${
                i === highlighted ? "bg-red-50 text-red-800" : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
