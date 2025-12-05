"use client";

import React, { useState } from "react";
import { CloseIcon, ErrorIcon } from "@/app/icons";

interface CreateEntityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string) => boolean;
  entityType: "paciente" | "profesional";
}

export default function CreateEntityModal({
  isOpen,
  onClose,
  onSubmit,
  entityType,
}: CreateEntityModalProps) {
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const handleSubmit = () => {
    if (!name.trim()) {
      setError("El nombre es requerido");
      return;
    }

    if (name.trim().length < 2) {
      setError("El nombre debe tener al menos 2 caracteres");
      return;
    }

    setSaving(true);
    setError(null);

    const success = onSubmit(name.trim());

    if (success) {
      setName("");
      onClose();
    } else {
      setError(`Error al crear el ${entityType}`);
    }

    setSaving(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    } else if (e.key === "Escape") {
      e.preventDefault();
      handleClose();
    }
  };

  const handleClose = () => {
    setName("");
    setError(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onKeyDown={handleKeyDown}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div
        className="relative z-10 w-full max-w-md mx-4 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
        style={{ background: "var(--background)" }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 flex items-center justify-between">
          <h2 id="modal-title" className="text-lg font-semibold text-white">
            Crear nuevo {entityType}
          </h2>
          <button
            type="button"
            onClick={handleClose}
            className="text-white/80 hover:text-white transition-colors"
            aria-label="Cerrar"
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div>
            <label
              htmlFor="entity-name"
              className="font-medium text-sm block mb-2"
              style={{ color: "var(--foreground-strong)" }}
            >
              Nombre del {entityType}
            </label>
            <input
              type="text"
              id="entity-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`Ingrese el nombre del ${entityType}`}
              className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 text-sm transition-all"
              style={{
                background: "var(--background)",
                color: "var(--foreground)",
              }}
              autoFocus
            />
          </div>

          {error && (
            <div
              className="flex items-center gap-2 text-red-600 bg-red-50 dark:bg-red-900/20 rounded-lg px-3 py-2 border border-red-200 dark:border-red-800"
              role="alert"
            >
              <ErrorIcon className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 text-sm font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
              style={{ color: "var(--foreground)" }}
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={saving}
              className="flex-1 px-4 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium transition-colors hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? "Creando..." : "Crear"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
