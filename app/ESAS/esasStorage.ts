import { ESASAssessment } from "./esas.types";
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
