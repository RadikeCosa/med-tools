import React from "react";
import { ESASAssessment } from "../esas.types";
import { ESAS_SYMPTOM_LABELS } from "../esas.constants";
import { getSeverityBadgeColor } from "../utils";
import { TrashIcon } from "../../icons";

interface ESASResultItemProps {
  assessment: ESASAssessment;
  onDelete: (id: string) => void;
}

function formatDateTime(dateTime: string): string {
  try {
    const date = new Date(dateTime);
    return date.toLocaleString("es-ES", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return dateTime;
  }
}

export default function ESASResultItem({
  assessment,
  onDelete,
}: ESASResultItemProps) {
  return (
    <li 
      className="relative rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
      style={{
        background: "var(--background)",
        border: "1px solid var(--border-color)",
      }}
    >
      {/* Header */}
      <div 
        className="flex items-center justify-between px-4 py-3 border-b"
        style={{ 
          background: "var(--background-secondary)",
          borderColor: "var(--border-color)",
        }}
      >
        <div className="flex items-center gap-4">
          <div>
            <span 
              className="text-xs"
              style={{ color: "var(--foreground-muted)" }}
            >
              Paciente
            </span>
            <p 
              className="font-medium text-sm"
              style={{ color: "var(--foreground-strong)" }}
            >
              {assessment.patient}
            </p>
          </div>
          <div 
            className="h-8 w-px"
            style={{ background: "var(--border-color)" }}
          />
          <div>
            <span 
              className="text-xs"
              style={{ color: "var(--foreground-muted)" }}
            >
              Fecha
            </span>
            <p 
              className="font-medium text-sm"
              style={{ color: "var(--foreground-strong)" }}
            >
              {formatDateTime(assessment.dateTime)}
            </p>
          </div>
        </div>
        <button
          aria-label="Borrar registro"
          onClick={() => onDelete(assessment.id)}
          className="p-2 rounded-lg transition-colors"
          style={{
            color: "var(--foreground-muted)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "var(--error)";
            e.currentTarget.style.background = "var(--error-light)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "var(--foreground-muted)";
            e.currentTarget.style.background = "transparent";
          }}
        >
          <TrashIcon className="w-5 h-5" />
        </button>
      </div>

      {/* Symptoms Grid */}
      <div className="p-4">
        <p 
          className="text-xs font-medium uppercase tracking-wider mb-3"
          style={{ color: "var(--foreground-muted)" }}
        >
          Síntomas
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
          {Object.entries(assessment.symptoms).map(([key, value]) => (
            <div
              key={key}
              className={`px-3 py-2 rounded-lg text-center ${getSeverityBadgeColor(
                value
              )}`}
            >
              <span className="text-xs font-medium block truncate">
                {ESAS_SYMPTOM_LABELS[key] || key}
              </span>
              <span className="text-lg font-bold">{value}</span>
            </div>
          ))}
        </div>

        {/* Custom Symptoms */}
        {assessment.customSymptoms && assessment.customSymptoms.length > 0 && (
          <>
            <p 
              className="text-xs font-medium uppercase tracking-wider mb-3 mt-4"
              style={{ color: "var(--foreground-muted)" }}
            >
              Síntomas Personalizados
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
              {assessment.customSymptoms.map((symptom) => (
                <div
                  key={symptom.id}
                  className={`px-3 py-2 rounded-lg text-center ${getSeverityBadgeColor(
                    symptom.value
                  )}`}
                >
                  <span className="text-xs font-medium block truncate">
                    {symptom.label}
                  </span>
                  <span className="text-lg font-bold">{symptom.value}</span>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Notes */}
        {assessment.notes && (
          <div 
            className="mt-4 pt-4 border-t"
            style={{ borderColor: "var(--border-color)" }}
          >
            <p 
              className="text-xs font-medium uppercase tracking-wider mb-1"
              style={{ color: "var(--foreground-muted)" }}
            >
              Notas
            </p>
            <p 
              className="text-sm"
              style={{ color: "var(--foreground)" }}
            >
              {assessment.notes}
            </p>
          </div>
        )}

        {/* Professional */}
        <div 
          className="mt-4 pt-3 border-t flex justify-end"
          style={{ borderColor: "var(--border-color)" }}
        >
          <span 
            className="text-xs"
            style={{ color: "var(--foreground-muted)" }}
          >
            Evaluado por:{" "}
            <span 
              className="font-medium"
              style={{ color: "var(--foreground-strong)" }}
            >
              {assessment.professional}
            </span>
          </span>
        </div>
      </div>
    </li>
  );
}
