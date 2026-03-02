import { API_BASE_URL, ENDPOINTS } from "../constants";

/** Generic fetch wrapper */
async function request(path, options = {}) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) throw new Error(`API error ${res.status}: ${path}`);
  return res.json();
}

// ─── Queries (GET) ────────────────────────────────────────────────────────────

/** Full system status — main polling endpoint */
export const getStatus = () => request(ENDPOINTS.STATUS);

/** Raw LDR sensor data */
export const getLdrSensor = () => request(ENDPOINTS.SENSOR_LDR);

/** Relay (lamp) on/off state */
export const getRelayStatus = () => request(ENDPOINTS.RELAY_STATUS);

/** LED indicators state { low, medium, high } */
export const getLedsStatus = () => request(ENDPOINTS.LEDS_STATUS);

// ─── Mutations (POST) ─────────────────────────────────────────────────────────

/**
 * Simulate a light intensity change.
 * @param {number} lightIntensity - 0 to 100
 */
export const simulate = (lightIntensity) =>
  request(ENDPOINTS.SIMULATE, {
    method: "POST",
    body: JSON.stringify({ light_intensity: lightIntensity }),
  });

/**
 * Manually set relay state.
 * @param {boolean} state
 */
export const setRelay = (state) =>
  request(`${ENDPOINTS.RELAY_SET}?state=${state}`, { method: "POST" });

/** Toggle between auto / manual mode */
export const toggleMode = () =>
  request(ENDPOINTS.MODE_TOGGLE, { method: "POST" });

/** Switch to manual mode explicitly (not toggle) */
export const setModeManual = () =>
  request(ENDPOINTS.MODE_TOGGLE, { method: "POST" });

/** Force automatic mode */
export const setModeAuto = () =>
  request(ENDPOINTS.MODE_AUTO, { method: "POST" });
