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
          className="flex items-center gap-1 text-muted transition-colors hover:opacity-80"
        >
          <HomeIcon className="w-4 h-4" />
          Inicio
        </Link>
        <span className="text-muted">/</span>
        <Link
          href="/ESAS"
          className="text-muted transition-colors hover:underline hover:opacity-80"
        >
          ESAS
        </Link>
        <span className="text-muted">/</span>
        <span className="text-strong font-medium">
          Resultados
        </span>
      </nav>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-strong">
            Registros ESAS
          </h1>
          <p className="text-sm mt-1 text-muted">
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
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white rounded-lg transition-all hover:opacity-90 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500/50 bg-gradient-accent"
        >
          <PlusIcon className="w-4 h-4" />
          Nueva evaluación
        </Link>
      </div>

      {assessments.length === 0 ? (
        <div className="text-center py-16 px-4 rounded-xl border-2 border-dashed border-default bg-secondary">
          <EmptyDocumentIcon className="w-12 h-12 mx-auto mb-4 text-muted" />
          <p className="text-lg font-medium text-foreground">
            No hay evaluaciones guardadas
          </p>
          <p className="mt-2 text-sm text-muted">
            Completa el formulario ESAS para comenzar a registrar evaluaciones.
          </p>
          <Link
            href="/ESAS"
            className="inline-flex items-center gap-2 mt-4 px-4 py-2 text-sm font-medium rounded-lg transition-colors text-accent bg-background border border-default hover:opacity-80"
          >
            <PlusIcon className="w-4 h-4" />
            Crear primera evaluación
          </Link>
        </div>
      ) : (
        <>
          <ESASResultList assessments={assessments} onDelete={deleteOne} />

          <div className="flex justify-end mt-8 pt-6 border-t border-default">
            <button
              onClick={deleteAll}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500/50 text-error bg-error-light hover:opacity-80"
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
