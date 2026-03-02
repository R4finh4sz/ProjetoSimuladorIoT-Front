import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Header from "./components/Header";
import Mesa from "./components/Mesa";
import {
  getStatus,
  simulate,
  setRelay,
  toggleMode,
  setModeManual,
} from "./services/apiService";
import { getLdrZone, ledsStatusToZone, POLLING_INTERVAL } from "./constants";

const MESAS_CONFIG = [
  {
    id: "mesa-1",
    label: "mesa",
    devices: [
      { id: "btn-1", type: "button", label: "butão" },
      { id: "led-1", type: "ledarray", label: "Linha 1" },
    ],
  },
];

export default function App() {
  const queryClient = useQueryClient();

  const { data: status, isError } = useQuery({
    queryKey: ["status"],
    queryFn: getStatus,
    refetchInterval: POLLING_INTERVAL,
    retry: 1,
  });

  const ldrValue = status?.ldr_sensor?.light_intensity ?? 15;
  const manualMode = status?.manual_mode ?? false;
  const relayOnBack = status?.relay_status?.is_on ?? false;

  const [relayOnLocal, setRelayOnLocal] = useState(false);
  const relayOn = manualMode ? relayOnLocal : relayOnBack;

  const ldrZone = status?.leds_status
    ? ledsStatusToZone(status.leds_status)
    : getLdrZone(ldrValue);

  useEffect(() => {
    setRelayOnLocal(relayOnBack);
  }, [relayOnBack]);

  // ── Mutations ─────────────────────────────────────────────────────────────
  const simulateMutation = useMutation({
    mutationFn: simulate,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["status"] }),
  });

  const modeMutation = useMutation({
    mutationFn: toggleMode,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["status"] }),
  });

  return (
    <div
      className="relative w-screen h-screen overflow-hidden"
      style={{ backgroundColor: "#9e9e9e" }}
    >
      {isError && (
        <div
          className="animate-pulse absolute left-0 right-0 flex items-center justify-center gap-2 z-[100] text-white text-xs font-semibold px-4 py-1 select-none"
          style={{
            top: "36px",
            backgroundColor: "#dc2626",
            boxShadow: "0 2px 8px rgba(0,0,0,0.5)",
          }}
        >
          <span style={{ fontSize: "14px" }}>⚠️</span>
          Backend desconectado — sem resposta da API
        </div>
      )}

      <Header
        ldrValue={Math.round(ldrValue)}
        ldrZone={ldrZone}
        manualMode={manualMode}
        isConnected={!isError}
        onSliderChange={(value) => simulateMutation.mutate(value)}
        onModeToggle={() => modeMutation.mutate()}
      />

      <div className="absolute inset-0" style={{ top: "36px" }}>
        {MESAS_CONFIG.map((mesa) => (
          <Mesa
            key={mesa.id}
            id={mesa.id}
            label={mesa.label}
            devices={mesa.devices}
            ldrZone={ldrZone}
            relayOn={relayOn}
            onButtonToggle={(_devId, newState) => {
              setRelayOnLocal(newState);
              const exec = async () => {
                try {
                  if (!manualMode) await setModeManual();
                  await setRelay(newState);
                  queryClient.invalidateQueries({ queryKey: ["status"] });
                } catch (_) {}
              };
              exec();
            }}
          />
        ))}
      </div>
    </div>
  );
}
