import { get } from "./fetch";
import { log, logError } from "./logger";
import type { Metadata, PlexMetadataResponse } from "./PlexTypes";

type MediaLocation = {
  librarySectionID: number;
  mediaLocations: string[];
};

export function getMediaLocations(path: string): Promise<MediaLocation> {
  return new Promise(async (resolve, reject) => {
    const url = new URL(path, window.location.origin);

    url.searchParams.set("includeExternalMedia", "1");

    const response = await get<PlexMetadataResponse>(url).catch((error) => {
      logError(error);
    });

    if (!response) {
      return reject("No response from Plex");
    }

    log(response);

    const {
      MediaContainer: { Metadata },
    } = response;

    log(`Metadata:`, Metadata);
    const metadata = Metadata[0];
    const librarySectionID = metadata.librarySectionID;

    const showLocations = getShowLocations(metadata);
    const movieLocations = getMovieLocations(metadata);

    const mediaLocations = [...showLocations, ...movieLocations];

    resolve({ librarySectionID, mediaLocations });
  });
}

function getShowLocations(metadata: Metadata): string[] {
  if (metadata.type !== "show") {
    return [];
  }

  log(`metadata.Location:`, metadata.Location);

  const locations = metadata.Location.map(({ path }) => path);

  return locations;
}

function getMovieLocations(metadata: Metadata): string[] {
  if (metadata.type !== "movie") {
    return [];
  }

  log(`metadata.Media:`, metadata.Media);

  const locations = metadata.Media.flatMap(({ Part }) =>
    Part.map(({ file }) => file.replace(/\/[^\/]+$/, ""))
  );

  return locations;
}
