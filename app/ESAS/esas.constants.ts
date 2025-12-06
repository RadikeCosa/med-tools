// Nombres de pacientes y profesional para el formulario ESAS
export const ESAS_PATIENT_NAMES = ["Juan Perez", "Ana Gonzalez"];
export const ESAS_PROFESSIONAL_NAME = "Dr. Cito";

// Instrucción principal del formulario ESAS-r
export const ESAS_FORM_INSTRUCTION =
  "Por favor, marque el número que describa mejor como se siente AHORA:";

// Etiquetas de síntomas en el orden ESAS-r estándar
export const ESAS_SYMPTOM_LABELS: Record<string, string> = {
  dolor: "Dolor",
  fatiga: "Cansancio",
  somnolencia: "Somnoliento",
  náusea: "Náuseas",
  apetito: "Pérdida de apetito",
  disnea: "Dificultad para respirar",
  depresión: "Desánimo",
  ansiedad: "Nervioso",
  sueño: "Dificultad para dormir",
  bienestar: "Sentirse bien",
};

// Descripciones del estado mínimo (valor 0) para cada síntoma
export const ESAS_SYMPTOM_MIN_LABELS: Record<string, string> = {
  dolor: "Nada de dolor",
  fatiga: "Nada agotado (cansancio, debilidad)",
  somnolencia: "Nada somnoliento (adormilado)",
  náusea: "Sin náuseas",
  apetito: "Ninguna pérdida de apetito",
  disnea: "Ninguna dificultad para respirar",
  depresión: "Nada desanimado",
  ansiedad: "Nada nervioso (intranquilidad, ansiedad)",
  sueño: "Duermo perfectamente",
  bienestar: "Sentirse perfectamente (sensación de bienestar)",
};

// Descripciones del estado máximo (valor 10) para cada síntoma
export const ESAS_SYMPTOM_MAX_LABELS: Record<string, string> = {
  dolor: "El peor dolor que se pueda imaginar",
  fatiga: "Lo más agotado que se pueda imaginar",
  somnolencia: "Lo más somnoliento que se pueda imaginar",
  náusea: "Las peores náuseas que se pueda imaginar",
  apetito: "El peor apetito que se pueda imaginar",
  disnea: "La mayor dificultad para respirar que se pueda imaginar",
  depresión: "Lo más desanimado que se pueda imaginar",
  ansiedad: "Lo más nervioso que se pueda imaginar",
  sueño: "La mayor dificultad para dormir que se pueda imaginar",
  bienestar: "Sentirse lo peor que se pueda imaginar",
};

export const ESAS_FORM_TEXT = {
  title: "Evaluación de Síntomas (ESAS)",
  save: "Guardar evaluación",
  notes: "Notas adicionales",
  success: "¡Evaluación guardada exitosamente!",
  error: "Error al guardar la evaluación. Intente nuevamente.",
};

export const ESAS_STORAGE_KEY = "esas_v1";
export const ESAS_DATA_VERSION = "1.0";
export const ESAS_TTL_MS = 1000 * 60 * 60 * 24 * 30; // 30 días
