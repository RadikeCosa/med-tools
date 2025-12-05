import { z } from "zod";

export const PatientSchema = z.object({
  id: z.string(),
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  createdAt: z.number(),
});

export const ProfessionalSchema = z.object({
  id: z.string(),
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  createdAt: z.number(),
});

export type Patient = z.infer<typeof PatientSchema>;
export type Professional = z.infer<typeof ProfessionalSchema>;

export const PATIENTS_STORAGE_KEY = "esas_patients_v1";
export const PROFESSIONALS_STORAGE_KEY = "esas_professionals_v1";
export const ENTITIES_DATA_VERSION = "1.0";
