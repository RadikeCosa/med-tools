"use client";

import React, { useState } from "react";
import { CloseIcon, ErrorIcon } from "@/app/icons";
import { CustomSymptom } from "../esas.types";

interface CreateCustomSymptomModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (symptom: CustomSymptom, saveForPatient: boolean) => void;
  patientId: string;
}

export default function CreateCustomSymptomModal({
  isOpen,
  onClose,
  onCreate,
  patientId,
}: CreateCustomSymptomModalProps) {
  const [label, setLabel] = useState("");
  const [legend, setLegend] = useState("");
  const [saveForPatient, setSaveForPatient] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!label.trim()) {
      setError("El nombre del síntoma es requerido");
      return;
    }

    if (label.trim().length < 2) {
      setError("El nombre debe tener al menos 2 caracteres");
      return;
    }

    const newSymptom: CustomSymptom = {
      id: crypto.randomUUID(),
      label: label.trim(),
      legend: legend.trim() || undefined,
      value: 0,
      custom: true,
    };

    onCreate(newSymptom, saveForPatient && !!patientId);
    handleClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && e.target instanceof HTMLInputElement) {
      e.preventDefault();
      handleSubmit();
    } else if (e.key === "Escape") {
      e.preventDefault();
      handleClose();
    }
  };

  const handleClose = () => {
    setLabel("");
    setLegend("");
    setSaveForPatient(true);
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
        className="relative z-10 w-full max-w-md mx-4 rounded-xl shadow-2xl border overflow-hidden"
        style={{
          background: "var(--background)",
          borderColor: "var(--border-color)",
        }}
      >
        {/* Header */}
        <div
          className="px-6 py-4 flex items-center justify-between"
          style={{ background: "var(--primary)" }}
        >
          <h2 id="modal-title" className="text-lg font-semibold text-white">
            Crear síntoma personalizado
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
              htmlFor="symptom-name"
              className="font-medium text-sm block mb-2 text-strong"
            >
              Nombre del síntoma
            </label>
            <input
              type="text"
              id="symptom-name"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="ej: Sequedad de boca, Mareos, etc."
              className="w-full px-3 py-2.5 rounded-lg border focus:outline-none focus:ring-2 text-sm transition-all"
              style={{
                background: "var(--background)",
                color: "var(--foreground)",
                borderColor: "var(--border-color)",
              }}
              autoFocus
              maxLength={50}
            />
          </div>

          <div>
            <label
              htmlFor="symptom-legend"
              className="font-medium text-sm block mb-2 text-strong"
            >
              Leyenda (opcional)
            </label>
            <input
              type="text"
              id="symptom-legend"
              value={legend}
              onChange={(e) => setLegend(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="ej: Sensación de boca seca"
              className="w-full px-3 py-2.5 rounded-lg border focus:outline-none focus:ring-2 text-sm transition-all"
              style={{
                background: "var(--background)",
                color: "var(--foreground)",
                borderColor: "var(--border-color)",
              }}
              maxLength={50}
            />
          </div>

          {patientId && (
            <div className="flex items-start gap-3 p-3 rounded-lg" style={{ background: "var(--background-secondary)" }}>
              <input
                type="checkbox"
                id="save-for-patient"
                checked={saveForPatient}
                onChange={(e) => setSaveForPatient(e.target.checked)}
                className="mt-1 w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
              />
              <label
                htmlFor="save-for-patient"
                className="text-sm cursor-pointer"
                style={{ color: "var(--foreground)" }}
              >
                <span className="font-medium">Guardar sólo para este paciente</span>
                <p className="text-xs mt-1" style={{ color: "var(--foreground-muted)" }}>
                  El síntoma aparecerá automáticamente en futuras evaluaciones de este paciente
                </p>
              </label>
            </div>
          )}

          {error && (
            <div
              className="flex items-center gap-2 rounded-lg px-3 py-2 border text-sm"
              style={{
                color: "var(--error)",
                background: "var(--error-light)",
                borderColor: "var(--error)",
              }}
              role="alert"
            >
              <ErrorIcon className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-2.5 rounded-lg border text-sm font-medium transition-colors hover:opacity-80"
              style={{
                color: "var(--foreground)",
                borderColor: "var(--border-color)",
              }}
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="flex-1 px-4 py-2.5 rounded-lg text-white text-sm font-medium transition-colors hover:opacity-90"
              style={{ background: "var(--primary)" }}
            >
              Crear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
