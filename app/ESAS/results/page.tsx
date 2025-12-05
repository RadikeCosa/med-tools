"use client";

import React from "react";
import Link from "next/link";
import ESASResultList from "../components/ESASResultList";
import { useESASResults } from "../hooks/useESASResults";
import {
  HomeIcon,
  PlusIcon,
  EmptyDocumentIcon,
  TrashIcon,
} from "../../icons";

export default function ESASResultsPage() {
  const { assessments, deleteAll, deleteOne } = useESASResults();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      {/* Breadcrumb navigation */}
      <nav className="mb-6 flex items-center gap-2 text-sm">
        <Link
          href="/"
          className="flex items-center gap-1 transition-colors"
          style={{ color: "var(--foreground-muted)" }}
        >
          <HomeIcon className="w-4 h-4" />
          Inicio
        </Link>
        <span style={{ color: "var(--foreground-muted)" }}>/</span>
        <Link
          href="/ESAS"
          className="transition-colors hover:underline"
          style={{ color: "var(--foreground-muted)" }}
        >
          ESAS
        </Link>
        <span style={{ color: "var(--foreground-muted)" }}>/</span>
        <span
          style={{ color: "var(--foreground-strong)" }}
          className="font-medium"
        >
          Resultados
        </span>
      </nav>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1
            className="text-2xl font-bold"
            style={{ color: "var(--foreground-strong)" }}
          >
            Registros ESAS
          </h1>
          <p
            className="text-sm mt-1"
            style={{ color: "var(--foreground-muted)" }}
          >
            {mounted ? (
              <>
                {assessments.length} evaluación
                {assessments.length !== 1 ? "es" : ""} guardada
                {assessments.length !== 1 ? "s" : ""}
              </>
            ) : (
              "Cargando..."
            )}
          </p>
        </div>
        <Link
          href="/ESAS"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white rounded-lg transition-all hover:opacity-90 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          style={{ background: "var(--gradient-accent)" }}
        >
          <PlusIcon className="w-4 h-4" />
          Nueva evaluación
        </Link>
      </div>

      {assessments.length === 0 ? (
        <div
          className="text-center py-16 px-4 rounded-xl border-2 border-dashed"
          style={{
            borderColor: "var(--border-color)",
            background: "var(--background-secondary)",
          }}
        >
          <EmptyDocumentIcon
            className="w-12 h-12 mx-auto mb-4"
            style={{ color: "var(--foreground-muted)" }}
          />
          <p
            className="text-lg font-medium"
            style={{ color: "var(--foreground)" }}
          >
            No hay evaluaciones guardadas
          </p>
          <p
            className="mt-2 text-sm"
            style={{ color: "var(--foreground-muted)" }}
          >
            Completa el formulario ESAS para comenzar a registrar evaluaciones.
          </p>
          <Link
            href="/ESAS"
            className="inline-flex items-center gap-2 mt-4 px-4 py-2 text-sm font-medium rounded-lg transition-colors"
            style={{
              color: "var(--accent)",
              background: "var(--background)",
              border: "1px solid var(--border-color)",
            }}
          >
            <PlusIcon className="w-4 h-4" />
            Crear primera evaluación
          </Link>
        </div>
      ) : (
        <>
          <ESASResultList assessments={assessments} onDelete={deleteOne} />

          <div
            className="flex justify-end mt-8 pt-6 border-t"
            style={{ borderColor: "var(--border-color)" }}
          >
            <button
              onClick={deleteAll}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500/50"
              style={{
                color: "var(--error)",
                background: "var(--error-light)",
              }}
            >
              <TrashIcon className="w-4 h-4" />
              Borrar todos los registros
            </button>
          </div>
        </>
      )}
    </div>
  );
}
