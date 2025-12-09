import React, { useState } from "react";
import { CustomSymptom, MAX_CUSTOM_SYMPTOM_LABEL_LENGTH } from "../esas.types";
import { getSeverityColor } from "../utils";
import { TrashIcon, SuccessCheckIcon } from "@/app/icons";

interface CustomSymptomFieldProps {
  symptom: CustomSymptom;
  onUpdate: (symptom: CustomSymptom) => void;
  onRemove: () => void;
  onSave?: (symptom: CustomSymptom) => void;
  patientId?: string;
}

export default function CustomSymptomField({
  symptom,
  onUpdate,
  onRemove,
  onSave,
  patientId,
}: CustomSymptomFieldProps) {
  const numbers = Array.from({ length: 11 }, (_, i) => i);
  const severityColors = getSeverityColor(symptom.value);
  const [showSaved, setShowSaved] = useState(false);

  const handleSave = () => {
    if (onSave && patientId) {
      onSave(symptom);
      setShowSaved(true);
      setTimeout(() => setShowSaved(false), 2000);
    }
  };

  return (
    <div className="border-b last:border-b-0" style={{ 
      borderColor: "var(--border-color)",
      background: "var(--background-secondary)"
    }}>
      <div className="py-4 px-2 space-y-3">
        {/* Label and Legend inputs with action buttons */}
        <div className="space-y-2 px-2">
          <div className="flex items-center gap-2">
            <div className="flex-1 space-y-2">
              <input
                type="text"
                value={symptom.label}
                onChange={(e) =>
                  onUpdate({ 
                    ...symptom, 
                    label: e.target.value.slice(0, MAX_CUSTOM_SYMPTOM_LABEL_LENGTH) 
                  })
                }
                placeholder="Nombre del síntoma (ej: sequedad de boca)"
                maxLength={MAX_CUSTOM_SYMPTOM_LABEL_LENGTH}
                aria-label="Nombre del síntoma personalizado"
                className="w-full px-3 py-2 text-sm rounded-lg border focus:outline-none focus:ring-2 transition-all"
                style={{
                  background: "var(--background)",
                  color: "var(--foreground)",
                  borderColor: "var(--border-color)",
                }}
              />
              <input
                type="text"
                value={symptom.legend || ""}
                onChange={(e) =>
                  onUpdate({ 
                    ...symptom, 
                    legend: e.target.value.slice(0, MAX_CUSTOM_SYMPTOM_LABEL_LENGTH) 
                  })
                }
                placeholder="Leyenda (opcional, ej: sensación de boca seca)"
                maxLength={MAX_CUSTOM_SYMPTOM_LABEL_LENGTH}
                aria-label="Leyenda del síntoma personalizado"
                className="w-full px-3 py-2 text-sm rounded-lg border focus:outline-none focus:ring-2 transition-all"
                style={{
                  background: "var(--background)",
                  color: "var(--foreground)",
                  borderColor: "var(--border-color)",
                }}
              />
            </div>
            <div className="flex flex-col gap-2">
              {onSave && patientId && (
                <button
                  type="button"
                  onClick={handleSave}
                  className="p-2 rounded-lg transition-colors relative"
                  style={{
                    background: showSaved ? "var(--success-light)" : "var(--primary)",
                    color: showSaved ? "var(--success)" : "white",
                  }}
                  title="Guardar síntoma para este paciente"
                  aria-label="Guardar síntoma personalizado"
                >
                  <SuccessCheckIcon className="w-5 h-5" />
                </button>
              )}
              <button
                type="button"
                onClick={onRemove}
                className="p-2 rounded-lg transition-colors"
                style={{
                  color: "var(--error)",
                  background: "var(--error-light)",
                }}
                title="Eliminar síntoma personalizado"
                aria-label="Eliminar síntoma personalizado"
              >
                <TrashIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Slider */}
        <div className="grid grid-cols-[2fr_auto_2fr] gap-4 items-center px-2">
          {/* Left label */}
          <div className="text-left">
            <p className="text-sm" style={{ color: "var(--foreground)" }}>
              {symptom.legend || "Ausente"}
            </p>
          </div>

          {/* Center - Number buttons */}
          <fieldset className="flex gap-1 items-center">
            <legend className="sr-only">{symptom.label || "Síntoma personalizado"}</legend>
            {numbers.map((num) => {
              const isChecked = symptom.value === num;
              return (
                <label
                  key={num}
                  className="relative cursor-pointer"
                  title={`${symptom.label || "Síntoma"}: ${num}`}
                >
                  <input
                    type="radio"
                    name={`custom-${symptom.id}`}
                    value={num}
                    checked={isChecked}
                    onChange={() => onUpdate({ ...symptom, value: num })}
                    className="sr-only peer"
                    aria-label={`${symptom.label || "Síntoma"}: ${num}`}
                  />
                  <div
                    className={`
                      w-10 h-10 flex items-center justify-center rounded-md
                      text-sm font-medium
                      border-2
                      transition-all duration-200 ease-in-out
                      ${
                        isChecked
                          ? `${severityColors.bg} ${severityColors.bgDark} ${severityColors.text} ${severityColors.border} scale-110`
                          : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      }
                      peer-focus:ring-2 ${
                        isChecked
                          ? severityColors.ring
                          : "peer-focus:ring-blue-500/50"
                      } peer-focus:ring-offset-2
                    `}
                  >
                    {num}
                  </div>
                </label>
              );
            })}
          </fieldset>

          {/* Right label */}
          <div className="text-right">
            <p className="text-sm" style={{ color: "var(--foreground)" }}>
              Lo peor posible
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
