"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ESASSymptomNames } from "../esas.types";
import {
  ESAS_SYMPTOM_LABELS,
  ESAS_FORM_TEXT,
  ESAS_FORM_INSTRUCTION,
  ESAS_SYMPTOM_MIN_LABELS,
  ESAS_SYMPTOM_MAX_LABELS,
} from "../esas.constants";
import { useESAS } from "../hooks/useESAS";
import { useEntities } from "../hooks/useEntities";
import { PlusIcon, ErrorIcon, SuccessIcon } from "@/app/icons";
import SymptomSlider from "./SymptomSlider";
import NotesField from "./NotesField";
import FormActions from "./FormActions";
import StatusMessage from "./StatusMessage";
import CreateEntityModal from "./CreateEntityModal";
import { ErrorCircleIcon, SuccessCheckIcon } from "../../icons";

export default function ESASForm() {
  const router = useRouter();
  const [formError, setFormError] = React.useState<string | null>(null);
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [showPatientModal, setShowPatientModal] = React.useState(false);
  const [showProfessionalModal, setShowProfessionalModal] =
    React.useState(false);

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

  const {
    symptoms,
    notes,
    saving,
    error,
    success,
    updateSymptom,
    setNotes,
    saveAssessment,
    reset,
  } = useESAS();

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
      className="max-w-6xl mx-auto rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
      style={{ background: "var(--background)", color: "var(--foreground)" }}
    >
      {/* Header */}
      <div className="bg-linear-to-r from-blue-600 to-blue-700 px-6 py-5">
        <h1 className="text-xl font-bold text-white">{ESAS_FORM_TEXT.title}</h1>
        <p className="text-blue-100 text-sm mt-1">
          Escala de Evaluación de Síntomas de Edmonton
        </p>
      </div>

      <div className="p-6 space-y-6">
        {/* Info del paciente y fecha */}
        <section className="bg-gray-50 dark:bg-gray-800/30 rounded-xl p-4 space-y-4">
          <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
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
                className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 text-sm transition-all"
                style={{
                  background: "var(--background)",
                  color: "var(--foreground)",
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
                  className="flex-1 px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 text-sm transition-all disabled:opacity-50"
                  style={{
                    background: "var(--background)",
                    color: "var(--foreground)",
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
                  className="px-3 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium transition-colors hover:bg-blue-700 flex items-center gap-1"
                  title="Crear nuevo paciente"
                >
                  <PlusIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Síntomas */}
        <section>
          <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
            Evaluación de Síntomas
          </h2>

          {/* Instruction header */}
          <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-sm font-medium text-blue-800 dark:text-blue-200 italic">
              {ESAS_FORM_INSTRUCTION}
            </p>
          </div>

          {/* Symptoms table */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-900/50">
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
          </div>
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
                className="flex-1 px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 text-sm transition-all disabled:opacity-50"
                style={{
                  background: "var(--background)",
                  color: "var(--foreground)",
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
                className="px-3 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium transition-colors hover:bg-blue-700 flex items-center gap-1"
                title="Crear nuevo profesional"
              >
                <PlusIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* Mensajes de estado */}
        {formError && (
          <div
            className="flex items-center gap-2 text-red-600 bg-red-50 dark:bg-red-900/20 rounded-lg px-4 py-3 border border-red-200 dark:border-red-800"
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
            className="flex items-center gap-2 text-green-700 bg-green-50 dark:bg-green-900/20 rounded-lg px-4 py-3 border border-green-200 dark:border-green-800"
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
    </form>
  );
}
