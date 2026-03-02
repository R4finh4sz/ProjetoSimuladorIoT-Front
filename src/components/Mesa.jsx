import React, { useRef, useState } from "react";
import Draggable from "react-draggable";
import ButtonDevice from "./devices/ButtonDevice";
import LEDArrayDevice from "./devices/LEDArrayDevice";

const ZONE_LEDS = {
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

export default function Mesa({
  id,
  label = "mesa",
  devices = [],
  ldrZone = "dark",
  onDeviceEvent,
}) {
  const nodeRef = useRef(null);
  const [buttonOn, setButtonOn] = useState(false);

  const zoneLeds = ZONE_LEDS[ldrZone] || ZONE_LEDS.dark;

  const handleToggle = (devId, newState) => {
    setButtonOn(newState);
    onDeviceEvent &&
      onDeviceEvent({
        mesaId: id,
        deviceId: devId,
        type: "button",
        state: newState,
      });
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
                  toggled={buttonOn}
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
                  powered={buttonOn}
                  onLedChange={(devId, ledId, color) =>
                    onDeviceEvent &&
                    onDeviceEvent({
                      mesaId: id,
                      deviceId: devId,
                      ledId,
                      type: "led",
                      color,
                    })
                  }
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
