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
      unixtime: string;
      text: string;
    };
    image: Array<{
      size: string;
      "#text": string;
    }>;
  };
}

export interface AlbumData {
  album: {
    artist: string;
    title: string;
    url: string;
    image: Array<{
      size: string;
      "#text": string;
    }>;
    listeners: string;
    playcount: string;
  };
}

export interface ArtistData {
  artist: {
    name: string;
    mbid: string;
    url: string;
    streamable: string;
    image: Array<{
      size: string;
      "#text": string;
    }>;
  };
}

export interface TrackData {
  track: {
    name: string;
    mbid: string;
    url: string;
    duration: string;
    streamable: {
      "#text": string;
      fulltrack: string;
    };
    listeners: string;
    playcount: string;
    artist: {
      name: string;
      mbid: string;
      url: string;
    };
    album: {
      artist: string;
      title: string;
      mbid: string;
      url: string;
      image: Array<{
        size: string;
        "#text": string;
      }>;
    };
  };
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
