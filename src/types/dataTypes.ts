export type AlbumData = Array<{
    artist: string;
    title: string;
    url: string;
    image: Array<{
        size: string;
        "#text": string;
    }>;
    listeners: string;
    playcount: string;
}>;

export type ArtistData = Array<{
    name: string;
    mbid: string;
    url: string;
    streamable: string;
    image: Array<{
        size: string;
        "#text": string;
    }>;
}>;

export type TrackData = Array<{
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
}>;
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