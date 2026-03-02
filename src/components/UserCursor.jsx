import React from "react";
import Draggable from "react-draggable";

const CursorArrow = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    className="absolute -top-4 -left-1"
    style={{ filter: "drop-shadow(1px 1px 1px rgba(0,0,0,0.4))" }}
  >
    <polygon
      points="2,2 2,14 6,10 9,16 11,15 8,9 14,9"
      fill="#f59e0b"
      stroke="#d97706"
      strokeWidth="0.8"
    />
  </svg>
);

export default function UserCursor({
  name = "Rayane Barbosa",
  defaultPos = { x: 28, y: 50 },
}) {
  return (
    <Draggable defaultPosition={defaultPos}>
      <div
        className="absolute cursor-pointer select-none"
        style={{ width: "fit-content", zIndex: 40 }}
      >
        <CursorArrow />
        <div
          className="text-xs font-semibold px-2 py-0.5 rounded-sm mt-1"
          style={{
            backgroundColor: "#fbbf24",
            color: "#1a1a1a",
            border: "1px solid #d97706",
            boxShadow: "1px 1px 3px rgba(0,0,0,0.3)",
            whiteSpace: "nowrap",
          }}
        >
          {name}
        </div>
      </div>
    </Draggable>
  );
}
