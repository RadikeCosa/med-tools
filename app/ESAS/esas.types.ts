import { z } from "zod";

// Custom symptoms configuration
export const MAX_CUSTOM_SYMPTOM_LABEL_LENGTH = 50;
export const MAX_CUSTOM_SYMPTOMS = 3;

// Orden estándar ESAS-r (sin "otros" - ahora es dinámico)
export const ESASSymptomNames = [
  "dolor",
  "fatiga",
  "somnolencia",
  "náusea",
  "apetito",
  "disnea",
  "depresión",
  "ansiedad",
  "sueño",
  "bienestar",
] as const;

export const ESASSymptomSchema = z.object({
  dolor: z.number().min(0).max(10),
  fatiga: z.number().min(0).max(10),
  somnolencia: z.number().min(0).max(10),
  náusea: z.number().min(0).max(10),
  apetito: z.number().min(0).max(10),
  disnea: z.number().min(0).max(10),
  depresión: z.number().min(0).max(10),
  ansiedad: z.number().min(0).max(10),
  sueño: z.number().min(0).max(10),
  bienestar: z.number().min(0).max(10),
});

// Custom symptom schema
export const CustomSymptomSchema = z.object({
  id: z.string(),
  label: z.string().min(1).max(MAX_CUSTOM_SYMPTOM_LABEL_LENGTH),
  value: z.number().min(0).max(10),
});

export const ESASAssessmentSchema = z.object({
  id: z.string(),
  timestamp: z.number(),
  dateTime: z.string(),
  symptoms: ESASSymptomSchema,
  customSymptoms: z.array(CustomSymptomSchema).max(MAX_CUSTOM_SYMPTOMS).optional(),
  notes: z.string().optional(),
  patient: z.string(),
  professional: z.string(),
});

export type ESASSymptomName = (typeof ESASSymptomNames)[number];
export type ESASSymptoms = z.infer<typeof ESASSymptomSchema>;
export type CustomSymptom = z.infer<typeof CustomSymptomSchema>;
export type ESASAssessment = z.infer<typeof ESASAssessmentSchema>;
