import React from "react";
import { ESASAssessment } from "../esas.types";
import ESASResultItem from "./ESASResultItem";

interface ESASResultListProps {
  assessments: ESASAssessment[];
  onDelete: (id: string) => void;
}

export default function ESASResultList({
  assessments,
  onDelete,
}: ESASResultListProps) {
  if (assessments.length === 0) {
    return <div className="text-gray-500">No hay registros guardados.</div>;
  }
  return (
    <ul className="space-y-6">
      {assessments.map((a) => (
        <ESASResultItem key={a.id} assessment={a} onDelete={onDelete} />
      ))}
    </ul>
  );
}
