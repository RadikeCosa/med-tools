import React from "react";
import { SpinnerIcon } from "../../icons";

interface FormActionsProps {
  onReset?: () => void;
  saving: boolean;
  showReset?: boolean;
  saveLabel: string;
  resetLabel?: string;
  className?: string;
}

export default function FormActions({
  onReset,
  saving,
  showReset = false,
  saveLabel,
  resetLabel = "Nueva evaluación",
  className = "",
}: FormActionsProps) {
  return (
    <div className={`flex flex-col sm:flex-row gap-3 pt-4 ${className}`} style={{ borderTop: "1px solid var(--border-color)" }}>
      <button
        type="submit"
        disabled={saving}
        className="flex-1 h-12 text-base font-semibold text-white rounded-lg shadow-md transition-all hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2"
        style={{
          background: saving ? "var(--foreground-muted)" : "var(--primary)",
        }}
        aria-label={saveLabel}
      >
        {saving ? (
          <span className="flex items-center justify-center gap-2">
            <SpinnerIcon className="animate-spin h-5 w-5" />
            Guardando...
          </span>
        ) : (
          saveLabel
        )}
      </button>
      {showReset && (
        <button
          type="button"
          onClick={onReset}
          className="flex-1 sm:flex-none h-12 px-6 text-base font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2"
          style={{
            background: "var(--secondary)",
            color: "var(--foreground)",
          }}
          aria-label={resetLabel}
        >
          {resetLabel}
        </button>
      )}
    </div>
  );
}
