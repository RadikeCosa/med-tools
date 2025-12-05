export function getSeverityColor(value: number): {
  bg: string;
  text: string;
  border: string;
  bgDark: string;
  ring: string;
} {
  if (value <= 3) {
    return {
      bg: "bg-green-500",
      text: "text-white",
      border: "border-green-500",
      bgDark: "dark:bg-green-600",
      ring: "ring-green-500/50",
    };
  }
  if (value <= 6) {
    return {
      bg: "bg-yellow-500",
      text: "text-white",
      border: "border-yellow-500",
      bgDark: "dark:bg-yellow-600",
      ring: "ring-yellow-500/50",
    };
  }
  return {
    bg: "bg-red-600",
    text: "text-white",
    border: "border-red-600",
    bgDark: "dark:bg-red-700",
    ring: "ring-red-500/50",
  };
}

export function getSeverityBadgeColor(value: number): string {
  if (value <= 3) return "bg-green-100 text-green-700";
  if (value <= 6) return "bg-yellow-100 text-yellow-700";
  return "bg-red-100 text-red-700";
}
