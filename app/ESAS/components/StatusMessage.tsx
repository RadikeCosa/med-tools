import React from "react";
import { ErrorCircleIcon, SuccessCheckIcon } from "../../icons";

interface StatusMessageProps {
  success?: boolean;
  error?: string | null;
  successText: string;
  errorText: string;
}

export default function StatusMessage({
  success,
  error,
  successText,
  errorText,
}: StatusMessageProps) {
  if (!success && !error) return null;

  return (
    <div className="space-y-2">
      {success && (
        <div
          role="status"
          aria-live="polite"
          className="flex items-center gap-2 text-green-700 bg-green-50 dark:bg-green-900/20 rounded-lg px-4 py-3 border border-green-200 dark:border-green-800"
        >
          <SuccessCheckIcon className="w-5 h-5 flex-shrink-0" />
          <span className="text-sm">{successText}</span>
        </div>
      )}
      {error && (
        <div
          role="alert"
          aria-live="assertive"
          className="flex items-center gap-2 text-red-600 bg-red-50 dark:bg-red-900/20 rounded-lg px-4 py-3 border border-red-200 dark:border-red-800"
        >
          <ErrorCircleIcon className="w-5 h-5 flex-shrink-0" />
          <span className="text-sm">{errorText}</span>
        </div>
      )}
    </div>
  );
}
