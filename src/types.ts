//  definitions within types.ts
export interface FormData {
  artist: string;
  album: string;
  track: string;
  startTimestamp: string;
  endTimestamp: string;
}

export interface Options {
  artists: string[];
  albums: string[];
  tracks: string[];
}

export interface FetchDataParams {
  user?: string;
  artist?: string;
  album?: string;
  track?: string;
  autocorrect?: number;
  page?: number;
  limit?: number;
  period?: string;
  extended?: number;
  api_key?: string;
}
export interface ViewProps {
  userID: string | null;
  error?: Error | null;
  onViewChange?: any;
}
export interface OptionType {
  name: string;
}
