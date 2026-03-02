import { ZONES } from "../constants";

export default function Header({
  ldrValue = 15,
  ldrZone = "dark",
  isConnected = false,
  onSliderChange,
}) {
  const zone = ZONES[ldrZone] || ZONES.dark;

  const trackGradient = `linear-gradient(to right, #111111 0%, #888888 50%, #e0e0e0 100%)`;

  return (
    <div
      className="absolute top-0 left-0 right-0 flex items-center gap-3 px-3 z-50"
      style={{ height: "36px" }}
    >
      <div
        className="flex-shrink-0 rounded-full transition-all duration-300"
        title={isConnected ? "Backend conectado" : "Backend desconectado"}
        style={{
          width: "14px",
          height: "14px",
          backgroundColor: isConnected ? "#22c55e" : "#6b7280",
          boxShadow: isConnected ? "0 0 6px #22c55e" : "none",
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
          onChange={(e) =>
            onSliderChange && onSliderChange(Number(e.target.value))
          }
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
