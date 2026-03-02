import { useState } from "react";

export default function ButtonDevice({
  id,
  label = "botão",
  toggled = false,
  onToggle,
}) {
  const [pressing, setPressing] = useState(false);

  const handleClick = () => {
    onToggle && onToggle(id, !toggled);
  };

  return (
    <div className="absolute select-none" style={{ top: "20px", left: "20px" }}>
      <div className="flex flex-col items-center gap-1">
        <div
          className="flex items-center justify-center rounded-xl"
          style={{
            width: "64px",
            height: "64px",
            backgroundColor: "#f0f0f0",
            border: "2px solid #ddd",
            boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
          }}
        >
          <div
            className="rounded-full transition-all duration-100"
            onClick={handleClick}
            onMouseDown={() => setPressing(true)}
            onMouseUp={() => setPressing(false)}
            onMouseLeave={() => setPressing(false)}
            style={{
              width: "36px",
              height: "36px",
              backgroundColor: pressing ? "#991b1b" : "#ef4444",
              cursor: "pointer",
              boxShadow: pressing
                ? "inset 0 3px 6px rgba(0,0,0,0.5)"
                : "0 0 8px rgba(239,68,68,0.5), 0 3px 6px rgba(0,0,0,0.3)",
              transform: pressing ? "scale(0.91)" : "scale(1)",
              transition: "all 0.1s ease",
            }}
          />
        </div>
        <span className="text-xs font-medium" style={{ color: "#fff" }}>
          {label}
        </span>
      </div>
    </div>
  );
}
