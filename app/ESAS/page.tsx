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
          className="flex items-center gap-1 text-muted transition-colors hover:opacity-80"
        >
          <HomeIcon className="w-4 h-4" />
          Inicio
        </Link>
        <span className="text-muted">/</span>
        <span className="text-strong font-medium">
          ESAS Assessment
        </span>
      </nav>

      <ESASForm />

      {/* Quick navigation */}
      <div className="max-w-2xl mx-auto mt-6 flex justify-center">
        <Link
          href="/ESAS/results"
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors text-accent bg-secondary border border-default hover:opacity-80"
        >
          <DocumentChartIcon className="w-4 h-4" />
          Ver resultados guardados
        </Link>
      </div>
    </main>
  );
}
