"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ESASSymptomNames, MAX_CUSTOM_SYMPTOMS, CustomSymptom } from "../esas.types";
import {
  ESAS_SYMPTOM_LABELS,
  ESAS_FORM_TEXT,
  ESAS_FORM_INSTRUCTION,
  ESAS_SYMPTOM_MIN_LABELS,
  ESAS_SYMPTOM_MAX_LABELS,
} from "../esas.constants";
import { useESAS } from "../hooks/useESAS";
import { useEntities } from "../hooks/useEntities";
import { loadCustomSymptoms, saveCustomSymptoms, removeCustomSymptom as removeCustomSymptomFromStorage } from "../esasStorage";
import { PlusIcon, ErrorIcon, SuccessIcon, DocumentIcon } from "@/app/icons";
import SymptomSlider from "./SymptomSlider";
import CustomSymptomField from "./CustomSymptomField";
import NotesField from "./NotesField";
import FormActions from "./FormActions";
import StatusMessage from "./StatusMessage";
import CreateEntityModal from "./CreateEntityModal";
import CreateCustomSymptomModal from "./CreateCustomSymptomModal";
import { ErrorCircleIcon, SuccessCheckIcon } from "../../icons";

export default function ESASForm() {
  const router = useRouter();
  const [formError, setFormError] = React.useState<string | null>(null);
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [showPatientModal, setShowPatientModal] = React.useState(false);
  const [showProfessionalModal, setShowProfessionalModal] =
    React.useState(false);
  const [showCustomSymptomModal, setShowCustomSymptomModal] = React.useState(false);

  const [dateTime, setDateTime] = React.useState(() => {
    const now = new Date();
    return now.toISOString().slice(0, 16);
  });

  const {
    patients,
    professionals,
    loading: entitiesLoading,
    createPatient,
    createProfessional,
  } = useEntities();

  const [patient, setPatient] = React.useState("");
  const [professional, setProfessional] = React.useState("");

  const {
    symptoms,
    customSymptoms,
    notes,
    saving,
    error,
    success,
    updateSymptom,
    addCustomSymptom,
    updateCustomSymptom,
    removeCustomSymptom,
    loadCustomSymptomsFromStorage,
    setNotes,
    saveAssessment,
    reset,
  } = useESAS();

  // Load custom symptoms for selected patient
  React.useEffect(() => {
    if (patient && patients.length > 0) {
      const patientObj = patients.find((p) => p.name === patient);
      if (patientObj) {
        try {
          const savedSymptoms = loadCustomSymptoms(patientObj.id);
          loadCustomSymptomsFromStorage(savedSymptoms);
        } catch (error) {
          console.error("Error loading custom symptoms:", error);
        }
      }
    } else if (!patient) {
      // Clear custom symptoms when no patient is selected
      loadCustomSymptomsFromStorage([]);
    }
  }, [patient, patients, loadCustomSymptomsFromStorage]);

  // Update selected patient/professional when entities are loaded
  React.useEffect(() => {
    if (!entitiesLoading && patients.length > 0 && !patient) {
      setPatient(patients[0].name);
    }
  }, [entitiesLoading, patients, patient]);

  React.useEffect(() => {
    if (!entitiesLoading && professionals.length > 0 && !professional) {
      setProfessional(professionals[0].name);
    }
  }, [entitiesLoading, professionals, professional]);

  // Handlers for custom symptoms
  const handleCustomSave = (symptom: CustomSymptom) => {
    if (patient && patients.length > 0) {
      const patientObj = patients.find((p) => p.name === patient);
      if (patientObj) {
        const existingSymptoms = loadCustomSymptoms(patientObj.id);
        const updated = existingSymptoms.filter((s) => s.id !== symptom.id);
        updated.push(symptom);
        saveCustomSymptoms(patientObj.id, updated);
      }
    }
  };

  const handleRemoveCustom = (id: string) => {
    if (patient && patients.length > 0) {
      const patientObj = patients.find((p) => p.name === patient);
      if (patientObj) {
        removeCustomSymptomFromStorage(patientObj.id, id);
      }
    }
    removeCustomSymptom(id);
  };

  const handleCreateCustomSymptom = (symptom: CustomSymptom, saveForPatient: boolean) => {
    // Add to current form state
    const updatedSymptoms = [...customSymptoms, symptom];
    loadCustomSymptomsFromStorage(updatedSymptoms);
    
    // Save to localStorage if requested
    if (saveForPatient && patient && patients.length > 0) {
      const patientObj = patients.find((p) => p.name === patient);
      if (patientObj) {
        const existingSymptoms = loadCustomSymptoms(patientObj.id);
        existingSymptoms.push(symptom);
        saveCustomSymptoms(patientObj.id, existingSymptoms);
      }
    }
  };

  React.useEffect(() => {
    if (formError) {
      const timer = setTimeout(() => setFormError(null), 3500);
      return () => clearTimeout(timer);
    }
  }, [formError]);

  React.useEffect(() => {
    if (success && !formError) {
      setShowSuccess(true);
      const timer = setTimeout(() => {
        setShowSuccess(false);
        router.push("/ESAS/results");
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [success, formError, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!patient) {
      setFormError("Debe seleccionar un paciente.");
      return;
    }
    if (!professional) {
      setFormError("Debe seleccionar un profesional.");
      return;
    }
    if (!dateTime) {
      setFormError("Debe ingresar la fecha y hora de la evaluación.");
      return;
    }

    const selectedDate = new Date(dateTime);
    const now = new Date();
    if (selectedDate > now) {
      setFormError("La fecha y hora no pueden ser futuras.");
      return;
    }

    setFormError(null);
    saveAssessment(patient, professional, dateTime);
  };

  return (
    <form
      aria-label={ESAS_FORM_TEXT.title}
      onSubmit={handleSubmit}
      className="max-w-6xl mx-auto rounded-xl shadow-md border overflow-hidden"
      style={{
        background: "var(--background)",
        borderColor: "var(--border-color)",
        boxShadow: "var(--shadow-md)",
      }}
    >
      {/* Header */}
      <div className="px-6 py-5 flex items-center justify-between" style={{ background: "var(--primary)" }}>
        <div>
          <h1 className="text-xl font-bold text-white">{ESAS_FORM_TEXT.title}</h1>
          <p className="text-white/90 text-sm mt-1">
            Escala de Evaluación de Síntomas de Edmonton
          </p>
        </div>
        <Link
          href="/ESAS/results"
          className="btn btn-secondary flex items-center gap-2 text-sm"
          aria-label="Ver resultados guardados"
        >
          <DocumentIcon className="w-4 h-4" />
          Resultados guardados
        </Link>
      </div>

      <div className="p-6 space-y-6">
        {/* Info del paciente y fecha */}
        <section className="rounded-xl p-4 space-y-4" style={{ background: "var(--background-secondary)" }}>
          <h2 className="text-sm font-semibold uppercase tracking-wider" style={{ color: "var(--foreground-muted)" }}>
            Información General
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="datetime"
                className="font-medium text-sm block mb-2"
                style={{ color: "var(--foreground-strong)" }}
              >
                Fecha y hora
              </label>
              <input
                type="datetime-local"
                id="datetime"
                value={dateTime}
                onChange={(e) => setDateTime(e.target.value)}
                required
                max={new Date().toISOString().slice(0, 16)}
                className="w-full px-3 py-2.5 rounded-lg border focus:outline-none focus:ring-2 text-sm transition-all"
                style={{
                  background: "var(--background)",
                  color: "var(--foreground)",
                  borderColor: "var(--border-color)",
                }}
              />
            </div>

            <div>
              <label
                htmlFor="patient"
                className="font-medium text-sm block mb-2"
                style={{ color: "var(--foreground-strong)" }}
              >
                Paciente
              </label>
              <div className="flex gap-2">
                <select
                  id="patient"
                  value={patient}
                  onChange={(e) => setPatient(e.target.value)}
                  required
                  disabled={entitiesLoading || patients.length === 0}
                  className="flex-1 px-3 py-2.5 rounded-lg border focus:outline-none focus:ring-2 text-sm transition-all disabled:opacity-50"
                  style={{
                    background: "var(--background)",
                    color: "var(--foreground)",
                    borderColor: "var(--border-color)",
                  }}
                >
                  {patients.length === 0 ? (
                    <option value="">Sin pacientes</option>
                  ) : (
                    patients.map((p) => (
                      <option key={p.id} value={p.name}>
                        {p.name}
                      </option>
                    ))
                  )}
                </select>
                <button
                  type="button"
                  onClick={() => setShowPatientModal(true)}
                  className="px-3 py-2.5 rounded-lg text-white text-sm font-medium transition-colors flex items-center gap-1"
                  style={{ background: "var(--primary)" }}
                  title="Crear nuevo paciente"
                  aria-label="Crear nuevo paciente"
                >
                  <PlusIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Síntomas */}
        <section>
          <h2 className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: "var(--foreground-muted)" }}>
            Evaluación de Síntomas
          </h2>

          {/* Instruction header */}
          <div className="mb-4 p-3 rounded-lg border" style={{
            background: "var(--info-light)",
            borderColor: "var(--info)",
          }}>
            <p className="text-sm font-medium italic" style={{ color: "var(--info)" }}>
              {ESAS_FORM_INSTRUCTION}
            </p>
          </div>

          {/* Symptoms table */}
          <div className="border rounded-lg overflow-hidden" style={{
            borderColor: "var(--border-color)",
            background: "var(--background)",
          }}>
            {ESASSymptomNames.map((symptom) => (
              <SymptomSlider
                key={symptom}
                id={symptom}
                label={ESAS_SYMPTOM_LABELS[symptom]}
                value={symptoms[symptom]}
                onChange={(value) => updateSymptom(symptom, value)}
                minLabel={ESAS_SYMPTOM_MIN_LABELS[symptom]}
                maxLabel={ESAS_SYMPTOM_MAX_LABELS[symptom]}
              />
            ))}
            
            {/* Custom symptoms */}
            {customSymptoms.map((symptom) => (
              <CustomSymptomField
                key={symptom.id}
                symptom={symptom}
                onUpdate={(updated) => updateCustomSymptom(symptom.id, updated)}
                onRemove={() => handleRemoveCustom(symptom.id)}
                onSave={handleCustomSave}
                patientId={patient && patients.find((p) => p.name === patient)?.id}
              />
            ))}
          </div>

          {/* Add custom symptom button */}
          {customSymptoms.length < MAX_CUSTOM_SYMPTOMS && (
            <button
              type="button"
              onClick={() => setShowCustomSymptomModal(true)}
              className="mt-3 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors border"
              style={{
                color: "var(--primary)",
                background: "var(--info-light)",
                borderColor: "var(--primary)",
              }}
              aria-label="Agregar síntoma personalizado"
            >
              <PlusIcon className="w-4 h-4" />
              Agregar síntoma personalizado ({customSymptoms.length}/{MAX_CUSTOM_SYMPTOMS})
            </button>
          )}
        </section>

        {/* Notas y profesional */}
        <section className="space-y-4">
          <NotesField
            value={notes}
            onChange={(val) => {
              if (val.length <= 500) setNotes(val);
            }}
            label={ESAS_FORM_TEXT.notes}
          />

          <div>
            <label
              htmlFor="professional"
              className="font-medium text-sm block mb-2"
              style={{ color: "var(--foreground-strong)" }}
            >
              Profesional responsable
            </label>
            <div className="flex gap-2">
              <select
                id="professional"
                value={professional}
                onChange={(e) => setProfessional(e.target.value)}
                disabled={entitiesLoading || professionals.length === 0}
                className="flex-1 px-3 py-2.5 rounded-lg border focus:outline-none focus:ring-2 text-sm transition-all disabled:opacity-50"
                style={{
                  background: "var(--background)",
                  color: "var(--foreground)",
                  borderColor: "var(--border-color)",
                }}
              >
                {professionals.length === 0 ? (
                  <option value="">Sin profesionales</option>
                ) : (
                  professionals.map((p) => (
                    <option key={p.id} value={p.name}>
                      {p.name}
                    </option>
                  ))
                )}
              </select>
              <button
                type="button"
                onClick={() => setShowProfessionalModal(true)}
                className="px-3 py-2.5 rounded-lg text-white text-sm font-medium transition-colors flex items-center gap-1"
                style={{ background: "var(--primary)" }}
                title="Crear nuevo profesional"
                aria-label="Crear nuevo profesional"
              >
                <PlusIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* Mensajes de estado */}
        {formError && (
          <div
            className="flex items-center gap-2 rounded-lg px-4 py-3 border"
            style={{
              color: "var(--error)",
              background: "var(--error-light)",
              borderColor: "var(--error)",
            }}
            role="alert"
            aria-live="assertive"
          >
            <ErrorIcon className="w-5 h-5 flex-shrink-0" />
            <ErrorCircleIcon className="w-5 h-5 shrink-0" />
            <span className="text-sm">{formError}</span>
          </div>
        )}

        {showSuccess && !formError && (
          <div
            className="flex items-center gap-2 rounded-lg px-4 py-3 border"
            style={{
              color: "var(--success)",
              background: "var(--success-light)",
              borderColor: "var(--success)",
            }}
            role="status"
            aria-live="polite"
          >
            <SuccessIcon className="w-5 h-5 flex-shrink-0" />
            <SuccessCheckIcon className="w-5 h-5 shrink-0" />
            <span className="text-sm">¡Evaluación guardada exitosamente!</span>
          </div>
        )}

        <StatusMessage
          success={false}
          error={error}
          successText={ESAS_FORM_TEXT.success}
          errorText={ESAS_FORM_TEXT.error}
        />

        <FormActions
          onReset={reset}
          saving={saving}
          showReset={success}
          saveLabel={ESAS_FORM_TEXT.save}
          resetLabel="Nueva evaluación"
          className="mt-6"
        />
      </div>

      {/* Modals */}
      <CreateEntityModal
        isOpen={showPatientModal}
        onClose={() => setShowPatientModal(false)}
        onSubmit={(name) => {
          const success = createPatient(name);
          if (success) {
            setPatient(name);
          }
          return success;
        }}
        entityType="paciente"
      />

      <CreateEntityModal
        isOpen={showProfessionalModal}
        onClose={() => setShowProfessionalModal(false)}
        onSubmit={(name) => {
          const success = createProfessional(name);
          if (success) {
            setProfessional(name);
          }
          return success;
        }}
        entityType="profesional"
      />

      <CreateCustomSymptomModal
        isOpen={showCustomSymptomModal}
        onClose={() => setShowCustomSymptomModal(false)}
        onCreate={handleCreateCustomSymptom}
        patientId={patient && patients.find((p) => p.name === patient)?.id || ""}
      />
    </form>
  );
}
