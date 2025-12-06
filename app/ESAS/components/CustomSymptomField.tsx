import React from "react";
import { CustomSymptom, MAX_CUSTOM_SYMPTOM_LABEL_LENGTH } from "../esas.types";
import { getSeverityColor } from "../utils";
import { TrashIcon } from "@/app/icons";

interface CustomSymptomFieldProps {
  symptom: CustomSymptom;
  onUpdate: (symptom: CustomSymptom) => void;
  onRemove: () => void;
}

export default function CustomSymptomField({
  symptom,
  onUpdate,
  onRemove,
}: CustomSymptomFieldProps) {
  const numbers = Array.from({ length: 11 }, (_, i) => i);
  const severityColors = getSeverityColor(symptom.value);

  return (
    <div className="border-b border-gray-200 dark:border-gray-700 last:border-b-0 bg-blue-50/30 dark:bg-blue-900/10">
      <div className="py-4 px-2 space-y-3">
        {/* Label input and remove button */}
        <div className="flex items-center gap-2 px-2">
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
            className="flex-1 px-3 py-2 text-sm rounded-lg border border-blue-300 dark:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 bg-white dark:bg-gray-800 text-foreground"
          />
          <button
            type="button"
            onClick={onRemove}
            className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
            title="Eliminar síntoma personalizado"
          >
            <TrashIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Slider */}
        <div className="grid grid-cols-[2fr_auto_2fr] gap-4 items-center px-2">
          {/* Left label */}
          <div className="text-left">
            <p className="text-sm text-gray-700 dark:text-gray-300">Ausente</p>
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
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Lo peor posible
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
