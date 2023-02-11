import { getPlexAccessToken } from "./getPlexAccessToken";
import { log } from "./logger";

export async function get<ResponseType>(url: URL): Promise<ResponseType> {
  url.searchParams.set("X-Plex-Token", getPlexAccessToken());

  log(`url:`, url.toString());

  const response = await fetch(url, {
    mode: "cors",
    headers: {
      Accept: "application/json",
    },
  });

  return response.json();
}
