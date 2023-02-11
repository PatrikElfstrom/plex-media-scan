export function log(...data: unknown[]) {
  if (import.meta.env.VITE_DEBUG === "true") {
    console.info("PMS info:", ...data);
  }
}

export function logError(...data: unknown[]) {
  console.error("PMS error:", ...data);
}

export const PMSError = Error;
PMSError.prototype.name = "PMS error";
