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
export interface ContainerProps {
    userID: string | null;
    error?: Error | null;
    onViewChange?: any;
}
export interface OptionType {
    name: string;
}

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
