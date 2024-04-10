import { useSpotifyClient } from "../apis/spotifyCOM_API";

export const spotifySearch = async (type: string, queryString: string) => {
    const { fetchSpotifyData } = useSpotifyClient();
    return await fetchSpotifyData(type, queryString);
};