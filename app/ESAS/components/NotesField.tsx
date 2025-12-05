import React from "react";
import { WarningIcon } from "../../icons";

interface NotesFieldProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  id?: string;
  error?: string;
  maxLength?: number;
}

export default function NotesField({
  value,
  onChange,
  label,
  id = "notes",
  error,
  maxLength = 500,
}: NotesFieldProps) {
  const charCount = value.length;
  const isNearLimit = charCount > maxLength * 0.8;

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label
          htmlFor={id}
          className="font-medium text-sm"
          style={{ color: "var(--foreground-strong)" }}
        >
          {label}
        </label>
        <span
          className={`text-xs ${isNearLimit ? "text-orange-500" : "text-gray-400"}`}
        >
          {charCount}/{maxLength}
        </span>
      </div>
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        placeholder="Agregar observaciones adicionales..."
        className={`w-full px-3 py-2.5 text-sm rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none ${
          error
            ? "border-red-500 focus:border-red-500 focus:ring-red-500/50"
            : "border-gray-300 dark:border-gray-600 focus:border-blue-500"
        }`}
        style={{ background: "var(--background)", color: "var(--foreground)" }}
        aria-label={label}
      />
      {error && (
        <div
          className="flex items-center gap-2 text-red-600 text-sm mt-2"
          role="alert"
          aria-live="assertive"
        >
          <WarningIcon className="w-4 h-4" />
          {error}
        </div>
      )}
    </div>
  );
}
