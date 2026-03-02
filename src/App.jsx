import { useState, useCallback } from "react";
import Header from "./components/Header";
import Mesa from "./components/Mesa";

const LDR_DARK_THRESHOLD = 30;
const LDR_MEDIUM_THRESHOLD = 60;

const INITIAL_MESAS = [
  {
    id: "mesa-1",
    label: "mesa",
    devices: [
      {
        id: "btn-1",
        type: "button",
        label: "butão",
      },
      {
        id: "led-1",
        type: "ledarray",
        label: "Linha 1",
        leds: [
          { id: 0, color: "purple" },
          { id: 1, color: "red" },
          { id: 2, color: "green" },
        ],
      },
    ],
  },
];

export function getLdrZone(value) {
  if (value < LDR_DARK_THRESHOLD) return "dark";
  if (value <= LDR_MEDIUM_THRESHOLD) return "medium";
  return "high";
}

export default function App() {
  const [mesas] = useState(INITIAL_MESAS);
  const [ldrValue, setLdrValue] = useState(15);

  const ldrZone = getLdrZone(ldrValue);

  const handleDeviceEvent = useCallback((event) => {
    console.log("[IoT Event]", event);
  }, []);

  return (
    <div
      className="relative w-screen h-screen overflow-hidden"
      style={{ backgroundColor: "#9e9e9e" }}
    >
      <Header ldrValue={ldrValue} setLdrValue={setLdrValue} ldrZone={ldrZone} />
      <div className="absolute inset-0" style={{ top: "36px" }}>
        {mesas.map((mesa) => (
          <Mesa
            key={mesa.id}
            id={mesa.id}
            label={mesa.label}
            devices={mesa.devices}
            ldrZone={ldrZone}
            onDeviceEvent={handleDeviceEvent}
          />
        ))}
      </div>
    </div>
  );
}
