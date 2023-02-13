import { getPlexAccessToken } from "./getPlexAccessToken";
import { log } from "./logger";

export async function get<ResponseType = string>(
  url: URL,
  { json } = { json: true }
): Promise<ResponseType> {
  url.searchParams.set("X-Plex-Token", getPlexAccessToken());

  log(`url:`, url.toString());

  const response = await fetch(url, {
    mode: "cors",
    headers: {
      Accept: "application/json",
    },
  });

  if (json) {
    return response.json() as ResponseType;
  }

  return response.text() as ResponseType;
}
