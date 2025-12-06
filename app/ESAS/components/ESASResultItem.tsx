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
    <li className="relative border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-4">
          <div>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Paciente
            </span>
            <p className="font-medium text-sm">{assessment.patient}</p>
          </div>
          <div className="h-8 w-px bg-gray-200 dark:bg-gray-700" />
          <div>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Fecha
            </span>
            <p className="font-medium text-sm">
              {formatDateTime(assessment.dateTime)}
            </p>
          </div>
        </div>
        <button
          aria-label="Borrar registro"
          onClick={() => onDelete(assessment.id)}
          className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
        >
          <TrashIcon className="w-5 h-5" />
        </button>
      </div>

      {/* Symptoms Grid */}
      <div className="p-4">
        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
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
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 mt-4">
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
          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
              Notas
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {assessment.notes}
            </p>
          </div>
        )}

        {/* Professional */}
        <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700 flex justify-end">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Evaluado por:{" "}
            <span className="font-medium">{assessment.professional}</span>
          </span>
        </div>
      </div>
    </li>
  );
}
