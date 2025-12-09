import { ESASAssessment, CustomSymptom } from "./esas.types";
import {
  ESAS_STORAGE_KEY,
  ESAS_DATA_VERSION,
  ESAS_TTL_MS,
} from "./esas.constants";

interface ESASStorageData {
  version: string;
  assessments: ESASAssessment[];
}

function getNow() {
  return Date.now();
}

export function saveAssessment(assessment: ESASAssessment): boolean {
  try {
    const raw = localStorage.getItem(ESAS_STORAGE_KEY);
    let data: ESASStorageData;
    if (raw) {
      data = JSON.parse(raw);
      if (data.version !== ESAS_DATA_VERSION) {
        // Version mismatch: reset data
        data = { version: ESAS_DATA_VERSION, assessments: [] };
      }
    } else {
      data = { version: ESAS_DATA_VERSION, assessments: [] };
    }
    data.assessments.push(assessment);
    // Clean old assessments
    data.assessments = data.assessments.filter(
      (a) => getNow() - a.timestamp < ESAS_TTL_MS
    );
    localStorage.setItem(ESAS_STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch {
    // Could log error to external service
    return false;
  }
}

export function loadAssessments(): ESASAssessment[] {
  try {
    const raw = localStorage.getItem(ESAS_STORAGE_KEY);
    if (!raw) return [];
    const data: ESASStorageData = JSON.parse(raw);
    if (data.version !== ESAS_DATA_VERSION) return [];
    return data.assessments.filter((a) => getNow() - a.timestamp < ESAS_TTL_MS);
  } catch {
    return [];
  }
}

export function clearAllAssessments() {
  try {
    localStorage.removeItem(ESAS_STORAGE_KEY);
    return true;
  } catch {
    return false;
  }
}

// Custom symptoms storage functions
function getCustomSymptomsKey(patientId: string): string {
  return `esas:custom_symptoms:${patientId}`;
}

export function loadCustomSymptoms(patientId: string): CustomSymptom[] {
  try {
    if (!patientId) return [];
    const key = getCustomSymptomsKey(patientId);
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    const symptoms = JSON.parse(raw);
    return Array.isArray(symptoms) ? symptoms : [];
  } catch (error) {
    console.error("Error loading custom symptoms:", error);
    return [];
  }
}

export function saveCustomSymptoms(
  patientId: string,
  symptoms: CustomSymptom[]
): boolean {
  try {
    if (!patientId) return false;
    const key = getCustomSymptomsKey(patientId);
    localStorage.setItem(key, JSON.stringify(symptoms));
    return true;
  } catch (error) {
    console.error("Error saving custom symptoms:", error);
    return false;
  }
}

export function removeCustomSymptom(
  patientId: string,
  symptomId: string
): boolean {
  try {
    if (!patientId) return false;
    const symptoms = loadCustomSymptoms(patientId);
    const filtered = symptoms.filter((s) => s.id !== symptomId);
    return saveCustomSymptoms(patientId, filtered);
  } catch (error) {
    console.error("Error removing custom symptom:", error);
    return false;
  }
}
