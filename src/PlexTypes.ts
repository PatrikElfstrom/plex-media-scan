export interface PlexMetadataResponse {
  MediaContainer: MediaContainer;
}

interface MediaContainer {
  size: number;
  allowSync: boolean;
  identifier: string;
  librarySectionID: number;
  librarySectionTitle: string;
  librarySectionUUID: string;
  mediaTagPrefix: string;
  mediaTagVersion: number;
  Metadata: Metadata[];
}

export type Metadata = MovieMetadata | ShowMetadata;

interface BaseMetadata {
  ratingKey: string;
  key: string;
  guid: string;
  studio: string;
  type: "movie" | "show" | "artist" | "album" | "playlist";
  title: string;
  librarySectionTitle: string;
  librarySectionID: number;
  librarySectionKey: string;
  contentRating: string;
  summary: string;
  audienceRating: number;
  year: number;
  thumb: string;
  art: string;
  duration: number;
  originallyAvailableAt: Date;
  addedAt: number;
  updatedAt: number;
  audienceRatingImage: string;
  Genre: Country[];
  Country: Country[];
  Guid: Guid[];
  Rating: Rating[];
  Role: Role[];
}

export interface MovieMetadata extends BaseMetadata {
  type: "movie";
  tagline: string;
  chapterSource: string;
  Media: Media[];
  Director: Country[];
  Writer: Country[];
  Producer: Country[];
}

export interface ShowMetadata extends BaseMetadata {
  type: "show";
  index: number;
  viewCount: number;
  lastViewedAt: number;
  leafCount: number;
  viewedLeafCount: number;
  childCount: number;
  primaryExtraKey: string;
  Location: Location[];
}

interface Country {
  id: number;
  filter: string;
  tag: string;
}

interface Guid {
  id: string;
}

interface Media {
  id: number;
  duration: number;
  bitrate: number;
  width: number;
  height: number;
  aspectRatio: number;
  audioChannels: number;
  audioCodec: string;
  videoCodec: string;
  videoResolution: string;
  container: string;
  videoFrameRate: string;
  videoProfile: string;
  Part: Part[];
}

interface Part {
  id: number;
  key: string;
  duration: number;
  file: string;
  size: number;
  container: string;
  videoProfile: string;
  Stream: Stream[];
}

interface Stream {
  id: number;
  streamType: number;
  default?: boolean;
  codec: string;
  index: number;
  bitrate?: number;
  bitDepth?: number;
  chromaLocation?: string;
  chromaSubsampling?: string;
  codedHeight?: number;
  codedWidth?: number;
  colorPrimaries?: string;
  colorRange?: string;
  colorSpace?: string;
  colorTrc?: string;
  frameRate?: number;
  height?: number;
  level?: number;
  profile?: string;
  refFrames?: number;
  width?: number;
  displayTitle: string;
  extendedDisplayTitle: string;
  selected?: boolean;
  channels?: number;
  language?: string;
  languageTag?: string;
  languageCode?: string;
  audioChannelLayout?: string;
  samplingRate?: number;
  forced?: boolean;
  title?: string;
}

export interface Location {
  path: string;
}

interface Rating {
  image: string;
  value: number;
  type: string;
}

interface Role {
  id: number;
  filter: string;
  tag: string;
  tagKey: string;
  role: string;
  thumb: string;
}
