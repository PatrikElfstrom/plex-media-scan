import { log, PMSError } from "./logger";

export function getMetadataKey() {
  const locationHash = document.location.hash;

  log(`url hash:`, locationHash);
  const matchMetadataKey = locationHash.match(/key=(.*)?&/);

  if (matchMetadataKey === null || typeof matchMetadataKey[1] !== "string") {
    throw PMSError(`No metadata key found in location hash: '${locationHash}'`);
  }

  const metadataKey = decodeURIComponent(matchMetadataKey[1]);
  log(`Metadata key:`, metadataKey);

  return metadataKey;
}
