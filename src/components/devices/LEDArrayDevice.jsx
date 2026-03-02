const LED_COLORS = {
  off: { body: "#9e9e9e", glow: "none", label: "off" },
  red: {
    body: "#ef4444",
    glow: "0 0 6px #ef4444, 0 0 12px #f87171",
    label: "red",
  },
  green: {
    body: "#22c55e",
    glow: "0 0 6px #22c55e, 0 0 12px #4ade80",
    label: "green",
  },
  blue: {
    body: "#3b82f6",
    glow: "0 0 6px #3b82f6, 0 0 12px #60a5fa",
    label: "blue",
  },
  yellow: {
    body: "#eab308",
    glow: "0 0 6px #eab308, 0 0 12px #facc15",
    label: "yellow",
  },
  purple: {
    body: "#a855f7",
    glow: "0 0 6px #a855f7, 0 0 12px #c084fc",
    label: "purple",
  },
};

function LED({ color = "off", powered = true, onClick }) {
  const c = LED_COLORS[color] || LED_COLORS.off;
  return (
    <div
      onClick={onClick}
      className="relative flex items-center justify-center cursor-pointer"
      style={{
        width: "32px",
        height: "40px",
      }}
    >
      <div
        style={{
          width: "26px",
          height: "32px",
          backgroundColor: c.body,
          borderRadius: "50% 50% 40% 40% / 60% 60% 40% 40%",
          boxShadow: c.glow,
          border: "1px solid rgba(0,0,0,0.2)",
          transition: "all 0.3s ease",
          opacity: powered ? 1 : 0.25,
          filter: powered ? "none" : "grayscale(80%) brightness(0.4)",
        }}
      />

      <div
        style={{
          position: "absolute",
          bottom: "2px",
          width: "20px",
          height: "8px",
          backgroundColor: "#ccc",
          borderRadius: "0 0 3px 3px",
          border: "1px solid #bbb",
        }}
      />
    </div>
  );
}

const DEFAULT_LEDS = [
  { id: 0, color: "purple" },
  { id: 1, color: "red" },
  { id: 2, color: "green" },
];

export default function LEDArrayDevice({
  id,
  label = "Linha 1",
  leds,
  powered = false,
}) {
  const activeLeds = leds || DEFAULT_LEDS;

  return (
    <div
      className="absolute select-none"
      style={{ top: "20px", right: "20px" }}
    >
      <div className="flex flex-col items-center gap-1">
        <div
          className="flex items-end gap-1 px-3 pt-2 pb-1 rounded-2xl"
          style={{
            backgroundColor: "#f0f0f0",
            border: "2px solid #ddd",
            boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
            minWidth: "110px",
          }}
        >
          {activeLeds.map((led) => (
            <LED key={led.id} color={led.color} powered={powered} />
          ))}
        </div>

        <span
          className="text-xs font-medium"
          style={{ color: powered ? "#fff" : "#888" }}
        >
          {label}
        </span>
      </div>
    </div>
  );
}
