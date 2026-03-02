export const LDR_DARK_THRESHOLD = 30;
export const LDR_MEDIUM_THRESHOLD = 60;

export const ZONES = {
  dark: {
    label: "Escuro",
    description: "< 30% — Lâmpada LIGADA",
    dotColor: "#ef4444",
    dotGlow: "0 0 6px #ef4444",
  },
  medium: {
    label: "Médio",
    description: "30–60%",
    dotColor: "#eab308",
    dotGlow: "0 0 6px #eab308",
  },
  high: {
    label: "Claro",
    description: "> 60% — Lâmpada DESLIGADA",
    dotColor: "#22c55e",
    dotGlow: "0 0 6px #22c55e",
  },
};

export const ZONE_LEDS = {
  dark: [
    { id: 0, color: "red" },
    { id: 1, color: "off" },
    { id: 2, color: "off" },
  ],
  medium: [
    { id: 0, color: "off" },
    { id: 1, color: "yellow" },
    { id: 2, color: "off" },
  ],
  high: [
    { id: 0, color: "off" },
    { id: 1, color: "off" },
    { id: 2, color: "green" },
  ],
};

/**
 * Derives zone string from a numeric LDR value (0-100).
 * Used locally (fallback) when backend is not responding.
 */
export function getLdrZone(value) {
  if (value < LDR_DARK_THRESHOLD) return "dark";
  if (value <= LDR_MEDIUM_THRESHOLD) return "medium";
  return "high";
}

/**
 * Derives zone string from the backend leds_status object.
 * { low: bool, medium: bool, high: bool }
 */
export function ledsStatusToZone({ low, medium, high }) {
  if (high) return "high";
  if (medium) return "medium";
  return "dark";
}
