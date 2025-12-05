import {
  Patient,
  Professional,
  PatientSchema,
  ProfessionalSchema,
  PATIENTS_STORAGE_KEY,
  PROFESSIONALS_STORAGE_KEY,
  ENTITIES_DATA_VERSION,
} from "./entities.types";

interface EntityStorageData<T> {
  version: string;
  items: T[];
}

// Default patients and professionals
const DEFAULT_PATIENTS: Patient[] = [
  { id: "default-patient-1", name: "Juan Perez", createdAt: 0 },
  { id: "default-patient-2", name: "Ana Gonzalez", createdAt: 0 },
];

const DEFAULT_PROFESSIONALS: Professional[] = [
  { id: "default-professional-1", name: "Dr. Cito", createdAt: 0 },
];

// Patients functions
export function loadPatients(): Patient[] {
  try {
    if (typeof window === "undefined") return DEFAULT_PATIENTS;
    const raw = localStorage.getItem(PATIENTS_STORAGE_KEY);
    if (!raw) {
      // Initialize with default patients
      savePatients(DEFAULT_PATIENTS);
      return DEFAULT_PATIENTS;
    }
    const data: EntityStorageData<Patient> = JSON.parse(raw);
    if (data.version !== ENTITIES_DATA_VERSION) {
      savePatients(DEFAULT_PATIENTS);
      return DEFAULT_PATIENTS;
    }
    return data.items;
  } catch {
    return DEFAULT_PATIENTS;
  }
}

export function savePatients(patients: Patient[]): boolean {
  try {
    const data: EntityStorageData<Patient> = {
      version: ENTITIES_DATA_VERSION,
      items: patients,
    };
    localStorage.setItem(PATIENTS_STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch {
    return false;
  }
}

export function addPatient(name: string): Patient | null {
  try {
    const patient: Patient = {
      id: crypto.randomUUID(),
      name: name.trim(),
      createdAt: Date.now(),
    };
    const parseResult = PatientSchema.safeParse(patient);
    if (!parseResult.success) return null;

    const patients = loadPatients();
    patients.push(parseResult.data);
    const saved = savePatients(patients);
    return saved ? parseResult.data : null;
  } catch {
    return null;
  }
}

export function deletePatient(id: string): boolean {
  try {
    const patients = loadPatients();
    const filtered = patients.filter((p) => p.id !== id);
    return savePatients(filtered);
  } catch {
    return false;
  }
}

// Professionals functions
export function loadProfessionals(): Professional[] {
  try {
    if (typeof window === "undefined") return DEFAULT_PROFESSIONALS;
    const raw = localStorage.getItem(PROFESSIONALS_STORAGE_KEY);
    if (!raw) {
      // Initialize with default professionals
      saveProfessionals(DEFAULT_PROFESSIONALS);
      return DEFAULT_PROFESSIONALS;
    }
    const data: EntityStorageData<Professional> = JSON.parse(raw);
    if (data.version !== ENTITIES_DATA_VERSION) {
      saveProfessionals(DEFAULT_PROFESSIONALS);
      return DEFAULT_PROFESSIONALS;
    }
    return data.items;
  } catch {
    return DEFAULT_PROFESSIONALS;
  }
}

export function saveProfessionals(professionals: Professional[]): boolean {
  try {
    const data: EntityStorageData<Professional> = {
      version: ENTITIES_DATA_VERSION,
      items: professionals,
    };
    localStorage.setItem(PROFESSIONALS_STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch {
    return false;
  }
}

export function addProfessional(name: string): Professional | null {
  try {
    const professional: Professional = {
      id: crypto.randomUUID(),
      name: name.trim(),
      createdAt: Date.now(),
    };
    const parseResult = ProfessionalSchema.safeParse(professional);
    if (!parseResult.success) return null;

    const professionals = loadProfessionals();
    professionals.push(parseResult.data);
    const saved = saveProfessionals(professionals);
    return saved ? parseResult.data : null;
  } catch {
    return null;
  }
}

export function deleteProfessional(id: string): boolean {
  try {
    const professionals = loadProfessionals();
    const filtered = professionals.filter((p) => p.id !== id);
    return saveProfessionals(filtered);
  } catch {
    return false;
  }
}
