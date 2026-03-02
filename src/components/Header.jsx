const ZONES = {
  dark: {
    label: "Escuro",
    description: "< 30% — Lâmpada LIGADA",
    dotColor: "#ef4444",
    dotGlow: "0 0 6px #ef4444",
    trackFrom: "#1a1a1a",
    trackTo: "#555",
  },
  medium: {
    label: "Médio",
    description: "30–60%",
    dotColor: "#eab308",
    dotGlow: "0 0 6px #eab308",
    trackFrom: "#1a1a1a",
    trackTo: "#aaaaaa",
  },
  high: {
    label: "Claro",
    description: "> 60% — Lâmpada DESLIGADA",
    dotColor: "#22c55e",
    dotGlow: "0 0 6px #22c55e",
    trackFrom: "#555",
    trackTo: "#e5e5e5",
  },
};

export default function Header({
  ldrValue = 15,
  setLdrValue,
  ldrZone = "dark",
}) {
  const zone = ZONES[ldrZone] || ZONES.dark;

  const trackGradient = `linear-gradient(to right, #111111 0%, #888888 50%, #e0e0e0 100%)`;
  const fillPercent = ldrValue;

  return (
    <div
      className="absolute top-0 left-0 right-0 flex items-center gap-3 px-3 z-50"
      style={{ height: "36px" }}
    >
      <div
        className="flex-shrink-0 rounded-full transition-all duration-300"
        title={`${zone.label}: ${zone.description}`}
        style={{
          width: "14px",
          height: "14px",
          backgroundColor: zone.dotColor,
          boxShadow: zone.dotGlow,
          transition: "background-color 0.3s, box-shadow 0.3s",
        }}
      />

      <div
        className="flex items-center gap-2 flex-1"
        style={{ maxWidth: "340px" }}
      >
        <input
          type="range"
          min={0}
          max={100}
          value={ldrValue}
          onChange={(e) => setLdrValue && setLdrValue(Number(e.target.value))}
          style={{
            width: "100%",
            WebkitAppearance: "none",
            appearance: "none",
            height: "6px",
            borderRadius: "3px",
            outline: "none",
            cursor: "pointer",
            background: trackGradient,
          }}
          className="ldr-slider"
        />
      </div>

      {/* Zone label badge */}
      <div
        className="text-xs font-semibold px-2 py-0.5 rounded select-none flex-shrink-0 transition-all duration-300"
        style={{
          backgroundColor: zone.dotColor + "33",
          color: zone.dotColor,
          border: `1px solid ${zone.dotColor}66`,
          minWidth: "80px",
          textAlign: "center",
        }}
      >
        {ldrValue}% — {zone.label}
      </div>
    </div>
  );
}
