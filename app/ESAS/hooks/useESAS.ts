"use client";
import { useReducer, useCallback } from "react";
import {
  ESASSymptoms,
  ESASSymptomNames,
  ESASAssessmentSchema,
} from "../esas.types";
import { saveAssessment } from "../esasStorage";

interface State {
  symptoms: ESASSymptoms;
  notes: string;
  saving: boolean;
  error: string | null;
  success: boolean;
}

type Action =
  | { type: "updateSymptom"; symptom: keyof ESASSymptoms; value: number }
  | { type: "setNotes"; value: string }
  | { type: "saveStart" }
  | { type: "saveSuccess" }
  | { type: "saveError"; error: string }
  | { type: "reset" };

const initialSymptoms: ESASSymptoms = Object.fromEntries(
  ESASSymptomNames.map((name) => [name, 0])
) as ESASSymptoms;

const initialState: State = {
  symptoms: initialSymptoms,
  notes: "",
  saving: false,
  error: null,
  success: false,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "updateSymptom":
      return {
        ...state,
        symptoms: { ...state.symptoms, [action.symptom]: action.value },
      };
    case "setNotes":
      return { ...state, notes: action.value };
    case "saveStart":
      return { ...state, saving: true, error: null, success: false };
    case "saveSuccess":
      return { ...state, saving: false, success: true };
    case "saveError":
      return { ...state, saving: false, error: action.error };
    case "reset":
      return initialState;
    default:
      return state;
  }
}

export function useESAS() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const updateSymptom = useCallback(
    (symptom: keyof ESASSymptoms, value: number) => {
      dispatch({ type: "updateSymptom", symptom, value });
    },
    []
  );

  const setNotes = useCallback((value: string) => {
    dispatch({ type: "setNotes", value });
  }, []);

  // Nuevo: save recibe patient y professional
  const save = useCallback(
    (patient?: string, professional?: string, dateTime?: string) => {
      dispatch({ type: "saveStart" });
      const assessment = {
        id: crypto.randomUUID(),
        timestamp: Date.now(),
        dateTime: dateTime || "",
        symptoms: state.symptoms,
        notes: state.notes,
        patient: patient || "",
        professional: professional || "",
      };
      const parseResult = ESASAssessmentSchema.safeParse(assessment);
      if (!parseResult.success) {
        dispatch({ type: "saveError", error: "Datos inválidos" });
        return;
      }
      const ok = saveAssessment(parseResult.data);
      if (ok) {
        dispatch({ type: "saveSuccess" });
      } else {
        dispatch({ type: "saveError", error: "Error al guardar" });
      }
    },
    [state.symptoms, state.notes]
  );

  const reset = useCallback(() => {
    dispatch({ type: "reset" });
  }, []);

  return {
    ...state,
    updateSymptom,
    setNotes,
    saveAssessment: save,
    reset,
  };
}
