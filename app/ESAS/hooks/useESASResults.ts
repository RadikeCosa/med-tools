import { useState, useCallback } from "react";
import { ESASAssessment } from "../esas.types";
import { loadAssessments, clearAllAssessments } from "../esasStorage";

export function useESASResults() {
  const [assessments, setAssessments] = useState<ESASAssessment[]>(() =>
    loadAssessments()
  );

  const deleteAll = useCallback(() => {
    clearAllAssessments();
    setAssessments([]);
  }, []);

  const deleteOne = useCallback(
    (id: string) => {
      const newList = assessments.filter((a) => a.id !== id);
      try {
        const raw = localStorage.getItem("esas_v1");
        if (raw) {
          const data = JSON.parse(raw);
          data.assessments = newList;
          localStorage.setItem("esas_v1", JSON.stringify(data));
        }
      } catch {}
      setAssessments(newList);
    },
    [assessments]
  );

  return {
    assessments,
    deleteAll,
    deleteOne,
  };
}
