import { useRef } from "react";
import Draggable from "react-draggable";
import ButtonDevice from "./devices/ButtonDevice";
import LEDArrayDevice from "./devices/LEDArrayDevice";
import { ZONE_LEDS } from "../constants";

export default function Mesa({
  id,
  label = "mesa",
  devices = [],
  ldrZone = "dark",
  relayOn = false,
  onButtonToggle,
}) {
  const nodeRef = useRef(null);

  const zoneLeds = ZONE_LEDS[ldrZone] || ZONE_LEDS.dark;

  const handleToggle = (devId, newState) => {
    onButtonToggle && onButtonToggle(devId, newState);
  };

  return (
    <Draggable nodeRef={nodeRef} bounds="parent" handle=".mesa-handle">
      <div
        ref={nodeRef}
        className="absolute"
        style={{
          width: "620px",
          height: "220px",
          left: "50%",
          top: "55%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <div
          className="relative w-full h-full rounded-sm"
          style={{
            backgroundColor: "#7a5c35",
            border: "3px solid #3b82f6",
          }}
        >
          <div
            className="mesa-handle absolute bottom-0 left-0 right-0 flex items-end justify-center pb-2 cursor-grab active:cursor-grabbing"
            style={{ height: "40px" }}
          >
            <span
              className="text-white text-base font-semibold tracking-wide select-none"
              style={{ textShadow: "0 1px 2px rgba(0,0,0,0.5)" }}
            >
              {label}
            </span>
          </div>

          {devices.map((device) => {
            if (device.type === "button") {
              return (
                <ButtonDevice
                  key={device.id}
                  id={device.id}
                  label={device.label}
                  toggled={relayOn}
                  onToggle={handleToggle}
                />
              );
            }
            if (device.type === "ledarray") {
              return (
                <LEDArrayDevice
                  key={device.id}
                  id={device.id}
                  label={device.label}
                  leds={zoneLeds}
                  powered={relayOn}
                />
              );
            }
            return null;
          })}
        </div>
      </div>
    </Draggable>
  );
}
