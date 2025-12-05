"use client";

import Link from "next/link";
import ESASForm from "./components/ESASForm";
import { HomeIcon, DocumentChartIcon } from "../icons";

export default function ESASPage() {
  return (
    <main className="p-4 md:p-8 w-full overflow-y-auto">
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
        <span style={{ color: "var(--foreground-strong)" }} className="font-medium">
          ESAS Assessment
        </span>
      </nav>

      <ESASForm />

      {/* Quick navigation */}
      <div className="max-w-2xl mx-auto mt-6 flex justify-center">
        <Link
          href="/ESAS/results"
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors"
          style={{
            color: "var(--accent)",
            background: "var(--background-secondary)",
            border: "1px solid var(--border-color)",
          }}
        >
          <DocumentChartIcon className="w-4 h-4" />
          Ver resultados guardados
        </Link>
      </div>
    </main>
  );
}
