import React from "react";
import { getSeverityColor } from "../utils";

interface SymptomSliderProps {
  label: string;
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  id: string;
  minLabel: string;
  maxLabel: string;
}

export default function SymptomSlider({
  label,
  value,
  min = 0,
  max = 10,
  onChange,
  id,
  minLabel,
  maxLabel,
}: SymptomSliderProps) {
  const numbers = Array.from({ length: max - min + 1 }, (_, i) => i + min);
  const severityColors = getSeverityColor(value);

  return (
    <div className="border-b border-gray-200 dark:border-gray-700 last:border-b-0">
      <div className="grid grid-cols-[2fr_auto_2fr] gap-4 items-center py-4 px-2 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
        {/* Left label - Minimum state */}
        <div className="text-left">
          <p className="text-sm text-gray-700 dark:text-gray-300">{minLabel}</p>
        </div>

        {/* Center - Number buttons */}
        <fieldset className="flex gap-1 items-center">
          <legend className="sr-only">{label}</legend>
          {numbers.map((num) => {
            const isChecked = value === num;
            return (
              <label
                key={num}
                className="relative cursor-pointer"
                title={`${label}: ${num}`}
              >
                <input
                  type="radio"
                  name={id}
                  value={num}
                  checked={isChecked}
                  onChange={() => onChange(num)}
                  className="sr-only peer"
                  aria-label={`${label}: ${num}`}
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

        {/* Right label - Maximum state */}
        <div className="text-right">
          <p className="text-sm text-gray-700 dark:text-gray-300">{maxLabel}</p>
        </div>
      </div>
    </div>
  );
}
