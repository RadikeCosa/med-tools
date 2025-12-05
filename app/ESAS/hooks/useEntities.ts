"use client";

import { useCallback, useSyncExternalStore } from "react";
import { Patient, Professional } from "../entities.types";
import {
  loadPatients,
  loadProfessionals,
  addPatient,
  addProfessional,
  deletePatient,
  deleteProfessional,
} from "../entitiesStorage";

// Storage event handlers for external store
let patientsListeners: Array<() => void> = [];
let professionalsListeners: Array<() => void> = [];

// Cache for snapshots
let patientsCache: Patient[] | null = null;
let professionalsCache: Professional[] | null = null;

function subscribePatientsStore(callback: () => void) {
  patientsListeners.push(callback);
  return () => {
    patientsListeners = patientsListeners.filter((l) => l !== callback);
  };
}

function subscribeProfessionalsStore(callback: () => void) {
  professionalsListeners.push(callback);
  return () => {
    professionalsListeners = professionalsListeners.filter((l) => l !== callback);
  };
}

function emitPatientsChange() {
  patientsCache = null; // Invalidate cache
  patientsListeners.forEach((l) => l());
}

function emitProfessionalsChange() {
  professionalsCache = null; // Invalidate cache
  professionalsListeners.forEach((l) => l());
}

function getPatientsSnapshot(): Patient[] {
  if (typeof window === "undefined") return [];
  if (patientsCache === null) {
    patientsCache = loadPatients();
  }
  return patientsCache;
}

function getProfessionalsSnapshot(): Professional[] {
  if (typeof window === "undefined") return [];
  if (professionalsCache === null) {
    professionalsCache = loadProfessionals();
  }
  return professionalsCache;
}

const emptyPatients: Patient[] = [];
const emptyProfessionals: Professional[] = [];

function getServerPatientsSnapshot(): Patient[] {
  return emptyPatients;
}

function getServerProfessionalsSnapshot(): Professional[] {
  return emptyProfessionals;
}

export function useEntities() {
  const patients = useSyncExternalStore(
    subscribePatientsStore,
    getPatientsSnapshot,
    getServerPatientsSnapshot
  );

  const professionals = useSyncExternalStore(
    subscribeProfessionalsStore,
    getProfessionalsSnapshot,
    getServerProfessionalsSnapshot
  );

  const createPatient = useCallback((name: string): boolean => {
    const patient = addPatient(name);
    if (patient) {
      emitPatientsChange();
      return true;
    }
    return false;
  }, []);

  const removePatient = useCallback((id: string): boolean => {
    const success = deletePatient(id);
    if (success) {
      emitPatientsChange();
    }
    return success;
  }, []);

  const createProfessional = useCallback((name: string): boolean => {
    const professional = addProfessional(name);
    if (professional) {
      emitProfessionalsChange();
      return true;
    }
    return false;
  }, []);

  const removeProfessional = useCallback((id: string): boolean => {
    const success = deleteProfessional(id);
    if (success) {
      emitProfessionalsChange();
    }
    return success;
  }, []);

  const refreshEntities = useCallback(() => {
    emitPatientsChange();
    emitProfessionalsChange();
  }, []);

  return {
    patients,
    professionals,
    loading: false,
    createPatient,
    removePatient,
    createProfessional,
    removeProfessional,
    refreshEntities,
  };
}
