"use client";
import { useReducer, useCallback } from "react";
import {
  ESASSymptoms,
  ESASSymptomNames,
  ESASAssessmentSchema,
  CustomSymptom,
  MAX_CUSTOM_SYMPTOMS,
} from "../esas.types";
import { saveAssessment } from "../esasStorage";

interface State {
  symptoms: ESASSymptoms;
  customSymptoms: CustomSymptom[];
  notes: string;
  saving: boolean;
  error: string | null;
  success: boolean;
}

type Action =
  | { type: "updateSymptom"; symptom: keyof ESASSymptoms; value: number }
  | { type: "addCustomSymptom" }
  | { type: "updateCustomSymptom"; id: string; symptom: CustomSymptom }
  | { type: "removeCustomSymptom"; id: string }
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
  customSymptoms: [],
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
    case "addCustomSymptom":
      if (state.customSymptoms.length >= MAX_CUSTOM_SYMPTOMS) return state;
      return {
        ...state,
        customSymptoms: [
          ...state.customSymptoms,
          {
            id: crypto.randomUUID(),
            label: "",
            value: 0,
          },
        ],
      };
    case "updateCustomSymptom":
      return {
        ...state,
        customSymptoms: state.customSymptoms.map((s) =>
          s.id === action.id ? action.symptom : s
        ),
      };
    case "removeCustomSymptom":
      return {
        ...state,
        customSymptoms: state.customSymptoms.filter((s) => s.id !== action.id),
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

  const addCustomSymptom = useCallback(() => {
    dispatch({ type: "addCustomSymptom" });
  }, []);

  const updateCustomSymptom = useCallback(
    (id: string, symptom: CustomSymptom) => {
      dispatch({ type: "updateCustomSymptom", id, symptom });
    },
    []
  );

  const removeCustomSymptom = useCallback((id: string) => {
    dispatch({ type: "removeCustomSymptom", id });
  }, []);

  const setNotes = useCallback((value: string) => {
    dispatch({ type: "setNotes", value });
  }, []);

  // Nuevo: save recibe patient y professional
  const save = useCallback(
    (patient?: string, professional?: string, dateTime?: string) => {
      dispatch({ type: "saveStart" });
      
      // Filter out custom symptoms with empty labels
      const validCustomSymptoms = state.customSymptoms.filter(
        (s) => s.label.trim().length > 0
      );
      
      const assessment = {
        id: crypto.randomUUID(),
        timestamp: Date.now(),
        dateTime: dateTime || "",
        symptoms: state.symptoms,
        customSymptoms: validCustomSymptoms.length > 0 ? validCustomSymptoms : undefined,
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
    [state.symptoms, state.customSymptoms, state.notes]
  );

  const reset = useCallback(() => {
    dispatch({ type: "reset" });
  }, []);

  return {
    ...state,
    updateSymptom,
    addCustomSymptom,
    updateCustomSymptom,
    removeCustomSymptom,
    setNotes,
    saveAssessment: save,
    reset,
  };
}
