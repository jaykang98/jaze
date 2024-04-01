export type AlbumData = {
  topalbums: {
    album: Array<{
      artist: {
        name: string;
        url: string;
        mbid: string;
      };
      name: string;
      url: string;
      image: Array<{
        size: string;
        "#text": string;
      }>;
      listeners?: string;
      playcount: string;
    }>;
    "@attr": {
      user: string;
      totalPages: string;
      page: string;
      total: string;
      perPage: string;
    };
  };
};

export type ArtistData = {
  topartists: {
    artist: Array<{
      name: string;
      mbid: string;
      url: string;
      streamable: string;
      image: Array<{
        size: string;
        "#text": string;
      }>;
    }>;
    "@attr": {
      user: string;
      totalPages: string;
      page: string;
      total: string;
      perPage: string;
    };
  };
};

export type TrackData = {
  toptracks: {
    track: Array<{
      name: string;
      mbid: string;
      url: string;
      duration: string;
      streamable: {
        "#text": string;
        fulltrack: string;
      };
      listeners?: string;
      playcount: string;
      artist: {
        name: string;
        mbid?: string;
        url: string;
      };
      image?: Array<{
        size: string;
        "#text": string;
      }>;
    }>;
    "@attr": {
      user: string;
      totalPages: string;
      page: string;
      total: string;
      perPage: string;
    };
  };
};

export interface UserData {
  user: {
    name: string;
    realname?: string;
    url: string;
    country: string;
    age?: number;
    gender?: string;
    subscriber: number;
    playcount: number;
    playlists: number;
    bootstrap: number;
    registered: {
      unixtime: number;
      text: string;
    };
    image: Array<{
      size: string;
      "#text": string;
    }>;
  };
}
export interface SpotifyUserProfile {
  country?: string;
  display_name?: string;
  email?: string;
  explicit_content?: {
    filter_enabled: boolean;
    filter_locked: boolean;
  };
  external_urls: {
    spotify: string;
  };
  followers: {
    href: null;
    total: number;
  };
  href: string;
  id: string;
  images: Array<{
    url: string;
    height: number | null;
    width: number | null;
  }>;
  product?: string;
  type: string;
  uri: string;
}

export type SelectionType = "artist" | "album" | "track" | "yearEnd" | "yearStart";
